import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

const BATCH_SIZE = 1000;

export async function GET() {
  const allItems: { id: number; slug: string; name: string; address: string | null; rating: number | null; location: { lat: number; lng: number } }[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from("places")
      .select("id, slug, name, address, rating, location")
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const rows = data || [];
    for (const row of rows) {
      const location = parseLocation(row);
      if (location) {
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
