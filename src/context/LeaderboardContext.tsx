'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/utils/supabaseClient';



type Profile = {
  full_name: string;
};

export type Leader = {
  profiles_id: string;
  score: number;
  duration: number;
  created_at: string;
  profiles: Profile;
};

type LeaderboardContextType = {
  leaders: Leader[];
  refreshLeaders: () => Promise<void>;
};

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);


export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
    
  const [leaders, setLeaders] = useState<Leader[]>([]);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('digital_skills_responses')
      .select('score, duration, created_at, profiles:profiles_id(full_name), profiles_id')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leaderboard:', error.message);
      return;
    }

    if (data) {
      const latestResponses = data.reduce((acc: Leader[], current) => {
        const profile = Array.isArray(current.profiles) ? current.profiles[0] : current.profiles;

        const existingUser = acc.find((item) => item.profiles_id === current.profiles_id);

        const normalized = {
          ...current,
          profiles: profile,
        };

        if (!existingUser) {
          acc.push(normalized);
        } else if (current.score > existingUser.score) {
          const index = acc.indexOf(existingUser);
          acc[index] = normalized;
        }

        return acc;
      }, []);

      const sortedResponses = latestResponses.sort((a, b) => b.score - a.score);

      setLeaders(sortedResponses);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <LeaderboardContext.Provider value={{ leaders, refreshLeaders: fetchLeaderboard }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  return context;
};
