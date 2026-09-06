-- ==============================================================================
-- STORAGE BUCKETS & RLS POLICIES FIX FOR IICE WEBSITE
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor -> New query -> Run)
-- ==============================================================================

-- 1. Create or update Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('conference-abstracts', 'conference-abstracts', true, 52428800, NULL),
  ('staff-avatars', 'staff-avatars', true, 10485760, NULL),
  ('staff-documents', 'staff-documents', true, 52428800, NULL),
  ('news-media', 'news-media', true, 52428800, NULL)
ON CONFLICT (id) DO UPDATE 
SET public = true,
    file_size_limit = EXCLUDED.file_size_limit;

-- 2. Conference Abstracts Policies (Allows public participants to upload and download)
DROP POLICY IF EXISTS "Public Upload Conference Abstracts" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Access for Conference Abstracts" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload conference abstracts" ON storage.objects;
CREATE POLICY "Public Upload Conference Abstracts" ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'conference-abstracts');

DROP POLICY IF EXISTS "Public Read Conference Abstracts" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Access for Conference Abstracts" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read conference abstracts" ON storage.objects;
CREATE POLICY "Public Read Conference Abstracts" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'conference-abstracts');

DROP POLICY IF EXISTS "Admins can update conference abstracts" ON storage.objects;
CREATE POLICY "Admins can update conference abstracts" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'conference-abstracts');

DROP POLICY IF EXISTS "Admins can delete conference abstracts" ON storage.objects;
CREATE POLICY "Admins can delete conference abstracts" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'conference-abstracts');

-- 3. Staff and News Media Storage Policies
DROP POLICY IF EXISTS "Public Read Access for Staff and News" ON storage.objects;
CREATE POLICY "Public Read Access for Staff and News" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id IN ('staff-avatars', 'staff-documents', 'news-media'));

DROP POLICY IF EXISTS "Authenticated Upload for Staff and News" ON storage.objects;
CREATE POLICY "Authenticated Upload for Staff and News" ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id IN ('staff-avatars', 'staff-documents', 'news-media'))
  WITH CHECK (bucket_id IN ('staff-avatars', 'staff-documents', 'news-media'));
