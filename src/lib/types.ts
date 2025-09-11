export interface SubjectMarks {
  subjectName: string;
  terminal: number;
  continuous: number;
}

export interface ExamResult {
  examType: "প্রথম প্রান্তিক" | "দ্বিতীয় প্রান্তিক" | "বার্ষিক";
  subjects: SubjectMarks[];
}

export interface Student {
  id: string;
  class: number;
  roll: number;
  name: string;
  fatherName: string;
  motherName: string;
  results: ExamResult[];
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

export interface AiMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  image?: string; // For user uploads (preview URL)
  generatedImage?: string; // For AI responses
}
