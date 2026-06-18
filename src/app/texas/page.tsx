import Link from "next/link";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Texas Cities — Apartments Directory",
  description: "Browse apartments by city in Texas. Find rentals in Houston, Dallas, San Antonio, Austin, Fort Worth, and all major Texas cities.",
};

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

export default async function TexasCitiesPage() {
  const { data: citiesData } = await supabase
    .from("places")
    .select("city")
    .not("city", "is", null);

  const cityCounts = new Map<string, number>();
  (citiesData || []).forEach((p: any) => {
    if (p.city) {
      cityCounts.set(p.city, (cityCounts.get(p.city) || 0) + 1);
    }
  });

  const cities = [...cityCounts.entries()]
    .sort((a, b) => b[1] - a[1]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Texas Cities</li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Texas Apartment Directory by City
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Browse {cityCounts.size} cities across Texas with {cities.reduce((sum, [, count]) => sum + count, 0).toLocaleString()} total apartment listings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {cities.map(([city, count]) => (
          <Link
            key={city}
            href={`/texas/${cityToSlug(city)}`}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50 transition-all duration-200"
          >
            <span className="font-medium text-gray-900">{city}</span>
            <span className="text-sm text-emerald-600 font-medium">{count}</span>
          </Link>
        ))}
      </div>

      <nav className="mt-10 text-center">
        <Link href="/" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          &larr; Back to Home
        </Link>
      </nav>
    </main>
  );
}
