"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Bg from "@/component/bg";
import Button from "../components/home/buttons/button";
import Image from "next/image";

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

        <main className="max-w-md m-auto p-4 main-container">
        <div className="text-[2rem] font-main">Masuk</div>
          <form onSubmit={handleLogin} className="space-y-4 font-text">
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
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="!w-full">Login</Button>

          </form>

          <hr className="my-6" />

          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="google-button !w-full flex items-center justify-center gap-2"
          >
            <div className="w-[2rem] rounded-full mb-1 bg-white p-1">

            <Image src="/google.svg" alt="" height={20} width={20} className="w-full" />
            </div>
            Login dengan Google
          </button>
        </main>
      </section>
    </>
  );
}
