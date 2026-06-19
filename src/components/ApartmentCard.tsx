"use client";

import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types";
import { cn } from "@/lib/utils";
import { FavoritesButton } from "./FavoritesButton";

export function ApartmentCard({ place, isActive = false }: { place: Place; isActive?: boolean }) {
  return (
    <Link
      href={`/place/${place.slug}`}
      className={cn(
        "block group focus:outline-none rounded-xl",
        "transition-all duration-300",
        "hover:bg-gray-50 dark:hover:bg-gray-900",
        isActive && "bg-amber-50/60 dark:bg-amber-950/30 ring-1 ring-amber-300/50 dark:ring-amber-700/50"
      )}
    >
      <div className="flex gap-4 p-4">
        <div className="relative w-20 h-20 sm:w-28 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          {place.photo_url ? (
            <Image
              src={place.photo_url}
              alt={place.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 80px, 112px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {place.name}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <FavoritesButton placeId={place.id} />
              {place.rating && (
                <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded-md">
                  {place.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>

          {place.address && (
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-1">{place.address}</p>
          )}

          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mt-1">
            {place.city && <span>{place.city}</span>}
            {place.zip_code && <span>· {place.zip_code}</span>}
            {place.county && <span>· {place.county}</span>}
          </div>

          <div className="flex items-center gap-4 mt-2">
            {place.price_1br && (
              <p className="text-sm font-semibold text-emerald-600">
                ${place.price_1br.toLocaleString()}<span className="text-xs font-normal text-gray-400 dark:text-gray-500">/mo</span>
              </p>
            )}
            {place.category && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{place.category}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
