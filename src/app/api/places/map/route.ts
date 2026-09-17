import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { parseLocation } from "@/lib/geo";
import { checkRateLimit } from "@/middleware/rate-limiter";

const BATCH_SIZE = 1000;
const MAX_ITEMS = 5000;

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimitResult = checkRateLimit(ip, 10, 60_000);
  if (!rateLimitResult.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const params = request.nextUrl.searchParams;
  const county = params.get("county");
  const city = params.get("city");
  const zip = params.get("zip");
  const minRating = parseInt(params.get("min_rating") || "0");
  const q = params.get("q");
  const swLat = params.get("swLat") ? parseFloat(params.get("swLat")!) : null;
  const swLng = params.get("swLng") ? parseFloat(params.get("swLng")!) : null;
  const neLat = params.get("neLat") ? parseFloat(params.get("neLat")!) : null;
  const neLng = params.get("neLng") ? parseFloat(params.get("neLng")!) : null;

  const allItems: { id: number; slug: string; name: string; address: string | null; rating: number | null; location: { lat: number; lng: number } }[] = [];
  let offset = 0;
  let hasMore = true;

  const baseQuery = () => {
    let query = supabase
      .from("places")
      .select("id, slug, name, address, rating, location");
    if (county) query = query.eq("county", county);
    if (city) query = query.eq("city", city);
    if (zip) query = query.eq("zip_code", zip);
    if (minRating > 0) query = query.gte("rating", minRating);
    if (q) query = query.ilike("name", `%${q}%`);
    return query;
  };

  while (hasMore && allItems.length < MAX_ITEMS) {
    const { data, error } = await baseQuery().range(offset, offset + BATCH_SIZE - 1);

    if (error) {
      if (error.message?.includes("storage_size_quota") || error.message?.includes("restricted")) {
        return NextResponse.json({ error: "Database temporarily unavailable", items: [], total: 0 }, { status: 503 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = data || [];
    for (const row of rows) {
      const location = parseLocation(row);
      if (location) {
        if (swLat !== null && swLng !== null && neLat !== null && neLng !== null) {
          const inBounds = location.lat >= swLat && location.lat <= neLat && location.lng >= swLng && location.lng <= neLng;
          if (!inBounds) continue;
        }
        allItems.push({
          id: row.id,
          slug: row.slug,
          name: row.name,
          address: row.address,
          rating: row.rating,
          location,
        });
      }
    }

    hasMore = rows.length === BATCH_SIZE;
    offset += BATCH_SIZE;
  }

  return NextResponse.json({ items: allItems, total: allItems.length });
}
