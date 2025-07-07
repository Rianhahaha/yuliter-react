// components/FinishPopup.tsx

import Image from "next/image";

interface FinishPopupProps {
  score: number;
  time: number;
  timeLeft : number;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FinishPopup({
  score,
  time,
  timeLeft,
  onClose,
  children,
}: FinishPopupProps) {
  return (
    <div className="absolute w-full h-full bg-black/60 backdrop-blur-md z-50 font-normal animate-finish-bg ">
      <div className="size-full flex items-center justify-center">
        <div className="p-3 sm:p-5 flex flex-col justify-between items-end rounded-2xl bg-gradient-to-bl to-purple-900 from-purple-600 text-white font-main transition-all duration-200 ease-in-out border-t-2 text-lg border-white shadow-[0px_0px_100px_50px_#ffffff30] tracking-widest  size-[80%] animate-finish">
         <div></div>
          <div className="flex flex-col justify-center w-full gap-5">
          {timeLeft == 0 ? (
            <>

            <div className="text-2xl w-full text-center items-center h-full">Waktu Habis :( <br/> Lebih cepat lagi yuk!</div>
                       {/* <div className="flex items-center w-full justify-center">
                  <Image
                    className="w-10"
                    src="/time.svg"
                    alt="clock"
                    width={30}
                    height={30}
                  />
                  <div className="text-2xl font-semibold ml-2">{time}</div>
                </div> */}
            </>
          ) : (
            <>
            <div className="!text-3xl text-center w-full ">
              {children}
            </div>
              <div className="flex justify-center w-full gap-5">
                <div className="flex items-center">
                  <Image
                    className="w-10"
                    src="/star.svg"
                    alt="clock"
                    width={30}
                    height={30}
                  />
                  <div className="text-2xl font-semibold ml-2">{score}</div>
                </div>
                <div className="flex items-center">
                  <Image
                    className="w-10"
                    src="/time.svg"
                    alt="clock"
                    width={30}
                    height={30}
                  />
                  <div className="text-2xl font-semibold ml-2 relative w-full">{time} <span className="absolute bottom-2 -right-[3rem] text-xs">
                    detik</span></div>
                </div>
              </div>
              <div className="text-xs sm:text-xl w-full text-center">
                Silakan lanjut mengerjakan! Semangat!
              </div>
            </>
          )}
                      </div>


          <button className="w-full main-button" onClick={onClose}>
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
