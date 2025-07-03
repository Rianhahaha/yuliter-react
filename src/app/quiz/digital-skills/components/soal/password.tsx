import React, { useState, useEffect, useRef } from "react";
import SoalContainer from "./soalContainer";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";
import { useUser } from "@/context/UserContext";

export default function PasswordStrength({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
    const user = useUser();
  
  const timeLimit = 30;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [password, setPassword] = useState("");
  let [score, setScore] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const evaluatePassword = (password: string): number => {
    let s = 1;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    s = s*2;

    return s;
  };
  useEffect(() => {
    if (showFinish) {
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
  }, [showFinish]);

  const getFeedback = (score: number): { message: string; color: string } => {
    if (score <= 4) return { message: "Password lemah", color: "text-red-500" };
    if (score <= 8)
      return { message: "Password sedang", color: "text-yellow-500" };
    return { message: "Password kuat", color: "text-green-600" };
  };
  const feedback = getFeedback(score);

  const handleChange = (value: string) => {
    setPassword(value);
    setScore(evaluatePassword(value));
  };

  const handleSubmit = () => {
 const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;

let computedScore = score - Math.round(10 * timeUsedPercentage)


setScore(computedScore);
setShowFinish(true);
    setSubmitted(true);
    setShowFinish(true);
  };
  const handleFinish = () => {
    setShowFinish(false);
    localStorage.setItem("saved_password", password); // ⬅️ simpan password
    onFinish(score, timeLimit - timeLeft);
  };

  return (
    <>
      <SoalContainer
        timeLeft={timeLeft}
        question={`
          Kamu sedang mengunjungi portal lowongan kerja dan disuruh untuk membuat password untuk akun kamu.
          Password harus memiliki minimal 8 karakter, terdiri dari huruf besar, huruf kecil, angka dan karakter khusus.
          `}
      >
        <div className="w-full h-full  p-6 rounded-2xl max-w-lg overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            Daftar Portal Lowongan Kerja
          </h2>
          <p className="mb-4">
            Selamat Datang di Portal Lowongan Kerja, silakan mendaftar akun
            untuk melanjutkan.
                    <div className="text-red-500 font-black">
          catatan : JANGAN PERNAH MASUKKAN PASSWORDMU YANG ASLI
        </div>
          </p>

          {!submitted ? (
            <>
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
                <div>
                  <span>
                    <span className="font-semibold">Password</span>
                  </span>
                  <input
                    type="password"
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Password..."
                    className="border rounded-md p-3 w-full max-w-md"
                  />
                </div>

                {password.length > 0 && (
                  <p className={`mt-3 font-medium ${feedback.color}`}>
                    {feedback.message}
                    <span className="font-semibold"> ({score})</span>
                  </p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={password.length === 0}
                className={
                  `mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded cursor-pointer ` +
                  (password.length === 0 ? "opacity-50" : "")
                }
              >
                Buat Akun
              </button>
            </>
          ) : (
            <p className="text-lg font-bold text-green-600 mt-6">
              Membuat Akun...
            </p>
          )}
        </div>
        {showFinish && (
          <FinishPopup score={score} onClose={handleFinish}>
            <div className="sm:text-2xl md:text-3xl mb-2 w-full text-center space-y-2">
              <div>
                {score <= 2
                  ? "Kombinasimu kurang kuat nih, gampang dibobol loh nanti! :)"
                  : score === 3 || score === 4
                  ? "Lumayan~ tapi masih kurang kuat nih passwordmu! :)"
                  : "Bagus! Passwordmu sangat kuat! :D"}
              </div>
              <div className="text-xs sm:text-sm">
                Silakan lanjut mengerjakan! Semangat!
              </div>
            </div>
          </FinishPopup>
        )}
      </SoalContainer>
    </>
  );
}
