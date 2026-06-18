import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/favorites"],
      },
    ],
    sitemap: "https://texasrentfinder.com/sitemap.xml",
  };
}
