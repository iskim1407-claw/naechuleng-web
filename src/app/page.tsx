"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ChevronRight, Users, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import FeedCard from "@/components/FeedCard";
import { mockUsers, mockPostsExtended, type Post } from "@/data/mock";
import Image from "next/image";

// User colors for map pins
const userColors: Record<string, string> = {
  foodie_kim: "#FF6B35",
  pasta_lover: "#3B82F6",
  cafe_hopper: "#A855F7",
  taco_fan: "#10B981",
};
const userColorList = ["#FF6B35", "#3B82F6", "#A855F7", "#10B981"];

export default function FeedPage() {
  const { isLoggedIn, posts } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<"feed" | "users">("feed");
  const [viewMode, setViewMode] = useState<"individual" | "all">("individual");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<Post | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("user");
    if (!stored && !isLoggedIn) router.replace("/login");
    else if (stored && !isLoggedIn) useStore.getState().login();
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const mapBounds = { minLat: 37.48, maxLat: 37.59, minLng: 126.88, maxLng: 127.08 };
  const pinPosition = (post: Post) => {
    const x = ((post.lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - post.lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { left: `${Math.min(Math.max(x, 6), 94)}%`, top: `${Math.min(Math.max(y, 6), 90)}%` };
  };
  const emoji = (r: string) => r === "love" ? "😍" : r === "good" ? "🙂" : "😐";

  return (
    <div className="pb-[70px]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-[44px]">
          <span className="text-[22px] font-bold italic tracking-tight">Bites</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/>
          </svg>
        </div>
        <div className="flex relative">
          {(["feed", "users"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 text-[13px] font-semibold text-center transition-colors ${tab === t ? "text-white" : "text-white/40"}`}
            >{t === "feed" ? "피드" : "맛집러"}</button>
          ))}
          <div className="absolute bottom-0 h-[1px] bg-white transition-all duration-300"
            style={{ width: "50%", left: tab === "feed" ? "0" : "50%" }} />
        </div>
      </header>

      {tab === "feed" ? (
        <div className="divide-y divide-white/5">
          {posts.map((post) => <FeedCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div>
          {/* View mode toggle */}
          <div className="flex gap-2 px-4 py-3">
            <button onClick={() => { setViewMode("individual"); setSelectedPin(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                viewMode === "individual" ? "bg-white text-black" : "bg-white/10 text-white/60"
              }`}>
              <User size={14} /> 유저별
            </button>
            <button onClick={() => { setViewMode("all"); setSelectedUser(null); setSelectedPin(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                viewMode === "all" ? "bg-white text-black" : "bg-white/10 text-white/60"
              }`}>
              <Users size={14} /> 한눈에 보기
            </button>
          </div>

          {viewMode === "all" ? (
            /* === ALL USERS MAP === */
            <div>
              {/* Big map with all pins, color-coded */}
              <div className="relative w-full aspect-[1/1] bg-neutral-900 mx-0 overflow-hidden">
                {/* Grid */}
                {[15,30,45,60,75].map(p => <div key={`h${p}`} className="absolute h-px bg-white/5" style={{top:`${p}%`,left:0,right:0}} />)}
                {[20,40,60,80].map(p => <div key={`v${p}`} className="absolute w-px bg-white/5" style={{left:`${p}%`,top:0,bottom:0}} />)}

                {/* All pins */}
                {mockPostsExtended.map(post => {
                  const pos = pinPosition(post);
                  const color = userColors[post.user] || "#FF6B35";
                  const isSelected = selectedPin?.id === post.id;
                  return (
                    <button key={post.id} onClick={() => setSelectedPin(isSelected ? null : post)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all" style={pos}>
                      <div className={`flex items-center justify-center rounded-full transition-all ${
                        isSelected ? "w-12 h-12 text-[20px]" : "w-9 h-9 text-[15px]"
                      }`} style={{
                        backgroundColor: color,
                        boxShadow: isSelected ? `0 0 20px ${color}80` : `0 0 8px ${color}40`,
                      }}>
                        {emoji(post.rating)}
                      </div>
                      {/* User initial label */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-white/50 font-medium whitespace-nowrap">
                        {mockUsers.find(u => u.username === post.user)?.name?.charAt(0)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-3 px-4 py-3 flex-wrap">
                {mockUsers.map((user, i) => {
                  const count = mockPostsExtended.filter(p => p.user === user.username).length;
                  return (
                    <div key={user.username} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: userColorList[i] }} />
                      <span className="text-[11px] text-white/60">{user.name} ({count})</span>
                    </div>
                  );
                })}
              </div>

              {/* Selected pin card */}
              {selectedPin && (
                <div className="mx-4 mb-3 bg-neutral-800 rounded-xl p-3 flex gap-3 animate-slideUp border border-white/10">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={selectedPin.image} alt={selectedPin.place} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-bold truncate">{selectedPin.place}</p>
                      <span>{emoji(selectedPin.rating)}</span>
                    </div>
                    <p className="text-[11px] text-white/40 mt-0.5">{selectedPin.area} · by {selectedPin.user}</p>
                    <p className="text-[12px] text-white/60 mt-1 truncate">{selectedPin.review}</p>
                  </div>
                </div>
              )}

              {/* Shared spots indicator */}
              {(() => {
                // Find spots where multiple users posted nearby
                const areas = new Map<string, string[]>();
                mockPostsExtended.forEach(p => {
                  const users = areas.get(p.area) || [];
                  if (!users.includes(p.user)) users.push(p.user);
                  areas.set(p.area, users);
                });
                const shared = Array.from(areas.entries()).filter(([, u]) => u.length > 1);
                if (shared.length === 0) return null;
                return (
                  <div className="px-4 pb-3">
                    <p className="text-[12px] text-white/40 mb-2">🔥 공통 지역</p>
                    {shared.map(([area, users]) => (
                      <div key={area} className="flex items-center gap-2 py-1.5">
                        <span className="text-[13px] font-medium">{area}</span>
                        <div className="flex -space-x-1">
                          {users.map(u => (
                            <div key={u} className="w-4 h-4 rounded-full border border-black"
                              style={{ backgroundColor: userColors[u] || "#FF6B35" }} />
                          ))}
                        </div>
                        <span className="text-[11px] text-white/30">{users.length}명</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : (
            /* === INDIVIDUAL USER VIEW === */
            <div>
              {/* User cards with mini maps */}
              {mockUsers.map((user, idx) => {
                const userPosts = mockPostsExtended.filter(p => p.user === user.username);
                const isExpanded = selectedUser === user.username;
                const color = userColorList[idx];

                return (
                  <div key={user.username} className="border-b border-white/5">
                    {/* User header */}
                    <button onClick={() => { setSelectedUser(isExpanded ? null : user.username); setSelectedPin(null); }}
                      className="w-full flex items-center gap-3 px-4 py-3 active:bg-white/5 transition-colors">
                      <div className="w-11 h-11 rounded-full p-[2px]" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
                        <Image src={user.avatar} alt={user.name} width={40} height={40}
                          className="rounded-full bg-neutral-800 w-full h-full" unoptimized />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-[14px] font-semibold">{user.name}</p>
                        <p className="text-[12px] text-white/40">{user.bio}</p>
                      </div>
                      <span className="text-[13px] font-bold" style={{ color }}>{userPosts.length}곳</span>
                      <ChevronRight size={16} className={`text-white/20 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>

                    {/* Mini map always visible (compact) */}
                    {!isExpanded && (
                      <div className="relative h-[80px] mx-4 mb-3 bg-neutral-900 rounded-lg overflow-hidden"
                        onClick={() => { setSelectedUser(user.username); setSelectedPin(null); }}>
                        {userPosts.map(post => {
                          const pos = pinPosition(post);
                          return (
                            <div key={post.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[12px]"
                                style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}>
                                {emoji(post.rating)}
                              </div>
                            </div>
                          );
                        })}
                        <div className="absolute bottom-1.5 right-2 text-[10px] text-white/30">탭하여 자세히 보기</div>
                      </div>
                    )}

                    {/* Expanded view */}
                    {isExpanded && (
                      <div className="animate-slideUp">
                        {/* Big map */}
                        <div className="relative w-full aspect-[2/1] bg-neutral-900 overflow-hidden">
                          {[25,50,75].map(p => <div key={`h${p}`} className="absolute h-px bg-white/5" style={{top:`${p}%`,left:0,right:0}} />)}
                          {[25,50,75].map(p => <div key={`v${p}`} className="absolute w-px bg-white/5" style={{left:`${p}%`,top:0,bottom:0}} />)}
                          {userPosts.map(post => {
                            const pos = pinPosition(post);
                            const isSel = selectedPin?.id === post.id;
                            return (
                              <button key={post.id} onClick={() => setSelectedPin(isSel ? null : post)}
                                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all" style={pos}>
                                <div className={`rounded-full flex items-center justify-center transition-all ${
                                  isSel ? "w-11 h-11 text-[18px]" : "w-8 h-8 text-[15px]"
                                }`} style={{
                                  backgroundColor: color,
                                  boxShadow: isSel ? `0 0 16px ${color}80` : `0 0 8px ${color}40`,
                                }}>
                                  {emoji(post.rating)}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Selected pin */}
                        {selectedPin && selectedPin.user === user.username && (
                          <div className="mx-4 mt-2 bg-neutral-800 rounded-xl p-3 flex gap-3 border border-white/10 animate-slideUp">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                              <Image src={selectedPin.image} alt={selectedPin.place} fill className="object-cover" unoptimized />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[14px] font-bold">{selectedPin.place} {emoji(selectedPin.rating)}</p>
                              <p className="text-[11px] text-white/40 mt-0.5">{selectedPin.area}</p>
                              <p className="text-[12px] text-white/60 mt-1">{selectedPin.review}</p>
                            </div>
                          </div>
                        )}

                        {/* Post list */}
                        <div className="mt-2 mb-2">
                          {userPosts.map(post => (
                            <button key={post.id} onClick={() => setSelectedPin(post)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 active:bg-white/5 transition-colors text-left">
                              <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
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
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
