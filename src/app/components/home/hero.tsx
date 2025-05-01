import LinkButton from "./buttons/link-button";
export default function Hero() {
  return (
    <div className="h-screen flex justify-center items-center" id="hero">
      <div className="flex flex-col items-center gap-5">
        <div className="text-center">
          <div className="text-[1rem] font-main">Selamat Datang di</div>
          <div className="text-[6rem] font-main mt-[-2rem]">Yu-liter</div>
          <div className="text-[1rem] font-secondary">
            Tingkatkan Literasi Digitalmu, Kuasai Dunia Maya!
          </div>
        </div>
        <LinkButton link="/dashboard" text="Coba Sekarang!" />
      </div>
    </div>
  );
}
