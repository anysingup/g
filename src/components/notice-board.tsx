"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BellRing, Loader2, Trash2 } from "lucide-react";
import type { Notice } from "@/lib/types";
import { notices as staticNotices } from "@/lib/notices-data";

const TEACHER_CODE = "jashimht89";

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
    const [teacherCode, setTeacherCode] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);
    const [newNoticeTitle, setNewNoticeTitle] = useState("");
    const [newNoticeDescription, setNewNoticeDescription] = useState("");

    useEffect(() => {
      // Load static notices and sort them by creation date
      setNotices(staticNotices.sort((a, b) => b.createdAt - a.createdAt));
      setLoading(false);
    }, []);

    const handleCodeSubmit = () => {
        if (teacherCode === TEACHER_CODE) {
            setIsTeacher(true);
        } else {
            alert("ভুল কোড!");
        }
    };

    const handleAddNotice = () => {
        if (!newNoticeTitle || !newNoticeDescription) {
            alert("অনুগ্রহ করে শিরোনাম এবং বিবরণ লিখুন।");
            return;
        }
        const newNotice: Notice = {
            id: Date.now().toString(),
            title: newNoticeTitle,
            description: newNoticeDescription,
            createdAt: Date.now(),
        };
        setNotices([newNotice, ...notices]);
        setNewNoticeTitle("");
        setNewNoticeDescription("");
    };
    
    const handleDeleteNotice = (id: string) => {
        if (confirm("আপনি কি এই নোটিশটি ডিলিট করতে চান?")) {
            setNotices(notices.filter((notice) => notice.id !== id));
        }
    };

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
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group"
                >
                <h3 className="font-semibold text-lg text-gray-800">
                    {notice.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                    প্রকাশের তারিখ: {toBengaliDateTime(notice.createdAt)}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">{notice.description}</p>
                 {isTeacher && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteNotice(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
            ))}
            </div>
        ) : (
            <p className="text-center text-muted-foreground mt-8">এখনো কোনো নোটিশ প্রকাশ করা হয়নি।</p>
        )}
      </CardContent>
      <CardContent className="p-6 border-t">
        {!isTeacher ? (
            <div className="flex items-center gap-2">
                <Input 
                    type="password"
                    placeholder="শিক্ষক কোড"
                    value={teacherCode}
                    onChange={(e) => setTeacherCode(e.target.value)}
                    className="max-w-xs"
                />
                <Button onClick={handleCodeSubmit}>প্রবেশ করুন</Button>
            </div>
        ) : (
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary">শিক্ষক প্যানেল</h3>
                <div className="space-y-2">
                    <Input
                        placeholder="নোটিশের শিরোনাম"
                        value={newNoticeTitle}
                        onChange={(e) => setNewNoticeTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="নোটিশের বিবরণ"
                        value={newNoticeDescription}
                        onChange={(e) => setNewNoticeDescription(e.target.value)}
                    />
                    <Button onClick={handleAddNotice}>নতুন নোটিশ যুক্ত করুন</Button>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
};
