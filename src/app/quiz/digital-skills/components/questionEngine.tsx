import React, { useEffect, useState } from 'react';
import { QUESTIONS } from './questions';
import { shuffle } from '@/utils/shuffle';
import PilihLinkDownload from './soal/pilihLinkDownload';
import Password from './soal/password';
import SaringLowongan from './soal/saringLowongan';
import TutupPopup from './soal/tutupPopUp';
import pilihHoax from './soal/pilihHoax';
import pilihEmail from './soal/pilihEmail';
import KirimJawabanEmailHRD from './soal/KirimJawabanEmailHRD';
import PilihFileHRD from './soal/pilihFileHRD';
import AmankanDokumenCloud from './soal/amankanFileCloud';
import SoalCocokkanAplikasi from './soal/cocokkanAplikasi';
import VerifikasiPassword from './soal/verifikasiPassword';
const componentMap: Record<string, any> = {
  // pilih_link_download: PilihLinkDownload,
  // Password: Password,
  // VerifikasiPassword: VerifikasiPassword,
  // Lowongan: SaringLowongan,
  // Pilih_Hoax: pilihHoax,
  // Email: pilihEmail,
  // KirimJawabanEmailHRD: KirimJawabanEmailHRD,
  // PilihFileHRD: PilihFileHRD,
  // AmankanDokumenCloud: AmankanDokumenCloud,
  CocokkanAplikasi: SoalCocokkanAplikasi,
  
};



export default function QuestionEngine({
  onFinish,
}: {
  onFinish: (totalScore: number, answers: number[], duration: number) => void;
}) {
  const [questions, setQuestions] = useState<typeof QUESTIONS>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [durations, setDurations] = useState<number[]>([]);

  useEffect(() => {
    setQuestions([...QUESTIONS]);
  }, []);

  const handleNext = (score: number, duration: number) => {
    const updatedAnswers = [...answers, score];
    const updatedDurations = [...durations, duration];

    setAnswers(updatedAnswers);
    setDurations(updatedDurations);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      const totalScore = updatedAnswers.reduce((a, b) => a + b, 0);
      const totalDuration = updatedDurations.reduce((a, b) => a + b, 0);
      onFinish(totalScore, updatedAnswers, totalDuration);
    }
  };

  if (!questions.length) return <div>Loading soal...</div>;

  const current = questions[index];
  const SoalComponent = componentMap[current.type];

  return (
    <div className="w-full h-full" key={current.id}>
      <SoalComponent onFinish={handleNext} />
    </div>
  );
}

