import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir"],
        tanha: ["tanha"],
      },
      keyframes: {
        popUp: {
          "0%": { opacity: "0", transfrom: "translateY(20px)" },
          "50%": { opacity: "0.5", transform: "translateY(-80px)" },
          "60%": { opacity: "0.5", transform: "translateY(+40px)" },
          "70%": { opacity: "0.5", transform: "translateY(-20px)" },
          "80%": { opacity: "0.5", transform: "translateY(+10px)" },
          "90%": { opacity: "0.5", transform: "translateY(-5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popDown: {
          "0%": { opacity: "1", transform: "translateY(-10px)" },
          "100%": { opacity: "0.5", transform: "translateY(100px)" },
        },
        count: {
          "0%": {
            opacity: "0",
            transform: "translateY(-40%) rotateY(-180deg)",
          },
          "100%": { opacity: "1", transform: "translateY(0) rotateY(0deg)" },
        },
      },
      animation: {
        popup: "popUp 0.5s ease-out",
        popdown: "popDown 0.3s ease-in",
        count: "count 1s ",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
