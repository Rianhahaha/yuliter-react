"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,

  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import SoalContainer from "./soalContainer";
import Image from "next/image";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";
import { evaluateScore } from "@/utils/evaluate";
import StartPopup from "../startPopUp";

type AppItem = {
  id: string;
  name: string;
  icon: string;
};

type TargetItem = {
  id: string;
  label: string;
  correctAppId: string;
};

const apps: AppItem[] = [
  { id: "trello", name: "Trello", icon: "/cocokAplikasi/12.png" },
  { id: "slack", name: "Slack", icon: "/cocokAplikasi/31.svg" },
  { id: "whatsapp", name: "WhatsApp", icon: "/cocokAplikasi/1.png" },
];

const targets: TargetItem[] = [
  {
    id: "task",
    label: "Kelola tugas secara visual (kanban)",
    correctAppId: "trello",
  },
  {
    id: "chat",
    label: "Komunikasi tim formal & integrasi tools",
    correctAppId: "slack",
  },
  { id: "casual", label: "Chat cepat & informal", correctAppId: "whatsapp" },
];

export default function SoalCocokkanAplikasi({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const timeLimit = 30;
const sensors = useSensors(useSensor(PointerSensor));
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showStart, setShowStart] = useState(true);

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
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over) {
      setAnswers((prev) => ({ ...prev, [over.id]: active.id }));
    }
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    let correct = 0;
    targets.forEach((target) => {
      if (answers[target.id] === target.correctAppId) correct += 1;
    });

    const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;

    // Skor maksimal 10 jika benar semua, 5 jika salah sebagian
    const baseScore = correct === targets.length ? 10 : correct * 2; // contoh skoring: 2 poin per benar

    // Penalti waktu: semakin lama, semakin sedikit skor
    let computedScore = baseScore - Math.round(baseScore * timeUsedPercentage);
    computedScore = Math.max(0, computedScore); // hindari skor minus
    setCorrectCount(correct);
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
     Cocokkan aplikasi kolaborasi berikut dengan fungsi utamanya! Geser Icon kedalam keterangan yang benar!
      
      `;
  return (
    <SoalContainer timeLimit={timeLimit} timeLeft={timeLeft} question={soal}>
      {showStart && (
        <StartPopup soal={soal} onClose={() => setShowStart(false)} />
      )}
      <div className="text-lg sm:text-3xl mt-5">Geser icon kedalam kotak!</div>
      {showFinish && score !== null && (
        <FinishPopup
          score={score}
          timeLeft={timeLeft}
          time={timeLimit - timeLeft}
          onClose={handleFinish}
        >
          <div className="text-3xl mb-2 w-full text-center space-y-2">
            <div>
              {correctCount === targets.length
                ? "Yay! Jawabanmu benar semua!"
                : "Ooops! jawaban kurang tepat, coba lagi ya!"}
            </div>
          </div>
        </FinishPopup>
      )}

      <DndContext sensors={sensors}
  onDragEnd={handleDragEnd}
  modifiers={[restrictToWindowEdges]}>
        <div className="flex flex-col gap-6 overflow-hidden mt-0 sm:mt-[3rem]">
          <div className="flex gap-4 justify-center">
            {apps.map((app) => (
              <DraggableItem key={app.id} id={app.id}>
                <Image src={app.icon} alt={app.name} width={60} height={60} />
              </DraggableItem>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row">
            {targets.map((target) => (
              <DroppableZone key={target.id} id={target.id}>
                <div className="p-2 sm:p-4 border border-gray-400 rounded flex flex-col grow">
                  <p className="mb-2">{target.label}</p>
                  {answers[target.id] && (
                    <Image
                      src={
                        apps.find((a) => a.id === answers[target.id])?.icon ??
                        ""
                      }
                      alt=""
                      width={40}
                      height={40}
                    />
                  )}
                </div>
              </DroppableZone>
            ))}
          </div>
        </div>
        {!submitted && (
          <button onClick={handleSubmit} className="main-button w-full mt-4">
            Selesai
          </button>
        )}
      </DndContext>
    </SoalContainer>
  );
}

function DraggableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...listeners}
      {...attributes}
      className="cursor-grab border rounded-full p-2 flex items-center border-gray-400 hover:brightness-125 !touch-none"
    >
      {children}
    </div>
  );
}

function DroppableZone({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className=" border-gray-400 p-2 flex-col flex">
      {children}
    </div>
  );
}
