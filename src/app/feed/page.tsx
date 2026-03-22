"use client";
import FeedCard from "@/components/FeedCard";
import { mockPostsExtended } from "@/data/mock";

export default function FeedPage() {
  return (
    <div className="pb-[70px]">
      <div className="px-4 pt-3 pb-2 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-[18px] font-bold italic text-white">Bites</h1>
        <span className="text-[12px] text-white/40">피드</span>
      </div>
      <div className="px-4 pt-4 space-y-6">
        {mockPostsExtended.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
