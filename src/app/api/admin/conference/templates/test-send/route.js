import { NextResponse } from 'next/server';
import { renderTemplateWithData } from '../../../../../../lib/emailTemplates.js';
import { sendEmail } from '../../../../../../lib/email.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { subject, body_text, targetEmail = 'tokolejo@gmail.com' } = body;

        if (!targetEmail || !targetEmail.trim()) {
            return NextResponse.json({ error: 'მიმღების მეილი სავალდებულოა' }, { status: 400 });
        }

        if (!subject || !body_text) {
            return NextResponse.json({ error: 'სათაური და ტექსტი სავალდებულოა' }, { status: 400 });
        }

        const sampleData = {
            first_name: 'ნიკოლოზ',
            last_name: 'ნიორაძე',
            email: targetEmail,
            abstract_number: 'IICE-2026-TEST',
            presentation_title: 'ნანოსტრუქტურული მასალების ელექტროქიმიური სინთეზი',
            thematic_topic: 'ნანოპროცესები და ნანოტექნოლოგიები',
            presentation_type: 'oral',
            is_attending_in_person: true,
            affiliation: 'თსუ რ. აგლაძის ინსტიტუტი',
            citizenship: 'საქართველო',
            co_authors: 'გ. ტატიშვილი, თ. ლეჟავა'
        };

        const rendered = renderTemplateWithData({
            subject: `[სატესტო] ${subject}`,
            bodyText: body_text,
            data: sampleData
        });

        const result = await sendEmail({
            to: targetEmail.trim(),
            subject: rendered.subject,
            html: rendered.html,
            text: rendered.text
        });

        if (!result.success) {
            return NextResponse.json({
                error: result.error || 'ტესტის გაგზავნა ვერ მოხერხდა'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            simulated: result.simulated || false,
            message: `სატესტო წერილი წარმატებით გაეგზავნა: ${targetEmail}`
        });

    } catch (err) {
        console.error('Test-send template exception:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
