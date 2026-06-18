import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Moving to Dallas? Complete Rental Guide 2026",
  description: "Everything you need to know about renting in Dallas, TX. Average rents by neighborhood, best areas for young professionals, families, and budget renters.",
};

export default function DallasGuidePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Blog</Link>
      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">City Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">Moving to Dallas? Complete Rental Guide 2026</h1>
      <p className="text-sm text-gray-500 mb-8">June 18, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Dallas Rental Market at a Glance</h2>
          <p className="text-gray-600 leading-relaxed">
            Dallas offers some of the most competitive rental prices among Texas major cities, with average 1-bedroom apartments renting for $1,150/month. The Dallas-Fort Worth metroplex is the largest inland metropolitan area in the US, providing renters with unmatched variety — from downtown high-rises to sprawling suburban complexes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Best Neighborhoods by Lifestyle</h2>
          <h3 className="text-lg font-medium text-gray-900 mt-6">Young Professionals: Uptown & Deep Ellum</h3>
          <p className="text-gray-600 leading-relaxed">Walkable, vibrant nightlife, close to corporate offices. 1BR: $1,400–$2,000.</p>
          <h3 className="text-lg font-medium text-gray-900 mt-6">Families: Plano & Frisco</h3>
          <p className="text-gray-600 leading-relaxed">Top-rated schools, larger floor plans, safe communities. 1BR: $1,200–$1,600.</p>
          <h3 className="text-lg font-medium text-gray-900 mt-6">Budget-Friendly: Mesquite & Garland</h3>
          <p className="text-gray-600 leading-relaxed">Affordable options within commuting distance. 1BR: $900–$1,200.</p>
        </section>

        <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Dallas Apartments</h3>
          <p className="text-gray-600 mb-4">Browse 1,500+ verified listings in Dallas with real pricing and ratings.</p>
          <Link href="/texas/dallas" className="text-emerald-600 font-medium hover:text-emerald-700">View Dallas Apartments &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
