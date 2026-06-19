import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Texas Rental Regions Guide (2026) — DFW, Houston, Austin, and Beyond",
  description: "Compare Texas rental regions — DFW Metroplex, Houston metro, Austin corridor, Gulf Coast, and more. Real data from 40+ rental regions.",
  openGraph: {
    title: "Texas Rental Regions Guide (2026)",
    description: "Region-by-region rental analysis across Texas.",
    type: "article",
    publishedTime: "2026-06-18T00:00:00Z",
    authors: ["Texas Rent Finder"],
  },
  alternates: { canonical: "/blog/texas-rental-regions-guide" },
};

const regions = [
  { rank: 1, region: "DFW — Frisco / Plano / McKinney / Allen", listings: 436, metro: "DFW", highlight: "Top employer hub, fast-growing suburbs, top schools" },
  { rank: 2, region: "Houston — The Woodlands / Spring", listings: 401, metro: "Houston", highlight: "Corporate campuses, master-planned, Nature" },
  { rank: 3, region: "DFW — Highland Park / University Park", listings: 387, metro: "DFW", highlight: "Premium urban, walkable to SMU, luxury" },
  { rank: 4, region: "DFW — Southlake / Flower Mound / Coppell", listings: 354, metro: "DFW", highlight: "Affluent suburbs, DFW airport access" },
  { rank: 5, region: "Houston — Sugar Land / Katy / Richmond", listings: 353, metro: "Houston", highlight: "Family-oriented, great schools, value" },
  { rank: 6, region: "DFW — Irving / Arlington / Grand Prairie", listings: 347, metro: "DFW", highlight: "Central location, affordable, sports venues" },
  { rank: 7, region: "Austin — Round Rock / Cedar Park / Pflugerville", listings: 311, metro: "Austin", highlight: "Tech corridor, suburban comfort, new builds" },
  { rank: 8, region: "McAllen / Edinburg / Mission (RGV)", listings: 310, metro: "South Texas", highlight: "Lowest cost of living, border region, growing" },
  { rank: 9, region: "Austin — Downtown / West Lake / Lakeway", listings: 267, metro: "Austin", highlight: "Urban core, premium pricing, lakeside living" },
  { rank: 10, region: "Gulf Coast — Beaumont / Port Arthur / Galveston", listings: 260, metro: "Gulf Coast", highlight: "Coastal living, petrochemical jobs, affordable" },
  { rank: 11, region: "Houston — Pearland / Clear Lake / Friendswood", listings: 251, metro: "Houston", highlight: "NASA corridor, suburban, family-friendly" },
  { rank: 12, region: "Brazos Valley — Brenham / Huntsville", listings: 246, metro: "Central", highlight: "College towns, low cost, rural charm" },
  { rank: 13, region: "DFW — Fort Worth / Keller", listings: 229, metro: "DFW", highlight: "Western DFW, stockyards, growing tech scene" },
  { rank: 14, region: "Central Texas — Abilene / San Angelo", listings: 225, metro: "Central", highlight: "Military towns, very affordable, stable" },
  { rank: 15, region: "El Paso", listings: 205, metro: "West Texas", highlight: "Border city, military, unique culture" },
  { rank: 16, region: "Houston — Cypress / Tomball", listings: 193, metro: "Houston", highlight: "NW Houston growth corridor, new construction" },
  { rank: 17, region: "North Central — Wichita Falls / Sherman", listings: 177, metro: "North Texas", highlight: "Small-town feel, military bases, affordable" },
  { rank: 18, region: "East Texas — Tyler / Longview", listings: 174, metro: "East Texas", highlight: "Piney Woods, rose capital, outdoor living" },
  { rank: 19, region: "Midland-Odessa", listings: 145, metro: "Permian Basin", highlight: "Oil hub, high wages, boom-bust cycles" },
  { rank: 20, region: "Brownsville-Harlingen", listings: 137, metro: "Rio Grande Valley", highlight: "Lowest rents in state, growing metro" },
];

