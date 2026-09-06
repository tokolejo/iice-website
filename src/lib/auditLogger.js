/**
 * Centralized audit logging service for TSU IICE.
 * Dispatches to /api/audit API route to ensure server-side enrichment (IP, User-Agent)
 * and bypass RLS constraints via administrative authority.
 */
export async function recordAuditLog({ userEmail, action, tableName, recordId, details }) {
    try {
        if (typeof window !== 'undefined') {
            // Client-side fetch
            fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: userEmail || 'anonymous',
                    action,
                    tableName,
                    recordId: recordId ? String(recordId) : null,
                    details: details || {},
                }),
            }).catch(err => console.warn('Audit logging background failure:', err));
        } else {
            // Server-side fallback: direct call or internal fetch
            console.log(`[AUDIT] ${action} on ${tableName} by ${userEmail}`);
        }
    } catch (err) {
        console.warn('Audit logger exception:', err);
    }
}
