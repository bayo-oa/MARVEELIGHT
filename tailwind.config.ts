import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        background: "#0A0612",
        surface: "#130C20",
        "surface-2": "#1B1230",
        border: "#2A1E45",
        primary: "#8B5CF6",
        "primary-glow": "#A855F7",
        accent: "#C4B5FD",
        foreground: "#F5F3FF",
        muted: "#A79BC4",
      },
      fontFamily: {
        heading: ["'Sora Variable'", "system-ui", "sans-serif"],
        body: ["'Inter Variable'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139, 92, 246, 0.55)",
        "glow-sm": "0 0 24px -6px rgba(139, 92, 246, 0.45)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C4B5FD 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
