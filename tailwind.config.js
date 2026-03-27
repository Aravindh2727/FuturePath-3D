/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1120px",
        xl: "1240px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#7CF0FF",
          foreground: "#0C1B33",
        },
        secondary: {
          DEFAULT: "#1B2A4A",
          foreground: "#EAF6FF",
        },
        accent: {
          DEFAULT: "#A855F7",
          foreground: "#0F172A",
        },
        surface: {
          DEFAULT: "#0E1525",
          muted: "#10192E",
          card: "#111B31",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#0B1221",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 240, 255, 0.25)",
      },
      backgroundImage: {
        "grid-faint":
          "radial-gradient(circle at 1px 1px, rgba(124,240,255,0.15) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
