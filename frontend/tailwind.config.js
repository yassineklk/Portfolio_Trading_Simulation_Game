/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'timer': ['Play','sans-serif'],
      },
    },
    backgroundImage: {
      "trading-bg": "url('/public/trading-bg2.jpg')",
    },
  },
  plugins: [],
};
