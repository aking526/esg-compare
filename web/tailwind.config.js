/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-red": "rgba(214,0,43,255)",
        "nav-red": "rgba(215,15,50,100)",
        "contrast-gray": "rgba(245,245,245,255)",
        "band": "rgba(224,231,245,255)",
        "band-contrast": "rgba(224,231,245,200)"
      },
      boxShadow: {
        "light": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        "bottom-border": "inset 0 0 0 white, inset 0 -1px 0 black"
      },
      spacing: {
        "page-h": "620px",
        "rankings-w": "912px",
        "rankings-table-h": "545px"
      }
    },
    fontFamily: {
      "modern": ["Inter", "Helvetica", "Arial", "sans-serif"]
    },
  },
  plugins: [],
};