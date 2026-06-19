"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/contexts/CompareContext";

export function CompareBar() {
  const { items, remove, clear } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex-1 flex items-center gap-3 overflow-x-auto">
          {items.map((place) => (
            <div
              key={place.slug}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 min-w-0"
            >
              {place.photo_url && (
                <div className="relative w-8 h-8 flex-shrink-0 rounded overflow-hidden">
                  <Image src={place.photo_url} alt="" fill className="object-cover" sizes="32px" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                  {place.name}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{place.city}</p>
              </div>
              <button
                onClick={() => remove(place.slug)}
                className="ml-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clear}
            className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            Clear
          </button>
          <Link
            href={`/compare?slugs=${items.map((p) => p.slug).join(",")}`}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Compare ({items.length})
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
