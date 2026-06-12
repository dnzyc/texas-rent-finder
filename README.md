# Texas Apartments Platform

Texas apartment listing platform built with Next.js 16.2.9, Supabase, and Leaflet maps.

## Stack

- **Framework:** Next.js 16.2.9 (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL + PostGIS, 5,058 places)
- **Maps:** Leaflet + OpenStreetMap (free, no API key)
- **Mobile:** Capacitor (iOS/Android ready)

## API Endpoints

| Route | Description |
|---|---|
| `GET /api/places` | Filtered place list with pagination |
| `GET /api/places/[slug]` | Single place detail + nearby places |
| `GET /api/filters` | Distinct filter options (county, city, types) |
| `GET /api/suggestions?q=` | Place name autocomplete |

### GET /api/places

Query parameters: `county`, `city`, `zip`, `min_rating`, `q` (name search), `page`, `limit`

Returns paginated results with GeoJSON-friendly coordinates.

### GET /api/places/[slug]

Returns a single place with full details and nearby places sorted by distance.

### GET /api/filters

Returns distinct dropdown options: cities (by county), counties, and property types.

### GET /api/suggestions?q=

Returns matching place names for autocomplete search (max 8 results).

## Getting Started

```bash
npm install
npm run dev -- -p 3000
# http://localhost:3000
```

## Deploy

```bash
npx vercel --prod
```

Production URL: https://texas-apartments-platform.vercel.app

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main listing page
│   ├── layout.tsx            # Root layout
│   ├── place/[slug]/page.tsx # Detail page
│   └── api/
│       ├── places/route.ts   # Place list API
│       ├── places/[slug]/route.ts
│       ├── filters/route.ts
│       └── suggestions/route.ts
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   ├── ApartmentCard.tsx
│   ├── ApartmentList.tsx
│   ├── FilterBar.tsx
│   ├── MapView.tsx           # Leaflet map
│   ├── Pagination.tsx
│   └── ...
├── lib/
│   └── supabase.ts           # Supabase client
└── types/
    └── index.ts
```
