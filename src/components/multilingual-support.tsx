"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Loader2, Terminal } from "lucide-react";
import { getMultilingualSupport } from "@/ai/flows/multilingual-support";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MultilingualSupport() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");
    try {
      const result = await getMultilingualSupport({ userQuery: query });
      if (result.translatedMessage) {
        setResponse(result.translatedMessage);
      } else {
        throw new Error("No response from AI");
      }
    } catch (error) {
      console.error("AI support error:", error);
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "সহায়তা পেতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90"
          aria-label="সাহায্য"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>বহুভাষিক সহায়তা</DialogTitle>
            <DialogDescription>
              আপনার প্রশ্ন বা সমস্যা এখানে লিখুন। আমরা আপনাকে আপনার ভাষায় সহায়তা
              করার চেষ্টা করব।
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="query">আপনার প্রশ্ন</Label>
              <Textarea
                id="query"
                placeholder="রেজাল্ট দেখতে সমস্যা হচ্ছে..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          {response && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>আমাদের উত্তর</AlertTitle>
              <AlertDescription>{response}</AlertDescription>
            </Alert>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
                <Button variant="outline">বন্ধ করুন</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  লোড হচ্ছে...
                </>
              ) : (
                "প্রশ্ন জমা দিন"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
