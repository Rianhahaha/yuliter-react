import LinkButton from "./buttons/link-button";
import Image from "next/image";
import Card from "./card/Card";

export default function Hero() {
  return (
    <>
      <section className="h-screen flex justify-center items-center" id="hero">
        <div className="flex flex-col items-center gap-5 font-main tracking-widest">
          <div className="text-center">
            <div className="text-[1rem]">Selamat Datang di</div>
            <div className="text-[4rem] md:text-[6rem] mt-0 md:mt-[-2rem]">
              Yu-liter
            </div>
            <div className="text-sm md:text-[1rem] drop-shadow-xl/50">
              Tingkatkan Literasi Digitalmu, Kuasai Dunia Maya!
            </div>
            <div className="text-sm md:text-[1rem] drop-shadow-xl/50">
              Platform berbasis gamifikasi untuk melatih digital skills untuk
              menghadapi dunia kerja.
            </div>
          </div>
          <LinkButton link="/dashboard" text="Coba Sekarang!" />
        </div>
      </section>
      <section className="py-20 text-center font-main tracking-widest">
        <h2 className="text-3xl md:text-5xl  mb-[5rem]">
          Kenapa Yu-liter?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <Card
            title="Siap Hadapi Dunia Kerja Digital"
            description="Latihan menghadapi tantangan digital seperti mengenali lowongan asli, menghindari penipuan, dan menjaga keamanan data."
            image="/icons/shield.svg"
          />
          <Card
            title="Asah Kemampuan Digital Skills"
            description="Konsep gamifikasi yang relevan dengan dunia kerja."
            image="/icons/brain.svg"
          />
          <Card
            title="Belajar Berbasis Gamifikasi"
            description="Kuis interaktif yang seru dan menantang membuat proses belajar terasa seperti bermain, bukan sekadar teori."
            image="/icons/game.svg"
          />
       
        </div>
      </section>

      <section
        className="gap-5 h-screen flex flex-col md:flex-row justify-center items-center  rounded-t-[5rem] p-5 md:p-[6rem]"
        id="section2"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={"/dashboard/dashboardMain.svg"}
            alt=""
            height={500}
            width={500}
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start gap-5">
          <div className=" w-full">
            <div className="text-center md:text-left text-[2rem] lg:text-[4rem] font-main">
              yuk bergabung!
            </div>
            <div className="text-[0.7rem] md:text-[1rem] font-main tracking-widest text-justify">
              Bergabunglah bersama kami di Yu Liter untuk mengasah kemampuan
              digital kamu. Dengan cara yang menyenangkan, kamu akan belajar
              cara mengenali informasi yang dapat dipercaya, memahami teknologi,
              dan tetap aman saat berinteraksi di dunia maya.
            </div>
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <LinkButton link="#hero" text="Coba Sekarang!" />
          </div>
        </div>
      </section>
      <section
        className="gap-5 h-screen flex  flex-col md:flex-row-reverse justify-center items-center  rounded-t-[5rem] p-5 md:p-[6rem]"
        id="section3"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src={"/section3.png"} alt="" height={500} width={500} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start gap-5">
          <div className=" w-full">
            <div className="text-center md:text-left text-[2rem] lg:text-[4rem] font-main">
              Siap Hadapi Dunia Kerja Digital?
            </div>
            <div className="text-[0.7rem] md:text-[1rem] font-main tracking-widest text-justify">
              Dunia kerja makin digital — apakah kamu sudah siap?{" "}
              <strong>Yu Liter</strong> bantu kamu mengenali lowongan asli,
              menghindari penipuan online, menyusun email profesional, dan
              banyak lagi. Semua lewat kuis interaktif yang bikin nagih!
            </div>
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <LinkButton link="#hero" text="Coba Sekarang!" />
          </div>
        </div>
      </section>
    </>
  );
}
