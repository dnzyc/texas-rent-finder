"use client";

import { formatPrice } from "@/lib/utils";

export function PriceDisplay({ price1br, price2br }: { price1br: number | null; price2br: number | null }) {
  if (!price1br && !price2br) return null;

  return (
    <div className="flex gap-3 text-sm">
      {price1br != null && (
        <span className="text-green-700 font-medium">1BR from {formatPrice(price1br)}</span>
      )}
      {price2br != null && (
        <span className="text-green-700 font-medium">2BR from {formatPrice(price2br)}</span>
      )}
    </div>
  );
}
