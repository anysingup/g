import type { Student } from "@/lib/types";

export const allSubjects = [
  "বাংলা",
  "ইংরেজি",
  "গনিত",
  "বাংলাদেশ ও বিশ্বপরিচয়",
  "প্রাথমিক বিজ্ঞান",
  "ইসলাম ও নৈতিক শিক্ষা",
  "শারীরিক শিক্ষা",
  "চারুকলা",
  "কারুকলা",
  "সংগীত",
];

export const students: Student[] = [
  {
    id: "c1r1",
    class: 1,
    roll: 1,
    name: "আরিফ হোসেন",
    fatherName: "Unknown",
    motherName: "Unknown",
    results: [
      {
        examType: "প্রথম প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 60, continuous: 30 },
          { subjectName: "গনিত", terminal: 65, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 55, continuous: 30 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 0, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 0, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 0, continuous: 0 },
          { subjectName: "সংগীত", terminal: 0, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c5r1",
    class: 5,
    roll: 1,
    name: "আতিফা রহমান আলভী",
    fatherName: "মোহাম্মদ সেকান্দর রহমান",
    motherName: "আয়েশা ফেরদৌস",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 68, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 70, continuous: 30 },
          { subjectName: "গনিত", terminal: 69, continuous: 30 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 69, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 70, continuous: 30 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 69, continuous: 30 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r2",
    class: 5,
    roll: 2,
    name: "মো: নুরুল আহাদ",
    fatherName: "মো: নুরুল আজিম",
    motherName: "শিমু আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 58, continuous: 28 },
          { subjectName: "গনিত", terminal: 51, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 68, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 66, continuous: 29 },
          { subjectName: "ইংরেজি", terminal: 68, continuous: 30 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 69, continuous: 28 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r3",
    class: 5,
    roll: 3,
    name: "ফাহাদ করিম মোহাম্মদ",
    fatherName: "মোহাম্মদ নুরুল করিম",
    motherName: "রাজিয়া বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 53, continuous: 26 },
          { subjectName: "গনিত", terminal: 57, continuous: 27 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 69, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 70, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 47, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 58, continuous: 27 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
    {
    id: "c5r4",
    class: 5,
    roll: 4,
    name: "মোছা:তাবাচ্ছুম চৌধুরী রুহি",
    fatherName: "আবদুল অদুদ চৌধুরী",
    motherName: "সেলিনা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 57, continuous: 28 },
          { subjectName: "গনিত", terminal: 38, continuous: 16 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 68, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 70, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 53, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 66, continuous: 29 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r5",
    class: 5,
    roll: 5,
    name: "আব্দুল্লাহ ওয়াসির",
    fatherName: "মুহাম্মদ জাহাঙ্গীর আলম চৌধুরী",
    motherName: "ফরিদা ইয়াছমীন",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 45, continuous: 20 },
          { subjectName: "গনিত", terminal: 60, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 60, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 70, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 62, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 50, continuous: 30 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r6",
    class: 5,
    roll: 6,
    name: "তাকিয়া সুলতানা",
    fatherName: "মোহাম্মদ নুরুল হক",
    motherName: "রুনা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 68, continuous: 24 },
          { subjectName: "গনিত", terminal: 57, continuous: 24 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 60, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 59, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 48, continuous: 24 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 63, continuous: 25 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r7",
    class: 5,
    roll: 7,
    name: "জান্নাতুল নাঈমা",
    fatherName: "মনসুর আললম",
    motherName: "কামরুন নাহার বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 58, continuous: 27 },
          { subjectName: "গনিত", terminal: 41, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 66, continuous: 27 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 59, continuous: 26 },
          { subjectName: "ইংরেজি", terminal: 61, continuous: 27 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 67, continuous: 28 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r8",
    class: 5,
    roll: 8,
    name: "মো: সাহাদাত হোসেন সাহেদ",
    fatherName: "আবুল হাশেম",
    motherName: "শেলি আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 51, continuous: 21 },
          { subjectName: "গনিত", terminal: 30, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 55, continuous: 24 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 70, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 46, continuous: 21 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 58, continuous: 24 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r9",
    class: 5,
    roll: 9,
    name: "মোহাম্মদ তাহমিদ হোসাইন তামজিদ",
    fatherName: "মো: কামাল হোসেন",
    motherName: "ইসমাত আরা",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 30, continuous: 15 },
          { subjectName: "গনিত", terminal: 41, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 43, continuous: 18 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 59, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 35, continuous: 18 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 47, continuous: 21 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 50, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 50, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r10",
    class: 5,
    roll: 10,
    name: "জান্নাতুল মাওয়া",
    fatherName: "মোহাম্মদ বেলাল উদ্দিন",
    motherName: "তছলিমা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 50, continuous: 24 },
          { subjectName: "গনিত", terminal: 38, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 60, continuous: 27 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 52, continuous: 26 },
          { subjectName: "ইংরেজি", terminal: 61, continuous: 27 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 67, continuous: 28 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ]
      },
      {
        examType: "বার্ষিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 65, continuous: 28 },
          { subjectName: "গনিত", terminal: 68, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 62, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 58, continuous: 27 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 66, continuous: 29 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 70, continuous: 30 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 29, continuous: 0 },
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
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 60, continuous: 30 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 0, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 0, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 0, continuous: 0 },
          { subjectName: "সংগীত", terminal: 0, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c5r11",
    class: 5,
    roll: 11,
    name: "আয়েশা আক্তার",
    fatherName: "মৃত মোহাম্মদ এনামুল হক",
    motherName: "মনোয়ারা বেগম পটু",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 42, continuous: 18 },
          { subjectName: "গনিত", terminal: 28, continuous: 11 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 54, continuous: 24 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 42, continuous: 21 },
          { subjectName: "ইংরেজি", terminal: 55, continuous: 24 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 56, continuous: 25 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r12",
    class: 5,
    roll: 12,
    name: "ইমাম হোছাইন",
    fatherName: "মোহাম্মদ আইয়ুব খান",
    motherName: "রোজিনা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 32, continuous: 15 },
          { subjectName: "গনিত", terminal: 25, continuous: 15 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 55, continuous: 24 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 52, continuous: 23 },
          { subjectName: "ইংরেজি", terminal: 47, continuous: 21 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 50, continuous: 22 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r13",
    class: 5,
    roll: 13,
    name: "নুরুল ইসলাম মেহেরাব",
    fatherName: "নাজিম উদ্দিন",
    motherName: "রোকেয়া ইয়াসমিন",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 38, continuous: 15 },
          { subjectName: "গনিত", terminal: 14, continuous: 12 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 57, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 54, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 40, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 42, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r14",
    class: 5,
    roll: 14,
    name: "ইসফাদুল ইসলাম রায়হান",
    fatherName: "মুহাম্মদ বেলাল",
    motherName: "নুর আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 23, continuous: 12 },
          { subjectName: "গনিত", terminal: 23, continuous: 12 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 33, continuous: 15 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 26, continuous: 12 },
          { subjectName: "ইংরেজি", terminal: 48, continuous: 21 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 25, continuous: 15 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r15",
    class: 5,
    roll: 15,
    name: "জান্নাতুল মাওয়া তোহা",
    fatherName: "মোহাম্মদ খোরশেদ আলম",
    motherName: "ববী আক্তার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 39, continuous: 21 },
          { subjectName: "গনিত", terminal: 25, continuous: 15 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 52, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 49, continuous: 21 },
          { subjectName: "ইংরেজি", terminal: 39, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 42, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r16",
    class: 5,
    roll: 16,
    name: "সাফিয়া ইসরাত আদিলা",
    fatherName: "মোহাম্মদ শফিউল আলম",
    motherName: "তাজমিন নাহার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 45, continuous: 20 },
          { subjectName: "গনিত", terminal: 45, continuous: 21 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 60, continuous: 27 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 44, continuous: 21 },
          { subjectName: "ইংরেজি", terminal: 46, continuous: 21 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 40, continuous: 18 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r17",
    class: 5,
    roll: 17,
    name: "রুমি আক্তার রুশনি",
    fatherName: "মোহাম্মদ শরীফ",
    motherName: "বুলু আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 40, continuous: 18 },
          { subjectName: "গনিত", terminal: 23, continuous: 20 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 56, continuous: 24 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 35, continuous: 15 },
          { subjectName: "ইংরেজি", terminal: 45, continuous: 21 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 37, continuous: 18 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r18",
    class: 5,
    roll: 18,
    name: "রোমমান মোহাম্মদ রিহাদ",
    fatherName: "মীর মোহাম্মদ",
    motherName: "রকিবা বেগম রকি",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 40, continuous: 18 },
          { subjectName: "গনিত", terminal: 36, continuous: 16 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 44, continuous: 20 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 38, continuous: 16 },
          { subjectName: "ইংরেজি", terminal: 48, continuous: 16 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 43, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r19",
    class: 5,
    roll: 19,
    name: "মো: আরফাতুল ইসলাম এহসান",
    fatherName: "মো: মাহাবুল আলম",
    motherName: "ইয়াছমিন আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 33, continuous: 15 },
          { subjectName: "গনিত", terminal: 23, continuous: 15 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 36, continuous: 15 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 37, continuous: 16 },
          { subjectName: "ইংরেজি", terminal: 31, continuous: 15 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 37, continuous: 15 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 35, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r20",
    class: 5,
    roll: 20,
    name: "জান্নাতুল ফেরদৌস",
    fatherName: "মোঃ সেকান্দর",
    motherName: "খালেদা বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 47, continuous: 20 },
          { subjectName: "গনিত", terminal: 29, continuous: 15 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 59, continuous: 20 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 39, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 50, continuous: 22 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 38, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 35, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "সংগীত", terminal: 35, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r21",
    class: 5,
    roll: 21,
    name: "সাবেকুন নাহার",
    fatherName: "মোহাম্মদ মুছা",
    motherName: "বিলকিস আকতার মিতু",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 38, continuous: 16 },
          { subjectName: "গনিত", terminal: 28, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 56, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 38, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 37, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 35, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 35, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "সংগীত", terminal: 35, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r22",
    class: 5,
    roll: 22,
    name: "ফরহাদুল ইসলাম",
    fatherName: "মোহাম্মদ ফারুক",
    motherName: "রিফা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 33, continuous: 15 },
          { subjectName: "গনিত", terminal: 23, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 41, continuous: 20 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 36, continuous: 18 },
          { subjectName: "ইংরেজি", terminal: 33, continuous: 15 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 43, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 35, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "সংগীত", terminal: 35, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r23",
    class: 5,
    roll: 23,
    name: "সিদরাতুল মিনতাহা",
    fatherName: "মোঃ আবু তৈয়ব",
    motherName: "বেবি আক্তার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 32, continuous: 15 },
          { subjectName: "গনিত", terminal: 23, continuous: 20 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 55, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 41, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 42, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 31, continuous: 15 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 35, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "সংগীত", terminal: 35, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r24",
    class: 5,
    roll: 24,
    name: "মোঃ জায়েদ খান",
    fatherName: "মো জমির উদ্দীন",
    motherName: "তাহেরা আক্তার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 29, continuous: 20 },
          { subjectName: "গনিত", terminal: 29, continuous: 20 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 37, continuous: 20 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 40, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 36, continuous: 18 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 34, continuous: 17 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 35, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 35, continuous: 0 },
          { subjectName: "সংগীত", terminal: 35, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r25",
    class: 5,
    roll: 25,
    name: "শহীদুল ইসলাম মিনহাজ",
    fatherName: "জয়নাল আবেদীন",
    motherName: "শামমীমা আক্তার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 30, continuous: 15 },
          { subjectName: "গনিত", terminal: 25, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 31, continuous: 15 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 36, continuous: 15 },
          { subjectName: "ইংরেজি", terminal: 40, continuous: 15 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 42, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r26",
    class: 5,
    roll: 26,
    name: "সালাউদ্দিন মাহি",
    fatherName: "আনোয়ার হোসেন",
    motherName: "কাউছার আক্তার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 34, continuous: 15 },
          { subjectName: "গনিত", terminal: 25, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 43, continuous: 20 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 34, continuous: 15 },
          { subjectName: "ইংরেজি", terminal: 45, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 49, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r27",
    class: 5,
    roll: 27,
    name: "আলিফা আকতার",
    fatherName: "নজরুল ইসলাম",
    motherName: "ইয়াছমিন আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 40, continuous: 20 },
          { subjectName: "গনিত", terminal: 16, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 30, continuous: 15 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 37, continuous: 15 },
          { subjectName: "ইংরেজি", terminal: 33, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 33, continuous: 18 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c5r28",
    class: 5,
    roll: 28,
    name: "বোরহান উদ্দীন",
    fatherName: "মোঃ রেজাউল করিম",
    motherName: "সাগেরা খাতুন",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 30, continuous: 15 },
          { subjectName: "গনিত", terminal: 23, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 49, continuous: 20 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 34, continuous: 15 },
          { subjectName: "ইংরেজি", terminal: 23, continuous: 15 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 38, continuous: 15 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 30, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ]
      }
    ]
  },
  {
    id: "c3r5",
    class: 3,
    roll: 5,
    name: "মোঃ রাকিব",
    fatherName: "Unknown",
    motherName: "Unknown",
    results: [
       {
        examType: "বার্ষিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 30, continuous: 15 },
          { subjectName: "গনিত", terminal: 25, continuous: 10 },
          { subjectName: "ইংরেজি", terminal: 12, continuous: 20 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 28, continuous: 21 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 36, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 40, continuous: 28 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 0, continuous: 0 },
          { subjectName: "চারুকলা", terminal: 0, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 0, continuous: 0 },
          { subjectName: "সংগীত", terminal: 0, continuous: 0 },
        ],
      },
    ]
  }
];
