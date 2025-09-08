"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { students, allSubjects } from "@/lib/results-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultCard } from "@/components/result-card";
import { MultilingualSupport } from "@/components/multilingual-support";
import {
  School,
  ClipboardList,
  User,
  BookOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { Student, ExamResult } from "@/lib/types";

const FormSchema = z.object({
  class: z.string().min(1, { message: "শ্রেণী নির্বাচন করুন।" }),
  examType: z.string().min(1, { message: "পরীক্ষার ধরন নির্বাচন করুন।" }),
  rollNumber: z
    .string()
    .regex(/^[0-9]+$/, "শুধুমাত্র সংখ্যা দিন।")
    .min(1, { message: "রোল নম্বর দিন।" }),
});

type SearchResult = {
  student: Student;
  result: ExamResult;
} | null;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      class: "",
      examType: "",
      rollNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setSearchResult(null);
    setError(null);

    setTimeout(() => {
      const student = students.find(
        (s) =>
          s.class === parseInt(data.class) &&
          s.roll === parseInt(data.rollNumber)
      );

      if (student) {
        const result = student.results.find(
          (r) => r.examType === data.examType
        );
        if (result) {
          const subjects = allSubjects.map((subName) => {
            const found = result.subjects.find(
              (s) => s.subjectName === subName
            );
            return (
              found || { subjectName: subName, terminal: 0, continuous: 0 }
            );
          });

          setSearchResult({ student, result: { ...result, subjects } });
        } else {
          setError(
            `এই শিক্ষার্থীর জন্য "${data.examType}" পরীক্ষার ফলাফল পাওয়া যায়নি।`
          );
        }
      } else {
        setError(
          "এই রোল নম্বরের কোনো শিক্ষার্থীকে পাওয়া যায়নি। অনুগ্রহ করে শ্রেণী ও রোল নম্বর পরীক্ষা করুন।"
        );
      }
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <School className="h-10 w-10 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়
          </h1>
        </div>
        <p className="text-muted-foreground">EMIS Code: 91411050804</p>
        <p className="text-muted-foreground">
          গ্রামঃ হরিণ খাইন, ৬নং ওয়ার্ড, ডাকঘরঃ বুধপুরা
        </p>
      </header>

      <main className="w-full max-w-lg">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList />
              ফলাফল অনুসন্ধান করুন
            </CardTitle>
            <CardDescription>
              শিক্ষার্থীর ফলাফল দেখতে নিচের ফর্মটি পূরণ করুন।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <BookOpen /> শ্রেণী নির্বাচন করুন
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="একটি শ্রেণী নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">প্রথম শ্রেণী</SelectItem>
                          <SelectItem value="2">দ্বিতীয় শ্রেণী</SelectItem>
                          <SelectItem value="3">তৃতীয় শ্রেণী</SelectItem>
                          <SelectItem value="4">চতুর্থ শ্রেণী</SelectItem>
                          <SelectItem value="5">পঞ্চম শ্রেণী</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="examType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <ClipboardList /> পরীক্ষার ধরন নির্বাচন করুন
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="একটি পরীক্ষার ধরন নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="প্রথম প্রান্তিক">
                            প্রথম প্রান্তিক
                          </SelectItem>
                          <SelectItem value="দ্বিতীয় প্রান্তিক">
                            দ্বিতীয় প্রান্তিক
                          </SelectItem>
                          <SelectItem value="বার্ষিক">বার্ষিক</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rollNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User /> রোল নম্বর দিন
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="उदा: ১০" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      অনুসন্ধান করা হচ্ছে...
                    </>
                  ) : (
                    "ফলাফল দেখুন"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>

      <section className="w-full mt-8">
        {loading && (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="items-center">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        )}
        {error && (
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>ত্রুটি</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {searchResult && (
          <ResultCard
            student={searchResult.student}
            result={searchResult.result}
          />
        )}
      </section>

      <MultilingualSupport />

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়।
          সর্বস্বত্ব সংরক্ষিত।
        </p>
      </footer>
    </div>
  );
}
