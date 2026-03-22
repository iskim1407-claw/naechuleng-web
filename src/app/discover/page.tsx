"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

const categories = ["전체", "한식", "양식", "일식", "카페", "술집", "분식", "디저트"];

const discoverImages = [
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
  const [query, setQuery] = useState("");


  return (
    <div className="min-h-screen bg-bg pb-24">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center px-5 h-[56px]">
          <h1 className="text-header text-gray-900">발견</h1>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="맛집, 지역, 메뉴 검색"
            className="w-full h-[44px] pl-10 pr-4 rounded-full bg-gray-100 text-body text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sub font-medium transition-all ${
                active === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1">
          {discoverImages.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={img} alt="" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
