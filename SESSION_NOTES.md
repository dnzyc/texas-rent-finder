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
1. GitHub'a push + Vercel deploy
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
