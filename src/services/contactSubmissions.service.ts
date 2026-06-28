import { supabase } from "../lib/supabase";
import type { ContactSubmission, ContactSubmissionInput } from "../types/database";

/** Public: a visitor submits the contact form. */
export async function createContactSubmission(
  input: ContactSubmissionInput,
): Promise<void> {
  const { error } = await supabase.from("contact_submissions").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    message: input.message.trim(),
  });
  if (error) throw error;
}

/** Admin: all submissions, newest first. */
export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** Admin: number of unread submissions (for the dashboard badge). */
export async function countUnreadSubmissions(): Promise<number> {
  const { count, error } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("read", false);
  if (error) throw error;
  return count ?? 0;
}

export async function setSubmissionRead(id: string, read: boolean): Promise<void> {
  const { error } = await supabase
    .from("contact_submissions")
    .update({ read })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteSubmission(id: string): Promise<void> {
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) throw error;
}
