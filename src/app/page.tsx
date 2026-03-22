"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ArrowLeft, Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import FeedCard from "@/components/FeedCard";
import { mockUsers, mockPostsExtended, type Post, type UserProfile } from "@/data/mock";
import Image from "next/image";

export default function FeedPage() {
  const { isLoggedIn, posts } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<"feed" | "users">("feed");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedPin, setSelectedPin] = useState<Post | null>(null);

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

  const userPosts = selectedUser
    ? mockPostsExtended.filter((p) => p.user === selectedUser.username)
    : [];

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        {selectedUser ? (
          <div className="flex items-center gap-3 px-4 h-[56px]">
            <button onClick={() => { setSelectedUser(null); setSelectedPin(null); }} className="p-1">
              <ArrowLeft size={24} strokeWidth={1.8} />
            </button>
            <span className="text-[17px] font-semibold">{selectedUser.name}의 맛집</span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </header>

      {selectedUser ? (
        /* User Map View — inline */
        <div>
          {/* Profile summary */}
          <div className="bg-white p-4 flex items-center gap-3">
            <Image src={selectedUser.avatar} alt={selectedUser.name} width={48} height={48} className="rounded-full bg-gray-100" unoptimized />
            <div className="flex-1">
              <p className="text-[16px] font-bold">{selectedUser.name}</p>
              <p className="text-[13px] text-gray-500">{selectedUser.bio}</p>
            </div>
            <div className="text-center">
              <p className="text-[16px] font-bold text-primary">{userPosts.length}</p>
              <p className="text-[11px] text-gray-400">맛집</p>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white mt-2">
            <div className="relative w-full aspect-[4/3] bg-[#e8e0d8] overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[20%] left-[10%] right-[10%] h-[1px] bg-gray-400" />
                <div className="absolute top-[40%] left-[5%] right-[15%] h-[1px] bg-gray-400" />
                <div className="absolute top-[60%] left-[15%] right-[5%] h-[1px] bg-gray-400" />
                <div className="absolute top-[80%] left-[8%] right-[12%] h-[1px] bg-gray-400" />
                <div className="absolute left-[25%] top-[10%] bottom-[10%] w-[1px] bg-gray-400" />
                <div className="absolute left-[50%] top-[5%] bottom-[15%] w-[1px] bg-gray-400" />
                <div className="absolute left-[75%] top-[15%] bottom-[5%] w-[1px] bg-gray-400" />
              </div>
              {userPosts.map((post) => {
                const pos = pinPosition(post);
                const isSelected = selectedPin?.id === post.id;
                return (
                  <button key={post.id} onClick={() => setSelectedPin(isSelected ? null : post)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform" style={pos}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] shadow-md transition-all ${
                      isSelected ? "bg-primary scale-125 ring-2 ring-primary/30" : "bg-white border-2 border-primary"
                    }`}>
                      {ratingEmoji(post.rating)}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedPin && (
              <div className="p-4 border-t border-gray-100 animate-slideUp">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={selectedPin.image} alt={selectedPin.place} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-[15px] font-semibold">{selectedPin.place}</h3>
                      <span>{ratingEmoji(selectedPin.rating)}</span>
                    </div>
                    <p className="text-[13px] text-gray-500 mt-0.5">{selectedPin.area}</p>
                    <p className="text-[13px] text-gray-700 mt-1">{selectedPin.review}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Post list */}
          <div className="bg-white mt-2">
            <div className="px-4 py-3">
              <h3 className="text-[15px] font-semibold">등록한 맛집 {userPosts.length}곳</h3>
            </div>
            {userPosts.map((post) => (
              <button key={post.id} onClick={() => setSelectedPin(post)}
                className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-50 text-left active:bg-gray-50 transition-colors">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={post.image} alt={post.place} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium truncate">{post.place}</p>
                  <p className="text-[13px] text-gray-500">{post.area} · {ratingEmoji(post.rating)}</p>
                </div>
                <Heart size={16} className="text-gray-300" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </div>
      ) : tab === "feed" ? (
        <div className="flex flex-col gap-2 p-4 pt-3">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white mt-2">
          {mockUsers.map((user) => (
            <button
              key={user.username}
              onClick={() => { setSelectedUser(user); setSelectedPin(null); }}
              className="w-full flex items-center gap-3 px-5 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors text-left"
            >
              <Image src={user.avatar} alt={user.name} width={52} height={52} className="rounded-full bg-gray-100" unoptimized />
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-semibold text-gray-900">{user.name}</p>
                <p className="text-[13px] text-gray-500">@{user.username}</p>
                <p className="text-[13px] text-gray-400 mt-0.5">{user.bio}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[14px] font-bold text-primary">
                  {mockPostsExtended.filter((p) => p.user === user.username).length}곳
                </p>
                <p className="text-[11px] text-gray-400">맛집</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
