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
import { ArrowLeft, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function JoinClassPage() {
  const [classId, setClassId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleJoinClass = () => {
    if (!classId.trim() || !password.trim()) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'অনুগ্রহ করে ক্লাস আইডি এবং পাসওয়ার্ড দিন।',
      });
      return;
    }
    router.push(`/class/${classId}?password=${encodeURIComponent(password)}`);
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
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleJoinClass} className="w-full bg-primary hover:bg-primary/90">
            <LogIn className="mr-2 h-4 w-4" />
            প্রবেশ করুন
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
