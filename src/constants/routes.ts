// ─────────────────────────────────────────────────────────────────────────────
// Centralised route paths. Import these instead of hardcoding strings so routing
// stays consistent across <Route>, navigate(), and <Link> usages.
// ─────────────────────────────────────────────────────────────────────────────

export const ROUTES = {
  home: "/",
  collections: "/collections",
  collectionByCategory: (category: string) => `/collections/${category}`,
  stock: "/stock",
  admin: "/admin",
} as const;
