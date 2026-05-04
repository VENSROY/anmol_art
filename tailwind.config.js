export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "royal-maroon": "#5D001E",
        "royal-gold": "#D4AF37",
        "royal-gold-dark": "#B4941F",
        ivory: "#FDFBF7",
        "earthy-brown": "#4A3728",
        "antique-cream": "#F3E5AB",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
      },
    },
  },
  plugins: [],
};