'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import QuestionCard from './components/QuestionCard';

type Question = {
  id: string;
  question: string;
  options: string[];
};

export default function DigitalSkillsQuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('digital_skills_questions')
        .select('*')
        .order('created_at');

      if (data) setQuestions(data as Question[]);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (value: number) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: number[]) => {
    const endTime = Date.now();
    const durationInSeconds = Math.floor((endTime - startTime) / 1000);
    const totalScore = finalAnswers.reduce((acc, val) => acc + val, 0);
  
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const profiles_id = userData?.user?.id;
  
    if (userError) {
      console.error('Failed to get user:', userError.message);
      return;
    }
  
    if (!profiles_id) {
      console.error('User not authenticated!');
      return;
    }
  
    // 🔍 Cek log data sebelum insert
    console.log('Submitting quiz:', {
      profiles_id,
      answers: finalAnswers,
      score: totalScore,
      duration: durationInSeconds,
    });
  
    const { error } = await supabase.from('digital_skills_responses').insert({
      profiles_id,
      answers: finalAnswers,
      score: totalScore,
      duration: durationInSeconds,
    });
  
    if (error) {
      console.error('Insert error:', error.message);
      return;
    }
  
    // ✅ Kalau berhasil simpan, arahkan ke hasil
    router.push(`/quiz/digital-skills/result?score=${totalScore}&total=${questions.length}`);
  };
  

  if (!questions.length) return <p>Loading questions...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <QuestionCard
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
