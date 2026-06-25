// ── Shared admin types ────────────────────────────────────────────────────────

export interface StockImage {
  id: string;
  url: string;
  category: string;
  label: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
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

export type SiteConfig = Record<string, string>;

export type ToastState = { message: string; type: "success" | "error" | "info" };
