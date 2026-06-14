import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkRateLimit } from "@/middleware/rate-limiter";

function parseWKBHex(hex: string): { lat: number; lng: number } | null {
  if (!hex || hex.length < 50) return null;
  try {
    const buf = Buffer.from(hex, "hex");
    const lng = buf.readDoubleLE(9);
    const lat = buf.readDoubleLE(17);
    if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}

function parseLocation(row: any): { lat: number; lng: number } | null {
  const loc = row.location;
  if (!loc) return null;
  if (typeof loc === "string") return parseWKBHex(loc);
  if (loc.lat !== undefined && loc.lng !== undefined) return { lat: loc.lat, lng: loc.lng };
  if (loc.coordinates) return { lat: loc.coordinates[1], lng: loc.coordinates[0] };
  return null;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map(ip => ip.trim());
    return ips[0] || "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  return realIp || "unknown";
}

export async function GET(request: NextRequest) {
  const clientIp = getClientIp(request);
  const { allowed, remaining } = checkRateLimit(clientIp);

  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const params = request.nextUrl.searchParams;
  const county = params.get("county");
  const city = params.get("city");
  const zip = params.get("zip");
  const minRating = parseInt(params.get("min_rating") || "0");
  const maxRating = parseInt(params.get("max_rating") || "5");
  const q = params.get("q");
  const page = parseInt(params.get("page") || "1");
  const limit = Math.min(parseInt(params.get("limit") || "20"), 100);
  const sort = params.get("sort") || "rating_desc";
  const offset = (page - 1) * limit;

  let query = supabase.from("places").select("*", { count: "exact" });

  if (county) query = query.eq("county", county);
  if (city) query = query.eq("city", city);
  if (zip) query = query.eq("zip_code", zip);
  if (minRating > 0) query = query.gte("rating", minRating);
  query = query.lte("rating", maxRating);
  if (q) {
    const safeQueryValue = `%${q}%`;
    query = query.ilike("name", safeQueryValue);
  }

  switch (sort) {
    case "rating_asc": query = query.order("rating", { ascending: true, nullsFirst: false }); break;
    case "price_asc": query = query.order("price_1br", { ascending: true, nullsFirst: false }); break;
    case "price_desc": query = query.order("price_1br", { ascending: false, nullsFirst: false }); break;
    default: query = query.order("rating", { ascending: false, nullsFirst: false });
  }

  query = query.range(offset, offset + limit - 1);
  const { data, error, count } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const items = (data || []).map((row: any) => ({
    ...row,
    location: parseLocation(row),
  }));

  return NextResponse.json({
    items,
    total: count || 0,
    page,
    pages: Math.ceil((count || 0) / limit),
  });
}
