import { NextRequest, NextResponse } from "next/server";
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

function parseLocation(loc: any): { lat: number; lng: number } | null {
  if (!loc) return null;
  if (typeof loc === "string") return parseWKBHex(loc);
  if (loc.lat !== undefined && loc.lng !== undefined) return { lat: loc.lat, lng: loc.lng };
  if (loc.coordinates) return { lat: loc.coordinates[1], lng: loc.coordinates[0] };
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: place, error } = await supabase
    .from("places")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !place) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const location = parseLocation(place.location);

  let nearby: any[] = [];
  if (location && location.lat && location.lng) {
    const { data: nearbyData } = await supabase.rpc("nearby_places", {
      lat: location.lat,
      lng: location.lng,
      radius_m: 5000,
      exclude_id: place.id,
      limit_count: 5,
    });
    nearby = nearbyData || [];
  }

  return NextResponse.json({
    ...place,
    location,
    nearby,
  });
}
