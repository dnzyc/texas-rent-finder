export interface SupabasePlaceRow {
  id: number;
  slug: string;
  name: string;
  address: string | null;
  city: string | null;
  zip_code: string | null;
  county: string | null;
  region: string | null;
  location: string | { lat: number; lng: number } | { coordinates: [number, number] } | null;
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

function wkbHexToLatLng(hex: string): { lat: number; lng: number } | null {
  try {
    if (hex.length < 50) return null;
    const x = Number("0x" + hex.substring(18, 34));
    const y = Number("0x" + hex.substring(34, 50));
    if (isNaN(x) || isNaN(y)) return null;
    return { lat: y, lng: x };
  } catch {
    return null;
  }
}

export function parseLocation(row: SupabasePlaceRow | null): { lat: number; lng: number } | null {
  if (!row) return null;
  const loc = row.location as any;
  if (!loc) return null;
  if (typeof loc === "string") return wkbHexToLatLng(loc);
  if ("lat" in loc && "lng" in loc) return { lat: loc.lat, lng: loc.lng };
  if ("coordinates" in loc) return { lat: loc.coordinates[1], lng: loc.coordinates[0] };
  return null;
}
