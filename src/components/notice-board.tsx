"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing } from "lucide-react";
import { notices } from "@/lib/notices-data";

const toBengaliDate = (dateString: string) => {
  const date = new Date(dateString);
  const bnMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const bnNumbers: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  const day = String(date.getDate()).replace(
    /\d/g,
    (d) => bnNumbers[d as keyof typeof bnNumbers]
  );
  const month = bnMonths[date.getMonth()];
  const year = String(date.getFullYear()).replace(
    /\d/g,
    (d) => bnNumbers[d as keyof typeof bnNumbers]
  );
  return `${day} ${month}, ${year}`;
};

export const NoticeBoard = () => {
  const sortedNotices = [...notices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="shadow-lg mt-8">
      <CardHeader className="text-center bg-primary/10 rounded-t-lg">
        <CardTitle className="text-2xl text-primary font-bold flex items-center justify-center gap-2">
          <BellRing className="h-7 w-7 text-primary" />
          বিদ্যালয়ের নোটিশ
        </CardTitle>
        <CardDescription>
          গুরুত্বপূর্ণ নোটিশ ও ঘোষণা দেখুন
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {sortedNotices.map((notice) => (
            <div
              key={notice.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {notice.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                প্রকাশের তারিখ: {toBengaliDate(notice.date)}
              </p>
              <p className="text-gray-700">{notice.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
