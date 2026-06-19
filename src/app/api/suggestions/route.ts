import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkRateLimit } from "@/middleware/rate-limiter";

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateCheck = checkRateLimit(`suggestions:${ip}`);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) return NextResponse.json({ items: [] });

  const sanitized = q.replace(/[%_]/g, (m) => `\\${m}`).trim();
  if (sanitized.length > 100) return NextResponse.json({ items: [] });

  const { data } = await supabase
    .from("places")
    .select("slug, name, city, zip_code")
    .ilike("name", `%${sanitized}%`)
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(5);

  return NextResponse.json({ items: data || [] });
}
