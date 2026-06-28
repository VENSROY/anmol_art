import { QueryClient } from "@tanstack/react-query";

/**
 * Shared TanStack Query client.
 *
 * Public content (config, slides, services, FAQs, gallery) changes rarely, so we
 * use a generous staleTime to avoid redundant network round-trips and keep the
 * site snappy. Admin mutations invalidate the relevant keys explicitly.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
