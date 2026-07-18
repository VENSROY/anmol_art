import { supabase } from "../lib/supabase";
import type { StockImage } from "../types/database";
import { buildObjectPath, uploadImage, removeImageByUrl } from "./storage.service";

export const STOCK_PAGE_SIZE = 48;

export interface StockImagePage {
  images: StockImage[];
  total: number;
  hasMore: boolean;
}

/** Fetch all stock images, newest first (used by the admin gallery). */
export async function listAllStockImages(): Promise<StockImage[]> {
  const { data, error } = await supabase
    .from("stock_images")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** Paginated, optionally category-filtered fetch (used by the public gallery). */
export async function listStockImagesPage(
  page: number,
  filter = "All",
  pageSize = STOCK_PAGE_SIZE,
): Promise<StockImagePage> {
  let query = supabase
    .from("stock_images")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (filter !== "All") query = query.eq("category", filter);

  const { data, count, error } = await query;
  if (error) throw error;

  const total = count ?? 0;
  return {
    images: data ?? [],
    total,
    hasMore: total > (page + 1) * pageSize,
  };
}

export interface CategoryStat {
  /** Number of images indexed under this category. */
  count: number;
  /** URL of the most recently added image, used as the collection thumbnail. */
  thumbnail?: string;
}

/**
 * Per-category count *and* a representative thumbnail, in a single round-trip.
 *
 * The `categories` table has no image column, so collection cards previously
 * fell back to four static bundled photos. Deriving the thumbnail from the
 * newest piece actually in that category keeps the cards honest and current.
 */
export async function getCategoryStats(): Promise<Record<string, CategoryStat>> {
  const { data, error } = await supabase
    .from("stock_images")
    .select("category, url")
    .order("created_at", { ascending: false });
  if (error) throw error;

  const stats: Record<string, CategoryStat> = {};
  (data ?? []).forEach((row: { category: string; url: string }) => {
    const stat = stats[row.category] ?? { count: 0 };
    stat.count += 1;
    // Rows arrive newest-first, so the first URL seen is the freshest piece.
    stat.thumbnail ??= row.url;
    stats[row.category] = stat;
  });
  return stats;
}

/** Upload an image file then index it in the stock_images table. */
export async function addStockImage(input: {
  file: File;
  category: string;
  label: string;
}): Promise<void> {
  const path = buildObjectPath(input.category, input.file.name);
  const url = await uploadImage(path, input.file);

  const { error } = await supabase.from("stock_images").insert({
    url,
    category: input.category,
    label: input.label,
  });
  if (error) throw error;
}

export async function updateStockImage(
  id: string,
  patch: { label: string; category: string },
): Promise<void> {
  const { error } = await supabase.from("stock_images").update(patch).eq("id", id);
  if (error) throw error;
}

/** Delete an image: remove the storage object first, then the DB row. */
export async function deleteStockImage(image: StockImage): Promise<void> {
  await removeImageByUrl(image.url);
  const { error } = await supabase.from("stock_images").delete().eq("id", image.id);
  if (error) throw error;
}
