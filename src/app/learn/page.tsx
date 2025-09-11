import { LanguageQuiz } from "@/components/language-quiz";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function LearnPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2d2d2d] text-white p-4">
        <div className="w-full max-w-4xl absolute top-4 left-4">
             <Button variant="outline" asChild className="bg-transparent hover:bg-gray-700 text-white border-gray-500">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    হোমপেজে ফিরে যান
                </Link>
            </Button>
        </div>
      <LanguageQuiz />
    </div>
  );
}
