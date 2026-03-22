import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Bites",
  description: "한 입의 발견",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-black min-h-screen antialiased text-white">
        <div className="max-w-[480px] mx-auto relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
