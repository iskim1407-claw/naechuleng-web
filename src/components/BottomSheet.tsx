"use client";
import { useRef, useState, useCallback } from "react";
import { LayoutGrid, Compass, User } from "lucide-react";

interface Props {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PEEK = 100;  // handle + tab icons clearly visible
const HALF = 400;  // content visible
const FULL_RATIO = 0.88; // 88% of viewport

const tabs = [
  { key: "feed", icon: LayoutGrid, label: "피드" },
  { key: "discover", icon: Compass, label: "발견" },
  { key: "profile", icon: User, label: "MY" },
];

export default function BottomSheet({ children, activeTab, onTabChange }: Props) {
  const [height, setHeight] = useState(PEEK);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const startH = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const fullH = typeof window !== "undefined" ? window.innerHeight * FULL_RATIO : 700;

  const snapTo = useCallback((h: number) => {
    // Snap to nearest
    const snaps = [PEEK, HALF, fullH];
    let closest = snaps[0];
    let minDist = Math.abs(h - snaps[0]);
    for (const s of snaps) {
      const d = Math.abs(h - s);
      if (d < minDist) { minDist = d; closest = s; }
    }
    setHeight(closest);
  }, [fullH]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    startY.current = e.clientY;
    startH.current = height;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [height]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    const delta = startY.current - e.clientY;
    const newH = Math.max(PEEK, Math.min(fullH, startH.current + delta));
    setHeight(newH);
  }, [dragging, fullH]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
    snapTo(height);
  }, [height, snapTo]);

  // Tap handle to cycle peek → half → full → peek
  const onHandleTap = useCallback(() => {
    if (dragging) return;
    if (height <= PEEK + 10) setHeight(HALF);
    else if (height <= HALF + 10) setHeight(fullH);
    else setHeight(PEEK);
  }, [height, dragging, fullH]);

  const isPeek = height <= PEEK + 10;

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-[9999] flex flex-col"
      style={{
        height: `${height}px`,
        transition: dragging ? "none" : "height 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-[#111111] rounded-t-[20px] border-t border-white/15" />

      {/* Drag handle + tabs */}
      <div
        className="relative z-10 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onHandleTap}
        style={{ touchAction: "none" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/25" />
        </div>

        {/* Tab icons */}
        <div className="flex justify-center gap-2 pb-3 px-4">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={(e) => {
                  e.stopPropagation();
                  onTabChange(tab.key);
                  if (isPeek) setHeight(HALF);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-[12px] font-medium ${
                  active
                    ? "bg-white/15 text-white border border-white/10"
                    : "text-white/40 hover:text-white/50"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div
        className="relative z-10 flex-1 overflow-y-auto hide-scrollbar px-4"
        style={{ opacity: isPeek ? 0 : 1, transition: "opacity 0.2s" }}
      >
        {children}
      </div>

      {/* Safe area */}
      <div className="relative z-10 h-[env(safe-area-inset-bottom,0px)]" />
    </div>
  );
}
