import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGradeInfo(totalMarks: number): { grade: string; gpa: number } {
  if (totalMarks > 100 || totalMarks < 0) return { grade: "N/A", gpa: 0.0 };
  if (totalMarks >= 80) return { grade: "A+", gpa: 5.0 };
  if (totalMarks >= 70) return { grade: "A", gpa: 4.0 };
  if (totalMarks >= 60) return { grade: "A-", gpa: 3.5 };
  if (totalMarks >= 50) return { grade: "B", gpa: 3.0 };
  if (totalMarks >= 40) return { grade: "C", gpa: 2.0 };
  if (totalMarks >= 33) return { grade: "D", gpa: 1.0 };
  return { grade: "F", gpa: 0.0 };
}
