'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import AvatarUploader from './avatar-uploader';
import { useUser } from '@/context/UserContext';
import Loading from '../components/loading';
import Image from 'next/image';
type EditProfilePageProps = {
  avatar_url: string;

};
export default function EditProfilePage({
  avatar_url,

}: EditProfilePageProps) {
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

    if (loading) {
      return (
        <Loading  />
      );
    }

  return (
    <>
    <main className="w-full main-container">
      <div className="max-w-3xl mx-auto">

      <h1 className="text-xl sm:text-2xl md:text-5xl font-main tracking-wider mb-3 text-center">Pengaturan Profil</h1>
      <div className="space-y-5">
        <div>
          
        {/* {user && <AvatarUploader userId={user.id} />}
                        <Image
                  src={avatar_url || "/default_profile.svg"}
                  alt="quiz"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover object-center"
                /> */}
        </div>
        <label className="block">
          <span className='font-main tracking-wider'>Nama Lengkap</span>
          <input
            type="text"
            className="w-full border p-2 main-form !rounded-xl"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            />
        </label>
        <label className="block">
          <span className='font-main tracking-wider'>Username</span>
          <input
            type="text"
            className="w-full border p-2  main-form !rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleSave}
          disabled={saving}
          className="main-button !w-full"
          >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
            </div>
    </main>
          </>
  );
}
