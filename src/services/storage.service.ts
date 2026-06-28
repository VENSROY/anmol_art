import { supabase } from "../lib/supabase";

const BUCKET = "stock-images";

/** Generate a collision-resistant object path inside a folder. */
export function buildObjectPath(folder: string, fileName: string): string {
  const ext = fileName.split(".").pop() ?? "jpg";
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${folder}/${unique}.${ext}`;
}

/** Upload a file to the stock-images bucket and return its public URL. */
export async function uploadImage(
  path: string,
  file: File,
  opts: { upsert?: boolean } = {},
): Promise<string> {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: opts.upsert ?? false });
  if (error) throw error;
  return getPublicUrl(path);
}

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Remove a stored object given its public URL (no-op if path can't be parsed). */
export async function removeImageByUrl(url: string): Promise<void> {
  const parts = url.split(`/${BUCKET}/`);
  if (!parts[1]) return;
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([decodeURIComponent(parts[1])]);
  if (error) throw error;
}
