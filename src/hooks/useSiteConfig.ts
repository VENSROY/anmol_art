import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured } from "../lib/supabase";
import { getSiteConfig } from "../services/siteConfig.service";
import { queryClient } from "../api/queryClient";
import { queryKeys } from "../constants/queryKeys";
import type { SiteConfig } from "../types/database";

// Hardcoded fallbacks so the site renders correctly even before the DB is
// configured or while the first fetch is in flight. These mirror the seed values
// in the migration and the real business information — never blank.
const DEFAULTS: SiteConfig = {
  phone:              "+91 98280 37575",
  whatsapp_number:    "919828037575",
  email:              "anmolart75@gmail.com",
  address:            "109, G.M. City, Near Amrawati Nagar, Sangriya, Salawas Road, Jodhpur (342013), Rajasthan",
  business_hours:     "Mon – Sun, 10:00 AM – 7:00 PM",
  established_year:   "2006",
  instagram_url:      "https://www.instagram.com/anmolart_75",
  facebook_url:       "https://www.facebook.com/share/187onm4iLL/",
  stat_designs:       "5,000+",
  stat_experience:    "20+ Yrs",
  stat_countries:     "20+",
  stat_artisans:      "100+",
  hero_badge:         "Est. 2006 · Jodhpur, Rajasthan",
  hero_description:   "Discover the elegance of authentic Indian handicraft — curated for the modern royal home. Shipped worldwide from the heart of Rajasthan.",
  about_title:        "Preserving a Dying Heritage",
  about_body_1:       "Founded in the heart of Rajasthan, ANMOL Art began as a humble initiative to support local artisans whose skills have been passed down through centuries. We believe that true luxury lies in the imperfection of the handmade.",
  about_body_2:       "Each creation reflects patience, passion, and cultural pride — carefully crafted using traditional techniques that honour India's rich artistic heritage.",
  about_body_3:       "Through ANMOL Art, we bridge the gap between traditional Indian craftsmanship and modern aesthetics, bringing soulful art into contemporary homes across the world.",
  footer_description: "Preserving the royal heritage of Jodhpur through timeless handcrafted furniture and artistic masterpieces since 2006.",
  collections_quote:  "Your Imagination, Our Creation",
  collections_quote_desc: "Can't find exactly what you're looking for? Our master artisans specialize in bespoke designs tailored to your specific space and style.",
};

/** Merge DB values over defaults so a missing key always falls back gracefully. */
function mergeWithDefaults(data: SiteConfig): SiteConfig {
  const map: SiteConfig = { ...DEFAULTS };
  for (const [key, value] of Object.entries(data)) {
    if (value) map[key] = value;
  }
  return map;
}

/** Call after an admin saves settings to refresh every consumer. */
export function invalidateSiteConfig() {
  queryClient.invalidateQueries({ queryKey: queryKeys.siteConfig });
}

export function useSiteConfig() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.siteConfig,
    queryFn: getSiteConfig,
    enabled: isSupabaseConfigured,
    select: mergeWithDefaults,
  });

  const config = data ?? DEFAULTS;

  const get = (key: string, fallback?: string): string =>
    config[key] ?? fallback ?? DEFAULTS[key] ?? "";

  return { config, get, loading: isLoading };
}
