import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getGradeInfo } from "@/lib/utils";
import type { Student, ExamResult } from "@/lib/types";
import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  student: Student;
  result: ExamResult;
}

const specialSubjects = ["শারীরিক শিক্ষা", "চারু ও কারুকলা", "সংগীত"];

function toBengaliNumber(enNumber: number | string) {
    const en = String(enNumber);
    const bnMap: { [key: string]: string } = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
    };
    return en.replace(/[0-9]/g, (n) => bnMap[n]);
}

const ResultCardComponent = React.forwardRef<HTMLDivElement, ResultCardProps>(({ student, result }, ref) => {
  let totalGpa = 0;
  let totalObtainedMarks = 0;
  let totalMaxMarks = 0;
  let hasFailed = false;
  let gradedSubjectsCount = 0;
  let finalGrade = 'N/A';

  const subjectsWithGrades = result.subjects.map((subject) => {
    const isSpecial = specialSubjects.includes(subject.subjectName);
    const terminalMarks = subject.terminal;
    const continuousMarks = isSpecial ? 0 : subject.continuous;
    const totalMarks = terminalMarks + continuousMarks;
    const effectiveMaxMarks = isSpecial ? 50 : 100;

    const { grade, gpa } = getGradeInfo(totalMarks, effectiveMaxMarks);

    if (grade === "F") {
      hasFailed = true;
    }
    
    totalObtainedMarks += totalMarks;
    totalMaxMarks += effectiveMaxMarks;
    
    if (!isSpecial) {
      totalGpa += gpa;
      gradedSubjectsCount++;
    }
    
    return { ...subject, totalMarks, grade, gpa, isSpecial, maxMarks: effectiveMaxMarks };
  });

  const validSubjects = gradedSubjectsCount > 0 ? gradedSubjectsCount : 1;
  const averageGpa = hasFailed ? 0 : totalGpa / validSubjects;
  const finalResult = hasFailed ? "অকৃতকার্য" : "কৃতকার্য";
  
  if (!hasFailed) {
      if (averageGpa >= 5.0) finalGrade = "A+";
      else if (averageGpa >= 4.0) finalGrade = "A";
      else if (averageGpa >= 3.5) finalGrade = "A-";
      else if (averageGpa >= 3.0) finalGrade = "B";
      else if (averageGpa >= 2.0) finalGrade = "C";
      else if (averageGpa >= 1.0) finalGrade = "D";
      else finalGrade = "F";
  } else {
      finalGrade = "F";
  }

  const getClassName = (sClass: number) => {
      switch(sClass) {
          case 1: return 'প্রথম';
          case 2: return 'দ্বিতীয়';
          case 3: return 'তৃতীয়';
          case 4: return 'চতুর্থ';
          case 5: return 'পঞ্চম';
          default: return '';
      }
  }

  return (
    <div ref={ref} className="print-container bg-white p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto animate-fade-in shadow-lg print:shadow-none print:border-0">
        <CardHeader className="text-center p-4 print:p-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়</h1>
            <p className="text-sm text-gray-600">গ্রামঃ হরিণখাইন, ওয়ার্ড নংঃ ০৬, ডাকঘরঃ বুধপুরা, উপজেলাঃ পটিয়া, জেলাঃ চট্টগ্রাম</p>
            <p className="text-sm text-gray-600">EMIS: 91411050804</p>
            <div className="mt-4 border-t pt-2">
                <h2 className="text-lg font-bold">একাডেমিক ট্রান্সক্রিপ্ট</h2>
                <p className="text-base text-gray-700">{result.examType} - {toBengaliNumber(new Date().getFullYear())}</p>
            </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 print:p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="rounded-lg p-3 bg-green-50 border border-green-200">
                  <h3 className="font-bold text-green-800 mb-2 border-b border-green-200 pb-1">শিক্ষার্থীর তথ্য</h3>
                   <p><span className="font-semibold w-24 inline-block">নাম</span>: {student.name}</p>
                  <p><span className="font-semibold w-24 inline-block">পিতার নাম</span>: {student.fatherName}</p>
                  <p><span className="font-semibold w-24 inline-block">মাতার নাম</span>: {student.motherName}</p>
                  <p><span className="font-semibold w-24 inline-block">রোল</span>: {toBengaliNumber(student.roll)}</p>
                  <p><span className="font-semibold w-24 inline-block">শ্রেণি</span>: {getClassName(student.class)}</p>
              </div>
              <div className="rounded-lg p-3 bg-blue-50 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">পরীক্ষার তথ্য</h3>
                  <p><span className="font-semibold">পরীক্ষা:</span> {result.examType}</p>
                  <p><span className="font-semibold">মোট বিষয়:</span> {toBengaliNumber(result.subjects.length)}টি</p>
              </div>
              <div className="rounded-lg p-3 bg-purple-50 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2 border-b border-purple-200 pb-1">সামগ্রিক ফলাফল</h3>
                  <p><span className="font-semibold">ফলাফল:</span> <span className={`font-bold ${hasFailed ? 'text-red-600' : 'text-green-600'}`}>{finalResult}</span></p>
                  <p><span className="font-semibold">মোট নম্বর:</span> {toBengaliNumber(totalObtainedMarks)} / {toBengaliNumber(totalMaxMarks)}</p>
                  {!hasFailed && <p><span className="font-semibold">গ্রেড:</span> {finalGrade}</p>}
                  {!hasFailed && <p><span className="font-semibold">GPA:</span> {toBengaliNumber(averageGpa.toFixed(2))}</p>}
              </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="px-2 sm:px-4 text-left font-bold text-gray-700">বিষয়</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">২য় প্রান্তিক মূল্যায়ন ({toBengaliNumber(70)})</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">ধারাবাহিক মূল্যায়ন ({toBengaliNumber(30)})</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">মোট নম্বর ({toBengaliNumber(100)})</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">প্রাপ্ত গ্রেড</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectsWithGrades.map((subject) => (
                  <TableRow key={subject.subjectName} className="border-b">
                    <TableCell className="font-medium px-2 sm:px-4 py-2">
                      {subject.subjectName}
                    </TableCell>
                    <TableCell className="text-center px-2 sm:px-4 py-2">{toBengaliNumber(subject.terminal)}</TableCell>
                    <TableCell className="text-center px-2 sm:px-4 py-2">
                      {subject.isSpecial ? '-' : toBengaliNumber(subject.continuous)}
                    </TableCell>
                    <TableCell className="text-center font-semibold px-2 sm:px-4 py-2">
                      {toBengaliNumber(subject.totalMarks)}
                    </TableCell>
                    <TableCell
                      className={`text-center font-semibold px-2 sm:px-4 py-2 ${
                        subject.grade === "F" ? "text-destructive" : ""
                      }`}
                    >
                      {subject.grade}
                    </TableCell>
                  </TableRow>
                ))}
                 <TableRow className="bg-gray-100 font-bold hover:bg-gray-100">
                      <TableCell colSpan={3} className="text-right px-2 sm:px-4 py-2 text-lg">সর্বমোট নম্বর</TableCell>
                      <TableCell colSpan={2} className="text-left px-2 sm:px-4 py-2 text-lg">{toBengaliNumber(totalObtainedMarks)} / {toBengaliNumber(totalMaxMarks)}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
         <CardFooter className="hidden print:flex justify-between items-center mt-32 px-6">
              <div className="text-center">
                  <p className="border-t border-black pt-2 w-48">ফরিদা ইয়াছমীন</p>
                  <p className="text-xs">শ্রেণি শিক্ষকের স্বাক্ষর</p>
              </div>
              <div className="text-center">
                  <p className="border-t border-black pt-2 w-48">মোঃ জসীম উদ্দীন</p>
                  <p className="text-xs">প্রধান শিক্ষকের স্বাক্ষর</p>
              </div>
          </CardFooter>
          <style jsx global>{`
              @media print {
                  @page {
                      size: A4;
                      margin: 0;
                  }
                  body {
                      -webkit-print-color-adjust: exact !important;
                      print-color-adjust: exact !important;
                      margin: 0;
                  }
                  .print-container {
                      width: 100%;
                      height: 100vh;
                      margin: 0;
                      padding: 40px;
                      display: flex;
                      flex-direction: column;
                  }
                   .print-container .max-w-4xl {
                        max-width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                   }
                  .print\\:hidden {
                      display: none;
                  }
                  .print\\:flex {
                      display: flex;
                  }
                  .print\\:shadow-none {
                      box-shadow: none;
                  }
                   .print\\:border-0 {
                      border-width: 0;
                  }
                   .print\\:p-0 {
                       padding: 0;
                   }
                   .print\\:p-2 {
                       padding: 0.5rem;
                   }
              }
          `}</style>
      </Card>
    </div>
  );
});
ResultCardComponent.displayName = 'ResultCardComponent';


export function ResultCard({ student, result }: ResultCardProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${student.name}-Result`,
  });

  return (
    <>
      <div className="print:hidden w-full max-w-4xl mx-auto text-center my-4">
        <button
          onClick={handlePrint}
          className={cn(buttonVariants({ variant: "default", size: "default" }))}
        >
          <Printer className="mr-2 h-4 w-4" />
          প্রিন্ট করুন
        </button>
      </div>
      
      <ResultCardComponent ref={componentRef} student={student} result={result} />
    </>
  );
}
