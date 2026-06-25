-- =============================================================================
-- ANMOL Art – Complete Database Migration v2
-- Run this in Supabase SQL Editor (https://app.supabase.com → SQL Editor)
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. EXISTING TABLES (created in v1 migration)
--    Ensure they exist and have correct RLS
-- ─────────────────────────────────────────────────────────────────────────────

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Stock Images
CREATE TABLE IF NOT EXISTS stock_images (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url        text NOT NULL,
  category   text NOT NULL DEFAULT '',
  label      text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. SITE CONFIG (key-value store for all site settings)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_config (
  key        text PRIMARY KEY,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Seed default site config values
INSERT INTO site_config (key, value) VALUES
  ('phone',              '+91 98280 37575'),
  ('whatsapp_number',    '919828037575'),
  ('email',              'anmolart75@gmail.com'),
  ('address',            '109, G.M. City, Near Amrawati Nagar, Sangriya, Salawas Road, Jodhpur (342013), Rajasthan'),
  ('business_hours',     'Mon – Sun, 10:00 AM – 7:00 PM'),
  ('established_year',   '2006'),
  ('instagram_url',      'https://www.instagram.com/anmolart_75'),
  ('facebook_url',       'https://www.facebook.com/share/187onm4iLL/'),
  ('stat_designs',       '5,000+'),
  ('stat_experience',    '20+ Yrs'),
  ('stat_countries',     '20+'),
  ('stat_artisans',      '100+'),
  ('hero_badge',         'Est. 2006 · Jodhpur, Rajasthan'),
  ('hero_description',   'Discover the elegance of authentic Indian handicraft — curated for the modern royal home. Shipped worldwide from the heart of Rajasthan.'),
  ('about_title',        'Preserving a Dying Heritage'),
  ('about_body_1',       'Founded in the heart of Rajasthan, ANMOL Art began as a humble initiative to support local artisans whose skills have been passed down through centuries. We believe that true luxury lies in the imperfection of the handmade.'),
  ('about_body_2',       'Each creation reflects patience, passion, and cultural pride — carefully crafted using traditional techniques that honour India''s rich artistic heritage.'),
  ('about_body_3',       'Through ANMOL Art, we bridge the gap between traditional Indian craftsmanship and modern aesthetics, bringing soulful art into contemporary homes across the world.'),
  ('footer_description', 'Preserving the royal heritage of Jodhpur through timeless handcrafted furniture and artistic masterpieces since 2006.'),
  ('collections_quote',  'Your Imagination, Our Creation'),
  ('collections_quote_desc', 'Can''t find exactly what you''re looking for? Our master artisans specialize in bespoke designs tailored to your specific space and style.')
ON CONFLICT (key) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. HERO SLIDES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS hero_slides (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  subtitle      text NOT NULL,
  tag           text NOT NULL DEFAULT '',
  image_url     text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS hero_slides_order_idx ON hero_slides (display_order, active);

-- Default slides (images from local assets will be uploaded to storage via admin)
INSERT INTO hero_slides (title, subtitle, tag, image_url, display_order, active) VALUES
  ('Timeless Artistry',  'Heritage',   'Rajasthan Handicraft',    '', 0, true),
  ('Royal Furniture',    'Crafted',    'Handmade Wood Furniture',  '', 1, true),
  ('Authentic Wood',     'Tradition',  'Traditional Wood Craft',   '', 2, true),
  ('Divine Decor',       'Sculptures', 'Handcrafted Sculptures',   '', 3, true)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. SERVICES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS services (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  description   text NOT NULL DEFAULT '',
  icon          text NOT NULL DEFAULT 'fa-star',
  category      text NOT NULL DEFAULT 'General',
  display_order integer NOT NULL DEFAULT 0,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS services_order_idx ON services (display_order, active);

INSERT INTO services (title, description, icon, category, display_order, active) VALUES
  ('Wholesale & Export',    'Reliable bulk supply and international handling for boutiques and resellers worldwide with secure packaging.',                                   'fa-ship',             'Global',       0, true),
  ('Hotels & Resorts',      'Customized royal furniture for guest rooms and lobbies that ensure your visitors feel the heritage of Rajasthan.',                              'fa-hotel',            'B2B',          1, true),
  ('Restaurants & Cafes',   'Transform your dining space into an artwork with our authentic handcrafted tables, chairs, and theme-based decor.',                            'fa-utensils',         'B2B',          2, true),
  ('Interior Designers',    'We collaborate with architects to turn unique design concepts into reality with precision and premium materials.',                              'fa-compass-drafting', 'Professional', 3, true)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. FAQs
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS faqs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question      text NOT NULL,
  answer        text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS faqs_order_idx ON faqs (display_order, active);

INSERT INTO faqs (question, answer, display_order, active) VALUES
  ('Are all your products genuinely handmade?',
   'Yes, 100%. We work directly with master artisans in Rajasthan. Every piece is handcrafted using traditional tools, making each creation a unique masterpiece with no two items exactly alike.',
   0, true),
  ('Do you ship internationally?',
   'Absolutely. We have a robust export network and ship to the USA, UK, Europe, and the Middle East. We use specialized wooden crate packaging to ensure safety during transit.',
   1, true),
  ('How do I care for antique wood and brass?',
   'For wood, use a dry micro-fiber cloth. For brass, a mix of lemon and baking soda or professional polish works best. Avoid direct sunlight to preserve the natural luster.',
   2, true),
  ('Can I request a custom architectural design?',
   'Yes. We collaborate with architects and interior designers for bespoke projects. You can share your sketches or CAD designs, and our team will bring them to life.',
   3, true)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. CONTACT SUBMISSIONS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contact_submissions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL DEFAULT '',
  phone      text NOT NULL DEFAULT '',
  message    text NOT NULL,
  read       boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_submissions_read_idx ON contact_submissions (read, created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE categories           ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_images         ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config          ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides          ENABLE ROW LEVEL SECURITY;
ALTER TABLE services             ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions  ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (idempotent re-run)
DROP POLICY IF EXISTS "Public read categories"           ON categories;
DROP POLICY IF EXISTS "Auth write categories"            ON categories;
DROP POLICY IF EXISTS "Public read stock_images"         ON stock_images;
DROP POLICY IF EXISTS "Auth write stock_images"          ON stock_images;
DROP POLICY IF EXISTS "Public read site_config"          ON site_config;
DROP POLICY IF EXISTS "Auth write site_config"           ON site_config;
DROP POLICY IF EXISTS "Public read hero_slides"          ON hero_slides;
DROP POLICY IF EXISTS "Auth write hero_slides"           ON hero_slides;
DROP POLICY IF EXISTS "Public read services"             ON services;
DROP POLICY IF EXISTS "Auth write services"              ON services;
DROP POLICY IF EXISTS "Public read faqs"                 ON faqs;
DROP POLICY IF EXISTS "Auth write faqs"                  ON faqs;
DROP POLICY IF EXISTS "Public insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Auth read contact_submissions"    ON contact_submissions;
DROP POLICY IF EXISTS "Auth write contact_submissions"   ON contact_submissions;

-- CATEGORIES: public read, auth write
CREATE POLICY "Public read categories"
  ON categories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Auth write categories"
  ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- STOCK_IMAGES: public read, auth write
CREATE POLICY "Public read stock_images"
  ON stock_images FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Auth write stock_images"
  ON stock_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SITE_CONFIG: public read, auth write
CREATE POLICY "Public read site_config"
  ON site_config FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Auth write site_config"
  ON site_config FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- HERO_SLIDES: public read active slides, auth write all
CREATE POLICY "Public read hero_slides"
  ON hero_slides FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Auth write hero_slides"
  ON hero_slides FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SERVICES: public read active, auth write all
CREATE POLICY "Public read services"
  ON services FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Auth write services"
  ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- FAQS: public read active, auth write all
CREATE POLICY "Public read faqs"
  ON faqs FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Auth write faqs"
  ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- CONTACT_SUBMISSIONS: public insert only, auth read+manage
CREATE POLICY "Public insert contact_submissions"
  ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Auth read contact_submissions"
  ON contact_submissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Auth write contact_submissions"
  ON contact_submissions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Auth delete contact_submissions"
  ON contact_submissions FOR DELETE TO authenticated USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. STORAGE BUCKET (run separately if bucket doesn't exist)
-- ─────────────────────────────────────────────────────────────────────────────
-- In Supabase Dashboard → Storage → New Bucket:
--   Name: stock-images
--   Public: YES
--   Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
--   Max file size: 10MB
--
-- Or via SQL:
-- INSERT INTO storage.buckets (id, name, public)
--   VALUES ('stock-images', 'stock-images', true)
-- ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. STORAGE POLICIES (for stock-images bucket)
-- ─────────────────────────────────────────────────────────────────────────────

-- Public read (anyone can view images)
DROP POLICY IF EXISTS "Public read stock images storage" ON storage.objects;
CREATE POLICY "Public read stock images storage"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'stock-images');

-- Only authenticated users can upload/delete images
DROP POLICY IF EXISTS "Auth upload stock images" ON storage.objects;
CREATE POLICY "Auth upload stock images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'stock-images');

DROP POLICY IF EXISTS "Auth delete stock images" ON storage.objects;
CREATE POLICY "Auth delete stock images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'stock-images');

DROP POLICY IF EXISTS "Auth update stock images" ON storage.objects;
CREATE POLICY "Auth update stock images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'stock-images');
