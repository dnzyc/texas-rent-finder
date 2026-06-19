import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Texas Renter Guides & Tips",
  description: "Expert guides for Texas renters — neighborhood guides, tenant rights, market trends, and tips for finding your perfect apartment.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "average-rent-in-texas",
    title: "Average Rent in Texas by City (2026) — Full Price Comparison",
    excerpt: "Compare average rent prices across 30+ Texas cities. Find the most affordable areas with real market data.",
    date: "June 18, 2026",
    category: "Market Data",
  },
  {
    slug: "cheapest-cities-to-rent-in-texas",
    title: "10 Cheapest Cities to Rent in Texas (2026) — Under $1,000/Month",
    excerpt: "Budget-friendly Texas cities with average 1BR rent under $1,000/month. Real prices and neighborhood tips.",
    date: "June 18, 2026",
    category: "Budget Guide",
  },
  {
    slug: "best-apartments-in-texas",
    title: "Best Apartments in Texas (2026) — Top-Rated by City",
    excerpt: "Top-rated apartments across Texas based on real tenant reviews, amenities, and value for money.",
    date: "June 18, 2026",
    category: "Top Picks",
  },
  {
    slug: "guide-to-renting-in-houston",
    title: "The Complete Guide to Renting an Apartment in Houston (2026)",
    excerpt: "Everything you need to know about renting in Houston — from average rents by neighborhood to application tips, pet policies, and hidden fees.",
    date: "June 15, 2026",
    category: "City Guide",
  },
  {
    slug: "best-neighborhoods-in-austin",
    title: "Best Neighborhoods in Austin for Renters in 2026",
    excerpt: "A comprehensive breakdown of Austin's top neighborhoods for renters — comparing rent prices, walkability, nightlife, and commute times.",
    date: "June 10, 2026",
    category: "Neighborhood Guide",
  },
  {
    slug: "tenant-rights-in-texas",
    title: "Texas Tenant Rights: What Every Renter Should Know",
    excerpt: "Understanding your rights as a tenant in Texas — security deposits, repairs, lease termination, and landlord obligations under Texas Property Code.",
    date: "June 5, 2026",
    category: "Legal Guide",
  },
  {
    slug: "moving-to-dallas",
    title: "Moving to Dallas? Complete Rental Guide 2026",
    excerpt: "Everything you need to know about renting in Dallas — from Uptown to Plano, average rents, and the best areas for every lifestyle.",
    date: "June 18, 2026",
    category: "City Guide",
  },
  {
    slug: "renting-in-san-antonio",
    title: "San Antonio Apartment Guide 2026 — Best Areas & Prices",
    excerpt: "Texas' most affordable major city — explore Alamo Heights, Downtown, and Stone Oak with average rent comparisons.",
    date: "June 18, 2026",
    category: "City Guide",
  },
  {
    slug: "fort-worth-apartments",
    title: "Fort Worth Apartments Guide 2026 — Best Areas for Renters",
    excerpt: "Western heritage meets modern living — where to rent in Fort Worth, from Downtown to TCU and Keller.",
    date: "June 18, 2026",
    category: "City Guide",
  },
  {
    slug: "austin-vs-dallas-vs-houston",
    title: "Austin vs Dallas vs Houston vs San Antonio: Rent Comparison (2026)",
    excerpt: "Compare average rent prices across Texas' 4 largest cities. Real data from 6,700+ apartments.",
    date: "June 18, 2026",
    category: "Market Data",
  },
  {
    slug: "most-reviewed-apartments-in-texas",
    title: "Most Reviewed Apartments in Texas (2026) — Top 15 by Tenant Reviews",
    excerpt: "Discover the most reviewed apartments in Texas with real tenant feedback. Top 15 with 900+ reviews.",
    date: "June 18, 2026",
    category: "Top Picks",
  },
  {
    slug: "student-housing-in-texas",
    title: "Student Housing in Texas: Rent Guide by University City (2026)",
    excerpt: "Compare rent prices near Texas universities — College Station, San Marcos, Denton, Lubbock, and more.",
    date: "June 18, 2026",
    category: "Student Guide",
  },
  {
    slug: "rent-by-county-in-texas",
    title: "Texas Rent by County (2026) — Full Price Map Across 15 Counties",
    excerpt: "Compare average rent across Texas counties — Harris, Dallas, Tarrant, Bexar, Travis, and more.",
    date: "June 18, 2026",
    category: "Market Data",
  },
  {
    slug: "1br-vs-2br-price-difference-texas",
    title: "1BR vs 2BR Apartment Prices in Texas (2026) — Is the Extra Room Worth It?",
    excerpt: "Compare 1-bedroom and 2-bedroom prices across Texas cities. Is the 30% premium justified?",
    date: "June 18, 2026",
    category: "Price Analysis",
  },
  {
    slug: "apartment-types-in-texas",
    title: "Texas Apartment Types Compared (2026) — Condos, Townhouses, and More",
    excerpt: "Compare apartment complex, condo, townhouse, and housing development prices in Texas.",
    date: "June 18, 2026",
    category: "Market Data",
  },
  {
    slug: "texas-cities-rent-ranking",
    title: "Texas Cities Rent Ranking (2026) — All 25 Largest Cities Compared",
    excerpt: "Complete rent ranking for Texas' 25 largest cities. Real price data sorted by average 1BR rent.",
    date: "June 18, 2026",
    category: "Market Data",
  },
  {
    slug: "data-driven-apartment-search-texas",
    title: "How to Choose an Apartment in Texas Using Data (2026)",
    excerpt: "Use real rental data to make smarter apartment decisions. Price analysis, rating insights, and market trends.",
    date: "June 18, 2026",
    category: "Renter Tips",
  },
  {
    slug: "texas-rental-regions-guide",
    title: "Texas Rental Regions Guide (2026) — DFW, Houston, Austin, and Beyond",
    excerpt: "Compare Texas rental regions — DFW Metroplex, Houston metro, Austin corridor, and more.",
    date: "June 18, 2026",
    category: "Market Data",
  },
  {
    slug: "apartment-ratings-vs-price-texas",
    title: "Texas Apartment Ratings vs Price: Does Higher Rating Mean Higher Rent? (2026)",
    excerpt: "Surprising data: do highly-rated Texas apartments cost more? Analysis of 5,000+ apartments.",
    date: "June 18, 2026",
    category: "Price Analysis",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Texas Renter Blog",
        description: "Expert guides and tips for finding your perfect Texas apartment.",
        url: "https://texasrentfinder.com/blog",
      })}} />

      <Link href="/" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Texas Renter Blog</h1>
      <p className="text-lg text-gray-600 mb-10">Expert guides and tips for finding your perfect Texas apartment.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">{post.category}</span>
            <h2 className="text-lg font-semibold text-gray-900 mt-2 mb-2 leading-snug">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
            <p className="text-xs text-gray-400">{post.date}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
