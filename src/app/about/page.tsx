import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Texas Rent Finder — our mission to make apartment hunting in Texas transparent, data-driven, and stress-free for every renter.",
  alternates: { canonical: "https://texasrentfinder.com/about" },
  openGraph: {
    title: "About Us | Texas Rent Finder",
    description: "Our mission to make apartment hunting in Texas transparent and stress-free.",
    url: "https://texasrentfinder.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Texas Rent Finder" }],
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-heading font-bold text-foreground mb-8">About Texas Rent Finder</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Texas Rent Finder was built with a simple goal: make apartment hunting in Texas
            transparent, data-driven, and stress-free. We believe every renter deserves access
            to honest pricing, verified ratings, and comprehensive listings — without paying
            a cent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "5,000+ Verified Listings", desc: "Apartment data verified against public records and community sources across all 254 Texas counties." },
              { title: "Transparent Pricing", desc: "Real rent data for 1BR, 2BR, and 3BR units so you know exactly what to expect." },
              { title: "Tenant Ratings", desc: "Composite ratings from verified reviews, property inspections, and community feedback." },
              { title: "Direct Contact", desc: "Reach apartment communities directly — no middlemen, no referral fees." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform aggregates apartment data from verified sources, including public records,
            property management databases, and tenant feedback. Each listing is reviewed for
            accuracy before being published. We cover every major Texas metro — Houston, Dallas,
            San Antonio, Austin, Fort Worth, El Paso — and hundreds of smaller communities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Why Trust Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            We are an independent platform with no affiliation to any property management company.
            Our ratings are not influenced by paid placements. We earn revenue through optional
            premium features — never by selling your data or hiding information behind paywalls.
          </p>
        </section>

        <section className="bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-xl font-heading font-bold text-foreground mb-4">Ready to Find Your Home?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Browse 5,000+ verified Texas apartments with transparent pricing and tenant ratings.
          </p>
          <a href="/" className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Start Searching
          </a>
        </section>
      </div>
    </main>
  );
}
