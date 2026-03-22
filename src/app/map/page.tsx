"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { useStore } from "@/store/useStore";
import Image from "next/image";

const pins = [
  { id: 1, x: "30%", y: "35%" },
  { id: 2, x: "55%", y: "25%" },
  { id: 3, x: "40%", y: "55%" },
  { id: 4, x: "65%", y: "45%" },
];

export default function MapPage() {
  const posts = useStore((s) => s.posts);
  const [selected, setSelected] = useState<number | null>(null);
  const selectedPost = posts.find((p) => p.id === selected);

  return (
    <div className="min-h-screen bg-[#E8E4DF] relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center px-5 h-[56px]">
          <h1 className="text-header text-primary">내 지도</h1>
        </div>
      </header>

      {/* Map area */}
      <div className="relative w-full" style={{ height: "calc(100vh - 56px - 80px)" }}>
        {/* Grid lines for map feel */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={`h${i}`} className="absolute w-full border-t border-gray-400" style={{ top: `${(i + 1) * 12}%` }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`v${i}`} className="absolute h-full border-l border-gray-400" style={{ left: `${(i + 1) * 16}%` }} />
          ))}
        </div>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sub text-gray-500 shadow-sm">
          서울특별시
        </div>

        {/* Pins */}
        {pins.map((pin) => {
          const post = posts.find((p) => p.id === pin.id);
          return (
            <button
              key={pin.id}
              onClick={() => setSelected(selected === pin.id ? null : pin.id)}
              className="absolute -translate-x-1/2 -translate-y-full transition-transform active:scale-110"
              style={{ left: pin.x, top: pin.y }}
            >
              <MapPin
                size={selected === pin.id ? 36 : 28}
                className="text-primary fill-primary drop-shadow-md"
                strokeWidth={2}
              />
              {post && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white rounded-full px-2 py-0.5 text-[11px] font-medium text-gray-700 shadow-sm">
                  {post.place}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom card */}
      {selectedPost && (
        <div className="absolute bottom-24 left-4 right-4 bg-white rounded-card shadow-lg p-4 flex gap-3 animate-[slideUp_0.2s_ease-out]">
          <div className="relative w-16 h-16 rounded-btn overflow-hidden flex-shrink-0">
            <Image src={selectedPost.image} alt={selectedPost.place} fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body font-semibold text-gray-900 truncate">{selectedPost.place}</p>
            <p className="text-sub text-gray-500">{selectedPost.area}</p>
            <p className="text-sub text-gray-600 truncate">{selectedPost.review}</p>
          </div>
        </div>
      )}
    </div>
  );
}
