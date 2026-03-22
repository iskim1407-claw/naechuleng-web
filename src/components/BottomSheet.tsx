"use client";
import { useRef, useState, useCallback } from "react";
import { LayoutGrid, Compass, User } from "lucide-react";

interface Props {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PEEK = 120;
const HALF = 420;
const FULL_RATIO = 0.9;

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
  const fullH = typeof window !== "undefined" ? window.innerHeight * FULL_RATIO : 700;

  const snapTo = useCallback((h: number) => {
    const snaps = [PEEK, HALF, fullH];
    let closest = snaps[0];
    let minDist = Math.abs(h - snaps[0]);
    for (const s of snaps) {
      const d = Math.abs(h - s);
      if (d < minDist) { minDist = d; closest = s; }
    }
    setHeight(closest);
  }, [fullH]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setDragging(true);
    startY.current = e.touches[0].clientY;
    startH.current = height;
  }, [height]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging) return;
    const delta = startY.current - e.touches[0].clientY;
    const newH = Math.max(PEEK, Math.min(fullH, startH.current + delta));
    setHeight(newH);
  }, [dragging, fullH]);

  const onTouchEnd = useCallback(() => {
    setDragging(false);
    snapTo(height);
  }, [height, snapTo]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // handled by touch events
    setDragging(true);
    startY.current = e.clientY;
    startH.current = height;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [height]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || e.pointerType === "touch") return;
    const delta = startY.current - e.clientY;
    const newH = Math.max(PEEK, Math.min(fullH, startH.current + delta));
    setHeight(newH);
  }, [dragging, fullH]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    setDragging(false);
    snapTo(height);
  }, [height, snapTo]);

  const onHandleTap = useCallback(() => {
    if (height <= PEEK + 10) setHeight(HALF);
    else if (height <= HALF + 10) setHeight(fullH);
    else setHeight(PEEK);
  }, [height, fullH]);

  const isPeek = height <= PEEK + 10;

  return (
    <div
      id="bottom-sheet"
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        height: `${height}px`,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        transition: dragging ? "none" : "height 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      {/* Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "#1a1a1a",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "20px 20px 0 0",
      }} />

      {/* Drag handle area */}
      <div
        style={{ position: "relative", zIndex: 10, cursor: "grab", touchAction: "none", userSelect: "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onHandleTap}
      >
        {/* Handle bar */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 8 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)" }} />
        </div>

        {/* Tab buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 }}>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  border: active ? "1px solid rgba(255,107,53,0.5)" : "1px solid transparent",
                  background: active ? "rgba(255,107,53,0.15)" : "transparent",
                  color: active ? "#FF6B35" : "rgba(255,255,255,0.4)",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Peek hint text */}
        {isPeek && (
          <div style={{ textAlign: "center", paddingBottom: 8, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            ↑ 올려서 피드 보기
          </div>
        )}
      </div>

      {/* Content area */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          overflowY: "auto",
          padding: "0 16px",
          opacity: isPeek ? 0 : 1,
          transition: "opacity 0.2s",
        }}
        className="hide-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}
