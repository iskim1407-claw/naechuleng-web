"use client";
import { Home, MapPin, Search, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/map", icon: MapPin, label: "지도" },
  { href: "/create", icon: null, label: "" },
  { href: "/discover", icon: Search, label: "발견" },
  { href: "/profile", icon: User, label: "프로필" },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[82px] bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-start pt-2 px-4 safe-bottom z-50">
      {tabs.map((tab) => {
        if (!tab.icon) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex justify-center"
            >
              <div className="w-14 h-14 -mt-6 bg-primary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200">
                <Plus size={28} strokeWidth={2.5} className="text-white" />
              </div>
            </Link>
          );
        }
        const active = pathname === tab.href;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <Icon
              size={24}
              strokeWidth={1.8}
              className={active ? "text-primary" : "text-gray-400"}
            />
            <span
              className={`text-tiny ${active ? "text-primary" : "text-gray-400"}`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
