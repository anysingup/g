'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ref, push, serverTimestamp, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Send, Loader2, BookOpen, MessageSquare, History } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Notice, AiConversation } from '@/lib/types';


const noticeSchema = z.object({
  title: z.string().min(5, 'শিরোনাম কমপক্ষে ৫ অক্ষরের হতে হবে।'),
  description: z.string().min(10, 'বিবরণ কমপক্ষে ১০ অক্ষরের হতে হবে।'),
});


const toBengaliDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const bnMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
    const bnNumbers: { [key: string]: string } = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    const day = String(date.getDate()).replace(/\d/g, (d) => bnNumbers[d as keyof typeof bnNumbers]);
    const month = bnMonths[date.getMonth()];
    const year = String(date.getFullYear()).replace(/\d/g, (d) => bnNumbers[d as keyof typeof bnNumbers]);
    
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const strTime = `${String(hours).replace(/\d/g, (d) => bnNumbers[d as keyof typeof bnNumbers])}:${String(minutes).replace(/\d/g, (d) => bnNumbers[d as keyof typeof bnNumbers])} ${ampm}`;

    return `${day} ${month}, ${year} | ${strTime}`;
};


function NoticeManager() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
    defaultValues: { title: '', description: '' },
  });

  const onSubmit = async (values: z.infer<typeof noticeSchema>) => {
    setLoading(true);
    try {
      const noticesRef = ref(database, 'notices');
      await push(noticesRef, {
        ...values,
        createdAt: serverTimestamp(),
      });
      toast({ title: 'সফল', description: 'নোটিশটি সফলভাবে প্রকাশ করা হয়েছে।' });
      form.reset();
    } catch (error) {
      console.error("Error adding notice:", error);
      toast({ variant: 'destructive', title: 'ত্রুটি', description: 'নোটিশ প্রকাশ করতে সমস্যা হয়েছে।' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Send className="h-6 w-6" /> নতুন নোটিশ প্রকাশ করুন</CardTitle>
        <CardDescription>এখানে থেকে বিদ্যালয়ের জন্য নতুন নোটিশ যোগ করুন।</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>শিরোনাম</FormLabel>
                  <FormControl>
                    <Input placeholder="নোটিশের শিরোনাম লিখুন" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>বিবরণ</FormLabel>
                  <FormControl>
                    <Textarea placeholder="নোটিশের বিস্তারিত বিবরণ দিন" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              প্রকাশ করুন
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


function AiSearchHistory() {
    const [conversations, setConversations] = useState<AiConversation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const conversationsRef = query(ref(database, 'ai-conversations'), orderByChild('timestamp'), limitToLast(50));
        const unsubscribe = onValue(conversationsRef, (snapshot) => {
            const data: Record<string, Omit<AiConversation, 'id'>> = snapshot.val();
            if (data) {
                const convoList: AiConversation[] = Object.entries(data)
                    .map(([id, value]) => ({ id, ...value }))
                    .sort((a, b) => b.timestamp - a.timestamp); // Sort descending
                setConversations(convoList);
            }
             setLoading(false);
        }, (error) => {
            console.error("Error fetching conversations:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (conversations.length === 0) {
        return <p className="text-center text-muted-foreground mt-4">এখনো কোনো কথোপকথনের ইতিহাস নেই।</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><History className="h-6 w-6" /> AI কথোপকথনের ইতিহাস</CardTitle>
                <CardDescription>ছাত্র-ছাত্রীরা সহপাঠী AI দিয়ে যা সার্চ করেছে তার সর্বশেষ ৫০টি ফলাফল।</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[60vh]">
                     <Accordion type="single" collapsible className="w-full space-y-2">
                        {conversations.map((convo, index) => (
                            <AccordionItem value={`item-${index}`} key={convo.id}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full pr-4">
                                        <div className="text-left">
                                            <p className="font-semibold">ছাত্র: শ্রেণি-{convo.student.class}, রোল-{convo.student.roll}</p>
                                            <p className="text-sm text-muted-foreground truncate max-w-xs">প্রশ্ন: {convo.query}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground text-right">{toBengaliDateTime(convo.timestamp)}</p>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-md border">
                                        <h4 className="font-semibold flex items-center gap-2 mb-2"><BookOpen className="h-4 w-4" /> ছাত্রের প্রশ্ন:</h4>
                                        <p className="whitespace-pre-wrap">{convo.query}</p>
                                        {convo.imageUrl && <img src={convo.imageUrl} alt="student-upload" className="mt-2 rounded-md max-w-sm" />}
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                                        <h4 className="font-semibold flex items-center gap-2 mb-2 text-blue-800"><MessageSquare className="h-4 w-4" /> AI-এর উত্তর:</h4>
                                        <p className="whitespace-pre-wrap">{convo.response}</p>
                                        {convo.generatedImage && <img src={convo.generatedImage} alt="ai-generated" className="mt-2 rounded-md max-w-sm" />}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}


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
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
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
        <Tabs defaultValue="ai-history" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-history">AI সার্চ হিস্ট্রি</TabsTrigger>
            <TabsTrigger value="notice-management">নোটিশ ম্যানেজমেন্ট</TabsTrigger>
          </TabsList>
          <TabsContent value="ai-history">
            <AiSearchHistory />
          </TabsContent>
          <TabsContent value="notice-management">
            <NoticeManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
