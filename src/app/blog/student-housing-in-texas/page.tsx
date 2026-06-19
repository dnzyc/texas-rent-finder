import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Housing in Texas: Rent Guide by University City (2026)",
  description: "Compare rent prices near Texas universities. Find affordable student apartments in College Station, San Marcos, Denton, Lubbock, and more with real data.",
  openGraph: {
    title: "Student Housing in Texas (2026)",
    description: "Affordable student apartments near Texas universities.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/student-housing-in-texas" },
};

const universityData = [
  {
    university: "Texas A&M University",
    city: "College Station / Bryan",
    listings: 47,
    avgRent: 1166,
    neighborhoods: ["Northgate", "Southside", "Wellborn", "Bryan Central"],
    tips: "Leases sign months in advance — August move-ins book by February. Northgate is walkable to campus but pricier. Bryan offers 15-20% savings with a short drive.",
    budgetNote: "Most students share 2BR or 3BR to keep costs under $700/person.",
  },
  {
    university: "Texas State University",
    city: "San Marcos",
    listings: 38,
    avgRent: 1050,
    neighborhoods: ["Downtown San Marcos", "Wonderland of the Americas", "Thorpe Lane", "Aquarena Springs"],
    tips: "San Marcos is a small college town with limited supply — book early. Apartments along Aquarena Springs Drive are close to campus and transit. Downtown offers walkability to shops and restaurants.",
    budgetNote: "River areas and downtown command a premium; look east for better deals.",
  },
  {
    university: "University of North Texas / TWU",
    city: "Denton",
    listings: 42,
    avgRent: 1020,
    neighborhoods: ["Downtown Denton", "Rayzor Ranch", "Highland Village", "University Drive"],
    tips: "Denton has two universities (UNT and TWU), so demand is strong. Rayzor Ranch offers newer construction near UNT. Downtown is walkable with a lively music scene. Commuters can find cheaper options along I-35.",
    budgetNote: "Shared apartments near UNT average $650-750/person for a 2BR.",
  },
  {
    university: "Texas Tech University",
    city: "Lubbock",
    listings: 48,
    avgRent: 850,
    neighborhoods: ["Alfred S. Athens", "Tech Terrace", "North Overton", "South Plains"],
    tips: "Lubbock is one of the most affordable college towns in the US. North Overton has seen recent development with newer complexes. Tech Terrace is established and walkable. South Plains area offers the lowest prices.",
    budgetNote: "Studio and 1BR apartments often under $800 — some of the cheapest student housing in Texas.",
  },
  {
    university: "Baylor University",
    city: "Waco",
    listings: 73,
    avgRent: 920,
    neighborhoods: ["Downtown Waco", "East Waco", "Bellmead", "Hewitt"],
    tips: "Waco is a growing market with more supply than other college towns. Downtown has seen revitalization with new restaurants and shops. East Waco is up-and-coming with lower prices. Bellmead and Hewitt offer suburban options.",
    budgetNote: "Waco's larger listing count means more competition — negotiate for better rates.",
  },
];

const faqItems = [
  {
    q: "When should I start looking for student housing in Texas?",
    a: "Start searching 6-8 months before your move-in date. Most Texas university towns have lease cycles that start in August — popular apartments near campus book up by February or March. For fall semester, begin your search in January.",
  },
  {
    q: "What is the average rent for student apartments near Texas universities?",
    a: "Rent varies by city: College Station averages $1,166/month, San Marcos around $1,050, Denton $1,020, Lubbock $850, and Waco $920. These are overall averages — studios and shared apartments are significantly cheaper, typically $600-800/person.",
  },
  {
    q: "Can I afford student housing with a part-time job?",
    a: "In budget-friendly cities like Lubbock and Waco, a part-time job at 20 hours/week ($15/hr) earns roughly $1,300/month, which covers rent in a shared apartment. In pricier areas like College Station, you may need roommates or a higher-paying job to stay within budget.",
  },
  {
    q: "What should I look for in a student apartment lease?",
    a: "Check for: included utilities (water, trash, internet), parking fees, pet policies, subletting options, lease duration (9-12 months vs month-to-month), and any student-specific perks. Many complexes offer furnished options which save moving costs.",
  },
  {
    q: "Are there cheaper alternatives to apartment living near Texas universities?",
    a: "Yes. Shared houses, duplexes, and older apartment complexes often cost 20-30% less than newer student-focused developments. Living 2-3 miles from campus can save $100-200/month. Some students also find rooms for rent on local classifieds for under $500/month.",
  },
];

