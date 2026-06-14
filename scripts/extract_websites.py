#!/usr/bin/env python3
"""
Website extraction script - Pattern matching only (no API calls, no scraping).
Reads places.json, generates possible URLs for entries with null/empty website,
checks if domain exists via HEAD request, updates the data.
"""

import json
import re
from pathlib import Path

try:
    import requests
except ImportError:
    print("Installing requests...")
    import subprocess
    subprocess.check_call(["pip", "install", "requests"])
    import requests


def normalize_name(name):
    """Normalize apartment name: remove spaces, special chars, lowercase."""
    normalized = re.sub(r'[^\w\s]', '', name)
    normalized = re.sub(r'\s+', ' ', normalized).strip()
    return normalized.lower().replace('apartments', '').replace('housing', '').strip()


def is_valid_domain(domain):
    """Check if domain looks valid (not empty, has tld, no paths)."""
    if not domain or not isinstance(domain, str):
        return False
    domain = domain.strip()
    if not domain or '.' not in domain:
        return False
    # Remove protocol if present
    domain = re.sub(r'^https?://', '', domain)
    # Check for path (not just domain)
    if '/' in domain:
        return False
    return True


def normalize_domain(domain):
    """Normalize domain: remove protocol, trailing slash, paths."""
    if not is_valid_domain(domain):
        return None
    domain = domain.strip()
    domain = re.sub(r'^https?://', '', domain)
    domain = re.sub(r'/.*$', '', domain)
    return domain.lower()


def load_data():
    """Load places.json with portable path resolution."""
    script_dir = Path(__file__).parent
    data_path = script_dir.parent / "data" / "places.json"
    
    print(f"Reading {data_path}...")
    with open(data_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_data(entries):
    """Save places.json with portable path resolution."""
    script_dir = Path(__file__).parent
    data_path = script_dir.parent / "data" / "places.json"
    
    print(f"Saving to {data_path}...")
    with open(data_path, 'w', encoding='utf-8') as f:
        json.dump(entries, f, indent=2, ensure_ascii=False)
    
    print("Save complete.")


def generate_domain_patterns(normalized_name, city):
    """Generate possible domain patterns from name and city."""
    city_normalized = re.sub(r'\s+', '', city.lower())
    name_parts = [p for p in normalized_name.split() if len(p) > 2]
    
    if not name_parts:
        return []
    
    patterns = set()
    
    combined = ''.join(name_parts)
    
    city_first = f"{city_normalized}{combined}"
    
    for part in name_parts:
        if not part.endswith('apartments'):
            patterns.add(f"{part}.com")
            patterns.add(f"{part}apartments.com")
        patterns.add(f"{part}{city_normalized}.com")
        patterns.add(f"{part}texas.com")
    
    patterns.add(f"{combined}.com")
    if not combined.endswith('apartments'):
        patterns.add(f"{combined}apartments.com")
    patterns.add(f"{combined}{city_normalized}.com")
    patterns.add(f"{city_first}.com")
    if not city_first.endswith('apartments'):
        patterns.add(f"{city_first}apartments.com")
    
    return list(patterns)


def check_domain_exists(domain, timeout=3):
    """Check if domain exists via HEAD request with faster timeout."""
    try:
        url = f"https://{domain}" if not domain.startswith('http') else domain
        response = requests.head(url, timeout=timeout, allow_redirects=True)
        return response.status_code < 400
    except (requests.exceptions.RequestException, ValueError):
        pass
    
    try:
        url = f"http://{domain}" if not domain.startswith('http') else domain
        response = requests.head(url, timeout=timeout, allow_redirects=True)
        return response.status_code < 400
    except (requests.exceptions.RequestException, ValueError):
        pass
    
    return False


def main():
    entries = load_data()
    
    total_entries = len(entries)
    missing_websites_idx = [(i, e) for i, e in enumerate(entries) if not (e.get('website') or '').strip()]
    print(f"Total entries: {total_entries}")
    print(f"Entries with null/empty website: {len(missing_websites_idx)}")
    
    found_count = 0
    tested_domains = set()
    results_log = []
    
    for search_idx, (entry_idx, entry) in enumerate(missing_websites_idx, 1):
        name = entry.get('name', '')
        city = entry.get('city', '')
        
        if not name or not city:
            continue
        
        normalized_name = normalize_name(name)
        patterns = generate_domain_patterns(normalized_name, city)
        
        found = False
        for pattern in patterns[:20]:  # Limit to top 20 patterns per entry
            if pattern in tested_domains:
                continue
            
            tested_domains.add(pattern)
            
            if check_domain_exists(pattern):
                entries[entry_idx]['website'] = f"https://{pattern}"
                found_count += 1
                found = True
                results_log.append({
                    'id': entry.get('id'),
                    'name': name,
                    'city': city,
                    'found_domain': pattern
                })
                print(f"[{search_idx}/{len(missing_websites_idx)}] FOUND: {pattern}")
        
        if search_idx % 50 == 0:
            print(f"Progress: {search_idx}/{len(missing_websites_idx)} entries processed")
    
    final_missing = len([e for e in entries if not (e.get('website') or '').strip()])
    save_data(entries)
    
    print("\n" + "="*60)
    print("RESULTS:")
    print("="*60)
    print(f"Total domains tested: {len(tested_domains)}")
    print(f"Websites found: {found_count}")
    print(f"Still missing: {final_missing}")
    print("="*60)
    
    if results_log:
        script_dir = Path(__file__).parent
        log_path = script_dir.parent / "data" / "extracted_websites.json"
        with open(log_path, 'w', encoding='utf-8') as f:
            json.dump(results_log, f, indent=2)
        print(f"Found domains saved to: {log_path}")


if __name__ == "__main__":
    main()

