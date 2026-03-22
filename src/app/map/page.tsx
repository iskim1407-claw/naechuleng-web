"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { mockPostsExtended } from "@/data/mock";
import TabBar from "@/components/TabBar";
import type { Post } from "@/data/mock";

const ratingEmoji = { love: "😍", good: "🙂", okay: "😐" };

export default function MapPage() {
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <div className="min-h-screen bg-[#F5F1EB] relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Pins */}
      {mockPostsExtended.map((post) => (
        <button
          key={post.id}
          onClick={() => setSelected(post)}
          className="absolute z-10 active:scale-110 transition-all duration-200"
          style={{
            left: `${15 + ((post.lng - 126.9) * 800) % 70}%`,
            top: `${15 + ((post.lat - 37.53) * 600) % 60}%`,
          }}
        >
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg text-lg border-2 border-white">
            {ratingEmoji[post.rating]}
          </div>
          <div className="w-3 h-3 bg-primary rotate-45 mx-auto -mt-1.5" />
        </button>
      ))}

      {/* Bottom card */}
      {selected && (
        <div className="absolute bottom-[90px] left-0 right-0 z-20 px-4 animate-slideUp">
          <div className="bg-white rounded-t-2xl shadow-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Image
                  src={selected.avatar}
                  alt={selected.user}
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-100"
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-body">{selected.place}</p>
                  <p className="text-sub text-gray-500">
                    {selected.area} · {selected.user}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="active:scale-95 transition-all"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video relative mb-3">
              <Image
                src={selected.image}
                alt={selected.place}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-body">
              {ratingEmoji[selected.rating]} {selected.review}
            </p>
          </div>
        </div>
      )}

      <TabBar />
    </div>
  );
}
