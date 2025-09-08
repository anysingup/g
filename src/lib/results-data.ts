import type { Student } from "@/lib/types";

export const allSubjects = [
  "বাংলা",
  "ইংরেজি",
  "গনিত",
  "ইসলাম ও নৈতিক শিক্ষা",
  "সমাজ বিজ্ঞান (সমন্বিত)",
  "শারীরিক ও মানসিক স্বাস্থ্য",
  "চারুকলা",
  "কারুকলা",
  "সংগীত",
  "বাংলাদেশ ও বিশ্বপরিচয়",
  "প্রাথমিক বিজ্ঞান",
  "শারীরিক শিক্ষা",
];

export const students: Student[] = [
  {
    id: "c1r1",
    class: 1,
    roll: 1,
    name: "আলআমিন",
    fatherName: "কামরান হোসেন",
    motherName: "শারমিন আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 50, continuous: 50 },
          { subjectName: "গনিত", terminal: 50, continuous: 50 },
          { subjectName: "ইংরেজি", terminal: 50, continuous: 50 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 45, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 25, continuous: 0 },
          { subjectName: "সংগীত", terminal: 50, continuous: 0 },
        ],
      },
      {
        examType: "প্রথম প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 60, continuous: 30 },
          { subjectName: "গনিত", terminal: 65, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 55, continuous: 30 },
        ],
      },
    ],
  },
  {
    id: "c1r2",
    class: 1,
    roll: 2,
    name: "হুমাইরা তাবাসসুম",
    fatherName: "মনির আহমদ",
    motherName: "রুমি আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 42, continuous: 50 },
          { subjectName: "গনিত", terminal: 50, continuous: 50 },
          { subjectName: "ইংরেজি", terminal: 50, continuous: 50 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 50, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
          { subjectName: "charukola", terminal: 25, continuous: 0 },
          { subjectName: "সংগীত", terminal: 35, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r3",
    class: 1,
    roll: 3,
    name: "মাঈনুল হাসান আদনান",
    fatherName: "মামুনুর রশীদ",
    motherName: "জান্নাতুল নাঈম পিংকি",
    results: [
        {
            examType: "দ্বিতীয় প্রান্তিক",
            subjects: [
                { subjectName: "বাংলা", terminal: 47, continuous: 50 },
                { subjectName: "গনিত", terminal: 50, continuous: 50 },
                { subjectName: "ইংরেজি", terminal: 48, continuous: 50 },
                { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 50, continuous: 0 },
                { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 50, continuous: 0 },
                { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
                { subjectName: "চারু ও কারুকলা", terminal: 25, continuous: 0 },
                { subjectName: "সংগীত", terminal: 50, continuous: 0 },
            ],
        },
    ],
  },
  {
    id: "c1r4",
    class: 1,
    roll: 4,
    name: "জামাল হোসেন খোকা",
    fatherName: "বেলাল হোসেন",
    motherName: "রেহেনা আকতার",
    results: [
        {
            examType: "দ্বিতীয় প্রান্তিক",
            subjects: [
                { subjectName: "বাংলা", terminal: 41, continuous: 50 },
                { subjectName: "গনিত", terminal: 50, continuous: 50 },
                { subjectName: "ইংরেজি", terminal: 47, continuous: 50 },
                { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 30, continuous: 0 },
                { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 35, continuous: 0 },
                { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
                { subjectName: "চারু ও কারুকলা", terminal: 25, continuous: 0 },
                { subjectName: "সংগীত", terminal: 50, continuous: 0 },
            ],
        },
    ],
  },
  {
    id: "c1r5",
    class: 1,
    roll: 5,
    name: "আসহার ইনতাসির আহাদ",
    fatherName: "মোরশেদুল আলম",
    motherName: "শিমু আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 38, continuous: 20 },
          { subjectName: "গনিত", terminal: 26, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 22, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 30, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 20, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 20, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r6",
    class: 1,
    roll: 6,
    name: "নুসরাত জাহান",
    fatherName: "মো: মফিজ",
    motherName: "বিবি আয়েশা",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 18, continuous: 10 },
          { subjectName: "গনিত", terminal: 41, continuous: 10 },
          { subjectName: "ইংরেজি", terminal: 19, continuous: 10 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 10, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 10, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 10, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 10, continuous: 0 },
          { subjectName: "সংগীত", terminal: 25, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r7",
    class: 1,
    roll: 7,
    name: "রামিসা নুর",
    fatherName: "মো:নুরুল আজিজ",
    motherName: "বিলকিস আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 26, continuous: 20 },
          { subjectName: "গনিত", terminal: 50, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 26, continuous: 21 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 10, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 30, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 10, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r8",
    class: 1,
    roll: 8,
    name: "মুত্তাকิน আহমদ আরিয়ান",
    fatherName: "মোহাম্মদ মহিউদ্দিন",
    motherName: "শাহিন আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 17, continuous: 30 },
          { subjectName: "গনিত", terminal: 41, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 26, continuous: 30 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 50, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 25, continuous: 0 },
          { subjectName: "সংগীত", terminal: 20, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r9",
    class: 1,
    roll: 9,
    name: "তাইফ মোহাম্মদ ইভান",
    fatherName: "মোহাম্মদ জাকারিয়া",
    motherName: "রোকসানা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 35, continuous: 40 },
          { subjectName: "গনিত", terminal: 47, continuous: 40 },
          { subjectName: "ইংরেজি", terminal: 36, continuous: 45 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 45, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 25, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r10",
    class: 1,
    roll: 10,
    name: "শিহাব বিন দিদার",
    fatherName: "দিদারুল আলম",
    motherName: "শামীম আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 12, continuous: 10 },
          { subjectName: "গনিত", terminal: 20, continuous: 10 },
          { subjectName: "ইংরেজি", terminal: 23, continuous: 10 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 20, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 10, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 20, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r11",
    class: 1,
    roll: 11,
    name: "মেহেবিন বিনতে মেজবাহ",
    fatherName: "মেজবাহ উদ্দিন ফয়সাল",
    motherName: "মেহেজাবিন হেলেন",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 36, continuous: 40 },
          { subjectName: "গনিত", terminal: 50, continuous: 40 },
          { subjectName: "ইংরেজি", terminal: 50, continuous: 40 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 30, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 50, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 25, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r12",
    class: 1,
    roll: 12,
    name: "ফারিয়া আকতার শুভা",
    fatherName: "শামসুল আলম",
    motherName: "রিনা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 22, continuous: 20 },
          { subjectName: "গনিত", terminal: 47, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 34, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 20, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 20, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 20, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 20, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r13",
    class: 1,
    roll: 13,
    name: "আশরাফুল হক তকি",
    fatherName: "মুহাম্মাদ এরশাদুল হক",
    motherName: "তৌহিদা বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 25, continuous: 20 },
          { subjectName: "গনিত", terminal: 50, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 50, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 20, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r14",
    class: 1,
    roll: 14,
    name: "জান্নাতুল ফেরদৌস আলিফা",
    fatherName: "নুর মোহাম্মদ",
    motherName: "শিরিন আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 4, continuous: 10 },
          { subjectName: "গনিত", terminal: 4, continuous: 10 },
          { subjectName: "ইংরেজি", terminal: 1, continuous: 10 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 20, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 20, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 20, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 10, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c1r16",
    class: 1,
    roll: 16,
    name: "হাফিজুর Rahman",
    fatherName: "হেদায়েত হোসেন চৌ:",
    motherName: "মর্জিয়া বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 39, continuous: 20 },
          { subjectName: "গনit", terminal: 50, continuous: 20 },
          { subjectName: "ইংরেজি", terminal: 50, continuous: 20 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সমাজ বিজ্ঞান (সমন্বিত)", terminal: 20, continuous: 0 },
          { subjectName: "শারীরিক ও মানসিক স্বাস্থ্য", terminal: 25, continuous: 0 },
          { subjectName: "চারু ও কারুকলা", terminal: 10, continuous: 0 },
          { subjectName: "সংগীত", terminal: 25, continuous: 0 },
        ],
      },
    ],
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
          { subjectName: "চারু ও কারুকলা", terminal: 0, continuous: 0 },
          { subjectName: "সংগীত", terminal: 0, continuous: 0 },
        ],
      },
    ]
  },
  {
    id: "c4r1",
    class: 4,
    roll: 1,
    name: "জান্নাতুল ফেরদৌস আরমিন",
    fatherName: "মোঃ জসীম উদ্দীন",
    motherName: "রেহেনা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 67, continuous: 30 },
          { subjectName: "গনিত", terminal: 61, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 65, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 69, continuous: 30 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 68, continuous: 30 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 69, continuous: 30 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r2",
    class: 4,
    roll: 2,
    name: "জান্নাতুল মাওয়া ইস্পা",
    fatherName: "মো: ওমর ফারুক",
    motherName: "রোকেয়া আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 67, continuous: 30 },
          { subjectName: "গনিত", terminal: 69, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 65, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 69, continuous: 30 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 67, continuous: 30 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 70, continuous: 30 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r3",
    class: 4,
    roll: 3,
    name: "সিরাতুল সাবিহা ইলমা",
    fatherName: "মো সেলিম",
    motherName: "শাহানাজ আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 67, continuous: 30 },
          { subjectName: "গনিত", terminal: 62, continuous: 30 },
          { subjectName: "ইংরেজি", terminal: 64, continuous: 30 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 66, continuous: 30 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 62, continuous: 30 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 69, continuous: 30 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r4",
    class: 4,
    roll: 4,
    name: "মোঃ আবিদ হোসেন",
    fatherName: "আবুল হোছাইন মুন্না",
    motherName: "সুলতানা বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 51, continuous: 28 },
          { subjectName: "গনিত", terminal: 45, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 59, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 62, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 55, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 66, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r5",
    class: 4,
    roll: 5,
    name: "মোছাঃসাদিয়া আকতার",
    fatherName: "দিদারুল আলম",
    motherName: "রিকু আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 37, continuous: 28 },
          { subjectName: "গনিত", terminal: 63, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 64, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 46, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 46, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 58, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 45, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r6",
    class: 4,
    roll: 6,
    name: "সাদিয়া সোলতানা শিফা",
    fatherName: "মোঃ আবুল হাশেম",
    motherName: "শেলী আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 53, continuous: 28 },
          { subjectName: "গনিত", terminal: 34, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 54, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 61, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 49, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 64, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r7",
    class: 4,
    roll: 7,
    name: "ইমাম হোসেন ইমন",
    fatherName: "মোঃ ইমরান",
    motherName: "উম্মে হাবীবা",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 54, continuous: 28 },
          { subjectName: "গনیت", terminal: 50, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 66, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 42, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 43, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 58, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r8",
    class: 4,
    roll: 8,
    name: "উম্মে সাউদা মইশা",
    fatherName: "নুরুল আমিন",
    motherName: "আয়েশা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 41, continuous: 28 },
          { subjectName: "গনিত", terminal: 52, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 64, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 61, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 47, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 68, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r9",
    class: 4,
    roll: 9,
    name: "সাইদা সুলতানা ফারিয়া",
    fatherName: "মোরশেদুল আলম",
    motherName: "রেখা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 50, continuous: 25 },
          { subjectName: "গনিত", terminal: 39, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 38, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 49, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 40, continuous: 25 },
          { subjectName: "اسلام ও নৈতিক শিক্ষা", terminal: 57, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r10",
    class: 4,
    roll: 10,
    name: "মেহেরুন্নেছানুর জান্নাত",
    fatherName: "নুরুল আকতার",
    motherName: "দিলোয়ারা বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 52, continuous: 28 },
          { subjectName: "গনিত", terminal: 34, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 54, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 36, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 41, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 50, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r11",
    class: 4,
    roll: 11,
    name: "আলভিরা হক মাহিরা",
    fatherName: "মোঃ মোজাম্মেল",
    motherName: "রিনা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 49, continuous: 28 },
          { subjectName: "গনিত", terminal: 54, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 62, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 52, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 42, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 61, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r12",
    class: 4,
    roll: 12,
    name: "সাফা নুর",
    fatherName: "মোঃ আবুল মনছুর",
    motherName: "রোকসানা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 40, continuous: 28 },
          { subjectName: "গনিত", terminal: 39, continuous: 28 },
          { subjectName: "ইংরেজি", terminal: 53, continuous: 28 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 39, continuous: 28 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 41, continuous: 28 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 45, continuous: 28 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r13",
    class: 4,
    roll: 13,
    name: "সাবিলা নুর",
    fatherName: "মোঃ আবুল মনছুর",
    motherName: "রোকসানা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 33, continuous: 25 },
          { subjectName: "গনিত", terminal: 42, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 62, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 46, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 38, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 30, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r14",
    class: 4,
    roll: 14,
    name: "মিজবাউল আলম",
    fatherName: "দিদারুল আলম",
    motherName: "নাজু আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 30, continuous: 25 },
          { subjectName: "গনিত", terminal: 25, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 40, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 24, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 32, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 0, continuous: 0 }, // अनुपस्थित
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r15",
    class: 4,
    roll: 15,
    name: "মোঃ শাকিল",
    fatherName: "আব্দুল মুল্লা",
    motherName: "জোসনা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 23, continuous: 25 },
          { subjectName: "গনিত", terminal: 30, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 55, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 27, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 25, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 44, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r17",
    class: 4,
    roll: 17,
    name: "সানজিদা আলম",
    fatherName: "সাইফুল আলম",
    motherName: "কাইছার আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 30, continuous: 25 },
          { subjectName: "গনিত", terminal: 30, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 38, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 34, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 34, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 43, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r18",
    class: 4,
    roll: 18,
    name: "আজমাইন কাদের",
    fatherName: "নুর কাদের",
    motherName: "ফারজানা আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 36, continuous: 25 },
          { subjectName: "গনিত", terminal: 41, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 46, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 35, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 32, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 43, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r19",
    class: 4,
    roll: 19,
    name: "ফাতেমা আকতার",
    fatherName: "জসীম উদ্দিন",
    motherName: "ফেরদৌস আরা",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 19, continuous: 25 },
          { subjectName: "গনিত", terminal: 33, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 39, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 40, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 26, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 36, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r20",
    class: 4,
    roll: 20,
    name: "আহম্মদ রাজর রাফিদ",
    fatherName: "জাবের আহমদ",
    motherName: "মুন্নি আকতার",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 36, continuous: 25 },
          { subjectName: "গনিত", terminal: 32, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 52, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 36, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 37, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 34, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
        ],
      },
    ],
  },
  {
    id: "c4r21",
    class: 4,
    roll: 21,
    name: "তানজীল ইবনে মাহবুব",
    fatherName: "মাহবুবুল আলম",
    motherName: "মমতাজ বেগম",
    results: [
      {
        examType: "দ্বিতীয় প্রান্তিক",
        subjects: [
          { subjectName: "বাংলা", terminal: 43, continuous: 25 },
          { subjectName: "গনিত", terminal: 40, continuous: 25 },
          { subjectName: "ইংরেজি", terminal: 57, continuous: 25 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 42, continuous: 25 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 43, continuous: 25 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 40, continuous: 25 },
          { subjectName: "চারুকলা", terminal: 45, continuous: 0 },
          { subjectName: "কারুকলা", terminal: 40, continuous: 0 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 45, continuous: 0 },
          { subjectName: "সংগীত", terminal: 40, continuous: 0 },
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
          { subjectName: "charukola", terminal: 50, continuous: 0 },
          { subjectName: "karukola", terminal: 50, continuous: 0 },
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
          { subjectName: "বাংলা", terminal: 45, continuous: 30 },
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
          { subjectName: "charukola", terminal: 45, continuous: 0 },
          { subjectName: "karukola", terminal: 45, continuous: 0 },
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
          { subjectName: "charukola", terminal: 30, continuous: 0 },
          { subjectName: "karukola", terminal: 29, continuous: 0 },
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
          { subjectName: "charukola", terminal: 45, continuous: 0 },
          { subjectName: "karukola", terminal: 45, continuous: 0 },
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
          { subjectName: "charukola", terminal: 45, continuous: 0 },
          { subjectName: "karukola", terminal: 45, continuous: 0 },
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
          { subjectName: "charukola", terminal: 45, continuous: 0 },
          { subjectName: "karukola", terminal: 45, continuous: 0 },
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
          { subjectName: "charukola", terminal: 40, continuous: 0 },
          { subjectName: "karukola", terminal: 40, continuous: 0 },
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
          { subjectName: "বাংলা", terminal: 39, continuous: 15 },
          { subjectName: "গনিত", terminal: 25, continuous: 18 },
          { subjectName: "বাংলাদেশ ও বিশ্বপরিচয়", terminal: 52, continuous: 15 },
          { subjectName: "প্রাথমিক বিজ্ঞান", terminal: 49, continuous: 15 },
          { subjectName: "ইংরেজি", terminal: 39, continuous: 15 },
          { subjectName: "ইসলাম ও নৈতিক শিক্ষা", terminal: 42, continuous: 20 },
          { subjectName: "শারীরিক শিক্ষা", terminal: 40, continuous: 0 },
          { subjectName: "charukola", terminal: 40, continuous: 0 },
          { subjectName: "karukola", terminal: 40, continuous: 0 },
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
          { subjectName: "charukola", terminal: 40, continuous: 0 },
          { subjectName: "karukola", terminal: 40, continuous: 0 },
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
          { subjectName: "charukola", terminal: 40, continuous: 0 },
          { subjectName: "karukola", terminal: 40, continuous: 0 },
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
          { subjectName: "charukola", terminal: 40, continuous: 0 },
          { subjectName: "karukola", terminal: 40, continuous: 0 },
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
          { subjectName: "charukola", terminal: 40, continuous: 0 },
          { subjectName: "karukola", terminal: 40, continuous: 0 },
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
          { subjectName: "charukola", terminal: 35, continuous: 0 },
          { subjectName: "karukola", terminal: 35, continuous: 0 },
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
          { subjectName: "charukola", terminal: 35, continuous: 0 },
          { subjectName: "karukola", terminal: 35, continuous: 0 },
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
          { subjectName: "charukola", terminal: 35, continuous: 0 },
          { subjectName: "karukola", terminal: 35, continuous: 0 },
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
          { subjectName: "charukola", terminal: 35, continuous: 0 },
          { subjectName: "karukola", terminal: 35, continuous: 0 },
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
          { subjectName: "charukola", terminal: 35, continuous: 0 },
          { subjectName: "karukola", terminal: 35, continuous: 0 },
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
          { subjectName: "charukola", terminal: 30, continuous: 0 },
          { subjectName: "karukola", terminal: 30, continuous: 0 },
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
          { subjectName: "charukola", terminal: 30, continuous: 0 },
          { subjectName: "karukola", terminal: 30, continuous: 0 },
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
          { subjectName: "charukola", terminal: 30, continuous: 0 },
          { subjectName: "karukola", terminal: 30, continuous: 0 },
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
          { subjectName: "charukola", terminal: 30, continuous: 0 },
          { subjectName: "karukola", terminal: 30, continuous: 0 },
          { subjectName: "সংগীত", terminal: 30, continuous: 0 },
        ]
      }
    ]
  }
];

// Subjects for class 3-5
export const subjects_c3_5 = [
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

// Subjects for class 1-2
export const subjects_c1_2 = [
  "বাংলা",
  "ইংরেজি",
  "গনিত",
  "ইসলাম ও নৈতিক শিক্ষা",
  "সমাজ বিজ্ঞান (সমন্বিত)",
  "শারীরিক ও মানসিক স্বাস্থ্য",
  "চারু ও কারুকলা",
  "সংগীত",
];
