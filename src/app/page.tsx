"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { MultilingualSupport } from "@/components/multilingual-support";
import { Loader2, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const FormSchema = z.object({
  academicYear: z.string().min(1, { message: "শিক্ষাবর্ষ নির্বাচন করুন।" }),
  class: z.string().min(1, { message: "শ্রেণী নির্বাচন করুন।" }),
  examType: z.string().min(1, { message: "পরীক্ষার ধরন নির্বাচন করুন।" }),
  rollNumber: z
    .string()
    .regex(/^[0-9]+$/, "শুধুমাত্র সংখ্যা দিন।")
    .min(1, { message: "রোল নম্বর দিন।" }),
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      academicYear: "2025",
      class: "",
      examType: "",
      rollNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams(data);
    router.push(`/result?${params.toString()}`);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl text-center mb-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
          হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়
        </h1>
        <p className="text-muted-foreground px-4 sm:px-0">
          গ্রামঃ হরিণখাইন, ওয়ার্ড নংঃ ০৬, ডাকঘরঃ বুধপুরা, উপজেলাঃ পটিয়া, জেলাঃ চট্টগ্রাম
        </p>
        <p className="text-muted-foreground mt-1">EMIS: 91411050804</p>
      </header>

      <main className="w-full max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center bg-primary/10 rounded-t-lg">
            <CardTitle className="text-2xl text-primary font-bold">
              ফলাফল অনুসন্ধান করুন
            </CardTitle>
            <CardDescription>
              আপনার শিক্ষার্থীর পরীক্ষার ফলাফল দেখতে নিচের তথ্যগুলো পূরণ করুন।
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>শিক্ষাবর্ষ</FormLabel>
                        <Select
                          onValuechange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="শিক্ষাবর্ষ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2025">২০২৫</SelectItem>
                            <SelectItem value="2026">২০২৬</SelectItem>
                            <SelectItem value="2027">২০২৭</SelectItem>
                            <SelectItem value="2028">২০২৮</SelectItem>
                            <SelectItem value="2029">২০২৯</SelectItem>
                            <SelectItem value="2030">২০৩০</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>শ্রেণি</FormLabel>
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
                        <FormLabel>পরীক্ষা</FormLabel>
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
                        <FormLabel>রোল নম্বর</FormLabel>
                        <FormControl>
                          <Input placeholder="আপনার রোল নম্বর" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>ত্রুটি</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        অনুসন্ধান করা হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        ফলাফল দেখুন
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>

      <MultilingualSupport />

      <footer className="mt-16 text-center text-sm text-muted-foreground px-4">
        <p>
          &copy; {new Date().getFullYear()} হরিণখাইন সরকারি প্রাথমিক বিদ্যালয়।
          সর্বস্বত্ব সংরক্ষিত।
        </p>
      </footer>
    </div>
  );
}
