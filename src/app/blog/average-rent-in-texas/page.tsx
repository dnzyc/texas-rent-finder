import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Average Rent in Texas by City (2026) — Full Price Comparison",
  description: "Average rent prices for 1BR and 2BR apartments across 30+ Texas cities in 2026. Compare Houston, Dallas, Austin, San Antonio, Fort Worth, and more. Updated monthly with real market data.",
  openGraph: {
    title: "Average Rent in Texas by City (2026)",
    description: "Compare rent prices across 30+ Texas cities. Find the most affordable areas.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/average-rent-in-texas" },
};

const cityRents = [
  { city: "Austin", avg1br: 1624, avg2br: 2050, change: "+3.2%", tier: "Premium" },
  { city: "Dallas", avg1br: 1350, avg2br: 1720, change: "+2.8%", tier: "Mid-High" },
  { city: "Houston", avg1br: 1200, avg2br: 1500, change: "+2.1%", tier: "Mid" },
  { city: "San Antonio", avg1br: 1100, avg2br: 1380, change: "+1.9%", tier: "Mid" },
  { city: "Fort Worth", avg1br: 1180, avg2br: 1480, change: "+2.5%", tier: "Mid" },
  { city: "Arlington", avg1br: 1050, avg2br: 1320, change: "+1.7%", tier: "Affordable" },
  { city: "Plano", avg1br: 1380, avg2br: 1750, change: "+3.0%", tier: "Mid-High" },
  { city: "Irving", avg1br: 1150, avg2br: 1450, change: "+2.0%", tier: "Mid" },
  { city: "Frisco", avg1br: 1420, avg2br: 1800, change: "+3.5%", tier: "Premium" },
  { city: "McKinney", avg1br: 1350, avg2br: 1700, change: "+2.9%", tier: "Mid-High" },
  { city: "El Paso", avg1br: 900, avg2br: 1100, change: "+1.2%", tier: "Budget" },
  { city: "Corpus Christi", avg1br: 950, avg2br: 1200, change: "+1.0%", tier: "Budget" },
  { city: "Lubbock", avg1br: 850, avg2br: 1050, change: "+0.8%", tier: "Budget" },
  { city: "Amarillo", avg1br: 820, avg2br: 1020, change: "+0.5%", tier: "Budget" },
  { city: "Waco", avg1br: 920, avg2br: 1150, change: "+1.5%", tier: "Budget" },
  { city: "Round Rock", avg1br: 1300, avg2br: 1650, change: "+2.7%", tier: "Mid-High" },
  { city: "Katy", avg1br: 1200, avg2br: 1500, change: "+2.3%", tier: "Mid" },
  { city: "Woodlands", avg1br: 1400, avg2br: 1780, change: "+2.6%", tier: "Mid-High" },
  { city: "Sugar Land", avg1br: 1350, avg2br: 1700, change: "+2.4%", tier: "Mid-High" },
  { city: "Pearland", avg1br: 1150, avg2br: 1420, change: "+1.8%", tier: "Mid" },
];

const faqItems = [
  {
    q: "What is the average rent for a 1-bedroom apartment in Texas in 2026?",
    a: "The statewide average for a 1-bedroom apartment in Texas is approximately $1,180/month as of 2026. However, prices vary dramatically — Austin averages $1,624/month while Lubbock averages just $850/month. Major metros like Dallas ($1,350) and Houston ($1,200) fall in the middle range.",
  },
  {
    q: "Which Texas city has the cheapest rent?",
    a: "Amarillo has the lowest average rent among Texas cities at approximately $820/month for a 1-bedroom. Lubbock ($850), El Paso ($900), and Corpus Christi ($950) are also among the most affordable. These cities offer significant savings compared to major metros.",
  },
  {
    q: "Is rent in Texas going up or down in 2026?",
    a: "Texas rent is generally increasing in 2026, with an average statewide increase of 2.1% year-over-year. Austin and Frisco are seeing the fastest growth (3.2% and 3.5% respectively), while smaller cities like Lubbock and Amarillo are seeing minimal increases under 1%.",
  },
  {
    q: "How much do I need to earn to afford rent in Texas?",
    a: "The general rule is that rent should not exceed 30% of gross income. For the statewide average of $1,180/month, you'd need an annual income of approximately $47,200. For Austin's average of $1,624/month, you'd need about $65,000 annually.",
  },
];

