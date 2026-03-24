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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clusterGroupRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") return;

    // Add leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    // MarkerCluster CSS
    if (!document.querySelector('link[href*="MarkerCluster"]')) {
      const link1 = document.createElement("link");
      link1.rel = "stylesheet";
      link1.href = "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css";
      document.head.appendChild(link1);
      const link2 = document.createElement("link");
      link2.rel = "stylesheet";
      link2.href = "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css";
      document.head.appendChild(link2);
    }

    import("leaflet").then((L) => {
      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current!, {
        center: [37.555, 126.97],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // Bright, clean tile (Carto Voyager - like Google Maps but free)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      }).addTo(map);

      // Zoom control bottom-right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      mapInstanceRef.current = map;
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

  // Update post markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      updateMarkers(L, mapInstanceRef.current, posts, userColors, selectedPin, onPinClick);
      if (selectedPin) {
        const post = posts.find((p) => p.id === selectedPin);
        if (post) mapInstanceRef.current.flyTo([post.lat, post.lng], 15, { duration: 0.5 });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, selectedPin]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function updateMarkers(L: any, map: any, posts: Post[], colors: Record<string, string>, selected: number | null, onClick: (id: number) => void) {
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

  // Restaurant markers from DB with clustering
  useEffect(() => {
    if (!mapInstanceRef.current || restaurants.length === 0) return;

    // Dynamic import for markercluster
    Promise.all([
      import("leaflet"),
      import("leaflet.markercluster").catch(() => {
        // Fallback: load from CDN
        return new Promise<void>((resolve) => {
          if (document.querySelector('script[src*="leaflet.markercluster"]')) {
            resolve();
            return;
          }
          const s = document.createElement("script");
          s.src = "https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js";
          s.onload = () => resolve();
          document.head.appendChild(s);
        });
      })
    ]).then(([L]) => {
      const map = mapInstanceRef.current;

      // Clear old
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
      }
      restaurantMarkersRef.current = [];

      const categoryEmoji: Record<string, string> = {
        '한식': '🍚', '양식': '🍝', '일식': '🍣', '중식': '🥟',
        '카페': '☕', '술집': '🍺', '분식': '🍡', '디저트': '🍰',
      };
      const categoryColor: Record<string, string> = {
        '한식': '#E74C3C', '양식': '#3498DB', '일식': '#E67E22', '중식': '#9B59B6',
        '카페': '#F39C12', '술집': '#1ABC9C', '분식': '#E91E63', '디저트': '#FF6B35',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cluster = (L as any).markerClusterGroup({
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconCreateFunction: (c: any) => {
          const count = c.getChildCount();
          let size = 36;
          let bg = '#FF6B35';
          if (count > 50) { size = 48; bg = '#E74C3C'; }
          else if (count > 20) { size = 42; bg = '#E67E22'; }
          return L.divIcon({
            html: `<div style="
              width:${size}px;height:${size}px;
              border-radius:50%;
              background:${bg};
              color:#fff;
              font-weight:700;
              font-size:${count > 99 ? 11 : 13}px;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 8px rgba(0,0,0,0.3);
              border:2px solid #fff;
            ">${count}</div>`,
            className: '',
            iconSize: [size, size],
          });
        }
      });

      restaurants.forEach((r) => {
        if (!r.lat || !r.lng) return;
        const emoji = categoryEmoji[r.category] || '🍽️';
        const color = categoryColor[r.category] || '#FF6B35';

        const icon = L.divIcon({
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          html: `<div style="
            width:28px;height:28px;border-radius:50%;
            background:${color};
            display:flex;align-items:center;justify-content:center;
            font-size:14px;
            box-shadow:0 2px 6px rgba(0,0,0,0.25);
            border:2px solid #fff;
            cursor:pointer;
          ">${emoji}</div>`,
        });

        const marker = L.marker([r.lat, r.lng], { icon });
        marker.bindPopup(`
          <div style="font-size:13px;min-width:140px;line-height:1.5;">
            <strong>${emoji} ${r.name}</strong><br/>
            <span style="color:#666;font-size:11px;">${r.category} · ${r.area}</span>
            ${r.address ? `<br/><span style="color:#999;font-size:10px;">📍 ${r.address}</span>` : ''}
            ${r.phone ? `<br/><span style="color:#999;font-size:10px;">📞 ${r.phone}</span>` : ''}
          </div>
        `, { offset: [0, -5] });

        cluster.addLayer(marker);
        restaurantMarkersRef.current.push(marker);
      });

      cluster.addTo(map);
      clusterGroupRef.current = cluster;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
