-- ==============================================================================
-- FIX FOR: "infinite recursion detected in policy for relation user_profiles"
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor -> New query -> Run)
-- ==============================================================================

-- 1. Create SECURITY DEFINER helper functions to bypass RLS recursion
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

-- Grant execution to authenticated users
GRANT EXECUTE ON FUNCTION public.check_user_is_admin() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_super_admin() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_editor() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_user_is_conference_manager() TO authenticated, anon;

-- 2. Fix user_profiles RLS policies (ELIMINATES INFINITE RECURSION)
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

-- 3. Fix News RLS policies
DROP POLICY IF EXISTS "Admins and editors can manage news" ON public.news;
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;
DROP POLICY IF EXISTS "News items are viewable by everyone" ON public.news;

CREATE POLICY "News items are viewable by everyone" ON public.news
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can manage news" ON public.news
  FOR ALL
  TO authenticated
  USING (public.check_user_is_editor())
  WITH CHECK (public.check_user_is_editor());

-- 4. Fix Conference Registrations 2026 RLS policies
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

-- 5. Fix Departments RLS policies
DROP POLICY IF EXISTS "Admins can manage departments" ON public.departments;
CREATE POLICY "Admins can manage departments" ON public.departments
  FOR ALL
  TO authenticated
  USING (public.check_user_is_admin())
  WITH CHECK (public.check_user_is_admin());

-- 6. Fix Staff Members RLS policies
DROP POLICY IF EXISTS "Admins and dept heads can manage staff" ON public.staff_members;
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff_members;
CREATE POLICY "Admins and dept heads can manage staff" ON public.staff_members
  FOR ALL
  TO authenticated
  USING (public.check_user_is_admin())
  WITH CHECK (public.check_user_is_admin());

-- 7. Fix Audit Logs RLS policies
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
