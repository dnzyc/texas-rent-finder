import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "10 Cheapest Cities to Rent in Texas (2026) — Under $1,000/Month",
  description: "Find the most affordable places to rent in Texas. 10 cities with average 1BR rent under $1,000/month in 2026. Real prices, neighborhood tips, and salary requirements.",
  openGraph: {
    title: "10 Cheapest Cities to Rent in Texas (2026)",
    description: "Budget-friendly Texas cities with rent under $1,000/month.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/cheapest-cities-to-rent-in-texas" },
};

const cheapestCities = [
  { rank: 1, city: "Amarillo", avg1br: 820, population: "200K", highlights: "Texas Panhandle, low cost of living, outdoor recreation", slug: "amarillo" },
  { rank: 2, city: "Lubbock", avg1br: 850, population: "260K", highlights: "Texas Tech University, growing job market, cultural scene", slug: "lubbock" },
  { rank: 3, city: "El Paso", avg1br: 900, population: "680K", highlights: "Border city, military bases, growing tech sector", slug: "el-paso" },
  { rank: 4, city: "Waco", avg1br: 920, population: "140K", highlights: "Baylor University, Magnolia Market, central location", slug: "waco" },
  { rank: 5, city: "Corpus Christi", avg1br: 950, population: "320K", highlights: "Coastal living, beaches, Navy presence", slug: "corpus-christi" },
  { rank: 6, city: "Beaumont", avg1br: 880, population: "115K", highlights: "Oil industry, low taxes, small-city feel", slug: "beaumont" },
  { rank: 7, city: "Abilene", avg1br: 860, population: "125K", highlights: "Military town, universities, affordable living", slug: "abilene" },
  { rank: 8, city: "Tyler", avg1br: 910, population: "105K", highlights: "Rose capital, East Texas, healthcare jobs", slug: "tyler" },
  { rank: 9, city: "San Angelo", avg1br: 870, population: "100K", highlights: "West Texas, oil & agriculture, small-town charm", slug: "san-angelo" },
  { rank: 10, city: "Longview", avg1br: 890, population: "85K", highlights: "East Texas, oil industry, family-friendly", slug: "longview" },
];

const faqItems = [
  {
    q: "What is the cheapest city to rent in Texas?",
    a: "Amarillo is the cheapest major city in Texas with an average 1-bedroom rent of approximately $820/month. Other very affordable options include Lubbock ($850), Abilene ($860), and San Angelo ($870). These cities offer significantly lower costs of living compared to major metros.",
  },
  {
    q: "Can you really find an apartment under $1,000 in Texas?",
    a: "Yes — at least 10 major Texas cities have average 1-bedroom rents under $1,000/month. Amarillo, Lubbock, El Paso, Waco, and Corpus Christi all offer quality apartments in the $820–$950 range. Even some suburbs of larger cities can dip below $1,000.",
  },
  {
    q: "What is a livable salary in Texas?",
    a: "For a single person renting in Texas, a salary of $36,000–$50,000 is generally livable. In cheaper cities like Amarillo or Lubbock, $36,000 is sufficient. In Austin or Dallas, you'd need $50,000–$65,000 to maintain the same standard of living.",
  },
  {
    q: "Is it better to rent or buy in Texas in 2026?",
    a: "For most renters in 2026, renting remains more flexible and affordable, especially in high-growth areas. Texas has no state income tax, but property taxes are among the highest in the nation (1.6-2.2% annually). Renting avoids property tax risk while building flexibility.",
  },
];

export default function CheapestCitiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "10 Cheapest Cities to Rent in Texas (2026)",
        description: "Find the most affordable places to rent in Texas with rent under $1,000/month.",
        datePublished: "2026-06-18",
        dateModified: "2026-06-18",
        author: { "@type": "Organization", name: "Texas Rent Finder" },
        publisher: { "@type": "Organization", name: "Texas Rent Finder", url: "https://texasrentfinder.com" },
        mainEntityOfPage: "https://texasrentfinder.com/blog/cheapest-cities-to-rent-in-texas",
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://texasrentfinder.com/blog" },
          { "@type": "ListItem", position: 3, name: "Cheapest Cities to Rent" },
        ],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      })}} />

      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link><span>/</span>
        <span className="text-gray-900 dark:text-white">Cheapest Cities</span>
      </nav>

      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Budget Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">10 Cheapest Cities to Rent in Texas (2026) — Under $1,000/Month</h1>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
        <span>June 18, 2026</span><span>·</span><span>By Texas Rent Finder</span><span>·</span><span>7 min read</span>
      </div>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-lg text-gray-600 leading-relaxed">
          Texas offers some of the most affordable rental markets in the United States. While cities like Austin and Dallas command premium prices, at least <strong>10 major Texas cities have average 1-bedroom rents under $1,000/month</strong>. Here&apos;s a data-driven breakdown of the cheapest places to live in the Lone Star State.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">The 10 Most Affordable Texas Cities</h2>
          <div className="space-y-4">
            {cheapestCities.map((c) => (
              <div key={c.rank} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{c.rank}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{c.city}</h3>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${c.avg1br}/mo</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pop. {c.population} · {c.highlights}</p>
                </div>
                <Link href={`/texas/${c.slug}`} className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex-shrink-0 mt-1">
                  View &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">What You Get for Under $1,000</h2>
          <p className="text-gray-600 leading-relaxed">
            In these affordable Texas cities, $900/month typically gets you: a 1-bedroom apartment (700-900 sq ft), in-unit washer/dryer, parking included, and access to community amenities like pools and gyms. Many complexes also offer move-in specials like reduced deposits or free first month.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Salary Required for Affordable Rent</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Using the 30% rule (rent = 30% of gross income):</p>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <strong>$820/month rent</strong> → $32,800 annual salary needed</li>
              <li>• <strong>$900/month rent</strong> → $36,000 annual salary needed</li>
              <li>• <strong>$950/month rent</strong> → $38,000 annual salary needed</li>
            </ul>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/blog/average-rent-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Average Rent in Texas →</p>
              <p className="text-xs text-gray-500">Full price comparison across 20+ cities</p>
            </Link>
            <Link href="/blog/best-apartments-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Best Apartments in Texas →</p>
              <p className="text-xs text-gray-500">Top-rated apartments by city</p>
            </Link>
            <Link href="/blog/guide-to-renting-in-houston" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Houston Rental Guide →</p>
              <p className="text-xs text-gray-500">Houston is one of the most affordable big cities</p>
            </Link>
            <Link href="/blog/renting-in-san-antonio" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">San Antonio Guide →</p>
              <p className="text-xs text-gray-500">Affordable big-city living</p>
            </Link>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Find Affordable Apartments</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Browse 5,600+ verified Texas apartments sorted by price. Find your budget-friendly home.</p>
          <Link href="/" className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">Browse by Price &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
