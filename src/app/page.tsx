"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useStore } from "@/store/useStore";
import FeedCard from "@/components/FeedCard";

export default function FeedPage() {
  const { isLoggedIn, posts } = useStore();
  const router = useRouter();

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("user");
    if (!stored && !isLoggedIn) {
      router.replace("/login");
    } else if (stored && !isLoggedIn) {
      useStore.getState().login();
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center justify-between px-5 h-[56px]">
          <h1 className="text-[22px] font-bold text-primary">내슐랭</h1>
          <button className="p-2 -mr-2">
            <Bell size={24} className="text-gray-600" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Feed */}
      <div className="flex flex-col gap-2 p-4 pt-3">
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
