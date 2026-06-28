import { supabase } from "../lib/supabase";
import type { Profile } from "../types/database";

/** Fetch a single profile by user id (RLS: own profile, or any if admin). */
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Admin: list all profiles (RLS restricts to super_admin / admin). */
export async function listProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Super admin: change a user's role. */
export async function updateProfileRole(
  id: string,
  role: Profile["role"],
): Promise<void> {
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) throw error;
}

/** Super admin: enable/disable an account (disabled users lose all access). */
export async function setProfileDisabled(id: string, disabled: boolean): Promise<void> {
  const { error } = await supabase.from("profiles").update({ disabled }).eq("id", id);
  if (error) throw error;
}
