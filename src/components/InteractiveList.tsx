"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { FilterBar } from "@/components/FilterBar";
import { ApartmentList as ApartmentListComponent } from "@/components/ApartmentList";
import { Pagination } from "@/components/Pagination";
import { NewsletterModal } from "@/components/NewsletterModal";
import { FilterState, Place } from "@/types";

const MapView = dynamic(() => import("@/components/MapView").then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => (
    <div className="hidden md:flex md:w-[70%] items-stretch">
      <div className="flex-1 bg-gray-100 animate-pulse m-4 rounded-xl" />
    </div>
  ),
});

function filtersFromParams(params: URLSearchParams): FilterState {
  return {
    county: params.get("county") || "",
    city: params.get("city") || "",
    zip: params.get("zip") || "",
    minRating: parseInt(params.get("min_rating") || "0") || 0,
    query: params.get("q") || "",
  };
}

function paramsFromFilters(filters: FilterState, page: number): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.county) params.set("county", filters.county);
  if (filters.city) params.set("city", filters.city);
  if (filters.zip) params.set("zip", filters.zip);
  if (filters.minRating && filters.minRating > 0) params.set("min_rating", String(filters.minRating));
  if (filters.query) params.set("q", filters.query);
  params.set("page", String(page));
  return params;
}

export function InteractiveList({ initialFilters }: { initialFilters?: FilterState }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [mapPlaces, setMapPlaces] = useState<Place[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filters = filtersFromParams(searchParams);

  useEffect(() => {
    if (typeof window === "undefined") return;
    fetch("/api/places/map")
      .then((res) => res.json())
      .then((data) => setMapPlaces(data.items || []))
      .catch(() => {});
  }, []);

  const fetchPlaces = useCallback(async (f: FilterState, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/places?${paramsFromFilters(f, page).toString()}`);
      if (!res.ok) throw new Error("Failed to load listings");
      const data = await res.json();
      setPlaces(data.items || []);
      setTotal(data.total || 0);
      setPages(Math.ceil((data.total || 0) / 20));
      setCurrentPage(data.page || page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaces(filters, parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);

  const handleFilterChange = useCallback(
    (f: FilterState) => {
      router.push(`/?${paramsFromFilters(f, 1).toString()}`, { scroll: false });
    },
    [router]
  );

  const handlePageChange = useCallback(
    (p: number) => {
      router.push(`/?${paramsFromFilters(filters, p).toString()}`, { scroll: false });
    },
    [filters, router]
  );

  const handlePlaceClick = useCallback((slug: string) => {
    setActiveSlug(slug);
    document.getElementById(`card-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleRetry = useCallback(() => {
    fetchPlaces(filters, currentPage);
  }, [filters, currentPage, fetchPlaces]);

  return (
    <div className="flex flex-col bg-gray-50/50 dark:bg-gray-950" style={{ height: "calc(100vh - 56px)", overflow: "hidden" }}>
      <header className="flex-shrink-0 px-6 py-5 border-b border-gray-100 bg-white dark:bg-gray-950 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Texas Rent Finder</h1>
            <span className="text-sm text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 px-2.5 py-0.5 rounded-full">{total.toLocaleString()} listings</span>
          </div>
        </div>
      </header>

      <div className="flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
        <FilterBar onFilterChange={handleFilterChange} initialFilters={initialFilters} />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[30%_70%]" style={{ minHeight: 0, overflow: "hidden" }}>
        <div className="overflow-y-auto bg-white dark:bg-gray-950" style={{ minHeight: 0 }}>
          {error ? (
            <div className="p-10 text-center">
              <p className="text-red-600 font-medium mb-2">Failed to load listings</p>
              <p className="text-sm text-gray-500 mb-4">{error}</p>
              <button onClick={handleRetry} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors">
                Try Again
              </button>
            </div>
          ) : (
            <ApartmentListComponent places={places} activeSlug={activeSlug} loading={loading} />
          )}
        </div>
        <div className="hidden md:block relative border-l border-gray-200 dark:border-gray-800" style={{ minHeight: 0, overflow: "hidden" }}>
          <MapView places={mapPlaces.length > 0 ? mapPlaces : places} onPlaceClick={handlePlaceClick} />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800">
        <Pagination page={currentPage} pages={pages} onPageChange={handlePageChange} />
      </div>

      <NewsletterModal onClose={() => { /* handled internally by modal */ }} />
    </div>
  );
}