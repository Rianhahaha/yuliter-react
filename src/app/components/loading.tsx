import Bg from "@/component/bg";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Loading() {
  return (
    <>
      <Bg />
      <div className="fixed z-10 w-full h-screen flex gap-2 justify-center items-center">
        <div className="text-white font-main text-2xl">
          {/* <Typewriter words={['Memuat...']} loop={Infinity} delaySpeed={0} />
           */}
          <div className="text-white font-main text-2xl">Memuat...</div>
        </div>
      </div>
    </>
  );
}
