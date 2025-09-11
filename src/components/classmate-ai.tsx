'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Bot, Paperclip, XCircle } from 'lucide-react';
import { getClassmateResponse } from '@/ai/flows/classmate-ai';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

type Message = {
  sender: 'user' | 'ai';
  text: string;
  image?: string;
  generatedImage?: string;
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export function ClassmateAi() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedConversation = localStorage.getItem('classmate-ai-conversation');
      if (savedConversation) {
        setConversation(JSON.parse(savedConversation));
      }
    } catch (error) {
      console.error("Failed to parse conversation from localStorage", error);
      localStorage.removeItem('classmate-ai-conversation');
    }
  }, []);

  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem('classmate-ai-conversation', JSON.stringify(conversation));
    }
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [conversation]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
            variant: 'destructive',
            title: 'ত্রুটি',
            description: 'ছবির সাইজ ৪ মেগাবাইটের বেশি হতে পারবে না।',
        });
        return;
      }
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!query.trim() && !imageFile) || loading) return;

    const userMessage: Message = { sender: 'user', text: query, image: imagePreview || undefined };
    setConversation(prev => [...prev, userMessage]);
    
    setLoading(true);

    try {
        let photoDataUri: string | undefined = undefined;
        if (imageFile) {
            photoDataUri = await toBase64(imageFile);
        }

      const result = await getClassmateResponse({ query: query, photoDataUri });
      
      const aiMessage: Message = { 
        sender: 'ai', 
        text: result.response,
        generatedImage: result.generatedImage,
      };
      setConversation(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('AI assistant error:', error);
      const errorMessage: Message = {
        sender: 'ai',
        text: 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setQuery('');
      removeImage();
    }
  };

  return (
    <Card className="shadow-lg mt-4 w-full">
      <CardHeader className="text-center bg-primary/10 rounded-t-lg">
        <CardTitle className="text-2xl text-primary font-bold flex items-center justify-center gap-2">
          <Bot className="h-7 w-7" />
          সহপাঠী AI
        </CardTitle>
        <CardDescription>
          তোমার পড়াশোনার যেকোনো প্রশ্ন আমাকে করতে পারো, এমনকি ছবি তুলেও।
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 w-full" ref={scrollAreaRef}>
           <div className="space-y-4 p-6">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-md rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                   {msg.image && (
                      <div className="mb-2">
                        <Image src={msg.image} alt="User upload" width={200} height={150} className="rounded-md" />
                      </div>
                    )}
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                   {msg.generatedImage && (
                        <div className="mt-2">
                            <Image src={msg.generatedImage} alt="Generated by AI" width={300} height={300} className="rounded-md" />
                        </div>
                    )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="max-w-md rounded-lg p-3 bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {imagePreview && (
            <div className="relative w-32 h-32">
              <Image src={imagePreview} alt="Image preview" layout="fill" objectFit="cover" className="rounded-md" />
              <Button variant="ghost" size="icon" className="absolute top-0 right-0 bg-black/50 hover:bg-black/75 text-white h-6 w-6" onClick={removeImage}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex w-full items-start space-x-2">
            <Textarea
              id="query"
              placeholder="এখানে তোমার প্রশ্ন লেখো..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              className="flex-1"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
             <Button asChild variant="ghost" size="icon" className='shrink-0' disabled={loading}>
                <Label htmlFor="image-upload" className='cursor-pointer'>
                    <Paperclip className='h-5 w-5' />
                    <span className="sr-only">ছবি যোগ করুন</span>
                </Label>
             </Button>
             <input
                id="image-upload"
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                disabled={loading}
             />
          <Button type="submit" disabled={loading || (!query.trim() && !imageFile)}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                পাঠানো হচ্ছে...
              </>
            ) : (
              'পাঠাও'
            )}
          </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
