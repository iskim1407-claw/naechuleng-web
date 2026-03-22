"use client";
import { usePathname, useRouter } from "next/navigation";
import { Home, MapPin, Search, User, Plus } from "lucide-react";

const tabs = [
  { icon: Home, label: "홈", path: "/" },
  { icon: MapPin, label: "지도", path: "/map" },
  { icon: null, label: "등록", path: "/create" },
  { icon: Search, label: "발견", path: "/discover" },
  { icon: User, label: "프로필", path: "/profile" },
];

export default function TabBar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
      <div className="flex items-center justify-around h-[56px] px-2">
        {tabs.map((tab) => {
          if (tab.icon === null) {
            return (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg shadow-primary/30 -mt-5"
              >
                <Plus size={26} className="text-white" strokeWidth={2.5} />
              </button>
            );
          }
          const active = pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center gap-0.5 min-w-[48px]"
            >
              <Icon
                size={22}
                className={active ? "text-primary" : "text-gray-400"}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-primary" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area bottom */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
