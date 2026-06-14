"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/SessionProvider";
import { toast } from "sonner";
import { logEvent } from "@/lib/analytics";

interface FavoritesButtonProps {
  placeId: number;
  placeName?: string;
}

export function FavoritesButton({ placeId, placeName = "" }: FavoritesButtonProps) {
  const { user, loading: authLoading } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      fetch(`/api/favorites?apartment_id=${placeId}`)
        .then(r => r.json())
        .then(data => {
          if (data.exists) setIsFavorite(true);
        });
    }
  }, [user, authLoading, placeId]);

  if (!user || authLoading) {
    return null;
  }

  const handleToggle = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (isFavorite) {
        const response = await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apartment_id: placeId }),
        });

        if (!response.ok) throw new Error("Failed to remove from favorites");

        setIsFavorite(false);
        logEvent("remove_from_favorites", { place_id: placeId, place_name: placeName });
        toast.success("Removed from favorites");
      } else {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apartment_id: placeId }),
        });

        if (!response.ok) throw new Error("Failed to add to favorites");

        setIsFavorite(true);
        logEvent("add_to_favorites", { place_id: placeId, place_name: placeName });
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant={isFavorite ? "default" : "outline"}
      className={`h-8 w-8 rounded-full transition-all ${
        isFavorite ? "bg-rose-500 hover:bg-rose-600 text-white" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        handleToggle();
      }}
    >
      <Heart
        className={`size-4 ${isFavorite ? "fill-current" : ""}`}
        aria-hidden="true"
      />
    </Button>
  );
}
