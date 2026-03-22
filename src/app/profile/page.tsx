"use client";
import Image from "next/image";
import { mockUser, mockPostsExtended } from "@/data/mock";
import TabBar from "@/components/TabBar";

export default function ProfilePage() {
  const userPosts = mockPostsExtended.slice(0, 6);

  return (
    <div className="min-h-screen bg-white pb-[90px]">
      {/* Header */}
      <header className="sticky top-0 z-40 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-center px-5">
        <h1 className="font-semibold text-body">프로필</h1>
      </header>

      <div className="px-5 pt-6">
        {/* Profile info */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src={mockUser.avatar}
            alt={mockUser.name}
            width={80}
            height={80}
            className="rounded-full bg-gray-100 mb-3"
            unoptimized
          />
          <h2 className="font-bold text-[18px]">{mockUser.name}</h2>
          <p className="text-sub text-gray-500 mt-1">{mockUser.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mb-6">
          {[
            { label: "맛집", value: mockUser.posts },
            { label: "팔로워", value: mockUser.followers },
            { label: "팔로잉", value: mockUser.following },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-bold text-[18px]">{s.value}</p>
              <p className="text-sub text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Edit button */}
        <button className="w-full h-[44px] rounded-xl border border-gray-300 text-body font-medium active:scale-95 transition-all duration-200 mb-6">
          프로필 편집
        </button>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-0.5 -mx-5">
          {userPosts.map((post) => (
            <div key={post.id} className="aspect-square relative">
              <Image
                src={post.image}
                alt={post.place}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
}
