import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Texas Renter Guides & Tips",
  description: "Expert guides for Texas renters — neighborhood guides, tenant rights, market trends, and tips for finding your perfect apartment.",
};

const posts = [
  {
    slug: "guide-to-renting-in-houston",
    title: "The Complete Guide to Renting an Apartment in Houston (2026)",
    excerpt: "Everything you need to know about renting in Houston — from average rents by neighborhood to application tips, pet policies, and hidden fees to watch for.",
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
];

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
