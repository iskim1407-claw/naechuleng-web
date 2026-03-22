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
        bg: "#F4F4F4",
        kakao: "#FEE500",
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
      },
      fontSize: {
        header: ["22px", { lineHeight: "1.5", fontWeight: "700" }],
        body: ["15px", { lineHeight: "1.5" }],
        sub: ["13px", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};
export default config;
