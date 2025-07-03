// components/QuizResult.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
export default function QuizResult({
  score,
  duration,
  answers,
  onRestart,
}: {
  score: number;
  duration: number;
  answers: number[];
  onRestart: () => void;
}) {
  const [val, setval] = useState(0);
  const [time, setTime] = useState(0);
  const finalScore = score;
  const finalTime = 10;
  useEffect(() => {
    const interval = setInterval(() => {
      setval((prev) => {
        if (prev < score) return prev + 1;
        return prev;
      });
      setTime((prev) => {
        if (prev < duration) return prev + 1;
        return prev;
      });

      // Jika keduanya sudah mencapai nilai final, hentikan interval
      if (val >= score && time >= duration) {
        clearInterval(interval);
      }
    }, 50); // Sesuaikan durasi animasi

    return () => clearInterval(interval);
  }, [score, duration]); // Perlu ini agar efek ter-update
  return (
    <>
      <div className="max-h-[50rem] h-full max-w-4xl m-auto">
        <div className="font-main tracking-wider text-3xl sm:text-[3rem] flex flex-col items-center mb-3">
          <div>Kuis Selesai!</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 pb-5">
          <div className="text-center font-main tracking-wider h-full w-full max-w-5xl flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5">
            <div className="font-main tracking-wider text-[3rem]">
              <div className="text-lg sm:text-[1.5rem]">Hasil Kamu :</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-5 ">
              <div className="flex flex-col items-center justify-center w-[8rem] md:w-[15rem] lg:w-[20rem] gap-2">
                <div className=" grid-cols-2 grid items-center text-[5rem] md:text-[6rem] lg:text-[8rem] gap-1 ">
                  <Image
                    className="w-[5rem] md:w-[7rem] lg:w-[10rem] animate-finish"
                    src="/star.svg"
                    alt=""
                    height={500}
                    width={500}
                  />
                  <span className="leading-[4rem]">{score}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-[8rem] md:w-[15rem] lg:w-[20rem] gap-2">
                <div className=" grid-cols-2 grid items-center text-[5rem] md:text-[6rem] lg:text-[8rem] gap-1 ">
                  <Image
                    className="w-[5rem] md:w-[7rem] lg:w-[10rem] animate-finish"
                    src="/time.svg"
                    alt=""
                    height={500}
                    width={500}
                  />
                  <div className="leading-[4rem] relative">
                    {time}
                    <div className="absolute main-button !p-3 -rotate-12 text-[1.5rem] -right-5 -bottom-10">
                      detik
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <p>Jawaban per soal: {JSON.stringify(answers)}</p> */}
          </div>
          <div className="flex flex-col gap-5 items-center justify-start font-main tracking-widest">
            <Image
              src={
                score <= 40
                  ? "/result/5.svg"
                  : score <= 50
                  ? "/result/4.svg"
                  : score <= 70
                  ? "/result/3.svg"
                  : score <= 90
                  ? "/result/2.svg"
                  : "/result/1.svg"
              }
              alt="score result emoji"
              height={500}
              width={500}
              className="animate-finish w-[25rem]"
            />

            <div className="text-center text-xl sm:text-[1.5rem] animate-finish">
              {score <= 40 &&
                "Yah 😭, Tidak apa apa! jangan menyerah ya! Coba lagi dan terus belajar!"}
              {score > 40 &&
                score <= 50 &&
                "Masih bisa lebih baik! Semangat terus yaa!"}
              {score > 50 &&
                score <= 70 &&
                "Lumayan! Tapi masih bisa ditingkatkan lagi!"}
              {score > 70 &&
                score <= 90 &&
                "Keren! Kamu hebat! Pertahankan ya!"}
              {score > 90 && "Luar biasa! Kamu jago banget! 🎉✨"}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/dashboard" className="danger-button">
            Kembali
          </Link>
          <button onClick={onRestart} className="success-button">
            Main Lagi
          </button>
        </div>
      </div>
    </>
  );
}
