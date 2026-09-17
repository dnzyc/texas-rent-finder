import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { parseLocation } from "@/lib/geo";
import { checkRateLimit } from "@/middleware/rate-limiter";

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
  const { allowed } = checkRateLimit(clientIp);

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
  const idsParam = params.get("ids");
  const page = parseInt(params.get("page") || "1");
  const limit = Math.min(parseInt(params.get("limit") || "20"), 100);
  const sort = params.get("sort") || "rating_desc";
  const offset = (page - 1) * limit;

  let query = supabase.from("places").select("*", { count: "exact" });

  if (idsParam) {
    const ids = idsParam.split(",").map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id)).slice(0, 100);
    if (ids.length > 0) {
      query = query.in("id", ids);
    }
  } else {
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
  }

  const { data, error, count } = await query;

  if (error) {
    if (error.message?.includes("storage_size_quota") || error.message?.includes("restricted")) {
      return NextResponse.json(
        { error: "Database temporarily unavailable. Please try again later.", items: [], total: 0, page: 1, pages: 0 },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = (data || []).map((row: any) => ({
    ...row,
    location: parseLocation(row),
  }));

  return NextResponse.json({
    items,
    total: count || 0,
    page,
    pages: Math.ceil((count || 0) / limit),
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
