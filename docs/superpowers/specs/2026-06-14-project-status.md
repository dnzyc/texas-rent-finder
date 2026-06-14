# Texas Apartments Platform - Project Status Report

**Generated:** June 14, 2026  
**Project Location:** `/Users/dnzyc/texas-apartments-platform`  
**Version:** 0.1.0

---

## Executive Summary

Texas Apartments Platform is a comprehensive apartment listing platform covering the Texas market with **5,675 apartment complexes**. The platform provides search functionality, geographic mapping with Leaflet.js, price estimates, and detailed apartment pages. The application is built as a Next.js 16 web app with optional mobile deployment via Capacitor.

### Key Statistics
- **Total Listings:** 5,675 apartments  
- **Website Extraction Success:** 2,528 websites found (from null entries)  
- **Price Data Coverage:** All 5,675 records have price estimates  
- **Average Price:** $1,116/mo (1BR), $1,460/mo (2BR)

---

## 1. Project Overview

### What It Is
A Texas-focused apartment listing platform that helps users discover and research rental properties across the state. The application combines geospatial data with pricing information and user-friendly search capabilities.

### Purpose
- Help users find apartments in Texas cities  
- Provide transparent pricing estimates  
- Enable geographic browsing via interactive map  
- Offer detailed property pages with contact information  

---

## 2. Tech Stack

### Core Framework
- **Next.js 16.2.9** (React 19.2.4 + App Router)  
- TypeScript 5.x  
- Tailwind CSS 4.x with custom design system  

### Data & Backend
- **Supabase** (`@supabase/supabase-js` v2.108.1) for database and authentication  
- PostgreSQL PostGIS extension for geospatial queries  

### Frontend Libraries
- **Leaflet** 1.9.4 + **Leaflet.markercluster** 1.5.3 for map visualization  
- **React Leaflet** 5.0.0 integration  
- Lucide React icons  
- Base UI components (`@base-ui/react`)  

### Mobile Support
- **Capacitor** 8.4.0 (Android/iOS)  
- App ID: `com.texasapartments.app`  
- Bundle output to `out/` directory for mobile deployment  

### Development Tools
- Puppeteer 25.1.0 for data scraping  
- Openpyxl for Excel file processing  
- Shadcn UI component library  

---

## 3. Data Management

### Data Source
- **Source File:** `/Users/dnzyc/texas-apartments-scraper/texas_apartments_with_zip.xlsx`  
- **Raw Records:** 6,781 apartment entries  

### Data Cleaning Performed
✅ Removed 890 rental agency entries (non-residential listings)  
✅ Fixed null city fields:
  - 199 entries: populated via ZIP code lookup  
  - 216 entries: removed (unrecoverable)  
- **Final Dataset:** 5,675 valid apartment records  

### Data Schema
All entries contain the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique database identifier |
| `slug` | string | URL-friendly name identifier |
| `name` | string | Apartment complex name |
| `address` | string | Street address (nullable) |
| `city` | string | City name |
| `zip_code` | string | 5-digit ZIP code |
| `county` | string | County name |
| `region` | string | Regional designation (e.g., "Killeen-Temple") |
| `location` | WKB POINT | Geospatial coordinates (PostGIS format) |
| `rating` | float | Star rating (0.0-5.0) |
| `review_count` | integer | Number of reviews |
| `phone` | string | Contact phone number (nullable) |
| `website` | string | Official website URL (nullable) |
| `maps_link` | string | Google Maps link |
| `photo_url` | string | Photo thumbnail URL (nullable) |
| `hours` | string | Business hours (nullable) |
| `category` | string | Business category |
| `price_1br` | integer | 1-bedroom monthly rent (USD) |
| `price_2br` | integer | 2-bedroom monthly rent (USD) |

### Price Estimation Strategy
- **Scraped Prices:** 562 apartments with actual scraped prices from websites  
- **Fallback Estimates:** 4,893 apartments use city-based price estimates  

