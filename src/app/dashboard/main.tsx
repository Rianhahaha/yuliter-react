import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { QuizResult } from "@/context/QuizHistoryContext";
import { useUser } from "@/context/UserContext";
import { useLeaderboard } from "@/context/LeaderboardContext"; // Ambil dari context Leaderboard
import Loading from "../components/loading";

type MainDashboardProps = {
  avatar_url: string;
  // score: number;
  quizHistory: QuizResult[];
};
export default function MainDashboard({
  avatar_url,
  quizHistory,
}: MainDashboardProps) {
  const [loading, setLoading] = useState(true);
  const highestScore = Math.max(...quizHistory.map((result) => result.score));
  const latestScore = quizHistory[0]?.score || 0;
  const { leaders } = useLeaderboard(); // Ambil data leaderboard dari context
  const user = useUser(); // Ambil data user dari context
  const [userRank, setUserRank] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const messages = [
    "Halo, {name}! Jangan mau kalah sama yang lain ya!",
    "Tunjukkan skill digitalmu, {name}!",
    "Siap jadi juara leaderboard, {name}?",
    "Semakin cepat, semakin tinggi skormu, {name}!",
    "Ayo {name}, buktikan kamu jago literasi digital!",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // mulai fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true); // lalu fade in
      }, 800); // waktu fade out sebelum ganti teks
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const currentMessage = messages[index].replace(
    "{name}",
    user?.full_name || "kamu"
  );

  useEffect(() => {
    if (leaders && user) {
      // Cari posisi user dalam leaderboard
      const userIndex = leaders.findIndex(
        (item) => item.profiles_id === user?.id
      );
      setUserRank(userIndex !== -1 ? userIndex + 1 : null); // Peringkat dimulai dari 1
    }

    setLoading(false);
  }, [leaders, user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-full gap-5 ">
        <div className="flex flex-col w-full lg:w-[70%]">
          <main className="w-full h-full gap-5 flex flex-col justify-between items-start">
            <div className="grid grid-cols-1 gap-5 w-full">
              {/* Peringkat */}
              <div className="relative z-[2]  w-full h-[calc(50dvh-1.5rem)] p-10 rounded-xl bg-gradient-to-l from-transparent to-[#1C1437] text-white font-main transition-all duration-200 ease-in-out border-t text-lg border-white/20 shadow-[inset_0px_-4px_0px_3px_#00000030] hovaer:scale-[102%] group tracking-widest">
                <div className="absolute hidden sm:block sm:w-[16rem] md:w-[20rem] lg:w-[15rem] xl:w-[20rem] top-[-1rem] right-[-1rem] group-hover:scale-105 group-hover:rotate-6  hovered">
                  <Image
                    src="/dashboard/dashboardMain.svg"
                    alt="quiz"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-center stroke-white"
                  />
                </div>
                <div className="w-full sm:w-[60%] gap-10 flex text-md sm:text-xl flex-col items-center sm:items-start text-center sm:text-start justify-center h-full">
                  <div
                    className={`${
                      visible
                        ? "opacity-100  translate-x-0"
                        : "opacity-0 translate-x-4"
                    } transition-all duration-300 ease-in-out`}
                  >
                    {currentMessage}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/quiz/digital-skills" className="main-button">
                      Mulai Quiz!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* asdsad */}
            {quizHistory.length < 0 && <>Data Belum ada</>}
            {quizHistory.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-5">
                  {/* Peringkat */}
                  <div className="dashboard-item from-amber-300  group">
                    <div className="flex flex-col justify-end leading-[4rem] h-full">
                      <span className="text-[1.5rem] leading-8">Peringkat</span>
                      <span className="text-[5rem]">
                        {userRank && <div>#{userRank}</div>}
                      </span>
                    </div>
                    <div className="absolute z-[3] w-[9rem] top-[-1rem] right-[-1rem] group-hover:top-[-2rem] group-hover:rotate-6 hovered">
                      <Image
                        src="/dashboard/peringkat.svg"
                        alt="quiz"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-center stroke-white"
                      />
                    </div>
                  </div>
                  {/* Skor Tertinggi */}
                  <div className="dashboard-item from-emerald-600  group">
                    <div className="flex flex-col justify-end leading-[4rem] h-full">
                      <span className="text-[1.5rem] leading-8">
                        Skor Tertinggi
                      </span>
                      <span className="text-[5rem]">{highestScore}</span>
                    </div>
                    <div className="absolute z-[3] w-[8rem] top-[-1rem] right-[-1rem] group-hover:top-[-2rem] group-hover:rotate-6 hovered">
                      <Image
                        src="/star.svg"
                        alt="quiz"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-center stroke-white"
                      />
                    </div>
                    <div className="absolute z-[3] w-[2rem] top-[-1rem] right-[-1rem] group-hover:top-[-2rem] delay-75 group-hover:rotate-6 hovered">
                      <Image
                        src="/star.svg"
                        alt="quiz"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-center stroke-white"
                      />
                    </div>
                  </div>
                  {/* Skor Terakhir */}
                  <div className="dashboard-item from-sky-600  group">
                    <div className="flex flex-col justify-end leading-[4rem] h-full">
                      <span className="text-[1.5rem] leading-8">
                        Skor Terakhir
                      </span>
                      <span className="text-[5rem]">{latestScore}</span>
                    </div>
                    <div className="absolute z-[10] w-[9rem] top-[-1rem] right-[-1rem] group-hover:top-[-2rem] group-hover:rotate-6 hovered">
                      <Image
                        src="/dashboard/recent.svg"
                        alt="quiz"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-center stroke-white"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* asdsa */}
          </main>
        </div>
        <div className="w-full lg:w-[30%] h-full ">
          <div className="relative z-[2] h-full w-full p-5 rounded-xl bg-gradient-to-l from-transparent to-[#1C1437] text-white font-main transition-all duration-200 ease-in-out border-t text-lg border-white/20 shadow-[inset_0px_-4px_0px_3px_#00000030] tracking-widest">
            <div className="absolute z-[3] w-[6rem] top-[-1rem] right-[0rem] group-hover:top-[-2rem] group-hover:rotate-6 hovered"></div>
            <h1 className="font-main">Riwayat</h1>
            <ul className="text-white mt-7 space-y-3  overflow-y-auto h-[calc(100%-3rem)] pr-2">
              {quizHistory.map((item) => (
                <li
                  key={item.id}
                  className="bg-white/10 hover:bg-white/20 py-2 px-5 rounded border-white/50 border-t hovered group"
                >
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
