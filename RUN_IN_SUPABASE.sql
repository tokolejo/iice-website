-- ==============================================================================
-- TSU IICE Website — One-Click Fix for Supabase (Run in SQL Editor)
-- Direct Link: https://supabase.com/dashboard/project/mvmivfunlszjpcuvnmzw/sql
-- ==============================================================================

-- 1. Add 'status' column to Conference 2026 registrations table
ALTER TABLE public.conference_registrations_2026 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- 2. Ensure audit_logs table exists
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS) for audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any old/restrictive audit_logs policies
DROP POLICY IF EXISTS "Admins can view and insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can view audit logs"            ON public.audit_logs;
DROP POLICY IF EXISTS "Anyone can insert audit logs"          ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can manage audit logs"          ON public.audit_logs;
DROP POLICY IF EXISTS "Public insert audit logs"              ON public.audit_logs;

-- 5. Allow all inserts (authenticated admin/staff + anonymous registration forms & server API)
CREATE POLICY "Anyone can insert audit logs" ON public.audit_logs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 6. Allow authenticated users (Admins / Staff) to view audit logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (true);

-- 7. Performance indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs (action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON public.audit_logs (table_name);
CREATE INDEX IF NOT EXISTS idx_conf_2026_status ON public.conference_registrations_2026 (status);

-- Confirmation query
SELECT 'TSU IICE: status column and audit_logs configured successfully!' AS result;
