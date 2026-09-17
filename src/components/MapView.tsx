"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { Place } from "@/types";
import { FilterState } from "@/types";
import { escapeHtml } from "@/lib/escapeHtml";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const markerIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

const noLocationIcon = new L.DivIcon({
  className: "custom-marker no-location",
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#6b7280;color:white;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">&#x2298;</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const clusterIcons = [
  { min: 0, max: 9, html: `<div style="width:28px;height:28px;border-radius:50%;background:#e2e8f0;color:#64748b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #cbd5e1">1</div>` },
  { min: 10, max: 29, html: `<div style="width:28px;height:28px;border-radius:50%;background:#cbd5e1;color:#1e293b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #94a3b8">2</div>` },
  { min: 30, max: 49, html: `<div style="width:28px;height:28px;border-radius:50%;background:#94a3b8;color:#1e293b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #64748b">3</div>` },
  { min: 50, max: 74, html: `<div style="width:28px;height:28px;border-radius:50%;background:#64748b;color:#1e293b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #475569">4</div>` },
  { min: 75, max: 99, html: `<div style="width:28px;height:28px;border-radius:50%;background:#475569;color:#1e293b;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #334155">5</div>` },
  { min: 100, max: 9999, html: `<div style="width:28px;height:28px;border-radius:50%;background:#334155;color:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid #1e293b">6+</div>` },
];

function getClusterIcon(count: number) {
  const cluster = clusterIcons.find(c => count >= c.min && count <= c.max);
  return cluster ? cluster.html : clusterIcons[clusterIcons.length - 1].html;
}

export function MapView({
  places,
  onPlaceClick,
  onMapBoundsChange,
  currentFilters,
}: {
  places: Place[];
  onPlaceClick: (slug: string) => void;
  onMapBoundsChange: (bounds: { south: number; north: number; west: number; east: number }) => void;
  currentFilters?: FilterState;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [currentBounds, setCurrentBounds] = useState<{
    swLat: number | null;
    swLng: number | null;
    neLat: number | null;
    neLng: number | null;
  }>({ swLat: null, swLng: null, neLat: null, neLng: null });

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const texasBounds = L.latLngBounds(
      [25.8, -106.6],
      [36.5, -93.5]
    );

    mapRef.current = L.map(containerRef.current, {
      center: [31.4, -99.5],
      zoom: 6,
      minZoom: 6,
      maxBounds: texasBounds.pad(0.2),
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(mapRef.current);

    return () => {
      if (clusterGroupRef.current) {
        mapRef.current?.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !places.length) return;

    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
    }

    const bounds = L.latLngBounds([]);
    const markersArray: L.Marker[] = [];

    places.forEach((place) => {
      if (!place.location) {
        const noLocMarker = L.marker([0, 0], { icon: noLocationIcon })
          .bindPopup(`<b>${escapeHtml(place.name)}</b><br><small>No location data</small>`);
        markersArray.push(noLocMarker);
        bounds.extend([0, 0]);
        return;
      }
      const { lat, lng } = place.location;

      const ratingText = place.rating ? place.rating.toFixed(1) : "—";
      const icon = new L.DivIcon({
        className: "custom-marker",
        html: `<div style="width:30px;height:30px;border-radius:50%;background:#2563eb;color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer">${ratingText}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const escapedName = escapeHtml(place.name);
      const escapedAddress = place.address ? escapeHtml(place.address) : "";

      const marker = L.marker([lat, lng], { icon })
        .bindPopup(
          `<b>${escapedName}</b>${place.rating ? `<br>★ ${place.rating.toFixed(1)}` : ""}${escapedAddress ? `<br><small>${escapedAddress}</small>` : ""}`
        );

      marker.on("click", () => onPlaceClick(place.slug));
      marker.on("mouseover", () => setHoveredMarkerId(place.slug));
      marker.on("mouseout", () => setHoveredMarkerId(null));
      markersArray.push(marker);
      bounds.extend([lat, lng]);
    });

    const clusterGroup = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const count = cluster.getAllChildMarkers().length;
        return L.divIcon({
          html: getClusterIcon(count),
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
      },
    });
    markersArray.forEach(marker => clusterGroup.addLayer(marker));

    clusterGroupRef.current = clusterGroup.addTo(map);

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
    map.invalidateSize();
  }, [places, onPlaceClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let timeoutId: NodeJS.Timeout;
    const debouncedMove = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const bounds = map.getBounds();
          const swLat = parseFloat(bounds.getSouth().toFixed(6));
          const swLng = parseFloat(bounds.getWest().toFixed(6));
          const neLat = parseFloat(bounds.getNorth().toFixed(6));
          const neLng = parseFloat(bounds.getEast().toFixed(6));

          setCurrentBounds({ swLat, swLng, neLat, neLng });

          const params = new URLSearchParams();
          params.set("swLat", swLat.toString());
          params.set("swLng", swLng.toString());
          params.set("neLat", neLat.toString());
          params.set("neLng", neLng.toString());
          if (searchQuery) {
            params.set("q", searchQuery);
          }
          const filters = currentFilters || { county: "", city: "", zip: "", minRating: 0 };
          if (filters.county) {
            params.set("county", filters.county);
          }
          if (filters.city) {
            params.set("city", filters.city);
          }
          if (filters.zip) {
            params.set("zip", filters.zip);
          }
          if (filters.minRating && filters.minRating > 0) {
            params.set("min_rating", String(filters.minRating));
          }

          const response = await fetch(
            `/api/places/map?${params.toString()}`,
            { cache: "no-cache" }
          );
          const data = await response.json();
          setSearchResults(data.items || []);
          const b = map.getBounds();
          onMapBoundsChange({
            south: parseFloat(b.getSouth().toFixed(6)),
            north: parseFloat(b.getNorth().toFixed(6)),
            west: parseFloat(b.getWest().toFixed(6)),
            east: parseFloat(b.getEast().toFixed(6)),
          });
        } catch (error) {
          console.error("Map filter error:", error);
        }
      }, 250);
    };

    map.on("move", debouncedMove);

    return () => {
      map.off("move", debouncedMove);
      clearTimeout(timeoutId);
    };
  }, [mapRef.current, searchQuery, currentFilters, onMapBoundsChange]);

  return (
    <div ref={containerRef} className="h-full w-full relative" style={{ minHeight: "400px" }}>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-sm p-2 flex items-center max-w-xs z-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search listings..."
          className="flex-1 border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={!mapRef.current}
        />
        <button
          onClick={async () => {
            if (!mapRef.current) return;
            const map = mapRef.current;
            const bounds = map.getBounds();
            const swLat = parseFloat(bounds.getSouth().toFixed(6));
            const swLng = parseFloat(bounds.getWest().toFixed(6));
            const neLat = parseFloat(bounds.getNorth().toFixed(6));
            const neLng = parseFloat(bounds.getEast().toFixed(6));

            const params = new URLSearchParams();
            params.set("swLat", swLat.toString());
            params.set("swLng", swLng.toString());
            params.set("neLat", neLat.toString());
            params.set("neLng", neLng.toString());
            params.set("q", searchQuery);

            setSearchQuery("");
            setSearchResults([]);
            const data = await fetch(
              `/api/places/map?${params.toString()}`,
              { cache: "no-cache" }
            ).then(res => res.json());
            setSearchResults(data.items || []);
          }}
          className="ml-2 px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors"
        >
          Search
        </button>
      </div>

      {hoveredMarkerId && (
        <div
          className="absolute bottom-2 left-2 z-10 rounded-lg bg-white p-3 shadow-lg max-w-xs text-sm"
          style={{ maxWidth: "200px" }}
        >
          <div className="font-medium text-gray-900 mb-1">
            {escapeHtml(hoveredMarkerId)}
          </div>
          <div className="text-xs text-gray-500">
            {places.find((p) => p.slug === hoveredMarkerId)?.address || ""}
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 max-w-md w-full z-10 max-h-96 overflow-y-auto">
          <div className="font-medium text-gray-900 mb-2">Results ({searchResults.length})</div>
          {searchResults.map((place) => (
            <div
              key={place.slug}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50"
              onClick={() => onPlaceClick(place.slug)}
            >
              <div className="font-medium text-gray-900 hover:underline">
                {place.name}
              </div>
              <div className="text-xs text-gray-500">
                {place.address || ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
