import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fort Worth Apartments Guide 2026 — Best Areas for Renters",
  description: "Find the best apartments in Fort Worth, TX. Compare neighborhoods from Downtown to TCU area with average rents and lifestyle tips.",
  alternates: { canonical: "/blog/fort-worth-apartments" },
};

export default function FortWorthGuidePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Blog</Link>
      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">City Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">Fort Worth Apartments Guide 2026 — Best Areas for Renters</h1>
      <p className="text-sm text-gray-500 mb-8">June 18, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Fort Worth: The Cultural Heart of North Texas</h2>
          <p className="text-gray-600 leading-relaxed">
            Fort Worth offers a unique blend of Western heritage and modern urban living. With world-class museums, a thriving downtown, and more affordable rents than neighboring Dallas, Fort Worth is increasingly popular among renters seeking culture without the premium price tag.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Where to Rent in Fort Worth</h2>
          <h3 className="text-lg font-medium text-gray-900 mt-6">Downtown & Sundance Square</h3>
          <p className="text-gray-600 leading-relaxed">Urban core with entertainment and dining. 1BR: $1,300–$1,800.</p>
          <h3 className="text-lg font-medium text-gray-900 mt-6">TCU Area & West 7th</h3>
          <p className="text-gray-600 leading-relaxed">Popular with students and young professionals. 1BR: $1,000–$1,400.</p>
          <h3 className="text-lg font-medium text-gray-900 mt-6">North Fort Worth & Keller</h3>
          <p className="text-gray-600 leading-relaxed">Family-friendly suburbs with excellent schools. 1BR: $1,100–$1,500.</p>
        </section>

        <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Fort Worth Apartments</h3>
          <p className="text-gray-600 mb-4">Browse verified listings in Fort Worth with real pricing and ratings.</p>
          <Link href="/texas/fort-worth" className="text-emerald-600 font-medium hover:text-emerald-700">View Fort Worth Apartments &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
