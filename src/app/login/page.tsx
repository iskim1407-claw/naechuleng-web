"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);

  const handleLogin = () => {
    login();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3 mb-16">
        <h1 className="text-[32px] font-bold text-primary">내슐랭</h1>
        <p className="text-body text-gray-500">나만의 맛집 지도를 완성해봐</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={handleLogin}
          className="w-full h-[52px] rounded-btn bg-kakao text-black font-semibold text-body flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.163 1 9.098c0 2.58 1.693 4.844 4.235 6.124l-1.063 3.89c-.094.344.297.618.59.415l4.547-3.035c.226.016.454.026.691.026 4.971 0 9-3.163 9-7.098S14.971 2 10 2z" fill="currentColor"/></svg>
          카카오로 시작하기
        </button>

        <button
          onClick={handleLogin}
          className="w-full h-[52px] rounded-btn bg-black text-white font-semibold text-body flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none"><path d="M9 1.5c2.486 0 4.635 1.376 5.748 3.408C16.62 6.065 18 8.368 18 11c0 5.523-4.029 10-9 10S0 16.523 0 11c0-2.632 1.38-4.935 3.252-6.092C4.365 2.876 6.514 1.5 9 1.5z" fill="white" stroke="white"/><path d="M9 5.5a2.5 2.5 0 012.5 2.5A2.5 2.5 0 019 10.5 2.5 2.5 0 016.5 8 2.5 2.5 0 019 5.5z" fill="black"/></svg>
          Apple로 시작하기
        </button>
      </div>
    </div>
  );
}