export default function StudentHousingTexasPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Student Housing in Texas: Rent Guide by University City (2026)",
        description: "Compare rent prices near Texas universities. Find affordable student apartments in College Station, San Marcos, Denton, Lubbock, and more.",
        datePublished: "2026-06-18",
        dateModified: "2026-06-18",
        author: { "@type": "Organization", name: "Texas Rent Finder" },
        publisher: { "@type": "Organization", name: "Texas Rent Finder", url: "https://texasrentfinder.com" },
        mainEntityOfPage: "https://texasrentfinder.com/blog/student-housing-in-texas",
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://texasrentfinder.com/blog" },
          { "@type": "ListItem", position: 3, name: "Student Housing in Texas" },
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
        <span className="text-gray-900 dark:text-white">Student Housing in Texas</span>
      </nav>

      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Student Guide</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">Student Housing in Texas: Rent Guide by University City (2026)</h1>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
        <span>June 18, 2026</span><span>·</span><span>By Texas Rent Finder</span><span>·</span><span>10 min read</span>
      </div>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-lg text-gray-600 leading-relaxed">
          Texas has 6+ major universities, each with a unique rental market shaped by student demand, local supply, and city growth. Whether you&apos;re heading to Texas A&M in College Station, Texas State in San Marcos, or Texas Tech in Lubbock, understanding rent prices and neighborhoods near campus can save you <strong>$2,000–$5,000 per year</strong>. Here&apos;s a data-driven guide to student housing across Texas.
        </p>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">University</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">City</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">Listings</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">Avg Rent</th>
                </tr>
              </thead>
              <tbody>
                {universityData.map((u) => (
                  <tr key={u.university} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <td className="py-2 text-gray-900 dark:text-white font-medium">{u.university}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{u.city}</td>
                    <td className="text-right py-2 text-gray-900 dark:text-white">{u.listings}</td>
                    <td className="text-right py-2 text-emerald-600 dark:text-emerald-400">${u.avgRent.toLocaleString()}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Statewide Texas 1BR average: $1,116/mo</p>
        </section>

        {/* College Station */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">College Station / Bryan — Texas A&M</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">47 listings</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Avg $1,166/mo</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Texas A&M&apos;s College Station campus drives one of the strongest student rental markets in the state. With 47 active listings across College Station and neighboring Bryan, students have options — but timing matters. Leases for August move-ins typically fill by February, so early searching is essential.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Top Neighborhoods</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[0].neighborhoods.join(" · ")}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Pro Tips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[0].tips}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Budget Reality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[0].budgetNote}</p>
            </div>
          </div>
        </section>

        {/* San Marcos */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">San Marcos — Texas State University</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">38 listings</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Avg ~$1,050/mo</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            San Marcos is a small college town where supply is limited and demand peaks before each semester. Texas State students benefit from a walkable downtown, river access, and a vibrant local scene — but should expect to book apartments early.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Top Neighborhoods</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[1].neighborhoods.join(" · ")}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Pro Tips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[1].tips}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Budget Reality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[1].budgetNote}</p>
            </div>
          </div>
        </section>

        {/* Denton */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Denton — UNT / TWU</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">42 listings</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Avg ~$1,020/mo</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Denton is home to both the University of North Texas and Texas Woman&apos;s University, creating steady rental demand. The city&apos;s downtown is known for its live music scene and walkability, while newer developments near Rayzor Ranch offer modern amenities for UNT students.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Top Neighborhoods</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[2].neighborhoods.join(" · ")}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Pro Tips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[2].tips}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Budget Reality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[2].budgetNote}</p>
            </div>
          </div>
        </section>

        {/* Lubbock */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Lubbock — Texas Tech University</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">48 listings</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Avg $850/mo</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Lubbock is one of the most affordable college towns in the entire country. Texas Tech students can find studios and 1BR apartments under $800/month — a rarity near a major university. The North Overton area has seen recent development with newer complexes, while South Plains offers the lowest prices.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Top Neighborhoods</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[3].neighborhoods.join(" · ")}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Pro Tips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[3].tips}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Budget Reality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[3].budgetNote}</p>
            </div>
          </div>
        </section>

        {/* Waco */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Waco — Baylor University</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">73 listings</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Avg $920/mo</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Waco is a growing market with the highest listing count among college towns in this guide. Baylor students benefit from more supply and competitive pricing. Downtown Waco has seen revitalization with new restaurants and shops, making it an increasingly attractive area for students.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Top Neighborhoods</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[4].neighborhoods.join(" · ")}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Pro Tips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[4].tips}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">Budget Reality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{universityData[4].budgetNote}</p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Tips for Student Renters</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Set a Realistic Budget</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">The 30% rule applies to students too. If you earn $1,000/month from a part-time job, aim for rent under $300/person. Shared apartments are the most common way to hit this target.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Find Roommates Early</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Splitting a 2BR or 3BR can cut your rent by 40-50%. Start coordinating with classmates before the lease cycle begins — most university housing boards and social groups are active in spring.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Time Your Lease Right</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">August is peak season in college towns. If your schedule allows, a May or June move-in can save 10-15%. Off-season leases also have more negotiating room.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Read the Full Lease</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Watch for hidden fees: parking ($50-150/mo), pet rent, trash valet, and amenity charges. Ask about included utilities and internet — some student complexes bundle these into rent.</p>
            </div>
          </div>
        </section>

        {/* Salary/Budget */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Salary / Budget Required</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            To comfortably afford student housing, you generally need to earn <strong>3x the monthly rent</strong> in gross income. Here&apos;s what that looks like for each city:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-sm min-w-[450px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">City</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">Avg Rent</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">Monthly Income Needed</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">Annual Salary Needed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">College Station</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$1,166</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$3,500</td>
                  <td className="text-right py-2 text-emerald-600 dark:text-emerald-400">$42,000</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">San Marcos</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$1,050</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$3,150</td>
                  <td className="text-right py-2 text-emerald-600 dark:text-emerald-400">$37,800</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Denton</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$1,020</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$3,060</td>
                  <td className="text-right py-2 text-emerald-600 dark:text-emerald-400">$36,720</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Lubbock</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$850</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$2,550</td>
                  <td className="text-right py-2 text-emerald-600 dark:text-emerald-400">$30,600</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Waco</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$920</td>
                  <td className="text-right py-2 text-gray-900 dark:text-white">$2,760</td>
                  <td className="text-right py-2 text-emerald-600 dark:text-emerald-400">$33,120</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Note: These figures are for living alone. Sharing with roommates can reduce the required income by 40-50%.</p>
        </section>

        {/* Related Guides */}
        <section className="border-t border-gray-200 pt-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/blog/cheapest-cities-to-rent-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Cheapest Cities to Rent in Texas →</p>
              <p className="text-xs text-gray-500">Budget-friendly options under $1,000/month</p>
            </Link>
            <Link href="/blog/average-rent-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Average Rent in Texas →</p>
              <p className="text-xs text-gray-500">Statewide rent comparison by city</p>
            </Link>
            <Link href="/blog/best-apartments-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Best Apartments in Texas →</p>
              <p className="text-xs text-gray-500">Top-rated apartments by city</p>
            </Link>
            <Link href="/blog/best-neighborhoods-in-austin" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Best Neighborhoods in Austin →</p>
              <p className="text-xs text-gray-500">Austin neighborhood guide for students</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Browse Apartments Near Texas Universities</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Find verified student-friendly apartments with real pricing, photos, and reviews.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/apartments/college-station" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">College Station →</Link>
            <Link href="/apartments/san-marcos" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">San Marcos →</Link>
            <Link href="/apartments/denton" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">Denton →</Link>
            <Link href="/apartments/lubbock" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">Lubbock →</Link>
            <Link href="/apartments/waco" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">Waco →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
