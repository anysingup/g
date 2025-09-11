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
import { ArrowLeft, Copy, Video, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { database } from '@/lib/firebase';
import { ref, set } from 'firebase/database';

export default function CreateClassPage() {
  const [classId, setClassId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Generate a random 6-digit class ID only on the client-side
    // to prevent hydration errors.
    const newClassId = Math.floor(100000 + Math.random() * 900000).toString();
    setClassId(newClassId);
  }, []);

  const handleCreateClass = async () => {
    if (!password.trim()) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'অনুগ্রহ করে একটি পাসওয়ার্ড দিন।',
      });
      return;
    }

    if (!classId) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'ক্লাস আইডি তৈরি হয়নি। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন।',
      });
      return;
    }

    setLoading(true);

    try {
      // Save the password in Firebase
      const classRef = ref(database, `classes/${classId}/password`);
      await set(classRef, password);

      // Redirect to the class page
      router.push(`/class/${classId}`);

    } catch (error) {
      console.error("Failed to create class:", error);
      toast({
        variant: 'destructive',
        title: 'ক্লাস তৈরি করতে ব্যর্থ',
        description: 'একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      });
    } finally {
        setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
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
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(classId)} disabled={!classId}>
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
              disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateClass} className="w-full bg-primary hover:bg-primary/90" disabled={loading || !classId}>
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ক্লাস তৈরি হচ্ছে...
                </>
            ) : (
                <>
                    <Video className="mr-2 h-4 w-4" />
                    ক্লাস শুরু করুন
                </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
