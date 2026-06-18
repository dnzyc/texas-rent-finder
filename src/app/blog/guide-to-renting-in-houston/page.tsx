import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Complete Guide to Renting in Houston (2026)",
  description: "Everything you need to know about renting an apartment in Houston, TX. Average rents, best neighborhoods, application tips, and what to watch for.",
};

export default function HoustonGuidePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Blog</Link>

      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">City Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">The Complete Guide to Renting an Apartment in Houston (2026)</h1>
      <p className="text-sm text-gray-500 mb-8">June 15, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Average Rent in Houston</h2>
          <p className="text-gray-600 leading-relaxed">
            As of 2026, the average 1-bedroom apartment in Houston rents for approximately $1,200/month, while 2-bedroom units average around $1,500/month. Houston remains one of the most affordable major metro areas in Texas, especially compared to Austin where 1BR units average $1,624.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Rental prices vary significantly by neighborhood. Inner Loop neighborhoods like Montrose, The Heights, and Midtown command higher prices, while suburbs like Pearland, Katy, and The Woodlands offer more space for less money.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Best Neighborhoods for Renters</h2>
          <ul className="space-y-3 text-gray-600">
            <li><strong>The Heights:</strong> Historic charm, walkable streets, boutique shops. 1BR: $1,400–$1,800</li>
            <li><strong>Montrose:</strong> Artsy, diverse, great restaurants. 1BR: $1,300–$1,700</li>
            <li><strong>Midtown:</strong> Urban living, close to downtown. 1BR: $1,400–$1,900</li>
            <li><strong>Pearland:</strong> Family-friendly suburb, good schools. 1BR: $1,000–$1,300</li>
            <li><strong>Katy:</strong> Rapidly growing, master-planned communities. 1BR: $1,100–$1,400</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Application Tips</h2>
          <p className="text-gray-600 leading-relaxed">
            Most Houston landlords require: proof of income (3x monthly rent), credit check, rental history verification, and a security deposit (typically one month's rent). Application fees range from $35–$75 per adult.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Hidden Costs to Watch For</h2>
          <p className="text-gray-600 leading-relaxed">
            Beyond base rent, consider: pet fees ($200–$500 non-refundable + $25–$50/month pet rent), parking fees ($50–$150/month in downtown/mid-rise buildings), utility costs (water/sewer/trash often billed separately), and renter's insurance ($10–$20/month).
          </p>
        </section>

        <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Houston Apartment Search</h3>
          <p className="text-gray-600 mb-4">Browse 1,000+ verified listings in Houston with real pricing, ratings, and photos.</p>
          <Link href="/texas/houston" className="text-emerald-600 font-medium hover:text-emerald-700">View Houston Apartments &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
