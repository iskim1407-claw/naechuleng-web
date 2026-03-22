"use client";

import { useParams, useRouter } from "next/navigation";
import { mockUsers, mockPostsExtended, type Post } from "@/data/mock";
import { ArrowLeft, MapPin, Grid3x3, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const [view, setView] = useState<"map" | "grid">("map");
  const [selectedPin, setSelectedPin] = useState<Post | null>(null);

  const user = mockUsers.find((u) => u.username === username);
  const userPosts = mockPostsExtended.filter((p) => p.user === username);

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-gray-500">유저를 찾을 수 없어요</p>
      </div>
    );
  }

  const mapBounds = { minLat: 37.48, maxLat: 37.58, minLng: 126.88, maxLng: 127.08 };

  const pinPosition = (post: Post) => {
    const x = ((post.lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - post.lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { left: `${Math.min(Math.max(x, 5), 95)}%`, top: `${Math.min(Math.max(y, 5), 90)}%` };
  };

  const ratingEmoji = (r: string) => r === "love" ? "😍" : r === "good" ? "🙂" : "😐";

  return (
    <div className="min-h-screen bg-bg max-w-[430px] mx-auto">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft size={24} strokeWidth={1.8} />
        </button>
        <span className="text-[17px] font-semibold">{user.username}</span>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-5">
        <div className="flex items-center gap-4">
          <Image
            src={user.avatar}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-full bg-gray-100"
            unoptimized
          />
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-gray-900">{user.name}</h2>
            <p className="text-sub text-gray-500 mt-0.5">{user.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex mt-4 gap-0">
          <div className="flex-1 text-center">
            <p className="text-[18px] font-bold text-gray-900">{userPosts.length}</p>
            <p className="text-sub text-gray-500">맛집</p>
          </div>
          <div className="flex-1 text-center border-x border-gray-100">
            <p className="text-[18px] font-bold text-gray-900">{user.followers}</p>
            <p className="text-sub text-gray-500">팔로워</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-[18px] font-bold text-gray-900">{user.following}</p>
            <p className="text-sub text-gray-500">팔로잉</p>
          </div>
        </div>

        {/* Follow Button */}
        <button className="w-full mt-4 h-[44px] bg-primary text-white rounded-btn font-semibold text-body">
          팔로우
        </button>
      </div>

      {/* View Toggle */}
      <div className="bg-white mt-2 flex border-b border-gray-100">
        <button
          onClick={() => setView("map")}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-sub font-medium transition-colors ${
            view === "map" ? "text-primary border-b-2 border-primary" : "text-gray-400"
          }`}
        >
          <MapPin size={18} strokeWidth={1.8} />
          지도
        </button>
        <button
          onClick={() => setView("grid")}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-sub font-medium transition-colors ${
            view === "grid" ? "text-primary border-b-2 border-primary" : "text-gray-400"
          }`}
        >
          <Grid3x3 size={18} strokeWidth={1.8} />
          그리드
        </button>
      </div>

      {/* Content */}
      {view === "map" ? (
        <div className="bg-white mt-2">
          {/* Map */}
          <div className="relative w-full aspect-[4/3] bg-[#e8e0d8] overflow-hidden">
            {/* Simple map background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-[20%] left-[10%] right-[10%] h-[1px] bg-gray-400" />
              <div className="absolute top-[40%] left-[5%] right-[15%] h-[1px] bg-gray-400" />
              <div className="absolute top-[60%] left-[15%] right-[5%] h-[1px] bg-gray-400" />
              <div className="absolute top-[80%] left-[8%] right-[12%] h-[1px] bg-gray-400" />
              <div className="absolute left-[25%] top-[10%] bottom-[10%] w-[1px] bg-gray-400" />
              <div className="absolute left-[50%] top-[5%] bottom-[15%] w-[1px] bg-gray-400" />
              <div className="absolute left-[75%] top-[15%] bottom-[5%] w-[1px] bg-gray-400" />
            </div>
            <div className="absolute top-2 left-3 text-[11px] text-gray-400 font-medium">
              {user.name}의 맛집 지도
            </div>

            {/* Pins */}
            {userPosts.map((post) => {
              const pos = pinPosition(post);
              const isSelected = selectedPin?.id === post.id;
              return (
                <button
                  key={post.id}
                  onClick={() => setSelectedPin(isSelected ? null : post)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform"
                  style={pos}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] shadow-md transition-all ${
                      isSelected
                        ? "bg-primary scale-125 ring-2 ring-primary/30"
                        : "bg-white border-2 border-primary"
                    }`}
                  >
                    {ratingEmoji(post.rating)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Pin Card */}
          {selectedPin && (
            <div className="p-4 border-t border-gray-100 animate-slideUp">
              <div className="flex gap-3">
                <div className="relative w-20 h-20 rounded-btn overflow-hidden flex-shrink-0">
                  <Image src={selectedPin.image} alt={selectedPin.place} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-body font-semibold text-gray-900">{selectedPin.place}</h3>
                    <span>{ratingEmoji(selectedPin.rating)}</span>
                  </div>
                  <p className="text-sub text-gray-500 mt-0.5">{selectedPin.area}</p>
                  <p className="text-sub text-gray-700 mt-1">{selectedPin.review}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Heart size={14} className="text-red-400" strokeWidth={1.8} />
                    <span className="text-sub text-gray-400">{selectedPin.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Post List */}
          <div className="border-t border-gray-100">
            <div className="p-4 pb-2">
              <h3 className="text-body font-semibold text-gray-900">등록한 맛집 {userPosts.length}곳</h3>
            </div>
            {userPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPin(post)}
                className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-50 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={post.image} alt={post.place} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium text-gray-900 truncate">{post.place}</p>
                  <p className="text-sub text-gray-500">{post.area} · {ratingEmoji(post.rating)}</p>
                </div>
                <Heart size={16} className="text-gray-300" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="bg-white mt-2 p-1">
          <div className="grid grid-cols-3 gap-1">
            {userPosts.map((post) => (
              <div key={post.id} className="relative aspect-square">
                <Image src={post.image} alt={post.place} fill className="object-cover" unoptimized />
                <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[11px] px-1.5 py-0.5 rounded-full">
                  {ratingEmoji(post.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom spacing for tab bar */}
      <div className="h-24" />
    </div>
  );
}
