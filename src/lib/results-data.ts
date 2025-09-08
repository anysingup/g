import type { Student } from "@/lib/types";

export const allSubjects = [
  "বাংলা",
  "গনিত",
  "ইংরেজি",
  "বাংলাদেশ ও বিশ্বপরিচয়",
  "প্রাথমিক বিজ্ঞান",
  "ইসলাম ধর্ম",
  "শারিরিক শিক্ষা",
  "চারুকারু",
  "সংগীত",
];

export const students: Student[] = [
  {
    id: "c1r1",
    class: 1,
    roll: 1,
    name: "আরিফ হোসেন",
    results: [
      {
        examType: "প্রথম প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 60, continuous: 25 },
          { subjectName: "গনিত", terminal: 65, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 55, continuous: 22 },
        ],
      },
    ],
  },
  {
    id: "c5r10",
    class: 5,
    roll: 10,
    name: "সুমাইয়া আক্তার",
    results: [
      {
        examType: "বার্ষিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 65, continuous: 28 },
          { subjectName: "গনিত", terminal: 68, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 62, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 58, continuous: 27 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 66, continuous: 29 },
          { subjectName: "ইসলাম ধর্ম", terminal: 70, continuous: 30 },
          { subjectName: "শারিরিক শিক্ষা", terminal: 40, continuous: 24 },
          { subjectName: "চারুকারু", terminal: 30, continuous: 26 },
          { subjectName: "সংগীত", terminal: 29, continuous: 23 },
        ],
      },
      {
        examType: "প্রথম প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 55, continuous: 24 },
          { subjectName: "গনিত", terminal: 61, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 52, continuous: 22 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 48, continuous: 23 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 56, continuous: 29 },
          { subjectName: "ইসলাম ধর্ম", terminal: 60, continuous: 30 },
        ],
      },
       {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 45, continuous: 20 },
          { subjectName: "গনিত", terminal: 51, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 42, continuous: 20 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 38, continuous: 21 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 46, continuous: 25 },
          { subjectName: "ইসলাম ধর্ম", terminal: 50, continuous: 28 },
        ],
      },
    ],
  },
  {
    id: "c3r5",
    class: 3,
    roll: 5,
    name: "মোঃ রাকিব",
    results: [
       {
        examType: "বার্ষিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 30, continuous: 15 },
          { subjectName: "গনিত", terminal: 25, continuous: 10 },
          { subjectName: "ইংরেজি", terminal: 12, continuous: 20 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 28, continuous: 21 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 36, continuous: 25 },
          { subjectName: "ইসলাম ধর্ম", terminal: 40, continuous: 28 },
        ],
      },
    ]
  }
];
