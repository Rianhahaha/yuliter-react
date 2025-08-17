"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Logo from "../components/logo";
import Loading from "../components/loading";
import MainDashboard from "./main";
import { useUser } from "@/context/UserContext";
import { useQuizHistory } from "@/context/QuizHistoryContext";
import EditProfilePage from "../edit-profile/page";
import Leaderboard from "../leaderboard/leaderboardContainer";
import Bg from "@/component/bg";
// import { useLeaderboard } from "@/context/LeaderboardContext";

export default function DashboardPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(true);
  const [activePage, setActivePage] = useState(0);

  const { history } = useQuizHistory();
  const user = useUser();
  // const { refreshLeaders } = useLeaderboard();
  useEffect(() => {
    if (user === undefined) return; // ⏳ masih loading user
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (user === undefined) return <Loading />;
  if (!user) return <Loading />; // optionally return nothing (karena sedang push)

  // refreshLeaders();
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenMobile = () => {
    setOpenMobile(!openMobile);
  };
  const handleMobilePage = (index: number) => {
    setActivePage(index);
    setOpenMobile(true);
  };

  const pages = [
    {
      text: "Menu Utama",
      pages: <MainDashboard quizHistory={history} />,
    },
    {
      text: "Pengaturan",
      pages: <EditProfilePage />,
    },
    {
      text: "Peringkat",
      pages: <Leaderboard />,
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      <Bg />
      <main className="h-screen w-full flex flex-col lg:flex-row gap-[3rem]">
        <section
          className={`hidden lg:block bg-background2 h-full p-[2rem] rounded-r-2xl text-nowrap shadow-2xl relative transition-all duration-500 ease-in-out ${
            open
              ? "w-0 !p-0 !py-[2rem]  transition-all duration-500 ease-in-out"
              : "w-[20rem]"
          }`}
        >
          <div
            className="absolute main-button !p-1 !rounded-l-none right-[-3rem]"
            onClick={handleOpen}
          >
            <svg
              className={`pr-1 size-10 hovered ${open ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 6v12" />
              <path d="M18 6l-6 6l6 6" />
            </svg>
          </div>
          <div className={`h-full flex flex-col ${open ? "hidden" : ""}`}>
            <div className="flex justify-center">
              <Logo />
            </div>
            <nav className="h-full flex flex-col justify-between">
              <ul className="flex flex-col gap-5 pt-[2rem]">
                {pages.map((page, index) => (
                  <li
                    key={index}
                    className={`main-button !w-full text-center hovered ${
                      activePage === index
                        ? "!shadow-[0px_0px_15px_5px_#fcd4ff] hovered"
                        : "hovered"
                    }`}
                    onClick={() => setActivePage(index)}
                  >
                    {page.text}
                  </li>
                ))}
              </ul>
              <div
                className="danger-button !w-full text-center"
                onClick={handleLogout}
              >
                Keluar
              </div>
            </nav>
          </div>
        </section>
        {/* mobile */}
        <section
          className={`block fixed lg:hidden z-50 bg-background2/50 backdrop-blur-3xl size-full   text-nowrap shadow-2xl transition-all duration-500 ease-in-out ${
            openMobile
              ? "!h-0 !p-0  transition-all duration-500 ease-in-out"
              : "p-[2rem]"
          }`}
        >
          <div
            className="fixed z-[9999] main-button flex items-center gap-2 !p-2 !px-5  left-[1rem] top-[1.5rem]"
            onClick={handleOpenMobile}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`pr-1 size-10 hovered ${
                openMobile ? "rotate-180" : ""
              }`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" />
              <path d="M20 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" />
              <path d="M10 13h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" />
              <path d="M17 13a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z" />
            </svg>
            Menu
          </div>
          <div className={`h-full flex flex-col ${openMobile ? "hidden" : ""}`}>
            <div className="flex justify-center">
              <Logo />
            </div>
            <nav className="h-full flex flex-col justify-between">
              <ul className="flex flex-col gap-5 pt-[2rem]">
                {pages.map((page, index) => (
                  <li
                    key={index}
                    className={`main-button !w-full text-center hovered ${
                      activePage === index
                        ? "!shadow-[0px_0px_15px_5px_#fcd4ff] hovered"
                        : "hovered"
                    }`}
                    onClick={() => handleMobilePage(index)}
                  >
                    {page.text}
                  </li>
                ))}
              </ul>
              <div
                className="danger-button !w-full text-center"
                onClick={handleLogout}
              >
                Keluar
              </div>
            </nav>
          </div>
        </section>

        <section className="p-[1rem] w-full h-screen flex flex-col pt-[6rem] md:pt-0">
          <div className="mb-5 sm:mb-0 w-full h-[5rem]  flex justify-center sm:justify-end items-center gap-5">
            <div className="main-button !text-center !px-5 !py-4 !rounded-2xl !cursor-default">
              Selamat Datang, {user?.full_name}!
            </div>
          </div>
          <div className="w-full h-[calc(100%-5rem)]">
            {pages[activePage].pages}
          </div>
        </section>
      </main>
    </>
  );
}
