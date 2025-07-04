"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Bg from "@/component/bg";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError || !data.user) {
      setError(loginError?.message || "Login gagal");
      return;
    }

    router.push("/check-profile");
  };

  const handleLoginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/check-profile`,
      },
    });

    if (error) {
      setError(error.message || "Gagal login dengan Google");
    }
  };

  return (
    <>
      <Bg />
      <section className="h-screen flex flex-col items-center justify-center">
        {/* <div className="text-[2rem] font-main">Masuk</div> */}

        <main className="max-w-xl h-full !max-h-[30rem] m-auto p-4 main-container relative">
                    <Link className="danger-button !p-4 absolute top-4 left-4" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
            </svg>
          </Link>

          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-between h-full font-text "
          >
            <div className="space-y-6">
          <div className="text-[2rem] text-center font-main mb-5 ">Masuk</div>
              <input
                type="email"
                placeholder="Email"
                className="main-form"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="main-form"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-3">
              <button className="success-button !w-full" type="submit">
                Masuk
              </button>
              <button
                type="button"
                onClick={handleLoginWithGoogle}
                className="google-button !w-full flex items-center justify-center gap-2"
              >
                <div className="w-[2rem] rounded-full mb-1 bg-white p-1">
                  <Image
                    src="/google.svg"
                    alt=""
                    height={20}
                    width={20}
                    className="w-full"
                  />
                </div>
                Lanjutkan dengan Google
              </button>
              <div className="flex w-full justify-center">
                <div>
                  Belum puya akun? <Link className="hover:underline font-black" href="/register">Daftar sekarang</Link>
                </div>
              </div>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
