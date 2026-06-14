export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { RatingStars } from "@/components/RatingStars";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ApartmentCard } from "@/components/ApartmentCard";
import { ContactButton } from "@/components/ContactButton";
import { PlaceWithNearby, Place } from "@/types";
import { logPageView } from "@/lib/analytics";

async function getPlace(slug: string): Promise<PlaceWithNearby | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `http://localhost:${process.env.PORT || 3000}`
    : "http://localhost:3000";
  const res = await fetch(`${base}/api/places/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = await getPlace(slug);

  if (!place) {
    return {
      title: "Apartment Not Found - Texas Apartments Explorer"
    };
  }

  const price1brFormatted = place.price_1br ? `$${place.price_1br}/mo` : "N/A";
  const price2brFormatted = place.price_2br ? `$${place.price_2br}/mo` : "N/A";
  const city = place.city || "Texas";
  const state = "TX";

  return {
    title: `${place.name} - ${city}, ${state} Apartments`,
    description: `Explore ${place.name} apartments in ${city}, ${state}. Prices from ${price1brFormatted} (1BR) to ${price2brFormatted} (2BR). Ratings, amenities, and more.`,
    openGraph: {
      title: `${place.name} - ${city}, TX Apartments`,
      description: `Ratings, prices from ${price1brFormatted} to ${price2brFormatted}. Find your perfect rental home today.`,
      type: "article",
      url: `https://texas-apartments.com/place/${slug}`,
      images: place.photo_url
        ? [
            {
              url: place.photo_url,
              width: 800,
              height: 600,
              alt: `${place.name} apartment photo`
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      site: "@texasapartments",
      title: `${place.name} - ${city}, TX Apartments`,
      description: `Ratings, prices from ${price1brFormatted} to ${price2brFormatted}. Find your perfect rental home today.`,
      images: place.photo_url ? [place.photo_url] : undefined
    }
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = await getPlace(slug);

  if (!place) notFound();

  logPageView(`/place/${slug}`);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">← Back to search</Link>

      <div className="mt-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{place.name}</h1>
            {place.category && <p className="text-sm text-gray-500 mt-1">{place.category}</p>}
          </div>
          <RatingStars rating={place.rating} />
        </div>

        {place.address && (
          <p className="text-gray-600 mt-3">
            {place.address}{place.city ? `, ${place.city}` : ""}{place.zip_code ? `, TX ${place.zip_code}` : ""}
          </p>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <PriceDisplay price1br={place.price_1br} price2br={place.price_2br} />
          {(place.price_1br == null && place.price_2br == null) && (
            <span className="text-sm text-gray-400">Prices not available yet</span>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          {place.website && (
            <a href={place.website} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Visit Website
            </a>
          )}
          {place.location && (
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
              Get Directions
            </a>
          )}
          <ContactButton placeName={place.name} />
        </div>

        {place.hours && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Hours</h3>
            <p className="text-sm text-gray-500 mt-1 whitespace-pre-line">{place.hours}</p>
          </div>
        )}

        {place.phone && (
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-700">Phone</h3>
            <a href={`tel:${place.phone}`} className="text-sm text-blue-600">{place.phone}</a>
          </div>
        )}

        {place.nearby && place.nearby.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Nearby Apartments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {place.nearby.map((p: Place) => <ApartmentCard key={p.id} place={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
