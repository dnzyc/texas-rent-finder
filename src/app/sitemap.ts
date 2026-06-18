import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://texasrentfinder.com";

  const { data: places } = await supabase
    .from("places")
    .select("slug, updated_at, created_at");

  const apartmentUrls = (places || []).map((place) => ({
    url: `${baseUrl}/place/${place.slug}`,
    lastModified: place.updated_at ? new Date(place.updated_at) : new Date(place.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const { data: cities } = await supabase
    .from("places")
    .select("city")
    .not("city", "is", null);

  const uniqueCities = [...new Set((cities || []).map((c) => c.city).filter(Boolean))] as string[];

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
    { url: `${baseUrl}/blog`, priority: 0.6 },
    { url: `${baseUrl}/blog/guide-to-renting-in-houston`, priority: 0.5 },
    { url: `${baseUrl}/blog/best-neighborhoods-in-austin`, priority: 0.5 },
    { url: `${baseUrl}/blog/tenant-rights-in-texas`, priority: 0.5 },
    { url: `${baseUrl}/blog/moving-to-dallas`, priority: 0.5 },
    { url: `${baseUrl}/blog/renting-in-san-antonio`, priority: 0.5 },
    { url: `${baseUrl}/blog/fort-worth-apartments`, priority: 0.5 },
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
