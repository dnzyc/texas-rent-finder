import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Texas Rent Finder privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 18, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed">
            When you use Texas Rent Finder, we may collect information you provide directly, such as your name, email address, and phone number when you create an account, subscribe to our newsletter, or contact a property. We also automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, and pages visited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information we collect to provide and improve our services, personalize your experience, communicate with you about listings and updates, respond to inquiries, and ensure platform security. We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookies and Tracking</h2>
          <p className="text-gray-600 leading-relaxed">
            We use cookies and similar tracking technologies to remember your preferences, analyze site usage, and improve our services. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We implement industry-standard security measures to protect your personal information. However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed">
            Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, correct, or delete your personal information. You may also opt-out of marketing communications at any time. To exercise these rights, please contact us through our contact page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of Texas Rent Finder after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about this privacy policy or our data practices, please{" "}
            <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 underline">contact us</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
