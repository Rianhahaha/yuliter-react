'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    // ✅ Cek apakah username sudah dipakai
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();
  
    if (existing) {
      setError('Username sudah dipakai. Coba yang lain.');
      return;
    }
  
    // ✅ Daftar ke auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (signUpError || !data.user) {
      setError(signUpError?.message || 'Registrasi gagal');
      return;
    }
  
    // ✅ Masukkan ke tabel profiles (WAJIB!)
    await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      email,
    });
  
    // ✅ Redirect ke /dashboard atau /check-profile
    router.push('/dashboard');
  };
  

  return (
    <main className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar Manual</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Daftar
        </button>
      </form>
    </main>
  );
}
