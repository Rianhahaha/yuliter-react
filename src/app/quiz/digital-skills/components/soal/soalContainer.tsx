interface SoalContainerProps {
  children: React.ReactNode;
  timeLeft: number;
  timeLimit?: any;
  question: string;
}
export default function SoalContainer({
  children,
  timeLeft,
  timeLimit = "",
}: SoalContainerProps) {
  // Hitung persentase progress
  const percentage = (timeLeft / timeLimit) * 100;

  // Tentukan warna berdasarkan sisa waktu
  const progressColor =
    timeLeft <= 10
      ? "bg-red-500"
      : timeLeft <= 30
      ? "bg-yellow-400"
      : "bg-green-500";
  return (
    <>
      <div className="flex flex-col size-full gap-6 relative">
        <div className="w-full px-5">
          <div className="w-full h-3 bg-white/20 border-mainBorder rounded-full ">
            <div
              className={`relative h-full transition-all duration-300 ease-linear rounded-full ${progressColor}`}
              style={{ width: `${percentage}%` }}
            >
              <div
                className={`${
                  timeLeft <= 10
                    ? "danger-button animate-shake-infinite"
                    : timeLeft <= 30
                    ? "score-button animate-shake-infinite"
                    : "success-button"
                } flex items-center gap-2 !text-3xl !px-4 !py-2 absolute top-1/2 -right-[3rem] -translate-y-1/2 pointer-events-none`}
              >
                {timeLeft}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col-reverse md:flex-row  relative">
          <div className="shrink flex flex-col items-center">
            {/* <div className={`${
              timeLeft <= 10 ? "danger-button animate-shake-infinite" 
              : timeLeft <= 30 ? "score-button animate-shake-infinite" 
              : "success-button"
            } flex items-center gap-2 !text-3xl`

            }>
              {timeLeft}
            </div> */}
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center bg-white text-black rounded-3xl overflow-y-hidden  relative">
          {children}
        </div>
      </div>
    </>
  );
}
