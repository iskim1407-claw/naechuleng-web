"use client";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8">
      {/* Logo area */}
      <div className="flex flex-col items-center mb-16">
        {/* Orange circle graphic */}
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/30" />
        </div>
        <h1 className="text-[32px] font-bold text-primary">Bites</h1>
        <p className="text-body text-gray-500 mt-2">한 입의 발견</p>
      </div>

      {/* Login buttons */}
      <div className="w-full max-w-[320px] space-y-3">
        <button
          onClick={handleLogin}
          className="w-full h-[52px] bg-[#FEE500] text-[#191919] rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2C5.58 2 2 4.87 2 8.36c0 2.24 1.48 4.21 3.72 5.33-.16.58-.58 2.1-.67 2.42-.1.4.15.39.31.28.13-.08 2.04-1.38 2.87-1.94.56.08 1.14.13 1.77.13 4.42 0 8-2.87 8-6.22C18 4.87 14.42 2 10 2Z"
              fill="#191919"
            />
          </svg>
          카카오로 시작하기
        </button>

        <button
          onClick={handleLogin}
          className="w-full h-[52px] bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="white">
            <path d="M14.94 11.58c-.02-2.27 1.86-3.37 1.94-3.42-1.06-1.54-2.7-1.76-3.28-1.78-1.39-.14-2.73.82-3.44.82-.72 0-1.82-.8-2.99-.78-1.53.02-2.95.9-3.74 2.27-1.6 2.77-.41 6.87 1.14 9.12.76 1.1 1.67 2.33 2.86 2.29 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.98.71 1.24-.02 2.02-1.11 2.76-2.22.87-1.27 1.23-2.51 1.25-2.57-.03-.01-2.4-.92-2.42-3.65l-.03-.05ZM12.67 4.54c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.1 1.76-.96 2.8 1.01.08 2.05-.52 2.68-1.28Z" />
          </svg>
          Apple로 시작하기
        </button>
      </div>

      {/* Terms */}
      <p className="text-tiny text-gray-400 mt-8 text-center">
        가입 시 이용약관 및 개인정보처리방침에 동의합니다
      </p>
    </div>
  );
}