const dfwSubRegions = [
  { name: "Frisco / Plano / McKinney / Allen", listings: 436, rent: "$1,350–$2,200", vibe: "Corporate campuses (Toyota, Liberty Mutual), top-rated schools, legacy West & The Star. Fastest-growing suburbs in Texas." },
  { name: "Highland Park / University Park", listings: 387, rent: "$1,800–$3,500+", vibe: "Walkable urban core, SMU-adjacent, Highland Park Village shopping. Premium pricing for Dallas's most prestigious address." },
  { name: "Southlake / Flower Mound / Coppell", listings: 354, rent: "$1,400–$2,400", vibe: "Affluent suburbs, DFW Airport access, Southlake Town Square. Quiet streets with quick commutes to both Dallas and Fort Worth." },
  { name: "Irving / Arlington / Grand Prairie", listings: 347, rent: "$1,050–$1,700", vibe: "Central DFW, affordable, entertainment district (AT&T Stadium, Six Flags). Best value in the metro." },
  { name: "Fort Worth / Keller", listings: 229, rent: "$1,100–$1,900", vibe: "Stockyards heritage, Sundance Square, growing tech. Western DFW with its own identity." },
];

const houstonSubRegions = [
  { name: "The Woodlands / Spring", listings: 401, rent: "$1,300–$2,100", vibe: "ExxonMobil campus, Hughes Landing, tree-lined paths. Master-planned perfection with corporate anchor tenants." },
  { name: "Sugar Land / Katy / Richmond", listings: 353, rent: "$1,100–$1,500", vibe: "Fort Bend ISD schools, imperial sugar heritage, Katy Mills. Family-first with strong resale values." },
  { name: "Pearland / Clear Lake / Friendswood", listings: 251, rent: "$1,050–$1,500", vibe: "NASA Johnson Space Center corridor, Space Center Houston, waterfront parks. Suburban calm near aerospace jobs." },
  { name: "Cypress / Tomball", listings: 193, rent: "$1,000–$1,400", vibe: "NW Houston growth corridor, new construction, Bridgeland and Towne Lake communities." },
];

const austinSubRegions = [
  { name: "Round Rock / Cedar Park / Pflugerville", listings: 311, rent: "$1,250–$1,900", vibe: "Dell Technologies HQ, new Apple campus nearby, affordable by Austin standards. Best suburban value in the corridor." },
  { name: "Downtown / West Lake / Lakeway", listings: 267, rent: "$1,600–$3,000+", vibe: "Lady Bird Lake trail, 6th Street, Lake Travis access. Premium urban and lakeside living at Austin's highest price points." },
];

const faqItems = [
  {
    q: "Which Texas region has the most rental listings?",
    a: "The DFW Metroplex leads with over 2,000 listings across its sub-regions — Frisco/Plano/McKinney alone has 436 listings. Houston metro follows with 1,200+ listings across its four major sub-regions.",
  },
  {
    q: "What is the cheapest region to rent in Texas?",
    a: "The Rio Grande Valley (Brownsville-Harlingen) and McAllen-Edinburg-Mission offer the lowest rents in the state, with 1BR apartments often starting under $900. Central Texas (Abilene/San Angelo) and El Paso are also among the most affordable, with median rents well below the state average.",
  },
  {
    q: "Which region is best for tech workers?",
    a: "Austin's Round Rock/Cedar Park corridor and DFW's Frisco/Plano area are the top tech hubs. Austin has Tesla, Apple, Samsung, and Oracle; DFW has Toyota, Liberty Mutual, and a rapidly growing startup scene. Both offer suburban comfort with tech-corridor salaries.",
  },
  {
    q: "Is Houston or DFW better for renters?",
    a: "Houston offers slightly lower average rents ($1,200 vs $1,350 for 1BR) but higher utility costs due to humidity. DFW has more sub-regions and slightly lower property taxes. Both have no state income tax. Choose Houston if you work in energy/healthcare; choose DFW if you work in corporate/tech.",
  },
  {
    q: "What region should I choose if I have a family?",
    a: "Top family regions: DFW's Frisco/Plano (best schools), Houston's Sugar Land/Katy (Fort Bend ISD), and Austin's Round Rock/Cedar Park (Round Rock ISD). All three offer master-planned communities, parks, and family-oriented amenities.",
  },
  {
    q: "How do I compare regions using Texas Rent Finder?",
    a: "Use the region filter on our homepage to sort listings by metro area. Each region page shows average rent, listings count, and nearby amenities. You can also use our rent-by-county data to compare specific areas side by side.",
  },
];

export default function TexasRentalRegionsGuidePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Texas Rental Regions Guide (2026) — DFW, Houston, Austin, and Beyond",
        description: "Compare Texas rental regions — DFW Metroplex, Houston metro, Austin corridor, Gulf Coast, and more. Real data from 40+ rental regions.",
        datePublished: "2026-06-18",
        dateModified: "2026-06-18",
        author: { "@type": "Organization", name: "Texas Rent Finder" },
        publisher: { "@type": "Organization", name: "Texas Rent Finder", url: "https://texasrentfinder.com" },
        mainEntityOfPage: "https://texasrentfinder.com/blog/texas-rental-regions-guide",
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://texasrentfinder.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://texasrentfinder.com/blog" },
          { "@type": "ListItem", position: 3, name: "Texas Rental Regions Guide" },
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
        <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400">Blog</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">Texas Rental Regions Guide</span>
      </nav>

      <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Regional Analysis</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">Texas Rental Regions Guide (2026) — DFW, Houston, Austin, and Beyond</h1>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
        <span>June 18, 2026</span>
        <span>·</span>
        <span>By Texas Rent Finder</span>
        <span>·</span>
        <span>8 min read</span>
      </div>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-lg text-gray-600 leading-relaxed">
          Texas isn&apos;t one rental market — it&apos;s 40+. From the booming suburbs of DFW to the coastal charm of Galveston, every region offers a different price point, lifestyle, and job market. We analyzed <strong>5,800+ verified listings</strong> across 20+ rental regions to map out exactly what you can expect in each corner of the Lone Star State.
        </p>

        {/* Top Regions Table */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Top 20 Texas Rental Regions by Listings</h2>
          <p className="text-gray-600 leading-relaxed">
            Listings count is a direct signal of rental availability and competition. More listings mean more options — and more leverage for renters.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300 w-8">#</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">Region</th>
                  <th className="text-right py-2 text-gray-600 dark:text-gray-300">Listings</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">Key Characteristic</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.rank} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <td className="py-2 text-gray-500">{r.rank}</td>
                    <td className="py-2 text-gray-900 dark:text-white font-medium">{r.region}</td>
                    <td className="py-2 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{r.listings}</td>
                    <td className="py-2 text-gray-500 dark:text-gray-400 text-xs">{r.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DFW Deep Dive */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">DFW Metroplex — 1,753 Total Listings</h2>
          <p className="text-gray-600 leading-relaxed">
            The Dallas-Fort Worth Metroplex is the largest rental market in Texas by region count. With five distinct sub-regions, DFW offers everything from premium urban living in Highland Park to affordable suburban comfort in Irving and Arlington.
          </p>
          <div className="space-y-3 mt-4">
            {dfwSubRegions.map((sub) => (
              <div key={sub.name} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{sub.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sub.vibe}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{sub.rent}</p>
                    <p className="text-xs text-gray-500 mt-1">{sub.listings} listings</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Houston Deep Dive */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Houston Metro — 1,198 Total Listings</h2>
          <p className="text-gray-600 leading-relaxed">
            Houston&apos;s rental market spans from The Woodlands in the north to Pearland in the south. Each sub-region caters to different industries and lifestyles — energy professionals in The Woodlands, aerospace workers in Clear Lake, families in Sugar Land.
          </p>
          <div className="space-y-3 mt-4">
            {houstonSubRegions.map((sub) => (
              <div key={sub.name} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{sub.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sub.vibe}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{sub.rent}</p>
                    <p className="text-xs text-gray-500 mt-1">{sub.listings} listings</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Austin Deep Dive */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Austin Corridor — 578 Total Listings</h2>
          <p className="text-gray-600 leading-relaxed">
            Austin remains Texas&apos;s most expensive rental market, but the corridor suburbs offer strong value. Round Rock and Cedar Park have attracted major tech employers (Dell, Apple) while maintaining rents 25–35% below downtown Austin.
          </p>
          <div className="space-y-3 mt-4">
            {austinSubRegions.map((sub) => (
              <div key={sub.name} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{sub.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sub.vibe}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{sub.rent}</p>
                    <p className="text-xs text-gray-500 mt-1">{sub.listings} listings</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* South Texas / RGV */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">South Texas &amp; Rio Grande Valley — 447 Total Listings</h2>
          <p className="text-gray-600 leading-relaxed">
            The RGV is Texas&apos;s most affordable rental market. McAllen-Edinburg-Mission (310 listings) and Brownsville-Harlingen (137 listings) offer 1BR apartments starting under $900. The region is experiencing steady growth driven by healthcare, education, and cross-border trade.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">McAllen / Edinburg / Mission</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">310 listings · $850–$1,300</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Growing metro, UTRGV campus, medical center hub.</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">Brownsville-Harlingen</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">137 listings · $800–$1,200</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Lowest rents in Texas, SpaceX proximity, Gulf access.</p>
            </div>
          </div>
        </section>

        {/* Gulf Coast / East Texas */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Gulf Coast &amp; East Texas — 580 Total Listings</h2>
          <p className="text-gray-600 leading-relaxed">
            Coastal and eastern Texas offer a different pace of life. Gulf Coast (Beaumont/Port Arthur/Galveston) has 260 listings anchored by petrochemical and maritime industries. East Texas (Tyler/Longview) brings piney woods charm with 174 listings and some of the lowest costs of living in the state.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">Gulf Coast</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">260 listings · $900–$1,500</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Beaumont/Port Arthur/Galveston. Coastal living, refinery jobs, beach access.</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">East Texas</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">174 listings · $850–$1,200</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tyler/Longview. Rose capital, pine forests, outdoor recreation.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">Brazos Valley</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">246 listings · $900–$1,350</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Brenham/Huntsville. College towns, rural charm, low cost of living.</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">Midland-Odessa</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">145 listings · $1,100–$1,800</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Permian Basin oil hub. Highest wages in Texas, volatile rents.</p>
            </div>
          </div>
        </section>

        {/* Decision Matrix */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Which Region Is Right for You?</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">If you need…</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">Go to</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-300">Why</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Lowest rent</td>
                  <td className="py-2 text-gray-900 dark:text-white">RGV / Brownsville</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">1BR under $900, low cost of living</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Best schools</td>
                  <td className="py-2 text-gray-900 dark:text-white">DFW Frisco/Plano</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">Top-rated ISDs, family-oriented</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Tech jobs</td>
                  <td className="py-2 text-gray-900 dark:text-white">Austin Round Rock</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">Apple, Dell, Tesla, Samsung corridors</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Energy sector</td>
                  <td className="py-2 text-gray-900 dark:text-white">Houston The Woodlands</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">ExxonMobil, Shell, energy HQs</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Luxury urban</td>
                  <td className="py-2 text-gray-900 dark:text-white">DFW Highland Park</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">Premium address, walkable, upscale</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Value for money</td>
                  <td className="py-2 text-gray-900 dark:text-white">Houston Sugar Land/Katy</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">Great schools, lower rent, family</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Coastal living</td>
                  <td className="py-2 text-gray-900 dark:text-white">Galveston / Gulf Coast</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">Beach access, maritime jobs, mild winters</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-900 dark:text-white font-medium">Small-town feel</td>
                  <td className="py-2 text-gray-900 dark:text-white">East Texas / Brazos Valley</td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">Piney Woods, low cost, outdoor life</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Internal Links */}
        <section className="border-t border-gray-200 pt-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/blog/average-rent-in-texas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Average Rent in Texas →</p>
              <p className="text-xs text-gray-500">Compare prices across all cities</p>
            </Link>
            <Link href="/blog/austin-vs-dallas-vs-houston" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Austin vs Dallas vs Houston →</p>
              <p className="text-xs text-gray-500">Head-to-head metro comparison</p>
            </Link>
            <Link href="/blog/moving-to-dallas" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Moving to Dallas →</p>
              <p className="text-xs text-gray-500">Complete DFW relocation guide</p>
            </Link>
            <Link href="/blog/guide-to-renting-in-houston" className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Houston Guide →</p>
              <p className="text-xs text-gray-500">Detailed Houston rental guide</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Find Your Perfect Texas Region</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Browse 5,800+ verified listings across 20+ Texas regions. Filter by metro, price, and amenities.</p>
          <Link href="/" className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300">View All Listings &rarr;</Link>
        </div>
      </div>
    </main>
  );
}
