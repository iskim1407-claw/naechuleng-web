"use client";
import { useState } from "react";
import { Plus, Camera, Search, X } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/create", icon: Camera, label: "포스트", color: "#FF6B35" },
  { href: "/discover", icon: Search, label: "검색", color: "#3B82F6" },
];

export default function RadialMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-4 bottom-[120px] z-[1200]">
      {/* Menu items — fan out upward */}
      {items.map((item, i) => {
        const Icon = item.icon;
        const angle = -90 - (i * 55); // spread upward from right
        const rad = (angle * Math.PI) / 180;
        const distance = 70;
        const tx = open ? Math.cos(rad) * distance : 0;
        const ty = open ? Math.sin(rad) * distance : 0;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="absolute bottom-0 right-0 w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: item.color,
              transform: `translate(${tx}px, ${ty}px) scale(${open ? 1 : 0})`,
              opacity: open ? 1 : 0,
              transition: `all 0.25s cubic-bezier(0.32, 0.72, 0, 1) ${open ? i * 0.05 : 0}s`,
              boxShadow: `0 4px 16px ${item.color}50`,
            }}
          >
            <Icon size={18} className="text-white" />
          </Link>
        );
      })}

      {/* Label tooltips */}
      {items.map((item, i) => {
        const angle = -90 - (i * 55);
        const rad = (angle * Math.PI) / 180;
        const distance = 70;
        const tx = Math.cos(rad) * distance - 52;
        const ty = Math.sin(rad) * distance;

        return (
          <span
            key={`label-${item.href}`}
            className="absolute bottom-1.5 right-0 text-[10px] text-white/70 whitespace-nowrap pointer-events-none"
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${open ? 1 : 0.8})`,
              opacity: open ? 1 : 0,
              transition: `all 0.25s ease ${open ? i * 0.05 + 0.05 : 0}s`,
            }}
          >
            {item.label}
          </span>
        );
      })}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-13 h-13 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
        style={{
          width: 52,
          height: 52,
          background: open
            ? "rgba(255,255,255,0.15)"
            : "linear-gradient(135deg, #FF6B35, #ff9a62)",
          backdropFilter: open ? "blur(20px)" : "none",
          boxShadow: open ? "none" : "0 4px 24px rgba(255,107,53,0.4)",
        }}
      >
        <div
          style={{
            transform: `rotate(${open ? 45 : 0}deg)`,
            transition: "transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {open ? <X size={22} className="text-white" /> : <Plus size={24} strokeWidth={2.5} className="text-white" />}
        </div>
      </button>
    </div>
  );
}
