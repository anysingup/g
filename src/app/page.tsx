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
import { Loader2, LogIn } from 'lucide-react';
import { teacherCredentials, studentCredentials } from '@/lib/credentials';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    setLoading(true);

    if (username === teacherCredentials.username && password === teacherCredentials.password) {
      localStorage.setItem('userRole', 'teacher');
      toast({ title: 'শিক্ষক হিসেবে লগইন সফল হয়েছে!' });
      router.push('/teacher/dashboard');
    } else if (username === studentCredentials.username && password === studentCredentials.password) {
      localStorage.setItem('userRole', 'student');
      toast({ title: 'শিক্ষার্থী হিসেবে লগইন সফল হয়েছে!' });
      router.push('/student/home');
    } else {
      toast({
        variant: 'destructive',
        title: 'লগইন ব্যর্থ',
        description: 'ভুল আইডি বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <header className="w-full max-w-4xl text-center mb-8 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
            হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়
            </h1>
            <p className="text-muted-foreground px-4 sm:px-0">
            অনলাইন পোর্টালে আপনাকে স্বাগতম
            </p>
      </header>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary font-bold text-center">
            লগইন করুন
          </CardTitle>
          <CardDescription className="text-center">
            আপনার আইডি ও পাসওয়ার্ড দিয়ে প্রবেশ করুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">ইউজার আইডি</Label>
            <Input
              id="username"
              placeholder="আপনার আইডি লিখুন"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Input
              id="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
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
