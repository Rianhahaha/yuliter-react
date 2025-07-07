import Image from "next/image";
import LinkButton from "./buttons/link-button";

export default function Section2() {
  return (
    <>
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
            <LinkButton link="/dashboard" text="Coba Sekarang!" />
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
            <LinkButton link="/dashboard" text="Coba Sekarang!" />
          </div>
        </div>
      </section>
    </>
  );
}
