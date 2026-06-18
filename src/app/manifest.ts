import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Texas Rent Finder",
    short_name: "TX Rent Finder",
    description: "Find apartments across Texas with real photos, ratings, and prices",
    start_url: "/",
    display: "standalone",
    background_color: "#f0fdfa",
    theme_color: "#059669",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/og-image.png",
        sizes: "1200x630",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["real estate", "utilities", "lifestyle"],
    lang: "en",
  };
}
