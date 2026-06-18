import Link from "next/link";
import { InteractiveList } from "@/components/InteractiveList";
import { FilterState } from "@/types";
import { Building2, Star, Target, Map, Zap, Banknote } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
      {/* Hero Section */}
        <section className="relative pt-16 pb-32 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-4">Trusted by thousands of Texas renters</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Find Your Perfect<br /><span className="text-emerald-600">Texas Home</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore 5,000+ verified listings across Texas. Transparent pricing, verified ratings, and dedicated support for your home journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#listings" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                  Browse Apartments
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7" /></svg>
                </Link>
                <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm motion-safe:animate-bounce flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            Scroll to explore
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Texas Rent Finder?</h2>
              <p className="text-lg text-gray-600">The smartest way to find your perfect apartment in Texas</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Building2, title: "Verified Listings", desc: "Every property is manually verified for quality and accuracy. We check photos, pricing, and availability so you don't waste time on fake listings." },
                { icon: Star, title: "Transparent Ratings", desc: "Real tenant reviews with verified scores. No fake ratings. See what actual residents think before you move in." },
                { icon: Target, title: "Expert Support", desc: "24/7 dedicated team ready to help you find the right apartment. We answer questions, schedule tours, and negotiate deals." },
                { icon: Map, title: "All Texas Counties", desc: "From Houston to Dallas, Austin to San Antonio — we cover all 254 counties. Find apartments in any Texas city." },
                { icon: Zap, title: "Fast Application", desc: "Streamlined process with direct contact to property managers. Apply online and get approved faster." },
                { icon: Banknote, title: "Price Transparency", desc: "Real-time pricing data from thousands of apartments. Compare rents across cities and find the best deal." },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="p-6 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 bg-white">
                    <div className="text-emerald-600 mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "5,000+", label: "Active Rentals" },
                { value: "10K+", label: "Happy Tenants" },
                { value: "254", label: "Counties Covered" },
                { value: "< 2h", label: "Avg Response" },
              ].map((stat, i) => (
                <div key={i} className="text-white">
                  <p className="text-3xl sm:text-4xl font-bold mb-1">{stat.value}</p>
                  <p className="text-emerald-100 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Data Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Texas Apartment Market Data (2026)</h2>
              <p className="text-lg text-gray-600">Real statistics from 5,058 verified apartment listings across Texas</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { value: "5,058+", label: "Total Listings", sub: "Verified apartments" },
                { value: "50+", label: "Cities Covered", sub: "Major Texas cities" },
                { value: "254", label: "Counties", sub: "All Texas counties" },
                { value: "3.94/5", label: "Avg Rating", sub: "Tenant verified" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-gray-100 text-center">
                  <p className="text-2xl font-bold text-emerald-600 mb-1">{item.value}</p>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Average Rent by City (1BR)</h3>
              <div className="space-y-3">
                {[
                  { city: "Austin", price: "$1,624", label: "Most Expensive", pct: 100 },
                  { city: "Houston", price: "$1,200", label: "Mid-Range", pct: 74 },
                  { city: "Dallas", price: "$1,150", label: "Mid-Range", pct: 71 },
                  { city: "San Antonio", price: "$1,050", label: "Affordable", pct: 65 },
                  { city: "Four Corners", price: "$833", label: "Most Affordable", pct: 51 },
                ].map((city, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                    <div className="w-24 text-sm font-medium text-gray-900">{city.city}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" style={{ width: `${city.pct}%` }} />
                    </div>
                    <div className="w-24 text-right">
                      <p className="text-sm font-bold text-gray-900">{city.price}</p>
                      <p className="text-xs text-gray-500">{city.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "How many apartments are listed on Texas Rent Finder?", a: "We currently list over 5,058 verified apartment complexes across all 254 Texas counties, with new listings added daily from Houston, Dallas, San Antonio, Austin, and every major Texas city." },
                { q: "Is Texas Rent Finder free to use?", a: "Yes! Texas Rent Finder is completely free for renters. We never charge tenants for searching, comparing, or contacting properties. Our service is supported by property partnerships." },
                { q: "What is the average rent for apartments in Texas?", a: "The average 1BR rent in Texas is approximately $1,200/month, with Austin being the most expensive at $1,624 and Four Corners the most affordable at $833/month." },
                { q: "How are apartment ratings calculated?", a: "Ratings are based on verified tenant reviews, property amenities, location quality, and management responsiveness. All ratings are validated to ensure authenticity and accuracy." },
                { q: "Which Texas cities have the most apartments?", a: "Houston has the largest inventory with over 2,000 listings, followed by Dallas-Fort Worth (~1,500), San Antonio (~800), and Austin (~600). These four metro areas contain over 75% of all Texas apartment listings." },
              ].map((faq, i) => (
                <details key={i} className="group p-5 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer">
                  <summary className="flex items-center justify-between text-lg font-medium text-gray-900 list-none">
                    {faq.q}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Texas Rent Finder?</h3>
              <p className="text-gray-600 leading-relaxed">Texas Rent Finder is a free apartment search platform that lists 5,058+ verified apartment complexes across all 254 Texas counties. We provide transparent pricing, verified tenant ratings, and direct contact information for every listing. Our platform covers Houston, Dallas, San Antonio, Austin, Fort Worth, and all major Texas cities.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Rated Apartments</h2>
              <p className="text-lg text-gray-600">Our highest-rated properties based on verified tenant reviews</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topRated.slice(0, 3).map((place, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className={`w-4 h-4 ${j < Math.round(place.rating || 0) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {place.name} is one of the highest-rated properties in {place.city || "Texas"}, with{' '}
                    <span className="font-semibold">{place.review_count}+ verified reviews</span>{' '}
                    and a {place.rating?.toFixed(1)} average rating.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{place.name}</p>
                    <p className="text-xs text-gray-400">{place.city}, TX &middot; {place.review_count} reviews &middot; {place.rating?.toFixed(1)} / 5</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Rated <span className="font-semibold text-gray-700">3.94 / 5</span> based on{' '}
                {topRated.reduce((sum, p) => sum + (p.review_count || 0), 0).toLocaleString()}+ verified tenant reviews across Google Maps
              </p>
            </div>
          </div>
        </section>

        {/* Listing Section */}
        <section id="listings">
          <InteractiveList initialFilters={filters} />
        </section>

        {/* Promo Banner */}
        <section className="py-8 bg-gradient-to-r from-blue-600 to-emerald-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white text-lg font-medium mb-1">New to Texas or planning a move?</p>
            <p className="text-blue-100 text-sm mb-4">
              Read our free guides on neighborhoods, tenant rights, and city comparisons.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Browse Renter Guides
            </Link>
          </div>
        </section>
      </main>
  );
}
