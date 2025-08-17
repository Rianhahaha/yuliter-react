"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/context/UserContext";

export type QuizResult = {
  id: string;
  score: number;
  duration: number;
  created_at: string;
  profiles_id: string;
  profiles: {
    full_name: string;
  };
};

type QuizHistoryContextType = {
  history: QuizResult[];
  refreshHistory: () => Promise<void>;
};

const QuizHistoryContext = createContext<QuizHistoryContextType | undefined>(undefined);

export const QuizHistoryProvider = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const profile_id = user?.id;
  const [history, setHistory] = useState<QuizResult[]>([]);

  const fetchHistory = useCallback( async () => {
    if (!profile_id) return;

    const { data, error } = await supabase
      .from("digital_skills_responses")
      .select("id,score, duration, created_at, profiles:profiles_id(full_name), profiles_id")
      .eq("profiles_id", profile_id)
      .order("created_at", { ascending: false });
      console.log(data);

    if (error) {
      console.error("Error fetching quiz history:", error);
      return;
    }

    if (data) {
      const normalized = data.map((item) => ({
        ...item,
        profiles: item.profiles[0] ?? {},
      }));
      setHistory(normalized);
    }
  }, [profile_id]);

  useEffect(() => {
    if (profile_id) {
           console.log("HistoryProvider mounted");

      fetchHistory();
    }
  }, [profile_id, fetchHistory]);

  return (
    <QuizHistoryContext.Provider value={{ history, refreshHistory: fetchHistory }}>
      {children}
    </QuizHistoryContext.Provider>
  );
};

export const useQuizHistory = () => {
  const context = useContext(QuizHistoryContext);
  if (!context) throw new Error("useQuizHistory must be used within a QuizHistoryProvider");
  return context;
};