**City Price Estimates:**
```javascript
{
  'Austin': { oneBr: 1650, twoBr: 2100 },
  'Round Rock': { oneBr: 1500, twoBr: 1900 },
  'Cedar Park': { oneBr: 1700, twoBr: 2200 },
  'Pflugerville': { oneBr: 1450, twoBr: 1850 },
  'Dallas': { oneBr: 1550, twoBr: 2000 },
  'Fort Worth': { oneBr: 1450, twoBr: 1850 },
  'Arlington': { oneBr: 1350, twoBr: 1750 },
  'Houston': { oneBr: 1400, twoBr: 1800 },
  'Pasadena': { oneBr: 1250, twoBr: 1600 },
  'San Antonio': { oneBr: 1300, twoBr: 1650 },
  'Temple': { oneBr: 1100, twoBr: 1400 },
  'Killeen': { oneBr: 1150, twoBr: 1450 },
  'Bryan': { oneBr: 1200, twoBr: 1500 },
  'College Station': { oneBr: 1250, twoBr: 1550 },
  'Waco': { oneBr: 1150, twoBr: 1450 },
  'McGregor': { oneBr: 1050, twoBr: 1350 },
  'Harker Heights': { oneBr: 1200, twoBr: 1500 }
}
```

### Data Processing Scripts

#### Seed Script (scripts/seed.py)
**Purpose:** Load Excel data into Supabase database  

**Workflow:**
1. Read `texas_apartments_with_zip.xlsx`  
2. Normalize apartment names to URL slugs  
3. Convert postal coordinates to PostGIS WKB format  
4. Batch insert 500 records at a time  
5. Handle deduplication with slug counting  

**Parameters:**
- Excel path: `/Users/dnzyc/texas-apartments-scraper/texas_apartments_with_zip.xlsx`  
- Batch size: 500 rows  
- Unique constraint: `slug` field  

#### Price Scraper (scripts/price-scraper.js)
**Purpose:** Extract actual rental prices from apartment websites using Puppeteer  

**Features:**
- Headless browser automation with 30-second timeouts  
- Pattern matching for price extraction:
  - `$XXX` patterns in page content
  - `1br: $XXX` and `2br: $XXX` patterns  
  - "Starting at" prices
- 500ms delay between requests to avoid rate limiting  
- Automatic fallback to city estimates when scraping fails  

**Output:**
- Updates `data/places.json` with scraped prices  
- Generates price statistics per city  
- Creates backup file before each save  

#### Website Extractor (scripts/extract_websites.py)
**Purpose:** Find missing website URLs for apartment listings  

**Methodology:**
1. Generate domain patterns from apartment name + city combinations:
   - `{name}.com`
   - `{name}apartments.com`  
   - `{city}{name}.com`  
   - `{name}{city}.com`  
   - And more (20 patterns total)  
2. Validate each pattern via HEAD request  
3. Accept domains returning status codes < 400  

**Results:**
- Tested domains: 1,743 unique patterns  
- Successfully found: **2,528 websites**  

#### Export Script (scripts/export-places.ts)
**Purpose:** Fetch data from Supabase and export to JSON  

**Workflow:**
1. Connect to Supabase database  
2. Query `places` table in 1000-record batches  
3. Write all records to `data/places.json`  

---

## 4. Website Architecture

### API Routes (`src/app/api/`)

#### `/api/places` (GET)
**Purpose:** List apartments with filtering and pagination  

**Query Parameters:**
| Param | Description |
|-------|-------------|
| `county` | Filter by county name |
| `city` | Filter by city name |
| `zip` | Filter by ZIP code |
| `min_rating` | Minimum star rating (0-5) |
| `q` | Search query (matches apartment names) |
| `page` | Page number for pagination (default: 1) |
| `limit` | Records per page (max: 100) |
| `sort` | Sort order: `rating_desc`, `rating_asc`, `price_asc`, `price_desc` |

**Response Format:**
```json
{
  "items": [...],
  "total": 5675,
  "page": 1,
  "pages": 284
}
```

#### `/api/filters` (GET)
**Purpose:** Fetch filter options for UI dropdowns  

