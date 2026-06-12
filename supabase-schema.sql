-- Run this in Supabase SQL Editor after creating the project
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    zip_code TEXT,
    county TEXT,
    region TEXT,
    location GEOGRAPHY(POINT, 4326),
    rating REAL,
    review_count INTEGER,
    phone TEXT,
    website TEXT,
    maps_link TEXT,
    photo_url TEXT,
    hours TEXT,
    category TEXT,
    price_1br INTEGER,
    price_2br INTEGER,
    last_price_update TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_places_county ON places(county);
CREATE INDEX idx_places_city ON places(city);
CREATE INDEX idx_places_zip ON places(zip_code);
CREATE INDEX idx_places_rating ON places(rating DESC);
CREATE INDEX idx_places_price ON places(price_1br);
CREATE INDEX idx_places_location ON places USING GIST(location);
CREATE INDEX idx_places_slug ON places(slug);

-- Row Level Security (read-only public access, no auth)
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON places FOR SELECT USING (true);

-- PostGIS RPC function for nearby places
CREATE OR REPLACE FUNCTION nearby_places(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_m INTEGER DEFAULT 5000,
  exclude_id INTEGER DEFAULT NULL,
  limit_count INTEGER DEFAULT 5
)
RETURNS SETOF places
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM places
  WHERE id != exclude_id
    AND ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
      radius_m
    )
  ORDER BY location <-> ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
  LIMIT limit_count;
$$;
