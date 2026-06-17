// ── Contact form type ─────────────────────────────────────────────────────────
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ── Analytics event type ──────────────────────────────────────────────────────
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// ── The types below are used by admin sub-system ──────────────────────────────
// StockImage and Category live in src/components/admin/types.ts
// Product, GalleryImage, BlogPost, Review are archived with their components