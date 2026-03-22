"use client";
import Image from "next/image";
import { Settings } from "lucide-react";
import { mockUser } from "@/data/mock";

const profileImages = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300",
];

const stats = [
  { label: "맛집", value: mockUser.posts },
  { label: "팔로워", value: mockUser.followers },
  { label: "팔로잉", value: mockUser.following },
];

export default function ProfilePage() {


  return (
    <div className="min-h-screen bg-bg pb-24">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center justify-between px-5 h-[56px]">
          <h1 className="text-header text-gray-900">프로필</h1>
          <button className="p-2 -mr-2">
            <Settings size={22} className="text-gray-600" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Profile card */}
      <div className="bg-white mx-4 mt-4 rounded-card p-5">
        <div className="flex items-center gap-4">
          <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
            <Image src={mockUser.avatar} alt={mockUser.name} fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-gray-900">{mockUser.name}</h2>
            <p className="text-sub text-gray-500">@{mockUser.username}</p>
            <p className="text-sub text-gray-600 mt-0.5">{mockUser.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-around mt-5 pt-4 border-t border-gray-100">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[18px] font-bold text-gray-900">{s.value}</p>
              <p className="text-sub text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-3 gap-1 mx-4 mt-4">
        {profileImages.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={img} alt="" fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}
