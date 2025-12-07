/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amberColor: "var(--bg-amber-450)",
        grayWood: "var(--border-gray-100)",
      },
    },
  },
  plugins: [],
};
