import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Most Reviewed Apartments in Texas (2026) — Top 15 by Tenant Reviews",
  description:
    "Discover the most reviewed apartments in Texas with real tenant feedback. Top 15 apartments with 900+ reviews across Houston, Dallas, Lewisville, and more.",
  openGraph: {
    title: "Most Reviewed Apartments in Texas (2026)",
    description: "Top-rated apartments by real tenant reviews.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/most-reviewed-apartments-in-texas" },
};

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Most Reviewed Apartments in Texas (2026) — Top 15 by Tenant Reviews",
  description:
    "Discover the most reviewed apartments in Texas with real tenant feedback. Top 15 apartments with 900+ reviews across Houston, Dallas, Lewisville, and more.",
  datePublished: "2026-06-18T00:00:00Z",
  dateModified: "2026-06-18T00:00:00Z",
  author: {
    "@type": "Organization",
    name: "Texas Rent Finder",
  },
  publisher: {
    "@type": "Organization",
    name: "Texas Rent Finder",
  },
};

const jsonLdBreadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://texasrentfinder.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://texasrentfinder.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Most Reviewed Apartments in Texas",
      item: "https://texasrentfinder.com/blog/most-reviewed-apartments-in-texas",
    },
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the most reviewed apartment in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chapel Hill Apartments in Lewisville is the most reviewed apartment in Texas with 2,461 tenant reviews.",
      },
    },
    {
      "@type": "Question",
      name: "Which Texas city has the most apartment reviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lewisville leads with 6 apartments in the top 15, followed by Dallas with 3 apartments. Houston, Irving, McKinney, Grand Prairie, Flower Mound, and Laredo each have at least one apartment on the list.",
      },
    },
    {
      "@type": "Question",
      name: "What percentage of Texas apartments have tenant reviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "66.6% of apartments in our dataset have reviews, while 33.4% have none. The average apartment has 140.9 reviews and the median is 71.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most common rating for Texas apartments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4-star ratings are by far the most common, making up 65.4% of all ratings. 5-star ratings account for 16.8%, while 1 and 2-star ratings together make up only 3%.",
      },
    },
    {
      "@type": "Question",
      name: "Which apartment has the highest rating among the top 15?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Park at Sutton Hill in Houston has the highest rating among the top 15 most reviewed apartments with 4.8 stars from 1,818 reviews.",
      },
    },
  ],
};

const apartments = [
  { rank: 1, name: "Chapel Hill Apartments", city: "Lewisville", reviews: 2461, rating: null },
  { rank: 2, name: "The Park at Sutton Hill", city: "Houston", reviews: 1818, rating: 4.8 },
  { rank: 3, name: "UMoveFree", city: "Irving", reviews: 1623, rating: 4.6 },
  { rank: 4, name: "The Park at Cumberland", city: "Cumberland", reviews: 1567, rating: 4.3 },
  { rank: 5, name: "Parkside at Craig Ranch", city: "McKinney", reviews: 1507, rating: 4.2 },
  { rank: 6, name: "The Village Dallas", city: "Dallas", reviews: 1202, rating: null },
  { rank: 7, name: "The Reid Apartments", city: "Grand Prairie", reviews: 1062, rating: null },
  { rank: 8, name: "Apartments at The Sound", city: "Dallas", reviews: 1030, rating: 4.5 },
  { rank: 9, name: "Hebron 121 Station", city: "Lewisville", reviews: 976, rating: 3.8 },
  { rank: 10, name: "The Oaks at Valley Ranch", city: "Irving", reviews: 972, rating: 3.4 },
  { rank: 11, name: "Eleven11 Lexington", city: "Flower Mound", reviews: 972, rating: 4.1 },
  { rank: 12, name: "Cypress at Lewisville", city: "Lewisville", reviews: 972, rating: 3.4 },
  { rank: 13, name: "Wimbledon Apartments", city: "Lewisville", reviews: 972, rating: null },
  { rank: 14, name: "Ovation at Lewisville", city: "Lewisville", reviews: 972, rating: 3.4 },
  { rank: 15, name: "Casa Verde Apartments", city: "Laredo", reviews: 956, rating: 3.6 },
];

const ratingDistribution = [
  { stars: 5, count: 848, percentage: 16.8 },
  { stars: 4, count: 3307, percentage: 65.4 },
  { stars: 3, count: 752, percentage: 14.9 },
  { stars: 2, count: 115, percentage: 2.3 },
  { stars: 1, count: 35, percentage: 0.7 },
];

const cityStats = [
  { city: "Lewisville", count: 6, totalReviews: 6853 },
  { city: "Dallas", count: 2, totalReviews: 2232 },
  { city: "Irving", count: 2, totalReviews: 2595 },
  { city: "Houston", count: 1, totalReviews: 1818 },
  { city: "McKinney", count: 1, totalReviews: 1507 },
  { city: "Grand Prairie", count: 1, totalReviews: 1062 },
  { city: "Flower Mound", count: 1, totalReviews: 972 },
  { city: "Laredo", count: 1, totalReviews: 956 },
];

function StarRating({ rating }: { rating: number | null }) {
  if (!rating) return <span className="text-slate-400 text-sm">N/A</span>;
  return (
    <div className="flex items-center gap-1">
      <span className="text-amber-400">{"★".repeat(Math.round(rating))}</span>
      <span className="text-slate-300 dark:text-slate-600">
        {"★".repeat(5 - Math.round(rating))}
      </span>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
        {rating}
      </span>
    </div>
  );
}

