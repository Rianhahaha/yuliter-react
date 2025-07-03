interface SoalContainerProps {
  children: React.ReactNode;
  timeLeft: number;
  question: string;
}
export default function SoalContainer({
  children,
  timeLeft,
  question,
}: SoalContainerProps) {
  return (
    <>
      <div className="flex flex-col size-full gap-6 relative">
        <div className="w-full h-fit flex flex-col-reverse md:flex-row  relative">
          <p className="grow text-sm  sm:text-lg font-normal sm:font-semibold text-justify border-r border-white/20 pr-4">
            {question}
          </p>
          <div className="shrink flex flex-col items-center px-5 ">
            <div className="text-sm font-semibold">Sisa Waktu :</div>
            <div className={`${
              timeLeft <= 10 ? "danger-button animate-shake-infinite" 
              : timeLeft <= 30 ? "score-button animate-shake-infinite" 
              : "success-button"
            } flex items-center gap-2 !text-3xl`

            }>
              {timeLeft}
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center bg-white text-black rounded-3xl overflow-y-hidden  relative">
          {children}
        </div>
      </div>
    </>
  );
}
