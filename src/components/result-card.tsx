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
import { Button } from "@/components/ui/button";
import { getGradeInfo } from "@/lib/utils";
import type { Student, ExamResult } from "@/lib/types";
import { Printer } from "lucide-react";

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
    const maxMarks = isSpecial ? 50 : 100;
    const terminalMarks = subject.terminal;
    const continuousMarks = isSpecial ? 0 : subject.continuous;
    const totalMarks = terminalMarks + continuousMarks;
    const { grade, gpa } = getGradeInfo(totalMarks, maxMarks);

    if (grade === "F") {
      hasFailed = true;
    }
    
    totalObtainedMarks += totalMarks;
    totalMaxMarks += maxMarks;
    
    if (!isSpecial) {
      totalGpa += gpa;
      gradedSubjectsCount++;
    }
    
    return { ...subject, totalMarks, grade, gpa, isSpecial, maxMarks };
  });

  const validSubjects = gradedSubjectsCount > 0 ? gradedSubjectsCount : 1;
  const averageGpa = hasFailed ? 0 : totalGpa / validSubjects;
  const finalResult = hasFailed ? "অকৃতকার্য" : "কৃতকার্য";
  
  if (!hasFailed) {
      const overallPercentage = (totalObtainedMarks / totalMaxMarks) * 100;
      if (overallPercentage >= 80) finalGrade = "A+";
      else if (overallPercentage >= 70) finalGrade = "A";
      else if (overallPercentage >= 60) finalGrade = "A-";
      else if (overallPercentage >= 50) finalGrade = "B";
      else if (overallPercentage >= 40) finalGrade = "C";
      else if (overallPercentage >= 33) finalGrade = "D";
      else finalGrade = "F";
  } else {
      finalGrade = "F";
  }


  return (
    <div ref={ref} className="print-container bg-white p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto animate-fade-in shadow-lg print:shadow-none print:border-0">
        <CardHeader className="text-center p-4 border-b-2 border-gray-200 print:border-b-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়</h1>
            <p className="text-sm text-gray-600">গ্রামঃ হরিণখাইন, ওয়ার্ড নংঃ ০৬, ডাকঘরঃ বুধপুরা, উপজেলাঃ পটিয়া, জেলাঃ চট্টগ্রাম</p>
            <p className="text-sm text-gray-600">EMIS: 91411050804</p>
            <div className="mt-4">
                <h2 className="text-lg font-bold bg-gray-100 py-1 px-4 inline-block rounded-md border">একাডেমিক ট্রান্সক্রিপ্ট</h2>
                <p className="text-base text-gray-700 mt-1">{result.examType} - {toBengaliNumber(new Date().getFullYear())}</p>
            </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
              <div className="space-y-1">
                  <p><span className="font-semibold w-28 inline-block">শিক্ষার্থীর নাম</span>: {student.name}</p>
                  <p><span className="font-semibold w-28 inline-block">পিতার নাম</span>: {student.fatherName}</p>
                  <p><span className="font-semibold w-28 inline-block">মাতার নাম</span>: {student.motherName}</p>
              </div>
              <div className="space-y-1">
                  <p><span className="font-semibold w-28 inline-block">শ্রেণি</span>: {student.class === 1 ? 'প্রথম' : student.class === 2 ? 'দ্বিতীয়' : student.class === 3 ? 'তৃতীয়' : student.class === 4 ? 'চতুর্থ' : 'পঞ্চম'}</p>
                  <p><span className="font-semibold w-28 inline-block">রোল</span>: {toBengaliNumber(student.roll)}</p>
              </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="px-2 sm:px-4 text-left font-bold text-gray-700">বিষয়</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">প্রান্তিক মূল্যায়ন (৭০)</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">ধারাবাহিক মূল্যায়ন (৩০)</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">মোট নম্বর (১০০)</TableHead>
                  <TableHead className="text-center px-2 sm:px-4 font-bold text-gray-700">প্রাপ্ত গ্রেড</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectsWithGrades.map((subject) => (
                  <TableRow key={subject.subjectName}>
                    <TableCell className="font-medium px-2 sm:px-4">
                      {subject.subjectName}
                    </TableCell>
                    <TableCell className="text-center px-2 sm:px-4">{toBengaliNumber(subject.terminal)}</TableCell>
                    <TableCell className="text-center px-2 sm:px-4">
                      {subject.isSpecial ? '-' : toBengaliNumber(subject.continuous)}
                    </TableCell>
                    <TableCell className="text-center font-semibold px-2 sm:px-4">
                      {toBengaliNumber(subject.totalMarks)}
                    </TableCell>
                    <TableCell
                      className={`text-center font-semibold px-2 sm:px-4 ${
                        subject.grade === "F" ? "text-destructive" : ""
                      }`}
                    >
                      {subject.grade}
                    </TableCell>
                  </TableRow>
                ))}
                 <TableRow className="bg-gray-50 font-bold hover:bg-gray-50">
                      <TableCell colSpan={3} className="text-right px-2 sm:px-4">সর্বমোট নম্বর</TableCell>
                      <TableCell colSpan={2} className="text-left px-2 sm:px-4">{toBengaliNumber(totalObtainedMarks)} / {toBengaliNumber(totalMaxMarks)}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </div>
           <div className="mt-4 flex justify-end">
                <div className="border rounded-lg p-3 bg-gray-50 w-full max-w-xs">
                    <h3 className="font-bold text-gray-800 mb-2 border-b pb-1">ফলাফলের সারসংক্ষেপ</h3>
                     <p><span className="font-semibold">ফলাফল:</span> <span className={`font-bold ${hasFailed ? 'text-red-600' : 'text-green-600'}`}>{finalResult}</span></p>
                    {!hasFailed && <p><span className="font-semibold">গ্রেড:</span> {finalGrade}</p>}
                    {!hasFailed && <p><span className="font-semibold">GPA:</span> {toBengaliNumber(averageGpa.toFixed(2))}</p>}
                </div>
            </div>
        </CardContent>
         <CardFooter className="hidden print:block mt-24 px-6">
              <div className="flex justify-between">
                  <div className="text-center">
                      <p className="border-t border-dashed border-black pt-2 w-48">শ্রেণি শিক্ষকের স্বাক্ষর</p>
                  </div>
                  <div className="text-center">
                      <p className="border-t border-dashed border-black pt-2 w-48">প্রধান শিক্ষকের স্বাক্ষর</p>
                  </div>
              </div>
          </CardFooter>
          <style jsx global>{`
              @media print {
                  body {
                      -webkit-print-color-adjust: exact;
                      print-color-adjust: exact;
                  }
                  .print-container {
                      width: 100%;
                      height: 100%;
                      position: absolute;
                      top: 0;
                      left: 0;
                      margin: 0;
                      padding: 20px;
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
                  .print\:border-b-0 {
                      border-bottom-width: 0;
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
      <ResultCardComponent ref={componentRef} student={student} result={result} />
      <div className="w-full max-w-4xl mx-auto text-center mt-4 print:hidden">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          প্রিন্ট করুন
        </Button>
      </div>
    </>
  );
}
