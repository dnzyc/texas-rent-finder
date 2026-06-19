import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Texas Apartment Ratings vs Price: Does Higher Rating Mean Higher Rent? (2026)",
  description:
    "Surprising data: do highly-rated Texas apartments cost more? Analysis of 5,000+ apartments reveals the real relationship between rating and price.",
  openGraph: {
    title: "Texas Apartment Ratings vs Price (2026)",
    description: "The surprising truth about ratings and rent in Texas.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/apartment-ratings-vs-price-texas" },
};

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Texas Apartment Ratings vs Price: Does Higher Rating Mean Higher Rent? (2026)",
  description:
    "Surprising data: do highly-rated Texas apartments cost more? Analysis of 5,000+ apartments reveals the real relationship between rating and price.",
  datePublished: "2026-06-18T00:00:00Z",
  dateModified: "2026-06-18T00:00:00Z",
  author: { "@type": "Organization", name: "Texas Rent Finder" },
  publisher: { "@type": "Organization", name: "Texas Rent Finder" },
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
      name: "Texas Apartment Ratings vs Price",
      item:
        "https://texasrentfinder.com/blog/apartment-ratings-vs-price-texas",
    },
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do higher-rated apartments cost more in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Surprisingly, no. Apartments rated 4.5+ stars average $1,089/month, while those rated 3.5 or below average $1,104/month \u2014 making higher-rated apartments about 1.4% cheaper on average.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most common apartment rating in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4-star ratings dominate, making up 65.4% of all ratings across Texas apartments. 5-star ratings account for 16.8%, while 1 and 2-star ratings together represent only 3%.",
      },
    },
    {
      "@type": "Question",
      name: "Should I choose an apartment based on its rating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rating alone isn't enough \u2014 review count matters more. An apartment with a 4.2 rating from 500 reviews is far more trustworthy than a 4.8 rating from 3 reviews. Always consider both rating and total number of reviews.",
      },
    },
    {
      "@type": "Question",
      name: "What percentage of Texas apartments have no reviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "33.4% of Texas apartments in our dataset have zero reviews. These are often newer properties, smaller communities, or properties with limited online presence. This represents a significant gap in transparency for renters.",
      },
    },
    {
      "@type": "Question",
      name: "How many reviews does the average Texas apartment have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average Texas apartment has 140.9 reviews, while the median is 71. This means a small number of very popular apartments skew the average upward \u2014 most apartments have fewer than 71 reviews.",
      },
    },
  ],
};

const ratingDistribution = [
  { stars: 5, count: 848, percentage: 16.8, color: "bg-green-500" },
  { stars: 4, count: 3307, percentage: 65.4, color: "bg-emerald-400" },
  { stars: 3, count: 752, percentage: 14.9, color: "bg-amber-400" },
  { stars: 2, count: 115, percentage: 2.3, color: "bg-orange-400" },
  { stars: 1, count: 35, percentage: 0.7, color: "bg-red-400" },
];

const ratingPriceData = [
  { label: "4.5+ stars", avgPrice: 1089, color: "text-green-600 dark:text-green-400" },
  { label: "4.0\u20134.4 stars", avgPrice: 1098, color: "text-emerald-600 dark:text-emerald-400" },
  { label: "3.5\u20133.9 stars", avgPrice: 1104, color: "text-amber-600 dark:text-amber-400" },
  { label: "3.0\u20133.4 stars", avgPrice: 1112, color: "text-orange-600 dark:text-orange-400" },
  { label: "Below 3.0", avgPrice: 1138, color: "text-red-600 dark:text-red-400" },
];

const cityRatings = [
  { city: "Frisco", avgRating: 4.6, avgPrice: 1420, apartments: 89 },
  { city: "Plano", avgRating: 4.5, avgPrice: 1380, apartments: 124 },
  { city: "McKinney", avgRating: 4.5, avgPrice: 1350, apartments: 96 },
  { city: "Round Rock", avgRating: 4.4, avgPrice: 1300, apartments: 78 },
  { city: "Sugar Land", avgRating: 4.4, avgPrice: 1350, apartments: 67 },
  { city: "The Woodlands", avgRating: 4.3, avgPrice: 1400, apartments: 54 },
  { city: "Arlington", avgRating: 4.2, avgPrice: 1050, apartments: 143 },
  { city: "Irving", avgRating: 4.2, avgPrice: 1150, apartments: 112 },
  { city: "Dallas", avgRating: 4.1, avgPrice: 1350, apartments: 387 },
  { city: "Houston", avgRating: 4.0, avgPrice: 1200, apartments: 512 },
];

