import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Neighborhoods in Austin for Renters (2026)",
  description: "Compare Austin's best neighborhoods for renters — rent prices, walkability, commute times, and lifestyle. Find your ideal Austin neighborhood.",
};

export default function AustinNeighborhoodsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Blog</Link>

      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Neighborhood Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">Best Neighborhoods in Austin for Renters in 2026</h1>
      <p className="text-sm text-gray-500 mb-8">June 10, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Austin Rental Market Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            Austin is the most expensive rental market in Texas, with average 1-bedroom apartments renting for $1,624/month. Despite high prices, Austin continues to attract renters with its tech job market, live music scene, and outdoor lifestyle.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Top Neighborhoods by Lifestyle</h2>
          
          <h3 className="text-lg font-medium text-gray-900 mt-6">For Young Professionals: Downtown & East Austin</h3>
          <p className="text-gray-600 leading-relaxed">
            Downtown offers high-rise living with walkability to offices and nightlife (1BR: $1,800–$2,500). East Austin provides a more artsy, eclectic vibe at slightly lower prices (1BR: $1,400–$2,000).
          </p>

          <h3 className="text-lg font-medium text-gray-900 mt-6">For Families: Circle C & Northwest Hills</h3>
          <p className="text-gray-600 leading-relaxed">
            Excellent schools, larger floor plans, and suburban feel. Circle C 1BR: $1,300–$1,700. Northwest Hills 1BR: $1,200–$1,600.
          </p>

          <h3 className="text-lg font-medium text-gray-900 mt-6">For Students: West Campus & North Campus</h3>
          <p className="text-gray-600 leading-relaxed">
            Walking distance to UT Austin. Expect shared living situations and higher turnover. 1BR: $1,100–$1,500.
          </p>
        </section>

        <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Austin Apartments</h3>
          <p className="text-gray-600 mb-4">Browse 500+ verified listings in Austin with real pricing and ratings.</p>
          <Link href="/texas/austin" className="text-emerald-600 font-medium hover:text-emerald-700">View Austin Apartments &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
