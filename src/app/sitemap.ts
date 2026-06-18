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

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...apartmentUrls,
  ];
}
