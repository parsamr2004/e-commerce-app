import { useCallback } from "react";

const digitMap = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
} as const;

const useNumberToPersian = () => {
  const convertToPersian = useCallback((value: string | number | null | undefined): string => {
    if (value == null) return "";

    return [...String(value)]
      .map((char) => digitMap[char as keyof typeof digitMap] ?? char)
      .join("");
  }, []);

  return convertToPersian;
};

export default useNumberToPersian;
