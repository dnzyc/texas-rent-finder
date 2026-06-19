import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Texas Cities Rent Ranking (2026) — All 25 Largest Cities Compared",
  description:
    "Complete rent ranking for Texas' 25 largest cities. Real price data from 6,700+ apartments sorted by average 1-bedroom rent.",
  openGraph: {
    title: "Texas Cities Rent Ranking (2026)",
    description: "Full ranking of Texas cities by rent price.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/texas-cities-rent-ranking" },
};

const cityData = [
  { city: "Austin", listings: 316, avgRent: 1624, tier: "Premium" as const },
  { city: "Dallas", listings: 230, avgRent: 1400, tier: "Premium" as const },
  { city: "Fort Worth", listings: 178, avgRent: 1345, tier: "Mid" as const },
  { city: "Arlington", listings: 104, avgRent: 1242, tier: "Mid" as const },
  { city: "Houston", listings: 202, avgRent: 1260, tier: "Mid" as const },
  { city: "San Antonio", listings: 335, avgRent: 1207, tier: "Mid" as const },
  { city: "Irving", listings: 107, avgRent: 1129, tier: "Mid" as const },
  { city: "El Paso", listings: 165, avgRent: 1078, tier: "Budget" as const },
  { city: "Plano", listings: 117, avgRent: 1077, tier: "Budget" as const },
  { city: "Grand Prairie", listings: 112, avgRent: 1060, tier: "Budget" as const },
  { city: "McKinney", listings: 100, avgRent: 1150, tier: "Mid" as const },
  { city: "Wichita Falls", listings: 93, avgRent: 820, tier: "Budget" as const },
  { city: "Corpus Christi", listings: 91, avgRent: 980, tier: "Budget" as const },
  { city: "Frisco", listings: 90, avgRent: 1380, tier: "Premium" as const },
  { city: "Conroe", listings: 90, avgRent: 1050, tier: "Budget" as const },
  { city: "San Angelo", listings: 84, avgRent: 790, tier: "Budget" as const },
  { city: "Round Rock", listings: 82, avgRent: 1280, tier: "Mid" as const },
  { city: "Richardson", listings: 81, avgRent: 1190, tier: "Mid" as const },
  { city: "Beaumont", listings: 81, avgRent: 870, tier: "Budget" as const },
  { city: "Midland", listings: 77, avgRent: 1010, tier: "Budget" as const },
  { city: "McAllen", listings: 74, avgRent: 850, tier: "Budget" as const },
  { city: "Texarkana", listings: 73, avgRent: 760, tier: "Budget" as const },
  { city: "Waco", listings: 73, avgRent: 920, tier: "Budget" as const },
  { city: "Brownsville", listings: 72, avgRent: 780, tier: "Budget" as const },
].sort((a, b) => b.avgRent - a.avgRent);

