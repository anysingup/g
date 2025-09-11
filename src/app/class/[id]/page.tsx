'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { database } from '@/lib/firebase';
import { ref, onValue, set, onDisconnect, remove, goOffline, goOnline, child } from 'firebase/database';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

// Helper function to generate a unique ID for the user
const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

function VideoCall() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const classId = params.id as string;
  const [userId] = useState(() => generateUniqueId()); // Use useState initializer to run only once

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

  const cleanupConnections = () => {
    console.log('Cleaning up all connections...');
    // Stop local media tracks
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);

    // Close all peer connections
    Object.values(peerConnections.current).forEach(pc => pc.close());
    peerConnections.current = {};

    // Remove user data from Firebase
    if (classId && userId) {
      const userRef = ref(database, `classes/${classId}/users/${userId}`);
      remove(userRef);
      goOffline(database);
    }
    setRemoteStreams({});
  };
  
  const leaveCall = () => {
    cleanupConnections();
    router.push('/');
  };


  // Step 1: Get media permissions and setup local stream
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

    const handleBeforeUnload = () => {
        cleanupConnections();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        cleanupConnections();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Step 2: Setup Firebase and WebRTC logic, only when localStream is available
  useEffect(() => {
    if (!localStream || !classId || !userId) return;

    goOnline(database);
    
    const usersRef = ref(database, `classes/${classId}/users`);
    const myUserRef = ref(database, `classes/${classId}/users/${userId}`);

    // Set presence and configure auto-removal on disconnect
    onValue(ref(database, '.info/connected'), (snap) => {
      if (snap.val() === true) {
        set(myUserRef, { isOnline: true });
        onDisconnect(myUserRef).remove();
        onDisconnect(ref(database, `classes/${classId}/offers/${userId}`)).remove();
        onDisconnect(ref(database, `classes/${classId}/answers/${userId}`)).remove();
        onDisconnect(ref(database, `classes/${classId}/candidates/${userId}`)).remove();
      }
    });

    const createPeerConnection = (peerId: string) => {
      console.log(`Creating PeerConnection with ${peerId}`);
      const pc = new RTCPeerConnection(ICE_SERVERS);
      
      // Add local stream tracks to the connection
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
      
      // Handle incoming remote tracks
      pc.ontrack = event => {
        console.log(`Received remote track from ${peerId}`);
        setRemoteStreams(prev => ({ ...prev, [peerId]: event.streams[0] }));
      };
      
      // Handle ICE candidates
      pc.onicecandidate = event => {
        if (event.candidate) {
          const candidatesRef = ref(database, `classes/${classId}/candidates/${peerId}/${userId}`);
          set(child(candidatesRef, event.candidate.sdpMid!), event.candidate.toJSON());
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
          console.log(`Connection state with ${peerId}: ${pc.connectionState}`);
          if (['disconnected', 'closed', 'failed'].includes(pc.connectionState)) {
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
    
    // Listen for offers
    const offersRef = ref(database, `classes/${classId}/offers/${userId}`);
    onValue(offersRef, async (snapshot) => {
        if (!snapshot.exists()) return;
        const offers = snapshot.val();
        for(const peerId in offers){
            const pc = createPeerConnection(peerId);
            await pc.setRemoteDescription(new RTCSessionDescription(offers[peerId]));

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            const answerRef = ref(database, `classes/${classId}/answers/${peerId}/${userId}`);
            await set(answerRef, pc.localDescription.toJSON());
            
            // Listen for candidates from this peer
            listenForCandidates(peerId);
            
            // Clean up the processed offer
            await remove(ref(database, `classes/${classId}/offers/${userId}/${peerId}`));
        }
    });
    
    // Listen for answers
    const answersRef = ref(database, `classes/${classId}/answers/${userId}`);
    onValue(answersRef, async (snapshot) => {
        if (!snapshot.exists()) return;
        const answers = snapshot.val();
        for(const peerId in answers){
            const pc = peerConnections.current[peerId];
            if(pc && !pc.currentRemoteDescription){
                await pc.setRemoteDescription(new RTCSessionDescription(answers[peerId]));
            }
        }
    });

    const listenForCandidates = (peerId: string) => {
        const candidatesRef = ref(database, `classes/${classId}/candidates/${userId}/${peerId}`);
        onValue(candidatesRef, (snapshot) => {
            if (!snapshot.exists()) return;
            const candidates = snapshot.val();
            const pc = peerConnections.current[peerId];
            if(pc){
                for(const sdpMid in candidates){
                    pc.addIceCandidate(new RTCIceCandidate(candidates[sdpMid])).catch(e => console.error("Error adding ICE candidate", e));
                }
            }
        });
    }

    // Main listener for user presence
    const usersListener = onValue(usersRef, (snapshot) => {
      const allUsers = snapshot.val() || {};
      
      for (const peerId of Object.keys(allUsers)) {
        if (peerId !== userId && !peerConnections.current[peerId]) {
            console.log(`Found new peer: ${peerId}, creating offer.`);
            const pc = createPeerConnection(peerId);
            
            pc.onnegotiationneeded = async () => {
                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    
                    const offerRef = ref(database, `classes/${classId}/offers/${peerId}/${userId}`);
                    await set(offerRef, pc.localDescription.toJSON());
                    
                    // Listen for candidates from this peer
                    listenForCandidates(peerId);
                } catch(e){
                    console.error("Negotiation error:", e);
                }
            }
        }
      }
      
      // Clean up disconnected users
      for (const peerId in peerConnections.current) {
        if (!allUsers[peerId]) {
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

    return () => {
      usersListener(); // Detach the listener on cleanup
      remove(offersRef);
      remove(answersRef);
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
                   totalParticipants === 2 ? 'grid-cols-2' :
                   totalParticipants <= 4 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            লাইভ ক্লাস - আইডি: {classId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p>ক্যামেরা ও মাইক্রোফোন চালু করা হচ্ছে...</p>
            </div>
          ) : hasPermissions === false ? (
             <Alert variant="destructive" className="mt-4">
              <AlertTitle>ক্যামেরা ও মাইক্রোফোন প্রয়োজন</AlertTitle>
              <AlertDescription>
                অনুগ্রহ করে এই ফিচারটি ব্যবহার করার জন্য ক্যামেরা এবং মাইক্রোফোন অ্যাক্সেস করার অনুমতি দিন। পৃষ্ঠাটি রিফ্রেশ করে আবার চেষ্টা করুন।
              </AlertDescription>
            </Alert>
          ) : (
            <div className={`grid ${gridCols} gap-4 animate-fade-in`}>
                {/* Local Video */}
                <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                    <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                        আপনি
                    </div>
                    {isCameraOff && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                            <p className="text-lg">ক্যামেরা বন্ধ আছে</p>
                        </div>
                    )}
                </div>

                {/* Remote Videos */}
                {Object.entries(remoteStreams).map(([peerId, stream]) => (
                    <div key={peerId} className="relative aspect-video bg-black rounded-md overflow-hidden">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            playsInline
                            ref={(video) => {
                                if (video && video.srcObject !== stream) video.srcObject = stream;
                            }}
                        />
                         <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                            <User className="h-3 w-3" /> User {peerId.substring(0,4)}
                        </div>
                    </div>
                ))}
            </div>
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
