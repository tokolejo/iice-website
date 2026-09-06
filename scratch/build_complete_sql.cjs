const fs = require('fs');
const path = require('path');

// Helper to escape SQL single quotes
function sqlEsc(str) {
    if (str === null || str === undefined) return 'NULL';
    return "'" + String(str).replace(/'/g, "''") + "'";
}

// 1. Read files
const appliedRaw = fs.readFileSync('./src/data/appliedChemistryStaff.js', 'utf8');
const fundRaw = fs.readFileSync('./src/data/fundamentalResearchStaff.js', 'utf8');
const coordRaw = fs.readFileSync('./src/data/coordCompoundsStaff.js', 'utf8');
const highRaw = fs.readFileSync('./src/data/highEnergyStaff.js', 'utf8');
const physRaw = fs.readFileSync('./src/data/physChemStaff.js', 'utf8');
const newsRaw = fs.readFileSync('./src/data/newsData.js', 'utf8');
const indexRaw = fs.readFileSync('./src/data/index.js', 'utf8');
const infraRaw = fs.readFileSync('./src/app/infrastructure/page.js', 'utf8');

// Evaluate in sandboxed functions by stripping export statements
function evalExport(code, varName) {
    const cleanCode = code
        .replace(/export\s+const\s+(\w+)\s*=/g, 'var $1 =')
        .replace(/export\s+default/g, 'var defaultExport =')
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
    const fn = new Function(cleanCode + '; return ' + varName + ';');
    return fn();
}

const appliedStaff = evalExport(appliedRaw, 'appliedChemistryStaff');
const fundStaff = evalExport(fundRaw, 'fundamentalResearchStaff');
const coordStaff = evalExport(coordRaw, 'coordCompoundsStaff');
const highStaff = evalExport(highRaw, 'highEnergyStaff');
const physStaff = evalExport(physRaw, 'physChemStaff');
const newsList = evalExport(newsRaw, 'newsData');

// Evaluate departmentsData
let deptsList = [];
const deptsMatch = indexRaw.match(/export\s+const\s+departmentsData\s*=\s*(\[[\s\S]*?\]);/);
if (deptsMatch) {
    const fn = new Function('return ' + deptsMatch[1] + ';');
    deptsList = fn();
}

// Evaluate infrastructure data from page.js
let infraList = [];
const infraMatch = infraRaw.match(/const\s+infraData\s*=\s*(\[[\s\S]*?\]);/);
if (infraMatch) {
    const fn = new Function('return ' + infraMatch[1] + ';');
    infraList = fn();
}

const allStaff = [
    ...appliedStaff,
    ...fundStaff,
    ...coordStaff,
    ...highStaff,
    ...physStaff,
    {
        id: 'tsurtsumia',
        name: 'გიგლა წურწუმია',
        nameEn: 'Gigla Tsurtsumia',
        role: 'მთავარი მეცნიერი თანამშრომელი',
        roleEn: 'Chief Research Scientist',
        department: 'ადმინისტრაცია',
        departmentId: 'applied-chemistry',
        imageUrl: '/images/staff/Gigla Tsurtsumia-pic.jpg',
        emails: ['giglat@hotmail.com'],
        links: [
            { title: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=en&user=gicYVU0AAAAJ' },
            { title: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=15842446600' },
            { title: 'Web of Science', url: 'https://www.webofscience.com/wos/author/record/31795455' },
            { title: 'LinkedIn', url: 'https://www.linkedin.com/in/gigla-tsurtsumia-1089333aa/' }
        ],
        isHead: false
    }
];

let sql = `-- ==============================================================================
-- TSU IICE (Raphael Agladze Institute) - COMPLETE MASTER SUPABASE DATABASE SCHEMA
-- Generated with ALL Website Data (Departments, Staff, News, Infrastructure, Auth, 2026 Conf)
-- Execute this entire script in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description_ka TEXT,
    description_en TEXT,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Departments
`;

deptsList.forEach((d, idx) => {
    const descKa = Array.isArray(d.descriptionKa) ? d.descriptionKa.join('\n\n') : (d.descriptionKa || '');
    const descEn = Array.isArray(d.descriptionEn) ? d.descriptionEn.join('\n\n') : (d.descriptionEn || '');
    sql += `INSERT INTO public.departments (slug, name_ka, name_en, description_ka, description_en, order_index)
VALUES (${sqlEsc(d.id)}, ${sqlEsc(d.name)}, ${sqlEsc(d.nameEn)}, ${sqlEsc(descKa)}, ${sqlEsc(descEn)}, ${idx + 1})
ON CONFLICT (slug) DO UPDATE SET
    name_ka = EXCLUDED.name_ka,
    name_en = EXCLUDED.name_en,
    description_ka = EXCLUDED.description_ka,
    description_en = EXCLUDED.description_en,
    order_index = EXCLUDED.order_index;
`;
});

sql += `
-- 2. Staff Members Table
CREATE TABLE IF NOT EXISTS public.staff_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legacy_id TEXT UNIQUE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    first_name_ka TEXT NOT NULL,
    last_name_ka TEXT NOT NULL,
    first_name_en TEXT,
    last_name_en TEXT,
    position_ka TEXT NOT NULL,
    position_en TEXT,
    scientific_degree_ka TEXT,
    scientific_degree_en TEXT,
    email TEXT,
    phone TEXT,
    photo_url TEXT,
    bio_ka TEXT,
    bio_en TEXT,
    cv_file_url TEXT,
    publications_file_url TEXT,
    google_scholar_url TEXT,
    scopus_url TEXT,
    web_of_science_url TEXT,
    orcid_url TEXT,
    is_head BOOLEAN DEFAULT FALSE,
    is_management BOOLEAN DEFAULT FALSE,
    is_council_member BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_department_id ON public.staff_members(department_id);
CREATE INDEX IF NOT EXISTS idx_staff_order ON public.staff_members(order_index);

-- Seed Staff Members
`;

allStaff.forEach((s, idx) => {
    const partsKa = (s.name || '').trim().split(/\s+/);
    const firstNameKa = partsKa[0] || '';
    const lastNameKa = partsKa.slice(1).join(' ') || '';

    const partsEn = (s.nameEn || '').trim().split(/\s+/);
    const firstNameEn = partsEn[0] || firstNameKa;
    const lastNameEn = partsEn.slice(1).join(' ') || lastNameKa;

    let scholarUrl = null;
    let scopusUrl = null;
    let wosUrl = null;
    let orcidUrl = null;

    if (Array.isArray(s.links)) {
        s.links.forEach(l => {
            const t = (l.title || '').toLowerCase();
            if (t.includes('scholar')) scholarUrl = l.url;
            else if (t.includes('scopus')) scopusUrl = l.url;
            else if (t.includes('science')) wosUrl = l.url;
            else if (t.includes('orcid')) orcidUrl = l.url;
        });
    }

    const email = (Array.isArray(s.emails) && s.emails.length > 0) ? s.emails[0] : (s.email || null);
    const photo = s.imageUrl || null;
    const cv = s.cvLink || s.cvFileUrl || null;
    const bioKa = s.bioLink || null;
    const bioEn = s.bioLinkEn || null;
    const deptSlug = s.departmentId || 'applied-chemistry';
    const isHead = !!s.isHead;

    sql += `INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    ${sqlEsc(s.id || 'staff-' + idx)},
    (SELECT id FROM public.departments WHERE slug = ${sqlEsc(deptSlug)} LIMIT 1),
    ${sqlEsc(firstNameKa)}, ${sqlEsc(lastNameKa)}, ${sqlEsc(firstNameEn)}, ${sqlEsc(lastNameEn)},
    ${sqlEsc(s.role || 'მეცნიერ თანამშრომელი')}, ${sqlEsc(s.roleEn || 'Researcher')},
    ${sqlEsc(email)}, ${sqlEsc(photo)}, ${sqlEsc(cv)}, ${sqlEsc(bioKa)}, ${sqlEsc(bioEn)},
    ${sqlEsc(scholarUrl)}, ${sqlEsc(scopusUrl)}, ${sqlEsc(wosUrl)}, ${sqlEsc(orcidUrl)},
    ${isHead}, ${idx + 1}
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
`;
});

sql += `
-- 3. News Categories & News Table
CREATE TABLE IF NOT EXISTS public.news_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.news_categories (slug, name_ka, name_en, order_index) VALUES
('general', 'სიახლეები', 'News', 1),
('news', 'სიახლეები', 'News', 2),
('seminars', 'სემინარები', 'Seminars', 3),
('conferences', 'კონფერენციები', 'Conferences', 4)
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legacy_id TEXT UNIQUE,
    category_id UUID REFERENCES public.news_categories(id) ON DELETE SET NULL,
    title_ka TEXT NOT NULL,
    title_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    cover_image_url TEXT,
    gallery_urls TEXT[] DEFAULT '{}',
    content_ka TEXT NOT NULL,
    content_en TEXT,
    attached_files JSONB DEFAULT '[]',
    status TEXT DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_category_id ON public.news(category_id);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);

-- Seed All News & Seminars Items
`;

newsList.forEach((n, idx) => {
    const slug = n.slug || `news-${n.id || idx + 1}`;
    const catSlug = n.category === 'seminars' ? 'seminars' : 'news';
    const publishedAt = n.date ? `${n.date}T10:00:00Z` : new Date().toISOString();
    const coverImage = n.imageUrl || (Array.isArray(n.images) && n.images.length > 0 ? n.images[0] : '/images/news-placeholder.jpg');
    const galleryArr = Array.isArray(n.images) ? n.images : [];
    const gallerySql = "ARRAY[" + galleryArr.map(img => sqlEsc(img)).join(",") + "]::TEXT[]";

    sql += `INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    ${sqlEsc('news-' + (n.id || idx + 1))},
    (SELECT id FROM public.news_categories WHERE slug = ${sqlEsc(catSlug)} LIMIT 1),
    ${sqlEsc(n.title)}, ${sqlEsc(n.titleEn || n.title)}, ${sqlEsc(slug)},
    ${sqlEsc(coverImage)}, ${galleryArr.length > 0 ? gallerySql : "'{}'::TEXT[]"},
    ${sqlEsc(n.content || '')}, ${sqlEsc(n.contentEn || n.content || '')},
    'published', ${sqlEsc(publishedAt)}
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
`;
});

sql += `
-- 4. Infrastructure Items Table
CREATE TABLE IF NOT EXISTS public.infrastructure_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ka TEXT,
    description_en TEXT,
    location_ka TEXT,
    location_en TEXT,
    image_urls TEXT[] DEFAULT '{}',
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Infrastructure Items
`;

infraList.forEach((item, idx) => {
    sql += `INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES (${sqlEsc(item.name)}, ${sqlEsc(item.nameEn)}, ${sqlEsc(item.desc)}, ${sqlEsc(item.descEn)}, ${sqlEsc(item.loc)}, ${sqlEsc(item.locEn)}, ${idx + 1})
ON CONFLICT DO NOTHING;
`;
});

sql += `
-- 5. Conference 2026 Registrations Table
CREATE TABLE IF NOT EXISTS public.conference_registrations_2026 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    abstract_number TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date DATE,
    citizenship TEXT NOT NULL,
    affiliation TEXT NOT NULL,
    titulation TEXT NOT NULL,
    gender TEXT NOT NULL,
    email TEXT NOT NULL,
    is_attending_in_person BOOLEAN NOT NULL DEFAULT TRUE,
    presentation_title TEXT NOT NULL,
    co_authors TEXT,
    presentation_type TEXT NOT NULL,
    participation_role TEXT NOT NULL,
    thematic_topic TEXT NOT NULL,
    abstract_file_geo_url TEXT,
    abstract_file_eng_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conf_email ON public.conference_registrations_2026(email);
CREATE INDEX IF NOT EXISTS idx_conf_topic ON public.conference_registrations_2026(thematic_topic);

-- Automatic Abstract Number Sequence & Trigger
CREATE SEQUENCE IF NOT EXISTS public.abstract_seq_2026 START 1;

CREATE OR REPLACE FUNCTION public.generate_abstract_number_2026()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.abstract_number IS NULL OR NEW.abstract_number = '' THEN
        NEW.abstract_number := 'IICE-2026-' || LPAD(nextval('public.abstract_seq_2026')::TEXT, 3, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_abstract_number ON public.conference_registrations_2026;
CREATE TRIGGER trigger_generate_abstract_number
BEFORE INSERT ON public.conference_registrations_2026
FOR EACH ROW EXECUTE FUNCTION public.generate_abstract_number_2026();

-- 6. User Profiles & Google Auth RBAC
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'pending', -- 'super_admin', 'admin', 'pending', 'inactive'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
        CASE
            WHEN LOWER(NEW.email) = 'tokolejo@gmail.com' THEN 'super_admin'
            ELSE 'pending'
        END
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        role = CASE
            WHEN LOWER(EXCLUDED.email) = 'tokolejo@gmail.com' THEN 'super_admin'
            ELSE public.user_profiles.role
        END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Storage Buckets Setup
INSERT INTO storage.buckets (id, name, public) VALUES 
('conference-abstracts', 'conference-abstracts', true),
('staff-avatars', 'staff-avatars', true),
('staff-documents', 'staff-documents', true),
('news-media', 'news-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for Public Uploads & Reads
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
CREATE POLICY "Public Upload Access" ON storage.objects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Access" ON storage.objects;
CREATE POLICY "Public Update Access" ON storage.objects FOR UPDATE USING (true);

-- 9. Row Level Security (RLS) Configuration
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.infrastructure_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conference_registrations_2026 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent duplication errors
DROP POLICY IF EXISTS "Departments are viewable by everyone" ON public.departments;
DROP POLICY IF EXISTS "Staff members are viewable by everyone" ON public.staff_members;
DROP POLICY IF EXISTS "News are viewable by everyone" ON public.news;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.news_categories;
DROP POLICY IF EXISTS "Infrastructure viewable by everyone" ON public.infrastructure_items;
DROP POLICY IF EXISTS "Conference registration insertable by everyone" ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff_members;
DROP POLICY IF EXISTS "Admins can manage departments" ON public.departments;
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;
DROP POLICY IF EXISTS "Admins can manage infrastructure" ON public.infrastructure_items;
DROP POLICY IF EXISTS "Admins can manage conference registrations" ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Admins can view user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;

-- Public read policies
CREATE POLICY "Departments are viewable by everyone" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Staff members are viewable by everyone" ON public.staff_members FOR SELECT USING (true);
CREATE POLICY "News are viewable by everyone" ON public.news FOR SELECT USING (true);
CREATE POLICY "Categories are viewable by everyone" ON public.news_categories FOR SELECT USING (true);
CREATE POLICY "Infrastructure viewable by everyone" ON public.infrastructure_items FOR SELECT USING (true);
CREATE POLICY "Conference registration insertable by everyone" ON public.conference_registrations_2026 FOR INSERT WITH CHECK (true);

-- Authenticated admins can manage data
CREATE POLICY "Admins can manage staff" ON public.staff_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage infrastructure" ON public.infrastructure_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage conference registrations" ON public.conference_registrations_2026 FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can view user profiles" ON public.user_profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;

fs.writeFileSync('./supabase_schema_complete.sql', sql, 'utf8');
console.log('Successfully generated supabase_schema_complete.sql!');
console.log('Total Staff members seeded:', allStaff.length);
console.log('Total News items seeded:', newsList.length);
console.log('Total Infrastructure items seeded:', infraList.length);
