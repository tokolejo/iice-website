import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../../lib/supabase/admin';
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
        const formData = await request.formData();

        const firstName = formData.get('firstName') || '';
        const lastName = formData.get('lastName') || '';
        const birthDate = formData.get('birthDate') || null;
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
                error: 'სავალდებულო ველები არ არის შევსებული'
            }, { status: 400 });
        }

        const supabase = getClient();
        if (!supabase) {
            // Local fallback simulation
            const fallbackCode = `IICE-2026-${Math.floor(100 + Math.random() * 900)}`;
            return NextResponse.json({
                success: true,
                abstractNumber: fallbackCode,
                name: `${firstName} ${lastName}`
            });
        }

        let geoUrl = null;
        let engUrl = null;

        // Ensure storage bucket exists
        try {
            const { data: buckets } = await supabase.storage.listBuckets();
            const bucketExists = buckets?.some(b => b.name === 'conference-abstracts');
            if (!bucketExists) {
                await supabase.storage.createBucket('conference-abstracts', { public: true });
            }
        } catch (bErr) {
            console.warn('Storage bucket check notice:', bErr.message);
        }

        // Upload GEO File
        if (geoFile && typeof geoFile === 'object' && geoFile.name && geoFile.size > 0) {
            try {
                const ext = geoFile.name.split('.').pop() || 'docx';
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
                }
            } catch (err) {
                console.warn('Upload GEO file error:', err);
            }
        }

        // Upload ENG File
        if (engFile && typeof engFile === 'object' && engFile.name && engFile.size > 0) {
            try {
                const ext = engFile.name.split('.').pop() || 'docx';
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
                }
            } catch (err) {
                console.warn('Upload ENG file error:', err);
            }
        }

        // Insert into database
        const insertPayload = {
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

        const { data, error } = await supabase
            .from('conference_registrations_2026')
            .insert([insertPayload])
            .select('*')
            .single();

        if (error) {
            console.error('Conference DB insert error:', error);
            throw error;
        }

        const assignedCode = data?.abstract_number || `IICE-2026-${Math.floor(100 + Math.random() * 900)}`;

        // Capture client IP and User Agent for audit
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Record audit log
        try {
            await supabase.from('audit_logs').insert([
                {
                    user_email: email,
                    action: 'CONFERENCE_REGISTER',
                    table_name: 'conference_registrations_2026',
                    record_id: data?.id ? String(data.id) : null,
                    details: {
                        abstractNumber: assignedCode,
                        applicant: `${firstName} ${lastName}`,
                        email,
                        affiliation,
                        presentationTitle,
                        thematicTopic,
                        hasGeoFile: !!geoUrl,
                        hasEngFile: !!engUrl,
                        ip,
                        userAgent: userAgent.slice(0, 160)
                    },
                    created_at: new Date().toISOString()
                }
            ]);
        } catch (auditErr) {
            console.warn('Conference audit log error:', auditErr.message);
        }

        return NextResponse.json({
            success: true,
            abstractNumber: assignedCode,
            name: `${firstName} ${lastName}`,
            id: data?.id
        });
    } catch (err) {
        console.error('Conference registration route error:', err);
        return NextResponse.json({
            error: err.message || 'სერვერის შეცდომა რეგისტრაციისას'
        }, { status: 500 });
    }
}
