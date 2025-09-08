import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGradeInfo(totalMarks: number, maxMarks: number = 100): { grade: string; gpa: number } {
  const percentage = (totalMarks / maxMarks) * 100;

  if (percentage > 100 || percentage < 0) return { grade: "N/A", gpa: 0.0 };
  if (percentage >= 80) return { grade: "A+", gpa: 5.0 };
  if (percentage >= 70) return { grade: "A", gpa: 4.0 };
  if (percentage >= 60) return { grade: "A-", gpa: 3.5 };
  if (percentage >= 50) return { grade: "B", gpa: 3.0 };
  if (percentage >= 40) return { grade: "C", gpa: 2.0 };
  if (percentage >= 33) return { grade: "D", gpa: 1.0 };
  return { grade: "F", gpa: 0.0 };
}
