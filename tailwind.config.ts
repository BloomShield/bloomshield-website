import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#102d2a",
        teal: { 50: "#eef9f6", 100: "#d7f1e9", 500: "#137d68", 600: "#0d6857", 700: "#0a5347", 800: "#0c4038", 900: "#0c302c" },
        emerald: { 400: "#4fc799", 500: "#2da878" },
        gold: { 400: "#d7ad58", 500: "#85601e" },
        mist: "#f4f7f6"
      },
      fontFamily: { sans: ["var(--font-body)", "Arial", "sans-serif"], display: ["var(--font-display)", "Arial", "sans-serif"] },
      boxShadow: { soft: "0 20px 60px -30px rgba(12, 64, 56, .24)" },
      borderRadius: { "4xl": "2rem" }
    }
  },
  plugins: []
} satisfies Config;
