// ── Shared admin types ────────────────────────────────────────────────────────
// Database row types now live in src/types/database.ts (single source of truth).
// Re-exported here for backwards compatibility with existing admin imports.

export type {
  StockImage,
  Category,
  HeroSlide,
  Service,
  FAQ,
  ContactSubmission,
  SiteConfig,
  ContactSubmissionInput,
} from "../../types/database";

// UI-only state for the toast notification system.
export type ToastState = { message: string; type: "success" | "error" | "info" };
