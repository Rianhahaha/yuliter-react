"use client";
import React, { useEffect, useState, useRef } from "react";
import SoalContainer from "./soalContainer";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";

const studyCases = [
  {
    caseText:
      "Setelah lulus kuliah, kamu memutuskan untuk mencari pekerjaan di kampung halamanmu, Yogyakarta. Kamu merasa cocok bekerja sebagai HRD karena selama kuliah kamu aktif di organisasi dan pernah magang di bagian personalia. Untuk kebutuhan hidup awal, kamu menargetkan gaji antara 2 hingga 5 juta rupiah per bulan. Coba cari lowongan yang sesuai dengan kriteria ini.",
    filter: { position: "HRD", location: "Yogyakarta", salary: "2 - 5 juta" },
  },
  {
    caseText:
      "Kamu ingin membangun karier sebagai seorang Data Analyst di kota besar. Setelah melakukan riset, kamu memilih Jakarta sebagai tempat yang potensial untuk berkembang di bidang data. Dengan keahlianmu di Excel, SQL, dan Python, kamu merasa layak mengincar pekerjaan dengan kisaran gaji antara 15 hingga 20 juta. Temukan lowongan yang cocok dengan profilmu.",
    filter: {
      position: "Data Analyst",
      location: "Jakarta",
      salary: "15 - 20 juta",
    },
  },
  {
    caseText:
      "Kamu sedang ingin mencoba pekerjaan yang berinteraksi langsung dengan pelanggan. Posisi Customer Service menjadi pilihan menarik karena kamu punya kemampuan komunikasi yang baik. Kamu ingin bekerja di Bandung, kota yang kamu anggap nyaman dan dekat dengan keluarga. Target gajimu adalah antara 5 sampai 8 juta rupiah. Temukan lowongan yang sesuai dengan preferensimu.",
    filter: {
      position: "Customer Service",
      location: "Bandung",
      salary: "5 - 8 juta",
    },
  },
];

const jobList = [
  {
    position: "HRD",
    location: "Yogyakarta",
    salary: "2 - 5 juta",
    company: "PT Aman Sejahtera",
    description: "Mencari HRD berpengalaman min. 1 tahun.",
  },
  {
    position: "Data Analyst",
    location: "Jakarta",
    salary: "15 - 20 juta",
    company: "DataInsight",
    description: "Mengolah dan menganalisis data besar.",
  },
  {
    position: "Customer Service",
    location: "Bandung",
    salary: "5 - 8 juta",
    company: "HelpMe ID",
    description: "Melayani pelanggan secara langsung dan online.",
  },
  // Distractors (you can add more as needed)
  {
    position: "HRD",
    location: "Yogyakarta",
    salary: "5 juta per tahun",
    company: "PT Bohongan",
    description: "Gaji menipu! Hati-hati.",
  },
  {
    position: "HRD",
    location: "Jakarta",
    salary: "2 - 5 juta",
    company: "Jakarta HR",
    description: "Lokasi tidak sesuai.",
  },
  {
    position: "Software Engineer",
    location: "Jakarta",
    salary: "15 - 20 juta",
    company: "CodeLabs",
    description: "Lowongan dev, bukan data analyst.",
  },
  {
    position: "Customer Service",
    location: "Bandung",
    salary: "2 - 5 juta",
    company: "BantuanMu",
    description: "Gaji tidak sesuai.",
  },
  {
    position: "Data Analyst",
    location: "Bandung",
    salary: "15 - 20 juta",
    company: "DataLab",
    description: "Lokasi tidak sesuai.",
  },
  {
    position: "Marketing",
    location: "Yogyakarta",
    salary: "5 - 8 juta",
    company: "PromosiYuk",
    description: "Bukan posisi yang dicari.",
  },
];

const allPositions = [
  "HRD",
  "Software Engineer",
  "Marketing",
  "Desainer",
  "Data Analyst",
  "Customer Service",
];

const allLocations = [
  "Yogyakarta",
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Semarang",
];

const allSalaries = [
  "2 - 5 juta",
  "5 - 8 juta",
  "8 - 12 juta",
  "12 - 15 juta",
  "15 - 20 juta",
  "20+ juta",
];

export default function SoalFilterLowongan({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const [selectedCase, setSelectedCase] = useState(studyCases[0]);
  const [filters, setFilters] = useState({
    position: "",
    location: "",
    salary: "",
  });
  const timeLimit = 40;
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [filteredJobs, setFilteredJobs] = useState(jobList);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

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

  useEffect(() => {
    const randomCase =
      studyCases[Math.floor(Math.random() * studyCases.length)];
    setSelectedCase(randomCase);
  }, []);

  useEffect(() => {
    const result = jobList.filter(
      (job) =>
        (!filters.position || job.position === filters.position) &&
        (!filters.location || job.location === filters.location) &&
        (!filters.salary || job.salary === filters.salary)
    );
    setFilteredJobs(result);
  }, [filters]);

  const handleSelectJob = (job: (typeof jobList)[0]) => {
    setSubmitted(true);
    const isCorrect =
      job.position === selectedCase.filter.position &&
      job.location === selectedCase.filter.location &&
      job.salary === selectedCase.filter.salary;

    const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;
    let computedScore = isCorrect
      ? 10 - Math.round(10 * timeUsedPercentage)
      : 5 - Math.round(5 * timeUsedPercentage);
    setScore(computedScore);
    setIsCorrectAnswer(isCorrect);
    setShowFinish(true);
  };
  const handleFinish = () => {
    if (score !== null) {
      onFinish(score, timeLimit - timeLeft);
    }
    setShowFinish(false);
  };

  return (
    <SoalContainer timeLeft={timeLeft} question={selectedCase.caseText}>
      {showFinish && score !== null && (
        <FinishPopup score={score} onClose={handleFinish}>
          <div className="text-3xl mb-2 w-full text-center space-y-2">
            <div>
              {isCorrectAnswer 
                ? "Yay! Jawabanmu benar!"
                : "Lebih teliti lagi yaaaa :D"}
            </div>
            <div className="text-sm">Silakan lanjut mengerjakan! Semangat!</div>
          </div>
        </FinishPopup>
      )}
      <div className="w-full h-full flex flex-col items-start justify-start p-4">
        <p className="mb-4 text-lg">Lowongan Kerja</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full">
          <select
            className="border rounded p-2"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, position: e.target.value }))
            }
          >
            <option value="">Posisi</option>
            {allPositions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            className="border rounded p-2"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
          >
            <option value="">Lokasi</option>
            {allLocations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            className="border rounded p-2"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, salary: e.target.value }))
            }
          >
            <option value="">Gaji</option>
            {allSalaries.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4 w-full  overflow-y-auto">
          {filteredJobs.length === 0 ? (
            <p className="text-gray-500">Tidak ada lowongan yang cocok.</p>
          ) : (
            filteredJobs.map((job, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectJob(job)}
                disabled={submitted}
                className="w-full text-left border rounded p-4 hover:bg-gray-100 transition cursor-pointer"
              >
                <p className="font-semibold">
                  {job.position} – {job.company}
                </p>
                <p className="text-sm text-gray-600">
                  {job.location} – {job.salary}
                </p>
                <p className="text-sm mt-1">{job.description}</p>
              </button>
            ))
          )}
        </div>

        {submitted && (
          <p className="mt-6 font-bold text-green-600">Menilai jawaban...</p>
        )}
      </div>
    </SoalContainer>
  );
}
