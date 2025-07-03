"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useLeaderboard } from "@/context/LeaderboardContext"; // Ambil dari context Leaderboard

export default function LeaderboardContainer() {
  const { leaders } = useLeaderboard(); // Ambil data leaderboard dari context
  const user = useUser(); // Ambil data user dari context
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    if (leaders && user) {
      // Cari posisi user dalam leaderboard
      const userIndex = leaders.findIndex(
        (item) => item.profiles_id === user?.id
      );
      setUserRank(userIndex !== -1 ? userIndex + 1 : null); // Peringkat dimulai dari 1
    }
  }, [leaders, user]);

  return (
    <>
      <div className="main-container h-full font-main tracking-widest">
        <div className="w-full flex justify-between">
          <h1 className="sm:text-2xl md:text-5xl font-main tracking-wider mb-3 text-center">
            Peringkat
          </h1>
          <div className="flex flex-col items-end">
            <div className=" sm:text-2xl md:text-3xl  font-main tracking-widest">
              Posisi kamu:
            </div>
            {userRank && (
              <div className="font-main !text-[2rem] !py-1 !rounded-xl ">
                #{userRank}
              </div>
            )}
          </div>
        </div>

        <ul className="mt-2 overflow-y-auto h-[calc(100%-5rem)] space-y-4 px-0 sm:px-2 ">
          {leaders.map((item, index) => {
            const first = index === 0;
            const second = index === 1;
            const third = index === 2;
            const rest = index > 2;
            return (
              <>
                {[first, second, third].includes(true) && (
                  <li
                    className={`h-[6rem] overflow-hidden hover:brightness-110 py-2 px-5 rounded border-white/50 border-t hovered group relative ${
                      first
                        ? "text-xl bg-gradient-to-bl from-yellow-300 to-amber-500/80"
                        : second
                        ? "text-lg bg-gradient-to-bl from-gray-300 to-slate-500/80"
                        : "text-md bg-gradient-to-bl from-orange-600 to-orange-900"
                    }`}
                  >
                    <div className="absolute z-[10] w-[6rem] top-[-3rem] rotate-12 opacity-80 group-hover:opacity-100 right-0 group-hover:top-[-2.5rem] group-hover:scale-125 group-hover:rotate-6 hovered">
                      <Image
                        src={`/leaderboard/${
                          first ? "1" : second ? "2" : "3"
                        }.svg`}
                        alt="quiz"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-center stroke-white"
                      />
                    </div>
                    <div className="">{item.profiles?.full_name}</div>
                    <div className="flex gap-5">
                      <div className="flex gap-2">
                        <Image
                          src="/star.svg"
                          alt="quiz"
                          width={300}
                          height={300}
                          className="drop-shadow-sm size-[1.5rem] object-contain object-center stroke-white group-hover:-translate-y-2 hovered"
                        />
                        <div>{item.score}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/time.svg"
                          alt="quiz"
                          width={300}
                          height={300}
                          className="size-[1.2rem] object-contain object-center stroke-white group-hover:-translate-y-2 delay-100 hovered"
                        />
                        <div>
                          {item.duration} <span className="text-xs">Detik</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs opacity-50">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </li>
                )}

                {rest && (
                  <li
                    key={index}
                    className="relative overflow-hidden text-sm bg-white/10 hover:bg-white/20 py-2 px-5 rounded border-white/50 border-t hovered group"
                  >
                    <div className="absolute z-[10] text-4xl rotate-12 opacity-80 group-hover:opacity-100 right-3 group-hover:scale-125 group-hover:rotate-6 hovered">
                      <span>#{index + 1}</span>
                    </div>

                    <div className="">{item.profiles?.full_name}</div>
                    <div className="flex gap-5">
                      <div className="flex gap-2 ">
                        <Image
                          src="/star.svg"
                          alt="quiz"
                          width={300}
                          height={300}
                          className="size-[1.5rem] object-contain object-center stroke-white group-hover:-translate-y-2 hovered"
                        />
                        <div>{item.score}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/time.svg"
                          alt="quiz"
                          width={300}
                          height={300}
                          className="size-[1.2rem] object-contain object-center stroke-white group-hover:-translate-y-2 delay-100 hovered"
                        />
                        <div>
                          {item.duration} <span className="text-xs">Detik</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs opacity-50">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}
