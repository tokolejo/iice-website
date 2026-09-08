import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../../lib/supabase/admin.js';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getClient(request) {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const admin = getSupabaseAdminClient();
        if (admin) return admin;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;

    const authHeader = request?.headers?.get('authorization');
    const options = {
        auth: { autoRefreshToken: false, persistSession: false },
    };

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        options.global = {
            headers: { Authorization: `Bearer ${token}` }
        };
    }

    return createClient(url, key, options);
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '100', 10);
        const query = searchParams.get('q') || '';

        const supabase = getClient(request);
        if (!supabase) {
            return NextResponse.json({
                success: true,
                logs: []
            });
        }

        let dbQuery = supabase
            .from('audit_logs')
            .select('*')
            .or('action.ilike.%EMAIL%,action.ilike.%MAIL%,table_name.ilike.%email%,action.eq.CONFERENCE_REGISTRATION_EMAIL')
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
