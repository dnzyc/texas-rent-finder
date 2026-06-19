"use client";

import { useCompare } from "@/contexts/CompareContext";
import { Place } from "@/types";
import { cn } from "@/lib/utils";

export function CompareButton({ place }: { place: Place }) {
  const { add, remove, isSelected, count } = useCompare();
  const selected = isSelected(place.slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selected) {
      remove(place.slug);
    } else if (count < 3) {
      add(place);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!selected && count >= 3}
      className={cn(
        "flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium transition-all",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1",
        selected
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
          : count >= 3
          ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"
          : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
      )}
      title={selected ? "Remove from comparison" : count >= 3 ? "Max 3 items" : "Add to comparison"}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {selected ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        )}
      </svg>
      {selected ? "Added" : "Compare"}
    </button>
  );
}
