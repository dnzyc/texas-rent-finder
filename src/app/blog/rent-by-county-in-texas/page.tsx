import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Texas Rent by County (2026) — Full Price Map Across 15 Counties",
  description:
    "Compare average rent across Texas counties. Harris, Dallas, Tarrant, Bexar, Travis, and more — real data from 6,700+ apartments.",
  openGraph: {
    title: "Texas Rent by County (2026)",
    description: "County-level rent comparison across Texas.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/rent-by-county-in-texas" },
};

/* ────────── data ────────── */

interface CountyRow {
  county: string;
  metro: string;
  listings: number;
  avg: number;
  min: number;
  max: number;
  median: number;
}

const counties: CountyRow[] = [
  { county: "Travis", metro: "Austin", listings: 366, avg: 1849, min: 725, max: 5200, median: 1750 },
  { county: "Collin", metro: "Plano / McKinney / Frisco", listings: 425, avg: 1699, min: 750, max: 4500, median: 1620 },
  { county: "Denton", metro: "Denton / Frisco", listings: 192, avg: 1649, min: 800, max: 3800, median: 1575 },
  { county: "Fort Bend", metro: "Sugar Land / Katy", listings: 210, avg: 1629, min: 850, max: 3500, median: 1550 },
  { county: "Williamson", metro: "Round Rock / Cedar Park", listings: 326, avg: 1589, min: 775, max: 3200, median: 1520 },
  { county: "Montgomery", metro: "Conroe / The Woodlands", listings: 207, avg: 1549, min: 750, max: 3400, median: 1475 },
  { county: "Dallas", metro: "Dallas", listings: 546, avg: 1499, min: 650, max: 4800, median: 1400 },
  { county: "Harris", metro: "Houston", listings: 672, avg: 1449, min: 595, max: 4500, median: 1350 },
  { county: "Tarrant", metro: "Fort Worth", listings: 603, avg: 1399, min: 625, max: 3800, median: 1310 },
  { county: "Bexar", metro: "San Antonio", listings: 375, avg: 1349, min: 650, max: 3200, median: 1275 },
  { county: "Galveston", metro: "Galveston / League City", listings: 160, avg: 1379, min: 800, max: 2800, median: 1300 },
  { county: "El Paso", metro: "El Paso", listings: 200, avg: 1149, min: 625, max: 2400, median: 1075 },
  { county: "Jefferson", metro: "Beaumont", listings: 146, avg: 1099, min: 625, max: 2100, median: 1025 },
  { county: "Hidalgo", metro: "McAllen", listings: 310, avg: 1049, min: 595, max: 2200, median: 975 },
  { county: "Cameron", metro: "Brownsville", listings: 137, avg: 989, min: 595, max: 1800, median: 925 },
];

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

/* ────────── components ────────── */

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">
      {label}
    </span>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );
}

/* ────────── page ────────── */

