"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight, Heart } from "lucide-react";
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
    return { left: `${Math.min(Math.max(x, 8), 92)}%`, top: `${Math.min(Math.max(y, 8), 88)}%` };
  };
  const ratingEmoji = (r: string) => r === "love" ? "😍" : r === "good" ? "🙂" : "😐";

  return (
    <div className="pb-[80px]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-[52px]">
          <div className="flex items-baseline gap-1">
            <span className="text-[24px] font-black tracking-tight bg-gradient-to-r from-[#FF6B35] to-[#FF8F65] bg-clip-text text-transparent">
              Bites
            </span>
            <span className="text-[10px] text-gray-300 font-medium">BETA</span>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors">
            <Bell size={20} strokeWidth={1.8} className="text-gray-700" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex relative">
          <button
            onClick={() => setTab("feed")}
            className={`flex-1 py-2.5 text-[14px] font-semibold text-center transition-colors ${
              tab === "feed" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            피드
          </button>
          <button
            onClick={() => setTab("users")}
            className={`flex-1 py-2.5 text-[14px] font-semibold text-center transition-colors ${
              tab === "users" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            맛집러
          </button>
          {/* Animated indicator */}
          <div
            className="absolute bottom-0 h-[2px] bg-gray-900 rounded-full transition-all duration-300 ease-out"
            style={{
              width: "30%",
              left: tab === "feed" ? "10%" : "60%",
            }}
          />
        </div>
      </header>

      {tab === "feed" ? (
        /* Feed — Instagram style, cards separated by gray gap */
        <div className="flex flex-col gap-[8px] bg-[#F2F2F2] pt-[8px]">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Users — foodie list with expandable map */
        <div className="bg-[#F2F2F2] pt-[8px]">
          {mockUsers.map((user) => {
            const userPosts = mockPostsExtended.filter((p) => p.user === user.username);
            const isExpanded = expandedUser === user.username;

            return (
              <div key={user.username} className="bg-white mb-[8px]">
                {/* User row */}
                <button
                  onClick={() => setExpandedUser(isExpanded ? null : user.username)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 transition-colors"
                >
                  <div className="relative">
                    <Image src={user.avatar} alt={user.name} width={44} height={44}
                      className="rounded-full bg-gray-100 ring-2 ring-orange-100" unoptimized />
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white">
                      {userPosts.length}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-gray-900">{user.name}</p>
                    <p className="text-[12px] text-gray-400 mt-0.5">{user.bio}</p>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`text-gray-300 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                    strokeWidth={1.8}
                  />
                </button>

                {/* Expanded: map + list */}
                {isExpanded && (
                  <div className="border-t border-gray-100 animate-slideUp">
                    {/* Map */}
                    <div className="relative w-full aspect-[2.2/1] bg-gradient-to-br from-[#f5f0eb] to-[#ebe4db] overflow-hidden">
                      {/* Grid lines */}
                      {[20, 40, 60, 80].map((p) => (
                        <div key={`h${p}`} className="absolute h-[1px] bg-gray-300/20" style={{ top: `${p}%`, left: '5%', right: '5%' }} />
                      ))}
                      {[25, 50, 75].map((p) => (
                        <div key={`v${p}`} className="absolute w-[1px] bg-gray-300/20" style={{ left: `${p}%`, top: '5%', bottom: '5%' }} />
                      ))}
                      <div className="absolute top-2.5 left-3 text-[10px] text-gray-400/60 font-medium tracking-wide">
                        {user.name}의 맛집 지도
                      </div>
                      {/* Pins */}
                      {userPosts.map((post) => {
                        const pos = pinPosition(post);
                        return (
                          <div key={post.id} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={pos}>
                            <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-primary flex items-center justify-center text-[14px] group-hover:scale-110 transition-transform">
                              {ratingEmoji(post.rating)}
                            </div>
                            {/* Pin tail */}
                            <div className="w-2 h-2 bg-primary rounded-full mx-auto -mt-1 opacity-40" />
                          </div>
                        );
                      })}
                    </div>

                    {/* Restaurant list */}
                    {userPosts.map((post, i) => (
                      <div key={post.id} className={`flex items-center gap-3 px-4 py-2.5 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={post.image} alt={post.place} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[13px] font-semibold text-gray-900 truncate">{post.place}</p>
                            <span className="text-[12px]">{ratingEmoji(post.rating)}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate">{post.area} · {post.review}</p>
                        </div>
                        <div className="flex items-center gap-0.5 text-gray-300">
                          <Heart size={12} strokeWidth={1.5} />
                          <span className="text-[11px]">{post.likes}</span>
                        </div>
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
