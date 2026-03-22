"use client";
import { Heart, Bookmark, MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import type { Post } from "@/data/mock";

export default function FeedCard({ post }: { post: Post }) {
  const { likedIds, bookmarkedIds, toggleLike, toggleBookmark } = useStore();
  const liked = likedIds.has(post.id);
  const bookmarked = bookmarkedIds.has(post.id);

  return (
    <article>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#fbbf24] p-[2px]">
          <Image
            src={post.avatar} alt={post.user} width={28} height={28}
            className="rounded-full bg-neutral-800 w-full h-full" unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold">{post.user}</span>
          <span className="text-[13px] text-white/50 ml-1.5">· {post.area}</span>
        </div>
        <button className="p-1"><MoreHorizontal size={18} className="text-white/50" /></button>
      </div>

      {/* Image — full width */}
      <div className="relative aspect-square w-full">
        <Image src={post.image} alt={post.place} fill className="object-cover" unoptimized />
      </div>

      {/* Actions */}
      <div className="px-3.5 pt-3 pb-2.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-4">
            <button onClick={() => toggleLike(post.id)} className="active:scale-75 transition-transform">
              <Heart
                size={24} strokeWidth={liked ? 0 : 1.8}
                fill={liked ? "#FF3B30" : "none"}
                className={`${liked ? "text-[#FF3B30] animate-heartPop" : "text-white"}`}
              />
            </button>
            <button><MessageCircle size={24} strokeWidth={1.8} className="text-white" /></button>
          </div>
          <button onClick={() => toggleBookmark(post.id)} className="active:scale-75 transition-transform">
            <Bookmark
              size={24} strokeWidth={bookmarked ? 0 : 1.8}
              fill={bookmarked ? "white" : "none"}
              className="text-white"
            />
          </button>
        </div>
        <p className="text-[13px] font-semibold mb-1">{post.likes + (liked ? 1 : 0)}명이 좋아합니다</p>
        <p className="text-[13px]">
          <span className="font-semibold">{post.user}</span>{" "}
          <span className="text-white/90">{post.review}</span>
        </p>
        <p className="text-[11px] text-white/30 mt-1.5">{post.time}</p>
      </div>
    </article>
  );
}
