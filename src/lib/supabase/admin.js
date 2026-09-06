import { createClient } from '@supabase/supabase-js';

let adminClient = null;

export function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  if (!adminClient) {
    adminClient = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClient;
}

export async function logAudit({ userEmail, action, tableName, recordId, details }) {
  try {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;

    const { error } = await supabase.from('audit_logs').insert([
      {
        user_email: userEmail || 'unknown',
        action,
        table_name: tableName,
        record_id: recordId ? String(recordId) : null,
        details: details || {},
      },
    ]);

    if (error) {
      console.warn('Failed to insert audit log:', error.message);
    }
  } catch (err) {
    console.warn('Audit logging exception:', err);
  }
}
