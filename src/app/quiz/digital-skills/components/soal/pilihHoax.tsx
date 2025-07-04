import React, { useEffect, useState, useRef } from "react";
import SoalContainer from "./soalContainer";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";

type HeadlineItem = {
  title: string;
  url: string;
  description: string;
  isHoax: boolean;
};

const allHeadlines: HeadlineItem[] = [
  {
    title: "Gaji Rp 20 juta untuk fresh graduate tanpa pengalaman!",
    url: "www.lokerajaib.com",
    description:
      "Sebuah perusahaan menjanjikan gaji fantastis untuk lulusan baru.",
    isHoax: true, // Hoax asli
  },
  {
    title: "Lowongan kerja gaji Rp 10 juta tanpa skill",
    url: "www.instaloker.net",
    description: "Tawaran mencurigakan ramai di media sosial.",
    isHoax: true, // Hoax asli
  },

  // Valid tapi gaya clickbait
  {
    title: "Kerja remote dibayar tinggi untuk customer support",
    url: "www.techjob.id",
    description:
      "Posisi entry-level dengan pelatihan awal untuk kerja jarak jauh.",
    isHoax: false,
  },
  {
    title: "Kursus gratis dan bersertifikat dari Kemnaker",
    url: "www.kemnaker.go.id",
    description: "Pelatihan kerja resmi dengan fasilitas dan sertifikat.",
    isHoax: false,
  },
  {
    title: "Magang di startup bisa jadi batu loncatan karier",
    url: "startupkarir.com",
    description: "Magang sebagai peluang membangun pengalaman profesional.",
    isHoax: false,
  },
  {
    title: "Tips interview langsung dari HR profesional",
    url: "www.kariercerdas.id",
    description: "Kiat sukses menghadapi interview kerja dari HR senior.",
    isHoax: false,
  },
  {
    title: "CPNS 2025 resmi dibuka, daftar lewat SSCASN",
    url: "www.bkn.go.id",
    description: "Pendaftaran CPNS dilakukan lewat portal resmi pemerintah.",
    isHoax: false,
  },

  // Jebakan (clickbait style tapi valid)
  {
    title: "Isi form dan dapat panggilan interview dari job fair kampus",
    url: "www.eventkampus.com",
    description:
      "Job fair menyediakan form lamaran untuk diteruskan ke perusahaan.",
    isHoax: false, // Valid meski kelihatan mencurigakan
  },
  {
    title: "Kerja 4 jam sehari dengan kontrak fleksibel",
    url: "freelancehub.id",
    description:
      "Lowongan part-time dengan jam kerja fleksibel untuk mahasiswa.",
    isHoax: false,
  },
  {
    title: "Startup unicorn rekrut talenta fresh graduate",
    url: "karirunicorn.com",
    description: "Kesempatan kerja menarik di perusahaan teknologi besar.",
    isHoax: false,
  },
  {
    title: "Loker magang bersertifikat dari instansi resmi",
    url: "www.magangsakti.id",
    description: "Magang terstruktur dan diakui untuk mahasiswa tingkat akhir.",
    isHoax: false,
  },
  {
    title: "Platform belajar digital bantu tingkatkan skill kerja",
    url: "www.skillhub.id",
    description: "Belajar daring jadi solusi tingkatkan daya saing kerja.",
    isHoax: false,
  },
  {
    title: "Lowongan untuk SMA di posisi admin entry-level",
    url: "kerjain.id",
    description: "Lowongan dibuka untuk lulusan SMA di bidang administratif.",
    isHoax: false,
  },
  {
    title: "Belum lulus? Bisa daftar magang sambil kuliah",
    url: "www.kampusmagang.id",
    description: "Program magang fleksibel untuk mahasiswa aktif.",
    isHoax: false,
  },
  {
    title: "Rekrutmen cepat untuk posisi digital marketing",
    url: "digitalkarir.co.id",
    description: "Seleksi 1 tahap dengan hasil diumumkan dalam 3 hari.",
    isHoax: false,
  },
  {
    title: "Daftar kerja cukup isi formulir online",
    url: "careerform.id",
    description: "Perusahaan menyediakan sistem form lamaran otomatis.",
    isHoax: false, // Bisa bikin ragu, tapi valid
  },
  {
    title: "Kursus gratis dari platform resmi pemerintah",
    url: "prakerja.go.id",
    description: "Pelatihan gratis dengan insentif bagi yang lolos seleksi.",
    isHoax: false,
  },
  {
    title: "Wawancara bisa dilakukan tanpa tatap muka langsung",
    url: "remotehr.id",
    description: "Recruiter kini banyak menggunakan Zoom atau Google Meet.",
    isHoax: false,
  },
  {
    title: "Kerja dari rumah untuk posisi support malam hari",
    url: "remotemalam.id",
    description: "Perusahaan luar negeri membuka lowongan support malam.",
    isHoax: false,
  },
];

export default function SoalDeteksiHoaks({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const timeLimit = 20;
  const [shuffled, setShuffled] = useState<HeadlineItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  

  useEffect(() => {
    setShuffled([...allHeadlines].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (showFinish) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);       

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showFinish]);

  const handleSelect = (item: HeadlineItem, index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;

const computedScore = item.isHoax
  ? 10 - Math.round(10 * timeUsedPercentage)
  : 5 - Math.round(5 * timeUsedPercentage);

setScore(computedScore);
setShowFinish(true);
    setShowFinish(true);
  
  };

  const handleFinish = () => {
    if (score !== null) {
      onFinish(score, timeLimit - timeLeft)
    }
    setShowFinish(false);
  };
  return (
    <SoalContainer
      timeLeft={timeLeft}
      question={`Klik salah satu hasil pencarian yang menurutmu adalah HOAKS!`}
    >
      {(showFinish) && score !== null && (
        <FinishPopup score={score} onClose={handleFinish}>
          <div className="text-3xl mb-2 w-full text-center space-y-2">
            <div>
              {selectedIndex
                ? "Yay! Jawabanmu benar!"
                : "Lebih teliti lagi yaaaa :D"}
            </div>
            <div className="text-sm">
              Silakan lanjut mengerjakan! Semangat!
            </div>
          </div>
        </FinishPopup>
      )}

      <div className="bg-white w-full rounded-lg max-w-4xl mx-auto p-4 space-y-5 overflow-y-auto">
        <div className="border border-gray-400 p-2 rounded-md flex items-center justify-between ">
          <input
            className="grow focus:outline-none border-r border-gray-400 mr-2"
            type="text"
            value="Cari Lowongan Kerja"
            readOnly
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>

        {shuffled.map((item, i) => (
          <div
            key={i}
            onClick={() => handleSelect(item, i)}
            className={`cursor-pointer border-b pb-3 pt-2 group ${
              selectedIndex === i
                ? item.isHoax
                  ? "bg-red-100"
                  : "bg-green-100"
                : ""
            }`}
          >
            <p className="text-sm text-green-700">{item.url}</p>
            <p className="text-lg font-semibold text-blue-700 group-hover:underline">
              {item.title}
            </p>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </SoalContainer>
  );
}