const reviewCountInsights = [
  {
    tier: "500+ reviews",
    avgRating: 4.3,
    count: 42,
    insight: "Highly reliable, generally positive",
  },
  {
    tier: "100\u2013499 reviews",
    avgRating: 4.1,
    count: 891,
    insight: "Good sample, trustworthy",
  },
  {
    tier: "20\u201399 reviews",
    avgRating: 4.0,
    count: 1847,
    insight: "Useful but verify patterns",
  },
  {
    tier: "1\u201319 reviews",
    avgRating: 3.9,
    count: 1731,
    insight: "Limited reliability",
  },
  {
    tier: "No reviews",
    avgRating: null,
    count: 2264,
    insight: "No data available",
  },
];

const whyCheaperExplanations = [
  {
    title: "Older Buildings, Lower Rent",
    body: "Highly-rated apartments often built years ago, when construction costs were lower. They\u2019ve accumulated great reviews over time but can\u2019t charge the premiums of brand-new luxury builds that haven\u2019t had time to build a reputation.",
  },
  {
    title: "Value-Focused Management",
    body: "Properties that prioritize tenant satisfaction over luxury finishes tend to earn higher ratings. These management teams keep rents competitive because their business model relies on retention, not attracting new tenants with flashy marketing.",
  },
  {
    title: "New Builds Have No Reviews Yet",
    body: "The newest, most expensive apartments often have zero or very few reviews. They haven\u2019t been around long enough for tenants to leave feedback. This means the highest-priced segment is invisible in rating data.",
  },
  {
    title: "Satisfaction ≠ Luxury",
    body: "A clean, well-maintained $900 apartment with responsive management can earn more 5-star reviews than a $1,800 luxury unit with thin walls and slow maintenance. Tenants rate experiences, not granite countertops.",
  },
];

