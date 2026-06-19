import { cache } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { escapeHtml } from "@/lib/escapeHtml";
import { parseLocation, SupabasePlaceRow } from "@/lib/parseLocation";
import { Place } from "@/types";

const CITY_ALIASES: Record<string, string> = {
  "san-antonio": "San Antonio",
  "fort-worth": "Fort Worth",
  "el-paso": "El Paso",
  "college-station": "College Station",
  "san-marcos": "San Marcos",
  "grand-prairie": "Grand Prairie",
  "missouri-city": "Missouri City",
  "sugar-land": "Sugar Land",
  "cedar-park": "Cedar Park",
  "new-braunfels": "New Braunfels",
  "round-rock": "Round Rock",
  "the-woodlands": "The Woodlands",
  "san-benito": "San Benito",
  "rio-hondo": "Rio Hondo",
  "los-fresnos": "Los Fresnos",
  "la-feria": "La Feria",
  "port-arthur": "Port Arthur",
  "port-lavaca": "Port Lavaca",
  "port-neches": "Port Neches",
  "big-spring": "Big Spring",
  "eagle-pass": "Eagle Pass",
  "lake-jackson": "Lake Jackson",
  "marble-falls": "Marble Falls",
  "fair-oaks-ranch": "Fair Oaks Ranch",
  "alamo-heights": "Alamo Heights",
  "leon-valley": "Leon Valley",
  "central-gardens": "Central Gardens",
  "wake-village": "Wake Village",
  "fall-creek": "Fall Creek",
  "creekside-park": "Creekside Park",
};