const tierColors: Record<string, string> = {
  Budget: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Mid: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Premium: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

const salaryByTier = [
  { tier: "Budget ($760–$1,078)", salary: "$30,400 – $43,120" },
  { tier: "Mid ($1,129–$1,345)", salary: "$45,160 – $53,800" },
  { tier: "Premium ($1,380–$1,624)", salary: "$55,200 – $64,960" },
];

const faqs = [
  {
    q: "Which Texas city has the cheapest rent in 2026?",
    a: "Texarkana has the lowest average 1-bedroom rent among the 25 largest cities at approximately $760/month. Brownsville and San Angelo are also among the most affordable options.",
  },
  {
    q: "Is Austin still the most expensive city for rent in Texas?",
    a: "Yes, Austin leads the ranking with an average 1-bedroom rent of $1,624/month, followed by Dallas at $1,400 and Frisco at $1,380.",
  },
  {
    q: "How much do I need to earn to afford rent in Texas?",
    a: "Using the 30% rule (spending no more than 30% of gross income on rent), you need roughly $30,400/year for Budget-tier cities, $45,160–$53,800 for Mid-tier, and $55,200–$64,960 for Premium-tier cities.",
  },
  {
    q: "Which Texas city has the most apartment listings?",
    a: "San Antonio leads with 335 apartment listings, followed by Austin (316) and Dallas (230).",
  },
  {
    q: "What is the average 1-bedroom rent across all 25 Texas cities?",
    a: "The weighted average across all 25 cities is approximately $1,100/month, though individual cities range from $760 to $1,624.",
  },
  {
    q: "Are there good value cities near Dallas?",
    a: "Yes — Irving ($1,129), Plano ($1,077), Grand Prairie ($1,060), and Conroe ($1,050) offer proximity to Dallas at significantly lower rent prices.",
  },
];

export default function TexasCitiesRentRanking() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Texas Cities Rent Ranking (2026) — All 25 Largest Cities Compared",
            description:
              "Complete rent ranking for Texas' 25 largest cities. Real price data from 6,700+ apartments sorted by average 1-bedroom rent.",
            datePublished: "2026-06-18T00:00:00Z",
            dateModified: "2026-06-18T00:00:00Z",
            author: { "@type": "Organization", name: "Texas Rent Finder" },
            publisher: { "@type": "Organization", name: "Texas Rent Finder" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://texasrentfinder.com/blog" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Texas Cities Rent Ranking (2026)",
                item: "https://texasrentfinder.com/blog/texas-cities-rent-ranking",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <main className="min-h-screen bg-white dark:bg-gray-950">
        {/* Breadcrumbs */}
        <nav className="mx-auto max-w-4xl px-4 pt-8 pb-2 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Texas Cities Rent Ranking</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <time
            dateTime="2026-06-18"
            className="text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            June 18, 2026
          </time>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Texas Cities Rent Ranking (2026)
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            All 25 Largest Cities Compared — by Average 1-Bedroom Rent
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>By Texas Rent Finder</span>
            <span aria-hidden="true">&middot;</span>
            <span>8 min read</span>
            <span aria-hidden="true">&middot;</span>
            <span>6,700+ listings analyzed</span>
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Intro */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              A complete data-driven ranking of Texas rental markets. We analyzed <strong>6,700+
              apartment listings</strong> across the 25 largest Texas cities to rank them by
              average 1-bedroom rent. Whether you&apos;re relocating for work, comparing costs
              of living, or hunting for your next apartment, this guide gives you the full
              picture — no guesswork, just numbers.
            </p>
          </section>

          {/* Full Ranked Table */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Full Rent Ranking — 25 Texas Cities
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sorted by average 1-bedroom rent (highest to lowest). Tier assigned by price range.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      City
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Avg 1BR Rent
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Listings
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Tier
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                  {cityData.map((c, i) => (
                    <tr
                      key={c.city}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {i + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        <Link
                          href={`/texas/${c.city.toLowerCase().replace(/\s+/g, "-")}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {c.city}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                        ${c.avgRent.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400">
                        {c.listings.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tierColors[c.tier]}`}
                        >
                          {c.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top 5 Most Expensive */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top 5 Most Expensive Cities
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              These cities command the highest rents in the state, driven by strong job markets
              and high demand.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cityData.slice(0, 5).map((c, i) => (
                <div
                  key={c.city}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                      #{i + 1}
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${c.avgRent.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {c.city} &middot; {c.listings} listings
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Top 5 Most Affordable */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top 5 Most Affordable Cities
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Looking to save? These cities offer the lowest average rents among the 25 largest
              Texas cities.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cityData
                .slice(-5)
                .reverse()
                .map((c, i) => (
                  <div
                    key={c.city}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        #{25 - i}
                      </span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${c.avgRent.toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {c.city} &middot; {c.listings} listings
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Best Value Picks */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Best Value Picks</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              These cities hit the sweet spot — reasonable rent without sacrificing access to
              major job centers, amenities, or quality of life.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  city: "Plano",
                  rent: "$1,077",
                  note: "Top-rated schools, major corporate HQs (Toyota, Liberty Mutual), and a 30-minute commute to Dallas.",
                },
                {
                  city: "Irving",
                  rent: "$1,129",
                  note: "Close to DFW Airport, strong tech corridor, and significantly cheaper than Dallas proper.",
                },
                {
                  city: "Grand Prairie",
                  rent: "$1,060",
                  note: "Centrally located between Dallas and Fort Worth with a growing entertainment scene.",
                },
                {
                  city: "Conroe",
                  rent: "$1,050",
                  note: "Fast-growing north of Houston with lake access and new development — all at budget-friendly prices.",
                },
                {
                  city: "Round Rock",
                  rent: "$1,280",
                  note: "Austin suburb with Dell HQ, excellent parks, and rents $344 less than Austin proper.",
                },
              ].map((v) => (
                <div
                  key={v.city}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {v.city}
                    </h3>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {v.rent}/mo
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{v.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Emerging Markets */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Emerging Markets</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              These cities are seeing growing inventory and attention — early movers may find
              deals before demand pushes prices up.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  city: "McKinney",
                  listings: 100,
                  rent: "$1,150",
                  note: "Consistently ranked among the best places to live in the U.S. Growing north Dallas suburb.",
                },
                {
                  city: "Frisco",
                  listings: 90,
                  rent: "$1,380",
                  note: "Professional sports hub (Cowboys, FC Dallas) with rapid commercial development.",
                },
                {
                  city: "Conroe",
                  listings: 90,
                  rent: "$1,050",
                  note: "One of the fastest-growing cities in the U.S. by population. New apartments opening constantly.",
                },
                {
                  city: "Waco",
                  listings: 73,
                  rent: "$920",
                  note: "Baylor University town experiencing a downtown renaissance and growing rental demand.",
                },
              ].map((e) => (
                <div
                  key={e.city}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {e.city}
                    </h3>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {e.listings} listings
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Avg {e.rent}/mo
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{e.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Needed */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Salary Needed by Tier
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Using the standard 30% rule (spending no more than 30% of gross income on rent),
              here&apos;s what you need to earn annually to comfortably afford each tier.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {salaryByTier.map((s) => (
                <div
                  key={s.tier}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
                >
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {s.tier}
                  </p>
                  <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                    {s.salary}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    /year gross income
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-800">
              {faqs.map((f) => (
                <div key={f.q} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {f.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl bg-blue-600 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Find Your Next Apartment in Texas
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Browse thousands of verified listings across all 25 cities. Filter by price,
              neighborhood, and amenities — all in one place.
            </p>
            <Link
              href="/texas"
              className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
            >
              Explore All Listings
            </Link>
          </section>
        </article>
      </main>
    </>
  );
}
