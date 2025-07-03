"use client";

import React, { useEffect, useState, useRef } from "react";
import SoalContainer from "./soalContainer";
import Image from "next/image";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";

export default function AmankanDokumenCloud({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const timeLimit = 30;

  const [viewOnly, setViewOnly] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let [score, setScore] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showFinish, setShowFinish] = useState(false);

  const [open, setOpen] = useState(false);

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

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;
    let computedScore = viewOnly
      ? 10 - Math.round(10 * timeUsedPercentage)
      : 5 - Math.round(5 * timeUsedPercentage);
    setScore(computedScore);
    setShowFinish(true);

    // setTimeout(() => {
    //   onFinish(score);
    // }, 800);
  };
  const handleFinish = () => {
    if (score !== null) {
      onFinish(score, timeLimit - timeLeft); // Kirim skor ke induk
    }
    setShowFinish(false);
  };
  const handleModal = () => {
    setShowModal(true);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <SoalContainer
      timeLeft={timeLeft}
      question={`Kamu ingin mengirim file lamaran via link cloud (Google Drive / OneDrive). Untuk menghindari disalahgunakan, aktifkan opsi "View Only"!`}
    >
      {showFinish && score !== null && (
        <FinishPopup score={score} onClose={handleFinish}>
            <div className="sm:text-2xl md:text-3xl mb-2 w-full text-center space-y-2">
            <div>
              {viewOnly ? "Yay! Dokuemnmu dibagikan tanpa akses edit! Kerja bagus!" : "HRD jadi bisa edit dong :( Teliti lagi yaa!"}
              </div>
              <div className="text-xs sm:text-sm">
              Silakan lanjut mengerjakan! Semangat!</div>
            {/* <div className="text-sm">Lama Pengerjaan</div>
            <div className="text-sm">{timeLimit - timeLeft} detik</div> */}
          </div>
        </FinishPopup>
      )}
      <div className="flex justify-between items-center w-full p-3 border-b border-gray-300 shadow">
        <div className="flex gap-2">
          <Image
            className="w-5 sm:w-10"
            src="/amankanCloud/icon.svg"
            alt="doc"
            height={100}
            width={100}
          />
          <div className="flex flex-col ">
            <div className="font-bold p-1">Dokumen CV</div>
            <div className="hidden sm:flex gap-2">
              <div className="hover:bg-gray-200 p-1 cursor-pointer">File</div>
              <div className="hover:bg-gray-200 p-1 cursor-pointer">Edit</div>
              <div className="hover:bg-gray-200 p-1 cursor-pointer">View</div>
              <div className="hover:bg-gray-200 p-1 cursor-pointer">Insert</div>
              <div className="hover:bg-gray-200 p-1 cursor-pointer">Format</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <button
            disabled={submitted}
            className="self-start flex justify-between bg-blue-600 text-white px-5 cursor-pointer py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={handleModal}
          >
            Bagikan
          </button>

          {showModal && (
            <div className="fixed inset-0  flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="bg-white max-w-xl w-xs sm:w-full  p-4 rounded shadow-lg z-10">
                <h2 className="text-lg font-semibold mb-2">Bagikan Dokumen</h2>
                <p className="mb-4">Bagikan kepada orang lain?</p>
                <div className="border flex flex-col sm:flex-row justify-between p-2 items-center rounded-md border-gray-300">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="icon icon-tabler icons-tabler-filled icon-tabler-user"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                    </svg>
                    <div>hrdprofessional@gmail.com</div>
                  </div>
                  <div className="relative">
                    <div
                      className="  hover:bg-gray-200 px-3 p-1 cursor-pointer flex gap-2"
                      onClick={handleOpen}
                    >
                      Atur Akses
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9l6 6l6 -6" />
                      </svg>
                    </div>
                    {open && (
                      <div className="absolute top-10 right-0 flex flex-col gap-3 bg-white border border-gray-300 rounded-md text-sm">
                        {/* Option 1 - View Only */}
                        <div className="flex items-center gap-3 hover:bg-gray-200 p-3">
                          <input
                            id="viewOnly"
                            type="radio"
                            name="access"
                            checked={viewOnly}
                            onChange={() => setViewOnly(true)}
                            className="w-5 h-5"
                            onClick={() => setOpen(false)}
                          />
                          <label htmlFor="viewOnly">Lihat saja</label>
                        </div>

                        {/* Option 2 - Editor */}
                        <div className="flex items-center gap-3 hover:bg-gray-200 p-3">
                          <input
                            id="editor"
                            type="radio"
                            name="access"
                            checked={!viewOnly}
                            onChange={() => setViewOnly(false)}
                            className="w-5 h-5"
                            onClick={() => setOpen(false)}
                          />
                          <label htmlFor="editor">Editor</label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-2 gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={submitted}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitted}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Bagikan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="size-full bg-slate-200 mx-auto flex justify-center overflow-y-auto">
        <div className="text-center w-full max-w-3xl h-fit bg-white my-5 p-10 px-10 sm:px-20">
          <b>Lorem Ipsum</b> <br />
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            delectus maxime tempora a eum aut soluta! Magni et, sed aliquam est
            quasi veritatis doloribus sapiente reprehenderit, minus sint vitae
            pariatur laboriosam dolorum facilis eaque quidem fugit hic
            recusandae culpa eligendi ad. At veniam perferendis, ab dignissimos
            exercitationem aliquid provident beatae eveniet ratione quod aut,
            vitae explicabo nostrum laborum. Atque eos tempora voluptate,
            impedit vitae placeat maiores. Doloribus, vero! Aut asperiores ab
            neque tempora voluptatibus minima exercitationem officia amet rem
            omnis ut, animi autem excepturi doloribus. Repellendus saepe quo,
            facere atque vitae laudantium asperiores quasi ratione, nam,
            quibusdam aperiam delectus dolor tempore maiores obcaecati officiis
            beatae. Provident, eius tempora cupiditate veniam hic explicabo amet
            corrupti. Officia repudiandae libero saepe quaerat aperiam sint
            veniam atque repellat autem cum reiciendis blanditiis soluta fuga
            illo quisquam, quibusdam commodi distinctio quis! Error, corporis
            architecto quasi sunt modi ipsum. Iure reiciendis suscipit facere
            nisi perspiciatis saepe consequuntur, quae aliquam voluptas
            cupiditate atque id, ipsam fugiat quaerat magnam quisquam quibusdam
            earum, a dolorum eaque. Modi voluptas veritatis ratione fuga eveniet
            perspiciatis commodi labore maiores doloribus error molestiae odio
            quidem sint cum, est ex, vitae enim repellendus provident
            perferendis nemo reiciendis similique! Quod repudiandae temporibus
            iusto in voluptate!
          </p>
        </div>
      </div>
    </SoalContainer>
  );
}
