/**
 * Colours are defined once as raw RGB channels in src/index.css (:root) and
 * referenced here, so a Tailwind class and a plain CSS `color:` can never drift
 * apart. The `<alpha-value>` placeholder keeps opacity modifiers working
 * (e.g. `text-earthy-brown/50`, `bg-royal-maroon/15`).
 */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "royal-maroon": token("royal-maroon"),
        "royal-gold": token("royal-gold"),
        "royal-gold-dark": token("royal-gold-dark"),
        ivory: token("ivory"),
        "earthy-brown": token("earthy-brown"),
        "antique-cream": token("antique-cream"),
        parchment: token("parchment"),
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
