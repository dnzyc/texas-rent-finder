import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) return NextResponse.json({ items: [] });

  const { data } = await supabase
    .from("places")
    .select("slug, name, city, zip_code")
    .ilike("name", `%${q}%`)
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(5);

  return NextResponse.json({ items: data || [] });
}
