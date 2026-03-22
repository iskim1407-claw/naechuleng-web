"use client";
import { useState } from "react";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { mockUsers, mockPostsExtended } from "@/data/mock";
import FeedCard from "@/components/FeedCard";
import TabBar from "@/components/TabBar";

const ratingEmoji = { love: "😍", good: "🙂", okay: "😐" };

function UserCard({ user }: { user: (typeof mockUsers)[0] }) {
  const [open, setOpen] = useState(false);
  const userPosts = mockPostsExtended.filter((p) => p.user === user.username);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 active:bg-gray-50 transition-all duration-200"
      >
        <Image
          src={user.avatar}
          alt={user.name}
          width={48}
          height={48}
          className="rounded-full bg-gray-100 shrink-0"
          unoptimized
        />
        <div className="flex-1 min-w-0 text-left">
          <p className="font-semibold text-body">{user.name}</p>
          <p className="text-sub text-gray-500 truncate">{user.bio}</p>
        </div>
        <span className="text-tiny bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full shrink-0">
          {userPosts.length}곳
        </span>
        {open ? (
          <ChevronUp size={20} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-gray-400 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-4 space-y-3">
          {/* Mini map */}
          <div className="aspect-[2/1] rounded-xl bg-[#F5F1EB] relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            {userPosts.map((p, i) => (
              <div
                key={p.id}
                className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm shadow-md"
                style={{
                  left: `${20 + i * 22}%`,
                  top: `${30 + (i % 2) * 25}%`,
                }}
              >
                {ratingEmoji[p.rating]}
              </div>
            ))}
          </div>

          {/* Posts list */}
          {userPosts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 py-2"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                <Image
                  src={p.image}
                  alt={p.place}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-body truncate">{p.place}</p>
                <p className="text-sub text-gray-500 truncate">
                  {p.area} · {ratingEmoji[p.rating]} {p.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState<"feed" | "users">("feed");
  const { posts } = useStore();

  return (
    <div className="min-h-screen bg-bg pb-[90px]">
      {/* Header */}
      <header className="sticky top-0 z-40 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-5">
        <h1 className="text-[22px] font-bold text-primary">Bites</h1>
        <button className="active:scale-95 transition-all duration-200">
          <Bell size={24} strokeWidth={1.8} className="text-gray-700" />
        </button>
      </header>

      {/* Sub tabs */}
      <div className="flex bg-white border-b border-gray-100">
        {(["feed", "users"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-body font-medium text-center transition-all duration-200 ${
              tab === t
                ? "text-black border-b-2 border-black"
                : "text-gray-400"
            }`}
          >
            {t === "feed" ? "피드" : "유저"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-5 pt-3 space-y-3">
        {tab === "feed"
          ? posts.map((post) => <FeedCard key={post.id} post={post} />)
          : mockUsers.map((user) => (
              <UserCard key={user.username} user={user} />
            ))}
      </div>

      <TabBar />
    </div>
  );
}
