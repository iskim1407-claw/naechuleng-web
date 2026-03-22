"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useStore } from "@/store/useStore";
import FeedCard from "@/components/FeedCard";
import { mockUsers } from "@/data/mock";
import Image from "next/image";
import Link from "next/link";

export default function FeedPage() {
  const { isLoggedIn, posts } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<"feed" | "users">("feed");

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("user");
    if (!stored && !isLoggedIn) {
      router.replace("/login");
    } else if (stored && !isLoggedIn) {
      useStore.getState().login();
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

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
        {/* Sub tabs */}
        <div className="flex">
          <button
            onClick={() => setTab("feed")}
            className={`flex-1 py-2.5 text-[15px] font-semibold text-center transition-colors ${
              tab === "feed"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
          >
            피드
          </button>
          <button
            onClick={() => setTab("users")}
            className={`flex-1 py-2.5 text-[15px] font-semibold text-center transition-colors ${
              tab === "users"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
          >
            유저
          </button>
        </div>
      </header>

      {tab === "feed" ? (
        /* Feed */
        <div className="flex flex-col gap-2 p-4 pt-3">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Users */
        <div className="bg-white mt-2">
          {mockUsers.map((user) => (
            <Link
              key={user.username}
              href={`/user/${user.username}`}
              className="flex items-center gap-3 px-5 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={52}
                height={52}
                className="rounded-full bg-gray-100"
                unoptimized
              />
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-semibold text-gray-900">{user.name}</p>
                <p className="text-[13px] text-gray-500">@{user.username}</p>
                <p className="text-[13px] text-gray-400 mt-0.5">{user.bio}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[14px] font-bold text-primary">
                  {/* count posts */}
                  {posts.filter((p) => p.user === user.username).length}곳
                </p>
                <p className="text-[11px] text-gray-400">맛집</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
