import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Texas Tenant Rights Guide 2026",
  description: "Know your rights as a Texas renter — security deposits, repairs, lease termination, landlord obligations under Texas Property Code.",
};

export default function TenantRightsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Blog</Link>

      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Legal Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">Texas Tenant Rights: What Every Renter Should Know</h1>
      <p className="text-sm text-gray-500 mb-8">June 5, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Security Deposits</h2>
          <p className="text-gray-600 leading-relaxed">
            Texas law does not limit how much a landlord can charge for a security deposit, though one month's rent is standard. Landlords must return your deposit within 30 days of lease termination, along with an itemized list of any deductions. If they fail to do so, you may be entitled to recover up to $100 plus three times the wrongfully withheld amount.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Repairs & Habitability</h2>
          <p className="text-gray-600 leading-relaxed">
            Landlords are required to make repairs that affect health and safety — including heating, water, electricity, and pest infestations. You must notify the landlord in writing and allow reasonable time (typically 7 days) for repairs. For urgent issues affecting health/safety, you may have the right to terminate the lease or repair and deduct.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Breaking a Lease</h2>
          <p className="text-gray-600 leading-relaxed">
            Texas allows early lease termination without penalty in specific situations: active military deployment, domestic violence (with protective order), landlord failure to repair, and certain habitability violations. Otherwise, you may owe rent for the remaining lease term unless the landlord re-rents the unit (they must make reasonable efforts to do so).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Fair Housing Protections</h2>
          <p className="text-gray-600 leading-relaxed">
            Federal and Texas fair housing laws prohibit discrimination based on race, color, religion, sex, national origin, disability, and familial status. If you believe you've experienced housing discrimination, you can file a complaint with the Texas Workforce Commission or HUD within one year.
          </p>
        </section>

        <p className="text-sm text-gray-400 italic mt-8">
          Disclaimer: This article provides general information and does not constitute legal advice. For specific legal questions, consult a qualified attorney.
        </p>
      </div>
    </main>
  );
}
