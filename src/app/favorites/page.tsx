"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApartmentCard } from "@/components/ApartmentCard";
import { Place } from "@/types";

interface Favorite {
  apartment_id: number;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        const apartmentIds = (data.data || []).map((fav: Favorite) => fav.apartment_id);

        if (apartmentIds.length > 0) {
          const placesResponse = await fetch(
            `/api/places?ids=${apartmentIds.join(",")}`
          );

          if (!placesResponse.ok) throw new Error("Failed to fetch places");

          const placesData = await placesResponse.json();
          setFavorites(placesData.items || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-stone-500 dark:text-gray-400">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px] flex-col gap-4">
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[400px] flex flex-col items-center justify-center">
        <div className="text-center max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight">Your Favorites</h1>
          <p className="text-stone-500 dark:text-gray-400">
            Save places you want to revisit by clicking the heart icon.
          </p>
          <Link href="/">
            <Button size="lg">Browse Apartments</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight">Your Favorites</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((place) => (
          <ApartmentCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
