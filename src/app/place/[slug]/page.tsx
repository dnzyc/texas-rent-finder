export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RatingStars } from "@/components/RatingStars";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ApartmentCard } from "@/components/ApartmentCard";
import { ContactButton } from "@/components/ContactButton";
import { PlaceWithNearby, Place } from "@/types";
import { logPageView } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

import { parseLocation, SupabasePlaceRow } from "@/lib/parseLocation";

async function getPlace(slug: string): Promise<PlaceWithNearby | null> {
  const { data: place, error } = await supabase
    .from("places")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !place) return null;

  const parsed = { ...place, location: parseLocation(place as SupabasePlaceRow) } as PlaceWithNearby;

  if (parsed.location) {
    const { data: nearby } = await supabase
      .rpc("nearby_places", {
        lat: parsed.location.lat,
        lng: parsed.location.lng,
        radius_m: 5000,
        exclude_id: parsed.id,
        limit_count: 4,
      });

    if (nearby) {
      parsed.nearby = (nearby as any[])
        .map((p) => ({ ...p, location: parseLocation(p as SupabasePlaceRow) })) as Place[];
    }
  }

  return parsed;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = await getPlace(slug);

  if (!place) {
    return {
      title: "Apartment Not Found - Texas Rent Finder"
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
      url: `https://texasrentfinder.com/place/${slug}`,
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

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
      { "@type": "ListItem", position: 2, name: "Texas Apartments", item: "https://texasrentfinder.com/texas" },
      ...(place.city ? [{ "@type": "ListItem" as const, position: 3, name: `${place.city}, TX Apartments`, item: `https://texasrentfinder.com/texas/${place.city.toLowerCase().replace(/\s+/g, "-")}` }] : []),
      { "@type": "ListItem", position: place.city ? 4 : 3, name: place.name, item: `https://texasrentfinder.com/place/${slug}` },
    ],
  };

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: place.name,
    description: `${place.name} apartments in ${place.city || 'Texas'}, TX. Prices from $${place.price_1br || '—'} (1BR) to $${place.price_2br || '—'} (2BR).`,
    url: `https://texasrentfinder.com/place/${slug}`,
    image: place.photo_url || undefined,
    address: place.address ? {
      "@type": "PostalAddress",
      streetAddress: place.address,
      addressLocality: place.city || "Texas",
      addressRegion: "TX",
      postalCode: place.zip_code || undefined,
      addressCountry: "US"
    } : undefined,
    geo: place.location ? {
      "@type": "GeoCoordinates",
      latitude: place.location.lat,
      longitude: place.location.lng
    } : undefined,
    telephone: place.phone || undefined,
    priceRange: place.price_1br ? `$${place.price_1br}-$${place.price_2br || place.price_1br}` : undefined,
    aggregateRating: place.rating ? {
      "@type": "AggregateRating",
      ratingValue: place.rating,
      reviewCount: place.review_count || 1,
      bestRating: 5
    } : undefined,
    openingHours: place.hours || undefined,
    url_website: place.website || undefined
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">← Back to search</Link>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      <div className="mt-4">
        {place.photo_url && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg mb-6">
            <Image
              src={place.photo_url}
              alt={place.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}
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
