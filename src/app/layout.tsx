import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Texas Apartments Explorer",
    template: "%s | Texas Apartments Explorer"
  },
  description: "Browse apartment complexes across Texas with ratings, prices, and websites. Find your perfect rental home today.",
  keywords: ["real estate", "apartments", "Texas rental", "rental properties", "apartment search"],
  openGraph: {
    title: "Texas Apartments Explorer - Find Your Perfect Rental Home",
    description: "Browse 5,058+ apartment complexes across Texas with ratings, prices, and websites.",
    type: "website",
    url: "https://texas-apartments.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Texas Apartments Explorer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@texasapartments",
    title: "Texas Apartments Explorer - Find Your Perfect Rental Home",
    description: "Browse apartment complexes across Texas with ratings, prices, and websites."
  },
  metadataBase: new URL("https://texas-apartments.com")
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
            name: "Texas Apartments Explorer",
            url: "https://texas-apartments.com",
            logo: "https://texas-apartments.com/logo.png"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Texas Apartments Explorer",
            url: "https://texas-apartments.com",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://texas-apartments.com/?query={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </body>
    </html>
  );
}
