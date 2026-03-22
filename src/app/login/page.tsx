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
      {/* Logo area */}
      <div className="flex flex-col items-center mb-16">
        {/* Abstract food graphic */}
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#FF8F65] rounded-[28px] rotate-12 opacity-20" />
          <div className="absolute inset-1 bg-gradient-to-br from-[#FF6B35] to-[#FF8F65] rounded-[24px] rotate-6 opacity-40" />
          <div className="absolute inset-2 bg-gradient-to-br from-[#FF6B35] to-[#FF8F65] rounded-[20px] flex items-center justify-center">
            <span className="text-white text-[36px]">🍽️</span>
          </div>
        </div>
        <h1 className="text-[36px] font-black tracking-tight bg-gradient-to-r from-[#FF6B35] to-[#FF8F65] bg-clip-text text-transparent">
          Bites
        </h1>
        <p className="text-[15px] text-gray-400 mt-2 font-medium">한 입의 발견</p>
      </div>

      {/* Login buttons */}
      <div className="w-full max-w-[320px] space-y-3">
        <button
          onClick={handleLogin}
          className="w-full h-[52px] bg-[#FEE500] rounded-xl font-semibold text-[15px] text-[#191919] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#191919">
            <path d="M12 3C6.48 3 2 6.36 2 10.5c0 2.67 1.77 5.02 4.44 6.36-.14.52-.91 3.36-.94 3.58 0 0-.02.16.08.22.1.06.22.03.22.03.29-.04 3.37-2.2 3.9-2.57.72.1 1.48.16 2.26.16 5.52 0 10-3.36 10-7.5S17.52 3 12 3z"/>
          </svg>
          카카오로 시작하기
        </button>

        <button
          onClick={handleLogin}
          className="w-full h-[52px] bg-black rounded-xl font-semibold text-[15px] text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150"
        >
          <svg width="18" height="22" viewBox="0 0 17 20" fill="white">
            <path d="M8.5 1.5c1.1-1.3 2.9-2 4.5-2-.1 1.7-.6 3.3-1.8 4.5-1.1 1.2-2.7 2-4.3 1.9.1-1.6.7-3.1 1.6-4.4zM12.3 7.1c-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8C3.8 7.2 1.5 9 1.5 12.8c0 2.3.9 4.7 2 6.3.9 1.3 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8 1.4 0 1.8.8 3 .8 1.2 0 2-1.2 2.9-2.4.5-.7.9-1.4 1.2-2.2-3.1-1.2-3.6-5.7-.5-7.4-.9-1.1-2.2-1.8-3.5-1.8-.1 0-.1 0-.2.1z"/>
          </svg>
          Apple로 시작하기
        </button>
      </div>

      {/* Terms */}
      <p className="text-[11px] text-gray-300 mt-8 text-center leading-relaxed">
        가입 시 <span className="underline">이용약관</span> 및{" "}
        <span className="underline">개인정보처리방침</span>에 동의합니다
      </p>
    </div>
  );
}
