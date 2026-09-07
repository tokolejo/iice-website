-- ==============================================================================
-- Email Templates Table Setup for IICE 2026 Website
-- Run this script in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    body_text TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by TEXT
);

-- Enable Row Level Security
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Allow read access
DROP POLICY IF EXISTS "Allow read email_templates" ON public.email_templates;
CREATE POLICY "Allow read email_templates" ON public.email_templates
    FOR SELECT USING (true);

-- Allow write access for admin
DROP POLICY IF EXISTS "Allow write email_templates" ON public.email_templates;
CREATE POLICY "Allow write email_templates" ON public.email_templates
    FOR ALL USING (true) WITH CHECK (true);
