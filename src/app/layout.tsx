import type { Metadata } from "next";
import { Luckiest_Guy, Bungee, Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { QuizHistoryProvider } from "@/context/QuizHistoryContext";
import { LeaderboardProvider } from "@/context/LeaderboardContext";
const main = Luckiest_Guy({
  variable: "--main",
  subsets: ["latin"],
  weight: ["400"],
});

const secondary = Bungee({
  variable: "--secondary",
  subsets: ["latin"],
  weight: ["400"],
});
const text = Montserrat({
  variable: "--text",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Yu-Liter",
  description: "Tingkatkan Literasi Digitalmu, Kuasai Dunia Maya!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${main.variable} ${secondary.variable} ${text.variable} antialiased h-dvh`}
      >
        <UserProvider>
          <QuizHistoryProvider>
            <LeaderboardProvider>
            {children}
            </LeaderboardProvider>
            </QuizHistoryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
