"use client";

import { Place } from "@/types";
import { ApartmentCard } from "./ApartmentCard";

export function ApartmentList({ places, activeSlug, loading }: { places: Place[]; activeSlug: string | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-lg">No apartments found</p>
        <p className="text-sm mt-1">Try broadening your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {places.map((place) => (
        <div key={place.id} id={`card-${place.slug}`}>
          <ApartmentCard place={place} isActive={activeSlug === place.slug} />
        </div>
      ))}
    </div>
  );
}
