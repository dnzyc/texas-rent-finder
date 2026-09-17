import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://texasrentfinder.com";

  // Paginate to get all place slugs (limit 1000 per query)
  const allPlaces: any[] = [];
  let pOffset = 0;
  while (true) {
    const { data: batch } = await supabase
      .from("places")
      .select("slug, created_at")
      .range(pOffset, pOffset + 999);
    if (!batch || batch.length === 0) break;
    allPlaces.push(...batch);
    if (batch.length < 1000) break;
    pOffset += 1000;
  }

  const apartmentUrls = allPlaces.map((place) => ({
    url: `${baseUrl}/place/${place.slug}`,
    lastModified: new Date(place.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Paginate to get all cities (>1000 rows)
  const citySet = new Set<string>();
  let offset = 0;
  while (true) {
    const { data: cities } = await supabase
      .from("places")
      .select("city")
      .not("city", "is", null)
      .range(offset, offset + 999);
    if (!cities || cities.length === 0) break;
    cities.forEach((c: any) => { if (c.city) citySet.add(c.city); });
    if (cities.length < 1000) break;
    offset += 1000;
  }

  const uniqueCities = [...citySet] as string[];

  const cityUrls = uniqueCities.map((city) => ({
    url: `${baseUrl}/texas/${city.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const staticPages = [
    { url: `${baseUrl}/privacy`, priority: 0.3 },
    { url: `${baseUrl}/terms`, priority: 0.3 },
    { url: `${baseUrl}/contact`, priority: 0.5 },
    { url: `${baseUrl}/list-property`, priority: 0.6 },
    { url: `${baseUrl}/partner`, priority: 0.6 },
    { url: `${baseUrl}/blog`, priority: 0.7 },
    // Original blog posts
    { url: `${baseUrl}/blog/guide-to-renting-in-houston`, priority: 0.5 },
    { url: `${baseUrl}/blog/best-neighborhoods-in-austin`, priority: 0.5 },
    { url: `${baseUrl}/blog/tenant-rights-in-texas`, priority: 0.5 },
    { url: `${baseUrl}/blog/moving-to-dallas`, priority: 0.5 },
    { url: `${baseUrl}/blog/renting-in-san-antonio`, priority: 0.5 },
    { url: `${baseUrl}/blog/fort-worth-apartments`, priority: 0.5 },
    { url: `${baseUrl}/blog/average-rent-in-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/cheapest-cities-to-rent-in-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/best-apartments-in-texas`, priority: 0.6 },
    // New data-driven blog posts
    { url: `${baseUrl}/blog/austin-vs-dallas-vs-houston`, priority: 0.6 },
    { url: `${baseUrl}/blog/most-reviewed-apartments-in-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/student-housing-in-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/rent-by-county-in-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/1br-vs-2br-price-difference-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/apartment-types-in-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/texas-cities-rent-ranking`, priority: 0.6 },
    { url: `${baseUrl}/blog/data-driven-apartment-search-texas`, priority: 0.6 },
    { url: `${baseUrl}/blog/texas-rental-regions-guide`, priority: 0.6 },
    { url: `${baseUrl}/blog/apartment-ratings-vs-price-texas`, priority: 0.6 },
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...cityUrls,
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...apartmentUrls,
  ];
}
