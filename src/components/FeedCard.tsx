"use client";
import { Heart, Bookmark, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import type { Post } from "@/data/mock";

const ratingBadge: Record<string, { emoji: string; label: string; bg: string }> = {
  love: { emoji: "😍", label: "미쳤어", bg: "bg-red-50 text-red-600" },
  good: { emoji: "🙂", label: "맛있어", bg: "bg-orange-50 text-orange-600" },
  okay: { emoji: "😐", label: "괜찮아", bg: "bg-gray-100 text-gray-600" },
};

export default function FeedCard({ post }: { post: Post }) {
  const { likedIds, bookmarkedIds, toggleLike, toggleBookmark } = useStore();
  const liked = likedIds.has(post.id);
  const bookmarked = bookmarkedIds.has(post.id);
  const badge = ratingBadge[post.rating];

  return (
    <article className="bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Image
          src={post.avatar}
          alt={post.user}
          width={36}
          height={36}
          className="rounded-full bg-gray-100 ring-2 ring-gray-100"
          unoptimized
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[14px] text-gray-900">{post.user}</span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${badge.bg}`}>
              {badge.emoji} {badge.label}
            </span>
          </div>
          <p className="text-[12px] text-gray-400 mt-0.5 truncate">
            {post.place} · {post.area}
          </p>
        </div>
        <span className="text-[11px] text-gray-300">{post.time}</span>
      </div>

      {/* Image — full width, Instagram style */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.place}
          fill
          className="object-cover"
          unoptimized
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Place name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white text-[14px] font-semibold drop-shadow-lg">{post.place}</p>
          <p className="text-white/80 text-[12px] drop-shadow-lg">{post.area}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex items-center gap-1.5 active:scale-90 transition-transform duration-150"
            >
              <Heart
                size={22}
                strokeWidth={liked ? 0 : 1.8}
                fill={liked ? "#ef4444" : "none"}
                className={liked ? "text-red-500" : "text-gray-800"}
              />
              <span className={`text-[13px] font-semibold ${liked ? "text-red-500" : "text-gray-800"}`}>
                {post.likes + (liked ? 1 : 0)}
              </span>
            </button>
            <button className="active:scale-90 transition-transform duration-150">
              <MessageCircle size={22} strokeWidth={1.8} className="text-gray-800" />
            </button>
          </div>
          <button
            onClick={() => toggleBookmark(post.id)}
            className="active:scale-90 transition-transform duration-150"
          >
            <Bookmark
              size={22}
              strokeWidth={bookmarked ? 0 : 1.8}
              fill={bookmarked ? "#FF6B35" : "none"}
              className={bookmarked ? "text-primary" : "text-gray-800"}
            />
          </button>
        </div>
        <p className="text-[14px] text-gray-900 mt-2.5 leading-snug">{post.review}</p>
      </div>
    </article>
  );
}
