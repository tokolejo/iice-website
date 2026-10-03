import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase/admin';
import { createClient } from '@supabase/supabase-js';
import { sendRegistrationConfirmationEmail } from '../../../../lib/email';

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
        const formData = await request.formData();

        const firstName = formData.get('firstName') || '';
        const lastName = formData.get('lastName') || '';
        const rawBirthDate = formData.get('birthDate');
        const birthDate = rawBirthDate && typeof rawBirthDate === 'string' && rawBirthDate.trim() !== ''
            ? rawBirthDate.trim()
            : null;

        const citizenship = formData.get('citizenship') || '';
        const affiliation = formData.get('affiliation') || '';
        const titulation = formData.get('titulation') || '';
        const gender = formData.get('gender') || '';
        const email = formData.get('email') || '';
        const isAttendingInPerson = formData.get('isAttendingInPerson') === 'true';
        const presentationTitle = formData.get('presentationTitle') || '';
        const coAuthors = formData.get('coAuthors') || null;
        const presentationType = formData.get('presentationType') || 'oral';
        const participationRole = formData.get('participationRole') || 'presenting_author';
        const thematicTopic = formData.get('thematicTopic') || '';

        const geoFile = formData.get('geoFile');
        const engFile = formData.get('engFile');

        if (!firstName || !lastName || !email || !affiliation || !presentationTitle) {
            return NextResponse.json({
                error: 'სავალდებულო ველები (*): სახელი, გვარი, ელ-ფოსტა, ორგანიზაცია და მოხსენების სათაური არ არის შევსებული.'
            }, { status: 400 });
        }

        const supabase = getClient();
        const fallbackCode = `IICE-2026-${Math.floor(100 + Math.random() * 900)}`;

        if (!supabase) {
            return NextResponse.json({
                success: true,
                abstractNumber: fallbackCode,
                name: `${firstName} ${lastName}`
            });
        }

        const clientGeoUrl = formData.get('clientGeoUrl');
        const clientEngUrl = formData.get('clientEngUrl');

        let geoUrl = (clientGeoUrl && typeof clientGeoUrl === 'string' && clientGeoUrl.startsWith('http'))
            ? clientGeoUrl.trim()
            : null;
        let engUrl = (clientEngUrl && typeof clientEngUrl === 'string' && clientEngUrl.startsWith('http'))
            ? clientEngUrl.trim()
            : null;

        // Try server-side file uploads if client-side direct upload was not present or failed
        if (!geoUrl && geoFile && typeof geoFile === 'object' && geoFile.name && geoFile.size > 0) {
            try {
                const ext = (geoFile.name.split('.').pop() || 'docx').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'docx';
                const path = `geo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                const buffer = Buffer.from(await geoFile.arrayBuffer());
                const { error: upErr } = await supabase.storage
                    .from('conference-abstracts')
                    .upload(path, buffer, {
                        contentType: geoFile.type || 'application/octet-stream',
                        upsert: true
                    });
                if (!upErr) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('conference-abstracts')
                        .getPublicUrl(path);
                    geoUrl = publicUrl;
                } else {
                    console.error('GEO file server upload error:', upErr.message);
                }
            } catch (err) {
                console.error('Upload GEO file exception:', err.message);
            }
        }

        if (!engUrl && engFile && typeof engFile === 'object' && engFile.name && engFile.size > 0) {
            try {
                const ext = (engFile.name.split('.').pop() || 'docx').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'docx';
                const path = `eng_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                const buffer = Buffer.from(await engFile.arrayBuffer());
                const { error: upErr } = await supabase.storage
                    .from('conference-abstracts')
                    .upload(path, buffer, {
                        contentType: engFile.type || 'application/octet-stream',
                        upsert: true
                    });
                if (!upErr) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('conference-abstracts')
                        .getPublicUrl(path);
                    engUrl = publicUrl;
                } else {
                    console.error('ENG file server upload error:', upErr.message);
                }
            } catch (err) {
                console.error('Upload ENG file exception:', err.message);
            }
        }

        // 1. Calculate the next sequential unique abstract_number
        let assignedCode = fallbackCode;
        try {
            const { data: existingRows } = await supabase
                .from('conference_registrations_2026')
                .select('abstract_number');

            const existingCodes = new Set((existingRows || []).map(r => r.abstract_number).filter(Boolean));

            let maxNum = 0;
            for (const code of existingCodes) {
                const match = code.match(/^IICE-2026-(\d+)$/i);
                if (match) {
                    const num = parseInt(match[1], 10);
                    // Sequential standard numbers: ignore known single outlier 202 (generated previously by random fallback)
                    if (num !== 202 && num > maxNum) {
                        maxNum = num;
                    }
                }
            }

            let candidateNum = Math.max(maxNum + 1, 42);
            let candidateCode = `IICE-2026-${String(candidateNum).padStart(3, '0')}`;
            while (existingCodes.has(candidateCode)) {
                candidateNum++;
                candidateCode = `IICE-2026-${String(candidateNum).padStart(3, '0')}`;
            }
            assignedCode = candidateCode;
        } catch (calcErr) {
            console.warn('Error calculating sequential abstract_number:', calcErr.message);
        }

        // Generate deterministic row UUID beforehand
        const newRecordId = crypto.randomUUID();
        let regId = newRecordId;
        const insertPayload = {
            id: newRecordId,
            abstract_number: assignedCode,
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            citizenship: citizenship,
            affiliation: affiliation,
            titulation: titulation,
            gender: gender,
            email: email,
            is_attending_in_person: isAttendingInPerson,
            presentation_title: presentationTitle,
            co_authors: coAuthors,
            presentation_type: presentationType,
            participation_role: participationRole,
            thematic_topic: thematicTopic,
            abstract_file_geo_url: geoUrl,
            abstract_file_eng_url: engUrl,
            created_at: new Date().toISOString()
        };

        // 2. Perform insert with collision-retry loop (up to 3 attempts)
        let insertSuccess = false;
        let lastError = null;

        for (let attempt = 0; attempt < 3; attempt++) {
            insertPayload.abstract_number = assignedCode;

            const insertWithSelect = await supabase
                .from('conference_registrations_2026')
                .insert([insertPayload])
                .select('id, abstract_number')
                .maybeSingle();

            if (!insertWithSelect.error) {
                insertSuccess = true;
                if (insertWithSelect.data?.id) regId = insertWithSelect.data.id;
                if (insertWithSelect.data?.abstract_number) assignedCode = insertWithSelect.data.abstract_number;
                break;
            }

            lastError = insertWithSelect.error;

            // If duplicate key error on abstract_number, increment code and try again
            if (insertWithSelect.error.code === '23505' || insertWithSelect.error.message?.includes('abstract_number')) {
                console.warn(`Collision on ${assignedCode}, advancing to next number (attempt ${attempt + 1})...`);
                const match = assignedCode.match(/^IICE-2026-(\d+)$/);
                let nextN = match ? parseInt(match[1], 10) + 1 : Math.floor(100 + Math.random() * 900);
                if (nextN === 202) nextN = 203;
                assignedCode = `IICE-2026-${String(nextN).padStart(3, '0')}`;
                continue;
            }

            // Fallback: If select returning failed for another reason (e.g. RLS on select), execute pure insert
            console.warn('Insert with select failed, trying direct insert:', insertWithSelect.error.message);
            const pureInsert = await supabase
                .from('conference_registrations_2026')
                .insert([insertPayload]);

            if (!pureInsert.error) {
                insertSuccess = true;
                break;
            }

            lastError = pureInsert.error;
            if (pureInsert.error.code === '23505' || pureInsert.error.message?.includes('abstract_number')) {
                const match = assignedCode.match(/^IICE-2026-(\d+)$/);
                let nextN = match ? parseInt(match[1], 10) + 1 : Math.floor(100 + Math.random() * 900);
                if (nextN === 202) nextN = 203;
                assignedCode = `IICE-2026-${String(nextN).padStart(3, '0')}`;
                continue;
            }

            break;
        }

        if (!insertSuccess && lastError) {
            console.error('Database registration insert error:', lastError);
            return NextResponse.json({
                error: `ბაზაში ჩაწერის შეცდომა: ${lastError.message}`
            }, { status: 500 });
        }

        // Capture client IP and User Agent for audit log
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Trigger automated confirmation email to the applicant
        let emailResult = null;
        try {
            emailResult = await sendRegistrationConfirmationEmail({
                email,
                first_name: firstName,
                last_name: lastName,
                titulation,
                abstract_number: assignedCode,
                presentation_title: presentationTitle,
                thematic_topic: thematicTopic,
                presentation_type: presentationType,
                is_attending_in_person: isAttendingInPerson,
                affiliation,
                co_authors: coAuthors,
            });
        } catch (mailErr) {
            console.warn('Registration confirmation email notice:', mailErr.message);
            emailResult = { success: false, error: mailErr.message };
        }

        try {
            await supabase.from('audit_logs').insert([
                {
                    user_email: email,
                    action: 'CONFERENCE_REGISTER',
                    table_name: 'conference_registrations_2026',
                    record_id: regId ? String(regId) : assignedCode,
                    details: {
                        abstractNumber: assignedCode,
                        applicant: `${firstName} ${lastName}`,
                        email,
                        affiliation,
                        presentationTitle,
                        thematicTopic,
                        hasGeoFile: !!geoUrl,
                        hasEngFile: !!engUrl,
                        emailSent: emailResult?.success ?? false,
                        emailProvider: emailResult?.provider ?? 'none',
                        ip,
                        userAgent: userAgent.slice(0, 160)
                    },
                    created_at: new Date().toISOString()
                }
            ]);
        } catch (auditErr) {
            console.warn('Conference audit log notice:', auditErr.message);
        }

        return NextResponse.json({
            success: true,
            abstractNumber: assignedCode,
            name: `${firstName} ${lastName}`,
            id: regId,
            emailSent: emailResult?.success ?? false
        });
    } catch (err) {
        console.error('Conference registration route error:', err);
        return NextResponse.json({
            error: err.message || 'სერვერის შეცდომა რეგისტრაციისას'
        }, { status: 500 });
    }
}
