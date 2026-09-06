import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../lib/supabase/admin';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getClient() {
    const admin = getSupabaseAdminClient();
    if (admin) return admin;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;

    return createClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { userEmail, action, tableName, recordId, details } = body;

        if (!action || !tableName) {
            return NextResponse.json({ error: 'Action and tableName are required' }, { status: 400 });
        }

        const supabase = getClient();
        if (!supabase) {
            return NextResponse.json({ message: 'Supabase not configured, log skipped' }, { status: 200 });
        }

        // Capture client network metadata
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        const enrichedDetails = {
            ...(typeof details === 'object' && details !== null ? details : { raw: details }),
            ip,
            userAgent: userAgent.slice(0, 160), // Keep it concise
        };

        const { data, error } = await supabase.from('audit_logs').insert([
            {
                user_email: userEmail || 'system / anonymous',
                action: String(action).toUpperCase(),
                table_name: String(tableName).toLowerCase(),
                record_id: recordId ? String(recordId) : null,
                details: enrichedDetails,
                created_at: new Date().toISOString(),
            },
        ]).select('id').maybeSingle();

        if (error) {
            console.warn('Audit log insert warning:', error.message);
            return NextResponse.json({ warning: error.message }, { status: 200 });
        }

        return NextResponse.json({ success: true, logId: data?.id });
    } catch (err) {
        console.error('Audit log API error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || 'ALL';
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '150', 10);

        const supabase = getClient();
        if (!supabase) {
            return NextResponse.json({ logs: [] });
        }

        let query = supabase
            .from('audit_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        // Filter by category
        if (category === 'AUTH') {
            query = query.ilike('action', 'AUTH_%');
        } else if (category === 'CONFERENCE') {
            query = query.or('action.ilike.CONFERENCE_%,table_name.ilike.%conference%');
        } else if (category === 'STAFF') {
            query = query.or('action.ilike.STAFF_%,table_name.ilike.%staff%');
        } else if (category === 'NEWS') {
            query = query.or('action.ilike.NEWS_%,table_name.ilike.%news%');
        } else if (category === 'DEPARTMENTS') {
            query = query.or('action.ilike.DEPT_%,table_name.ilike.%department%');
        } else if (category === 'USERS') {
            query = query.or('action.ilike.USER_%,action.ilike.RBAC_%,table_name.ilike.%user%');
        }

        const { data, error } = await query;

        if (error) {
            console.warn('Audit fetch warning:', error.message);
            return NextResponse.json({ logs: [] });
        }

        // Apply search if provided
        let results = data || [];
        if (search.trim()) {
            const q = search.toLowerCase();
            results = results.filter(l =>
                (l.action && l.action.toLowerCase().includes(q)) ||
                (l.user_email && l.user_email.toLowerCase().includes(q)) ||
                (l.table_name && l.table_name.toLowerCase().includes(q)) ||
                (l.record_id && l.record_id.toLowerCase().includes(q)) ||
                (l.details && JSON.stringify(l.details).toLowerCase().includes(q))
            );
        }

        return NextResponse.json({ logs: results });
    } catch (err) {
        console.error('Audit GET API error:', err);
        return NextResponse.json({ logs: [] });
    }
}
