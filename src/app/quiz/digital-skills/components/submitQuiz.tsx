// components/SubmitQuiz.tsx
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function SubmitQuiz() {
  const [totalScore, setTotalScore] = useState(50); // Misalnya, set score akhir sementara
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Kirim ke database
    const { error } = await supabase
      .from('digital_skills_responses')
      .insert([
        {
          score: totalScore,
          profiles_id: "user_profile_id", // Dapatkan ID pengguna
        },
      ]);

    if (error) {
      console.error('Error submitting quiz:', error.message);
    } else {
      alert('Quiz submitted successfully!');
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </div>
  );
}
