// components/QuizQuestion.tsx

import { useState, useEffect } from 'react';

type QuizQuestionProps = {
  question: string;
  options: string[];
  onAnswer: (score: number) => void;
};

export default function QuizQuestion({ question, options, onAnswer }: QuizQuestionProps) {
  const [timer, setTimer] = useState(10); // Set timer 10 detik
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !isAnswered) {
      // Jika waktu habis dan belum dijawab, beri skor 0
      onAnswer(0);
      setIsAnswered(true);
    }
  }, [timer, isAnswered, onAnswer]);

  const handleAnswer = (answer: string) => {
    const correctAnswer = options[0]; // Misalnya, soal yang benar adalah opsi pertama
    if (answer === correctAnswer) {
      setScore(5); // Skor penuh jika jawab benar
    } else {
      setScore(1); // Skor minimum jika jawab salah
    }
    onAnswer(score);
    setIsAnswered(true);
  };

  return (
    <div>
      <p>{question}</p>
      <div>
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <div>Timer: {timer}s</div>
    </div>
  );
}
