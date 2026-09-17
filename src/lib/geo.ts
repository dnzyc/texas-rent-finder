export function parseWKBHex(hex: string): { lat: number; lng: number } | null {
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

export function parseLocation(row: any): { lat: number; lng: number } | null {
  const loc = row.location;
  if (!loc) return null;
  if (typeof loc === "string") return parseWKBHex(loc);
  if (typeof loc === "object" && loc.lat !== undefined && loc.lng !== undefined) return { lat: loc.lat, lng: loc.lng };
  if (loc.coordinates) return { lat: loc.coordinates[1], lng: loc.coordinates[0] };
  return null;
}
