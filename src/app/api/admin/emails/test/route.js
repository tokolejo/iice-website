import { NextResponse } from 'next/server';
import { sendEmail } from '../../../../../lib/email.js';
import { renderTemplateWithData } from '../../../../../lib/emailTemplates.js';
import { getSupabaseAdminClient } from '../../../../../lib/supabase/admin.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            to,
            subject,
            body_text,
            sample_data = {},
            user_email = 'admin'
        } = body;

        if (!to || !subject || !body_text) {
            return NextResponse.json({
                error: 'ადრესატი (to), თემა (subject) და ტექსტი (body_text) სავალდებულოა'
            }, { status: 400 });
        }

        // Render template with placeholders replaced and official HTML layout
        const rendered = renderTemplateWithData({
            subject,
            bodyText: body_text,
            data: {
                first_name: sample_data.first_name || 'ნიკოლოზ',
                last_name: sample_data.last_name || 'ნიორაძე',
                email: to,
                abstract_number: sample_data.abstract_number || 'IICE-2026-TEST',
                presentation_title: sample_data.presentation_title || 'Electrochemical Synthesis of Nanostructured Materials',
                thematic_topic: sample_data.thematic_topic || 'ნანოპროცესები და ნანოტექნოლოგიები',
                presentation_type: sample_data.presentation_type || 'oral',
                is_attending_in_person: true,
                affiliation: sample_data.affiliation || 'თსუ რ. აგლაძის ინსტიტუტი',
                citizenship: 'საქართველო',
                co_authors: 'გ. ტატიშვილი, თ. ლეჟავა'
            }
        });

        const result = await sendEmail({
            to,
            subject: `[TEST] ${rendered.subject}`,
            html: rendered.html,
            text: rendered.text
        });

        // Record audit log
        try {
            const supabase = getSupabaseAdminClient();
            if (supabase) {
                await supabase.from('audit_logs').insert([
                    {
                        user_email,
                        action: 'EMAIL_TEST_SEND',
                        table_name: 'email_templates',
                        record_id: to,
                        details: {
                            recipient: to,
                            subject: rendered.subject,
                            simulated: result.simulated || false,
                            provider: result.provider || 'unknown',
                            id: result.id || null
                        },
                        created_at: new Date().toISOString()
                    }
                ]);
            }
        } catch (e) {
            console.warn('Audit log test email notice:', e.message);
        }

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: result.error || 'ტესტური წერილის გაგზავნა ვერ მოხერხდა'
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            simulated: result.simulated || false,
            message: result.simulated
                ? `სატესტო რეჟიმი: წერილი წარმატებით დაგენერირდა (${to})`
                : `ტესტური წერილი წარმატებით გაეგზავნა: ${to}`,
            id: result.id
        });
    } catch (err) {
        console.error('Error sending test email:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
