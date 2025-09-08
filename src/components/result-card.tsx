import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getGradeInfo } from "@/lib/utils";
import type { Student, ExamResult } from "@/lib/types";
import { Printer } from "lucide-react";

interface ResultCardProps {
  student: Student;
  result: ExamResult;
}

const specialSubjects = ["শারীরিক শিক্ষা", "চারু ও কারুকলা", "সংগীত"];

export function ResultCard({ student, result }: ResultCardProps) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${student.name}-Result`,
  });

  let totalGpa = 0;
  let hasFailed = false;
  let gradedSubjectsCount = 0;

  const subjectsWithGrades = result.subjects.map((subject) => {
    const isSpecial = specialSubjects.includes(subject.subjectName);
    const maxMarks = isSpecial ? 50 : 100;
    const terminalMarks = isSpecial ? subject.terminal : subject.terminal;
    const continuousMarks = isSpecial ? 0 : subject.continuous;
    const totalMarks = terminalMarks + continuousMarks;
    const { grade, gpa } = getGradeInfo(totalMarks, maxMarks);

    if (grade === "F") {
      hasFailed = true;
    }
    
    // GPA for special subjects is not included in the average
    if (!isSpecial) {
      totalGpa += gpa;
      gradedSubjectsCount++;
    }
    
    return { ...subject, totalMarks, grade, gpa, isSpecial };
  });

  const validSubjects = gradedSubjectsCount > 0 ? gradedSubjectsCount : 1;
  const averageGpa = hasFailed ? 0 : totalGpa / validSubjects;
  const finalResult = hasFailed ? "অকৃতকার্য" : "কৃতকার্য";

  return (
    <>
      <div ref={componentRef} className="print-container">
        <Card className="w-full max-w-4xl mx-auto mt-8 animate-fade-in shadow-lg print:shadow-none print:border-0">
          <CardHeader className="text-center p-4">
            <div className="flex justify-center items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়</h1>
                    <p className="text-muted-foreground">গ্রামঃ হরিণখাইন, ওয়ার্ড নংঃ ০৬, ডাকঘরঃ বুধপুরা, উপজেলাঃ পটিয়া, জেলাঃ চট্টগ্রাম</p>
                </div>
            </div>
            <CardTitle className="text-2xl font-headline">মার্কশিট</CardTitle>
            <CardDescription>
              {result.examType} - {new Date().getFullYear()}
            </CardDescription>
            <div className="pt-4 text-left text-sm space-y-1">
              <p>
                <span className="font-semibold">শিক্ষার্থীর নাম:</span> {student.name}
              </p>
              <p>
                <span className="font-semibold">পিতার নাম:</span> {student.fatherName}
              </p>
              <p>
                <span className="font-semibold">মাতার নাম:</span> {student.motherName}
              </p>
              <div className="flex space-x-8">
                <p>
                    <span className="font-semibold">শ্রেণী:</span> {student.class}ম
                </p>
                <p>
                    <span className="font-semibold">রোল নম্বর:</span> {student.roll}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-2 sm:px-4">বিষয়</TableHead>
                    <TableHead className="text-right px-2 sm:px-4">প্রান্তিক</TableHead>
                    <TableHead className="text-right px-2 sm:px-4">ধারাবাহিক</TableHead>
                    <TableHead className="text-right px-2 sm:px-4">মোট</TableHead>
                    <TableHead className="text-right px-2 sm:px-4">গ্রেড</TableHead>
                    <TableHead className="text-right px-2 sm:px-4">জিপিএ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectsWithGrades.map((subject) => (
                    <TableRow key={subject.subjectName}>
                      <TableCell className="font-medium px-2 sm:px-4">
                        {subject.subjectName}
                      </TableCell>
                      <TableCell className="text-right px-2 sm:px-4">{subject.terminal} ({subject.isSpecial ? '৫০' : '৭০'})</TableCell>
                      <TableCell className="text-right px-2 sm:px-4">
                        {subject.isSpecial ? '-' : subject.continuous} {subject.isSpecial ? '' : '(৩০)'}
                      </TableCell>
                      <TableCell className="text-right font-semibold px-2 sm:px-4">
                        {subject.totalMarks} ({subject.isSpecial ? '৫০' : '১০০'})
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold px-2 sm:px-4 ${
                          subject.grade === "F" ? "text-destructive" : ""
                        }`}
                      >
                        {subject.grade}
                      </TableCell>
                      <TableCell className="text-right px-2 sm:px-4">{subject.isSpecial ? '-' : subject.gpa.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-muted/50 p-4 rounded-b-lg gap-4 text-center sm:text-left print:bg-transparent">
             <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 font-semibold">
                <div className="flex items-center gap-2">
                    ফলাফল:{" "}
                    <Badge variant={hasFailed ? "destructive" : "default"}>
                    {finalResult}
                    </Badge>
                </div>
                {!hasFailed && <p>গড় জিপিএ: {averageGpa.toFixed(2)}</p>}
            </div>
            <p className="text-xs text-muted-foreground print:hidden">
              Harinkhaine Result Portal
            </p>
          </CardFooter>
           <div className="hidden print:block mt-24 px-6">
                <div className="flex justify-between">
                    <div>
                        <p className="border-t border-dashed border-black/50 pt-2">শ্রেণি শিক্ষকের স্বাক্ষর</p>
                        <p>ফরিদা ইয়াছমীন</p>
                    </div>
                    <div>
                        <p className="border-t border-dashed border-black/50 pt-2">প্রধান শিক্ষকের স্বাক্ষর</p>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .print-container {
                        width: 100%;
                        margin: 0;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                    }
                    .print\:hidden {
                        display: none;
                    }
                    .print\:block {
                        display: block;
                    }
                    .print\:shadow-none {
                        box-shadow: none;
                    }
                     .print\:border-0 {
                        border-width: 0;
                    }
                    .print\:bg-transparent {
                        background-color: transparent;
                    }
                }
            `}</style>
        </Card>
      </div>

      <div className="w-full max-w-4xl mx-auto text-center mt-4">
        <Button onClick={handlePrint} className="print:hidden">
          <Printer className="mr-2 h-4 w-4" />
          প্রিন্ট করুন
        </Button>
      </div>
    </>
  );
}
