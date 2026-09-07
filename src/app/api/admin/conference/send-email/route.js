import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../../lib/supabase/admin';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '../../../../../lib/email';
import { replacePlaceholders, wrapInEmailLayout, formatCustomEmailHtml } from '../../../../../lib/emailTemplates';

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
        const {
            recipients,
            subject,
            bodyText,
            adminEmail = 'admin@iice.ge',
            templateType = 'custom'
        } = body;

        if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
            return NextResponse.json({ error: 'მიმღებთა სია ცარიელია' }, { status: 400 });
        }

        if (!subject || !subject.trim()) {
            return NextResponse.json({ error: 'წერილის თემა (Subject) სავალდებულოა' }, { status: 400 });
        }

        if (!bodyText || !bodyText.trim()) {
            return NextResponse.json({ error: 'წერილის შინაარსი (Body) სავალდებულოა' }, { status: 400 });
        }

        const supabase = getClient(request);
        const results = [];
        let sentCount = 0;
        let failedCount = 0;

        // Process each recipient to substitute individualized placeholders
        for (const recipient of recipients) {
            if (!recipient.email) {
                failedCount++;
                results.push({ email: 'unknown', success: false, error: 'Email missing' });
                continue;
            }

            // Substitute placeholders per recipient
            const personalizedSubject = replacePlaceholders(subject, recipient);
            const personalizedBody = replacePlaceholders(bodyText, recipient);

            const contentHtml = formatCustomEmailHtml(personalizedBody);
            const fullHtml = wrapInEmailLayout({
                title: personalizedSubject,
                contentHtml,
                previewText: personalizedBody.slice(0, 100)
            });

            try {
                const res = await sendEmail({
                    to: recipient.email,
                    subject: personalizedSubject,
                    html: fullHtml,
                    text: personalizedBody
                });

                if (res.success) {
                    sentCount++;
                    results.push({
                        email: recipient.email,
                        name: `${recipient.first_name || ''} ${recipient.last_name || ''}`.trim(),
                        abstractNumber: recipient.abstract_number,
                        success: true,
                        simulated: res.simulated || false,
                        provider: res.provider
                    });
                } else {
                    failedCount++;
                    results.push({
                        email: recipient.email,
                        success: false,
                        error: res.error
                    });
                }
            } catch (err) {
                failedCount++;
                results.push({
                    email: recipient.email,
                    success: false,
                    error: err.message
                });
            }
        }

        // Record in audit log
        if (supabase) {
            const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                request.headers.get('x-real-ip') ||
                'unknown';

            try {
                await supabase.from('audit_logs').insert([
                    {
                        user_email: adminEmail,
                        action: 'CONFERENCE_EMAIL_SENT',
                        table_name: 'conference_registrations_2026',
                        record_id: recipients.length === 1 ? (recipients[0].abstract_number || recipients[0].email) : 'bulk',
                        details: {
                            subject,
                            templateType,
                            totalRecipients: recipients.length,
                            sentCount,
                            failedCount,
                            recipientsSample: recipients.slice(0, 5).map(r => ({
                                email: r.email,
                                name: `${r.first_name || ''} ${r.last_name || ''}`.trim(),
                                abstractNumber: r.abstract_number
                            })),
                            ip
                        },
                        created_at: new Date().toISOString()
                    }
                ]);
            } catch (auditErr) {
                console.warn('Admin conference email audit notice:', auditErr.message);
            }
        }

        return NextResponse.json({
            success: true,
            total: recipients.length,
            sentCount,
            failedCount,
            results
        });

    } catch (err) {
        console.error('Conference send-email API error:', err);
        return NextResponse.json({
            error: err.message || 'სერვერის შეცდომა მეილის გაგზავნისას'
        }, { status: 500 });
    }
}
