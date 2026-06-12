import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("places")
    .select("county, city, zip_code");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const counties = [...new Set(data.map((d: any) => d.county).filter(Boolean))].sort();
  const cities: Record<string, string[]> = {};
  const zips: Record<string, string[]> = {};

  for (const d of data) {
    if (d.county && d.city) {
      if (!cities[d.county]) cities[d.county] = [];
      if (!cities[d.county].includes(d.city)) cities[d.county].push(d.city);
    }
    if (d.city && d.zip_code) {
      if (!zips[d.city]) zips[d.city] = [];
      if (!zips[d.city].includes(d.zip_code)) zips[d.city].push(d.zip_code);
    }
  }
  for (const key of Object.keys(cities)) cities[key].sort();
  for (const key of Object.keys(zips)) zips[key].sort();

  return NextResponse.json({ counties, cities, zips });
}