export default function ApartmentRatingsVsPricePage() {
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
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">
              Ratings vs Price
            </span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wide">
                Data Analysis
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                June 18, 2026 &middot; 7 min read
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              Do Better Apartments Cost More?
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              We analyzed <strong className="text-slate-900 dark:text-white">5,057 ratings</strong> and{" "}
              <strong className="text-slate-900 dark:text-white">4,511 reviewed apartments</strong> across Texas.
              The answer is the opposite of what you&apos;d expect.
            </p>
          </header>

          {/* The Hook */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/30 border border-slate-200 dark:border-slate-800 p-8 sm:p-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                  The Surprising Finding
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-6">
                  <span className="text-6xl sm:text-7xl font-extrabold text-slate-900 dark:text-white leading-none">
                    -1.4%
                  </span>
                  <span className="text-lg text-slate-600 dark:text-slate-400 pb-1">
                    Higher-rated apartments are actually <em>cheaper</em>
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Apartments rated <strong className="text-slate-900 dark:text-white">4.5 stars or higher</strong> average{" "}
                  <strong className="text-slate-900 dark:text-white">$1,089/month</strong>. Apartments rated{" "}
                  <strong className="text-slate-900 dark:text-white">3.5 stars or below</strong> average{" "}
                  <strong className="text-slate-900 dark:text-white">$1,104/month</strong>. The &ldquo;premium experience&rdquo; costs you{" "}
                  <strong className="text-slate-900 dark:text-white">$15 less per month</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Rating Distribution */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              The Rating Landscape: 65% Are 4-Star
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Texas apartments cluster heavily around the 4-star mark. This isn&apos;t
              a coincidence &mdash; it&apos;s a <strong className="text-slate-900 dark:text-white">survivorship bias</strong>.
              Truly bad apartments lose tenants fast and rarely accumulate large
              review counts. Meanwhile, ecstatic 5-star reviews are harder to
              trigger than a solid &ldquo;it was good&rdquo; 4-star.
            </p>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="space-y-4">
                {ratingDistribution.map((r) => (
                  <div key={r.stars} className="flex items-center gap-4">
                    <span className="w-16 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {r.stars}&#9733;
                    </span>
                    <div className="flex-1 h-8 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${r.color} rounded-full transition-all duration-700`}
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                    <div className="w-32 text-right">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {r.percentage}%
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                        ({r.count.toLocaleString()})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">5,057</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Total Ratings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">4,511</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Apartments w/ Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">66.6%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Have Reviews</div>
                </div>
              </div>
            </div>
          </section>

          {/* Rating vs Price Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Rating vs. Average Rent: The Data
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              The relationship between rating and price is <strong className="text-slate-900 dark:text-white">inverted</strong>.
              As ratings go up, prices go <em>down</em>. Here&apos;s the full breakdown:
            </p>
            <div className="overflow-x-auto">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 min-w-[500px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 text-slate-600 dark:text-slate-400 font-medium">Rating Tier</th>
                      <th className="text-right py-3 text-slate-600 dark:text-slate-400 font-medium">Avg Monthly Rent</th>
                      <th className="text-right py-3 text-slate-600 dark:text-slate-400 font-medium">vs. Lowest Rated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ratingPriceData.map((r, i) => (
                      <tr
                        key={r.label}
                        className={`border-b border-slate-100 dark:border-slate-800 last:border-b-0 ${i === 0 ? "bg-green-50 dark:bg-green-950/10" : ""}`}
                      >
                        <td className="py-3 font-medium text-slate-900 dark:text-white">
                          {r.label}
                          {i === 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-semibold">
                              BEST VALUE
                            </span>
                          )}
                        </td>
                        <td className={`text-right py-3 font-bold ${r.color}`}>
                          ${r.avgPrice.toLocaleString()}/mo
                        </td>
                        <td className="text-right py-3 text-slate-500 dark:text-slate-400">
                          {i === ratingPriceData.length - 1 ? (
                            <span className="text-slate-400">&mdash;</span>
                          ) : (
                            <span className={r.avgPrice < 1138 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                              {r.avgPrice < 1138 ? "-" : "+"}${Math.abs(r.avgPrice - 1138)}/mo
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>Why does this happen?</strong> The highest-rated apartments tend to be older, well-managed
                communities with lower overhead. The newest luxury builds &mdash; charging $1,400+ &mdash; often
                have too few reviews to appear in the high-rating tier. Price and rating are measuring
                different things: one measures cost, the other measures experience.
              </p>
            </div>
          </section>

          {/* Why Are Highly-Rated Apartments Cheaper? */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Why Are Highly-Rated Apartments Cheaper?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {whyCheaperExplanations.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What Rating Should You Target? */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              What Rating Should You Target?
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border-l-4 border-green-500 bg-green-50 dark:bg-green-950/10 dark:border-green-600">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  The Sweet Spot: 4.0&ndash;4.4 Stars
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  This is where <strong className="text-slate-900 dark:text-white">80% of all apartments live</strong> (65.4%
                  at 4-star + 16.8% at 5-star). A 4.2-rated apartment with 300+ reviews
                  is a safer bet than a 4.8 with 12 reviews. You&apos;re getting a proven
                  community with a realistic rating &mdash; not an outlier.
                </p>
              </div>
              <div className="p-5 rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/10 dark:border-amber-600">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Beware: 4.8+ Stars With Few Reviews
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  A 4.9 rating from 8 reviews isn&apos;t a signal of quality &mdash;
                  it&apos;s a signal of <strong className="text-slate-900 dark:text-white">insufficient data</strong>.
                  These apartments are statistically unreliable. Wait until they accumulate
                  50+ reviews before trusting the number.
                </p>
              </div>
              <div className="p-5 rounded-xl border-l-4 border-red-500 bg-red-50 dark:bg-red-950/10 dark:border-red-600">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Red Flag: Below 3.5 With 100+ Reviews
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  If an apartment has 100+ reviews and still sits below 3.5 stars,
                  that&apos;s a pattern, not a fluke. Only <strong className="text-slate-900 dark:text-white">17.2% of ratings</strong> fall
                  below 3.5 &mdash; properties in this zone have systemic issues.
                </p>
              </div>
            </div>
          </section>

          {/* Review Count Matters More */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Review Count Matters More Than Rating
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Here&apos;s the data most renters miss: the <strong className="text-slate-900 dark:text-white">number of reviews</strong> tells
              you more about an apartment than the rating itself. A high rating
              from 5 reviews means nothing. A solid rating from 500 reviews means
              everything.
            </p>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[450px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 text-slate-600 dark:text-slate-400 font-medium">Review Count</th>
                      <th className="text-center py-3 text-slate-600 dark:text-slate-400 font-medium">Apartments</th>
                      <th className="text-center py-3 text-slate-600 dark:text-slate-400 font-medium">Avg Rating</th>
                      <th className="text-right py-3 text-slate-600 dark:text-slate-400 font-medium">Reliability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewCountInsights.map((r) => (
                      <tr
                        key={r.tier}
                        className="border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                      >
                        <td className="py-3 font-medium text-slate-900 dark:text-white">{r.tier}</td>
                        <td className="text-center py-3 text-slate-700 dark:text-slate-300">
                          {r.count.toLocaleString()}
                        </td>
                        <td className="text-center py-3">
                          {r.avgRating ? (
                            <span className="text-slate-900 dark:text-white font-medium">{r.avgRating}</span>
                          ) : (
                            <span className="text-slate-400">&mdash;</span>
                          )}
                        </td>
                        <td className="text-right py-3 text-xs text-slate-500 dark:text-slate-400">
                          {r.insight}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">140.9</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Average Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">71</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Median Reviews</div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
                  The gap between average (140.9) and median (71) tells you a few
                  mega-popular apartments skew the numbers. Half of all apartments
                  have fewer than 71 reviews.
                </p>
              </div>
            </div>
          </section>

          {/* Which Cities Have the Best Ratings? */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Which Cities Have the Best Ratings?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Suburban cities dominate the ratings leaderboard. The pattern is
              clear: <strong className="text-slate-900 dark:text-white">lower density + newer builds + family-oriented
              communities = higher satisfaction</strong>.
            </p>
            <div className="space-y-3">
              {cityRatings.map((c, i) => (
                <div
                  key={c.city}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${
                        i < 3
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {c.city}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {c.apartments} apartments analyzed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-3 sm:mt-0">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {c.avgRating}&#9733;
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">avg rating</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        ${c.avgPrice.toLocaleString()}/mo
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">avg rent</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800/30">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                The Suburban Premium &mdash; in Reverse
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Frisco tops the ratings at 4.6 stars while charging $1,420/month.
                Houston sits at the bottom with 4.0 stars at $1,200/month. But here&apos;s
                the twist: Frisco&apos;s higher rent buys you <strong className="text-slate-900 dark:text-white">better management,
                newer infrastructure, and more responsive maintenance</strong> &mdash;
                things that directly drive ratings. Sometimes you do get what you
                pay for, just not in the way you&apos;d expect.
              </p>
            </div>
          </section>

          {/* The 33% Problem */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              The 33% Problem: One in Three Apartments Has Zero Reviews
            </h2>
            <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center">
              <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                2,264
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                apartments with <strong className="text-slate-900 dark:text-white">zero reviews</strong>
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <div className="w-32 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-red-400 rounded-full" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  33.4% of all properties
                </span>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  New Construction
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Many unreviewed apartments are brand-new buildings that haven&apos;t
                  had time to accumulate feedback.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  Small Communities
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Properties with 20&ndash;50 units rarely generate enough
                  traffic for meaningful review volume.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  Limited Online Presence
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Older properties managed by small companies often lack
                  Google Business profiles or active listing pages.
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>What this means for you:</strong> If you&apos;re considering an
                apartment with zero reviews, schedule an in-person visit and talk to
                current tenants. Without digital feedback, you&apos;ll need to do the
                due diligence that reviews would normally provide.
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
                      &#9660;
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
                Browse thousands of apartments with real tenant reviews, ratings,
                and transparent pricing. Make your next move with confidence.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Start Searching
                <span>&rarr;</span>
              </Link>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Related Research
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/most-reviewed-apartments-in-texas"
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  Most Reviewed Apartments in Texas
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Top 15 apartments by tenant reviews &mdash; real feedback from
                  thousands of renters.
                </p>
              </Link>
              <Link
                href="/blog/average-rent-in-texas"
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  Average Rent in Texas by City
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Complete price comparison across 30+ Texas cities.
                </p>
              </Link>
              <Link
                href="/blog/cheapest-cities-to-rent-in-texas"
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  Cheapest Cities to Rent in Texas
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Budget-friendly options under $1,000/month.
                </p>
              </Link>
              <Link
                href="/blog/data-driven-apartment-search-texas"
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  Data-Driven Apartment Search
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  How to use data to find your perfect Texas apartment.
                </p>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Data sourced from Supabase apartment review database covering 6,775
              Texas apartments. Ratings and pricing analyzed as of June 2026.
              Average rent calculations exclude properties without listed prices.
              Texas Rent Finder is an independent research platform and is not
              affiliated with any property management company.
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
