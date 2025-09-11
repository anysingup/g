'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut } from 'lucide-react';

export default function TeacherDashboard() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'teacher') {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/');
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-primary">শিক্ষক ড্যাশবোর্ড</h1>
            <p className="text-muted-foreground">ব্যবস্থাপনা ও মনিটরিং প্যানেল</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          লগ আউট
        </Button>
      </header>
      
      <main>
        <Card>
            <CardHeader>
                <CardTitle>স্বাগতম!</CardTitle>
                <CardDescription>
                    এই ড্যাশবোর্ডটি বর্তমানে নির্মাণাধীন রয়েছে। খুব শীঘ্রই এখানে শিক্ষার্থীদের AI সার্চ হিস্ট্রি এবং নোটিশ ম্যানেজমেন্ট ফিচার যুক্ত করা হবে।
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>আপনি সফলভাবে শিক্ষক হিসেবে লগইন করেছেন।</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
