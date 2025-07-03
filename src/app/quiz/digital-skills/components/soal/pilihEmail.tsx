import React, { useEffect, useState, useRef } from "react";
import SoalContainer from "./soalContainer";
import FinishPopup from "@/app/quiz/digital-skills/components/finishPopUp";

type EmailItem = {
  sender: string;
  subject: string;
  body: string;
  isLegit: boolean;
};

const emails: EmailItem[] = [
  {
    sender: "PT Sinar Terang",
    subject: "Undangan Interview - PT Sinar Terang",
    body: `Halo, Kami dari PT Sinar Terang ingin mengundang Anda untuk wawancara kerja sesuai dengan lamaran Anda di posisi Digital Marketing.

Wawancara akan dilaksanakan secara online melalui Google Meet pada tanggal 20 Juni pukul 10.00 WIB. 

Salam,
HRD PT Sinar Terang`,
    isLegit: true,
  },
  {
    sender: "PT Maju Jaya",
    subject: "Selamat! Anda diterima kerja! Transfer dulu ya!",
    body: `Selamat!

Anda terpilih untuk bergabung bersama kami di PT Maju Jaya. Harap transfer Rp250.000 ke rekening berikut untuk proses administrasi dan seragam kerja.

Tanpa transfer, Anda dianggap mengundurkan diri.

HRD Maju Jaya`,
    isLegit: false,
  },
  {
    sender: "PT Kerja Rahasia",
    subject: "Interview Rahasia! Klik link ini sekarang!",
    body: `Anda terpilih untuk posisi impian Anda.

Klik tautan berikut ini untuk melihat detail wawancara: http://bitttttt.ly/kerjarahasia

Jangan sebarkan email ini ke siapa pun.

Admin`,
    isLegit: false,
  },
];

export default function SoalPilihEmail({
  onFinish,
}: {
  onFinish: (score: number, duration: number) => void;
}) {
  const timeLimit = 40;

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showFinish, setShowFinish] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const shuffled = [...emails].sort(() => Math.random() - 0.5);
    setShuffledEmails(shuffled);
  }, []);

  const [shuffledEmails, setShuffledEmails] = useState<EmailItem[]>([]);

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

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    const timeUsedPercentage = (timeLimit - timeLeft) / timeLimit;
let computedScore = shuffledEmails[index].isLegit
  ? 10 - Math.round(10 * timeUsedPercentage)
  : 5 - Math.round(5 * timeUsedPercentage);
setScore(computedScore);
setShowFinish(true);

  };
  const handleFinish = () => {
    if (score !== null) {
      onFinish(score, timeLimit - timeLeft);
    }
    setShowFinish(false);
  };

  return (
    <SoalContainer
      timeLeft={timeLeft}
      question={`Dari 3 email berikut, mana yang merupakan undangan interview yang ASLI, bukan penipuan?`}
    >
      {showFinish && score !== null && (
        <FinishPopup score={score} onClose={handleFinish}>
          <div className="text-3xl mb-2 w-full text-center space-y-2">
            <div>
              {shuffledEmails[selectedIndex!].isLegit
                ? "Yay! Jawabanmu benar!"
                : "Lebih teliti lagi yaaaa :D"}
            </div>
            <div className="text-sm">Silakan lanjut mengerjakan! Semangat!</div>
          </div>
        </FinishPopup>
      )}
      <div className="size-full p-5">
        <div className="w-full flex items-center gap-5 pb-5">
          <div className="shrink flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
              <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" />
            </svg>
            <div>Email</div>
          </div>
          <div className="grow gap-2">
            <input
              className="w-full border px-5 py-2 border-gray-300 rounded-full focus:outline-none"
              type="text"
              readOnly
              placeholder="Cari Email..."
            />
          </div>
          <div className="shrink flex gap-2"></div>
        </div>
        <div className="w-full flex ">
          <div className="shrink hover:bg-gray-200 p-2 w-[10rem] flex gap-2 text-blue-500 border-b-3 border-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-library"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.333 2a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-4.333 10h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0 -2m3 -3h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m-1 -3h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2" />
              <path d="M3.517 6.391a1 1 0 0 1 .99 1.738c-.313 .178 -.506 .51 -.507 .868v10c0 .548 .452 1 1 1h10c.284 0 .405 -.088 .626 -.486a1 1 0 0 1 1.748 .972c-.546 .98 -1.28 1.514 -2.374 1.514h-10c-1.652 0 -3 -1.348 -3 -3v-10.002a3 3 0 0 1 1.517 -2.605" />
            </svg>
            <span>Primary</span>
          </div>
        </div>
        <div className="w-full ">
          {shuffledEmails.map((email, index) => (
            <div
              key={index}
              className="border-b first:border-t border-gray-300 overflow-hidden hover:shadow-md hover:shadow-gray-400 transition-all ease-in duration-100"
            >
              <button
                onClick={() =>
                  setOpenedIndex(openedIndex === index ? null : index)
                }
                className="w-full text-left  px-4 py-3 text-xs cursor-pointer flex items-center justify-between"
              >
                <div className=" text-nowrap font-bold">{email.sender}</div>
                <div className="flex w-[85%]">
                  <div className="text-nowrap">
                    {email.subject} {" -   "}{" "}
                  </div>
                  <div className=" text-gray-500 line-clamp-1">
                    {email.body.replace(/\n/, " ")}
                  </div>
                </div>
              </button>
              {openedIndex === index && (
                <div className="px-4 py-3 bg-white space-y-3">
                  <pre className="whitespace-pre-wrap text-xs text-gray-700">
                    {email.body}
                  </pre>
                  <div className="flex w-full justify-end">
                    <button
                      onClick={() => handleSelect(index)}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                      disabled={selectedIndex !== null}
                    >
                      Pilih Email Ini
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SoalContainer>
  );
}
