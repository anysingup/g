'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { database } from '@/lib/firebase';
import { ref, onValue, set, onDisconnect, remove, goOffline, goOnline, get, child } from 'firebase/database';

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
  const [remoteStreams, setRemoteStreams] = useState<{[key: string]: MediaStream}>({});
  const peerConnections = useRef<{[key: string]: RTCPeerConnection}>({});

  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [loading, setLoading] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});

  // Cleanup function to be called on component unmount or leaving call
  const cleanUp = () => {
    console.log('Cleaning up...');
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    Object.values(peerConnections.current).forEach(pc => pc.close());
    peerConnections.current = {};
    
    if (classId && userId) {
      const userRef = ref(database, `classes/${classId}/users/${userId}`);
      remove(userRef); // Remove user from presence list
      goOffline(database); // Disconnect from Firebase
    }
  };

  const leaveCall = () => {
    cleanUp();
    window.location.href = '/';
  };
  
  // 1. Get Media permissions
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

    window.addEventListener('beforeunload', leaveCall);

    return () => {
      window.removeEventListener('beforeunload', leaveCall);
      leaveCall();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Setup Firebase and WebRTC logic
  useEffect(() => {
    if (!localStream || !classId || !userId) return;

    goOnline(database);
    
    const userRef = ref(database, `classes/${classId}/users/${userId}`);
    const usersRef = ref(database, `classes/${classId}/users`);
    const signalsRef = ref(database, `classes/${classId}/signals`);

    // Set presence and configure auto-removal on disconnect
    onValue(ref(database, '.info/connected'), (snap) => {
        if (snap.val() === true) {
            set(userRef, { isOnline: true });
            onDisconnect(userRef).remove();
            onDisconnect(ref(database, `classes/${classId}/signals/${userId}`)).remove();
        }
    });

    const createPeerConnection = (peerId: string, initiator: boolean) => {
        if (peerConnections.current[peerId]) {
            console.log(`PeerConnection with ${peerId} already exists.`);
            return peerConnections.current[peerId];
        }
        console.log(`Creating PeerConnection to ${peerId} as ${initiator ? 'initiator' : 'receiver'}`);
        
        const pc = new RTCPeerConnection(ICE_SERVERS);
        peerConnections.current[peerId] = pc;
    
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    
        pc.ontrack = (event) => {
            console.log(`Received remote track from ${peerId}`);
            setRemoteStreams(prev => ({ ...prev, [peerId]: event.streams[0] }));
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                const iceCandidateRef = ref(database, `classes/${classId}/signals/${userId}/${peerId}/iceCandidates`);
                set(child(iceCandidateRef, event.candidate.sdpMid! + "_" + event.candidate.sdpMLineIndex), event.candidate.toJSON());
            }
        };

        pc.onnegotiationneeded = async () => {
            if (initiator) {
                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    const offerRef = ref(database, `classes/${classId}/signals/${userId}/${peerId}/sdp`);
                    set(offerRef, { type: 'offer', sdp: pc.localDescription.sdp });
                } catch (e) {
                    console.error("Error creating offer:", e);
                }
            }
        };

        // Listen for signals from the peer
        listenToSignals(peerId, pc);

        return pc;
    };

    const listenToSignals = (peerId: string, pc: RTCPeerConnection) => {
        const peerSignalRef = ref(database, `classes/${classId}/signals/${peerId}/${userId}`);
        
        // Listen for SDP (offer/answer)
        onValue(child(peerSignalRef, 'sdp'), async (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            try {
                if (data.sdp && pc.currentRemoteDescription?.sdp !== data.sdp) {
                    const sdp = new RTCSessionDescription(data);
                    await pc.setRemoteDescription(sdp);
                    
                    if (sdp.type === 'offer') {
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        const answerRef = ref(database, `classes/${classId}/signals/${userId}/${peerId}/sdp`);
                        set(answerRef, { type: 'answer', sdp: pc.localDescription?.sdp });
                    }
                }
            } catch (e) {
                console.error("Error handling SDP signal:", e);
            }
        });

        // Listen for ICE candidates
        onValue(child(peerSignalRef, 'iceCandidates'), async (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(async (candidateSnap) => {
                    try {
                        await pc.addIceCandidate(new RTCIceCandidate(candidateSnap.val()));
                    } catch(e) {
                        console.error('Error adding received ice candidate', e);
                    }
                });
            }
        });
    };
    
    const usersListener = onValue(usersRef, (snapshot) => {
        const allUsers = snapshot.val() || {};
        const allUserIds = Object.keys(allUsers);
    
        // Connect to new users
        for (const peerId of allUserIds) {
            if (peerId !== userId && !peerConnections.current[peerId]) {
                 // The user with the "smaller" ID is the initiator to avoid glare
                 const isInitiator = userId < peerId;
                 createPeerConnection(peerId, isInitiator);
            }
        }
    
        // Clean up disconnected users
        for (const peerId in peerConnections.current) {
            if (!allUsers[peerId]) {
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

    return () => {
        usersListener(); // Detach the listener
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

  const videoGridCols = `grid-cols-${Math.ceil(Math.sqrt(Object.keys(remoteStreams).length + 1))}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            লাইভ ক্লাস - আইডি: {classId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${videoGridCols} gap-4`}>
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
