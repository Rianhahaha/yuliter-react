"use client";

import { useEffect, useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import SoalContainer from "./soalContainer";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";
const CORRECT_ORDER = [
  "Yth. Ibu Rina,",

  "Terima kasih atas email dan undangan interview yang telah Ibu kirimkan kepada saya.",

  "Dengan ini saya ingin mengonfirmasi bahwa saya bersedia hadir pada sesi wawancara yang dijadwalkan, yaitu pada hari Kamis, 20 Juni 2025 pukul 10.00 WIB melalui Google Meet. Saya sangat menghargai kesempatan ini dan antusias untuk berdiskusi lebih lanjut mengenai posisi Digital Marketing yang ditawarkan.",

  "Apabila ada dokumen tambahan yang perlu saya persiapkan atau unggah sebelum wawancara, mohon informasikan kepada saya. Sekali lagi, terima kasih atas kesempatannya.",

  "Hormat saya,",

  "Andi Pratama",
];

export default function KirimJawabanEmailHRD({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const timeLimit = 80;
  const [items, setItems] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
const shuffled = [...CORRECT_ORDER].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, []);

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

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
      setHasInteracted(true);
    }
  };

const handleSubmit = () => {
  const isCorrect = items.every((item, i) => item === CORRECT_ORDER[i]);

  const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;
  let computedScore = isCorrect
    ? 10 - Math.round(10 * timeUsedPercentage)
    : 5 - Math.round(5 * timeUsedPercentage);

  computedScore = Math.max(0, computedScore); // mencegah nilai minus
  setIsCorrect(isCorrect); // simpan benar atau salah
  setScore(computedScore);
  setShowFinish(true);
};
  const handleFinish = () => {
    if (score !== null) {
      onFinish(score, timeLimit - timeLeft);
    }
    setShowFinish(false);
  };

  return (
    <SoalContainer
      timeLeft={timeLeft}
      question="Susun potongan kalimat untuk membalas email HRD dengan profesional:"
    >
      <div className="p-5 max-w-2xl overflow-y-auto h-full">
        <div className="space-y-1 text-xs  border border-gray-200 p-2 rounded-2xl">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item, index) => (
                <SortableItem key={item} id={item} />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-end w-full mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Kirim Email
            </button>
          </div>
        </div>
      </div>
      {showFinish && score !== null && (
        <FinishPopup score={score} onClose={handleFinish}>
          <div className="text-3xl mb-2 w-full text-center space-y-2">
            <div>
              {isCorrect
                ? "Yay! Jawabanmu benar!"
                : "Lebih teliti lagi yaaaa :D"}
            </div>
            <div className="text-sm">Silakan lanjut mengerjakan! Semangat!</div>
          </div>
        </FinishPopup>
      )}
    </SoalContainer>
  );
}
