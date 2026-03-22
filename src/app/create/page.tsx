"use client";
import { Camera, MapPin, Navigation } from "lucide-react";
import { useState } from "react";

const ratings = [
  { key: "okay", emoji: "😐", label: "괜찮아" },
  { key: "good", emoji: "🙂", label: "맛있어" },
  { key: "love", emoji: "😍", label: "미쳤어" },
];

export default function CreatePage() {
  const [rating, setRating] = useState<string | null>(null);

  return (
    <div className="pb-[70px]">
      <div className="px-4 pt-3 pb-2 border-b border-white/10">
        <span className="text-[16px] font-bold">새 포스트</span>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Photo */}
        <div className="aspect-[4/3] rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 active:bg-white/5 transition-colors cursor-pointer">
          <Camera size={32} className="text-white/30" strokeWidth={1.5} />
          <span className="text-[13px] text-white/30">사진 추가</span>
        </div>

        {/* Place */}
        <div className="flex items-center gap-3 h-[44px] bg-white/5 rounded-lg px-3.5">
          <MapPin size={18} className="text-white/30" strokeWidth={1.8} />
          <input placeholder="맛집 이름" className="bg-transparent text-[14px] text-white placeholder:text-white/30 outline-none flex-1" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 h-[44px] bg-white/5 rounded-lg px-3.5">
          <Navigation size={18} className="text-white/30" strokeWidth={1.8} />
          <input placeholder="위치 (동네)" className="bg-transparent text-[14px] text-white placeholder:text-white/30 outline-none flex-1" />
        </div>

        {/* Review */}
        <textarea
          placeholder="이 맛집을 한마디로?"
          className="w-full h-[80px] bg-white/5 rounded-lg p-3.5 text-[14px] text-white placeholder:text-white/30 outline-none resize-none"
        />

        {/* Rating */}
        <div>
          <p className="text-[13px] text-white/50 mb-2.5">평점</p>
          <div className="flex gap-2.5">
            {ratings.map((r) => (
              <button key={r.key} onClick={() => setRating(r.key)}
                className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  rating === r.key ? "bg-[#FF6B35]/20 border border-[#FF6B35]" : "bg-white/5 border border-transparent"
                }`}
              >
                <span className="text-[24px]">{r.emoji}</span>
                <span className={`text-[12px] font-medium ${rating === r.key ? "text-[#FF6B35]" : "text-white/50"}`}>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button className="w-full h-[48px] bg-gradient-to-r from-[#FF6B35] to-[#ff9a62] rounded-xl text-[15px] font-bold active:scale-[0.97] transition-transform">
          등록하기
        </button>
      </div>
    </div>
  );
}
