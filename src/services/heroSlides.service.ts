import { supabase } from "../lib/supabase";
import type { HeroSlide } from "../types/database";

export type HeroSlideInput = Omit<HeroSlide, "id" | "created_at">;

/** All slides, ordered for display (admin view — includes inactive). */
export async function listHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Only active slides — used by the public homepage hero carousel. */
export async function listActiveHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createHeroSlide(input: HeroSlideInput): Promise<void> {
  const { error } = await supabase.from("hero_slides").insert(input);
  if (error) throw error;
}

export async function updateHeroSlide(
  id: string,
  patch: Partial<HeroSlideInput>,
): Promise<void> {
  const { error } = await supabase.from("hero_slides").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteHeroSlide(id: string): Promise<void> {
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw error;
}
