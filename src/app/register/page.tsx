"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Bg from "@/component/bg";
import Link from "next/link";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ Cek apakah username sudah dipakai
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existing) {
      setError("Username sudah dipakai. Coba yang lain.");
      return;
    }

    // ✅ Daftar ke auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message || "Registrasi gagal");
      return;
    }

    // ✅ Masukkan ke tabel profiles (WAJIB!)
    await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      email,
      full_name,
    });

    // ✅ Redirect ke /dashboard atau /check-profile
    router.push("/dashboard");
  };

  return (
    <>
      <Bg />
      <section className="h-screen flex flex-col items-center justify-center font-text">
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
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="text-[2rem] text-center font-main mb-5 ">
              DAFTAR
            </div>

            <input
              type="text"
              placeholder="Username"
              className="main-form"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="main-form"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="main-form"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
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

            <div className="space-y-3">
              <button className="success-button !w-full" type="submit">
                Daftar
              </button>

              <div className="flex w-full justify-center">
                <div>
                  Sudah punya akun?{" "}
                  <Link className="hover:underline font-black" href="/login">
                    Masuk sekarang
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
