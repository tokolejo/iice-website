import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../../lib/supabase/admin.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const query = searchParams.get('q') || '';

        const supabase = getSupabaseAdminClient();
        if (!supabase) {
            return NextResponse.json({
                success: true,
                logs: []
            });
        }

        let dbQuery = supabase
            .from('audit_logs')
            .select('*')
            .or('action.ilike.%EMAIL%,table_name.eq.email_templates,action.eq.CONFERENCE_REGISTRATION_EMAIL')
            .order('created_at', { ascending: false })
            .limit(limit);

        const { data, error } = await dbQuery;

        if (error) {
            console.warn('Error querying email audit logs:', error.message);
            return NextResponse.json({ success: true, logs: [] });
        }

        let filtered = data || [];
        if (query.trim()) {
            const lower = query.toLowerCase();
            filtered = filtered.filter(row => {
                const user = (row.user_email || '').toLowerCase();
                const record = (row.record_id || '').toLowerCase();
                const details = JSON.stringify(row.details || {}).toLowerCase();
                return user.includes(lower) || record.includes(lower) || details.includes(lower);
            });
        }

        return NextResponse.json({
            success: true,
            logs: filtered
        });
    } catch (err) {
        console.error('Error in email logs API:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
