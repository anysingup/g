"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { students, subjects_c1_2, subjects_c3_5 } from "@/lib/results-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultCard } from "@/components/result-card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import type { Student, ExamResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type SearchResult = {
  student: Student;
  result: ExamResult;
} | null;

function ResultDisplay() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const academicYear = searchParams.get("academicYear");
    const studentClass = searchParams.get("class");
    const examType = searchParams.get("examType");
    const rollNumber = searchParams.get("rollNumber");

    if (!academicYear || !studentClass || !examType || !rollNumber) {
      setError("অনুসন্ধানের জন্য সমস্ত তথ্য প্রয়োজন।");
      setLoading(false);
      return;
    }
    
    const sClass = parseInt(studentClass);

    const student = students.find(
      (s) =>
        s.class === sClass &&
        s.roll === parseInt(rollNumber) &&
        academicYear === "2025"
    );

    if (student) {
      const result = student.results.find((r) => r.examType === examType);
      if (result) {
        const allSubjects = sClass <= 2 ? subjects_c1_2 : subjects_c3_5;
        const subjects = allSubjects.map((subName) => {
          const found = result.subjects.find((s) => s.subjectName === subName);
          return found || { subjectName: subName, terminal: 0, continuous: 0 };
        });
        setSearchResult({ student, result: { ...result, subjects } });
      } else {
        setError(
          `এই শিক্ষার্থীর জন্য "${examType}" পরীক্ষার ফলাফল পাওয়া যায়নি।`
        );
      }
    } else {
      if (academicYear !== "2025") {
        setError("শুধুমাত্র ২০২৫ সালের ফলাফল পাওয়া যাবে।");
      } else {
        setError(
          "এই রোল নম্বরের কোনো শিক্ষার্থীকে পাওয়া যায়নি। অনুগ্রহ করে শ্রেণী ও রোল নম্বর পরীক্ষা করুন।"
        );
      }
    }
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-4 print:hidden">
        <Button variant="outline" asChild>
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ফিরে যান
            </Link>
        </Button>
      </div>

      {loading && (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="items-center p-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      )}
      {error && (
        <Alert variant="destructive" className="max-w-lg mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>ত্রুটি</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {searchResult && (
        <ResultCard
          student={searchResult.student}
          result={searchResult.result}
        />
      )}
    </div>
  );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultDisplay />
        </Suspense>
    )
}
