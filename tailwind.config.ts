import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        "primary-light": "#FFF0E9",
        bg: "#FAFAFA",
        kakao: "#FEE500",
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
      },
      fontSize: {
        header: ["24px", { lineHeight: "1.5", fontWeight: "700" }],
        body: ["15px", { lineHeight: "1.5" }],
        sub: ["13px", { lineHeight: "1.5" }],
        tiny: ["11px", { lineHeight: "1.5" }],
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounceHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease-out",
        bounceHeart: "bounceHeart 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
