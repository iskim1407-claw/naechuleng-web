"use client";
import { Heart, Bookmark } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { Post } from "@/data/mock";
import Image from "next/image";

export default function FeedCard({ post }: { post: Post }) {
  const { likedIds, bookmarkedIds, toggleLike, toggleBookmark } = useStore();
  const liked = likedIds.has(post.id);
  const bookmarked = bookmarkedIds.has(post.id);

  const ratingEmoji = post.rating === "love" ? "😍" : post.rating === "good" ? "🙂" : "😐";

  return (
    <div className="bg-white rounded-card border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <Image
          src={post.avatar}
          alt={post.user}
          width={40}
          height={40}
          className="rounded-full bg-gray-100"
          unoptimized
        />
        <div className="flex-1 min-w-0">
          <p className="text-body font-semibold text-gray-900">{post.user}</p>
          <p className="text-sub text-gray-500">
            {post.place} · {post.area} {ratingEmoji}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="px-4">
        <div className="relative aspect-square rounded-btn overflow-hidden">
          <Image
            src={post.image}
            alt={post.place}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-3">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => toggleLike(post.id)}
            className="flex items-center gap-1.5 active:scale-90 transition-transform"
          >
            <Heart
              size={22}
              className={liked ? "text-red-500 fill-red-500" : "text-gray-400"}
              strokeWidth={liked ? 2 : 1.5}
            />
            <span className={`text-sub font-medium ${liked ? "text-red-500" : "text-gray-500"}`}>
              {post.likes}
            </span>
          </button>
          <button
            onClick={() => toggleBookmark(post.id)}
            className="active:scale-90 transition-transform"
          >
            <Bookmark
              size={22}
              className={bookmarked ? "text-primary fill-primary" : "text-gray-400"}
              strokeWidth={bookmarked ? 2 : 1.5}
            />
          </button>
        </div>
        <p className="text-body text-gray-800">{post.review}</p>
        <p className="text-sub text-gray-400 mt-1">{post.time}</p>
      </div>
    </div>
  );
}
