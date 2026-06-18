"use client";

import { Place } from "@/types";
import { ApartmentCard } from "./ApartmentCard";

export function ApartmentList({ places, activeSlug, loading }: { places: Place[]; activeSlug: string | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="divide-y divide-gray-100">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 sm:w-28 sm:h-24 rounded-xl bg-gray-100 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <p className="text-gray-900 font-medium mb-1">No apartments found</p>
        <p className="text-sm text-gray-500">Try broadening your search filters or changing the location</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {places.map((place) => (
        <div key={place.id} id={`card-${place.slug}`}>
          <ApartmentCard place={place} isActive={activeSlug === place.slug} />
        </div>
      ))}
    </div>
  );
}
