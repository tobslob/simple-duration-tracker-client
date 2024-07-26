import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    currencyDisplay: "code",
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

export function parseISOString(s: string) {
  const b = s?.split(/\D+/);
  if (b) {
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
}
