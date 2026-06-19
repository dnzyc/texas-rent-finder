import Link from "next/link";
import type { Metadata } from "next";
import { InteractiveList } from "@/components/InteractiveList";
import { FilterState } from "@/types";
import { Building2, Star, Target, Map, Zap, Banknote, ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

async function getTopRated() {
  const { data } = await supabase
    .from("places")
    .select("name, city, rating, review_count")
    .gt("review_count", 10)
    .order("rating", { ascending: false })
    .limit(6);
  return data || [];
}

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const topRated = await getTopRated();
  const filters: FilterState = {
    county: typeof params.county === "string" ? params.county : "",
    city: typeof params.city === "string" ? params.city : "",
    zip: typeof params.zip === "string" ? params.zip : "",
    minRating: typeof params.min_rating === "string" ? Number(params.min_rating) || 0 : 0,
    query: typeof params.q === "string" ? params.q : "",
  };

  return (
    <main id="main-content">
      {/* Hero Section — Massive Typography + Eyebrow Tag + Pill CTA */}
      <section className="relative pt-20 pb-40 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 dark:bg-emerald-500/10 dark:border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">Texas&apos;s #1 Apartment Finder</span>
            </div>

            {/* Massive Display Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.05] mb-6">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Texas Home</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              5,058 verified listings across Texas. Transparent pricing, real tenant ratings, and dedicated support — all free.
            </p>

            {/* CTA Buttons — Pill with trailing icon */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#listings"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Browse Apartments
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                href="/signup"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
                <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Features Section — Asymmetric Bento Grid */}
      <section className="py-32 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">Why Texas Rent Finder</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              The smartest way to find your next apartment
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              We verify every listing, publish real tenant ratings, and keep pricing transparent — so you can decide with confidence.
            </p>
          </div>

          {/* Bento Grid — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large card — spans 2 cols */}
            <div className="md:col-span-2 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Verified Listings</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Every property is manually verified for quality and accuracy. We check photos, pricing, and availability so you never waste time on fake listings.
                  </p>
                </div>
              </div>
            </div>

            {/* Small card — stacked */}
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Transparent Ratings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Real tenant reviews with verified scores. No fake ratings — see what actual residents think.
              </p>
            </div>

            {/* Small card */}
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expert Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                24/7 dedicated team ready to help you find the right apartment. We answer questions and schedule tours.
              </p>
            </div>

            {/* Large card — spans 2 cols */}
            <div className="md:col-span-2 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <Map className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">All Texas Counties</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    From Houston to Dallas, Austin to San Antonio — we cover all 254 counties. Find apartments in any Texas city.
                  </p>
                </div>
              </div>
            </div>

            {/* Small card */}
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Application</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Streamlined process with direct contact to property managers. Apply online and get approved faster.
              </p>
            </div>

            {/* Small card */}
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center mb-4">
                <Banknote className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Price Transparency</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Real-time pricing data from thousands of apartments. Compare rents across cities and find the best deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section — Minimal Typography */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "5,058", label: "Active Rentals", color: "text-emerald-600 dark:text-emerald-400" },
              { value: "10K+", label: "Happy Tenants", color: "text-blue-600 dark:text-blue-400" },
              { value: "254", label: "Counties Covered", color: "text-amber-600 dark:text-amber-400" },
              { value: "< 2h", label: "Avg Response", color: "text-rose-600 dark:text-rose-400" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className={`text-4xl sm:text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Data Section — Clean Data Visualization */}
      <section className="py-32 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">Market Intelligence</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Texas Apartment Market Data (2026)
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Real statistics from 5,058 verified apartment listings across Texas
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { value: "5,058+", label: "Total Listings", sub: "Verified apartments" },
              { value: "50+", label: "Cities Covered", sub: "Major Texas cities" },
              { value: "254", label: "Counties", sub: "All Texas counties" },
              { value: "3.94/5", label: "Avg Rating", sub: "Tenant verified" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{item.value}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Rent by city */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">Average Rent by City (1BR)</h3>
            <div className="space-y-4">
              {[
                { city: "Austin", price: "$1,624", label: "Most Expensive", pct: 100 },
                { city: "Houston", price: "$1,200", label: "Mid-Range", pct: 74 },
                { city: "Dallas", price: "$1,150", label: "Mid-Range", pct: 71 },
                { city: "San Antonio", price: "$1,050", label: "Affordable", pct: 65 },
                { city: "Four Corners", price: "$833", label: "Most Affordable", pct: 51 },
              ].map((city, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="w-28 text-sm font-semibold text-gray-900 dark:text-white">{city.city}</div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" style={{ width: `${city.pct}%` }} />
                  </div>
                  <div className="w-28 text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{city.price}</p>
                    <p className="text-xs text-gray-400">{city.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — Clean Accordion */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "How many apartments are listed on Texas Rent Finder?", a: "We currently list over 5,058 verified apartment complexes across all 254 Texas counties, with new listings added daily from Houston, Dallas, San Antonio, Austin, and every major Texas city." },
              { q: "Is Texas Rent Finder free to use?", a: "Yes! Texas Rent Finder is completely free for renters. We never charge tenants for searching, comparing, or contacting properties. Our service is supported by property partnerships." },
              { q: "What is the average rent for apartments in Texas?", a: "The average 1BR rent in Texas is approximately $1,200/month, with Austin being the most expensive at $1,624 and Four Corners the most affordable at $833/month." },
              { q: "How are apartment ratings calculated?", a: "Ratings are based on verified tenant reviews, property amenities, location quality, and management responsiveness. All ratings are validated to ensure authenticity and accuracy." },
              { q: "Which Texas cities have the most apartments?", a: "Houston has the largest inventory with over 2,000 listings, followed by Dallas-Fort Worth (~1,500), San Antonio (~800), and Austin (~600). These four metro areas contain over 75% of all Texas apartment listings." },
            ].map((faq, i) => (
              <details key={i} className="group p-6 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between text-base font-semibold text-gray-900 dark:text-white list-none marker:hidden">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          {/* Info card */}
          <div className="mt-12 p-8 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What is Texas Rent Finder?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Texas Rent Finder is a free apartment search platform that lists 5,058+ verified apartment complexes across all 254 Texas counties. We provide transparent pricing, verified tenant ratings, and direct contact information for every listing.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section — Editorial Quote Layout */}
      <section className="py-32 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">Top Rated</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Highest-rated apartments in Texas
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Our highest-rated properties based on verified tenant reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRated.slice(0, 3).map((place, i) => (
              <div key={i} className="group p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
                {/* Quote mark */}
                <div className="text-5xl text-emerald-200 dark:text-emerald-800 font-serif leading-none mb-4">&ldquo;</div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < Math.round(place.rating || 0) ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-gray-700"}`} />
                  ))}
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">{place.rating?.toFixed(1)}</span>
                </div>

                {/* Review text */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {place.name} is one of the highest-rated properties in {place.city || "Texas"}, with{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{place.review_count}+ verified reviews</span>{' '}
                  and a {place.rating?.toFixed(1)} average rating.
                </p>

                {/* Attribution */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{place.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{place.city}, TX · {place.review_count} reviews</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Rated <span className="font-semibold text-gray-600 dark:text-gray-300">3.94 / 5</span> based on{' '}
              {topRated.reduce((sum, p) => sum + (p.review_count || 0), 0).toLocaleString()}+ verified tenant reviews
            </p>
          </div>
        </div>
      </section>

      {/* Renter Guides — Internal Blog Links for SEO */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">Renter Guides</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Expert guides for Texas renters
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Data-driven insights to help you find the best apartment at the right price
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/average-rent-in-texas" className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Market Data</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Average Rent in Texas (2026)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Compare rent prices across 30+ Texas cities with real data</p>
            </Link>

            <Link href="/blog/austin-vs-dallas-vs-houston" className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">City Comparison</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Austin vs Dallas vs Houston</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Which major Texas city offers the best value for your budget?</p>
            </Link>

            <Link href="/blog/texas-cities-rent-ranking" className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Rankings</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">25 Cities Rent Ranking</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">All 25 largest Texas cities ranked by average rent</p>
            </Link>

            <Link href="/blog/student-housing-in-texas" className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Student Guide</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Student Housing Guide</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Affordable apartments near Texas universities</p>
            </Link>

            <Link href="/blog/tenant-rights-in-texas" className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Legal</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Texas Tenant Rights</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Know your rights as a Texas renter</p>
            </Link>

            <Link href="/blog/cheapest-cities-to-rent-in-texas" className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Budget</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">10 Cheapest Cities in Texas</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Budget-friendly cities with rent under $1,000/month</p>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              View all 19 guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Listing Section — Interactive Map + List (UNCHANGED) */}
      <section id="listings">
        <InteractiveList initialFilters={filters} />
      </section>

      {/* Promo Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-xl font-semibold mb-2">New to Texas or planning a move?</p>
          <p className="text-blue-100 text-sm mb-6">
            Read our free guides on neighborhoods, tenant rights, and city comparisons.
          </p>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse Renter Guides
            <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
