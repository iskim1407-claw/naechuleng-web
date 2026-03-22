"use client";
import { Settings } from "lucide-react";
import Image from "next/image";
// Using static images for profile grid

const images = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300",
];

export default function ProfilePage() {
  return (
    <div className="pb-[70px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-[44px] border-b border-white/10">
        <span className="text-[16px] font-bold">맛집탐험가</span>
        <button><Settings size={22} strokeWidth={1.8} className="text-white" /></button>
      </div>

      {/* Profile */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-5">
          <Image
            src="https://api.dicebear.com/7.x/thumbs/svg?seed=food_explorer"
            alt="me" width={80} height={80}
            className="rounded-full bg-neutral-800 ring-2 ring-white/10" unoptimized
          />
          <div className="flex-1 flex justify-around text-center">
            <div>
              <p className="text-[17px] font-bold">12</p>
              <p className="text-[11px] text-white/40">게시물</p>
            </div>
            <div>
              <p className="text-[17px] font-bold">248</p>
              <p className="text-[11px] text-white/40">팔로워</p>
            </div>
            <div>
              <p className="text-[17px] font-bold">189</p>
              <p className="text-[11px] text-white/40">팔로잉</p>
            </div>
          </div>
        </div>
        <p className="text-[14px] font-semibold mt-3">맛집탐험가</p>
        <p className="text-[13px] text-white/50 mt-0.5">서울 맛집 정복 중 🍽️</p>
        <button className="w-full mt-3 h-[32px] rounded-lg bg-white/10 text-[13px] font-semibold active:bg-white/20 transition-colors">
          프로필 편집
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-px border-t border-white/10">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square">
            <Image src={img} alt="" fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}
