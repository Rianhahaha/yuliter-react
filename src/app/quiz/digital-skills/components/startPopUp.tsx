// components/FinishPopup.tsx
interface FinishPopupProps {
  soal: string;
  onClose: () => void;
}

export default function StartPopup({ soal, onClose }: FinishPopupProps) {
  return (
    <div className="absolute w-full h-full bg-black/60 backdrop-blur-md z-[1000] font-normal animate-finish-bg ">
      <div className="size-full flex items-center justify-center">
        <div className="relative p-3 sm:p-5 flex flex-col justify-between items-end rounded-2xl bg-gradient-to-bl to-purple-900 from-purple-600 text-white font-main transition-all duration-200 ease-in-out border-t-2 text-lg border-white shadow-[0px_0px_100px_50px_#ffffff30] tracking-widest size-[80%] animate-finish">
          <div className="absolute -top-[1rem] left-0">
            <div className="main-button !cursor-default relative">
                <div className="absolute -top-[3rem] left-[-1rem] text-[5rem] -rotate-12">
                    !!
                </div>
                Instruksi
            </div>
          </div>
          <div className="text-xs font-text font-semibold sm:text-2xl w-full text-center justify-center flex items-center h-full">
            {soal}
          </div>
          <button className="w-full main-button" onClick={onClose}>
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
