"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Place } from "@/types";

interface CompareRow {
  label: string;
  key: string;
  format?: (val: unknown) => string;
}

const rows: CompareRow[] = [
  { label: "City", key: "city" },
  { label: "Address", key: "address" },
  { label: "ZIP Code", key: "zip_code" },
  { label: "County", key: "county" },
  { label: "Category", key: "category" },
  { label: "Rating", key: "rating", format: (v) => (v ? `${(v as number).toFixed(1)} / 5` : "N/A") },
  { label: "Reviews", key: "review_count", format: (v) => (v ? `${(v as number).toLocaleString()}` : "0") },
  { label: "1BR Price", key: "price_1br", format: (v) => (v ? `$${(v as number).toLocaleString()}/mo` : "N/A") },
  { label: "2BR Price", key: "price_2br", format: (v) => (v ? `$${(v as number).toLocaleString()}/mo` : "N/A") },
  { label: "Phone", key: "phone" },
  { label: "Website", key: "website" },
  { label: "Hours", key: "hours" },
];

function CompareContent() {
  const searchParams = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slugs = searchParams.get("slugs");
    if (!slugs) { setLoading(false); return; }

    const fetchPlaces = async () => {
      try {
        const results = await Promise.all(
          slugs.split(",").map(async (slug) => {
            const res = await fetch(`/api/places/${slug}`);
            if (!res.ok) return null;
            const data = await res.json();
            return data || null;
          })
        );
        setPlaces(results.filter(Boolean));
      } catch (err) {
        console.error("Failed to fetch places:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No apartments to compare</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Select 2-3 apartments from the listing to compare them side by side.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Browse Apartments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
            &larr; Back to listings
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Compare Apartments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{places.length} apartments selected</p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="block lg:hidden space-y-6">
          {places.map((place) => (
            <div key={place.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {place.photo_url && (
                <div className="relative h-40">
                  <Image src={place.photo_url} alt={place.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">{place.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{place.city}, TX</p>
                {place.price_1br && (
                  <p className="text-lg font-bold text-emerald-600 mt-2">${place.price_1br.toLocaleString()}/mo</p>
                )}
                <div className="mt-3 space-y-1.5">
                  {rows.slice(5).map((row) => {
                    const val = (place as unknown as Record<string, unknown>)[row.key];
                    if (!val) return null;
                    return (
                      <div key={row.key} className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{row.label}</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {row.format ? row.format(val) : String(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header with images */}
          <div className="grid" style={{ gridTemplateColumns: `180px repeat(${places.length}, 1fr)` }}>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" />
            {places.map((place) => (
              <div key={place.id} className="p-4 border-b border-gray-200 dark:border-gray-700 border-l">
                {place.photo_url && (
                  <div className="relative h-28 rounded-lg overflow-hidden mb-3">
                    <Image src={place.photo_url} alt={place.name} fill className="object-cover" sizes="300px" />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{place.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{place.city}, TX</p>
                {place.price_1br && (
                  <p className="text-base font-bold text-emerald-600 mt-1">${place.price_1br.toLocaleString()}/mo</p>
                )}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row) => (
            <div
              key={row.key}
              className="grid border-b border-gray-100 dark:border-gray-800 last:border-b-0"
              style={{ gridTemplateColumns: `180px repeat(${places.length}, 1fr)` }}
            >
              <div className="p-3 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300">
                {row.label}
              </div>
              {places.map((place) => {
                const val = (place as unknown as Record<string, unknown>)[row.key];
                return (
                  <div key={place.id} className="p-3 border-l border-gray-100 dark:border-gray-800 text-sm text-gray-900 dark:text-white">
                    {row.format ? row.format(val) : val ? String(val) : <span className="text-gray-400 dark:text-gray-600">—</span>}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Action row */}
          <div
            className="grid bg-gray-50 dark:bg-gray-800"
            style={{ gridTemplateColumns: `180px repeat(${places.length}, 1fr)` }}
          >
            <div className="p-4" />
            {places.map((place) => (
              <div key={place.id} className="p-4 border-l border-gray-100 dark:border-gray-800 flex gap-2">
                <Link
                  href={`/place/${place.slug}`}
                  className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  View Details
                </Link>
                {place.website && (
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium py-2 rounded-lg transition-colors"
                  >
                    Website
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
