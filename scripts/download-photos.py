#!/usr/bin/env python3
"""Supabase Storage'daki apartman fotograflarini lokal klasore indirir.
Yapi: fotograflar/{city}/{slug}.jpg
Paralel 10 worker ile hizli indirme."""

import json, os, sys, time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.request import urlopen, Request
from urllib.error import URLError

OUTPUT_DIR = os.path.expanduser("~/Desktop/texas-apartment-photos")
os.makedirs(OUTPUT_DIR, exist_ok=True)

with open("/tmp/photo-download-list.json") as f:
    photos = json.load(f)

print(f"Toplam: {len(photos)} fotograf")
print(f"Hedef: {OUTPUT_DIR}")

stats = {"ok": 0, "fail": 0, "total": len(photos)}

def download(photo, i):
    try:
        city = photo["city"].replace("/", "-") or "unknown"
        city_dir = os.path.join(OUTPUT_DIR, city)
        os.makedirs(city_dir, exist_ok=True)
        
        fname = photo["slug"] + ".jpg"
        fpath = os.path.join(city_dir, fname)
        
        if os.path.exists(fpath) and os.path.getsize(fpath) > 500:
            stats["ok"] += 1
            return (i, "SKIP", photo["slug"])
        
        req = Request(photo["url"], headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=15) as resp:
            data = resp.read()
        
        if len(data) < 500:
            stats["fail"] += 1
            return (i, "SMALL", photo["slug"])
        
        with open(fpath, "wb") as f:
            f.write(data)
        
        stats["ok"] += 1
        return (i, "OK", photo["slug"])
    except Exception as e:
        stats["fail"] += 1
        return (i, "ERR", f"{photo['slug']}: {str(e)[:50]}")

print(f"\nBasliyor (10 paralel worker)...\n")

with ThreadPoolExecutor(max_workers=10) as executor:
    futures = {executor.submit(download, p, i): i for i, p in enumerate(photos)}
    last_report = 0
    for future in as_completed(futures):
        i, status, slug = future.result()
        if i % 100 == 0 or i >= stats["total"] - 1:
            pct = (i + 1) / stats["total"] * 100
            print(f"  [{i+1}/{stats['total']}] %{pct:.0f} | OK:{stats['ok']} FAIL:{stats['fail']}")

print(f"\nTamamlandi!")
print(f"Basarili: {stats['ok']}")
print(f"Basarisiz: {stats['fail']}")

# Sehir bazinda ozet
cities = {}
for p in photos:
    c = p["city"].replace("/", "-") or "unknown"
    cities[c] = cities.get(c, 0) + 1
print(f"\nKlasor: {OUTPUT_DIR}")
print(f"Sehir klasoru sayisi: {len(cities)}")
