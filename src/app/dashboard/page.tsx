"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Bg from "@/component/bg";
import Logo from "../components/logo";
import Loading from "../components/loading";
import MainDashboard from "./main";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);

  const user = useUser();

  const handleOpen = () => {
    setOpen(!open);
  };

  const pages = [
    {
      text: "Menu Utama",
      pages: <MainDashboard fullName={user?.full_name || ""}/>,
    },
    {
      text: "Pengaturan",
      pages: <> pengaturan</>,
    },
    {
      text: "Peringkat",
      pages: <> peringkat</>,
    },
  ];

  useEffect(() => {

      setLoading(false);
    }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <Loading />;

  return (
    <>
      <Bg />
      <main className="h-screen w-full flex gap-[3rem]">
        <section
          className={`bg-background2 h-full p-[2rem] rounded-r-2xl text-nowrap shadow-2xl relative hovered ${
            open ? "w-0 !p-0 !py-[2rem]" : "w-[20rem]"
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
                        ? "!shadow-[0px_0px_15px_5px_#fcd4ff]"
                        : ""
                    }`}
                    onClick={() => setActivePage(index)}
                  >
                    {page.text}
                  </li>
                ))}
              </ul>
              <div className="danger-button !w-full text-center" onClick={handleLogout}>
                Keluar
              </div>
            </nav>
          </div>
        </section>

        <section className="p-[1rem] w-full h-screen flex flex-col">
          <div className="w-full h-[5rem] flex justify-end items-center gap-5">
            <div className="main-button  !px-5 !py-4 !rounded-2xl !cursor-default">
            {user?.full_name}
              </div>
            {/* <div className="main-button  !px-5 !py-4 !rounded-2xl !cursor-default">
                <Image src="/logout.svg" alt="" height={30} width={30} />
              </div> */}
          </div>
          <div className="w-full">{pages[activePage].pages}</div>
        </section>
      </main>
    </>
  );
}
