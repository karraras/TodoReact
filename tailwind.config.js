/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#080A1A",
        subMain: "#F20000",
        dry: "#0B0F29",
        star: "#FFB000",
        text: "#c0c0c0",
        border: "#4b5563",
        dryGray: "#E0D5D5",
      },
    },
  },
  plugins: [],
};
