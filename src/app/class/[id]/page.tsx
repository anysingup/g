'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { database } from '@/lib/firebase';
import { ref, onValue, set, onDisconnect, remove, goOffline, goOnline } from 'firebase/database';

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

  const cleanUp = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    Object.values(peerConnections.current).forEach(pc => pc.close());
    peerConnections.current = {};
    
    if (classId && userId) {
        const userRef = ref(database, `classes/${classId}/users/${userId}`);
        remove(userRef);
        goOffline(database);
    }
  };

  const leaveCall = () => {
    cleanUp();
    window.location.href = '/';
  };
  
  // 1. Get Media permissions & Basic Setup
  useEffect(() => {
    const setup = async () => {
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
    setup();

    window.addEventListener('beforeunload', cleanUp);

    return () => {
      window.removeEventListener('beforeunload', cleanUp);
      cleanUp();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Setup Firebase and WebRTC logic
  useEffect(() => {
    if (!localStream || !classId || !userId) return;

    goOnline(database);
    
    const userRef = ref(database, `classes/${classId}/users/${userId}`);
    const allUsersRef = ref(database, `classes/${classId}/users`);

    const connectedRef = ref(database, '.info/connected');
    const presenceListener = onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            set(userRef, { isOnline: true });
            onDisconnect(userRef).remove();
        }
    });

    const createPeerConnection = (peerId: string, isInitiator: boolean) => {
        if (peerConnections.current[peerId]) {
            return peerConnections.current[peerId];
        }
    
        const pc = new RTCPeerConnection(ICE_SERVERS);
        peerConnections.current[peerId] = pc;
    
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    
        pc.ontrack = (event) => {
            setRemoteStreams(prev => ({ ...prev, [peerId]: event.streams[0] }));
        };
    
        const signalsRef = ref(database, `classes/${classId}/signals/${userId}/${peerId}`);
        const remoteSignalsRef = ref(database, `classes/${classId}/signals/${peerId}/${userId}`);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                set(ref(database, `classes/${classId}/signals/${userId}/${peerId}/iceCandidates/${event.candidate.sdpMid}_${event.candidate.sdpMLineIndex}`), event.candidate.toJSON());
            }
        };

        if (isInitiator) {
            pc.onnegotiationneeded = async () => {
                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    set(ref(database, `classes/${classId}/signals/${userId}/${peerId}/sdp`), pc.localDescription);
                } catch (e) {
                    console.error("Error creating offer:", e);
                }
            };
        }

        const signalListener = onValue(remoteSignalsRef, async (signalSnap) => {
            const signal = signalSnap.val();
            if (!signal || !pc) return;

            try {
                if (signal.sdp && pc.currentRemoteDescription?.type !== signal.sdp.type) {
                    await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
                    if (signal.sdp.type === 'offer') {
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        set(ref(database, `classes/${classId}/signals/${userId}/${peerId}/sdp`), pc.localDescription);
                    }
                }

                if (signal.iceCandidates) {
                    Object.values(signal.iceCandidates).forEach(async (candidate: any) => {
                        try {
                            if(pc.currentRemoteDescription) { // Only add candidates after remote description is set
                                await pc.addIceCandidate(new RTCIceCandidate(candidate));
                            }
                        } catch (e) {
                            if (!e.toString().includes("OperationError: Failed to add ICE candidate")) {
                                console.error("Error adding received ICE candidate:", e);
                            }
                        }
                    });
                }
            } catch (e) {
                console.error("Error handling signal: ", e);
            }
        });
        
        onDisconnect(signalsRef).remove();
        return pc;
    };
    
    const usersListener = onValue(allUsersRef, (snapshot) => {
        const allUsers = snapshot.val() || {};
        const allUserIds = Object.keys(allUsers);
    
        // Handle new users
        for (const peerId of allUserIds) {
            if (peerId !== userId && !peerConnections.current[peerId]) {
                 // The user with the lexicographically smaller ID initiates the connection
                const isInitiator = userId < peerId;
                createPeerConnection(peerId, isInitiator);
            }
        }
    
        // Handle disconnected users
        for (const peerId in peerConnections.current) {
            if (!allUsers[peerId]) {
                peerConnections.current[peerId]?.close();
                delete peerConnections.current[peerId];
                setRemoteStreams(prev => {
                    const newStreams = { ...prev };
                    delete newStreams[peerId];
                    return newStreams;
                });
                remove(ref(database, `classes/${classId}/signals/${userId}/${peerId}`));
            }
        }
    });

    return () => {
        presenceListener();
        usersListener();
        cleanUp();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const videoGridCols = `grid-cols-${Math.max(1, Math.min(3, Object.keys(remoteStreams).length + 1))}`;

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
