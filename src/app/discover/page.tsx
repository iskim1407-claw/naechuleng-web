"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const categories = ["전체", "한식", "양식", "일식", "카페", "술집", "분식", "디저트"];
const images = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300",
];

export default function DiscoverPage() {
  const [active, setActive] = useState("전체");

  return (
    <div className="pb-[70px]">
      {/* Search bar */}
      <div className="px-3.5 pt-3 pb-2">
        <div className="flex items-center gap-2 h-[36px] bg-white/10 rounded-lg px-3">
          <Search size={16} className="text-white/40" strokeWidth={1.8} />
          <input placeholder="맛집 검색" className="bg-transparent text-[14px] text-white placeholder:text-white/30 outline-none flex-1" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-3.5 py-2 overflow-x-auto hide-scrollbar">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors ${
              active === cat ? "bg-white text-black" : "bg-white/10 text-white/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-px mt-1">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square">
            <Image src={img} alt="" fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}
