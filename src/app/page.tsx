"use client";
import { useState, useEffect } from "react";
import { Navigation, Eye, EyeOff } from "lucide-react";
import { mockPostsExtended, mockUsers } from "@/data/mock";
import Image from "next/image";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const userColors: Record<string, string> = {
  foodie_kim: "#FF6B35",
  pasta_lover: "#3B82F6",
  cafe_hopper: "#A855F7",
  taco_fan: "#10B981",
};

const categories = ["전체", "한식", "양식", "카페", "술집"];

export default function MapHome() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = mockPostsExtended.filter((p) => {
    if (selectedCategory !== "전체" && p.category !== selectedCategory) return false;
    if (!showAll && selectedUser && p.user !== selectedUser) return false;
    return true;
  });

  const selectedPost = mockPostsExtended.find((p) => p.id === selectedPin);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Real map */}
      {mounted && (
        <MapView
          posts={filtered}
          userColors={userColors}
          selectedPin={selectedPin}
          onPinClick={(id) => setSelectedPin(selectedPin === id ? null : id)}
        />
      )}

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pt-[env(safe-area-inset-top,12px)]">
        <div className="px-4 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold italic text-white drop-shadow-lg">Bites</h1>
            <div className="flex items-center gap-1 text-white/70 drop-shadow">
              <Navigation size={12} />
              <span className="text-[12px]">서울</span>
            </div>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
          >
            {showAll ? <Eye size={14} className="text-white/70" /> : <EyeOff size={14} className="text-[#FF6B35]" />}
            <span className="text-[11px] text-white/70">{showAll ? "전체" : "필터"}</span>
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all backdrop-blur-md border ${
                selectedCategory === cat
                  ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                  : "bg-black/40 text-white/70 border-white/10"
              }`}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Selected pin card */}
      {selectedPost && (
        <div className="absolute bottom-[140px] left-3 right-3 z-[1000] bg-black/80 backdrop-blur-xl rounded-2xl p-4 flex gap-3 animate-slideUp border border-white/10">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={selectedPost.image} alt={selectedPost.place} fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-white">{selectedPost.place}</p>
            <p className="text-[12px] text-white/40 mt-0.5">{selectedPost.area} · by {selectedPost.user}</p>
            <p className="text-[13px] text-white/70 mt-1.5">{selectedPost.review}</p>
            <div className="flex items-center gap-1 mt-1 text-white/30">
              <span className="text-[11px]">❤️ {selectedPost.likes}</span>
            </div>
          </div>
        </div>
      )}

      {/* User filter row */}
      <div className="absolute bottom-[70px] left-0 right-0 z-[1000] px-4">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {mockUsers.map((u) => {
            const color = userColors[u.username] || "#FF6B35";
            const active = selectedUser === u.username;
            return (
              <button key={u.username}
                onClick={() => { setSelectedUser(active ? null : u.username); if (showAll) setShowAll(false); }}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <div className={`w-10 h-10 rounded-full p-0.5 transition-all ${active ? "scale-110" : "opacity-60"}`}
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.avatar} alt={u.name} className="w-full h-full rounded-full bg-neutral-800" />
                </div>
                <span className={`text-[10px] ${active ? "text-white" : "text-white/40"}`}>{u.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
