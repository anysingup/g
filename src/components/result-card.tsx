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
import { cn } from "@/lib/utils";

interface ResultCardProps {
  student: Student;
  result: ExamResult;
}

const specialSubjects_c3_5 = ["শারীরিক শিক্ষা", "চারুকলা", "কারুকলা", "সংগীত"];

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
  let hasFailedOverall = false;
  let gradedSubjectsCount = 0;
  let finalGrade = 'N/A';

  const isClass1Or2 = student.class === 1 || student.class === 2;

  const subjectsWithGrades = result.subjects.map((subject) => {
    const terminalMarks = subject.terminal;
    const continuousMarks = subject.continuous;
    let totalMarks = terminalMarks;
    let effectiveMaxMarks = 100;
    let hasContinuous = false;
    let subjectHasFailed = false;

    if (isClass1Or2) {
        if (["বাংলা", "গনিত", "ইংরেজি"].includes(subject.subjectName)) {
            hasContinuous = true;
            totalMarks += continuousMarks;
            effectiveMaxMarks = 100;
            if (terminalMarks < 20 || continuousMarks < 20) {
                subjectHasFailed = true;
            }
        } else {
             hasContinuous = false;
             effectiveMaxMarks = 50;
             if (subject.subjectName === "শারীরিক ও মানসিক স্বাস্থ্য" || subject.subjectName === "চারু ও কারুকলা") {
                effectiveMaxMarks = 25;
             }
             if (terminalMarks < (effectiveMaxMarks * 0.4)) { // 40% pass mark
                subjectHasFailed = true;
            }
        }
    } else { // Class 3-5
        const isSpecial = specialSubjects_c3_5.includes(subject.subjectName);
        hasContinuous = !isSpecial;
        effectiveMaxMarks = isSpecial ? 50 : 100;
        
        if(hasContinuous) {
            totalMarks += continuousMarks;
            if (terminalMarks < 28 || continuousMarks < 10) { // Assuming 70 for terminal, 30 for continuous
                subjectHasFailed = true;
            }
        } else {
             if (terminalMarks < 17) { // 33% of 50
                subjectHasFailed = true;
            }
        }
    }

    if(subjectHasFailed) {
        hasFailedOverall = true;
    }

    const { grade, gpa } = subjectHasFailed 
        ? { grade: "F", gpa: 0.0 } 
        : getGradeInfo(totalMarks, effectiveMaxMarks);

    totalObtainedMarks += totalMarks;
    totalMaxMarks += effectiveMaxMarks;
    
    const isGradedForGpa = isClass1Or2 
        ? true
        : !specialSubjects_c3_5.includes(subject.subjectName);

    if (isGradedForGpa) {
      totalGpa += gpa;
      gradedSubjectsCount++;
    }
    
    return { ...subject, totalMarks, grade, gpa, isSpecial: !isGradedForGpa, hasContinuous, maxMarks: effectiveMaxMarks, hasFailed: subjectHasFailed };
  });

  const validSubjects = gradedSubjectsCount > 0 ? gradedSubjectsCount : 1;
  const averageGpa = hasFailedOverall ? 0 : totalGpa / validSubjects;
  const finalResult = hasFailedOverall ? "অকৃতকার্য" : "কৃতকার্য";
  
  if (!hasFailedOverall) {
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

  const getTerminalExamName = (examType: string) => {
      if (examType === "প্রথম প্রান্তিক") return "প্রথম প্রান্তিক মূল্যায়ন";
      if (examType === "দ্বিতীয় প্রান্তিক") return "দ্বিতীয় প্রান্তিক মূল্যায়ন";
      if (examType === "বার্ষিক") return "বার্ষিক মূল্যায়ন";
      return examType;
  }
  
  const currentYear = new Date().getFullYear();

  const getClassTeacherName = (sClass: number) => {
      if (sClass < 3) return "শাকিলা বেগম";
      return "ফরিদা ইয়াছমীন";
  }

  return (
    <div ref={ref} className="print-container bg-white p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto animate-fade-in shadow-lg print:shadow-none print:border-0">
        <CardHeader className="text-center p-4 print:p-2 border-b-2 border-gray-200 relative">
            <div className="flex justify-center items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-blue-800">হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়</h1>
                    <p className="text-base text-gray-700">গ্রামঃ হরিণখাইন, ওয়ার্ড নংঃ ০৬, ডাকঘরঃ বুধপুরা, উপজেলাঃ পটিয়া, জেলাঃ চট্টগ্রাম</p>
                    <p className="text-base text-gray-700">EMIS: 91411050804</p>
                </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
                <div className="h-px bg-gray-300 w-full"></div>
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-bold text-blue-700">একাডেমিক ট্রান্সক্রিপ্ট</h2>
                <p className="text-lg text-gray-600 font-semibold">{getTerminalExamName(result.examType)} - {toBengaliNumber(currentYear)}</p>
            </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 print:p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-base">
              <div className="rounded-lg p-4 bg-green-50 border border-green-200">
                  <h3 className="font-bold text-green-800 mb-2 pb-1 border-b border-green-200">শিক্ষার্থীর তথ্য</h3>
                  <p><span className="font-semibold mr-2">নাম:</span>{student.name}</p>
                  <p><span className="font-semibold mr-2">পিতার নাম:</span>{student.fatherName}</p>
                  <p><span className="font-semibold mr-2">মাতার নাম:</span>{student.motherName}</p>
                  <p><span className="font-semibold mr-2">রোল:</span>{toBengaliNumber(student.roll)}</p>
                  <p><span className="font-semibold mr-2">শ্রেণি:</span>{getClassName(student.class)}</p>
              </div>
              <div className="rounded-lg p-4 bg-blue-50 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2 pb-1 border-b border-blue-200">পরীক্ষার তথ্য</h3>
                  <p><span className="font-semibold mr-2">পরীক্ষা:</span>{result.examType}</p>
                  <p><span className="font-semibold mr-2">মোট বিষয়:</span>{toBengaliNumber(subjectsWithGrades.length)}টি</p>
              </div>
              <div className="rounded-lg p-4 bg-purple-50 border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2 pb-1 border-b border-purple-200">সামগ্রিক ফলাফল</h3>
                  <p><span className="font-semibold mr-2">ফলাফল:</span><span className={`font-bold ${hasFailedOverall ? 'text-red-600' : 'text-green-600'}`}>{finalResult}</span></p>
                  <p><span className="font-semibold mr-2">মোট নম্বর:</span>{toBengaliNumber(totalObtainedMarks)}/{toBengaliNumber(totalMaxMarks)}</p>
                  {!hasFailedOverall && <p><span className="font-semibold mr-2">গ্রেড:</span>{finalGrade}</p>}
                  {!hasFailedOverall && <p><span className="font-semibold mr-2">GPA:</span>{toBengaliNumber(averageGpa.toFixed(2))}</p>}
              </div>
          </div>
          
          <div className="overflow-x-auto">
             {isClass1Or2 ? (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100 hover:bg-gray-100">
                            <TableHead className="px-3 py-2 font-bold text-gray-700">বিষয়</TableHead>
                            <TableHead className="text-center px-3 py-2 font-bold text-gray-700">প্রান্তিক (৫০)</TableHead>
                            <TableHead className="text-center px-3 py-2 font-bold text-gray-700">ধারাবাহিক (৫০)</TableHead>
                            <TableHead className="text-center px-3 py-2 font-bold text-gray-700">মোট নম্বর</TableHead>
                            <TableHead className="text-center px-3 py-2 font-bold text-gray-700">প্রাপ্ত গ্রেড</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjectsWithGrades.map((subject) => (
                          <TableRow key={subject.subjectName} className="border-b even:bg-gray-50">
                            <TableCell className="font-medium px-3 py-2">{subject.subjectName}</TableCell>
                            <TableCell className="text-center px-3 py-2">{toBengaliNumber(subject.terminal)}</TableCell>
                            <TableCell className="text-center px-3 py-2">
                                {subject.hasContinuous ? toBengaliNumber(subject.continuous) : '-'}
                            </TableCell>
                            <TableCell className="text-center font-semibold px-3 py-2">{toBengaliNumber(subject.totalMarks)}</TableCell>
                            <TableCell className={`text-center font-semibold px-3 py-2 ${subject.grade === "F" ? "text-destructive" : ""}`}>{subject.grade}</TableCell>
                          </TableRow>
                        ))}
                         <TableRow className="bg-gray-200 font-bold hover:bg-gray-200">
                              <TableCell colSpan={3} className="text-right px-3 py-2 text-lg">সর্বমোট নম্বর</TableCell>
                              <TableCell colSpan={2} className="text-center px-3 py-2 text-lg">{toBengaliNumber(totalObtainedMarks)} / {toBengaliNumber(totalMaxMarks)}</TableCell>
                          </TableRow>
                    </TableBody>
                </Table>
             ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100 hover:bg-gray-100">
                      <TableHead className="px-3 py-2 font-bold text-gray-700">বিষয়</TableHead>
                      <TableHead className="text-center px-3 py-2 font-bold text-gray-700">২য় প্রান্তিক মূল্যায়ন (৭০)</TableHead>
                      <TableHead className="text-center px-3 py-2 font-bold text-gray-700">ধারাবাহিক মূল্যায়ন (৩০)</TableHead>
                      <TableHead className="text-center px-3 py-2 font-bold text-gray-700">মোট নম্বর (১০০)</TableHead>
                      <TableHead className="text-center px-3 py-2 font-bold text-gray-700">প্রাপ্ত গ্রেড</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectsWithGrades.map((subject) => (
                      <TableRow key={subject.subjectName} className="border-b even:bg-gray-50">
                        <TableCell className="font-medium px-3 py-2">{subject.subjectName}</TableCell>
                        <TableCell className="text-center px-3 py-2">{toBengaliNumber(subject.terminal)}</TableCell>
                         <TableCell className="text-center px-3 py-2">
                            {subject.hasContinuous ? toBengaliNumber(subject.continuous) : '-'}
                        </TableCell>
                        <TableCell className="text-center font-semibold px-3 py-2">{toBengaliNumber(subject.totalMarks)}</TableCell>
                        <TableCell className={`text-center font-semibold px-3 py-2 ${subject.grade === "F" ? "text-destructive" : ""}`}>{subject.grade}</TableCell>
                      </TableRow>
                    ))}
                     <TableRow className="bg-gray-200 font-bold hover:bg-gray-200">
                          <TableCell colSpan={3} className="text-right px-3 py-2 text-lg">সর্বমোট নম্বর</TableCell>
                          <TableCell colSpan={2} className="text-center px-3 py-2 text-lg">{toBengaliNumber(totalObtainedMarks)} / {toBengaliNumber(totalMaxMarks)}</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
             )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-8 pt-8 border-t px-6 print:mt-32">
            <div className="text-center">
                <p className="border-t border-black pt-2 px-8">{getClassTeacherName(student.class)}</p>
                <p> শ্রেণি শিক্ষকের স্বাক্ষর</p>
            </div>
            <div className="text-center">
                <p className="border-t border-black pt-2 px-8">মোঃ জসীম উদ্দীন</p>
                <p>প্রধান শিক্ষকের স্বাক্ষর</p>
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
                  .print-hidden {
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
      <div className="print-hidden w-full max-w-4xl mx-auto text-center my-4">
        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Printer className="mr-2 h-4 w-4" />
          প্রিন্ট করুন
        </button>
      </div>
      
      <ResultCardComponent ref={componentRef} student={student} result={result} />
    </>
  );
}
