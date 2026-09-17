/**
 * Fotosuz 590 apartman icin:
 *   1. Once kendi websitesinden gorsel dene
 *   2. Bulamazsa Google Places Photo API dene
 *   3. Inatci olanlari /tmp/stubborn-no-photo.json'a kaydet
 *
 * Kullanim: node scripts/fetch-remaining-photos.js
 */

const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const https = require("https");
const http = require("http");
const fs = require("fs");

dotenv.config({ path: ".env.local" });

const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "apartment-photos";
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

const su = createClient(SUPABASE_URL, SUPABASE_KEY);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── HTTP ───────────────────────────────────────────────────────

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("Too many redirects"));
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { timeout: 8000, headers: { "User-Agent": "Mozilla/5.0 (compatible; TexasRentFinder/1.0)" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith("/")) { const u = new URL(url); loc = `${u.protocol}//${u.host}${loc}`; }
        return fetchUrl(loc, redirects + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
    req.on("timeout", () => { req.destroy(); reject(new Error("Timeout")); });
    req.on("error", reject);
  });
}

// ─── Extract image from HTML ────────────────────────────────────

function extractImageUrl(html, baseUrl) {
  if (!html) return null;
  let m;
  // og:image
  m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (!m) m = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (m) return resolveUrl(m[1], baseUrl);
  // twitter:image
  m = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
  if (!m) m = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
  if (m) return resolveUrl(m[1], baseUrl);
  // First large img
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((m = imgRegex.exec(html)) !== null) {
    const src = m[1];
    const tag = m[0];
    if (src.match(/icon|logo|favicon|pixel|1x1/i)) continue;
    if (src.includes("data:image")) continue;
    const w = tag.match(/width=["']?(\d+)/i);
    if (w && parseInt(w[1]) < 150) continue;
    return resolveUrl(src, baseUrl);
  }
  return null;
}

function resolveUrl(url, baseUrl) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("//")) return "https:" + url;
  try {
    const base = new URL(baseUrl);
    if (url.startsWith("/")) return `${base.protocol}//${base.host}${url}`;
    return `${base.protocol}//${base.host}/${url}`;
  } catch { return null; }
}

// ─── Google Places Photo ───────────────────────────────────────

async function getGooglePhotoRef(mapsLink) {
  const pid = mapsLink?.match(/place_id:([^&]+)/)?.[1];
  if (!pid) return null;
  return new Promise((resolve) => {
    https.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${pid}&fields=photos&key=${GOOGLE_KEY}`, (res) => {
      let d = ""; res.on("data", c => d += c); res.on("end", () => {
        try { const j = JSON.parse(d); resolve(j.result?.photos?.[0]?.photo_reference || null); }
        catch { resolve(null); }
      });
    }).on("error", () => resolve(null));
  });
}

async function downloadGooglePhoto(photoRef) {
  return new Promise((resolve) => {
    https.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${GOOGLE_KEY}`, (res) => {
      if (res.statusCode >= 300 && res.headers.location) {
        const mod = res.headers.location.startsWith("https") ? https : http;
        mod.get(res.headers.location, (r2) => {
          const c = []; r2.on("data", d => c.push(d)); r2.on("end", () => resolve(Buffer.concat(c)));
        }).on("error", () => resolve(null));
        return;
      }
      const c = []; res.on("data", d => c.push(d)); res.on("end", () => resolve(Buffer.concat(c)));
    }).on("error", () => resolve(null));
  });
}

// ─── Apartments.com search ─────────────────────────────────────

async function searchApartmentsDotCom(name, city) {
  const query = encodeURIComponent(`${name} ${city} TX`);
  const url = `https://www.apartments.com/search/?query=${query}`;
  try {
    const html = await fetchUrl(url);
    if (!html) return null;
    // Find first listing image
    const m = html.match(/<img[^>]+alt=["'][^"']*apartment[^"']*["'][^>]+src=["']([^"']+)["']/i)
      || html.match(/property-image/i) ? html.match(/src=["']([^"']*property[^"']*\.(?:jpg|png|webp))["']/i) : null;
    return m ? m[1] : null;
  } catch { return null; }
}

// ─── Upload ────────────────────────────────────────────────────

async function uploadPhoto(fileName, buffer) {
  const { error } = await su.storage.from(BUCKET).upload(fileName, buffer, {
    contentType: "image/jpeg", upsert: true, cacheControl: "31536000",
  });
  if (error) throw error;
  return `${STORAGE_BASE}/${fileName}`;
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  const { data: places } = await su.from("places")
    .select("id,name,slug,city,website,maps_link,photo_url")
    .eq("photo_url", "/images/placeholder-apartment.png");

  console.log(`Processing ${places.length} listings...\n`);

  let ok = 0, fail = 0;
  const stubborn = [];

  for (let i = 0; i < places.length; i++) {
    const p = places[i];
    const prog = `[${i + 1}/${places.length}]`;
    let buffer = null;

    try {
      // Step 1: Try own website
      if (p.website) {
        const html = await fetchUrl(p.website).catch(() => null);
        if (html) {
          const imgUrl = extractImageUrl(html.toString("utf-8"), p.website);
          if (imgUrl) buffer = await fetchUrl(imgUrl).catch(() => null);
        }
      }

      // Step 2: Try Google Places Photo
      if (!buffer && p.maps_link) {
        const ref = await getGooglePhotoRef(p.maps_link);
        if (ref) {
          buffer = await downloadGooglePhoto(ref);
        }
      }

      // Step 3: Try apartments.com
      if (!buffer) {
        const aptsImg = await searchApartmentsDotCom(p.name, p.city);
        if (aptsImg) buffer = await fetchUrl(aptsImg).catch(() => null);
      }

      if (buffer && buffer.length > 1000) {
        const storageUrl = await uploadPhoto(`${p.slug}.jpg`, buffer);
        await su.from("places").update({ photo_url: storageUrl }).eq("id", p.id);
        ok++;
        console.log(`${prog} OK ${p.name} (${p.city})`);
      } else {
        stubborn.push({ name: p.name, city: p.city, website: p.website });
        fail++;
        console.log(`${prog} FAIL ${p.name} (${p.city})`);
      }
    } catch (e) {
      stubborn.push({ name: p.name, city: p.city, website: p.website });
      fail++;
      console.log(`${prog} ERR ${p.name}: ${e.message?.slice(0, 60)}`);
    }

    await sleep(300);
    if ((i + 1) % 50 === 0) console.log(`  ── ${i + 1} done, ${ok} ok, ${fail} fail ──\n`);
  }

  // Save stubborn ones
  fs.writeFileSync("/tmp/stubborn-no-photo.json", JSON.stringify(stubborn, null, 2));

  console.log(`\nDone! OK: ${ok}, Fail: ${fail}`);
  console.log(`Stubborn: /tmp/stubborn-no-photo.json (${stubborn.length})`);

  let { count: pl } = await su.from("places").select("*", { count: "exact", head: true }).eq("photo_url", "/images/placeholder-apartment.png");
  console.log(`Remaining placeholder: ${pl}`);
}

main().catch(console.error);
