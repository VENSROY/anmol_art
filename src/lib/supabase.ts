import { createClient } from "@supabase/supabase-js";

// Environment variables are typed in src/vite-env.d.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Guard against missing env vars (e.g., .env not set up) without throwing fatal crash
if (!isSupabaseConfigured) {
  console.warn(
    "[ANMOL Art] Warning: Missing Supabase config. Copy .env.example to .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);