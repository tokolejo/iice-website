import fs from 'fs';
import path from 'path';
import { getSupabaseAdminClient } from './supabase/admin.js';
import { DEFAULT_TEMPLATES } from './emailTemplates.js';

const LOCAL_STORAGE_PATH = path.join(process.cwd(), 'src', 'data', 'email_templates.json');

/**
 * Reads customized templates from local JSON file (fallback/cache)
 */
function getLocalCustomTemplates() {
    try {
        if (fs.existsSync(LOCAL_STORAGE_PATH)) {
            const content = fs.readFileSync(LOCAL_STORAGE_PATH, 'utf-8');
            return JSON.parse(content) || {};
        }
    } catch (e) {
        console.warn('Error reading local email templates:', e.message);
    }
    return {};
}

/**
 * Saves customized templates to local JSON file
 */
function saveLocalCustomTemplates(templatesMap) {
    try {
        const dir = path.dirname(LOCAL_STORAGE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify(templatesMap, null, 2), 'utf-8');
    } catch (e) {
        console.warn('Error saving local email templates:', e.message);
    }
}

/**
 * Returns all email templates (merging defaults with any stored customizations)
 */
export async function getAllTemplates() {
    const result = { ...DEFAULT_TEMPLATES };

    // 1. First overlay local storage
    const local = getLocalCustomTemplates();
    for (const [key, val] of Object.entries(local)) {
        if (result[key]) {
            result[key] = {
                ...result[key],
                ...val,
                is_customized: true
            };
        } else {
            result[key] = { ...val, is_customized: true };
        }
    }

    // 2. Try Supabase if available
    try {
        const supabase = getSupabaseAdminClient();
        if (supabase) {
            const { data, error } = await supabase
                .from('email_templates')
                .select('*');

            if (!error && Array.isArray(data)) {
                data.forEach(row => {
                    if (row.key && result[row.key]) {
                        result[row.key] = {
                            ...result[row.key],
                            subject: row.subject || result[row.key].subject,
                            body_text: row.body_text || result[row.key].body_text,
                            updated_at: row.updated_at,
                            updated_by: row.updated_by,
                            is_customized: true
                        };
                    }
                });
            }
        }
    } catch (dbErr) {
        // Table might not exist yet; gracefully fallback
        console.warn('Supabase email_templates notice:', dbErr.message);
    }

    return result;
}

/**
 * Gets a single active template by key
 */
export async function getTemplateByKey(key) {
    const all = await getAllTemplates();
    return all[key] || DEFAULT_TEMPLATES[key] || null;
}

/**
 * Saves or updates an email template
 */
export async function saveTemplate({ key, subject, body_text, updated_by = 'admin' }) {
    if (!key || !subject || !body_text) {
        throw new Error('Key, subject, and body_text are required');
    }

    const defaultTmpl = DEFAULT_TEMPLATES[key] || {};
    const payload = {
        key,
        title: defaultTmpl.title || key,
        description: defaultTmpl.description || '',
        subject: subject.trim(),
        body_text: body_text.trim(),
        updated_at: new Date().toISOString(),
        updated_by
    };

    // 1. Save to local JSON storage
    const local = getLocalCustomTemplates();
    local[key] = payload;
    saveLocalCustomTemplates(local);

    // 2. Save to Supabase if table exists
    try {
        const supabase = getSupabaseAdminClient();
        if (supabase) {
            const { error } = await supabase
                .from('email_templates')
                .upsert(payload, { onConflict: 'key' });

            if (error) {
                console.warn('Could not upsert to Supabase email_templates (using local store):', error.message);
            }
        }
    } catch (dbErr) {
        console.warn('Supabase email_templates save exception:', dbErr.message);
    }

    return {
        ...defaultTmpl,
        ...payload,
        is_customized: true
    };
}

/**
 * Resets a template back to factory defaults
 */
export async function resetTemplate(key) {
    if (!DEFAULT_TEMPLATES[key]) {
        throw new Error(`Unknown template key: ${key}`);
    }

    // 1. Remove from local store
    const local = getLocalCustomTemplates();
    delete local[key];
    saveLocalCustomTemplates(local);

    // 2. Delete from Supabase if table exists
    try {
        const supabase = getSupabaseAdminClient();
        if (supabase) {
            await supabase
                .from('email_templates')
                .delete()
                .eq('key', key);
        }
    } catch (dbErr) {
        console.warn('Supabase reset template exception:', dbErr.message);
    }

    return {
        ...DEFAULT_TEMPLATES[key],
        is_customized: false
    };
}
