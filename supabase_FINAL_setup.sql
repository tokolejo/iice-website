-- ================================================================================
-- IICE WEBSITE — სრული და საბოლოო SUPABASE კონფიგურაციის სკრიპტი
-- გასაშვები: Supabase Dashboard → SQL Editor → New Query → RUN
-- ================================================================================
-- შეიცავს:
--   1. Helper SECURITY DEFINER ფუნქციები (RLS infinite-recursion-ის გარეშე)
--   2. user_profiles RLS
--   3. news + news_categories RLS (კატეგორიების წაშლა-დამატება)
--   4. conference_registrations_2026 RLS (public insert + admin manage)
--   5. departments, staff_members, audit_logs RLS
--   6. Storage Buckets (conference-abstracts, staff-avatars, staff-documents, news-media)
--   7. Storage Object Policies
--   8. Auth Trigger (ახალი user-ის ავტომატური პროფილი)
-- ================================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- 1. HELPER FUNCTIONS  (SECURITY DEFINER — bypass RLS recursion)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.check_user_is_super_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_active = true
      AND ('super_admin' = ANY(roles) OR role = 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.check_user_is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_active = true
      AND ('super_admin' = ANY(roles) OR 'admin' = ANY(roles) OR role IN ('admin','super_admin'))
  );
$$;

CREATE OR REPLACE FUNCTION public.check_user_is_editor()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_active = true
      AND (
        'super_admin' = ANY(roles) OR 'admin' = ANY(roles) OR 'editor' = ANY(roles)
        OR role IN ('admin','super_admin','editor')
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.check_user_is_conference_manager()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_active = true
      AND (
        'super_admin' = ANY(roles) OR 'admin' = ANY(roles) OR 'conference_manager' = ANY(roles)
        OR role IN ('admin','super_admin')
      )
  );
$$;

GRANT EXECUTE ON FUNCTION public.check_user_is_super_admin()        TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_admin()              TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_editor()             TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_conference_manager() TO authenticated, anon;


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. user_profiles — RLS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile or admins view all" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view user profiles"                 ON public.user_profiles;
DROP POLICY IF EXISTS "Super admins can update user profiles"         ON public.user_profiles;
DROP POLICY IF EXISTS "Authenticated users can view profiles"         ON public.user_profiles;
DROP POLICY IF EXISTS "Service role can insert profiles"              ON public.user_profiles;

CREATE POLICY "Authenticated users can view profiles" ON public.user_profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Super admins can update user profiles" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING (public.check_user_is_super_admin())
  WITH CHECK (public.check_user_is_super_admin());

