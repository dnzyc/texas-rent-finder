import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Geist, DM_Serif_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Analytics } from "@vercel/analytics/react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: {
    default: "Texas Rent Finder — 5,573 TX Apartments | Prices & Ratings",
    template: "%s | Texas Rent Finder"
  },
  description: "Browse 5,573+ verified apartments across Texas with real photos, ratings & prices. Find your rental in Houston, Dallas, Austin, San Antonio & more.",
  openGraph: {
    title: "Texas Rent Finder — 5,573+ TX Apartments | Prices & Ratings",
    description: "Browse 5,573+ verified apartments across Texas with real photos, ratings & prices. Find your rental in Houston, Dallas, Austin, San Antonio & more.",
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
    title: "Texas Rent Finder — 5,573+ TX Apartments | Prices & Ratings",
    description: "Browse 5,573+ verified apartments across Texas with real photos, ratings & prices.",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();
  const nonce = headerStore.get("x-nonce") || "";

  return (
    <html lang="en" className={cn("font-sans", geist.variable, dmSerif.variable)}>
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
        <script nonce={nonce} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Texas Rent Finder",
            url: "https://texasrentfinder.com",
            logo: "https://texasrentfinder.com/og-image.png",
            description: "Search 5,573+ apartment complexes across Texas with real photos, ratings, prices, and websites."
          })}
        </script>
        <script nonce={nonce} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Texas Rent Finder",
            url: "https://texasrentfinder.com",
            description: "Search 5,573+ verified apartments across Texas with real photos, ratings & prices.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Texas",
              addressRegion: "TX",
              addressCountry: "US"
            },
            language: "en-US",
            fee: "No charge",
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Texas"
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              telephone: "+1-844-TEX-RENT",
              email: "info@texasrentfinder.com"
            },
            priceRange: "$$",
            photo: "https://texasrentfinder.com/og-image.png"
          })}
        </script>
        <script nonce={nonce} type="application/ld+json">
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
        <script nonce={nonce} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How many apartments are listed on Texas Rent Finder?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Texas Rent Finder lists 5,573+ verified apartment complexes across all major Texas cities including Houston, Dallas, San Antonio, Austin, Fort Worth, and El Paso."
                }
              },
              {
                "@type": "Question",
                name: "Is Texas Rent Finder free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Texas Rent Finder is completely free for renters. You can browse all listings, compare prices, read ratings, and contact apartments directly without any fees."
                }
              },
              {
                "@type": "Question",
                name: "How are apartment ratings calculated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ratings are aggregated from verified tenant reviews, property inspections, and community feedback. Each listing shows a composite score out of 5 stars."
                }
              },
              {
                "@type": "Question",
                name: "What is the average rent for apartments in Texas?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The average rent for a 1-bedroom apartment in Texas ranges from $900-$1,300/month depending on the city. Austin averages $1,624/month while smaller cities average around $833/month."
                }
              },
              {
                "@type": "Question",
                name: "Can I filter apartments by pet policy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Texas Rent Finder allows you to filter apartments by various criteria including city, county, ZIP code, and minimum rating to find your perfect rental."
                }
              }
            ]
          })}
        </script>
        <script nonce={nonce} type="application/ld+json">
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
        <BreadcrumbJsonLd />
      </body>
    </html>
  );
}
