import { getSupabaseBrowserClient } from './supabase/client';

/**
 * Centralized audit logging service for TSU IICE.
 * Automatically resolves current user email & auth token.
 * Records to Supabase audit_logs table via direct client and/or /api/audit API route.
 */
export async function recordAuditLog({ userEmail, action, tableName, recordId, details }) {
    if (!action || !tableName) {
        console.warn('[AUDIT] action and tableName are required');
        return;
    }

    try {
        let finalEmail = userEmail;
        let token = null;

        if (typeof window !== 'undefined') {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                try {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (!finalEmail && session?.user?.email) {
                        finalEmail = session.user.email;
                    }
                    if (session?.access_token) {
                        token = session.access_token;
                    }
                } catch (sessionErr) {
                    console.warn('[AUDIT] Could not retrieve active session:', sessionErr);
                }
            }

            finalEmail = finalEmail || 'anonymous';

            const payload = {
                userEmail: finalEmail,
                action: String(action).toUpperCase(),
                tableName: String(tableName).toLowerCase(),
                recordId: recordId ? String(recordId) : null,
                details: details || {},
            };

            // 1. First try direct browser insertion if client is authenticated
            let directSuccess = false;
            if (supabase) {
                try {
                    const { error } = await supabase.from('audit_logs').insert([
                        {
                            user_email: finalEmail,
                            action: payload.action,
                            table_name: payload.tableName,
                            record_id: payload.recordId,
                            details: payload.details,
                            created_at: new Date().toISOString(),
                        }
                    ]);

                    if (!error) {
                        directSuccess = true;
                    } else {
                        console.warn('[AUDIT] Direct client insert warning:', error.message);
                    }
                } catch (directErr) {
                    console.warn('[AUDIT] Direct client insert exception:', directErr);
                }
            }

            // 2. Dispatch to server API to enrich metadata (IP, User-Agent) if direct failed
            try {
                const headers = { 'Content-Type': 'application/json' };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                if (!directSuccess) {
                    const res = await fetch('/api/audit', {
                        method: 'POST',
                        headers,
                        body: JSON.stringify(payload),
                    });

                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        console.warn('[AUDIT] API logging response status:', res.status, errData);
                    }
                }
            } catch (apiErr) {
                console.warn('[AUDIT] API logging background failure:', apiErr);
            }
        } else {
            // Server-side fallback
            try {
                const { logAudit } = await import('./supabase/admin');
                await logAudit({
                    userEmail: finalEmail || 'server',
                    action,
                    tableName,
                    recordId,
                    details
                });
            } catch (serverErr) {
                console.warn('[AUDIT] Server logging failed:', serverErr);
            }
        }
    } catch (err) {
        console.warn('[AUDIT] Top-level logger exception:', err);
    }
}
