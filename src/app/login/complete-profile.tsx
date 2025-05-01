// pages/lengkapi-profil.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';

export default function CompleteProfile() {
  const [fullName, setFullName] = useState('');
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
      else router.push('/auth');
    };

    getUser();
  }, [router]);

  const handleSubmit = async () => {
    if (!userId) return;

    await supabase.from('profiles').upsert({
      id: userId,
      full_name: fullName,
    });

    router.push('/dashboard'); // ganti dengan halaman utama kamu
  };

  const handleSkip = async () => {
    if (!userId) return;

    await supabase.from('profiles').upsert({
      id: userId,
      full_name: '',
    });

    router.push('/dashboard'); // ganti dengan halaman utama kamu
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Lengkapi Profil Anda</h1>

      <input
        type="text"
        placeholder="Nama lengkap"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button onClick={handleSubmit} className="bg-green-500 text-white p-2 w-full rounded mb-2">
        Simpan & Lanjut
      </button>

      <button onClick={handleSkip} className="text-sm text-gray-500 underline mx-auto block">
        Lewati dan lanjutkan nanti
      </button>
    </div>
  );
}
