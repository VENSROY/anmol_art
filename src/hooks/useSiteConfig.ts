import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { SiteConfig } from "../components/admin/types";

// Hardcoded fallbacks so the site works even without DB config
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

// Module-level cache so all components share one fetch
let cached: SiteConfig | null = null;
let fetchPromise: Promise<SiteConfig> | null = null;

async function loadConfig(): Promise<SiteConfig> {
  if (cached) return cached;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    if (!isSupabaseConfigured) return { ...DEFAULTS };
    const { data, error } = await supabase.from("site_config").select("key, value");
    if (error || !data) return { ...DEFAULTS };
    const map: SiteConfig = { ...DEFAULTS };
    data.forEach((row: { key: string; value: string }) => {
      if (row.value) map[row.key] = row.value;
    });
    cached = map;
    return map;
  })();

  return fetchPromise;
}

// Invalidate cache when admin updates settings
export function invalidateSiteConfig() {
  cached = null;
  fetchPromise = null;
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULTS);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    let cancelled = false;
    loadConfig().then((c) => {
      if (!cancelled) {
        setConfig(c);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // Helper to get a value with fallback
  const get = (key: string, fallback?: string): string =>
    config[key] ?? fallback ?? DEFAULTS[key] ?? "";

  return { config, get, loading };
}
