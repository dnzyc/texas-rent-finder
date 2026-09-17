/**
 * Tum Texas sehirlerindeki apartmanlari tek Excel dosyasina aktarir.
 * Her sehir ayri bir sheet (tab).
 * Cikti: ~/Desktop/texas-apartments-all.xlsx
 *
 * Kullanim: node scripts/export-all-cities.js
 */

const { createClient } = require("@supabase/supabase-js");
const XLSX = require("xlsx");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const su = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const COLUMNS = [
  "Name", "Address", "City", "ZIP Code", "County",
  "Rating", "Reviews", "Phone", "Website",
  "1BR Price", "2BR Price", "Category",
];

const DESKTOP = process.env.HOME + "/Desktop";
const OUTFILE = DESKTOP + "/texas-apartments-all.xlsx";

async function getAllCities() {
  let counts = {};
  let offset = 0;
  while (true) {
    const { data } = await su.from("places").select("city").not("city", "is", null).range(offset, offset + 999);
    if (!data || data.length === 0) break;
    data.forEach((r) => {
      if (r.city) counts[r.city] = (counts[r.city] || 0) + 1;
    });
    if (data.length < 1000) break;
    offset += 1000;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

async function getCityListings(city) {
  let all = [];
  let offset = 0;
  while (true) {
    const { data } = await su
      .from("places")
      .select("name,address,city,zip_code,county,rating,review_count,phone,website,price_1br,price_2br,category")
      .eq("city", city)
      .order("rating", { ascending: false })
      .range(offset, offset + 999);
    if (!data || data.length === 0) break;
    data.forEach((r) => {
      all.push([
        r.name || "",
        r.address || "",
        r.city || "",
        r.zip_code || "",
        r.county || "",
        r.rating != null ? Number(r.rating).toFixed(1) : "",
        r.review_count || 0,
        r.phone || "",
        r.website || "",
        r.price_1br || "",
        r.price_2br || "",
        r.category || "",
      ]);
    });
    if (data.length < 1000) break;
    offset += 1000;
  }
  return all;
}

function sanitizeSheetName(name) {
  // Excel sheet names max 31 chars, no [ ] * ? / \ :
  return name.replace(/[\[\]\*\?\/\\:]/g, "-").slice(0, 31);
}

async function main() {
  console.log("Sehirler aliniyor...");
  const cities = await getAllCities();
  console.log(`${cities.length} sehir bulundu\n`);

  const wb = XLSX.utils.book_new();

  for (let i = 0; i < cities.length; i++) {
    const [city, count] = cities[i];
    const pct = Math.round(((i + 1) / cities.length) * 100);
    process.stdout.write(`\r[${i + 1}/${cities.length}] %${pct} ${city} (${count} ilan)...`);

    const rows = await getCityListings(city);
    const sheetName = sanitizeSheetName(city);
    const ws = XLSX.utils.aoa_to_sheet([COLUMNS, ...rows]);

    // Column widths
    ws["!cols"] = [
      { wch: 35 }, // Name
      { wch: 40 }, // Address
      { wch: 15 }, // City
      { wch: 8 },  // ZIP
      { wch: 12 }, // County
      { wch: 6 },  // Rating
      { wch: 7 },  // Reviews
      { wch: 15 }, // Phone
      { wch: 35 }, // Website
      { wch: 9 },  // 1BR
      { wch: 9 },  // 2BR
      { wch: 18 }, // Category
    ];

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  }

  console.log("\n\nDosya yaziliyor...");
  XLSX.writeFile(wb, OUTFILE);

  const fileSize = (fs.statSync(OUTFILE).size / (1024 * 1024)).toFixed(1);
  console.log(`\nKaydedildi: ${OUTFILE} (${fileSize} MB)`);
  console.log(`Sehir: ${cities.length} | Ilan: ${cities.reduce((s, [, c]) => s + c, 0)}`);
}

main().catch(console.error);
