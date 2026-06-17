import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
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
        },
      },
    },
  },
});
