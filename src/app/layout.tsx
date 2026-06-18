import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Texas Rent Finder — 5,600+ Apartments Across Texas | Prices, Ratings & Photos",
    template: "%s | Texas Rent Finder"
  },
  description: "Search 5,600+ apartment complexes across Texas with real photos, ratings, prices, and websites. Find your perfect rental home in Houston, Dallas, San Antonio, Austin and more.",
  keywords: ["Texas apartments", "apartments for rent Texas", "Texas rental homes", "apartment search Texas", "Houston apartments", "Dallas apartments", "San Antonio apartments", "Austin apartments", "Texas rent finder", "apartment finder Texas"],
  openGraph: {
    title: "Texas Rent Finder — 5,600+ Apartments with Real Photos & Ratings",
    description: "Search 5,600+ apartment complexes across Texas with real photos, ratings, prices, and websites. Your complete Texas rental search.",
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
    title: "Texas Rent Finder — 5,600+ Apartments with Real Photos & Ratings",
    description: "Search 5,600+ apartment complexes across Texas with real photos, ratings, prices, and websites.",
    images: ["/og-image.png"]
  },
  metadataBase: new URL("https://texasrentfinder.com"),
  alternates: {
    canonical: "https://texasrentfinder.com"
  }
};

export const viewport = {
  themeColor: "#3b82f6"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>{children}</Providers>
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
      </body>
    </html>
  );
}
