"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { Place } from "@/types";
import { escapeHtml } from "@/lib/escapeHtml";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function MapView({
  places,
  onPlaceClick,
}: {
  places: Place[];
  onPlaceClick: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView([31.4, -99.5], 6);

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
    const targetIcon = new L.DivIcon({
      className: "custom-marker",
      html: `<div style="width:28px;height:28px;border-radius:50%;background:#2563eb;color:white;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">★</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const markersArray: L.Marker[] = [];

    places.forEach((place) => {
      if (!place.location) return;
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
      markersArray.push(marker);
      bounds.extend([lat, lng]);
    });

    const clusterGroup = L.markerClusterGroup();
    markersArray.forEach(marker => clusterGroup.addLayer(marker));

    clusterGroupRef.current = clusterGroup.addTo(map);

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  }, [places, onPlaceClick]);

  return (
    <div ref={containerRef} className="h-full w-full" style={{ minHeight: "300px" }} />
  );
}
