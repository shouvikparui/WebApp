/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6F61FF",
        secondary: "#FF611E",
        accent: "#DAC3FF",
        gray: "#2A314D",
        black: "#031926",
        neutral: "#F1F6F1",
        yellow:"#FEDFA8",
        orche: "#FFA352",
        green: "#99D9B3",
        light:" #DCF7E8",
        greenlight:"#ADDEFE"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        grostek: ["Space Grotesk", "sans-sarif"],
        roboto: ["Roboto", "sans-sarif"],
      },
      screens: {
        "xs": "360px",
      }
    },
  },
  plugins: [],
}