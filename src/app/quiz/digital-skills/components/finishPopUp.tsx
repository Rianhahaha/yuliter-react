// components/FinishPopup.tsx

interface FinishPopupProps {
  score: number;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FinishPopup({ score, onClose, children }: FinishPopupProps) {
  return (
    <div className="absolute w-full h-full bg-black/60 backdrop-blur-md z-50 font-normal animate-finish-bg ">
      <div className="size-full flex items-center justify-center">
        <div className="p-3 sm:p-5 flex flex-col justify-between items-end rounded-2xl bg-gradient-to-bl to-purple-900 from-purple-600 text-white font-main transition-all duration-200 ease-in-out border-t-2 text-lg border-white shadow-[0px_0px_100px_50px_#ffffff30] tracking-widest w-xl min-h-1/2 animate-finish">
        <div></div>
          {children}
          <button
            className="w-full main-button"
            onClick={onClose}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
