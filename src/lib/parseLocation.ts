export interface SupabasePlaceRow {
  id: number;
  slug: string;
  name: string;
  address: string | null;
  city: string | null;
  zip_code: string | null;
  county: string | null;
  region: string | null;
  location: { lat: number; lng: number } | { coordinates: [number, number] } | string | null;
  rating: number | null;
  review_count: number | null;
  phone: string | null;
  website: string | null;
  maps_link: string | null;
  photo_url: string | null;
  hours: string | null;
  category: string | null;
  price_1br: number | null;
  price_2br: number | null;
  last_price_update: string | null;
  created_at: string | null;
}

/**
 * Parse Supabase "location" field which can be:
 *   1. { lat: number, lng: number } — JS object
 *   2. { coordinates: [lng, lat] } — GeoJSON-style
 *   3. "0101000020E6100000..." — WKB hex string (PostGIS)
 */
export function parseLocation(row: SupabasePlaceRow | null): { lat: number; lng: number } | null {
  if (!row) return null;
  const loc = row.location;
  if (!loc) return null;

  // Object form: { lat, lng }
  if (typeof loc === "object" && !Array.isArray(loc)) {
    if ("lat" in loc && "lng" in loc) return { lat: loc.lat as number, lng: loc.lng as number };
    if ("coordinates" in loc && Array.isArray(loc.coordinates) && loc.coordinates.length >= 2) {
      return { lat: loc.coordinates[1], lng: loc.coordinates[0] };
    }
    return null;
  }

  // WKB hex string (PostGIS POINT)
  if (typeof loc === "string" && loc.length >= 42) {
    return parseWKBHex(loc);
  }

  return null;
}

function parseWKBHex(hex: string): { lat: number; lng: number } | null {
  try {
    // POINT WKB format (little-endian): 01 01000020 E6100000 [16-byte double X] [16-byte double Y]
    // Skip first 10 bytes (endian + type + SRID), read two 64-bit doubles
    if (hex.length < 42) return null;
    const buf = Buffer.from(hex, "hex");
    // Byte order: buf[0] = 01 (little endian)
    // Read double at offset 18 (after endian, type, SRID): X = lng
    // Read double at offset 26: Y = lat
    const lng = buf.readDoubleLE(18);
    const lat = buf.readDoubleLE(26);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}
