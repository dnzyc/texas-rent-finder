# Texas Apartments Platform — Oturum Notları
# Tarih: 12 Haziran 2026

## Proje Konumları
- Web uygulaması: /Users/dnzyc/texas-apartments-platform
- Veri seti: /Users/dnzyc/texas-apartments-scraper/texas_apartments_with_zip.xlsx
- Kaynak veri: /Users/dnzyc/texas-apartments-scraper/

## Supabase
- URL: https://nzqywomdcgjnxwtndipk.supabase.co
- Anon Key: sb_publishable_l8mJblGm7GmlH9Xp0lH5KA_ZEiIU82O
- Proje: texas-apartments (dnzyc87@gmail.com's Org)
- Bölge: us-east-1
- Tablo: places (5,058 satır)
- PostGIS: aktif
- RLS: sadece SELECT (Public read access policy)
- Schema dosyası: /Users/dnzyc/texas-apartments-platform/supabase-schema.sql

## Stack
- Next.js 16.2.9 (App Router, TypeScript, Tailwind)
- Supabase v2 (@supabase/supabase-js 2.108.1)
- Leaflet + OpenStreetMap (ücretsiz harita)
- Python 3.11 (seed script, scraper)
- Playwright (tarayıcı otomasyonu)

## Çalışan Özellikler
- / — Ana sayfa (liste + harita + filtreler)
- /place/[slug] — Apartman detay sayfası
- /api/places?county=...&city=...&zip=...&min_rating=...&q=... — Filtreli arama
- /api/filters — Dropdown seçenekleri (county/city/zip)
- /api/places/[slug] — Tek apartman + yakındakiler
- /api/suggestions?q=... — Otomatik tamamlama
- Leaflet harita (pin'ler rating gösterir, tıklanınca popup)
- County → City → Zip chain dropdown
- Rating filtresi + isim arama
- Pagination (sayfalama)
- Mobil responsive

## Sunucu
- npm run dev -- -p 3000
- Cache temizleme: rm -rf .next (gerektiğinde)

## Kalan İşler
2. Capacitor iOS/Android build (npx cap sync sonrası)
3. Price scraper (scripts/scrape_prices.py)
4. Leaflet marker cluster eklentisi (pin yoğunluğu için)
5. SEO meta etiketleri

## Bilinen Sorunlar
- Bazı apartman olmayan kayıtlar var (örn: "Ismael's House Leveling")
- Publishable key yeni format, JWT formatı desteklenmiyor (v2 client sorunu)
- next export için ek konfigürasyon gerekebilir

## Başlangıç Komutları
```bash
cd /Users/dnzyc/texas-apartments-platform
rm -rf .next  # cache temizliği
npm run dev -- -p 3000
# http://localhost:3000
```

---

## 20 Haziran 2026 — Places API Veri Revizyonu + Fotoğraf Entegrasyonu ✅

### Veri Temizliği
- **73 cop ilan silindi:** "8119", "5824", "Home" (3x), kişi isimleri, adres-only kayıtlar, "3c leasing", "a2 designs", emoji'li isimler
- **Rating > 5 fix:** 2 kayıt NULL yapıldı
- Temizlik öncesi: 6,609 → Sonrası: 6,559

### Google Places API — 10 Bolge Taraması
- **API:** Legacy Places API, Key: `AIzaSyCRyPst9P2JA6B-7A3GC84L-zi0E_3M2dE`
- **Script:** `scripts/fetch-from-places-api.ts` (projede: /Users/dnzyc/projects/texas-apartments/scripts/)
- **Metod:** textSearch (3 sayfa/sehir) → place/details → Supabase upsert

| Bolge | Sehir | Yeni | Güncellendi |
|-------|-------|------|-------------|
| DFW Metroplex & North Texas | 92 | 833 | ~400 |
| Greater Houston & Southeast | 60 | 695 | 429 |
| Greater Austin & Central Texas | 48 | 478 | 202 |
| Greater San Antonio & Hill Country | 42 | 337 | 239 |
| Rio Grande Valley & South Texas | 22 | 238 | 109 |
| Coastal Bend | 18 | 142 | 99 |
| West Texas & Permian Basin | 13 | 95 | 113 |
| Panhandle & High Plains | 19 | 115 | 92 |
| East Texas | 68 | 530 | 212 |
| **TOPLAM** | **382** | **3,463** | **~1,900** |

### Fotoğraf Entegrasyonu
- **Script:** `scripts/fetch-photos.js`
- Google Places Photo API → Supabase Storage (bucket: apartment-photos)
- Storage URL format: `https://nzqywomdcgjnxwtndipk.supabase.co/storage/v1/object/public/apartment-photos/{slug}.jpg`
- 4 batch çalıştırıldı (1000'er listing)
- NULL fotoğraflar `/images/placeholder-apartment.png` ile değiştirildi

### Son Durum

| Metrik | Değer |
|--------|-------|
| Toplam ilan | **10,022** |
| Ratingli | 8,326 (%83) |
| Gerçek fotoğraf | 2,618 (%26) |
| Placeholder foto | 4,738 (%47) |
| Supabase'den eski foto | 2,666 (%27) |
| Telefonlu | 9,648 (%96) |
| Websiteli | 7,348 (%73) |

### Production
- **URL:** https://texasrentfinder.com
- **Sayfa:** 62 (30+ city page, 19 blog, legal, contact, list-property)
- **Build:** 0 hata, Turbopack

### Kalan
- Fiyatlar hala eski (Places API fiyat vermiyor)
- 4,738 placeholder foto — daha fazla Google foto batch ile doldurulabilir
- "Apartment rental agency" kategorisindeki 856 ilan kontrol edilmeli
- Bazı duplicate ilanlar var (eski + API'den gelen aynı yer)

---

## 20 Haziran 2026 (2. Oturum) — Nihai Temizlik + Fotoğraf Batch ✅

### Temizlik İşlemleri (343 ilan silindi)

| # | Grup | Silinen |
|---|------|---------|
| 1 | Eski scraper (tel+rating NULL) | 157 |
| 2 | Housing Authority | 12 |
| 3 | Apartment locator | 2 |
| 4 | Corporate housing | 11 |
| 5 | Property management | 12 |
| 6 | HOA / storage / repair / investigation | 9 |
| 7 | Website isimli (.com, .net) | 3 |
| 8 | Tek kelime isimli | 109 |
| 9 | Duplicate | 5 |
| 10 | Kategori: "Apartment rental agency" → "Apartment complex" | 820 düzeltildi |
| 11 | Gerçek ajans silindi | 23 |

### Fotoğraf Durumu

| Metrik | Değer |
|--------|-------|
| Toplam ilan | **9,679** |
| Supabase Storage foto | 3,752 (%39) |
| Local images (/images/apartments/) | 2,622 (%27) |
| Placeholder | 3,299 (%34) |
| **Gerçek foto toplam** | **6,374 (%66)** |

### Fotoğraf Batch'leri
- Batch 4-6: 3 paralel, 604 yeni foto
- Batch 7: 603 yeni foto
- Toplam yeni foto: ~1,200

### Deploy
- 64 sayfa, 0 hata
- Production: https://texasrentfinder.com

### Kalan
- 3,299 placeholder — Google'da fotosu olmayanlar (batch'ler tukendi)
- Fiyatlandırma: Google Places API fiyat vermiyor, web scraping gerek
- Kampanya scraping sonraki iş

---

## 20 Haziran 2026 (3. Oturum) — Derin Temizlik + Website Fotoğraf Entegrasyonu ✅

### Temizlik — Ek İşlemler

| # | Grup | Silinen |
|---|------|---------|
| 12 | Apt/unit numarası içeren isimler | 37 |
| 13 | Kişisel evler, ranch'ler | 256 |
| 14 | Alabama'daki "Avenue Townhomes" (out-of-state) | 1 |
| 15 | "Pretty place" gibi generic isimler | 1 |
| 16 | Ofis/storage/leasing office | 3 |
| 17 | Placeholder + yorumu olmayan | 456 |
| 18 | Placeholder + websitesi olmayan | 958 |
| 19 | Duplicate (tam isim+şehir eşleşmesi) | 312 |

### Bug Fixes
- **parseLocation WKB hex fix:** `location` sütunu WKB hex string döndürüyordu, `parseLocation` sadece obje formatını destekliyordu → `parseWKBHex()` eklendi → place detay sayfaları 500 hatası düzeldi
- **next.config.ts images.remotePatterns:** Supabase Storage domain'i eklenmediği için Next.js `<Image>` komponenti fotoğrafları reddediyordu → `nzqywomdcgjnxwtndipk.supabase.co` eklendi → tüm gorseller calisiyor
- **Şehirler sayfası 1000 limit:** Supabase `.select()` default 1000 row limiti → pagination (`range()`) eklendi → 451 sehir, 7592 ilan gorunuyor

### Website Fotoğraf Entegrasyonu
- **Script:** `scripts/fetch-website-photos.js`
- Apartmanların kendi web sitelerinden `og:image` / `twitter:image` / ilk büyük `<img>` çekildi
- Supabase Storage'a yüklendi
- 5 batch çalıştırıldı (500'er, %50-75 başarı)
- 210 site engellendi/ulaşılamadı → `~/Desktop/engellenen-siteler.md`

### Bozuk Local Gorsel Fix
- `public/images/apartments/` altında 374 adet 0-byte (boş) dosya tespit edildi
- 255 tanesi veritabanında referans ediliyordu
- Bozuk olanlar placeholder yapıldı, websitelerinden + Google'dan yeniden çekildi

### Final Durum

| Metrik | Başlangıç | Son |
|--------|-----------|-----|
| Toplam ilan | 10,022 | **7,655** |
| Silinen toplam | — | **2,367** |
| Gerçek foto | 2,618 (%26) | **7,001 (%91)** |
| Supabase Storage | 2,618 | **4,823** |
| Local images | 2,666 | **2,178** |
| Placeholder | 4,738 | **649 (%9)** |
| Ratingli | %62 | **%86** |
| Telefonlu | %30 | **%96** |

### Lokal Arşiv
- Fotoğraflar: `~/Desktop/texas-apartment-photos/` (877MB, 4,323 foto, 349 şehir klasörü)
- Fotosuz liste: `~/Desktop/fotosuz-apartmanlar.md`
- Engellenen siteler: `~/Desktop/engellenen-siteler.md`

### Production
- URL: https://texasrentfinder.com
- 64 sayfa, 451 şehir, %91 gerçek fotolu
