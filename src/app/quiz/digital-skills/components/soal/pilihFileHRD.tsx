import React, { useEffect, useState, useMemo, useRef } from "react";
import SoalContainer from "./soalContainer";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";
import { evaluateScore } from "@/utils/evaluate";
import StartPopup from "../startPopUp";

export default function PilihFileHRD({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const user = useUser();
  const timeLimit = 30;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showStart, setShowStart] = useState(true);

  const files = useMemo(() => {
    if (!user) return [];

    return [
      {
        name: `CV_${user.full_name}.pdf`,
        isTrue: true,
        icon: "/pilihFileHRD/pdfFile.svg",
      },
      {
        name: `PAS_FOTO_${user.full_name}.png`,
        isTrue: false,
        icon: "/pilihFileHRD/pngFile.svg",
      },
      {
        name: `CV_${user.full_name}_FINAL_REVISI.pdf`,
        isTrue: false,
        icon: "/pilihFileHRD/pdfFile.svg",
      },
      {
        name: `WA04042022.png`,
        isTrue: false,
        icon: "/pilihFileHRD/pngFile.svg",
      },
      {
        name: `CV_REVISI_02_${user.full_name}.png`,
        isTrue: false,
        icon: "/pilihFileHRD/pngFile.svg",
      },
    ].sort(() => Math.random() - 0.5);
  }, [user]);

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

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);

    const compute = files[index].isTrue;
    const computedScore = evaluateScore({
      isCorrect: compute,
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
      Manakah File CV yang pantas untuk dikirimkan ke HRD?
      `;
  return (
    <SoalContainer timeLimit={timeLimit} timeLeft={timeLeft} question={soal}>
      {showStart && (
        <StartPopup soal={soal} onClose={() => setShowStart(false)} />
      )}
      {showFinish && score !== null && (
        <FinishPopup
          score={score}
          timeLeft={timeLeft}
          time={timeLimit - timeLeft}
          onClose={handleFinish}
        >
          <div className="text-3xl mb-2 w-full text-center space-y-2">
            <div>
              {selectedIndex !== null && files[selectedIndex!]?.isTrue
                ? "Yay! Jawabanmu benar!"
                : "Lebih teliti lagi yaaaa :D"}
            </div>
          </div>
        </FinishPopup>
      )}
      <div className="w-full overflow-y-auto py-5 px-5">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {files.map((file, index) => (
            <div key={index} className=" rounded-md">
              <button
                onClick={() => handleSelect(index)}
                className="w-full text-left   flex flex-col items-center justify-center gap-2 hover:bg-gray-200 focus:outline-gray-400 focus:outline-1 px-4 py-3 font-medium cursor-pointer"
              >
                <Image
                  src={file.icon}
                  alt="pdf"
                  width={20}
                  height={20}
                  className="w-[10rem]"
                />
                <div className="text-center text-xs lg:text-sm">
                  {file.name.replace(" ", "_")}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </SoalContainer>
  );
}
