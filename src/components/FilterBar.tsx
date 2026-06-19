"use client";

import { useState, useEffect, useCallback } from "react";
import { FilterOptions, FilterState } from "@/types";

export function FilterBar({ onFilterChange, initialFilters }: { onFilterChange: (filters: FilterState) => void; initialFilters?: FilterState }) {
  const [options, setOptions] = useState<FilterOptions>({ counties: [], cities: {}, zips: {} });
  const [county, setCounty] = useState(initialFilters?.county || "");
  const [city, setCity] = useState(initialFilters?.city || "");
  const [zip, setZip] = useState(initialFilters?.zip || "");
  const [minRating, setMinRating] = useState(initialFilters?.minRating || 0);
  const [query, setQuery] = useState(initialFilters?.query || "");

  useEffect(() => {
    fetch("/api/filters").then((r) => r.json()).then((data) => {
      setOptions(data);
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

  const selectClass = "h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:ring-emerald-400/20 dark:focus:border-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-wrap items-center gap-2 px-6 py-3">
      <select
        value={county}
        onChange={(e) => { setCounty(e.target.value); emit({ ...state, county: e.target.value, city: "", zip: "" }); }}
        className={selectClass}
      >
        <option value="">All Counties</option>
        {options.counties.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select
        value={city}
        onChange={(e) => { setCity(e.target.value); emit({ ...state, city: e.target.value, zip: "" }); }}
        disabled={!county}
        className={selectClass}
      >
        <option value="">All Cities</option>
        {(options.cities[county] || []).map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select
        value={zip}
        onChange={(e) => { setZip(e.target.value); emit({ ...state, zip: e.target.value }); }}
        disabled={!city}
        className={selectClass}
      >
        <option value="">All ZIPs</option>
        {(options.zips[city] || []).map((z) => <option key={z} value={z}>{z}</option>)}
      </select>

      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 h-9 dark:bg-gray-900 dark:border-gray-700">
        <span className="text-xs text-gray-400">≥</span>
        <select
          value={minRating}
          onChange={(e) => { const v = parseFloat(e.target.value); setMinRating(v); emit({ ...state, minRating: v }); }}
          className="text-sm text-gray-700 bg-transparent focus:outline-none dark:text-gray-300"
        >
          <option value="0">Any rating</option>
          <option value="3">3.0+</option>
          <option value="3.5">3.5+</option>
          <option value="4">4.0+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      <div className="flex-1 min-w-[160px] max-w-xs">
        <input
          type="text"
          placeholder="Search apartments..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") emit(); }}
          className="w-full h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder:text-gray-500 dark:focus:ring-emerald-400/20 dark:focus:border-emerald-400"
        />
      </div>
    </div>
  );
}
