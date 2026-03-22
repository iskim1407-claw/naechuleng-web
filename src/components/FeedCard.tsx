"use client";
import { Heart, Bookmark } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/data/mock";
import Image from "next/image";

const ratingEmoji: Record<string, string> = {
  love: "😍",
  good: "🙂",
  okay: "😐",
};

export default function FeedCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="animate-slideUp">
      {/* Photo — 16:10 magazine style */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.place}
          fill
          className="object-cover"
        />
        {/* Overlay: place name bottom-left */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <h3 className="text-[15px] font-bold text-white leading-tight">{post.place}</h3>
          <p className="text-[11px] text-white/60">{post.area}</p>
        </div>
        {/* Rating badge top-right */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-[16px]">
          {ratingEmoji[post.rating]}
        </div>
      </div>

      {/* Info below photo */}
      <div className="flex items-center justify-between mt-2.5 px-0.5">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.avatar} alt={post.user} className="w-6 h-6 rounded-full shrink-0" />
          <div className="min-w-0">
            <span className="text-[12px] font-semibold text-white/80">{post.user}</span>
            <p className="text-[13px] text-white/60 truncate">{post.review}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-2">
          <button onClick={() => setLiked(!liked)} className="flex items-center gap-1">
            <Heart size={18} fill={liked ? "#FF6B35" : "none"} className={liked ? "text-[#FF6B35] animate-heartPop" : "text-white/40"} />
            <span className="text-[12px] text-white/40">{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button onClick={() => setSaved(!saved)}>
            <Bookmark size={18} fill={saved ? "white" : "none"} className={saved ? "text-white" : "text-white/40"} />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-white/30 mt-1 px-0.5">{post.time}</p>
    </div>
  );
}
