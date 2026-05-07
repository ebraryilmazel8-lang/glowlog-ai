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
        glow: {
          50: "#fdf5f3",
          100: "#fbe8e2",
          200: "#f9d5c9",
          300: "#f4b5a3",
          400: "#ec8b6e",
          500: "#e16a47",
          600: "#ce5232",
          700: "#ad4128",
          800: "#8f3824",
          900: "#773323",
        },
        blush: {
          50: "#fef1f7",
          100: "#fee5f0",
          200: "#fecce3",
          300: "#ffa2ca",
          400: "#fd6da5",
          500: "#f73c82",
          600: "#e71f5e",
          700: "#c91145",
          800: "#a61139",
          900: "#8a1333",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e3eae2",
          200: "#c7d5c6",
          300: "#a1b8a0",
          400: "#789776",
          500: "#587a56",
          600: "#446243",
          700: "#384f37",
          800: "#2f402e",
          900: "#273527",
        },
        cream: {
          50: "#fefcf7",
          100: "#fdf6e8",
          200: "#faecc7",
          300: "#f5dc9e",
          400: "#efc56c",
          500: "#e9af44",
          600: "#db9630",
          700: "#b67627",
          800: "#925e27",
          900: "#784d24",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
