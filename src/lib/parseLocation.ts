export interface SupabasePlaceRow {
  id: number;
  slug: string;
  name: string;
  address: string | null;
  city: string | null;
  zip_code: string | null;
  county: string | null;
  region: string | null;
  location: { lat: number; lng: number } | { coordinates: [number, number] } | null;
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

export function parseLocation(row: SupabasePlaceRow | null): { lat: number; lng: number } | null {
  if (!row) return null;
  const loc = row.location;
  if (!loc) return null;
  if ("lat" in loc && "lng" in loc) return { lat: loc.lat, lng: loc.lng };
  if ("coordinates" in loc) return { lat: loc.coordinates[1], lng: loc.coordinates[0] };
  return null;
}