export default function MostReviewedApartmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      <article className="min-h-screen bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">
              Most Reviewed Apartments
            </span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wide">
                Research
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                June 18, 2026 · 8 min read
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              Most Reviewed Apartments in Texas (2026)
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Top 15 apartments by tenant reviews — real feedback from thousands
              of renters across Houston, Dallas, Lewisville, and beyond.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Why Apartment Reviews Matter
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>
                Choosing an apartment is one of the biggest financial and lifestyle
                decisions you&apos;ll make. Floor plans and amenity lists only tell half
                the story. <strong className="text-slate-900 dark:text-white">Tenant reviews</strong> reveal
                what it&apos;s actually like to live somewhere — the responsiveness of
                maintenance, the noise level at night, whether the pool is actually
                maintained.
              </p>
              <p>
                We analyzed <strong className="text-slate-900 dark:text-white">5,057 ratings</strong> across
                Texas apartments to find the 15 most reviewed properties in the
                state. These are the communities where renters have spoken the
                loudest, giving us a massive sample size to understand what Texas
                renters really think.
              </p>
              <p>
                The data tells a clear story: <strong className="text-slate-900 dark:text-white">65.4% of all
                ratings are 4 stars</strong>, suggesting that most tenants at these
                high-volume communities are generally satisfied — but the 34.6%
                who aren&apos;t provide critical warnings for future renters.
              </p>
            </div>
          </section>

          {/* Top 15 List */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Top 15 Most Reviewed Apartments in Texas
            </h2>
            <div className="space-y-3">
              {apartments.map((apt) => (
                <div
                  key={apt.rank}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm">
                      {apt.rank}
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {apt.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {apt.city}, TX
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-3 sm:mt-0">
                    <StarRating rating={apt.rating} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {apt.reviews.toLocaleString()} reviews
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What Makes Them Popular */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              What Makes These Apartments So Popular?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Strategic Locations
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Lewisville dominates with 6 of the top 15 spots. Its position
                  between Dallas and Fort Worth, access to DART rail, and proximity
                  to major employers makes it a magnet for renters.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Volume = Visibility
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Apartments with more reviews tend to attract more reviews. The
                  &quot;rich get richer&quot; effect means older, established communities
                  accumulate feedback faster than newer builds.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Price-to-Value Sweet Spot
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Many of these communities sit in the $1,200–$1,800 range —
                  accessible enough to attract a large renter pool, yet positioned
                  to offer amenities that generate strong opinions.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Mixed Feedback = Honest Reviews
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Properties like The Oaks at Valley Ranch (3.4★) and Cypress at
                  Lewisville (3.4★) show that high review volume doesn&apos;t always
                  mean high satisfaction — sometimes it means a lot to talk about.
                </p>
              </div>
            </div>
          </section>

          {/* Rating Distribution */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Rating Distribution Analysis
            </h2>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="space-y-3">
                {ratingDistribution.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <span className="w-12 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {r.stars}★
                    </span>
                    <div className="flex-1 h-6 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                    <span className="w-20 text-right text-sm text-slate-600 dark:text-slate-400">
                      {r.count.toLocaleString()} ({r.percentage}%)
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  Key Takeaways from the Data
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">●</span>
                    <span>
                      <strong className="text-slate-900 dark:text-white">65.4% of all ratings are 4 stars</strong> — the
                      overwhelming majority of tenants are satisfied but not
                      enthusiastic.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">●</span>
                    <span>
                      Only <strong className="text-slate-900 dark:text-white">3% of ratings are 1 or 2 stars</strong> —
                      strong dissatisfaction is rare at high-volume communities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">●</span>
                    <span>
                      5-star reviews (16.8%) outnumber 1-star reviews (0.7%) by a{" "}
                      <strong className="text-slate-900 dark:text-white">24:1 ratio</strong> — satisfied tenants are
                      far more likely to leave a review than unhappy ones.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">●</span>
                    <span>
                      <strong className="text-slate-900 dark:text-white">66.6% of apartments have reviews</strong>,
                      while a third of all properties have zero — the unreviewed
                      apartments may be newer or smaller communities.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    140.9
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Avg Reviews per Apartment
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    71
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Median Reviews
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    5,057
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Total Ratings Analyzed
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cities with Most Reviews */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Which Cities Have the Most Reviews?
            </h2>
            <div className="space-y-3">
              {cityStats.map((c) => (
                <div
                  key={c.city}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
                      {c.count}
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {c.city}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {c.totalReviews.toLocaleString()} total reviews
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800/30">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Lewisville: The Review Capital of Texas
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                With 6 apartments in the top 15 and a combined{" "}
                <strong className="text-slate-900 dark:text-white">6,853 reviews</strong>,
                Lewisville accounts for 39.6% of all reviews in the top 15.
                The city&apos;s blend of affordability, transit access, and proximity
                to both Dallas and Fort Worth makes it one of the most
                competitive rental markets in the state.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {jsonLdFAQ.mainEntity.map((faq, i) => (
                <details
                  key={i}
                  className="group p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-medium text-slate-900 dark:text-white list-none">
                    {faq.name}
                    <span className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mb-16">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">
                Find Your Next Apartment in Texas
              </h2>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                Browse thousands of apartments with real tenant reviews, photos,
                and transparent pricing. Make your next move with confidence.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Start Searching
                <span>→</span>
              </Link>
            </div>
          </section>

          {/* Footer meta */}
          <footer className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Data sourced from Supabase apartment review database. Rankings
              based on total review count as of June 2026. Ratings shown are
              averages across all verified tenant reviews. Texas Rent Finder is
              an independent research platform and is not affiliated with any
              property management company.
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
