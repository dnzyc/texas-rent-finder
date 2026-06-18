import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "List Your Property",
  description: "List your apartment, rental property, or complex on Texas Rent Finder. Reach thousands of Texas renters looking for their next home.",
};

export default function ListPropertyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Home</Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">List Your Property on Texas Rent Finder</h1>
      <p className="text-lg text-gray-600 mb-10">
        Reach thousands of active renters searching for apartments across Texas every month.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { value: "5,000+", label: "Active Renters Monthly" },
          { value: "50+", label: "Texas Cities Covered" },
          { value: "24/7", label: "Tenant Inquiries" },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
            <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6 mb-12">
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why List With Us?</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-1">&#10003;</span>
              <span>Your property gets listed in front of thousands of active Texas renters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-1">&#10003;</span>
              <span>Detailed listing with photos, pricing, amenities, and direct contact info</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-1">&#10003;</span>
              <span>Tenant leads delivered directly to your phone and email</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-1">&#10003;</span>
              <span>Searchable by city, county, and ZIP code for maximum visibility</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-8 rounded-xl text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="mb-6 text-emerald-100">
          Contact us to list your property. Our team will set up your listing within 24 hours.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
