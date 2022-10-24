/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "light": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        "bottom-border": "inset 0 0 0 white, inset 0 -1px 0 black"
      },
      spacing: {
        "page-h": "620px",
        "rankings-w": "912px",
        "rankings-table-h": "535px"
      }
    },
    fontFamily: {
      "modern": ["Roboto", "Helvetica", "Arial", "sans-serif"]
    },
  },
  plugins: [],
}