function slugToCity(slug: string): string {
  if (CITY_ALIASES[slug]) return CITY_ALIASES[slug];
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

const getCityData = cache(async (slug: string) => {
  const city = slugToCity(slug);

  const { data: places, error, count } = await supabase
    .from("places")
    .select("id,slug,name,address,city,zip_code,county,rating,review_count,price_1br,price_2br,photo_url,category", { count: "exact", head: false })
    .eq("city", city)
    .order("rating", { ascending: false })
    .limit(24);

  if (error || !places || places.length === 0) return null;

  const total = count || places.length;
  const withPrice = places.filter((p) => p.price_1br != null);
  const avg1br =
    withPrice.length > 0
      ? Math.round(withPrice.reduce((sum, p) => sum + (p.price_1br || 0), 0) / withPrice.length)
      : null;

  return {
    city,
    slug,
    total,
    avg1br,
    places: places.map((p) => ({ ...p, location: parseLocation(p as SupabasePlaceRow) })) as Place[],
  };
});

export async function generateStaticParams() {
  const { data } = await supabase
    .from("places")
    .select("city")
    .not("city", "is", null)
    .order("city");

  const cities = [...new Set((data || []).map((p: any) => p.city).filter(Boolean))] as string[];

  return cities.map((city) => ({
    city: cityToSlug(city),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const cityName = slugToCity(slug);
  const data = await getCityData(slug);

  if (!data) {
    return { title: "City Not Found - Texas Rent Finder" };
  }

  return {
    title: `${cityName}, TX Apartments for Rent`,
    description: `Find apartments in ${cityName}, TX. Browse ${data.total} verified listings with prices from $${data.avg1br ? data.avg1br.toLocaleString() : "—"}/mo (1BR avg). Real photos, ratings, and contact info.`,
    openGraph: {
      title: `${cityName}, TX Apartments — ${data.total} Listings`,
      description: `Browse ${data.total} verified apartments in ${cityName}, TX. Average 1BR rent: $${data.avg1br ? data.avg1br.toLocaleString() : "—"}/mo. Find your next home today.`,
      type: "website",
      url: `https://texasrentfinder.com/texas/${slug}`,
    },
    alternates: {
      canonical: `https://texasrentfinder.com/texas/${slug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const cityName = slugToCity(slug);
  const data = await getCityData(slug);

  if (!data) notFound();

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
      { "@type": "ListItem", position: 2, name: "Texas Apartments", item: "https://texasrentfinder.com/texas" },
      { "@type": "ListItem", position: 3, name: `${cityName}, TX Apartments`, item: `https://texasrentfinder.com/texas/${slug}` },
    ],
  };

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cityName}, TX Apartments for Rent`,
    description: `Browse ${data.total} verified apartment listings in ${cityName}, TX.`,
    url: `https://texasrentfinder.com/texas/${slug}`,
    about: {
      "@type": "City",
      name: cityName,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.places.length,
      itemListElement: data.places.map((place: Place, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "ApartmentComplex",
          name: place.name,
          url: `https://texasrentfinder.com/place/${place.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/texas" className="hover:text-emerald-600">Texas</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{cityName}</li>
          </ol>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Apartments for Rent in {cityName}, TX
          </h1>
          <p className="text-lg text-gray-600">
            Browse {data.total.toLocaleString()} verified apartment listings in {cityName}, Texas.
            {data.avg1br && (
              <> Average 1-bedroom rent: <span className="font-semibold text-emerald-600">${data.avg1br.toLocaleString()}/mo</span>.</>
            )}
            {data.total > 24 && <> Showing top 24 by rating.</>}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
            <p className="text-2xl font-bold text-emerald-600">{data.total.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">Total Listings</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {data.avg1br ? `$${data.avg1br.toLocaleString()}` : "—"}
            </p>
            <p className="text-xs text-gray-600 mt-1">Avg 1BR Rent</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {data.places.filter((p: Place) => p.rating).length > 0
                ? (data.places.reduce((sum: number, p: Place) => sum + (p.rating || 0), 0) / data.places.filter((p: Place) => p.rating).length).toFixed(1)
                : "—"}
            </p>
            <p className="text-xs text-gray-600 mt-1">Avg Rating</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {(() => {
                const counties = new Set(data.places.map((p: Place) => p.county).filter(Boolean));
                return counties.size;
              })()}
            </p>
            <p className="text-xs text-gray-600 mt-1">Counties</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.places.map((place: Place) => (
            <Link
              key={place.id}
              href={`/place/${place.slug}`}
              className="block bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 overflow-hidden group"
            >
              {place.photo_url && (
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={place.photo_url}
                    alt={place.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="text-base font-semibold text-stone-800 line-clamp-2 leading-snug">
                    {escapeHtml(place.name)}
                  </h2>
                  {place.rating && (
                    <span className="shrink-0 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200/50">
                      ★ {place.rating.toFixed(1)}
                    </span>
                  )}
                </div>
                {place.address && (
                  <p className="text-sm text-stone-500 truncate">{escapeHtml(place.address)}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                  {place.zip_code && <span>{escapeHtml(place.zip_code)}</span>}
                  {place.county && <span>· {escapeHtml(place.county)}</span>}
                </div>
                {place.price_1br && (
                  <p className="text-sm font-medium text-emerald-700 mt-3">
                    1BR from ${place.price_1br.toLocaleString()}
                  </p>
                )}
                {place.category && (
                  <span className="inline-block mt-2 text-xs text-gray-400">{place.category}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {data.places.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-2">No listings found for {cityName}.</p>
            <Link href="/" className="text-emerald-600 hover:underline">Browse all Texas apartments</Link>
          </div>
        )}

        {data.places.length > 0 && data.total > 24 && (
          <div className="mt-8 text-center">
            <Link
              href={`/?city=${encodeURIComponent(cityName)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
            >
              View All {data.total.toLocaleString()} Listings in {cityName}
            </Link>
          </div>
        )}

        <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Can&apos;t find what you&apos;re looking for in {cityName}?
          </h2>
          <p className="text-gray-600 mb-4">
            Browse all {data.total.toLocaleString()}+ listings across Texas with our advanced search and filter tools.
          </p>
          <Link
            href="/#listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Browse All Apartments
          </Link>
        </div>

        <nav className="mt-10 text-center">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            &larr; Back to Home
          </Link>
        </nav>
      </main>
    </>
  );
}
