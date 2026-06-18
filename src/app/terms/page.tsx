import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Texas Rent Finder terms of service — the rules and guidelines for using our platform.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 18, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using Texas Rent Finder, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
          <p className="text-gray-600 leading-relaxed">
            Texas Rent Finder is an apartment search platform that connects renters with property listings across Texas. We provide information about apartment complexes including pricing, ratings, photos, and contact details. We do not own or manage any properties listed on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
          <p className="text-gray-600 leading-relaxed">
            You may browse listings without an account. Creating an account provides additional features such as saving favorites. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Listing Accuracy</h2>
          <p className="text-gray-600 leading-relaxed">
            While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or reliability of listing data. Prices, availability, and amenities may change without notice. Always verify details directly with the property.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. User Conduct</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree not to misuse our platform, including but not limited to: scraping data without permission, submitting false information, harassing other users, or using the platform for any unlawful purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            All content, features, and functionality of Texas Rent Finder — including text, graphics, logos, and software — are the exclusive property of Texas Rent Finder and are protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            Texas Rent Finder shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our services are provided "as is" without warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of the platform after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            For questions about these Terms of Service, please{" "}
            <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 underline">contact us</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
