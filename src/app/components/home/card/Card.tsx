import Image from "next/image";

interface CardProps {
    title: string;
    description: string;
    image: string;
}
export default function Card( props: CardProps ) {
  return (
    <>
      <div className="main-button group relative !cursor-default !rounded-xl !p-5">
        <Image
          src={props.image}
          alt=""
          height={300}
          width={300}
          className="absolute group-hover:top-[-6rem] group-hover:rotate-12 h-[8rem] top-[-3rem] left-1/2 -translate-x-1/2 hovered"
        />
        <h3 className="text-lg font-light mt-[5rem]">
          {props.title}
        </h3>
        <p className="text-sm font-text ">
          {props.description}       
           </p>
      </div>
    </>
  );
}
