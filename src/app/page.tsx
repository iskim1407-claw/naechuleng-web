"use client";
import { useState, useEffect } from "react";
import { Navigation, Eye, EyeOff, Heart, Bookmark, Settings, Grid3X3, MapPin, Search } from "lucide-react";
import { mockPostsExtended, mockUsers, mockUser } from "@/data/mock";
import Image from "next/image";
import dynamic from "next/dynamic";
import BottomSheet from "@/components/BottomSheet";
import RadialMenu from "@/components/RadialMenu";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const userColors: Record<string, string> = {
  foodie_kim: "#FF6B35",
  pasta_lover: "#3B82F6",
  cafe_hopper: "#A855F7",
  taco_fan: "#10B981",
};

const categories = ["전체", "한식", "양식", "카페", "술집"];

const ratingEmoji: Record<string, string> = { love: "😍", good: "🙂", okay: "😐" };

const battles = [
  {
    title: "을지로 한식 TOP",
    a: { place: "을지로 골목식당", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", votes: 47 },
    b: { place: "광장시장 빈대떡", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400", votes: 63 },
  },
  {
    title: "카페 대전",
    a: { place: "망원동 카페", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400", votes: 15 },
    b: { place: "성수동 로스터리", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", votes: 41 },
  },
];

// === Feed Tab ===
function FeedContent() {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  return (
    <div className="space-y-5 pb-8">
      {mockPostsExtended.map((post) => {
        const liked = likedIds.has(post.id);
        const saved = savedIds.has(post.id);
        return (
          <div key={post.id} className="animate-slideUp">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image src={post.image} alt={post.place} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="text-[15px] font-bold text-white leading-tight">{post.place}</h3>
                <p className="text-[11px] text-white/60">{post.area}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-[16px]">
                {ratingEmoji[post.rating]}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.avatar} alt={post.user} className="w-6 h-6 rounded-full shrink-0" />
                <div className="min-w-0">
                  <span className="text-[12px] font-semibold text-white/80">{post.user}</span>
                  <p className="text-[13px] text-white/60 truncate">{post.review}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <button
                  onClick={() => setLikedIds(prev => { const s = new Set(prev); if (s.has(post.id)) { s.delete(post.id); } else { s.add(post.id); } return s; })}
                  className="flex items-center gap-1"
                >
                  <Heart size={18} fill={liked ? "#FF6B35" : "none"} className={liked ? "text-[#FF6B35]" : "text-white/40"} />
                  <span className="text-[12px] text-white/40">{post.likes + (liked ? 1 : 0)}</span>
                </button>
                <button onClick={() => setSavedIds(prev => { const s = new Set(prev); if (s.has(post.id)) { s.delete(post.id); } else { s.add(post.id); } return s; })}>
                  <Bookmark size={18} fill={saved ? "white" : "none"} className={saved ? "text-white" : "text-white/40"} />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-white/30 mt-1">{post.time}</p>
          </div>
        );
      })}
    </div>
  );
}

// === Discover Tab ===
function DiscoverContent() {
  const discoverCategories = ["전체", "한식", "양식", "카페", "술집", "분식", "디저트"];

  return (
    <div className="space-y-5 pb-8">
      {/* Search */}
      <div className="flex items-center gap-2.5 h-[40px] bg-white/5 rounded-full px-4">
        <Search size={16} className="text-white/30" />
        <input placeholder="맛집, 동네, 유저 검색" className="bg-transparent text-[14px] text-white placeholder:text-white/30 outline-none flex-1" />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
        {discoverCategories.map((cat) => (
          <button key={cat} className="px-3 py-1.5 rounded-full bg-white/10 text-[12px] text-white/60 whitespace-nowrap">
            {cat}
          </button>
        ))}
      </div>

      {/* Battles */}
      <div>
        <h2 className="text-[14px] font-bold text-white mb-3">🔥 맛집 배틀</h2>
        <div className="space-y-3">
          {battles.map((b) => (
            <div key={b.title} className="bg-white/5 rounded-2xl border border-white/10 p-3">
              <p className="text-[13px] font-semibold text-white mb-2.5">{b.title}</p>
              <div className="flex gap-2">
                {[b.a, b.b].map((item, i) => (
                  <button key={i} className="flex-1 relative aspect-[4/3] rounded-xl overflow-hidden group">
                    <Image src={item.image} alt={item.place} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-active:bg-black/20 transition-colors" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-[12px] font-bold text-white truncate">{item.place}</p>
                      <p className="text-[10px] text-white/60">❤️ {item.votes}</p>
                    </div>
                    {i === 0 && (
                      <div className="absolute top-1/2 -right-3.5 z-10 w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center text-[10px] font-bold text-white -translate-y-1/2">
                        VS
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div>
        <h2 className="text-[14px] font-bold text-white mb-3">📸 최근 포스트</h2>
        <div className="grid grid-cols-3 gap-1">
          {mockPostsExtended.map((post) => (
            <div key={post.id} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={post.image} alt={post.place} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === Profile Tab ===
function ProfileContent() {
  const [tab, setTab] = useState<"grid" | "map">("grid");
  const myPosts = mockPostsExtended.slice(0, 4);

  const MAP_BOUNDS = { minLat: 37.52, maxLat: 37.58, minLng: 126.9, maxLng: 127.06 };
  function toPercent(lat: number, lng: number) {
    const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
    const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(8, Math.min(85, y)) };
  }

  return (
    <div className="space-y-4 pb-8">
      {/* Profile info */}
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mockUser.avatar} alt="" className="w-14 h-14 rounded-full border-2 border-white/10" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-bold">{mockUser.name}</h2>
            <Settings size={14} className="text-white/30" />
          </div>
          <p className="text-[12px] text-white/50 mt-0.5">{mockUser.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        {[
          { label: "포스트", val: mockUser.posts },
          { label: "팔로워", val: mockUser.followers },
          { label: "팔로잉", val: mockUser.following },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[15px] font-bold">{s.val}</p>
            <p className="text-[10px] text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grid/Map toggle */}
      <div className="flex border-b border-white/10">
        <button onClick={() => setTab("grid")} className={`flex-1 py-2 flex justify-center ${tab === "grid" ? "border-b-2 border-white" : ""}`}>
          <Grid3X3 size={18} className={tab === "grid" ? "text-white" : "text-white/40"} />
        </button>
        <button onClick={() => setTab("map")} className={`flex-1 py-2 flex justify-center ${tab === "map" ? "border-b-2 border-[#FF6B35]" : ""}`}>
          <MapPin size={18} className={tab === "map" ? "text-[#FF6B35]" : "text-white/40"} />
        </button>
      </div>

      {tab === "grid" ? (
        <div className="grid grid-cols-3 gap-0.5 -mx-4">
          {myPosts.map((p) => (
            <div key={p.id} className="relative aspect-square">
              <Image src={p.image} alt={p.place} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative aspect-[4/3] bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-white/[0.04]" style={{ top: `${(i + 1) * 14}%` }} />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-white/[0.04]" style={{ left: `${(i + 1) * 20}%` }} />
          ))}
          {myPosts.map((p) => {
            const pos = toPercent(p.lat, p.lng);
            return (
              <div key={p.id} className="absolute w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                style={{
                  left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)",
                  backgroundColor: userColors[p.user] || "#FF6B35",
                  boxShadow: `0 0 8px ${userColors[p.user] || "#FF6B35"}60`,
                }}
              >
                {ratingEmoji[p.rating]}
              </div>
            );
          })}
          <div className="absolute bottom-2 left-3 text-[10px] text-white/30">내 맛집 지도</div>
        </div>
      )}
    </div>
  );
}

// === Main Page ===
export default function MapHome() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("feed");

  useEffect(() => setMounted(true), []);

  const filtered = mockPostsExtended.filter((p) => {
    if (selectedCategory !== "전체" && p.category !== selectedCategory) return false;
    if (!showAll && selectedUser && p.user !== selectedUser) return false;
    return true;
  });

  const selectedPost = mockPostsExtended.find((p) => p.id === selectedPin);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Full-screen map (always visible) */}
      {mounted && (
        <MapView
          posts={filtered}
          userColors={userColors}
          selectedPin={selectedPin}
          onPinClick={(id) => setSelectedPin(selectedPin === id ? null : id)}
        />
      )}

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pt-[env(safe-area-inset-top,12px)]">
        <div className="px-4 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold italic text-white drop-shadow-lg">Bites</h1>
            <div className="flex items-center gap-1 text-white/70 drop-shadow">
              <Navigation size={12} />
              <span className="text-[12px]">서울</span>
            </div>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
          >
            {showAll ? <Eye size={14} className="text-white/70" /> : <EyeOff size={14} className="text-[#FF6B35]" />}
            <span className="text-[11px] text-white/70">{showAll ? "전체" : "필터"}</span>
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all backdrop-blur-md border ${
                selectedCategory === cat
                  ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                  : "bg-black/40 text-white/70 border-white/10"
              }`}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Selected pin card */}
      {selectedPost && (
        <div className="absolute bottom-[140px] left-3 right-3 z-[1050] bg-black/80 backdrop-blur-xl rounded-2xl p-4 flex gap-3 animate-slideUp border border-white/10">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={selectedPost.image} alt={selectedPost.place} fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-white">{selectedPost.place}</p>
            <p className="text-[12px] text-white/40 mt-0.5">{selectedPost.area} · by {selectedPost.user}</p>
            <p className="text-[13px] text-white/70 mt-1.5">{selectedPost.review}</p>
            <div className="flex items-center gap-1 mt-1 text-white/30">
              <span className="text-[11px]">❤️ {selectedPost.likes}</span>
            </div>
          </div>
        </div>
      )}

      {/* User filter row — positioned above bottom sheet */}
      <div className="absolute bottom-[116px] left-0 right-0 z-[1050] px-4">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {mockUsers.map((u) => {
            const color = userColors[u.username] || "#FF6B35";
            const active = selectedUser === u.username;
            return (
              <button key={u.username}
                onClick={() => { setSelectedUser(active ? null : u.username); if (showAll) setShowAll(false); }}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <div className={`w-10 h-10 rounded-full p-0.5 transition-all ${active ? "scale-110" : "opacity-60"}`}
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.avatar} alt={u.name} className="w-full h-full rounded-full bg-neutral-800" />
                </div>
                <span className={`text-[10px] ${active ? "text-white" : "text-white/40"}`}>{u.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Radial FAB menu */}
      <RadialMenu />

      {/* Bottom Sheet with tabs */}
      <BottomSheet activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "feed" && <FeedContent />}
        {activeTab === "discover" && <DiscoverContent />}
        {activeTab === "profile" && <ProfileContent />}
      </BottomSheet>
    </div>
  );
}
