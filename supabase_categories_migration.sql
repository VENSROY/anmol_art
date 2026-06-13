-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/kfqrfspitvcpemdvvryx/sql

-- 1. Create the categories table
CREATE TABLE IF NOT EXISTS categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 3. Allow public READ (so the public gallery can load categories)
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  USING (true);

-- 4. Allow authenticated users to INSERT / DELETE (admin operations)
CREATE POLICY "Admin can insert categories"
  ON categories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can delete categories"
  ON categories FOR DELETE
  USING (true);

-- 5. Seed with your existing categories (optional – matches your current Stock data)
INSERT INTO categories (name) VALUES
  ('Wood Craft'),
  ('Decor & Sculptures'),
  ('Hand Painted Wood'),
  ('Royal Wood Art')
ON CONFLICT (name) DO NOTHING;
