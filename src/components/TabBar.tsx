"use client";
import { Home, MapPin, Search, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/map", icon: MapPin, label: "지도" },
  { href: "/create", icon: null, label: "" },
  { href: "/discover", icon: Search, label: "발견" },
  { href: "/profile", icon: User, label: "MY" },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200/60 z-50">
      <div className="flex items-end h-[56px] px-2">
        {tabs.map((tab) => {
          if (!tab.icon) {
            return (
              <Link key={tab.href} href={tab.href} className="flex-1 flex justify-center -mb-1">
                <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#FF6B35] to-[#FF8F65] rounded-2xl flex items-center justify-center shadow-[0_4px_12px_rgba(255,107,53,0.4)] active:scale-90 transition-transform duration-150">
                  <Plus size={24} strokeWidth={2.5} className="text-white" />
                </div>
              </Link>
            );
          }
          const active = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link key={tab.href} href={tab.href} className="flex-1 flex flex-col items-center gap-0.5 pb-2">
              <Icon size={22} strokeWidth={active ? 2.2 : 1.5} className={active ? "text-gray-900" : "text-gray-400"} />
              <span className={`text-[10px] font-medium ${active ? "text-gray-900" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer */}
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-white" />
    </nav>
  );
}
