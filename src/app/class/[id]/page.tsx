'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { database } from '@/lib/firebase';
import { ref, onValue, set, onDisconnect, remove, goOffline, goOnline, child, get } from 'firebase/database';

// Simple unique ID generator
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

function VideoCall() {
  const params = useParams();
  const { toast } = useToast();

  const classId = params.id as string;
  
  const [userId] = useState(generateUniqueId());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const remoteVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

  // Function to clean up all connections and Firebase listeners
  const cleanup = () => {
    console.log('Cleaning up...');
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    Object.values(peerConnections.current).forEach(pc => pc.close());
    peerConnections.current = {};
    
    if (classId && userId) {
        const userRootRef = ref(database, `classes/${classId}/users/${userId}`);
        remove(userRootRef);
        const signalRootRef = ref(database, `classes/${classId}/signals/${userId}`);
        remove(signalRootRef);
        goOffline(database);
    }
  };

  const leaveCall = () => {
    cleanup();
    // A small delay to allow Firebase to process the 'remove' command
    setTimeout(() => { window.location.href = '/'; }, 100);
  };
  
  // 1. Get media permissions and setup local stream
  useEffect(() => {
    const setupMedia = async () => {
      setLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setLocalStream(stream);
        setHasPermissions(true);
      } catch (error) {
        console.error('Error accessing media devices.', error);
        setHasPermissions(false);
        toast({
          variant: 'destructive',
          title: 'ক্যামেরা ও মাইক্রোফোন প্রয়োজন',
          description: 'ভিডিও কলের জন্য অনুগ্রহ করে ক্যামেরা ও মাইক্রোফোন অ্যাক্সেসের অনুমতি দিন।',
        });
      } finally {
        setLoading(false);
      }
    };
    
    setupMedia();

    // Attach cleanup function to window events
    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Setup Firebase and WebRTC logic, dependent on localStream
  useEffect(() => {
    if (!localStream || !classId || !userId) return;

    goOnline(database);
    
    const usersRef = ref(database, `classes/${classId}/users`);
    const myUserRef = ref(database, `classes/${classId}/users/${userId}`);
    const signalsRef = ref(database, `classes/${classId}/signals`);
    const mySignalRef = ref(database, `classes/${classId}/signals/${userId}`);
    const iceCandidatesRef = ref(database, `classes/${classId}/iceCandidates/${userId}`);

    // Set presence and configure auto-removal on disconnect
    onValue(ref(database, '.info/connected'), (snap) => {
      if (snap.val() === true) {
        set(myUserRef, { isOnline: true });
        onDisconnect(myUserRef).remove();
        onDisconnect(mySignalRef).remove();
        onDisconnect(iceCandidatesRef).remove();
      }
    });

    const createPeerConnection = (peerId: string) => {
      console.log(`Creating PeerConnection with ${peerId}`);
      const pc = new RTCPeerConnection(ICE_SERVERS);
      
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
      
      pc.ontrack = event => {
        console.log(`Received remote track from ${peerId}`);
        setRemoteStreams(prev => ({ ...prev, [peerId]: event.streams[0] }));
      };
      
      pc.onicecandidate = event => {
        if (event.candidate) {
            const candidateRef = ref(database, `classes/${classId}/iceCandidates/${userId}/${peerId}`);
            set(child(candidateRef, generateUniqueId()), event.candidate.toJSON());
        }
      };

      pc.onconnectionstatechange = () => {
          console.log(`Connection state with ${peerId}: ${pc.connectionState}`);
          if (pc.connectionState === 'disconnected' || pc.connectionState === 'closed' || pc.connectionState === 'failed') {
               pc.close();
               delete peerConnections.current[peerId];
               setRemoteStreams(prev => {
                   const newStreams = { ...prev };
                   delete newStreams[peerId];
                   return newStreams;
               });
          }
      };
      
      peerConnections.current[peerId] = pc;
      return pc;
    };

    // Main listener for user presence
    const usersListener = onValue(usersRef, (snapshot) => {
      const allUsers = snapshot.val() || {};
      const allUserIds = Object.keys(allUsers);
      
      // Connect to new users
      for (const peerId of allUserIds) {
        if (peerId !== userId && !peerConnections.current[peerId]) {
            const pc = createPeerConnection(peerId);

            // Listen for ICE candidates from this specific peer
            const peerIceCandidatesRef = ref(database, `classes/${classId}/iceCandidates/${peerId}/${userId}`);
            onValue(peerIceCandidatesRef, (candidatesSnapshot) => {
                candidatesSnapshot.forEach(candidateSnap => {
                    pc.addIceCandidate(new RTCIceCandidate(candidateSnap.val())).catch(e => console.error("Error adding ICE candidate", e));
                });
            });

            // The user with the "smaller" ID is the initiator to avoid glare
            if (userId < peerId) {
                console.log(`I am the initiator for connection with ${peerId}`);
                pc.onnegotiationneeded = async () => {
                    try {
                        const offer = await pc.createOffer();
                        await pc.setLocalDescription(offer);
                        await set(ref(database, `classes/${classId}/signals/${userId}/${peerId}`), { type: 'offer', sdp: offer.sdp });
                    } catch (e) {
                        console.error("Error creating offer:", e);
                    }
                };
            }
        }
      }
      
      // Clean up disconnected users
      for (const peerId in peerConnections.current) {
        if (!allUserIds.includes(peerId)) {
          console.log(`Cleaning up disconnected peer: ${peerId}`);
          peerConnections.current[peerId]?.close();
          delete peerConnections.current[peerId];
          setRemoteStreams(prev => {
            const newStreams = { ...prev };
            delete newStreams[peerId];
            return newStreams;
          });
        }
      }
    });

    // Listener for incoming signals (offers/answers)
    const signalsListener = onValue(signalsRef, async (snapshot) => {
        const allSignals = snapshot.val() || {};
        if (!allSignals[userId]) return;

        for (const peerId in allSignals[userId]) {
             if (peerId === 'sdp' || peerId === 'type') continue; // Skip own special keys
             const signalData = allSignals[userId][peerId];

             if(signalData){
                 let pc = peerConnections.current[peerId];
                 if (!pc) {
                     pc = createPeerConnection(peerId);
                 }
                 
                 if (pc.currentRemoteDescription) continue;

                 if (signalData.type === 'offer') {
                    console.log(`Received offer from ${peerId}, creating answer`);
                     try {
                         await pc.setRemoteDescription(new RTCSessionDescription(signalData));
                         const answer = await pc.createAnswer();
                         await pc.setLocalDescription(answer);
                         await set(ref(database, `classes/${classId}/signals/${userId}/${peerId}`), { type: 'answer', sdp: answer.sdp });
                     } catch (e) {
                         console.error("Error handling offer:", e);
                     }
                 } else if (signalData.type === 'answer') {
                    console.log(`Received answer from ${peerId}`);
                    try {
                        await pc.setRemoteDescription(new RTCSessionDescription(signalData));
                    } catch (e) {
                        console.error("Error handling answer:", e);
                    }
                 }
             }
        }
    });

    return () => {
      usersListener(); // Detach the listener on cleanup
      signalsListener();
    };
  }, [localStream, classId, userId]);


  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
    }
  };

  const toggleCamera = () => {
    if (localStream) {
        localStream.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
            setIsCameraOff(!track.enabled);
        });
    }
  };
  
  const totalParticipants = Object.keys(remoteStreams).length + 1;
  const gridCols = totalParticipants <= 1 ? 'grid-cols-1' :
                   totalParticipants <= 2 ? 'grid-cols-2' :
                   totalParticipants <= 4 ? 'grid-cols-2' :
                   totalParticipants <= 9 ? 'grid-cols-3' : 'grid-cols-4';
  const gridRows = totalParticipants > 4 ? 'grid-rows-2' : 'grid-rows-1';


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            লাইভ ক্লাস - আইডি: {classId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${gridCols} ${gridRows} gap-4`}>
              {/* Local Video */}
              <div className="relative">
                  <video ref={localVideoRef} className="w-full aspect-video rounded-md bg-black object-cover" autoPlay muted playsInline />
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                      আপনি
                  </div>
                  {isCameraOff && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-md">
                          <p className="text-lg">ক্যামেরা বন্ধ আছে</p>
                      </div>
                  )}
              </div>

              {/* Remote Videos */}
              {Object.entries(remoteStreams).map(([peerId, stream]) => (
                  <div key={peerId} className="relative">
                      <video
                          className="w-full aspect-video rounded-md bg-black object-cover"
                          autoPlay
                          playsInline
                          ref={(video) => {
                              if (video && video.srcObject !== stream) video.srcObject = stream;
                              remoteVideoRefs.current[peerId] = video;
                          }}
                      />
                       <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                          <User className="h-3 w-3" /> User {peerId.substring(0,4)}
                      </div>
                  </div>
              ))}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p>সংযোগ স্থাপন করা হচ্ছে...</p>
            </div>
          )}

          {hasPermissions === false && !loading && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>ক্যামেরা ও মাইক্রোফোন প্রয়োজন</AlertTitle>
              <AlertDescription>
                অনুগ্রহ করে এই ফিচারটি ব্যবহার করার জন্য ক্যামেরা এবং মাইক্রোফোন অ্যাক্সেস করার অনুমতি দিন।
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={toggleMute}
              variant={isMuted ? 'destructive' : 'secondary'}
              size="icon"
              className="rounded-full h-14 w-14"
              disabled={!localStream}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button
              onClick={toggleCamera}
              variant={isCameraOff ? 'destructive' : 'secondary'}
              size="icon"
              className="rounded-full h-14 w-14"
              disabled={!localStream}
            >
              {isCameraOff ? <VideoOff /> : <Video />}
            </Button>
            <Button
              onClick={leaveCall}
              variant="destructive"
              size="icon"
              className="rounded-full h-14 w-14"
            >
              <PhoneOff />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VideoCallPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white"><Loader2 className="h-8 w-8 animate-spin"/></div>}>
            <VideoCall />
        </Suspense>
    )
}
