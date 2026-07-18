/**
 * "Jharokha" design system.
 *
 * Colours are defined once as raw RGB channels in src/index.css (:root) and
 * referenced here, so a Tailwind class and a plain CSS `color:` can never drift
 * apart. The `<alpha-value>` placeholder keeps opacity modifiers working
 * (e.g. `text-ink/50`, `bg-indigo/15`).
 */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // ── Jharokha palette ──────────────────────────────────────────────
        sandstone: token("sandstone"),
        "sandstone-deep": token("sandstone-deep"),
        limewash: token("limewash"),
        indigo: token("indigo"),
        "indigo-deep": token("indigo-deep"),
        brass: token("brass"),
        "brass-light": token("brass-light"),
        ink: token("ink"),

        // ── Brand anchor + legacy aliases (admin panel still uses these) ──
        "royal-maroon": token("royal-maroon"),
        "royal-gold": token("brass"),
        "royal-gold-dark": token("royal-gold-dark"),
        ivory: token("limewash"),
        "earthy-brown": token("ink"),
        "antique-cream": token("antique-cream"),
        parchment: token("sandstone"),
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        script: ["Fraunces", "Georgia", "serif"],
      },
      /**
       * ── Fluid type scale ──────────────────────────────────────────────────
       * One scale for the whole site. Every heading MUST use a token from here
       * (never `text-5xl md:text-6xl`), otherwise sections drift apart at
       * different viewports — which is exactly the bug this replaces: FAQ was
       * rendering 48px at both 375px and 1920px while Collections rendered 36px
       * at 375px, inverting the hierarchy on mobile.
       *
       * Line heights loosen as the size drops, because tight display leading
       * that reads as elegant at 130px collides with descenders at 40px.
       */
      fontSize: {
        // Hero only
        display: [
          "clamp(2.75rem, 6.6vw, 7rem)",
          { lineHeight: "1.02", letterSpacing: "-0.025em" },
        ],
        // Section headings (h2)
        "heading-1": [
          "clamp(2.125rem, 4.6vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        // Sub-section headings (h3)
        "heading-2": [
          "clamp(1.5rem, 2.4vw, 2.25rem)",
          { lineHeight: "1.18", letterSpacing: "-0.01em" },
        ],
        // Card / item titles
        "heading-3": [
          "clamp(1.125rem, 1.5vw, 1.5rem)",
          { lineHeight: "1.3", letterSpacing: "-0.005em" },
        ],
        // Lead paragraph
        lead: ["clamp(1.0625rem, 1.15vw, 1.25rem)", { lineHeight: "1.65" }],
        // Body copy
        "body-base": ["clamp(0.9375rem, 1vw, 1.0625rem)", { lineHeight: "1.7" }],
        // Museum caption / eyebrow / nav — scales instead of sitting at 11px
        // from 320px all the way to 1920px.
        caption: [
          "clamp(0.6875rem, 0.62vw, 0.8125rem)",
          { lineHeight: "1.4", letterSpacing: "0.2em" },
        ],
      },
      transitionTimingFunction: {
        craft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        // Object resting on a plinth, not a floating SaaS card
        plinth: "0 24px 48px -24px rgb(var(--ink) / 0.45)",
        "plinth-lift": "0 44px 80px -32px rgb(var(--ink) / 0.55)",
      },
    },
  },
  plugins: [],
};
