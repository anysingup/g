'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Copy, Video } from 'lucide-react';
import Link from 'next/link';

export default function CreateClassPage() {
  const [classId, setClassId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Generate a random 6-digit class ID
    const newClassId = Math.floor(100000 + Math.random() * 900000).toString();
    setClassId(newClassId);
  }, []);

  const handleCreateClass = () => {
    if (!password.trim()) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'অনুগ্রহ করে একটি পাসওয়ার্ড দিন।',
      });
      return;
    }
    router.push(`/class/${classId}?password=${encodeURIComponent(password)}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'সফলভাবে কপি করা হয়েছে!',
      description: 'ক্লাসের তথ্য ক্লিপবোর্ডে কপি করা হয়েছে।',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
       <div className="w-full max-w-md mb-4">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ফিরে যান
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary font-bold text-center">
            নতুন ক্লাস তৈরি করুন
          </CardTitle>
          <CardDescription className="text-center">
            শিক্ষার্থীদের সাথে শেয়ার করার জন্য একটি নতুন ক্লাস আইডি এবং পাসওয়ার্ড তৈরি করুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="class-id">ক্লাস আইডি</Label>
            <div className="flex items-center gap-2">
              <Input id="class-id" value={classId} readOnly className="bg-gray-100" />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(classId)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Input
              id="password"
              type="text"
              placeholder="একটি পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateClass} className="w-full bg-primary hover:bg-primary/90">
            <Video className="mr-2 h-4 w-4" />
            ক্লাস শুরু করুন
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
