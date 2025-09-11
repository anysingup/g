"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing, Loader2 } from "lucide-react";
import type { Notice } from "@/lib/types";
import { notices as staticNotices } from "@/lib/notices-data";

const toBengaliDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const bnMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
    const bnNumbers: { [key: string]: string } = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    
    const day = String(date.getDate()).replace(/\d/g, (d) => bnNumbers[d as keyof typeof bnNumbers]);
    const month = bnMonths[date.getMonth()];
    const year = String(date.getFullYear()).replace(/\d/g, (d) => bnNumbers[d as keyof typeof bnNumbers]);

    return `${day} ${month}, ${year}`;
};

export const NoticeBoard = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Load static notices
      setNotices(staticNotices);
      setLoading(false);
    }, []);

  return (
    <Card className="shadow-lg mt-4">
      <CardHeader className="text-center bg-primary/10 rounded-t-lg">
        <CardTitle className="text-2xl text-primary font-bold flex items-center justify-center gap-2">
          <BellRing className="h-7 w-7 text-primary" />
          বিদ্যালয়ের নোটিশ
        </CardTitle>
        <CardDescription>
          গুরুত্বপূর্ণ নোটিশ ও ঘোষণা দেখুন
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 min-h-[200px]">
        {loading ? (
             <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
        ) : notices.length > 0 ? (
            <div className="space-y-4">
            {notices.map((notice) => (
                <div
                key={notice.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                <h3 className="font-semibold text-lg text-gray-800">
                    {notice.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                    প্রকাশের তারিখ: {toBengaliDateTime(notice.createdAt)}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">{notice.description}</p>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-center text-muted-foreground mt-8">এখনো কোনো নোটিশ প্রকাশ করা হয়নি।</p>
        )}
      </CardContent>
    </Card>
  );
};
