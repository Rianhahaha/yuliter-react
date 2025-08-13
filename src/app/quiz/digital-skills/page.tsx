// app/quiz/page.tsx atau src/app/quiz/page.tsx (tergantung struktur)
"use client";

import { useState, useEffect } from "react";
import QuestionEngine from "./components/questionEngine";
import QuizResult from "./components/quizResult";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/context/UserContext"; // asumsi kamu pakai ini
import Bg from "@/component/bg";
import Image from "next/image";
import Link from "next/link";
import Petunjuk from "./components/Petunjuk";

type Answer = number;

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showPetunjuk, setShowPetunjuk] = useState(true);
  const user = useUser(); // pastikan kamu punya user context

  const handleFinish = async (
    finalScore: number,
    finalAnswers: number[],
    timeTaken: number
  ) => {
    setScore(finalScore);
    setAnswers(finalAnswers);
    setDuration(timeTaken);
    setFinished(true);

    if (user) {
      const { error } = await supabase.from("digital_skills_responses").insert({
        profiles_id: user.id,
        score: finalScore,
        duration: timeTaken,
        answers: finalAnswers,
      });
      console.log(user);

      if (error) {
        console.error("Error saving to Supabase:", error.message);
      }
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setDuration(0);
    setAnswers([]);
    setStarted(false);
    setFinished(false);
  };

  return (
    <>
      <Bg />
      <section className="h-full lg:h-screen flex flex-col items-center justify-center p-2 sm:py-[1rem] sm:px-[3rem] font-text">
        {/* Petunjuk */}
        {showPetunjuk && (
          <div className="fixed z-50 p-5 m-5 size-full bg-black/50 rounded-2xl flex flex-col items-center justify-center animate-finish-bg ">
            <div className="max-w-4xl w-full h-[95%] bg-background2 rounded-2xl flex flex-col items-center justify-start gap-5 p-3 sm:p-10 border border-mainBorder overflow-y-auto animate-finish">
              <Petunjuk />
              <div className="w-full flex justify-end">
                <button
                  className="main-button w-full"
                  onClick={() => setShowPetunjuk(false)}
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Petunjuk */}

        <div className="main-container relative  h-full w-full flex items-center justify-center overflow-y-auto ">
          {!started && !finished && (
            <>
              <div className="flex flex-col justify-between max-h-[50rem] h-full max-w-4xl m-auto size-full">
                <div className="w-full flex flex-col sm:flex-row gap-2 sm:justify-between  mb-5 items-start sm:items-center">
                  <Link
                    href={"/dashboard"}
                    className="danger-button flex gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                    </svg>
                    Kembali
                  </Link>
                  <div className="text-md sm:text-3xl font-main tracking-widest text-center sm:text-right ">
                    🧠 Uji Keterampilan Digital MU!
                  </div>
                </div>

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src="/dashboard/dashboardMain.svg"
                      alt="soal"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className=" p-1 sm:p-5 ">
                    <button
                      onClick={() => setShowPetunjuk(true)}
                      className="main-button relative !text-[2rem] mb-5"
                    >
                      Petunjuk!
                      <Image
                        src="/tips.svg"
                        alt="soal"
                        width={500}
                        height={500}
                        className="absolute animate-bounce-glow -top-8 -left-3 w-[3rem]"
                      />
                    </button>
                    <div className="flex flex-col gap-1 text-xl">
                      <div className="text-3xl font-black uppercase">
                        Tips :
                      </div>
                      <div className="">
                        📌 <span className="font-black">Baca</span> instruksi
                        soal dengan teliti
                      </div>
                      <div className="">
                        ⏱️ Semakin cepat, semakin tinggi skor{" "}
                      </div>
                      <div className="">😅 Jangan panik kalau salah </div>
                      <div className="">🔥 Fokus! Waktu sangat terbatas!</div>
                      <div className="">
                        🏆 Gabungkan kecepatan dan akurasi{" "}
                      </div>
                      <div className="">
                        👑 Kejar posisi #1 di leaderboard!{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setStarted(true)}
                    className="my-[2rem] px-10 rounded-full bg-gradient-to-bl from-mainPink to-mainPurple text-white font-main transition-all duration-200 ease-in-out border-t-2 border-white shadow-[inset_0px_-4px_0px_3px_#00000030] hover:shadow-[inset_0px_0px_0px_0px_#00000030] hover:translate-y-1 cursor-pointer tracking-widest text-xl sm:text-2xl md:text-5xl py-5 w-full"
                  >
                    Mulai Kuis
                  </button>
                </div>
              </div>
            </>
            // <div className="text-center">
            //   <h1 className="text-[3rem] font-bold mb-4 font-main tracking-widest">
            //     🧠 Uji Keterampilan Digital MU!
            //   </h1>
            //   <p className="mb-[5rem]">
            //     Jawab pertanyaan unik seputar literasi digital. Ayo mulai!
            //   </p>
            //   <button
            //     onClick={() => setStarted(true)}
            //     className="main-button scale-150"
            //   >
            //     Mulai Kuis
            //   </button>
            // </div>
          )}

          {started && !finished && <QuestionEngine onFinish={handleFinish} />}

          {finished && (
            <QuizResult
              score={score}
              duration={duration}
              answers={answers}
              onRestart={restartQuiz}
            />
          )}
        </div>
      </section>
    </>
  );
}
