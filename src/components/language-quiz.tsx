"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Sample quiz data
const quizData = {
  question: "সঠিক অর্থটি নির্বাচন করুন",
  word: "নিয়ে আসা",
  options: ["go swimming", "bring", "practice"],
  correctAnswer: "bring",
};

export function LanguageQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    if (selectedAnswer === quizData.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleContinue = () => {
    // Reset for the next question
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    // Here you would typically load the next question
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return selectedAnswer === option
        ? "bg-blue-500 border-blue-400"
        : "border-gray-600 hover:bg-gray-700";
    }

    if (option === quizData.correctAnswer) {
      return "bg-green-700 border-green-500 text-white";
    }

    if (option === selectedAnswer && !isCorrect) {
      return "bg-red-700 border-red-500 text-white";
    }
    
    return "border-gray-600 text-gray-400";
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-between h-full py-12">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">
          {quizData.question}
        </h2>
        <div className="flex items-center gap-4 mb-12">
          <Image
            src="https://i.ibb.co/3Y8GfR6/duo-char.png"
            alt="Tutor character"
            width={80}
            height={98}
            className="animate-bounce"
          />
          <div className="relative">
            <div className="bg-white text-black px-4 py-2 rounded-lg rounded-bl-none">
              {quizData.word}
            </div>
            <div className="absolute left-0 -bottom-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white"></div>
          </div>
        </div>

        <div className="space-y-3">
          {quizData.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "w-full justify-start h-16 text-lg border-2",
                getButtonClass(option)
              )}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered && selectedAnswer !== option && option !== quizData.correctAnswer}
            >
              <span className="mr-4 text-gray-400">{index + 1}</span> {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t-2 border-gray-700 pt-6">
        {isAnswered ? (
          <div className="flex items-center justify-between">
            <div className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'দারুণ!' : `সঠিক উত্তর: ${quizData.correctAnswer}`}
            </div>
            <Button
              onClick={handleContinue}
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-12 py-6"
            >
              চালিয়ে যান
            </Button>
          </div>
        ) : (
          <div className="flex justify-between">
            <Button
              variant="ghost"
              className="text-gray-400 hover:bg-gray-700"
            >
              স্কিপ করুন
            </Button>
            <Button
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer}
              className="bg-gray-200 text-black font-bold hover:bg-gray-300 disabled:bg-gray-700 disabled:text-gray-500 px-12 py-6 text-lg"
            >
              যাচাই করুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
