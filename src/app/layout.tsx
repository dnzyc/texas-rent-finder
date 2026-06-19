import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { Analytics } from "@vercel/analytics/react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Texas Rent Finder — 5,600+ TX Apartments | Prices & Ratings",
    template: "%s | Texas Rent Finder"
  },
  description: "Browse 5,600+ verified apartments across Texas with real photos, ratings & prices. Find your rental in Houston, Dallas, Austin, San Antonio & more.",
  openGraph: {
    title: "Texas Rent Finder — 5,600+ TX Apartments | Prices & Ratings",
    description: "Browse 5,600+ verified apartments across Texas with real photos, ratings & prices. Find your rental in Houston, Dallas, Austin, San Antonio & more.",
    type: "website",
    url: "https://texasrentfinder.com",
    siteName: "Texas Rent Finder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Texas Rent Finder - Find Your Perfect Apartment"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Texas Rent Finder — 5,600+ TX Apartments | Prices & Ratings",
    description: "Browse 5,600+ verified apartments across Texas with real photos, ratings & prices.",
    images: ["/og-image.png"]
  },
  metadataBase: new URL("https://texasrentfinder.com")
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <meta name="google-site-verification" content="12UogC2fhWpPl6q169t94hQIFRjlgMTkJ-87PTBzdBA" />
        <link rel="preconnect" href="https://nzqywomdcgjnxwtndipk.supabase.co" />
        <link rel="preconnect" href="https://tile.openstreetmap.org" crossOrigin="anonymous" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <Providers>{children}</Providers>
        <SiteFooter />
        <Analytics />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Texas Rent Finder",
            url: "https://texasrentfinder.com",
            logo: "https://texasrentfinder.com/og-image.png",
            description: "Search 5,600+ apartment complexes across Texas with real photos, ratings, prices, and websites."
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Texas Rent Finder",
            url: "https://texasrentfinder.com",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://texasrentfinder.com/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Texas Rent Finder",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", ".speakable"]
            }
          })}
        </script>
      </body>
    </html>
  );
}
