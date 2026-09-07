import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../lib/supabase/admin';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getClient(request) {
    const admin = getSupabaseAdminClient();
    if (admin) return admin;

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

export async function POST(request) {
    try {
        const body = await request.json();
        const { userEmail, action, tableName, recordId, details } = body;

        if (!action || !tableName) {
            return NextResponse.json({ error: 'Action and tableName are required' }, { status: 400 });
        }

        const supabase = getClient(request);
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
            userAgent: userAgent.slice(0, 160),
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
            console.warn('[AUDIT API] Insert warning:', error.message);
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, logId: data?.id });
    } catch (err) {
        console.error('[AUDIT API] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || 'ALL';
        const search = searchParams.get('search') || '';
        const limit = parseInt(searchParams.get('limit') || '300', 10);

        const supabase = getClient(request);
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
            query = query.or('action.ilike.AUTH_%,action.ilike.SIGN_%,action.ilike.LOGIN_%,action.ilike.LOGOUT_%');
        } else if (category === 'CONFERENCE') {
            query = query.or('action.ilike.CONFERENCE_%,table_name.ilike.%conference%');
        } else if (category === 'STAFF') {
            query = query.or('action.ilike.STAFF_%,table_name.ilike.%staff%');
        } else if (category === 'NEWS') {
            query = query.or('action.ilike.NEWS_%,action.ilike.CATEGORY_%,table_name.ilike.%news%');
        } else if (category === 'DEPARTMENTS') {
            query = query.or('action.ilike.DEPT_%,table_name.ilike.%department%');
        } else if (category === 'USERS') {
            query = query.or('action.ilike.USER_%,action.ilike.RBAC_%,table_name.ilike.%user%');
        } else if (category === 'BACKUP') {
            query = query.or('action.ilike.DB_%,action.ilike.BACKUP_%,table_name.ilike.%backup%');
        }

        const { data, error } = await query;

        if (error) {
            console.warn('[AUDIT GET] Fetch warning:', error.message);
            return NextResponse.json({ logs: [], warning: error.message }, { status: 200 });
        }

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
        console.error('[AUDIT GET] API error:', err);
        return NextResponse.json({ logs: [], error: err.message }, { status: 500 });
    }
}
