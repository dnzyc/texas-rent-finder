"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { FilterBar } from "@/components/FilterBar";
import { ApartmentList } from "@/components/ApartmentList";
import { Pagination } from "@/components/Pagination";
import { NewsletterModal } from "@/components/NewsletterModal";
import { Place, FilterState, PlacesResponse } from "@/types";
import { logPageView, logEvent } from "@/lib/analytics";

const MapView = dynamic(() => import("@/components/MapView").then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => <div className="hidden md:flex md:w-3/5 lg:w-2/3 items-center justify-center bg-muted/50 text-muted-foreground text-sm">Loading map...</div>,
});

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [places, setPlaces] = useState<Place[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const filters: FilterState = {
    county: searchParams.get("county") || "",
    city: searchParams.get("city") || "",
    zip: searchParams.get("zip") || "",
    minRating: parseFloat(searchParams.get("min_rating") || "0"),
    query: searchParams.get("q") || "",
  };

  const fetchPlaces = useCallback(async (p: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.county) params.set("county", filters.county);
    if (filters.city) params.set("city", filters.city);
    if (filters.zip) params.set("zip", filters.zip);
    if (filters.minRating > 0) params.set("min_rating", String(filters.minRating));
    if (filters.query) params.set("q", filters.query);
    params.set("page", String(p));

    const res = await fetch(`/api/places?${params}`);
    const data: PlacesResponse = await res.json();
    setPlaces(data.items);
    setTotal(data.total);
    setPages(data.pages);
    setPage(data.page);
    setLoading(false);
  }, [filters.county, filters.city, filters.zip, filters.minRating, filters.query]);

  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1");
    fetchPlaces(p);
  }, [fetchPlaces, searchParams]);

  useEffect(() => {
    if (hasMounted) {
      logPageView("/");
      if (filters.query) {
        logEvent("search_query", { query: filters.query });
      }
    }
  }, [hasMounted, searchParams]);

  const handleFilterChange = (f: FilterState) => {
    if (f.query && f.query !== filters.query) {
      logEvent("search_query", { query: f.query });
    }
    Object.entries(f).forEach(([key, value]) => {
      if (value !== filters[key as keyof FilterState] && key !== "query") {
        logEvent("filter_change", { filter: key, value: String(value) });
      }
    });
    const p = new URLSearchParams();
    if (f.county) p.set("county", f.county);
    if (f.city) p.set("city", f.city);
    if (f.zip) p.set("zip", f.zip);
    if (f.minRating > 0) p.set("min_rating", String(f.minRating));
    if (f.query) p.set("q", f.query);
    router.push(`/?${p.toString()}`);
  };

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/?${params.toString()}`);
  };

  const handlePlaceClick = (slug: string) => {
    setActiveSlug(slug);
    const el = document.getElementById(`card-${slug}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="h-screen flex flex-col editorial-noise">
      <header className="flex-shrink-0 px-5 py-4 border-b border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-semibold tracking-tight text-foreground">Texas Apartments</h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-light">Discover your next home</p>
          </div>
          <span className="text-sm text-muted-foreground font-light">{total.toLocaleString()} listings</span>
        </div>
      </header>

      <div className="flex-shrink-0">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-2/5 lg:w-[420px] overflow-y-auto border-r border-border/40 bg-card/40">
          <ApartmentList places={places} activeSlug={activeSlug} loading={loading} />
        </div>
        <div className="hidden md:block md:w-3/5 lg:flex-1">
          <MapView places={places} onPlaceClick={handlePlaceClick} />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-border/40 bg-card/60 backdrop-blur-sm">
        <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
      </div>

      <NewsletterModal onClose={() => {}} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-muted-foreground text-sm">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
