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
import { getGradeInfo } from "@/lib/utils";
import type { Student, ExamResult } from "@/lib/types";

interface ResultCardProps {
  student: Student;
  result: ExamResult;
}

export function ResultCard({ student, result }: ResultCardProps) {
  let totalGpa = 0;
  let hasFailed = false;

  const subjectsWithGrades = result.subjects.map((subject) => {
    const totalMarks = subject.terminal + subject.continuous;
    const { grade, gpa } = getGradeInfo(totalMarks);
    if (grade === "F") {
      hasFailed = true;
    }
    totalGpa += gpa;
    return { ...subject, totalMarks, grade, gpa };
  });

  const validSubjects = result.subjects.length > 0 ? result.subjects.length : 1;
  const averageGpa = hasFailed ? 0 : totalGpa / validSubjects;
  const finalResult = hasFailed ? "অকৃতকার্য" : "কৃতকার্য";

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 animate-fade-in shadow-lg">
      <CardHeader className="text-center p-4">
        <CardTitle className="text-2xl font-headline">মার্কশিট</CardTitle>
        <CardDescription>
          {result.examType} - {new Date().getFullYear()}
        </CardDescription>
        <div className="pt-4 text-left text-sm space-y-1">
          <p>
            <span className="font-semibold">শিক্ষার্থীর নাম:</span>{" "}
            {student.name}
          </p>
          <p>
            <span className="font-semibold">শ্রেণী:</span> {student.class}ম
          </p>
          <p>
            <span className="font-semibold">রোল নম্বর:</span> {student.roll}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 sm:px-4">বিষয়</TableHead>
                <TableHead className="text-right px-2 sm:px-4">প্রান্তিক (৭০)</TableHead>
                <TableHead className="text-right px-2 sm:px-4">ধারাবাহিক (৩০)</TableHead>
                <TableHead className="text-right px-2 sm:px-4">মোট (১০০)</TableHead>
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
                  <TableCell className="text-right px-2 sm:px-4">{subject.terminal}</TableCell>
                  <TableCell className="text-right px-2 sm:px-4">
                    {subject.continuous}
                  </TableCell>
                  <TableCell className="text-right font-semibold px-2 sm:px-4">
                    {subject.totalMarks}
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold px-2 sm:px-4 ${
                      subject.grade === "F" ? "text-destructive" : ""
                    }`}
                  >
                    {subject.grade}
                  </TableCell>
                  <TableCell className="text-right px-2 sm:px-4">{subject.gpa.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-muted/50 p-4 rounded-b-lg gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 font-semibold">
          <p>
            ফলাফল:{" "}
            <Badge variant={hasFailed ? "destructive" : "default"}>
              {finalResult}
            </Badge>
          </p>
          {!hasFailed && <p>মোট জিপিএ: {averageGpa.toFixed(2)}</p>}
        </div>
        <p className="text-xs text-muted-foreground">
          Harinkhaine Result Portal
        </p>
      </CardFooter>
    </Card>
  );
}
