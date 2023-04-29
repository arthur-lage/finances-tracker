/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      colors: {
        app: "#1D1F3E",
        header: "#121426",
        "input-placeholder": "#ffffff99",
        "action-primary": "#6147FF",
        "input-border": "#A68BC9",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
