-- =============================================================================
-- 0002 · RBAC, profiles, audit columns
-- Adds role-based access control without requiring a Supabase Auth hook:
-- roles live on public.profiles and are read by a SECURITY DEFINER function that
-- RLS policies call. Also adds updated_at audit columns + triggers.
-- =============================================================================

-- ── Profiles (one row per auth user, holds the role) ─────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email      text,
  full_name  text NOT NULL DEFAULT '',
  role       text NOT NULL DEFAULT 'viewer'
             CHECK (role IN ('super_admin', 'admin', 'content_manager', 'viewer')),
  disabled   boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ── Role helpers (SECURITY DEFINER bypasses RLS → no recursion) ───────────────
CREATE OR REPLACE FUNCTION public.auth_role()
  RETURNS text
  LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT role FROM public.profiles
  WHERE id = auth.uid() AND NOT disabled;
$$;

-- Staff who may edit site content (everyone except viewer / anon).
CREATE OR REPLACE FUNCTION public.is_content_editor()
  RETURNS boolean
  LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT coalesce(public.auth_role() IN ('super_admin', 'admin', 'content_manager'), false);
$$;

-- ── Auto-create a profile when a user signs up ───────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger
  LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'viewer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for users that already exist (e.g. the initial admin).
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, coalesce(raw_user_meta_data->>'full_name', ''), 'viewer'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ── Profiles RLS ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Read own profile" ON public.profiles;
CREATE POLICY "Read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid());

DROP POLICY IF EXISTS "Admins read all profiles" ON public.profiles;
CREATE POLICY "Admins read all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.auth_role() IN ('super_admin', 'admin'));

-- Only super admins create/update/delete profiles (user & role management).
DROP POLICY IF EXISTS "Super admin manage profiles" ON public.profiles;
CREATE POLICY "Super admin manage profiles" ON public.profiles
  FOR ALL TO authenticated
  USING (public.auth_role() = 'super_admin')
  WITH CHECK (public.auth_role() = 'super_admin');

-- ── Tighten content write policies from "any authenticated" to "staff" ───────
DROP POLICY IF EXISTS "Auth write categories"   ON categories;
DROP POLICY IF EXISTS "Staff write categories"  ON categories;
CREATE POLICY "Staff write categories"  ON categories
  FOR ALL TO authenticated USING (public.is_content_editor()) WITH CHECK (public.is_content_editor());

DROP POLICY IF EXISTS "Auth write stock_images"  ON stock_images;
DROP POLICY IF EXISTS "Staff write stock_images" ON stock_images;
CREATE POLICY "Staff write stock_images" ON stock_images
  FOR ALL TO authenticated USING (public.is_content_editor()) WITH CHECK (public.is_content_editor());

DROP POLICY IF EXISTS "Auth write site_config"  ON site_config;
DROP POLICY IF EXISTS "Staff write site_config" ON site_config;
CREATE POLICY "Staff write site_config" ON site_config
  FOR ALL TO authenticated USING (public.is_content_editor()) WITH CHECK (public.is_content_editor());

DROP POLICY IF EXISTS "Auth write hero_slides"  ON hero_slides;
DROP POLICY IF EXISTS "Staff write hero_slides" ON hero_slides;
CREATE POLICY "Staff write hero_slides" ON hero_slides
  FOR ALL TO authenticated USING (public.is_content_editor()) WITH CHECK (public.is_content_editor());

DROP POLICY IF EXISTS "Auth write services"  ON services;
DROP POLICY IF EXISTS "Staff write services" ON services;
CREATE POLICY "Staff write services" ON services
  FOR ALL TO authenticated USING (public.is_content_editor()) WITH CHECK (public.is_content_editor());

DROP POLICY IF EXISTS "Auth write faqs"  ON faqs;
DROP POLICY IF EXISTS "Staff write faqs" ON faqs;
CREATE POLICY "Staff write faqs" ON faqs
  FOR ALL TO authenticated USING (public.is_content_editor()) WITH CHECK (public.is_content_editor());

-- Contact submissions: public insert stays; reads/manage limited to staff.
DROP POLICY IF EXISTS "Auth read contact_submissions"   ON contact_submissions;
DROP POLICY IF EXISTS "Staff read contact_submissions"  ON contact_submissions;
CREATE POLICY "Staff read contact_submissions" ON contact_submissions
  FOR SELECT TO authenticated USING (public.is_content_editor());

DROP POLICY IF EXISTS "Auth update contact_submissions"  ON contact_submissions;
DROP POLICY IF EXISTS "Staff update contact_submissions" ON contact_submissions;
CREATE POLICY "Staff update contact_submissions" ON contact_submissions
  FOR UPDATE TO authenticated USING (public.is_content_editor()) WITH CHECK (public.is_content_editor());

DROP POLICY IF EXISTS "Auth delete contact_submissions"  ON contact_submissions;
DROP POLICY IF EXISTS "Staff delete contact_submissions" ON contact_submissions;
CREATE POLICY "Staff delete contact_submissions" ON contact_submissions
  FOR DELETE TO authenticated USING (public.is_content_editor());

-- ── Tighten storage writes to staff ──────────────────────────────────────────
DROP POLICY IF EXISTS "Auth upload stock images"  ON storage.objects;
DROP POLICY IF EXISTS "Staff upload stock images" ON storage.objects;
CREATE POLICY "Staff upload stock images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'stock-images' AND public.is_content_editor());

DROP POLICY IF EXISTS "Auth update stock images"  ON storage.objects;
DROP POLICY IF EXISTS "Staff update stock images" ON storage.objects;
CREATE POLICY "Staff update stock images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'stock-images' AND public.is_content_editor());

DROP POLICY IF EXISTS "Auth delete stock images"  ON storage.objects;
DROP POLICY IF EXISTS "Staff delete stock images" ON storage.objects;
CREATE POLICY "Staff delete stock images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'stock-images' AND public.is_content_editor());

-- ── Audit columns + updated_at triggers ──────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
  RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'categories', 'stock_images', 'hero_slides', 'services', 'faqs',
    'contact_submissions', 'site_config', 'profiles'
  ] LOOP
    EXECUTE format(
      'ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now()', t
    );
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON public.%I', t);
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I
       FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t
    );
  END LOOP;
END $$;
