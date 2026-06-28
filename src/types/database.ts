// ─────────────────────────────────────────────────────────────────────────────
// Canonical database row types — single source of truth for every Supabase table.
//
// These mirror the columns defined in `supabase/migrations/`. UI-only types
// (e.g. ToastState) live alongside their components, not here.
// ─────────────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface StockImage {
  id: string;
  url: string;
  category: string;
  label: string;
  created_at: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image_url: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  created_at: string;
}

/** A user account profile holding the RBAC role. */
export interface Profile {
  id: string;
  email: string | null;
  full_name: string;
  role: "super_admin" | "admin" | "content_manager" | "viewer";
  disabled: boolean;
  created_at: string;
  updated_at: string;
}

/** Key-value store backing all editable site-wide settings. */
export type SiteConfig = Record<string, string>;

/** Payload accepted when a visitor submits the public contact form. */
export interface ContactSubmissionInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}
