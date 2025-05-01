'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = Number(searchParams.get('score') || 0);
  const total = Number(searchParams.get('total') || 1);

  const percentage = Math.round((score / (total * 5)) * 100);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Hasil Kuis</h1>
      <p className="text-xl mb-2">Skor kamu: <strong>{score}</strong> dari maksimum <strong>{total * 5}</strong></p>
      <p className="text-lg mb-6">Persentase: <strong>{percentage}%</strong></p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kembali ke Dashboard
        </button>
        <button
          onClick={() => router.push('/leaderboard')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Lihat Leaderboard
        </button>
      </div>
    </div>
  );
}
