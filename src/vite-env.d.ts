/// <reference types="vite/client" />

// ── Static asset module declarations ─────────────────────────────────────────
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

// ── Vite environment variables ─────────────────────────────────────────────────
interface ImportMetaEnv {
  /** Supabase project URL */
  readonly VITE_SUPABASE_URL: string;
  /** Supabase anon public key */
  readonly VITE_SUPABASE_ANON_KEY: string;
  /**
   * Admin panel password.
   * ⚠️ SECURITY: This is bundled into client-side JS. Use Supabase Auth for production.
   */
  readonly VITE_ADMIN_PASSWORD: string;
  /** Google Analytics 4 Measurement ID (optional) */
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}