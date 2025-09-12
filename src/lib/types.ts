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

export type AiConversation = {
  id: string;
  student: {
    class: string;
    roll: string;
  };
  query: string;
  response: string;
  imageUrl?: string;
  generatedImage?: string;
  timestamp: number;
};
