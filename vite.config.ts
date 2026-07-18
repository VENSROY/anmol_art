import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    // Pre-bundle heavy deps at server start instead of on-demand crawl discovery.
    // Avoids white screens when the dev server restarts mid-optimization
    // (e.g. cloud-sync touching files) before the deps cache is written.
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react-router-dom",
      "framer-motion",
      "@supabase/supabase-js",
      "@tanstack/react-query",
      "react-icons/fa",
      "three",
      "@react-three/fiber",
    ],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and routing into their own chunk
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Supabase client into its own chunk
          supabase: ["@supabase/supabase-js"],
          // Motion primitives used across the site
          "motion-vendor": ["framer-motion"],
          // NOTE: three/@react-three/fiber are deliberately NOT listed here.
          // They are only reachable via the lazy HeroOrnament3D import, so Rollup
          // already isolates them; forcing them into a manual chunk pulls shared
          // helpers (e.g. scheduler) into it and makes the entry preload ~800kB.
        },
      },
    },
  },
});
