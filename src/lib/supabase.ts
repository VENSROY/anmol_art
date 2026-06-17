import { createClient } from "@supabase/supabase-js";

// Environment variables are typed in src/vite-env.d.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Guard against missing env vars (e.g., .env not set up)
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "[ANMOL Art] Missing Supabase config.\n" +
    "Copy .env.example to .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);