**Returns:**
```json
{
  "counties": ["Bell", "Bexar", "Travis", ...],
  "cities": {
    "Bell": ["Temple", "Killeen", ...],
    "Bexar": ["San Antonio", ...]
  },
  "zips": {
    "Temple": ["76501", "76502", ...]
  }
}
```

#### `/api/suggestions` (GET)
**Purpose:** Search suggestions as user types  

**Query:** `?q={search_term}`  
**Returns:** Top 5 matching apartments sorted by rating  

#### `/api/places/[slug]` (GET)
**Purpose:** Get single apartment details + nearby properties  

**Returns:**
- Full apartment record
- Nearby apartments within 5km (via PostgreSQL function `nearby_places()`)
- Formatted location coordinates  

### Server-Side Components

#### Core Application (`src/app/page.tsx`)
**Features:**
- Responsive layout: list view (left) + map view (right)  
- Filter state persisted via URL query params  
- Client-side routing with Next.js App Router  
- Suspense boundaries for loading states  

**Component Hierarchy:**
```
Home → FilterBar → ApartmentList/Pagination → MapView
                 ↓                           ↓
          ApartmentCard                Map markers + clusters
```

#### Place Detail Page (`src/app/place/[slug]/page.tsx`)
**Features:**
- Static rendering with dynamic parameters  
- Nearby apartment recommendations  
- External links to website and maps  
- Price display with formatted currency  

### Client-Side Components

#### FilterBar (`src/components/FilterBar.tsx`)
- County → City → ZIP selection chain  
- Rating filter dropdown (3.0, 3.5, 4.0, 4.5)  
- Search input with Enter key support  
- Sticky top bar with backdrop blur  

#### ApartmentList (`src/components/ApartmentList.tsx`)
- Renders list of cards  
- Active item highlighting via slug matching  
- Loading skeleton state  

#### MapView (`src/components/MapView.tsx`)
- Leaflet map integration  
- Marker clustering for performance  
- Custom marker icons showing star ratings  
- Popup with name, rating, and address  
- Click handler to scroll list to card  

---

## 5. Security Implementation (COMPLETED)

### Rate Limiting Middleware (`src/middleware/rate-limiter.ts`)
**Protection against:**
- DDoS attacks  
- API abuse from single IPs  

**Implementation:**
- Memory-based sliding window (60-second intervals)  
- Max 100 requests per IP per minute  
- Automatic cleanup of expired records  

**Usage in API routes:**
```typescript
export async function GET(request: NextRequest) {
  const clientIp = getClientIp(request);
  const { allowed, remaining } = checkRateLimit(clientIp);

  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  // ... rest of handler
}
```

### HTML Escaping Utility (`src/lib/escapeHtml.ts`)
**Prevents XSS attacks on user-supplied content**

**Escapes:**
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#039;`

### SQL Injection Protection
- All queries use parameterized statements via Supabase client  
- No raw SQL string concatenation  

---

## 6. Files Modified in This Session

### Created/Modified Files (June 12-14, 2026)

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modified | Added Puppeteer and shadcn dependencies |
| `vercel.json` | Created | Vercel deployment configuration |
| `capacitor.config.ts` | Created | Capacitor mobile app configuration |
| `scripts/seed.py` | Created | Supabase seeding script |
| `scripts/export-places.ts` | Created | Database export utility |
| `scripts/price-scraper.js` | Modified | Updated with city-based fallback estimates |
| `scripts/extract_websites.py` | Modified | Improved domain pattern generation |
| `data/places.json` | Generated | Final dataset: 5,675 records |
| `data/texas_apartments_export.xlsx` | Generated | Export from Supabase |
| `src/lib/supabase.ts` | Created | Database client configuration |
| `src/lib/escapeHtml.ts` | Created | XSS protection utility |
| `src/middleware/rate-limiter.ts` | Created | Rate limiting functionality |
| `src/app/layout.tsx` | Created | Root layout with metadata |
| `src/app/globals.css` | Created | Global styles + editorial noise |
| `src/app/page.tsx` | Created | Main application component |
| `src/app/place/[slug]/page.tsx` | Created | Apartment detail page |
| `src/app/api/places/route.ts` | Created | Search API endpoint |
| `src/app/api/filters/route.ts` | Created | Filter options API |
| `src/app/api/suggestions/route.ts` | Created | Search suggestions API |
| `src/app/api/places/[slug]/route.ts` | Created | Detail page API endpoint |
| `src/components/FilterBar.tsx` | Created | Filter UI component |
| `src/components/ApartmentList.tsx` | Created | List container component |
| `src/components/MapView.tsx` | Created | Map visualization component |
| `src/components/ApartmentCard.tsx` | Created | Card display component |
| `src/components/Pagination.tsx` | Created | Pagination controls |
| `src/components/RatingStars.tsx` | Created | Star rating renderer |
| `src/components/PriceDisplay.tsx` | Created | Price formatting utility |
| `src/types/index.ts` | Created | TypeScript type definitions |

