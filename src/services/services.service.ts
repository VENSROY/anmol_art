import { supabase } from "../lib/supabase";
import type { Service } from "../types/database";

export type ServiceInput = Omit<Service, "id" | "created_at">;

/** All services, ordered for display (admin view — includes inactive). */
export async function listServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Only active services — used by the public Services section. */
export async function listActiveServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createService(input: ServiceInput): Promise<void> {
  const { error } = await supabase.from("services").insert(input);
  if (error) throw error;
}

export async function updateService(
  id: string,
  patch: Partial<ServiceInput>,
): Promise<void> {
  const { error } = await supabase.from("services").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
}
