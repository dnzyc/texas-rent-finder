"use client";

import { useState, useEffect, useCallback } from "react";
import { FilterOptions, FilterState } from "@/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FilterBar({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [options, setOptions] = useState<FilterOptions>({ counties: [], cities: {}, zips: {} });
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/filters").then((r) => r.json()).then((data) => {
      setOptions(data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => { setCity(""); setZip(""); }, [county]);
  useEffect(() => { setZip(""); }, [city]);

  const emit = useCallback(
    (overrides: Partial<FilterState> = {}) => {
      onFilterChange({ county, city, zip, minRating, query, ...overrides });
    },
    [county, city, zip, minRating, query, onFilterChange]
  );

  const state: FilterState = { county, city, zip, minRating, query };

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="flex flex-wrap items-center gap-2 p-3">
        {!loaded && <span className="text-xs text-muted-foreground">Loading...</span>}

        <select
          value={county}
          onChange={(e) => { setCounty(e.target.value); emit({ ...state, county: e.target.value, city: "", zip: "" }); }}
          className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground font-light focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="">All Counties</option>
          {options.counties.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={city}
          onChange={(e) => { setCity(e.target.value); emit({ ...state, city: e.target.value, zip: "" }); }}
          disabled={!county}
          className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground font-light focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-40"
        >
          <option value="">All Cities</option>
          {(options.cities[county] || []).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={zip}
          onChange={(e) => { setZip(e.target.value); emit({ ...state, zip: e.target.value }); }}
          disabled={!city}
          className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground font-light focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-40"
        >
          <option value="">All ZIPs</option>
          {(options.zips[city] || []).map((z) => <option key={z} value={z}>{z}</option>)}
        </select>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">≥</span>
          <select
            value={minRating}
            onChange={(e) => { const v = parseFloat(e.target.value); setMinRating(v); emit({ ...state, minRating: v }); }}
            className="rounded-lg border border-input bg-card px-2 py-1.5 text-sm text-foreground font-light focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="0">Any</option>
            <option value="3">★ 3.0</option>
            <option value="3.5">★ 3.5</option>
            <option value="4">★ 4.0</option>
            <option value="4.5">★ 4.5</option>
          </select>
        </div>

        <div className="flex-1 min-w-[140px] max-w-xs">
          <Input
            type="text"
            placeholder="Search apartments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") emit(); }}
            className="h-9 text-sm font-light bg-card"
          />
        </div>
      </div>
    </div>
  );
}
