import { NextResponse } from 'next/server';
import { getAllTemplates, saveTemplate, resetTemplate } from '../../../../../lib/emailTemplateService.js';
import { getSupabaseAdminClient } from '../../../../../lib/supabase/admin.js';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const templates = await getAllTemplates();
        return NextResponse.json({
            success: true,
            templates
        });
    } catch (err) {
        console.error('Error fetching email templates:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { key, subject, body_text, subject_en = '', body_text_en = '', updated_by = 'admin' } = body;

        if (!key || !subject || !body_text) {
            return NextResponse.json({
                error: 'შაბლონის გასაღები (key), თემა (subject) და ტექსტი (body_text) სავალდებულოა'
            }, { status: 400 });
        }

        const saved = await saveTemplate({
            key,
            subject,
            body_text,
            subject_en,
            body_text_en,
            updated_by
        });

        // Audit log
        try {
            const supabase = getSupabaseAdminClient();
            if (supabase) {
                await supabase.from('audit_logs').insert([
                    {
                        user_email: updated_by,
                        action: 'EMAIL_TEMPLATE_UPDATE',
                        table_name: 'email_templates',
                        record_id: key,
                        details: {
                            key,
                            subject,
                            subject_en,
                            updated_at: new Date().toISOString()
                        },
                        created_at: new Date().toISOString()
                    }
                ]);
            }
        } catch (auditErr) {
            console.warn('Template update audit log notice:', auditErr.message);
        }

        return NextResponse.json({
            success: true,
            template: saved,
            message: 'შაბლონი წარმატებით შეინახა'
        });
    } catch (err) {
        console.error('Error saving email template:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');
        const userEmail = searchParams.get('user') || 'admin';

        if (!key) {
            return NextResponse.json({ error: 'Template key required' }, { status: 400 });
        }

        const reset = await resetTemplate(key);

        try {
            const supabase = getSupabaseAdminClient();
            if (supabase) {
                await supabase.from('audit_logs').insert([
                    {
                        user_email: userEmail,
                        action: 'EMAIL_TEMPLATE_RESET',
                        table_name: 'email_templates',
                        record_id: key,
                        details: { key, reset_at: new Date().toISOString() },
                        created_at: new Date().toISOString()
                    }
                ]);
            }
        } catch (e) {
            console.warn('Audit log notice:', e);
        }

        return NextResponse.json({
            success: true,
            template: reset,
            message: 'შაბლონი დაბრუნდა საწყის პარამეტრებზე'
        });
    } catch (err) {
        console.error('Error resetting template:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
