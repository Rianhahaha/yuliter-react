"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import LinkButton from "./home/buttons/link-button";
import Logo from "./logo";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-transparent fixed w-full px-[6rem] py-[1rem] flex justify-between items-center">
      <Link href="#">
        <Logo/>
      </Link>

      {user ? (
        <div className="flex items-center space-x-4">
          <LinkButton link="/dashboard" text="Dashboard" />    
          <button className="danger-button"  onClick={handleLogout}>
            Logout
            </button>      
        </div>
      ) : (
        <LinkButton link="/login" text="Masuk" />
      )}
    </nav>
  );
}
