import { supabase } from "../lib/supabase";
import type { Category } from "../types/database";

/** Fetch all categories, oldest first (stable display order). */
export async function listCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createCategory(name: string): Promise<void> {
  const { error } = await supabase.from("categories").insert({ name });
  if (error) throw error;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

/** Count how many stock images reference a given category name. */
export async function countImagesInCategory(categoryName: string): Promise<number> {
  const { count, error } = await supabase
    .from("stock_images")
    .select("id", { count: "exact", head: true })
    .eq("category", categoryName);
  if (error) throw error;
  return count ?? 0;
}
