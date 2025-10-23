import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosInstance = axios.create({
  baseURL: "https://qbc9.liara.run/api",
  withCredentials: true,
});

export function persianDateFormat(input?: string | null): string {
  if (!input) return "";

  const currentDate = new Date(input);

  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(currentDate);
}
