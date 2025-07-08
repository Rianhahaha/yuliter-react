// utils/logrocket.ts
import LogRocket from "logrocket";
import type { User } from "@/context/UserContext";

export function initLogRocket(user: User) {

  LogRocket.init("bteywj/yuliter"); // Ganti dengan ID kamu
  LogRocket.identify(user.id, {
    email: user.email,
  });
}
