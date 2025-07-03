import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";
import SoalContainer from "./soalContainer";
export default function PilihLinkDownload({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
    const timeLimit = 60;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showAd, setShowAd] = useState(false); // Untuk kontrol pop-up iklan
  const [showAdDownload, setShowAdDownload] = useState(false); // Untuk kontrol pop-up iklan
  const [hasClickedOnce, setHasClickedOnce] = useState(false);
  let [score, setScore] = useState<number | null>(null);
  const [showFinish, setShowFinish] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showFinish) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showFinish]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAdDownload(true);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const adDownloadClick = () => {
    setShowAdDownload(false);
    setShowAd(true);
  };

const handleClick = (isCorrect: boolean) => {
  if (!hasClickedOnce) {
    setShowAdDownload(true);
    setHasClickedOnce(true);
    return;
  }

const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;
let computedScore = isCorrect
  ? 10 - Math.round(10 * timeUsedPercentage)
  : -5 - Math.round(5 * timeUsedPercentage);
setScore(computedScore);
setShowFinish(true);

};

  const handleFinish = () => {
    if (score !== null) {
      onFinish(score, timeLimit - timeLeft); // Kirim skor ke induk
    }
    setShowFinish(false);
  };

  return (
    <>
      <SoalContainer
        timeLeft={timeLeft}
        question={`
      Kamu hendak mengunduh Template CV untuk melamar kerja, kemudian kamu
          sudah menemukan web tersebut
          Unduh Template CV tersebut!, hati-hati sama iklan yaa
      
      `}
      >
        {showAdDownload && (
          <>
            <div
              className="absolute top-[1rem] z-50 right-[2rem] text-white cursor-pointer"
              onClick={() => setShowAdDownload(false)}
            >
              x
            </div>
            <div className="absolute w-full h-full bg-black/60 backdrop-blur-xs text-white">
              <div className="size-full  flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center text-black font-sans font-bold animate-shake-infinite">
                  <div className="flex items-center ">
                    <Image
                      src={"/download/file.svg"}
                      alt=""
                      height={500}
                      width={500}
                      className="w-10"
                    />
                    <p>Link untuk Download!</p>
                  </div>
                  <Image
                    src={"/download/2.png"}
                    alt=""
                    height={500}
                    width={500}
                    className="w-full h-auto cursor-pointer"
                    onClick={() => adDownloadClick()}
                  />
                  <p>100% Legit Link Download!</p>
                </div>
              </div>
            </div>
          </>
        )}
        {showAd && (
          <>
            <div
              className="absolute top-[1rem] z-20 left-[2rem] text-white cursor-pointer"
              onClick={() => setShowAd(false)}
            >
              x
            </div>
            <div className="absolute w-full h-full bg-black/60 backdrop-blur-xs text-white">
              <div className="size-full  flex items-center justify-center">
                <div className="bg-yellow-500 p-6 rounded-lg shadow-lg text-center">
                  <p>SELAMAT! KAMU MEMENANGKAN 1JUTA RUPIAH! 😆</p>
                  <p>Tukarkan kode ini</p>
                  <p>SDDC98D4</p>
                </div>
              </div>
            </div>
          </>
        )}
        {showFinish && score !== null && (
          <FinishPopup score={score} onClose={handleFinish}>
            <div className="sm:text-2xl md:text-3xl mb-2 w-full text-center space-y-2">
              <div>YAY! CV Berhasil didownload!</div>
              <div className="text-xs sm:text-sm">
                Silakan lanjut mengerjakan! Semangat!
              </div>
            </div>
          </FinishPopup>
        )}

        <div className="overflow-y-auto">
          <div className="w-full flex md:flex-row p-5 gap-5 border-b border-gray-300">
            <div className="w-[10rem]">
              <Image
                src={"/download/file.svg"}
                alt=""
                height={500}
                width={500}
                className="w-10 sm:w-full h-auto"
              />
            </div>
            <div className="w-full">
              <div className="font-bold">Template Portofolio</div>
              <div className="font-normal">Size : 10 MB</div>
            </div>
            <div className="w-full flex justify-end">
              <Image
                src={"/download/1.png"}
                alt=""
                height={500}
                width={500}
                className="w-auto h-auto object-contain sm:h-20 cursor-pointer hover:brightness-125"
                onClick={() => setShowAdDownload(true)}
              />
            </div>
          </div>
          <div className="p-5 flex flex-col sm:flex-row gap-5">
            <div className=" w-full sm:w-[70%] text-xs sm:text-md text-justify border-b border-gray-300 pb-5 sm:line-clamp-none line-clamp-6">
              This template is the perfect solution for anyone preparing to
              enter the job market, build a personal brand, or simply stand out
              in a sea of similar-looking resumes and portfolios. Whether you're
              a recent graduate, a creative professional, or someone looking to
              revamp their career profile, this modern, clean, and fully
              customizable portfolio template is designed to make your
              presentation look sharp and professional — without the stress of
              starting from scratch. Inside the template, you’ll find space to
              showcase: A short professional bio that gives recruiters a quick
              overview of who you are, Your educational background and work
              experience, neatly organized and easy to follow, Key skills and
              tools you’ve mastered, presented in a visual or list format, A
              project/gallery section where you can display your best work with
              brief descriptions, And of course, contact information and social
              media links (LinkedIn, GitHub, personal website, etc.). The file
              is approximately 10 MB in size and available in a format that’s
              easy to edit (e.g., Word, Canva, or Figma). All design elements
              are already in place — all you have to do is plug in your own
              content, tweak the fonts or colors if you like, and your CV or
              portfolio is good to go! Let’s be honest — in today’s competitive
              job market, simply having the qualifications is often not enough.
              Presentation matters. First impressions matter. This template
              helps you make both count. It tells employers or clients, “I’m
              serious about what I do, and I know how to present it.” So whether
              you’re applying for a job, pitching your services, or just want to
              have a professional portfolio ready to go — this template gives
              you a solid head start. Download now, stand out later.
            </div>
            <div className="w-full sm:w-[30%] flex flex-col items-center">
              <Image
                src={"/download/2.png"}
                alt=""
                height={500}
                width={500}
                className="w-auto h-20 cursor-pointer hover:brightness-125 object-contain"
                onClick={() => setShowAdDownload(true)}
              />
              <p className="font-sans">Super Fast Download!</p>
              <Image
                src={"/download/2.png"}
                alt=""
                height={500}
                width={500}
                className="w-auto h-20 cursor-pointer hover:brightness-125 object-contain"
                onClick={() => setShowAdDownload(true)}
              />
              <p className="font-sans">Super Fast Download!</p>

              <div className="border rounded-lg p-5 w-full border-gray-400 my-1 flex flex-col text-center text-sm justify-center">
                Super Compressed Download! <br /> Download Now!
                <button
                  onClick={() => setShowAdDownload(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white h-fit py-2 px-4 rounded cursor-pointer"
                >
                  Download (2mb)
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between p-5">
            <button
              // correct button
              onClick={() => handleClick(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white h-fit py-2 px-4 rounded cursor-pointer"
            >
              Download (10mb)
            </button>
            <Image
              src={"/download/3.png"}
              alt=""
              height={500}
              width={500}
              className="w-[10rem] md:w-auto h-20 cursor-pointer hover:brightness-125"
              onClick={() => setShowAdDownload(true)}
            />
          </div>
        </div>
      </SoalContainer>
    </>
  );
}
