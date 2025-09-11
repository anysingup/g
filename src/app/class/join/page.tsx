'use client';

import { useState } from 'react';
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
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export default function JoinClassPage() {
  const [classId, setClassId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleJoinClass = async () => {
    if (!classId.trim() || !password.trim()) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'অনুগ্রহ করে ক্লাস আইডি এবং পাসওয়ার্ড দিন।',
      });
      return;
    }
    
    setLoading(true);

    try {
      const classRef = ref(database, `classes/${classId}/password`);
      const snapshot = await get(classRef);

      if (snapshot.exists()) {
        const storedPassword = snapshot.val();
        if (storedPassword === password) {
          router.push(`/class/${classId}`);
        } else {
          toast({
            variant: 'destructive',
            title: 'প্রবেশ করতে ব্যর্থ',
            description: 'ভুল আইডি বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।',
          });
          setLoading(false);
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'প্রবেশ করতে ব্যর্থ',
          description: 'ভুল আইডি বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।',
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to join class:", error);
      toast({
        variant: 'destructive',
        title: 'যোগ দিতে ব্যর্থ',
        description: 'একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      });
      setLoading(false);
    }
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
            ক্লাসে যোগ দিন
          </CardTitle>
          <CardDescription className="text-center">
            শিক্ষকের দেওয়া আইডি ও পাসওয়ার্ড দিয়ে ক্লাসে প্রবেশ করুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="class-id">ক্লাস আইডি</Label>
            <Input
              id="class-id"
              placeholder="ক্লাস আইডি লিখুন"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Input
              id="password"
              type="password"
              placeholder="পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleJoinClass} className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
             {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    প্রবেশ করা হচ্ছে...
                </>
             ) : (
                <>
                    <LogIn className="mr-2 h-4 w-4" />
                    প্রবেশ করুন
                </>
             )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
