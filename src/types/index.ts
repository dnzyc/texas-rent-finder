export interface Place {
  id: number;
  slug: string;
  name: string;
  address: string | null;
  city: string | null;
  zip_code: string | null;
  county: string | null;
  region: string | null;
  rating: number | null;
  review_count: number | null;
  phone: string | null;
  website: string | null;
  maps_link: string | null;
  photo_url: string | null;
  hours: string | null;
  category: string | null;
  price_1br: number | null;
  price_2br: number | null;
  location: { lat: number; lng: number } | null;
}

export interface FilterState {
  county: string;
  city: string;
  zip: string;
  minRating: number;
  query: string;
}

export interface FilterOptions {
  counties: string[];
  cities: Record<string, string[]>;
  zips: Record<string, string[]>;
}

export interface PlacesResponse {
  items: Place[];
  total: number;
  page: number;
  pages: number;
}

export interface PlaceWithNearby extends Place {
  nearby: Place[];
}
