// ─────────────────────────────────────────────────────────────────────────────
// Centralised TanStack Query key factory.
//
// Every cache key in the app is defined here so invalidation is consistent and
// typo-proof. Use the factory functions rather than inline arrays.
// ─────────────────────────────────────────────────────────────────────────────

export const queryKeys = {
  siteConfig: ["site-config"] as const,

  categories: ["categories"] as const,

  stockImages: {
    all: ["stock-images"] as const,
    list: (filter: string, page: number) =>
      ["stock-images", { filter, page }] as const,
  },

  heroSlides: ["hero-slides"] as const,
  services: ["services"] as const,
  faqs: ["faqs"] as const,

  contactSubmissions: {
    all: ["contact-submissions"] as const,
    unreadCount: ["contact-submissions", "unread-count"] as const,
  },
} as const;
