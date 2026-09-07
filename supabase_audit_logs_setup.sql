-- ==============================================================================
-- TSU IICE Website — Complete Audit Logs Setup & Fix
-- Run this script in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Ensure the audit_logs table exists
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 3. Clean up any conflicting old policies
DROP POLICY IF EXISTS "Admins can view and insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can view audit logs"            ON public.audit_logs;
DROP POLICY IF EXISTS "Anyone can insert audit logs"          ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can manage audit logs"          ON public.audit_logs;
DROP POLICY IF EXISTS "Public insert audit logs"              ON public.audit_logs;

-- 4. Allow all inserts (authenticated admin/staff + anonymous registration forms & API)
CREATE POLICY "Anyone can insert audit logs" ON public.audit_logs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 5. Allow authenticated users (Admins / Staff) to view audit logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (true);

-- 6. Create indexes for maximum search & filtering performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs (action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON public.audit_logs (table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_email ON public.audit_logs (user_email);

-- Success message
SELECT 'TSU IICE audit_logs table and RLS policies successfully configured!' AS status;