CREATE POLICY "Service role can insert profiles" ON public.user_profiles
  FOR INSERT TO authenticated WITH CHECK (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. news — RLS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "News items are viewable by everyone"  ON public.news;
DROP POLICY IF EXISTS "Admins and editors can manage news"   ON public.news;
DROP POLICY IF EXISTS "Admins can manage news"               ON public.news;

CREATE POLICY "News items are viewable by everyone" ON public.news
  FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage news" ON public.news
  FOR ALL TO authenticated
  USING (public.check_user_is_editor())
  WITH CHECK (public.check_user_is_editor());


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. news_categories — RLS  (Super Admin / Admin / Editor — სრული CRUD)
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories are viewable by everyone"           ON public.news_categories;
DROP POLICY IF EXISTS "Admins and editors can manage news categories" ON public.news_categories;

CREATE POLICY "Categories are viewable by everyone" ON public.news_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage news categories" ON public.news_categories
  FOR ALL TO authenticated
  USING (public.check_user_is_editor())
  WITH CHECK (public.check_user_is_editor());


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. conference_registrations_2026 — RLS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.conference_registrations_2026 ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit conference registration"      ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Conference registration insertable by everyone" ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Admins can manage conference registrations"     ON public.conference_registrations_2026;

-- ნებისმიერს (anon ჩათვლით) შეუძლია განაცხადის გაგზავნა
CREATE POLICY "Public can submit conference registration" ON public.conference_registrations_2026
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- admin / conference_manager — სრული მართვა
CREATE POLICY "Admins can manage conference registrations" ON public.conference_registrations_2026
  FOR ALL TO authenticated
  USING (public.check_user_is_conference_manager())
  WITH CHECK (public.check_user_is_conference_manager());


-- ─────────────────────────────────────────────────────────────────────────────
-- 6. departments — RLS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Departments are viewable by everyone" ON public.departments;
DROP POLICY IF EXISTS "Admins can manage departments"        ON public.departments;

CREATE POLICY "Departments are viewable by everyone" ON public.departments
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage departments" ON public.departments
  FOR ALL TO authenticated
  USING (public.check_user_is_admin())
  WITH CHECK (public.check_user_is_admin());


-- ─────────────────────────────────────────────────────────────────────────────
-- 7. staff_members — RLS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff members are viewable by everyone"  ON public.staff_members;
DROP POLICY IF EXISTS "Admins and dept heads can manage staff"  ON public.staff_members;
DROP POLICY IF EXISTS "Admins can manage staff"                 ON public.staff_members;

CREATE POLICY "Staff members are viewable by everyone" ON public.staff_members
  FOR SELECT USING (true);

CREATE POLICY "Admins and dept heads can manage staff" ON public.staff_members
  FOR ALL TO authenticated
  USING (public.check_user_is_admin())
  WITH CHECK (public.check_user_is_admin());


-- ─────────────────────────────────────────────────────────────────────────────
-- 8. audit_logs — RLS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view and insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can view audit logs"            ON public.audit_logs;
DROP POLICY IF EXISTS "Anyone can insert audit logs"          ON public.audit_logs;

-- ნებისმიერ client-ს შეუძლია ჩაწეროს ლოგი (client-side audit-ისთვის)
CREATE POLICY "Anyone can insert audit logs" ON public.audit_logs
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- მხოლოდ admin+ ხედავს ლოგებს
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT TO authenticated
  USING (public.check_user_is_admin());


-- ─────────────────────────────────────────────────────────────────────────────
-- 9. STORAGE BUCKETS  (ON CONFLICT — უსაფრთხოდ ხელმეორედ გასაშვები)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('conference-abstracts', 'conference-abstracts', true, 52428800, NULL),
  ('staff-avatars',        'staff-avatars',        true, 10485760, NULL),
  ('staff-documents',      'staff-documents',      true, 52428800, NULL),
  ('news-media',           'news-media',           true, 52428800, NULL)
ON CONFLICT (id) DO UPDATE
  SET public          = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit;


-- ─────────────────────────────────────────────────────────────────────────────
-- 10. STORAGE OBJECT POLICIES
-- ─────────────────────────────────────────────────────────────────────────────

-- ── conference-abstracts ──────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Public Upload Conference Abstracts"            ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Access for Conference Abstracts" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload conference abstracts"        ON storage.objects;

CREATE POLICY "Public Upload Conference Abstracts" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'conference-abstracts');

DROP POLICY IF EXISTS "Public Read Conference Abstracts"             ON storage.objects;
DROP POLICY IF EXISTS "Public Read Access for Conference Abstracts"  ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read conference abstracts"         ON storage.objects;

CREATE POLICY "Public Read Conference Abstracts" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'conference-abstracts');

DROP POLICY IF EXISTS "Admins can update conference abstracts" ON storage.objects;
CREATE POLICY "Admins can update conference abstracts" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'conference-abstracts');

DROP POLICY IF EXISTS "Admins can delete conference abstracts" ON storage.objects;
CREATE POLICY "Admins can delete conference abstracts" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'conference-abstracts');


-- ── staff-avatars, staff-documents, news-media ────────────────────────────────

DROP POLICY IF EXISTS "Public Read Access for Staff and News"   ON storage.objects;
CREATE POLICY "Public Read Access for Staff and News" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('staff-avatars', 'staff-documents', 'news-media'));

DROP POLICY IF EXISTS "Authenticated Upload for Staff and News" ON storage.objects;
CREATE POLICY "Authenticated Upload for Staff and News" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id IN ('staff-avatars', 'staff-documents', 'news-media'))
  WITH CHECK (bucket_id IN ('staff-avatars', 'staff-documents', 'news-media'));


-- ─────────────────────────────────────────────────────────────────────────────
-- 11. AUTH TRIGGER — ახალი მომხმარებლის ავტომატური user_profiles ჩანაწერი
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role, roles, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE WHEN NEW.email = 'tokolejo@gmail.com' THEN 'super_admin' ELSE 'pending' END,
    CASE WHEN NEW.email = 'tokolejo@gmail.com' THEN ARRAY['super_admin'] ELSE ARRAY['pending'] END,
    true
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ================================================================================
-- ✅ სკრიპტი დასრულდა — ყველა ობიექტი გამოყენებულია
-- ================================================================================
