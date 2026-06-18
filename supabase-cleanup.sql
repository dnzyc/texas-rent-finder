-- TexasRentFinder.com — Veri Temizlik Scripti
-- Supabase SQL Editor'da çalıştırın

-- 1. "Sponsored" isimli ilanları düzelt
UPDATE places SET name = 'Hartwin Bulverde' WHERE id = 358;
UPDATE places SET name = 'Palo Alto Apartment Homes' WHERE id = 289;

-- 2. Apartman olmayan kayıtları temizle
-- AGS Landscaping & Repairs (peyzaj firması)
DELETE FROM places WHERE id = 842;

-- "throphy club tx" (kulüp, apartman değil)
DELETE FROM places WHERE id = 3557;

-- "Ornelly" (sokak adı, apartman değil)
DELETE FROM places WHERE id = 3556;

-- "S. Phopho" (anlamsız isim)
DELETE FROM places WHERE id = 3496;

-- "Home💕" (emoji içeren isim, veri kalitesi düşük)
DELETE FROM places WHERE id = 3432;

-- "New home" (jenerik isim)
DELETE FROM places WHERE id = 179;

-- 3. Placeholder fotoğraf sayısını kontrol et
SELECT COUNT(*) AS placeholder_count FROM places WHERE photo_url = '/images/placeholder-apartment.png';

-- 4. Şüpheli kategorileri listele
SELECT category, COUNT(*) AS count FROM places 
WHERE category NOT IN ('Apartment complex', 'Apartment building', 'Apartment rental agency', 'Condominium complex', 'Furnished apartment building')
GROUP BY category ORDER BY count DESC;

-- 5. Fiyatı olmayan ilanları işaretle (opsiyonel)
-- SELECT COUNT(*) FROM places WHERE price_1br IS NULL AND price_2br IS NULL;