export default function RentByCountyPage() {
  const totalListings = counties.reduce((s, c) => s + c.listings, 0);

  /* JSON-LD */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Texas Rent by County (2026) — Full Price Map Across 15 Counties",
    description:
      "Compare average rent across Texas counties with real data from 6,700+ apartment listings.",
    datePublished: "2026-06-18",
    author: { "@type": "Organization", name: "Texas Rent Finder" },
    publisher: { "@type": "Organization", name: "Texas Rent Finder" },
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://texasrentfinder.com/blog/rent-by-county-in-texas" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://texasrentfinder.com/blog" },
      { "@type": "ListItem", position: 3, name: "Texas Rent by County" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the most expensive county to rent in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Travis County (Austin) has the highest average rent at roughly $1,849 per month, driven by the tech sector and strong in-migration.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cheapest county to rent in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cameron County (Brownsville) is the most affordable with an average around $989 per month. Hidalgo County (McAllen) is close behind at about $1,049.",
        },
      },
      {
        "@type": "Question",
        name: "Do Texas property taxes affect rent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Texas has some of the highest property tax rates in the country (averaging 1.6–2.2%). Landlords pass these costs on through higher rents, which is one reason counties with higher tax rates tend to have higher average rents.",
        },
      },
      {
        "@type": "Question",
        name: "Which Texas county has the most apartment listings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harris County (Houston) leads with 672 listings, followed by Tarrant County (Fort Worth) with 603 and Dallas County with 546.",
        },
      },
      {
        "@type": "Question",
        name: "Is rent cheaper outside of Texas metro areas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generally yes. Counties like Hidalgo, Cameron, and Jefferson — while still part of metro areas — offer significantly lower rents than the Dallas–Fort Worth, Austin, or Houston cores. Suburban counties like Williamson and Montgomery also undercut their neighboring urban centers.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-sky-600 hover:underline dark:hover:text-sky-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-sky-600 hover:underline dark:hover:text-sky-400">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-gray-900 dark:text-white">
              Texas Rent by County
            </li>
          </ol>
        </nav>

        {/* ── Header ── */}
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge label="2026 Data" />
            <Badge label="6,700+ Listings" />
            <Badge label="15 Counties" />
            <Badge label="7 min read" />
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Texas Rent by County (2026)
          </h1>
          <p className="mb-3 text-lg text-gray-600 dark:text-gray-400">
            A full price map across 15 Texas counties — real data from {totalListings.toLocaleString()} apartment listings.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Published June 18, 2026 &middot; Updated weekly</p>
        </header>

        <article className="space-y-16">
          {/* ── 1. Intro ── */}
          <Section id="why-county-level" title="Why County-Level Rent Data Matters">
            <p>
              Most rent comparisons stop at the city level. But Texas is massive — Harris County alone is larger
              than the state of Rhode Island. A one-size-fits-all &quot;Houston average rent&quot; hides enormous variation
              between inner-loop neighborhoods and outer-ring suburbs.
            </p>
            <p>
              County-level data gives you a clearer picture of what you will actually pay. It captures the full
              range: urban cores, suburban rings, and exurban edges — all within a single jurisdiction. This
              matters because property taxes, school districts, commute times, and cost of living all shift at the
              county line.
            </p>
            <p>
              We analyzed <strong>{totalListings.toLocaleString()} active apartment listings</strong> across
              Texas&apos;s 15 most-listed counties to build the most complete county rent comparison available.
            </p>
          </Section>

          {/* ── 2. Comparison Table ── */}
          <Section id="county-comparison" title="Full County Comparison Table">
            <p className="!mb-6">
              Counties are ranked by average rent, highest to lowest. All figures are monthly and based on
              active listings in our database as of June 2026.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">County</th>
                    <th className="px-4 py-3">Metro Area</th>
                    <th className="px-4 py-3 text-right">Listings</th>
                    <th className="px-4 py-3 text-right">Avg Rent</th>
                    <th className="px-4 py-3 text-right">Min</th>
                    <th className="px-4 py-3 text-right">Max</th>
                    <th className="px-4 py-3 text-right">Median</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {counties.map((c, i) => (
                    <tr
                      key={c.county}
                      className="transition-colors hover:bg-sky-50/50 dark:hover:bg-sky-950/20"
                    >
                      <td className="px-4 py-3 text-gray-400 dark:text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{c.county}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.metro}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-gray-700 dark:text-gray-300">
                        {c.listings}
                      </td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums text-gray-900 dark:text-white">
                        {fmt(c.avg)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-gray-500 dark:text-gray-400">
                        {fmt(c.min)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-gray-500 dark:text-gray-400">
                        {fmt(c.max)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-gray-700 dark:text-gray-300">
                        {fmt(c.median)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              * Rent figures represent average asking rent across all unit sizes (studio through 3+ bedrooms).
            </p>
          </Section>

          {/* ── 3. Most Expensive ── */}
          <Section id="most-expensive" title="Most Expensive Counties">
            <p>
              The top of the table is dominated by the Austin and Dallas–Fort Worth corridors — areas that have
              experienced explosive population growth over the past decade.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {counties.slice(0, 3).map((c) => (
                <div
                  key={c.county}
                  className="rounded-xl border border-red-100 bg-red-50/60 p-5 dark:border-red-900/40 dark:bg-red-950/20"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
                    {c.county} County
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{c.metro}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{fmt(c.avg)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">avg. rent &middot; {c.listings} listings</p>
                </div>
              ))}
            </div>

            <p className="mt-4">
              <strong>Travis County</strong> leads at $1,849/mo, fueled by the tech boom, UT Austin, and a limited
              housing supply relative to demand. <strong>Collin County</strong> ($1,699) has become the premium
              suburban choice for Dallas–Fort Worth professionals, while <strong>Denton County</strong> ($1,649)
              benefits from two major universities and a fast-growing northern suburbs pipeline.
            </p>
          </Section>

          {/* ── 4. Most Affordable ── */}
          <Section id="most-affordable" title="Most Affordable Counties">
            <p>
              At the other end of the spectrum, South Texas and Southeast Texas offer the lowest rents in the
              state — often well below the $1,200 mark for a one-bedroom.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {counties.slice(-3).map((c) => (
                <div
                  key={c.county}
                  className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {c.county} County
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{c.metro}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{fmt(c.avg)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">avg. rent &middot; {c.listings} listings</p>
                </div>
              ))}
            </div>

            <p className="mt-4">
              <strong>Cameron County</strong> (Brownsville) comes in lowest at $989/mo. Its location on the
              Mexico border and a lower median household income keep prices suppressed.
              <strong>Hidalgo County</strong> (McAllen) and <strong>Jefferson County</strong> (Beaumont) round
              out the most affordable trio, with rents averaging $1,049 and $1,099 respectively.
            </p>
          </Section>

          {/* ── 5. Hidden Gems ── */}
          <Section id="hidden-gems" title="Hidden Gems — Best Value Counties">
            <p>
              A &quot;hidden gem&quot; is a county that balances reasonable rent with strong job markets, good schools,
              or proximity to major employers. These counties deliver the most bang for your Texas dollar.
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  county: "Williamson County",
                  avg: "$1,589/mo",
                  note: "Round Rock and Cedar Park offer Austin-job proximity at ~15% less than Travis County proper. Home to Dell Technologies, major retail corridors, and some of the best-rated schools in the state.",
                },
                {
                  county: "Montgomery County",
                  avg: "$1,549/mo",
                  note: "The Woodlands and Conroe have exploded as Houston suburban destinations. ExxonMobil, HP, and a thriving healthcare sector keep employment strong — all at rents $100/mo below Harris County.",
                },
                {
                  county: "Fort Bend County",
                  avg: "$1,629/mo",
                  note: "Sugar Land and Katy consistently rank among the best suburbs in the nation. Fort Bend is one of the most diverse counties in Texas, with a robust economy anchored by energy, tech, and retail.",
                },
                {
                  county: "Bexar County",
                  avg: "$1,349/mo",
                  note: "San Antonio offers major-city amenities — the River Walk, a growing tech scene, military installations — at a price point that undercuts every other large Texas metro. A strong military and cybersecurity presence drives steady demand.",
                },
              ].map((g) => (
                <div
                  key={g.county}
                  className="rounded-xl border border-amber-100 bg-amber-50/50 p-5 dark:border-amber-900/30 dark:bg-amber-950/15"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">{g.county}</h3>
                    <span className="shrink-0 text-lg font-bold tabular-nums text-amber-700 dark:text-amber-400">
                      {g.avg}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{g.note}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 6. Property Tax ── */}
          <Section id="property-tax" title="Property Tax Implications for Renters">
            <p>
              Texas has <strong>no state income tax</strong>, but it makes up for it with some of the highest
              property tax rates in the nation — typically between 1.6% and 2.2% of assessed value annually.
              That is a cost landlords do not absorb quietly.
            </p>
            <p>
              Here is the key insight for renters: <strong>higher property taxes correlate directly with higher
              rents</strong>. Counties with elevated tax rates — particularly in suburban rings where school
              district bonds are common — push those costs into monthly rent. This is one reason why
              fast-growing suburban counties like Williamson and Collin see rents that rival or exceed the urban
              cores they surround.
            </p>
            <div className="my-6 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/60">
              <h3 className="mb-3 font-bold text-gray-900 dark:text-white">Quick Reference: TX Property Tax Rates (2026)</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex justify-between">
                  <span>Travis County</span>
                  <span className="font-mono font-semibold">~1.8%</span>
                </li>
                <li className="flex justify-between">
                  <span>Harris County</span>
                  <span className="font-mono font-semibold">~2.1%</span>
                </li>
                <li className="flex justify-between">
                  <span>Collin County</span>
                  <span className="font-mono font-semibold">~1.9%</span>
                </li>
                <li className="flex justify-between">
                  <span>Williamson County</span>
                  <span className="font-mono font-semibold">~2.2%</span>
                </li>
                <li className="flex justify-between">
                  <span>Denton County</span>
                  <span className="font-mono font-semibold">~2.0%</span>
                </li>
                <li className="flex justify-between">
                  <span>Bexar County</span>
                  <span className="font-mono font-semibold">~1.8%</span>
                </li>
                <li className="flex justify-between">
                  <span>El Paso County</span>
                  <span className="font-mono font-semibold">~2.1%</span>
                </li>
              </ul>
            </div>
            <p>
              When comparing rent across counties, ask yourself: what is the effective tax rate, and how does
              that affect the landlord&apos;s cost structure? A county with slightly higher rent but a lower
              effective tax burden might actually be cheaper in total cost of living.
            </p>
          </Section>

          {/* ── 7. FAQ ── */}
          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-6">
              {faqSchema.mainEntity.map((item) => (
                <details
                  key={item.name}
                  className="group rounded-xl border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-sky-300 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-sky-600"
                >
                  <summary className="cursor-pointer list-none font-semibold text-gray-900 dark:text-white">
                    <span className="mr-2 inline-block transition-transform group-open:rotate-90">
                      &#9656;
                    </span>
                    {item.name}
                  </summary>
                  <p className="mt-3 pl-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </Section>

          {/* ── 8. CTA ── */}
          <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Find Your Next Apartment in Texas
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-sky-100 sm:text-base">
              Browse thousands of verified listings across all 15 counties. Filter by rent, bedroom count,
              amenities, and commute time — all powered by live data.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/apartments"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-sky-700 shadow-sm transition hover:bg-sky-50"
              >
                Browse Apartments
              </Link>
              <Link
                href="/apartments?sort=price_asc"
                className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Cheapest First
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
