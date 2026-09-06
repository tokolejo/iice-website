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
-- 3. FIX OVERLY PERMISSIVE RLS POLICIES (USING (true) / WITH CHECK (true))
-- (Replace unrestricted authenticated access with strict role-based verification)
-- ------------------------------------------------------------------------------

-- A. Audit Logs
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view and insert audit logs" ON public.audit_logs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles))
    )
  );

-- B. Conference Registrations 2026
DROP POLICY IF EXISTS "Admins can manage conference registrations" ON public.conference_registrations_2026;
CREATE POLICY "Admins can manage conference registrations" ON public.conference_registrations_2026
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles) OR 'conference_manager' = ANY(up.roles))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles) OR 'conference_manager' = ANY(up.roles))
    )
  );

-- Ensure public registration insertion is explicitly constrained to INSERT
DROP POLICY IF EXISTS "Conference registration insertable by everyone" ON public.conference_registrations_2026;
CREATE POLICY "Public can submit conference registration" ON public.conference_registrations_2026
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (first_name IS NOT NULL AND last_name IS NOT NULL AND email IS NOT NULL AND presentation_title IS NOT NULL);

-- C. Scientific Departments
DROP POLICY IF EXISTS "Admins can manage departments" ON public.departments;
CREATE POLICY "Admins can manage departments" ON public.departments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles))
    )
  );

-- D. Infrastructure Items
DROP POLICY IF EXISTS "Admins can manage infrastructure" ON public.infrastructure_items;
CREATE POLICY "Admins can manage infrastructure" ON public.infrastructure_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles))
    )
  );

-- E. Institute News
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;
CREATE POLICY "Admins and editors can manage news" ON public.news
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles) OR 'editor' = ANY(up.roles))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles) OR 'editor' = ANY(up.roles))
    )
  );

-- F. Staff Members
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff_members;
CREATE POLICY "Admins and dept heads can manage staff" ON public.staff_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND (
          'super_admin' = ANY(up.roles)
          OR 'admin' = ANY(up.roles)
          OR ('department_head' = ANY(up.roles) AND (up.department_id = staff_members.department_id OR staff_members.department_id IS NULL))
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND (
          'super_admin' = ANY(up.roles)
          OR 'admin' = ANY(up.roles)
          OR ('department_head' = ANY(up.roles) AND (up.department_id = staff_members.department_id OR staff_members.department_id IS NULL))
        )
    )
  );

-- G. User Profiles
DROP POLICY IF EXISTS "Admins can view user profiles" ON public.user_profiles;
CREATE POLICY "Users can view own profile or admins view all" ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND ('super_admin' = ANY(up.roles) OR 'admin' = ANY(up.roles))
    )
  );

DROP POLICY IF EXISTS "Super admins can update user profiles" ON public.user_profiles;
CREATE POLICY "Super admins can update user profiles" ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND 'super_admin' = ANY(up.roles)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid()
        AND up.is_active = true
        AND 'super_admin' = ANY(up.roles)
    )
  );

-- ------------------------------------------------------------------------------
-- 4. FIX PUBLIC STORAGE BUCKETS BROAD LISTING PERMISSIONS
-- (Public buckets don't need a SELECT policy on storage.objects for public download URLs)
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;

-- ------------------------------------------------------------------------------
-- 5. LEAKED PASSWORD PROTECTION
-- To enable leaked password protection, open your Supabase Dashboard:
-- 1. Go to Authentication -> Providers / Security
-- 2. Under Password, enable "Leaked Password Protection (HaveIBeenPwned)"
-- ------------------------------------------------------------------------------
