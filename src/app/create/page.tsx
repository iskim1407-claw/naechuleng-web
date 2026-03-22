"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, MapPin, ChevronLeft } from "lucide-react";
import { useStore } from "@/store/useStore";

const ratings = [
  { value: "okay" as const, emoji: "😐", label: "괜찮아" },
  { value: "good" as const, emoji: "🙂", label: "맛있어" },
  { value: "love" as const, emoji: "😍", label: "미쳤어" },
];

export default function CreatePage() {
  const router = useRouter();
  const addPost = useStore((s) => s.addPost);
  const [place, setPlace] = useState("");
  const [area, setArea] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<"okay" | "good" | "love" | null>(null);

  const handleSubmit = () => {
    if (!place || !rating) return;
    addPost({
      id: Date.now(),
      user: "맛집러",
      avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=me",
      place,
      area: area || "서울",
      review,
      rating,
      likes: 0,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
      time: "방금 전",
      category: "한식",
      lat: 37.56,
      lng: 126.97,
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center px-5 h-[56px]">
          <button onClick={() => router.back()} className="p-1 -ml-1 mr-3">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <h1 className="text-header text-gray-900">맛집 등록</h1>
        </div>
      </header>

      <div className="p-5 flex flex-col gap-5">
        {/* Photo */}
        <button className="w-full aspect-video rounded-card border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 active:bg-gray-50 transition-colors">
          <Camera size={32} strokeWidth={1.5} />
          <span className="text-sub">사진 추가</span>
        </button>

        {/* Place name */}
        <div>
          <label className="text-sub font-medium text-gray-500 mb-1.5 block">장소명</label>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="맛집 이름을 입력해주세요"
            className="w-full h-[48px] px-4 rounded-btn bg-gray-50 text-body text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sub font-medium text-gray-500 mb-1.5 block">위치</label>
          <div className="relative">
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="동네 or 주소"
              className="w-full h-[48px] px-4 pr-10 rounded-btn bg-gray-50 text-body text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30"
            />
            <MapPin size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Review */}
        <div>
          <label className="text-sub font-medium text-gray-500 mb-1.5 block">한줄평</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="이 맛집을 한 줄로 표현한다면?"
            rows={3}
            className="w-full px-4 py-3 rounded-btn bg-gray-50 text-body text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sub font-medium text-gray-500 mb-2 block">평점</label>
          <div className="grid grid-cols-3 gap-3">
            {ratings.map((r) => (
              <button
                key={r.value}
                onClick={() => setRating(r.value)}
                className={`flex flex-col items-center gap-1 py-4 rounded-btn border-2 transition-all ${
                  rating === r.value
                    ? "border-primary bg-primary-light"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-[28px]">{r.emoji}</span>
                <span className={`text-sub font-medium ${rating === r.value ? "text-primary" : "text-gray-500"}`}>
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!place || !rating}
          className="w-full h-[52px] rounded-btn bg-primary text-white font-semibold text-body disabled:opacity-40 active:scale-[0.98] transition-all mt-2"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
