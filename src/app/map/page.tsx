"use client";
import { useState } from "react";
import Image from "next/image";
import { mockPostsExtended, type Post } from "@/data/mock";

export default function MapPage() {
  const [selected, setSelected] = useState<Post | null>(null);
  const mapBounds = { minLat: 37.48, maxLat: 37.58, minLng: 126.88, maxLng: 127.08 };
  const pinPos = (p: Post) => {
    const x = ((p.lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - p.lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { left: `${Math.min(Math.max(x, 6), 94)}%`, top: `${Math.min(Math.max(y, 6), 90)}%` };
  };
  const emoji = (r: string) => r === "love" ? "😍" : r === "good" ? "🙂" : "😐";

  return (
    <div className="pb-[70px] h-screen relative">
      <div className="absolute inset-0 bottom-[70px] bg-neutral-900">
        {/* Grid */}
        {[15,30,45,60,75].map(p => <div key={`h${p}`} className="absolute h-px bg-white/5" style={{top:`${p}%`,left:0,right:0}} />)}
        {[20,40,60,80].map(p => <div key={`v${p}`} className="absolute w-px bg-white/5" style={{left:`${p}%`,top:0,bottom:0}} />)}

        {/* Pins */}
        {mockPostsExtended.map(post => {
          const pos = pinPos(post);
          const isSelected = selected?.id === post.id;
          return (
            <button key={post.id} onClick={() => setSelected(isSelected ? null : post)}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform" style={pos}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] transition-all ${
                isSelected ? "bg-[#FF6B35] scale-125 shadow-[0_0_16px_rgba(255,107,53,0.6)]" : "bg-neutral-800 border border-white/20"
              }`}>
                {emoji(post.rating)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected card */}
      {selected && (
        <div className="absolute bottom-[80px] left-3 right-3 bg-neutral-800 rounded-xl p-3 flex gap-3 animate-slideUp border border-white/10">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={selected.image} alt={selected.place} fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold">{selected.place} {emoji(selected.rating)}</p>
            <p className="text-[12px] text-white/40 mt-0.5">{selected.area}</p>
            <p className="text-[12px] text-white/60 mt-1 truncate">{selected.review}</p>
          </div>
        </div>
      )}
    </div>
  );
}
