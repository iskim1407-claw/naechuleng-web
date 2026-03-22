"use client";
import { Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import type { Post } from "@/data/mock";

const ratingEmoji = { love: "😍", good: "🙂", okay: "😐" };

export default function FeedCard({ post }: { post: Post }) {
  const { likedIds, bookmarkedIds, toggleLike, toggleBookmark } = useStore();
  const liked = likedIds.has(post.id);
  const bookmarked = bookmarkedIds.has(post.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <Image
          src={post.avatar}
          alt={post.user}
          width={40}
          height={40}
          className="rounded-full bg-gray-100"
          unoptimized
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[15px] leading-tight">{post.user}</p>
          <p className="text-sub text-gray-500 truncate">
            {post.place} · {post.area} {ratingEmoji[post.rating]}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="mx-4 rounded-xl overflow-hidden aspect-square relative">
        <Image
          src={post.image}
          alt={post.place}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Actions */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleLike(post.id)}
              className="active:scale-95 transition-all duration-200"
            >
              <Heart
                size={24}
                strokeWidth={1.8}
                className={
                  liked
                    ? "fill-red-500 text-red-500 animate-bounceHeart"
                    : "text-gray-700"
                }
              />
            </button>
            <span className="text-sub font-medium text-gray-700">
              {post.likes}
            </span>
          </div>
          <button
            onClick={() => toggleBookmark(post.id)}
            className="active:scale-95 transition-all duration-200"
          >
            <Bookmark
              size={24}
              strokeWidth={1.8}
              className={
                bookmarked
                  ? "fill-primary text-primary"
                  : "text-gray-700"
              }
            />
          </button>
        </div>
        <p className="text-body leading-relaxed">{post.review}</p>
        <p className="text-sub text-gray-400 mt-1">{post.time}</p>
      </div>
    </div>
  );
}
