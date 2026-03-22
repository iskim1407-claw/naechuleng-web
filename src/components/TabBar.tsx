"use client";
import { MapPin, LayoutGrid, Search, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: MapPin, label: "홈" },
  { href: "/feed", icon: LayoutGrid, label: "피드" },
  { href: "/create", icon: null, label: "" },
  { href: "/discover", icon: Search, label: "발견" },
  { href: "/profile", icon: User, label: "MY" },
];

export default function TabBar() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-black/95 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="flex items-end h-[50px] px-1">
        {tabs.map((tab) => {
          if (!tab.icon) {
            return (
              <Link key={tab.href} href={tab.href} className="flex-1 flex justify-center pb-1.5">
                <div className="w-11 h-11 bg-gradient-to-tr from-[#FF6B35] to-[#ff9a62] rounded-xl flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-[#FF6B35]/30">
                  <Plus size={22} strokeWidth={2.5} className="text-white" />
                </div>
              </Link>
            );
          }
          const active = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link key={tab.href} href={tab.href} className="flex-1 flex flex-col items-center gap-0.5 pb-1.5">
              <Icon size={22} strokeWidth={active ? 2 : 1.5} className={active ? "text-white" : "text-white/40"} />
              <span className={`text-[10px] ${active ? "text-white font-medium" : "text-white/40"}`}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}
