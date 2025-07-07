import LinkButton from "./buttons/link-button";
export default function Hero() {
  return (
    <div className="h-screen flex justify-center items-center" id="hero">
      <div className="flex flex-col items-center gap-5 font-main tracking-widest">
        <div className="text-center">
          <div className="text-[1rem]">Selamat Datang di</div>
          <div className="text-[4rem] md:text-[6rem] mt-0 md:mt-[-2rem]">Yu-liter</div>
          <div className="text-sm md:text-[1rem]">
            Tingkatkan Literasi Digitalmu, Kuasai Dunia Maya!
          </div>
        </div>
        <LinkButton link="/dashboard" text="Coba Sekarang!" />
      </div>
    </div>
  );
}