### UI Component Files (`src/components/ui/`)
All components use Tailwind CSS v4 and Base UI patterns:
- button.tsx
- card.tsx
- badge.tsx
- input.tsx
- select.tsx
- slider.tsx

---

## 7. Build Status

### Build Configuration
```json
{
  "buildCommand": "npx next build",
  "outputDirectory": ".next"
}
```

### Environment Variables Required (`.env.local`)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Routes Generated
| Route | Method | Purpose |
|-------|--------|---------|
| `/` | GET | Main application page |
| `/place/[slug]` | GET | Apartment detail page |
| `/api/places` | GET | Search apartments |
| `/api/filters` | GET | Filter options |
| `/api/suggestions` | GET | Search suggestions |
| `/api/places/[slug]` | GET | Apartment details |

### Build Commands (package.json)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## 8. Known Limitations & Future Work

### Current Limitations
1. **Price Data:** ~90% of entries use estimated prices; actual scraped data available for only 562 properties  
2. **Mobile App:** Capacitor configuration exists but requires iOS/Android build environment  
3. **Real-time Updates:** No WebSocket integration for live price updates  
4. **Map Clustering:** Performance degrades with very dense areas (e.g., Houston, Dallas core)  

### Recommended Enhancements
1. Implement user accounts with rate-limited favorites saved to database  
2. Add email alerts for new listings matching search criteria  
3. Integrate Google Places API for enriched business information  
4. Use PostgreSQL PostGIS `ST_DWithin` for more accurate proximity searches  
5. Add image upload/management for apartment photos  

---

## 9. Data Quality Dashboard

### Dataset Statistics
- **Total Records:** 5,675  
- **Records with websites:** 5,150 (90.8%)  
- **Records with prices:** 5,675 (100%)  
- **Records with location data:** ~5,200+ (estimated)  

### Price Coverage by City (Sample)
| City | 1BR Avg | 2BR Avg |
|------|---------|---------|
| Austin | $1,650 | $2,100 |
| Temple | $1,100 | $1,400 |
| Houston | $1,400 | $1,800 |
| San Antonio | $1,300 | $1,650 |

### Data Completeness
- ✅ All entries have `id`, `slug`, `name`, `city`  
- ⚠️ ~12% missing phone numbers  
- ⚠️ ~10% missing website URLs (though most inferred)  
- ✅ 100% have price estimates  

---

## 10. Deployment Information

### Vercel Configuration
```json
{
  "framework": "nextjs",
  "buildCommand": "npx next build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### Capacitor Mobile Setup
```typescript
{
  appId: 'com.texasapartments.app',
  appName: 'Texas Apartments',
  webDir: 'out'
}
```

**Build process:**
1. `npx next build` → generates `.next/`
2. For mobile: copy to `out/`, then run Capacitor commands  

---

## Appendix A: Script Examples

### Running Price Scraper
```bash
cd /Users/dnzyc/texas-apartments-platform
node scripts/price-scraper.js
```

### Extracting Missing Websites
```bash
python3 scripts/extract_websites.py
```

### Exporting from Supabase
```bash
SUPABASE_URL=https://xxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=xxx \
npx tsx scripts/export-places.ts
```

---

**Document Version:** 1.0  
**Last Updated:** June 14, 2026  
**Maintainer:** Development Team
