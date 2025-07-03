// src/context/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

type User = {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
};

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, username')
          .eq('id', user.id)
          .single();

        setUser({
          id: user.id,
          email: user.email ?? '',
          full_name: profile?.full_name ?? '',
          username: profile?.username ?? '',
          avatar_url: profile?.avatar_url ?? '',
        });
      }
    };

    getUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
