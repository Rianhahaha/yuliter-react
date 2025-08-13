import Image from "next/image";

export default function Petunjuk() {
  return (
    <>
      <div className="text-2xl font-main tracking-widest">Petunjuk!</div>
      <ul className="space-y-5">
        <li>
          <span className="font-semibold">1. </span>
          Bentuk soal dari aplikasi ini berupa studi kasus yang berkaitan dengan
          <span className="font-black ">
            {" "}
            kemampuan digital untuk menghadapi dunia kerja.
          </span>
        </li>
        <li>
          <span className="font-semibold">2. </span>
          Baca instruksi dengan baik. Setelah klik lanjut instruksi tidak akan
          bisa dilihat ulang.
          <Image
            src="/petunjuk/1.png"
            alt="petunjuk"
            width={500}
            height={500}
            className="mt-3 w-full object-contain border border-mainBorder rounded-2xl"
          />
        </li>
        <li>
          <span className="font-semibold">3. </span>
          Waktu setiap soal akan berbeda, kamu dapat memerhatikan waktu nya
          sebelum klik lanjut.
          <Image
            src="/petunjuk/2.png"
            alt="petunjuk"
            width={500}
            height={500}
            className="mt-3 w-full object-contain border border-mainBorder rounded-2xl"
          />
          <Image
            src="/petunjuk/3.png"
            alt="petunjuk"
            width={500}
            height={500}
            className="mt-3 w-full object-contain border border-mainBorder rounded-2xl"
          />
        </li>
        <li>
          <span className="font-semibold">4. </span>
          Skor tertinggi tiap butir soal adalah 10. Skor akan berkurang setiap
          waktu berkurang. Semakin lama kamu mengerjakan butir soal semakin
          sedikit skor yang didapatkan.
          <Image
            src="/petunjuk/4.png"
            alt="petunjuk"
            width={500}
            height={500}
            className="mt-3 w-full object-contain border border-mainBorder rounded-2xl"
          />
        </li>
        <li>
          <span className="font-semibold">5. </span>
          Jika waktu habis, kamu akan langsung diarahkan ke soal selanjutnya.
          <Image
            src="/petunjuk/5.png"
            alt="petunjuk"
            width={500}
            height={500}
            className="mt-3 w-full object-contain border border-mainBorder rounded-2xl"
          />
        </li>
        <li className="text-center font-main tracking-widest text-2xl">
          Selamat mengerjakan! Yuk tingkatkan kemampuan digitalmu!
        </li>
      </ul>
    </>
  );
}
