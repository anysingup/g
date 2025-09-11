'use client';

import { useState, useEffect, useRef } from 'react';
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
import { Loader2, Bot } from 'lucide-react';
import { getClassmateResponse } from '@/ai/flows/classmate-ai';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

export function ClassmateAi() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedConversation = localStorage.getItem('classmate-ai-conversation');
      if (savedConversation) {
        setConversation(JSON.parse(savedConversation));
      }
    } catch (error) {
      console.error("Failed to parse conversation from localStorage", error);
      // If parsing fails, clear the corrupted data
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMessage: Message = { sender: 'user', text: query };
    setConversation(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const result = await getClassmateResponse({ query: userMessage.text });
      if (result.response) {
        const aiMessage: Message = { sender: 'ai', text: result.response };
        setConversation(prev => [...prev, aiMessage]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error('AI assistant error:', error);
      const errorMessage: Message = {
        sender: 'ai',
        text: 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
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
          তোমার পড়াশোনার যেকোনো প্রশ্ন আমাকে করতে পারো।
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
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
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
      <CardFooter className="p-6 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Textarea
            id="query"
            placeholder="এখানে তোমার প্রশ্ন লেখো..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <Button type="submit" disabled={loading || !query.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                পাঠানো হচ্ছে...
              </>
            ) : (
              'পাঠাও'
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
