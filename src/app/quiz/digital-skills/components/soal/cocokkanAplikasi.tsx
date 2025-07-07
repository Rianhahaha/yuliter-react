"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
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

const fullApps: AppItem[] = [
  { id: "trello", name: "Trello", icon: "/cocokAplikasi/12.png" },
  { id: "slack", name: "Slack", icon: "/cocokAplikasi/31.svg" },
  { id: "whatsapp", name: "WhatsApp", icon: "/cocokAplikasi/1.png" },
  { id: "zoom", name: "Zoom", icon: "/cocokAplikasi/zoom.svg" },
  { id: "notion", name: "Notion", icon: "/cocokAplikasi/notion.svg" },
  { id: "googlemeet", name: "Google Meet", icon: "/cocokAplikasi/meet.svg" },
  { id: "asana", name: "Asana", icon: "/cocokAplikasi/asana.png" },
  { id: "teams", name: "Microsoft Teams", icon: "/cocokAplikasi/teams.svg" },
  { id: "gmail", name: "Gmail", icon: "/cocokAplikasi/gmail.svg" },
  { id: "figma", name: "Figma", icon: "/cocokAplikasi/figma.svg" },
  { id: "github", name: "GitHub", icon: "/cocokAplikasi/github.png" },
  { id: "dropbox", name: "Dropbox", icon: "/cocokAplikasi/dropbox.svg" },
  { id: "discord", name: "Discord", icon: "/cocokAplikasi/discord.svg" },
  { id: "telegram", name: "Telegram", icon: "/cocokAplikasi/telegram.svg" },
  { id: "calendar", name: "Google Calendar", icon: "/cocokAplikasi/calendar.svg" },
];

const fullTargets: TargetItem[] = [
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
  {
    id: "casual",
    label: "Chat cepat & informal",
    correctAppId: "whatsapp",
  },
  {
    id: "meeting",
    label: "Meeting daring dengan banyak peserta",
    correctAppId: "zoom",
  },
  {
    id: "docs",
    label: "Membuat catatan & dokumentasi kolaboratif",
    correctAppId: "notion",
  },
  {
    id: "video-call",
    label: "Video call dari browser tanpa install",
    correctAppId: "googlemeet",
  },
  {
    id: "timeline",
    label: "Manajemen proyek dengan timeline",
    correctAppId: "asana",
  },
  {
    id: "officechat",
    label: "Kolaborasi dokumen & komunikasi formal",
    correctAppId: "teams",
  },
  {
    id: "email",
    label: "Surat elektronik (email)",
    correctAppId: "gmail",
  },
  {
    id: "design",
    label: "Kolaborasi desain UI/UX secara real-time",
    correctAppId: "figma",
  },
  {
    id: "code",
    label: "Kolaborasi pengembangan perangkat lunak",
    correctAppId: "github",
  },
  {
    id: "cloud",
    label: "Penyimpanan file berbasis cloud",
    correctAppId: "dropbox",
  },
  {
    id: "gaming-chat",
    label: "Obrolan komunitas game & suara",
    correctAppId: "discord",
  },
  {
    id: "privacy-chat",
    label: "Pesan terenkripsi & channel publik",
    correctAppId: "telegram",
  },
  {
    id: "schedule",
    label: "Menjadwalkan acara & pengingat",
    correctAppId: "calendar",
  },
];

// Helper to get random unique items
function getRandomPairs(n: number) {
  const shuffled = [...fullTargets].sort(() => 0.5 - Math.random());
  const selectedTargets = shuffled.slice(0, n);
  const selectedApps = fullApps.filter((app) =>
    selectedTargets.find((target) => target.correctAppId === app.id)
  );
  return { apps: selectedApps, targets: selectedTargets };
}

export default function SoalCocokkanAplikasi({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const timeLimit = 30;
  const sensors = useSensors(useSensor(PointerSensor));

  const { apps, targets } = useMemo(() => getRandomPairs(3), []);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showStart, setShowStart] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    const baseScore = correct === targets.length ? 10 : correct * 2;
    let computedScore = baseScore - Math.round(baseScore * timeUsedPercentage);
    computedScore = Math.max(0, computedScore);
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

  const soal = `Cocokkan aplikasi kolaborasi berikut dengan fungsi utamanya! Geser Icon ke dalam keterangan yang benar!`;

  return (
    <SoalContainer timeLimit={timeLimit} timeLeft={timeLeft} question={soal}>
      {showStart && <StartPopup soal={soal} onClose={() => setShowStart(false)} />}

      <div className="text-lg sm:text-3xl mt-5">Geser icon ke dalam kotak!</div>

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
                : "Ooops! Jawaban kurang tepat, coba lagi ya!"}
            </div>
          </div>
        </FinishPopup>
      )}

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="flex flex-col gap-6 overflow-hidden mt-0 sm:mt-[3rem]">
          <div className="flex gap-4 justify-center flex-wrap">
            {apps.map((app) => (
              <DraggableItem key={app.id} id={app.id}>
                <Image src={app.icon} alt={app.name} width={60} height={60} />
              </DraggableItem>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {targets.map((target) => (
              <DroppableZone key={target.id} id={target.id}>
                <div className="p-2 sm:p-4 border border-gray-400 rounded flex flex-col grow min-w-[250px]">
                  <p className="mb-2">{target.label}</p>
                  {answers[target.id] && (
                    <Image
                      src={
                        apps.find((a) => a.id === answers[target.id])?.icon ?? ""
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
      className="cursor-grab border rounded-full p-2 flex items-center border-gray-400 hover:brightness-125 touch-none"
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
    <div ref={setNodeRef} className="border-gray-400 p-2 flex-col flex">
      {children}
    </div>
  );
}