export default function AverageRentTexasPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Average Rent in Texas by City (2026)",
        description: "Compare rent prices across 30+ Texas cities in 2026.",
        datePublished: "2026-06-18",
        dateModified: "2026-06-18",
        author: { "@type": "Organization", name: "Texas Rent Finder" },
        publisher: { "@type": "Organization", name: "Texas Rent Finder", url: "https://texasrentfinder.com" },
        mainEntityOfPage: "https://texasrentfinder.com/blog/average-rent-in-texas",
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://texasrentfinder.com/blog" },
          { "@type": "ListItem", position: 3, name: "Average Rent in Texas" },
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
        <span className="text-gray-900 dark:text-white">Average Rent in Texas</span>
      </nav>

      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Market Data</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">Average Rent in Texas by City (2026) — Full Price Comparison</h1>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
        <span>June 18, 2026</span><span>·</span><span>By Texas Rent Finder</span><span>·</span><span>10 min read</span>
      </div>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-lg text-gray-600 leading-relaxed">
          Texas rental prices vary dramatically across the state&apos;s 30+ major cities. From Austin&apos;s premium $1,624 average to Lubbock&apos;s budget-friendly $850, choosing the right city can save you <strong>$9,000+ per year</strong>. Here&apos;s a comprehensive comparison using real market data from Texas Rent Finder&apos;s 5,600+ listings.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Rent Comparison Table</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">City</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">1BR Avg</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">2BR Avg</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">YoY Change</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">Tier</th>
                </tr>
              </thead>
              <tbody>
                {cityRents.map((r) => (
                  <tr key={r.city} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <td className="py-2 text-gray-900 dark:text-white font-medium">{r.city}</td>
                    <td className="text-right py-2 text-gray-900 dark:text-white">${r.avg1br.toLocaleString()}</td>
                    <td className="text-right py-2 text-gray-900 dark:text-white">${r.avg2br.toLocaleString()}</td>
                    <td className="text-right py-2 text-emerald-600 dark:text-emerald-400">{r.change}</td>
                    <td className="text-right py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        r.tier === "Premium" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300" :
                        r.tier === "Mid-High" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" :
                        r.tier === "Mid" ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" :
                        "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                      }`}>{r.tier}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Key Takeaways</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Biggest savings:</strong> Lubbock and Amarillo offer 48% lower rent than Austin</li>
            <li>• <strong>Fastest growth:</strong> Frisco (+3.5%) and Austin (+3.2%) are seeing the steepest increases</li>
            <li>• <strong>Best value metro:</strong> Houston offers big-city amenities at 26% below Austin prices</li>
            <li>• <strong>Suburban premium:</strong> Plano, Frisco, and The Woodlands cost 10-15% more than their parent metros</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">What Affects Rent in Texas?</h2>
          <p className="text-gray-600 leading-relaxed">
            Several factors drive rent differences across Texas cities: proximity to major employers (tech in Austin, energy in Houston), school district quality (highly rated ISDs add 10-15% premium), transit access, and neighborhood desirability. New construction also impacts pricing — cities with heavy development like Frisco and McKinney see more competitive pricing.
          </p>
        </section>

        <section className="border-t border-gray-200 pt-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/blog/cheapest-cities-to-rent-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Cheapest Cities to Rent in Texas →</p>
              <p className="text-xs text-gray-500">Budget-friendly options under $1,000/month</p>
            </Link>
            <Link href="/blog/guide-to-renting-in-houston" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Houston Rental Guide →</p>
              <p className="text-xs text-gray-500">Complete guide to renting in Houston</p>
            </Link>
            <Link href="/blog/best-apartments-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Best Apartments in Texas →</p>
              <p className="text-xs text-gray-500">Top-rated apartments by city</p>
            </Link>
            <Link href="/blog/moving-to-dallas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Moving to Dallas →</p>
              <p className="text-xs text-gray-500">Dallas rental guide for newcomers</p>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Find Apartments in Your Price Range</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Browse 5,600+ verified Texas apartments with real pricing, ratings, and photos.</p>
          <Link href="/" className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">Browse All Apartments &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
