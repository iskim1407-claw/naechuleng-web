"use client";
import { useState } from "react";
import { Heart, Navigation, Eye, EyeOff, X } from "lucide-react";
import { mockPostsExtended, mockUsers } from "@/data/mock";
import Image from "next/image";

const userColors: Record<string, string> = {
  foodie_kim: "#FF6B35",
  pasta_lover: "#3B82F6",
  cafe_hopper: "#A855F7",
  taco_fan: "#10B981",
};

const categories = ["전체", "한식", "양식", "카페", "술집"];

// Map bounds for Seoul area — normalize lat/lng to percentage positions
const MAP_BOUNDS = { minLat: 37.52, maxLat: 37.58, minLng: 126.9, maxLng: 127.06 };

function toPercent(lat: number, lng: number) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(8, Math.min(85, y)) };
}

export default function MapHome() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(true);

  const filtered = mockPostsExtended.filter((p) => {
    if (selectedCategory !== "전체" && p.category !== selectedCategory) return false;
    if (!showAll && selectedUser && p.user !== selectedUser) return false;
    return true;
  });

  const selectedPost = mockPostsExtended.find((p) => p.id === selectedPin);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-900">
      {/* Map grid background */}
      <div className="absolute inset-0">
        {/* Grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px bg-white/[0.04]" style={{ top: `${(i + 1) * 8}%` }} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px bg-white/[0.04]" style={{ left: `${(i + 1) * 12.5}%` }} />
        ))}
        {/* Subtle area labels */}
        <span className="absolute top-[20%] left-[15%] text-[10px] text-white/[0.08] font-medium">연남동</span>
        <span className="absolute top-[35%] left-[50%] text-[10px] text-white/[0.08] font-medium">을지로</span>
        <span className="absolute top-[60%] left-[70%] text-[10px] text-white/[0.08] font-medium">성수동</span>
        <span className="absolute top-[25%] left-[40%] text-[10px] text-white/[0.08] font-medium">종로</span>
        <span className="absolute top-[50%] left-[25%] text-[10px] text-white/[0.08] font-medium">홍대</span>
      </div>

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-[env(safe-area-inset-top,12px)]">
        <div className="px-4 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold italic text-white">Bites</h1>
            <div className="flex items-center gap-1 text-white/50">
              <Navigation size={12} />
              <span className="text-[12px]">서울</span>
            </div>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm"
          >
            {showAll ? <Eye size={14} className="text-white/70" /> : <EyeOff size={14} className="text-[#FF6B35]" />}
            <span className="text-[11px] text-white/70">{showAll ? "전체" : "필터"}</span>
          </button>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF6B35] text-white"
                  : "bg-white/10 text-white/50 backdrop-blur-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map pins */}
      {filtered.map((post) => {
        const pos = toPercent(post.lat, post.lng);
        const color = userColors[post.user] || "#FF6B35";
        const isSelected = selectedPin === post.id;
        return (
          <button
            key={post.id}
            onClick={() => setSelectedPin(isSelected ? null : post.id)}
            className="absolute z-10 flex flex-col items-center transition-transform"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div
              className={`rounded-full overflow-hidden transition-all ${
                isSelected ? "w-14 h-14 scale-110" : "w-10 h-10"
              }`}
              style={{
                border: `3px solid ${color}`,
                boxShadow: `0 0 ${isSelected ? 20 : 10}px ${color}60`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.place} className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] mt-0.5 px-1 py-0.5 rounded bg-black/60 text-white/80 whitespace-nowrap max-w-[60px] truncate">
              {post.place.length > 5 ? post.place.slice(0, 5) + '..' : post.place}
            </div>
          </button>
        );
      })}

      {/* User filter row — bottom */}
      <div className="absolute bottom-[70px] left-0 right-0 z-20 px-4">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {mockUsers.map((u) => {
            const color = userColors[u.username] || "#FF6B35";
            const active = selectedUser === u.username;
            return (
              <button
                key={u.username}
                onClick={() => {
                  setSelectedUser(active ? null : u.username);
                  if (showAll) setShowAll(false);
                }}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <div
                  className={`w-10 h-10 rounded-full p-0.5 transition-all ${active ? "scale-110" : "opacity-60"}`}
                  style={{ border: `2px solid ${active ? color : "rgba(255,255,255,0.2)"}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.avatar} alt={u.username} className="w-full h-full rounded-full" />
                </div>
                <span className={`text-[10px] ${active ? "text-white" : "text-white/40"}`}>
                  {u.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected pin card — slide up */}
      {selectedPost && (
        <div className="absolute bottom-[130px] left-4 right-4 z-30 animate-slideUp">
          <div className="bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-3 flex gap-3">
            <Image
              src={selectedPost.image}
              alt={selectedPost.place}
              width={80}
              height={80}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-white truncate">{selectedPost.place}</h3>
                  <p className="text-[11px] text-white/40">{selectedPost.area}</p>
                </div>
                <button onClick={() => setSelectedPin(null)} className="p-1">
                  <X size={16} className="text-white/40" />
                </button>
              </div>
              <p className="text-[13px] text-white/70 mt-1 truncate">{selectedPost.review}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedPost.avatar} alt="" className="w-4 h-4 rounded-full" />
                  <span className="text-[11px] text-white/50">{selectedPost.user}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={12} className="text-white/40" />
                  <span className="text-[11px] text-white/40">{selectedPost.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
