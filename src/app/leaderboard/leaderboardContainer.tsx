'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

type Profile = {
  full_name: string;
};

type Leader = {
  profiles_id: string;
  score: number;
  duration: number;
  created_at: string;
  profiles: Profile;
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
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

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>
      <ul>
        {leaders.map((item, index) => (
          <li key={index} className="border p-4 rounded mb-2">
            {index === 0 && <span className="text-yellow-500">🥇</span>}

            <div className="font-semibold">{item.profiles?.full_name}</div>
            <div>Skor: {item.score}</div>
            <div>Durasi: {item.duration}s</div>
            <div className="text-sm text-gray-500">
              {new Date(item.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
