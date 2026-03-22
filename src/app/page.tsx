"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Heart, ChevronDown } from "lucide-react";
import { useStore } from "@/store/useStore";
import FeedCard from "@/components/FeedCard";
import { mockUsers, mockPostsExtended, type Post } from "@/data/mock";
import Image from "next/image";

export default function FeedPage() {
  const { isLoggedIn, posts } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<"feed" | "users">("feed");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("user");
    if (!stored && !isLoggedIn) {
      router.replace("/login");
    } else if (stored && !isLoggedIn) {
      useStore.getState().login();
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const mapBounds = { minLat: 37.48, maxLat: 37.58, minLng: 126.88, maxLng: 127.08 };
  const pinPosition = (post: Post) => {
    const x = ((post.lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - post.lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { left: `${Math.min(Math.max(x, 5), 95)}%`, top: `${Math.min(Math.max(y, 5), 90)}%` };
  };
  const ratingEmoji = (r: string) => r === "love" ? "😍" : r === "good" ? "🙂" : "😐";

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
        <div className="flex">
          <button
            onClick={() => setTab("feed")}
            className={`flex-1 py-2.5 text-[15px] font-semibold text-center transition-colors ${
              tab === "feed" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"
            }`}
          >
            피드
          </button>
          <button
            onClick={() => setTab("users")}
            className={`flex-1 py-2.5 text-[15px] font-semibold text-center transition-colors ${
              tab === "users" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"
            }`}
          >
            유저
          </button>
        </div>
      </header>

      {tab === "feed" ? (
        <div className="flex flex-col gap-2 p-4 pt-3">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Users — each user card with inline map */
        <div className="flex flex-col gap-2 p-4 pt-3">
          {mockUsers.map((user) => {
            const userPosts = mockPostsExtended.filter((p) => p.user === user.username);
            const isExpanded = expandedUser === user.username;

            return (
              <div key={user.username} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* User header — always visible */}
                <button
                  onClick={() => setExpandedUser(isExpanded ? null : user.username)}
                  className="w-full flex items-center gap-3 p-4 text-left active:bg-gray-50 transition-colors"
                >
                  <Image src={user.avatar} alt={user.name} width={48} height={48} className="rounded-full bg-gray-100" unoptimized />
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-semibold text-gray-900">{user.name}</p>
                    <p className="text-[13px] text-gray-400">{user.bio}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-[15px] font-bold text-primary">{userPosts.length}곳</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      strokeWidth={1.8}
                    />
                  </div>
                </button>

                {/* Inline map + posts — shown when expanded */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {/* Mini map */}
                    <div className="relative w-full aspect-[2/1] bg-[#e8e0d8] overflow-hidden">
                      <div className="absolute inset-0 opacity-15">
                        <div className="absolute top-[25%] left-[8%] right-[8%] h-[1px] bg-gray-500" />
                        <div className="absolute top-[50%] left-[5%] right-[12%] h-[1px] bg-gray-500" />
                        <div className="absolute top-[75%] left-[10%] right-[5%] h-[1px] bg-gray-500" />
                        <div className="absolute left-[30%] top-[8%] bottom-[8%] w-[1px] bg-gray-500" />
                        <div className="absolute left-[60%] top-[5%] bottom-[12%] w-[1px] bg-gray-500" />
                      </div>
                      {userPosts.map((post) => {
                        const pos = pinPosition(post);
                        return (
                          <div key={post.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
                            <div className="w-9 h-9 rounded-full bg-white border-2 border-primary flex items-center justify-center text-[16px] shadow-sm">
                              {ratingEmoji(post.rating)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Post list */}
                    {userPosts.map((post) => (
                      <div key={post.id} className="flex items-center gap-3 px-4 py-3 border-t border-gray-50">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={post.image} alt={post.place} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-gray-900 truncate">{post.place}</p>
                          <p className="text-[12px] text-gray-500">{post.area} · {ratingEmoji(post.rating)} · {post.review}</p>
                        </div>
                        <Heart size={14} className="text-gray-300 flex-shrink-0" strokeWidth={1.5} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
