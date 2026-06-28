import { supabase } from "../lib/supabase";
import type { FAQ } from "../types/database";

export type FAQInput = Omit<FAQ, "id" | "created_at">;

/** All FAQs, ordered for display (admin view — includes inactive). */
export async function listFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Only active FAQs — used by the public FAQ section. */
export async function listActiveFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createFaq(input: FAQInput): Promise<void> {
  const { error } = await supabase.from("faqs").insert(input);
  if (error) throw error;
}

export async function updateFaq(
  id: string,
  patch: Partial<FAQInput>,
): Promise<void> {
  const { error } = await supabase.from("faqs").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteFaq(id: string): Promise<void> {
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
}
