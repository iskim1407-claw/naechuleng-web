import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bites — 한 입의 발견",
  description: "친구들의 맛집을 한 입에 발견하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-bg min-h-screen max-w-[480px] mx-auto relative">
        {children}
      </body>
    </html>
  );
}
