-- ==============================================================================
-- SUPABASE PERFORMANCE & SECURITY LINTS FIX SCRIPT
-- Project: Raphael Agladze Institute of Inorganic Chemistry and Electrochemistry
-- Purpose: Resolves all warnings from Supabase Performance & Security Linter
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. FIX MUTABLE SEARCH PATH ON FUNCTIONS
-- (Prevents search_path hijacking attacks on SECURITY DEFINER functions)
-- ------------------------------------------------------------------------------

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'generate_abstract_number_2026') THEN
    ALTER FUNCTION public.generate_abstract_number_2026() SET search_path = public;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'handle_new_user') THEN
    ALTER FUNCTION public.handle_new_user() SET search_path = public;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'update_updated_at_column') THEN
    ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 2. REVOKE PUBLIC & DIRECT RPC EXECUTION ON AUTH HOOK FUNCTIONS
-- (handle_new_user should only be executed by auth trigger, not via REST RPC)
-- ------------------------------------------------------------------------------

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'handle_new_user') THEN
    REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
    REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
    REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 3. SECURITY DEFINER HELPER FUNCTIONS (AVOIDS INFINITE RECURSION ON USER_PROFILES)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.check_user_is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
      AND is_active = true
      AND ('super_admin' = ANY(roles) OR 'admin' = ANY(roles) OR role IN ('admin', 'super_admin'))
  );
$$;

CREATE OR REPLACE FUNCTION public.check_user_is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
      AND is_active = true
      AND ('super_admin' = ANY(roles) OR role = 'super_admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.check_user_is_editor()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
      AND is_active = true
      AND (
        'super_admin' = ANY(roles)
        OR 'admin' = ANY(roles)
        OR 'editor' = ANY(roles)
        OR role IN ('admin', 'super_admin', 'editor')
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.check_user_is_conference_manager()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
      AND is_active = true
      AND (
        'super_admin' = ANY(roles)
        OR 'admin' = ANY(roles)
        OR 'conference_manager' = ANY(roles)
        OR role IN ('admin', 'super_admin')
      )
  );
$$;

GRANT EXECUTE ON FUNCTION public.check_user_is_admin() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_super_admin() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_editor() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_conference_manager() TO authenticated, anon;

-- ------------------------------------------------------------------------------
-- 4. FIX OVERLY PERMISSIVE RLS POLICIES (USING (true) / WITH CHECK (true))
-- ------------------------------------------------------------------------------

-- A. Audit Logs
DROP POLICY IF EXISTS "Admins can view and insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;

CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (public.check_user_is_admin());

CREATE POLICY "Anyone can insert audit logs" ON public.audit_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- B. Conference Registrations 2026
DROP POLICY IF EXISTS "Admins can manage conference registrations" ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Public can submit conference registration" ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Conference registration insertable by everyone" ON public.conference_registrations_2026;

CREATE POLICY "Public can submit conference registration" ON public.conference_registrations_2026
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage conference registrations" ON public.conference_registrations_2026
  FOR ALL
  TO authenticated
  USING (public.check_user_is_conference_manager())
  WITH CHECK (public.check_user_is_conference_manager());

-- C. Scientific Departments
DROP POLICY IF EXISTS "Admins can manage departments" ON public.departments;
CREATE POLICY "Admins can manage departments" ON public.departments
  FOR ALL
  TO authenticated
  USING (public.check_user_is_admin())
  WITH CHECK (public.check_user_is_admin());

-- D. Infrastructure Items
DROP POLICY IF EXISTS "Admins can manage infrastructure" ON public.infrastructure_items;
CREATE POLICY "Admins can manage infrastructure" ON public.infrastructure_items
  FOR ALL
  TO authenticated
  USING (public.check_user_is_admin())
  WITH CHECK (public.check_user_is_admin());

-- E. Institute News
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;
DROP POLICY IF EXISTS "Admins and editors can manage news" ON public.news;
CREATE POLICY "Admins and editors can manage news" ON public.news
  FOR ALL
  TO authenticated
  USING (public.check_user_is_editor())
  WITH CHECK (public.check_user_is_editor());

-- F. Staff Members
DROP POLICY IF EXISTS "Admins and dept heads can manage staff" ON public.staff_members;
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff_members;
CREATE POLICY "Admins and dept heads can manage staff" ON public.staff_members
  FOR ALL
  TO authenticated
  USING (public.check_user_is_admin())
  WITH CHECK (public.check_user_is_admin());

-- G. User Profiles (NON-RECURSIVE)
DROP POLICY IF EXISTS "Users can view own profile or admins view all" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Super admins can update user profiles" ON public.user_profiles;

CREATE POLICY "Authenticated users can view profiles" ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super admins can update user profiles" ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (public.check_user_is_super_admin())
  WITH CHECK (public.check_user_is_super_admin());

-- ------------------------------------------------------------------------------
-- 5. FIX PUBLIC STORAGE BUCKETS BROAD LISTING PERMISSIONS
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
