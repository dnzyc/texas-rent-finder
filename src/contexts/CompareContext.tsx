"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Place } from "@/types";

interface CompareContextType {
  items: Place[];
  add: (place: Place) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isSelected: (slug: string) => boolean;
  count: number;
}

const CompareContext = createContext<CompareContextType | null>(null);

const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Place[]>([]);

  const add = useCallback((place: Place) => {
    setItems((prev) => {
      if (prev.length >= MAX_COMPARE) return prev;
      if (prev.some((p) => p.slug === place.slug)) return prev;
      return [...prev, place];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const isSelected = useCallback((slug: string) => items.some((p) => p.slug === slug), [items]);

  return (
    <CompareContext.Provider value={{ items, add, remove, clear, isSelected, count: items.length }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
