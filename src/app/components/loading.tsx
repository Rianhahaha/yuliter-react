import Bg from "@/component/bg";
import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <>
      <Bg />
      <div className="fixed z-10 w-full h-screen flex gap-2 justify-center items-center">
        <div className="text-white font-main text-2xl">
          {/* <Typewriter words={['Memuat...']} loop={Infinity} delaySpeed={0} />
           */}
          <Image src="/loading.svg" alt="loading" height={100} width={100} />
        </div>
      </div>
    </>
  );
}
