"use client";
import { useState } from "react";
import { Camera, MapPin, Navigation, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import TabBar from "@/components/TabBar";

const ratings = [
  { value: "okay" as const, emoji: "😐", label: "괜찮아" },
  { value: "good" as const, emoji: "🙂", label: "맛있어" },
  { value: "love" as const, emoji: "😍", label: "미쳤어" },
];

export default function CreatePage() {
  const router = useRouter();
  const { addPost } = useStore();
  const [place, setPlace] = useState("");
  const [area, setArea] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<"okay" | "good" | "love">("good");

  const handleSubmit = () => {
    addPost({
      id: Date.now(),
      user: "food_explorer",
      avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=food_explorer",
      place: place || "새 맛집",
      area: area || "서울",
      review: review || "맛있어요!",
      rating,
      likes: 0,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
      time: "방금",
      category: "한식",
      lat: 37.56,
      lng: 126.97,
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white pb-[90px]">
      {/* Header */}
      <header className="sticky top-0 z-40 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center px-5">
        <button
          onClick={() => router.back()}
          className="active:scale-95 transition-all duration-200"
        >
          <ArrowLeft size={24} strokeWidth={1.8} />
        </button>
        <h1 className="flex-1 text-center font-semibold text-body">새 글</h1>
        <div className="w-6" />
      </header>

      <div className="px-5 pt-5 space-y-5">
        {/* Photo */}
        <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 active:bg-gray-50 transition-all duration-200 cursor-pointer">
          <Camera size={32} strokeWidth={1.5} />
          <span className="text-sub">사진 추가</span>
        </div>

        {/* Place */}
        <div className="flex items-center gap-3 h-[52px] bg-gray-50 rounded-xl px-4">
          <MapPin size={20} strokeWidth={1.8} className="text-gray-400 shrink-0" />
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="장소명"
            className="flex-1 bg-transparent text-body outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Area */}
        <div className="flex items-center gap-3 h-[52px] bg-gray-50 rounded-xl px-4">
          <Navigation size={20} strokeWidth={1.8} className="text-gray-400 shrink-0" />
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="위치"
            className="flex-1 bg-transparent text-body outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Review */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="이 맛집을 한마디로?"
          className="w-full h-24 bg-gray-50 rounded-xl px-4 py-3 text-body outline-none placeholder:text-gray-400 resize-none"
        />

        {/* Rating */}
        <div className="grid grid-cols-3 gap-3">
          {ratings.map((r) => (
            <button
              key={r.value}
              onClick={() => setRating(r.value)}
              className={`h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 ${
                rating === r.value
                  ? "border-2 border-primary bg-orange-50"
                  : "border border-gray-200 bg-white"
              }`}
            >
              <span className="text-2xl">{r.emoji}</span>
              <span className="text-sub font-medium">{r.label}</span>
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full h-[52px] bg-primary text-white rounded-xl font-semibold active:scale-95 transition-all duration-200"
        >
          등록하기
        </button>
      </div>

      <TabBar />
    </div>
  );
}
