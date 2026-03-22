"use client";
import { Search } from "lucide-react";
import { mockPostsExtended } from "@/data/mock";
import Image from "next/image";

const categories = ["전체", "한식", "양식", "카페", "술집", "분식", "디저트"];

const battles = [
  {
    title: "을지로 한식 TOP",
    a: { place: "을지로 골목식당", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", votes: 47 },
    b: { place: "광장시장 빈대떡", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400", votes: 63 },
  },
  {
    title: "카페 대전",
    a: { place: "망원동 카페", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400", votes: 15 },
    b: { place: "성수동 로스터리", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", votes: 41 },
  },
];

export default function DiscoverPage() {
  return (
    <div className="pb-[70px]">
      <div className="px-4 pt-3 pb-2 border-b border-white/10">
        <span className="text-[16px] font-bold">발견</span>
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2.5 h-[40px] bg-white/5 rounded-full px-4">
          <Search size={16} className="text-white/30" />
          <input placeholder="맛집, 동네, 유저 검색" className="bg-transparent text-[14px] text-white placeholder:text-white/30 outline-none flex-1" />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-4 pt-3 overflow-x-auto hide-scrollbar">
        {categories.map((cat) => (
          <button key={cat} className="px-3 py-1.5 rounded-full bg-white/10 text-[12px] text-white/60 whitespace-nowrap">
            {cat}
          </button>
        ))}
      </div>

      {/* Battle section */}
      <div className="px-4 pt-5">
        <h2 className="text-[14px] font-bold text-white mb-3">🔥 맛집 배틀</h2>
        <div className="space-y-3">
          {battles.map((b) => (
            <div key={b.title} className="bg-neutral-900 rounded-2xl border border-white/10 p-3">
              <p className="text-[13px] font-semibold text-white mb-2.5">{b.title}</p>
              <div className="flex gap-2">
                {[b.a, b.b].map((item, i) => (
                  <button key={i} className="flex-1 relative aspect-[4/3] rounded-xl overflow-hidden group">
                    <Image src={item.image} alt={item.place} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-active:bg-black/20 transition-colors" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-[12px] font-bold text-white truncate">{item.place}</p>
                      <p className="text-[10px] text-white/60">❤️ {item.votes}</p>
                    </div>
                    {i === 0 && (
                      <div className="absolute top-1/2 -right-3.5 z-10 w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center text-[10px] font-bold text-white -translate-y-1/2">
                        VS
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-column grid */}
      <div className="px-4 pt-5">
        <h2 className="text-[14px] font-bold text-white mb-3">📸 최근 포스트</h2>
        <div className="grid grid-cols-3 gap-1">
          {mockPostsExtended.map((post) => (
            <div key={post.id} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={post.image} alt={post.place} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
