import { supabase } from "../lib/supabase";
import type { SiteConfig } from "../types/database";

/** Fetch the full key-value site config as a map. */
export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase.from("site_config").select("key, value");
  if (error) throw error;

  const map: SiteConfig = {};
  (data ?? []).forEach((row: { key: string; value: string }) => {
    map[row.key] = row.value;
  });
  return map;
}

/** Upsert a batch of config keys. */
export async function saveSiteConfig(entries: Record<string, string>): Promise<void> {
  const rows = Object.entries(entries).map(([key, value]) => ({
    key,
    value: value ?? "",
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase
    .from("site_config")
    .upsert(rows, { onConflict: "key" });
  if (error) throw error;
}
