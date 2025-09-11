'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { database } from '@/lib/firebase';
import { ref, onValue, set, onDisconnect, remove } from 'firebase/database';

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
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const classId = params.id as string;
  const password = searchParams.get('password'); // We can add password validation later
  
  const [userId] = useState(generateUniqueId());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{[key: string]: MediaStream}>({});
  const peerConnections = useRef<{[key: string]: RTCPeerConnection}>({});

  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [loading, setLoading] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideosRef = useRef<HTMLDivElement>(null);

  // Function to clean up a single peer connection
  const cleanupPeerConnection = (peerId: string) => {
    if (peerConnections.current[peerId]) {
      peerConnections.current[peerId].close();
      delete peerConnections.current[peerId];
    }
    setRemoteStreams(prev => {
      const newStreams = {...prev};
      delete newStreams[peerId];
      return newStreams;
    });
  };

  // Function to handle leaving the call
  const leaveCall = () => {
    // Stop local media tracks
    localStream?.getTracks().forEach(track => track.stop());
    setLocalStream(null);

    // Close all peer connections
    Object.keys(peerConnections.current).forEach(peerId => {
      cleanupPeerConnection(peerId);
    });

    // Remove user from Firebase
    if (classId && userId) {
        const userRef = ref(database, `classes/${classId}/users/${userId}`);
        remove(userRef);
    }

    // Redirect to home page
    window.location.href = '/';
  };


  // 1. Get Media permissions
  useEffect(() => {
    const getMedia = async () => {
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
    getMedia();

    // Add beforeunload event listener to handle leaving the call
    window.addEventListener('beforeunload', leaveCall);

    return () => {
      window.removeEventListener('beforeunload', leaveCall);
      // This cleanup runs when the component is unmounted
      leaveCall();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // 2. Setup Firebase and WebRTC logic
  useEffect(() => {
    if (!localStream || !classId || !userId) return;

    const classRef = ref(database, `classes/${classId}`);
    const userRef = ref(database, `classes/${classId}/users/${userId}`);
    const usersRef = ref(database, `classes/${classId}/users`);

    // Set user presence and plan cleanup on disconnect
    const presenceRef = ref(database, `.info/connected`);
    onValue(presenceRef, (snap) => {
        if (snap.val() === true) {
            set(userRef, { present: true });
            onDisconnect(userRef).remove();
        }
    });

    const handleNewUser = async (peerId: string) => {
      if (peerId === userId || peerConnections.current[peerId]) return;

      console.log(`New user detected: ${peerId}. Creating peer connection.`);
      const pc = new RTCPeerConnection(ICE_SERVERS);
      peerConnections.current[peerId] = pc;

      // Add local stream tracks
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

      // Handle remote stream
      pc.ontrack = (event) => {
         console.log(`Track received from ${peerId}`);
         setRemoteStreams(prev => ({...prev, [peerId]: event.streams[0]}));
      };

      // Handle ICE candidates
      const localIceCandidatesRef = ref(database, `classes/${classId}/iceCandidates/${userId}/${peerId}`);
      onDisconnect(localIceCandidatesRef).remove();

      pc.onicecandidate = (event) => {
        if (event.candidate) {
           const candidateRef = ref(database, `classes/${classId}/iceCandidates/${userId}/${peerId}/${event.candidate.sdpMid}_${event.candidate.sdpMLineIndex}`);
           set(candidateRef, event.candidate.toJSON());
        }
      };

      const remoteIceCandidatesRef = ref(database, `classes/${classId}/iceCandidates/${peerId}/${userId}`);
       onValue(remoteIceCandidatesRef, (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const candidate = childSnapshot.val();
            pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => console.error("Error adding received ice candidate", e));
          });
        }
      });
      
      // Signaling logic (Offer/Answer)
      const offersRef = ref(database, `classes/${classId}/offers`);

      // Listen for offers/answers from the other peer
      onValue(ref(offersRef, `${peerId}-${userId}`), async (snapshot) => {
        const data = snapshot.val();
        if (data && data.sdp) {
            try {
                if (data.sdp.type === 'offer') {
                    console.log(`Received offer from ${peerId}`);
                    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    await set(ref(offersRef, `${userId}-${peerId}`), { sdp: pc.localDescription });
                }
            } catch (err) {
                console.error("Error handling offer: ", err)
            }
        }
      });
        
      onValue(ref(offersRef, `${userId}-${peerId}`), async(snapshot) => {
          const data = snapshot.val();
          if (data && data.sdp && data.sdp.type === 'answer') {
              try {
                console.log(`Received answer from ${peerId}`);
                await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
              } catch(err) {
                console.error("Error handling answer: ", err);
              }
          }
      });

      // Create offer
      try {
          console.log(`Creating offer for ${peerId}`);
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          await set(ref(offersRef, `${userId}-${peerId}`), { sdp: pc.localDescription });
      } catch (err) {
          console.error("Offer creation error: ", err);
      }
    };

    const handleUserLeft = (peerId: string) => {
       console.log(`User ${peerId} left.`);
       cleanupPeerConnection(peerId);
       // Clean up database entries for the user who left
       remove(ref(database, `classes/${classId}/offers/${userId}-${peerId}`));
       remove(ref(database, `classes/${classId}/offers/${peerId}-${userId}`));
       remove(ref(database, `classes/${classId}/iceCandidates/${userId}/${peerId}`));
       remove(ref(database, `classes/${classId}/iceCandidates/${peerId}/${userId}`));
    };

    const usersListener = onValue(usersRef, (snapshot) => {
        const users = snapshot.val() || {};
        const allUserIds = Object.keys(users);

        // New users
        allUserIds.forEach(peerId => {
            if (peerId !== userId && users[peerId]?.present) {
                 handleNewUser(peerId);
            }
        });
        
        // Disconnected users
        Object.keys(peerConnections.current).forEach(peerId => {
            if (!users[peerId]?.present) {
                handleUserLeft(peerId);
            }
        });
    });

    return () => {
        // Cleanup listener when component unmounts
        usersListener();
        remove(userRef);
         Object.keys(peerConnections.current).forEach(peerId => {
            handleUserLeft(peerId);
        });
    }

  }, [localStream, classId, userId, toast]);


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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            লাইভ ক্লাস - আইডি: {classId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" ref={remoteVideosRef}>
              {/* Local Video */}
              <div className="relative">
                  <video ref={localVideoRef} className="w-full aspect-video rounded-md bg-black object-cover" autoPlay muted />
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
              disabled={!hasPermissions}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button
              onClick={toggleCamera}
              variant={isCameraOff ? 'destructive' : 'secondary'}
              size="icon"
              className="rounded-full h-14 w-14"
              disabled={!hasPermissions}
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
