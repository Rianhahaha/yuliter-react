// components/soal/TutupPopup.tsx
import React, { useEffect } from 'react';

export default function TutupPopup({ onFinish, timeLimit = 10 }: { onFinish: (score: number) => void; timeLimit?: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(0); // Timeout = gagal
    }, timeLimit * 1000);
    return () => clearTimeout(timer);
  }, [onFinish, timeLimit]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">❌ Tutup Iklan Pop-up</h2>
      <p className="mb-2">Klik tombol "X" yang benar sebelum waktu habis.</p>
      {/* Render popup palsu dan 1 popup asli */}
      <button onClick={() => onFinish(5)} className="bg-red-500 p-2 rounded text-white">
        X yang Benar
      </button>
    </div>
  );
}
