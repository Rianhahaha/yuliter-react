'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import Bg from '@/component/bg';
import AvatarUploader from './avatar-uploader';
import { useUser } from '@/context/UserContext';

export default function EditProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const user = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push('/login');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, username')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        router.push('/check-profile');
        return;
      }

      setFullName(profile.full_name || '');
      setUsername(profile.username || '');
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setError('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ full_name: fullName, username })
      .eq('id', user?.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push('/dashboard');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Bg/>
    <main className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">Edit Profil</h1>
      <div className="space-y-2">
        <div>
        {user && <AvatarUploader userId={user.id} />}
        </div>
        <label className="block">
          <span>Nama Lengkap</span>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            />
        </label>
        <label className="block">
          <span>Username</span>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </main>
          </>
  );
}
