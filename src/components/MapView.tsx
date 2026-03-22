"use client";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Post } from "@/data/mock";
import { useEffect } from "react";

interface Props {
  posts: Post[];
  userColors: Record<string, string>;
  selectedPin: number | null;
  onPinClick: (id: number) => void;
}

function createFoodIcon(post: Post, color: string, isSelected: boolean) {
  const size = isSelected ? 52 : 40;
  return L.divIcon({
    className: "",
    iconSize: [size, size + 16],
    iconAnchor: [size / 2, size + 16],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:${size}px;height:${size}px;
          border-radius:50%;
          border:3px solid ${color};
          overflow:hidden;
          box-shadow:0 0 ${isSelected ? 16 : 8}px ${color}80;
          transition:all 0.2s;
        ">
          <img src="${post.image}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
        <div style="
          margin-top:2px;
          padding:1px 6px;
          background:rgba(0,0,0,0.7);
          border-radius:4px;
          font-size:10px;
          color:rgba(255,255,255,0.85);
          white-space:nowrap;
          max-width:70px;
          overflow:hidden;
          text-overflow:ellipsis;
          backdrop-filter:blur(4px);
        ">${post.place}</div>
      </div>
    `,
  });
}

function FlyToSelected({ posts, selectedPin }: { posts: Post[]; selectedPin: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedPin) {
      const post = posts.find((p) => p.id === selectedPin);
      if (post) map.flyTo([post.lat, post.lng], 15, { duration: 0.5 });
    }
  }, [selectedPin, posts, map]);
  return null;
}

export default function MapView({ posts, userColors, selectedPin, onPinClick }: Props) {
  // Center on Seoul
  const center: [number, number] = [37.555, 126.97];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
      attributionControl={false}
    >
      {/* Dark map tiles */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />

      <FlyToSelected posts={posts} selectedPin={selectedPin} />

      {posts.map((post) => {
        const color = userColors[post.user] || "#FF6B35";
        const isSelected = selectedPin === post.id;
        return (
          <Marker
            key={post.id}
            position={[post.lat, post.lng]}
            icon={createFoodIcon(post, color, isSelected)}
            eventHandlers={{ click: () => onPinClick(post.id) }}
          />
        );
      })}
    </MapContainer>
  );
}
