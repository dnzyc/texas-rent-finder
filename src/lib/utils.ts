import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number | null): string {
  if (cents === null || cents === undefined) return "\u2014";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatRating(rating: number | null): string {
  if (rating === null || rating === undefined) return "\u2014";
  return rating.toFixed(1);
}

export function slugToName(slug: string): string {
  return slug
    .split("-")
    .filter((s) => isNaN(parseInt(s)))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}
