"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ChevronRight } from "lucide-react";
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
    if (!stored && !isLoggedIn) router.replace("/login");
    else if (stored && !isLoggedIn) useStore.getState().login();
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
    <div className="pb-[70px]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-[44px]">
          <span className="text-[22px] font-bold italic tracking-tight">Bites</span>
          <div className="flex items-center gap-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/>
            </svg>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex relative">
          {(["feed", "users"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 text-[13px] font-semibold text-center transition-colors ${
                tab === t ? "text-white" : "text-white/40"
              }`}
            >
              {t === "feed" ? "피드" : "맛집러"}
            </button>
          ))}
          <div className="absolute bottom-0 h-[1px] bg-white transition-all duration-300"
            style={{ width: "50%", left: tab === "feed" ? "0" : "50%" }} />
        </div>
      </header>

      {tab === "feed" ? (
        <div className="divide-y divide-white/5">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div>
          {/* Stories-style user row */}
          <div className="flex gap-4 px-4 py-4 overflow-x-auto hide-scrollbar">
            {mockUsers.map((user) => (
              <button key={user.username} onClick={() => setExpandedUser(expandedUser === user.username ? null : user.username)}
                className="flex flex-col items-center gap-1 min-w-[64px]"
              >
                <div className={`w-[60px] h-[60px] rounded-full p-[2px] ${
                  expandedUser === user.username
                    ? "bg-gradient-to-tr from-[#FF6B35] to-[#fbbf24]"
                    : "bg-white/20"
                }`}>
                  <Image src={user.avatar} alt={user.name} width={56} height={56}
                    className="rounded-full bg-neutral-800 w-full h-full" unoptimized />
                </div>
                <span className="text-[11px] text-white/70 truncate max-w-[64px]">{user.name}</span>
              </button>
            ))}
          </div>

          {/* Selected user's map */}
          {expandedUser && (() => {
            const user = mockUsers.find(u => u.username === expandedUser)!;
            const userPosts = mockPostsExtended.filter(p => p.user === expandedUser);
            return (
              <div className="animate-slideUp">
                {/* User info */}
                <div className="flex items-center gap-3 px-4 py-3 border-t border-white/5">
                  <Image src={user.avatar} alt={user.name} width={40} height={40}
                    className="rounded-full bg-neutral-800" unoptimized />
                  <div className="flex-1">
                    <p className="text-[14px] font-bold">{user.name}</p>
                    <p className="text-[12px] text-white/40">{user.bio}</p>
                  </div>
                  <button className="px-4 py-1.5 rounded-lg bg-white/10 text-[12px] font-semibold active:bg-white/20 transition-colors">
                    팔로우
                  </button>
                </div>

                {/* Map */}
                <div className="relative w-full aspect-[2/1] bg-neutral-900 overflow-hidden mx-4 rounded-xl" style={{width: 'calc(100% - 32px)'}}>
                  {[20,40,60,80].map(p => (
                    <div key={`h${p}`} className="absolute h-px bg-white/5" style={{top:`${p}%`,left:'5%',right:'5%'}} />
                  ))}
                  {[25,50,75].map(p => (
                    <div key={`v${p}`} className="absolute w-px bg-white/5" style={{left:`${p}%`,top:'5%',bottom:'5%'}} />
                  ))}
                  {userPosts.map(post => {
                    const pos = pinPosition(post);
                    return (
                      <div key={post.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
                        <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center text-[16px] shadow-[0_0_12px_rgba(255,107,53,0.5)]">
                          {ratingEmoji(post.rating)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Post list */}
                <div className="mt-3">
                  {userPosts.map((post) => (
                    <div key={post.id} className="flex items-center gap-3 px-4 py-2.5">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={post.image} alt={post.place} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold truncate">{post.place}</p>
                        <p className="text-[11px] text-white/40 truncate">{post.area} · {post.review}</p>
                      </div>
                      <div className="flex items-center gap-1 text-white/30">
                        <Heart size={12} strokeWidth={1.5} />
                        <span className="text-[11px]">{post.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* All users list when none selected */}
          {!expandedUser && (
            <div className="border-t border-white/5">
              <p className="px-4 py-3 text-[13px] font-semibold text-white/50">추천 맛집러</p>
              {mockUsers.map((user) => {
                const count = mockPostsExtended.filter(p => p.user === user.username).length;
                return (
                  <button key={user.username}
                    onClick={() => setExpandedUser(user.username)}
                    className="w-full flex items-center gap-3 px-4 py-3 active:bg-white/5 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#fbbf24] p-[2px]">
                      <Image src={user.avatar} alt={user.name} width={40} height={40}
                        className="rounded-full bg-neutral-800 w-full h-full" unoptimized />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-[14px] font-semibold">{user.name}</p>
                      <p className="text-[12px] text-white/40">{user.bio}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#FF6B35] font-bold">{count}곳</span>
                      <ChevronRight size={16} className="text-white/20" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
