import React, { useState, useEffect, useRef } from "react";
import SoalContainer from "./soalContainer";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";
import { useUser } from "@/context/UserContext";
import { evaluateScore } from "@/utils/evaluate";
import StartPopup from "../startPopUp";


export default function VerifikasiPassword({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const user = useUser();
  const timeLimit = 60;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [input, setInput] = useState("");
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
      const [showStart, setShowStart] = useState(true);


  const original = localStorage.getItem("saved_password") || "";

  useEffect(() => {
    if (showFinish || showStart) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showFinish, showStart]);
  useEffect(() => {
    if (timeLeft === 0 && !showFinish) {
      setScore(
        evaluateScore({ isCorrect: false, timeUsed: timeLimit, timeLimit })
      );
      setShowFinish(true);
    }
  }, [timeLeft, showFinish]);

  const handleSubmit = () => {
    const computedScore = evaluateScore({
      isCorrect: score,
      timeUsed: timeLimit - timeLeft,
      timeLimit: timeLimit,
    });
    setScore(computedScore);

    setShowFinish(true);
  };

  const handleFinish = () => {
    if (score !== null) {
      onFinish(score, timeLimit - timeLeft);
    }
    setShowFinish(false);
  };
  const soal = `
     Kamu tiba-tiba ter-logout dari aplikasi pencarian kerja, Apa passwordmu tadi?
      `;
  return (
    <SoalContainer timeLimit={timeLimit} timeLeft={timeLeft} question={soal}>
      {showStart && (
        <StartPopup soal={soal} onClose={() => setShowStart(false)} />
      )}
      <div className="w-full h-full  p-6 rounded-2xl max-w-lg overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          Daftar Portal Lowongan Kerja
        </h2>
        <p className="mb-4">
          Selamat Datang di Portal Lowongan Kerja, silakan mendaftar akun untuk
          melanjutkan.
          <div className="text-red-500 font-black">
            catatan : JANGAN PERNAH MASUKKAN PASSWORDMU YANG ASLI
          </div>
        </p>
        <div className="w-full space-y-2">
          <div>
            <span>
              <span className="font-semibold">Email</span>
            </span>
            <input
              type="text"
              value={user?.email || "emailKamu@gmail.com"}
              className="border rounded-md p-3 w-full max-w-md"
              readOnly
            />
          </div>
          <div>
            <span>
              <span className="font-semibold">Username</span>
            </span>
            <input
              type="text"
              value={user?.username || "usernameKamu"}
              className="border rounded-md p-3 w-full max-w-md"
              readOnly
            />
          </div>
          <span>
            <span className="font-semibold">Password</span>
          </span>

          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik password..."
            className="border rounded-md p-3 w-full max-w-md"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>

      {showFinish && (
        <FinishPopup
          score={score}
          timeLeft={timeLeft}
          time={timeLimit - timeLeft}
          onClose={handleFinish}
        >
          {input === original ? (
            <div className="w-full text-center text-4xl">Password cocok!  <br />👍</div>
          ) : (
            <div className="w-full text-center text-4xl">
              Password tidak cocok <br /> 😢
               <br />Harus lebih teliti!
            </div>
          )}
        </FinishPopup>
      )}
    </SoalContainer>
  );
}
