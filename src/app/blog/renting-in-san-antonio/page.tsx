import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "San Antonio Apartment Guide 2026 — Best Areas & Prices",
  description: "Find the best apartments in San Antonio, TX. Compare neighborhoods, average rents, and see why San Antonio is Texas' most affordable major city.",
};

export default function SanAntonioGuidePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Blog</Link>
      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">City Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">San Antonio Apartment Guide 2026 — Best Areas & Prices</h1>
      <p className="text-sm text-gray-500 mb-8">June 18, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Why San Antonio?</h2>
          <p className="text-gray-600 leading-relaxed">
            San Antonio is Texas' most affordable major city, with average 1-bedroom apartments renting for just $1,050/month. The city combines rich history, a growing tech scene, and a relaxed lifestyle — making it one of the fastest-growing rental markets in the country.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Top Neighborhoods</h2>
          <h3 className="text-lg font-medium text-gray-900 mt-6">Alamo Heights: Premium Living</h3>
          <p className="text-gray-600 leading-relaxed">Upscale area with excellent schools and tree-lined streets. 1BR: $1,300–$1,700.</p>
          <h3 className="text-lg font-medium text-gray-900 mt-6">Downtown & Pearl District</h3>
          <p className="text-gray-600 leading-relaxed">Urban living with Riverwalk access and trendy restaurants. 1BR: $1,300–$1,900.</p>
          <h3 className="text-lg font-medium text-gray-900 mt-6">Stone Oak: Suburban Comfort</h3>
          <p className="text-gray-600 leading-relaxed">Master-planned community in North San Antonio. 1BR: $1,100–$1,400.</p>
        </section>

        <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search San Antonio Apartments</h3>
          <p className="text-gray-600 mb-4">Browse 800+ verified listings in San Antonio with real pricing and ratings.</p>
          <Link href="/texas/san-antonio" className="text-emerald-600 font-medium hover:text-emerald-700">View San Antonio Apartments &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
