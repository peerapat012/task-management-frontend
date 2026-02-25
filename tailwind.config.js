import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8FAFC",
        primary: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
        },
        secondary: "#64748B",
        border: "#E2E8F0",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        high: "#EF4444",
        medium: "#F59E0B",
        low: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
