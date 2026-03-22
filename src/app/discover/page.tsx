"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { mockPostsExtended } from "@/data/mock";
import TabBar from "@/components/TabBar";

const categories = ["전체", "한식", "양식", "일식", "카페", "술집", "분식", "디저트"];

export default function DiscoverPage() {
  const [cat, setCat] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = mockPostsExtended.filter((p) => {
    if (cat !== "전체" && p.category !== cat) return false;
    if (query && !p.place.includes(query) && !p.review.includes(query)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-bg pb-[90px]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-5 pt-3 pb-3 space-y-3">
        {/* Search */}
        <div className="flex items-center gap-3 h-[44px] bg-gray-100 rounded-xl px-4">
          <Search size={20} strokeWidth={1.8} className="text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="맛집 검색"
            className="flex-1 bg-transparent text-body outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sub font-medium transition-all duration-200 active:scale-95 ${
                cat === c
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {filtered.map((post) => (
          <div key={post.id} className="aspect-square relative">
            <Image
              src={post.image}
              alt={post.place}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>

      <TabBar />
    </div>
  );
}
