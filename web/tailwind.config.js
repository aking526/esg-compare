/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "light": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      }
    },
    fontFamily: {
      "modern": ["Roboto", "Calibre", "Helvetica Neue", "sans-serif"]
    },
  },
  plugins: [],
}
