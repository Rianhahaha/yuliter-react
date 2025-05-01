import { useEffect, useState } from "react";
import Link from "next/link";

export default function MainDashboard( {fullName} : {fullName: string} ) {

  const [loading, setLoading] = useState(true);
  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center bg-black/50 main-container">
        <h1 className="text-2xl font-bold">Selamat datang, {fullName}!</h1>
        <p>Kamu sudah berhasil login dan profilmu sudah siap 🎉</p>
        <div className="flex flex-col gap-2">
          <Link href={"/dashboard/profile"}>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Profile
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
