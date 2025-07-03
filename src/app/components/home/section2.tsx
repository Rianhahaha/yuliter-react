import Image from "next/image";
import LinkButton from "./buttons/link-button";

export default function Section2() {
  return (
    <>
    <div
      className="h-screen flex justify-center items-center bg-background2 rounded-t-[5rem] p-[6rem]"
      id="section2"
      >
      <div className="w-1/2 flex justify-center">
        <Image src={"/file.svg"} alt="" height={500} width={500} />
      </div>
      <div className="w-1/2 flex flex-col items-start gap-5">
        <div className="mx-[-1rem] w-full">
          <div className="text-[4rem] font-main">yuk bergabung!</div>
          <div className="text-[1rem] font-secondary text-justify">
            Bergabunglah bersama kami di Yu Liter untuk mengasah kemampuan
            digital kamu. Dengan cara yang menyenangkan, kamu akan belajar cara
            mengenali informasi yang dapat dipercaya, memahami teknologi, dan
            tetap aman saat berinteraksi di dunia maya.
          </div>
        </div>
        <div className="w-full flex justify-end">

        <LinkButton link="/dashboard" text="Coba Sekarang!" />
        </div>
      </div>
    </div>
    <div
      className="h-full flex justify-center items-center bg-background2 rounded-t-[5rem] p-[6rem] border">
        <div className="w-[10rem] text-center bg-amber-200 text-black border-2 p-5 box-border">
          <div>

          adsa
          <a href="http://www.onlinewebfonts.com">Web Fonts</a>
          </div>
        </div>
     
    </div>
      </>
  );
}
