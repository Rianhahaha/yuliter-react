"use client"
import { useUser } from "@/context/UserContext";
import { useQuizHistory } from "@/context/QuizHistoryContext";
import {useEffect, useState} from 'react';
import {supabase} from '@/utils/supabaseClient';


export default function ProfilePage() {
    const user = useUser();
    const {history} = useQuizHistory(); 

    console.log({history});
    console.log(history);
    console.log(user);
    return (
        <>
        <div>
            <h1>{user?.full_name}</h1>
            <h1>{user?.email}</h1>
        </div>

    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Riwayat Kuis</h2>
      {history.length === 0 ? (
        <p>Belum ada data kuis.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.id} className="border p-2 mb-2 rounded">
              Skor: {item.score}, Durasi: {item.duration}s, Tanggal:{" "}
              {new Date(item.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>



        </>
    );  
}