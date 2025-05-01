'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function CheckProfile() {
  const router = useRouter();

  useEffect(() => {
    const checkOrCreateProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push('/login');
        return;
      }

      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Gagal cek profil:', profileError.message);
        return;
      }

      if (!existingProfile) {
        const fullName =
          user.user_metadata.full_name ||
          user.user_metadata.name ||
          'Guest';

        const email = user.email;
        const username = fullName.toLowerCase().replace(/\s+/g, '');

        const { error: insertError } = await supabase.from('profiles').insert({
          id: user.id,
          full_name: fullName,
          username,
          email,
        });

        if (insertError) {
          console.error('Gagal insert profil:', insertError.message);
        }
      }

      router.push('/dashboard');
    };

    checkOrCreateProfile();
  }, [router]);

  return <p>Loading...</p>;
}
