/**
 * Google Places Legacy Photo API ile apartman fotograflarini ceker,
 * Supabase Storage'a yukler ve places tablosunda photo_url'i gunceller.
 *
 * Kullanim:
 *   node scripts/fetch-photos.js [--limit N] [--city "Austin"]
 */

const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const https = require("https");
const http = require("http");
const path = require("path");

dotenv.config({ path: ".env.local" });

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing env vars");
  process.exit(1);
}

const su = createClient(SUPABASE_URL, SUPABASE_KEY);

const BUCKET = "apartment-photos";
const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
const PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";
const STORAGE_URL_BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

// ─── Helpers ────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

async function downloadPhoto(photoRef, maxWidth = 800) {
  const url = `${PLACE_PHOTO_URL}?maxwidth=${maxWidth}&photo_reference=${encodeURIComponent(photoRef)}&key=${GOOGLE_API_KEY}`;
  return new Promise((resolve, reject) => {
    // May redirect, so follow
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        const redirectUrl = res.headers.location;
        // Refetch from redirect
        const mod = redirectUrl.startsWith("https") ? https : http;
        mod.get(redirectUrl, (r2) => {
          const chunks = [];
          r2.on("data", (c) => chunks.push(c));
          r2.on("end", () => resolve(Buffer.concat(chunks)));
        }).on("error", reject);
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

async function getPlaceDetails(placeId) {
  const url = `${PLACE_DETAILS_URL}?place_id=${encodeURIComponent(placeId)}&fields=photos,place_id&key=${GOOGLE_API_KEY}`;
  try {
    const json = await fetchJSON(url);
    if (json.status === "OK" && json.result?.photos?.length > 0) {
      return json.result.photos.map((p) => p.photo_reference);
    }
    return [];
  } catch {
    return [];
  }
}

async function uploadToStorage(fileName, buffer) {
  // Use Supabase JS client for upload
  const { data, error } = await su.storage
    .from(BUCKET)
    .upload(fileName, buffer, {
      contentType: "image/jpeg",
      upsert: true,
      cacheControl: "31536000",
    });

  if (error) {
    console.log(`    Upload error: ${error.message}`);
    throw error;
  }
  return `${STORAGE_URL_BASE}/${fileName}`;
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  let limit = parseInt(args[args.indexOf("--limit") + 1] || "0") || 500;
  const cityFilter = args.includes("--city") ? args[args.indexOf("--city") + 1] : null;

  // Get listings missing photos
  let query = su.from("places")
    .select("id,name,slug,city,photo_url,maps_link")
    .or("photo_url.is.null,photo_url.eq./images/placeholder-apartment.png")
    .order("review_count", { ascending: false }) // Prioritize popular ones
    .limit(limit);

  if (cityFilter) {
    query = query.eq("city", cityFilter);
  }

  const { data: places } = await query;

  if (!places?.length) {
    console.log("No listings without photos found.");
    return;
  }

  console.log(`Processing ${places.length} listings...\n`);

  let processed = 0, gotPhotos = 0, failed = 0;

  for (const place of places) {
    processed++;
    const progress = `[${processed}/${places.length}]`;

    try {
      // Extract place_id from maps_link
      const placeIdMatch = place.maps_link?.match(/place_id:([^&]+)/);
      if (!placeIdMatch) {
        failed++;
        continue;
      }

      const placeId = placeIdMatch[1];
      const photoRefs = await getPlaceDetails(placeId);

      if (photoRefs.length === 0) {
        // No photos on Google - mark with placeholder
        await su.from("places")
          .update({ photo_url: "/images/placeholder-apartment.png" })
          .eq("id", place.id);
        console.log(`${progress} NONE ${place.name} (${place.city}) — no photos on Google`);
        failed++;
        await sleep(150);
        continue;
      }

      // Download first photo
      const photoBuffer = await downloadPhoto(photoRefs[0]);

      // Upload to Supabase Storage
      const fileName = `${place.slug}.jpg`;
      const storageUrl = await uploadToStorage(fileName, photoBuffer);

      // Update database
      await su.from("places")
        .update({ photo_url: storageUrl })
        .eq("id", place.id);

      gotPhotos++;
      console.log(`${progress} OK ${place.name} (${place.city}) → ${storageUrl}`);
    } catch (e) {
      failed++;
      console.log(`${progress} ERR ${place.name}: ${e.message?.slice(0, 80)}`);
    }

    // Rate limiting
    await sleep(250);

    // Progress report every 50
    if (processed % 50 === 0) {
      console.log(`\n  ── Checkpoint: ${processed} done, ${gotPhotos} photos, ${failed} failed ──\n`);
    }
  }

  console.log(`\nDone! Photos: ${gotPhotos}, Failed: ${failed}`);
}

main().catch(console.error);
