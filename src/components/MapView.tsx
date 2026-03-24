"use client";
import { useEffect, useRef } from "react";
import type { Post } from "@/data/mock";
import type { Restaurant } from "@/lib/supabase";

interface Props {
  posts: Post[];
  userColors: Record<string, string>;
  selectedPin: number | null;
  onPinClick: (id: number) => void;
  restaurants?: Restaurant[];
}

export default function MapView({ posts, userColors, selectedPin, onPinClick, restaurants = [] }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const restaurantMarkersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") return;

    // Add leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet").then((L) => {

      if (mapInstanceRef.current) return; // already initialized

      const map = L.map(mapRef.current!, {
        center: [37.555, 126.97],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add markers
      updateMarkers(L, map, posts, userColors, selectedPin, onPinClick);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when posts/selectedPin change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      updateMarkers(L, mapInstanceRef.current, posts, userColors, selectedPin, onPinClick);

      // Fly to selected
      if (selectedPin) {
        const post = posts.find((p) => p.id === selectedPin);
        if (post) mapInstanceRef.current.flyTo([post.lat, post.lng], 15, { duration: 0.5 });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, selectedPin]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function updateMarkers(L: any, map: any, posts: Post[], colors: Record<string, string>, selected: number | null, onClick: (id: number) => void) {
    // Clear existing
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    posts.forEach((post) => {
      const color = colors[post.user] || "#FF6B35";
      const isSel = selected === post.id;
      const size = isSel ? 52 : 40;

      const icon = L.divIcon({
        className: "",
        iconSize: [size, size + 18],
        iconAnchor: [size / 2, size + 18],
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
            <div style="
              width:${size}px;height:${size}px;
              border-radius:50%;
              border:3px solid ${color};
              overflow:hidden;
              box-shadow:0 0 ${isSel ? 16 : 8}px ${color}80;
            ">
              <img src="${post.image}" style="width:100%;height:100%;object-fit:cover;" />
            </div>
            <div style="
              margin-top:2px;padding:1px 6px;
              background:rgba(0,0,0,0.75);border-radius:4px;
              font-size:10px;color:rgba(255,255,255,0.85);
              white-space:nowrap;max-width:70px;overflow:hidden;text-overflow:ellipsis;
              backdrop-filter:blur(4px);
            ">${post.place}</div>
          </div>
        `,
      });

      const marker = L.marker([post.lat, post.lng], { icon }).addTo(map);
      marker.on("click", () => onClick(post.id));
      markersRef.current.push(marker);
    });
  }

  // Restaurant markers from DB
  useEffect(() => {
    if (!mapInstanceRef.current || restaurants.length === 0) return;
    import("leaflet").then((L) => {
      // Clear old restaurant markers
      restaurantMarkersRef.current.forEach((m) => mapInstanceRef.current.removeLayer(m));
      restaurantMarkersRef.current = [];

      restaurants.forEach((r) => {
        if (!r.lat || !r.lng) return;
        const icon = L.divIcon({
          className: "",
          iconSize: [32, 44],
          iconAnchor: [16, 44],
          html: `
            <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
              <div style="
                width:32px;height:32px;
                border-radius:50%;
                background:#FF6B35;
                border:2px solid #FF6B35;
                display:flex;align-items:center;justify-content:center;
                box-shadow:0 0 8px rgba(255,107,53,0.5);
                font-size:16px;
              ">🍽️</div>
              <div style="
                margin-top:2px;padding:1px 6px;
                background:rgba(0,0,0,0.75);border-radius:4px;
                font-size:10px;color:rgba(255,255,255,0.85);
                white-space:nowrap;max-width:80px;overflow:hidden;text-overflow:ellipsis;
                backdrop-filter:blur(4px);
              ">${r.name}</div>
            </div>
          `,
        });

        const marker = L.marker([r.lat, r.lng], { icon }).addTo(mapInstanceRef.current);
        marker.bindPopup(`
          <div style="font-size:13px;min-width:120px;">
            <strong>${r.name}</strong><br/>
            <span style="color:#888;">${r.category} · ${r.area}</span>
            ${r.rating ? `<br/>⭐ ${Number(r.rating).toFixed(1)}` : ""}
          </div>
        `);
        restaurantMarkersRef.current.push(marker);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
