"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FilterBar } from "@/components/FilterBar";
import { ApartmentList as ApartmentListComponent } from "@/components/ApartmentList";
import { Pagination } from "@/components/Pagination";
import { NewsletterModal } from "@/components/NewsletterModal";
import { FilterState, Place } from "@/types";

const MapView = dynamic(() => import("@/components/MapView").then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => <div className="hidden md:flex md:w-3/5 lg:w-2/3 items-center justify-center bg-muted/50 text-muted-foreground text-sm">Loading map...</div>,
});

export function InteractiveList({ initialFilters }: { initialFilters?: FilterState }) {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const fetchData = useCallback((page: number = 1) => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();
    if (initialFilters?.county) params.set("county", initialFilters.county);
    if (initialFilters?.city) params.set("city", initialFilters.city);
    if (initialFilters?.zip) params.set("zip", initialFilters.zip);
    if (initialFilters?.minRating && initialFilters.minRating > 0) params.set("min_rating", String(initialFilters.minRating));
    if (initialFilters?.query) params.set("q", initialFilters.query);
    
    params.set("page", String(page));

    fetch(`/api/places?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setPlaces(data.items || []);
        setTotal(data.total || 0);
        setPages(Math.ceil((data.total || 0) / parseInt(params.get("limit") || "20")));
        setCurrentPage(data.page || page);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [initialFilters]);

  useEffect(() => {
    const shouldFetch = places.length === 0;
    if (shouldFetch) fetchData();
  }, [initialFilters]);

  const handleFilterChange = (f: FilterState) => {
    const params = new URLSearchParams();
    if (f.county) params.set("county", f.county);
    if (f.city) params.set("city", f.city);
    if (f.zip) params.set("zip", f.zip);
    if (f.minRating > 0) params.set("min_rating", String(f.minRating));
    if (f.query) params.set("q", f.query);
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    fetchData(p);
  };

  const handlePlaceClick = (slug: string) => {
    setActiveSlug(slug);
    if (typeof window !== "undefined") {
      const el = document.getElementById(`card-${slug}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
        <FilterBar onFilterChange={handleFilterChange} initialFilters={initialFilters} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-2/5 lg:w-[420px] overflow-y-auto border-r border-border/40 bg-card/40">
          <ApartmentListComponent places={places} activeSlug={activeSlug} loading={loading} />
        </div>
        <div className="hidden md:block md:w-3/5 lg:flex-1">
          <MapView places={places} onPlaceClick={handlePlaceClick} />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-border/40 bg-card/60 backdrop-blur-sm">
        <Pagination page={currentPage} pages={pages} onPageChange={handlePageChange} />
      </div>

      <NewsletterModal onClose={() => {}} />
    </div>
  );
}
