"use client";

import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { escapeHtml } from "@/lib/escapeHtml";
import { FavoritesButton } from "./FavoritesButton";

export function ApartmentCard({ place, isActive = false }: { place: Place; isActive?: boolean }) {
  return (
    <Link
      href={`/place/${place.slug}`}
      className="block group focus:outline-none"
    >
      <Card
        className={cn(
          "transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1",
          "ring-1 ring-black/[0.04] hover:ring-amber-200/60",
          "shadow-[0_1px_3px_rgba(0,0,0,0.03),0_8px_24px_-6px_rgba(0,0,0,0.04)]",
          "hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_32px_-8px_rgba(0,0,0,0.08)]",
          isActive && "ring-2 ring-amber-400/40 shadow-[0_0_0_4px_rgba(251,191,36,0.1)]"
        )}
      >
        {place.photo_url && (
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={place.photo_url}
              alt={place.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base font-semibold leading-snug tracking-tight line-clamp-2 text-stone-800 group-hover:text-stone-900">
              {escapeHtml(place.name)}
            </CardTitle>
            <div className="flex items-center gap-2">
              <FavoritesButton placeId={place.id} />
              {place.rating && (
                <Badge variant="secondary" className="shrink-0 text-xs font-medium bg-amber-50 text-amber-700 border-amber-200/50">
                  ★ {place.rating.toFixed(1)}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {place.address && (
            <p className="text-sm text-stone-500 truncate font-light">{escapeHtml(place.address)}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            {place.city && <span>{escapeHtml(place.city)}</span>}
            {place.zip_code && <span>· {escapeHtml(place.zip_code)}</span>}
            {place.county && <span>· {escapeHtml(place.county)}</span>}
          </div>
          {place.price_1br && (
            <p className="text-sm font-medium text-emerald-700 mt-2">
              1BR from ${place.price_1br.toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
