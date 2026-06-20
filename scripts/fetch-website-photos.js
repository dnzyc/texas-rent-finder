/**
 * Placeholder fotolu apartmanlarin KENDI web sitelerinden gorsel ceker,
 * Supabase Storage'a yukler, photo_url'i gunceller.
 *
 * Calisma mantigi:
 *   1. og:image meta tag'ine bak
 *   2. Yoksa ilk buyuk <img> tag'ini al
 *   3. Download et, Supabase Storage'a yukle
 *   4. Hata veren/engelleyen siteleri listele
 *
 * Kullanim:
 *   node scripts/fetch-website-photos.js [--limit N]
 */

const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const https = require("https");
const http = require("http");
const fs = require("fs");

dotenv.config({ path: ".env.local" });

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "apartment-photos";
const STORAGE_URL_BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

const su = createClient(SUPABASE_URL, SUPABASE_KEY);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── HTTP Helpers ───────────────────────────────────────────────

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("Too many redirects"));
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { timeout: 8000, headers: { "User-Agent": "Mozilla/5.0 (compatible; TexasRentFinder/1.0)" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith("/")) {
          const u = new URL(url);
          redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
        }
        return fetchUrl(redirectUrl, redirects + 1).then(resolve).catch(reject);
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

function fetchHtml(url) {
  return fetchUrl(url).then(buf => buf.toString("utf-8")).catch(() => null);
}

function fetchImageBuffer(imageUrl) {
  return fetchUrl(imageUrl).catch(() => null);
}

// ─── Image Extraction ───────────────────────────────────────────

function extractImageUrl(html, baseUrl) {
  if (!html) return null;

  // 1. og:image meta tag
  let m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (!m) m = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (m) return resolveUrl(m[1], baseUrl);

  // 2. twitter:image
  m = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
  if (!m) m = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
  if (m) return resolveUrl(m[1], baseUrl);

  // 3. First img with width/height > 200
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const src = imgMatch[1];
    const tag = imgMatch[0];
    // Skip icons, logos that are too small
    if (src.match(/icon|logo|favicon|pixel|tracking|analytics|1x1/i)) continue;
    const w = tag.match(/width=["']?(\d+)/i);
    const h = tag.match(/height=["']?(\d+)/i);
    if (w && parseInt(w[1]) < 200) continue;
    if (h && parseInt(h[1]) < 200) continue;
    return resolveUrl(src, baseUrl);
  }

  // 4. Any img as last resort (skip tiny ones)
  imgRegex.lastIndex = 0;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const src = imgMatch[1];
    if (src.match(/icon|logo|favicon|pixel|1x1/i)) continue;
    if (src.includes("data:image")) continue;
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
  } catch {
    return null;
  }
}

// ─── Supabase Upload ────────────────────────────────────────────

async function uploadPhoto(fileName, buffer) {
  const { error } = await su.storage.from(BUCKET).upload(fileName, buffer, {
    contentType: "image/jpeg",
    upsert: true,
    cacheControl: "31536000",
  });
  if (error) throw error;
  return `${STORAGE_URL_BASE}/${fileName}`;
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) || 500 : 500;

  // Get placeholder listings WITH websites
  const { data: places } = await su.from("places")
    .select("id,name,slug,city,website,photo_url")
    .eq("photo_url", "/images/placeholder-apartment.png")
    .not("website", "is", null)
    .order("review_count", { ascending: false })
    .limit(limit);

  if (!places?.length) {
    console.log("No placeholder listings with websites found.");
    return;
  }

  console.log(`Processing ${places.length} listings...\n`);

  let success = 0, failed = 0, blocked = [];
  const blockedList = [];

  for (let i = 0; i < places.length; i++) {
    const p = places[i];
    const progress = `[${i + 1}/${places.length}]`;

    try {
      const html = await fetchHtml(p.website);
      
      if (!html) {
        blockedList.push({ name: p.name, city: p.city, website: p.website, reason: "no_response" });
        failed++;
        console.log(`${progress} BLOCKED ${p.name} (${p.city}) — site yanit vermedi`);
        await sleep(300);
        continue;
      }

      const imgUrl = extractImageUrl(html, p.website);
      if (!imgUrl) {
        blockedList.push({ name: p.name, city: p.city, website: p.website, reason: "no_image" });
        failed++;
        console.log(`${progress} NOIMG ${p.name} (${p.city}) — gorsel bulunamadi`);
        await sleep(300);
        continue;
      }

      const imgBuffer = await fetchImageBuffer(imgUrl);
      if (!imgBuffer || imgBuffer.length < 1000) {
        blockedList.push({ name: p.name, city: p.city, website: p.website, reason: "image_download_failed" });
        failed++;
        console.log(`${progress} DLERR ${p.name} (${p.city}) — gorsel indirilemedi`);
        await sleep(300);
        continue;
      }

      const fileName = `${p.slug}.jpg`;
      const storageUrl = await uploadPhoto(fileName, imgBuffer);

      await su.from("places").update({ photo_url: storageUrl }).eq("id", p.id);
      success++;
      console.log(`${progress} OK ${p.name} (${p.city})`);

    } catch (e) {
      blockedList.push({ name: p.name, city: p.city, website: p.website, reason: e.message?.slice(0, 60) });
      failed++;
      console.log(`${progress} ERR ${p.name}: ${e.message?.slice(0, 60)}`);
    }

    await sleep(400);

    if ((i + 1) % 50 === 0) {
      console.log(`\n  ── Checkpoint: ${i + 1} done, ${success} photos, ${failed} failed ──\n`);
    }
  }

  // Save blocked list
  fs.writeFileSync("/tmp/blocked-websites.json", JSON.stringify(blockedList, null, 2));

  console.log(`\n========================================`);
  console.log(`Basarili: ${success} | Basarisiz: ${failed}`);
  console.log(`Engellenen liste: /tmp/blocked-websites.json`);
}

main().catch(console.error);
