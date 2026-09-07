import { NextResponse } from 'next/server';
import { resetTemplate } from '../../../../../../lib/emailTemplateService.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { key } = body;

        if (!key) {
            return NextResponse.json({ error: 'შაბლონის გასაღები (key) სავალდებულოა' }, { status: 400 });
        }

        const reset = await resetTemplate(key);

        return NextResponse.json({
            success: true,
            template: reset,
            message: 'შაბლონი დაბრუნდა საწყის მდგომარეობაში'
        });
    } catch (err) {
        console.error('Error resetting email template:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
