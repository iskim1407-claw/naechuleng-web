"use client";
import { Settings, Grid3X3, MapPin } from "lucide-react";
import { mockUser, mockPostsExtended } from "@/data/mock";
import Image from "next/image";
import { useState } from "react";

const userColors: Record<string, string> = {
  foodie_kim: "#FF6B35",
  pasta_lover: "#3B82F6",
  cafe_hopper: "#A855F7",
  taco_fan: "#10B981",
};

const MAP_BOUNDS = { minLat: 37.52, maxLat: 37.58, minLng: 126.9, maxLng: 127.06 };
function toPercent(lat: number, lng: number) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(8, Math.min(85, y)) };
}

export default function ProfilePage() {
  const [tab, setTab] = useState<"grid" | "map">("grid");
  const myPosts = mockPostsExtended.slice(0, 4); // simulate user's posts

  return (
    <div className="pb-[70px]">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-white/10 flex items-center justify-between">
        <span className="text-[16px] font-bold">{mockUser.username}</span>
        <Settings size={20} className="text-white/50" />
      </div>

      {/* Profile info */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mockUser.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-white/10" />
          <div className="flex-1">
            <h2 className="text-[16px] font-bold">{mockUser.name}</h2>
            <p className="text-[13px] text-white/50 mt-0.5">{mockUser.bio}</p>
          </div>
        </div>
        <div className="flex gap-6 mt-4">
          {[
            { label: "포스트", val: mockUser.posts },
            { label: "팔로워", val: mockUser.followers },
            { label: "팔로잉", val: mockUser.following },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[16px] font-bold">{s.val}</p>
              <p className="text-[11px] text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex border-b border-white/10 mt-4">
        <button onClick={() => setTab("grid")} className={`flex-1 py-2.5 flex justify-center ${tab === "grid" ? "border-b-2 border-white" : ""}`}>
          <Grid3X3 size={20} className={tab === "grid" ? "text-white" : "text-white/40"} />
        </button>
        <button onClick={() => setTab("map")} className={`flex-1 py-2.5 flex justify-center ${tab === "map" ? "border-b-2 border-[#FF6B35]" : ""}`}>
          <MapPin size={20} className={tab === "map" ? "text-[#FF6B35]" : "text-white/40"} />
        </button>
      </div>

      {tab === "grid" ? (
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {myPosts.map((p) => (
            <div key={p.id} className="relative aspect-square">
              <Image src={p.image} alt={p.place} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        /* Mini map */
        <div className="mx-4 mt-4 relative aspect-[4/3] bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden">
          {/* Grid */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-white/[0.04]" style={{ top: `${(i + 1) * 14}%` }} />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-white/[0.04]" style={{ left: `${(i + 1) * 20}%` }} />
          ))}
          {/* Pins */}
          {myPosts.map((p) => {
            const pos = toPercent(p.lat, p.lng);
            return (
              <div
                key={p.id}
                className="absolute w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: userColors[p.user] || "#FF6B35",
                  boxShadow: `0 0 8px ${userColors[p.user] || "#FF6B35"}60`,
                }}
              >
                {p.rating === "love" ? "😍" : p.rating === "good" ? "🙂" : "😐"}
              </div>
            );
          })}
          <div className="absolute bottom-2 left-3 text-[10px] text-white/30">내 맛집 지도</div>
        </div>
      )}
    </div>
  );
}
