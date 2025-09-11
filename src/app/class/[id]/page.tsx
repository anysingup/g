'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function VideoCall() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  const classId = params.id;
  const password = searchParams.get('password');

  useEffect(() => {
    const getCameraPermission = async () => {
      setLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'ক্যামেরা অ্যাক্সেস প্রয়োজন',
          description:
            'এই ফিচারটি ব্যবহার করতে আপনার ব্রাউজার সেটিংসে ক্যামেরা এবং মাইক্রোফোন ব্যবহারের অনুমতি দিন।',
        });
      } finally {
        setLoading(false);
      }
    };

    getCameraPermission();
  }, [toast]);

  const toggleMute = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
    }
  };

  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
            setIsCameraOff(!track.enabled);
        });
    }
  };
  
  const leaveCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
    }
    window.location.href = '/';
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            লাইভ ক্লাস - আইডি: {classId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p>ক্যামেরা চালু করা হচ্ছে...</p>
            </div>
          )}

          <div className={`relative ${loading ? 'hidden' : 'block'}`}>
            <video
              ref={videoRef}
              className="w-full aspect-video rounded-md bg-black"
              autoPlay
              muted
            />
             {isCameraOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-md">
                    <p className="text-lg">ক্যামেরা বন্ধ আছে</p>
                </div>
            )}
          </div>
          
          {hasCameraPermission === false && !loading && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>ক্যামেরা অ্যাক্সেস প্রয়োজন</AlertTitle>
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
              disabled={!hasCameraPermission}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button
              onClick={toggleCamera}
              variant={isCameraOff ? 'destructive' : 'secondary'}
              size="icon"
              className="rounded-full h-14 w-14"
              disabled={!hasCameraPermission}
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
