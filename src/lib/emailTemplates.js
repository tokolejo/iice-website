/**
 * Email Templates Module for IICE 2026 Conference
 * 
 * Includes:
 * 1. Default registration confirmation template (Georgian & English)
 * 2. Acceptance & Invitation letter templates
 * 3. Status update notification templates (Revision, Rejection)
 * 4. Custom/freeform admin email template
 * 5. Dynamic variable substitution helper ({first_name}, {abstract_number}, etc.)
 */

import { getTopicLabel, getTitulationLabel } from './conferenceConstants.js';

/**
 * Replaces placeholders like {first_name}, {abstract_number}, etc. in a text/html string
 */
export function replacePlaceholders(content, vars = {}) {
    if (!content || typeof content !== 'string') return '';
    let result = content;

    const map = {
        '{name}': `${vars.first_name || ''} ${vars.last_name || ''}`.trim() || 'მონაწილე',
        '{first_name}': vars.first_name || '',
        '{last_name}': vars.last_name || '',
        '{email}': vars.email || '',
        '{abstract_number}': vars.abstract_number || vars.abstractNumber || 'IICE-2026',
        '{presentation_title}': vars.presentation_title || vars.presentationTitle || '',
        '{thematic_topic}': getTopicLabel(vars.thematic_topic || vars.thematicTopic || ''),
        '{affiliation}': vars.affiliation || '',
        '{citizenship}': vars.citizenship || '',
        '{presentation_type}': (vars.presentation_type === 'oral' || vars.presentationType === 'oral') ? 'ზეპირი (Oral)' : 'სასტენდო (Poster)',
        '{attendance_type}': (vars.is_attending_in_person || vars.isAttendingInPerson) ? 'პირისპირ (In-Person)' : 'ონლაინ (Online)',
        '{co_authors}': vars.co_authors || vars.coAuthors || '—',
        '{date}': new Date().toLocaleDateString('ka-GE', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    for (const [key, val] of Object.entries(map)) {
        result = result.replaceAll(key, val);
    }

    return result;
}

/**
 * Responsive HTML wrapper with IICE academic branding
 */
export function wrapInEmailLayout({ title, contentHtml, previewText = '' }) {
    const currentYear = new Date().getFullYear();

    return `<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'IICE 2026'}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        table { border-collapse: collapse; }
        img { border: 0; outline: none; text-decoration: none; }
        a { color: #60318e; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
        .email-container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); }
        .badge { display: inline-block; padding: 6px 14px; background: #f3e8ff; color: #60318e; border-radius: 10px; font-weight: 700; font-size: 13px; font-family: monospace; }
        .info-card { background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 14px; padding: 18px; margin: 20px 0; }
        .button { display: inline-block; padding: 12px 28px; background-color: #60318e; color: #ffffff !important; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; }
        @media only screen and (max-width: 640px) {
            .email-container { width: 100% !important; border-radius: 0 !important; border: none !important; }
            .content-padding { padding: 24px 18px !important; }
        }
    </style>
</head>
<body style="background-color: #f8fafc; padding: 24px 12px;">
    ${previewText ? `<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</div>` : ''}

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <div class="email-container">
                    <!-- Academic Header -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #2e0d42 0%, #60318e 100%);">
                        <tr>
                            <td class="content-padding" style="padding: 32px 36px; text-align: center;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="padding-bottom: 12px;">
                                            <div style="background: rgba(255, 255, 255, 0.15); border-radius: 16px; padding: 10px 18px; display: inline-block; border: 1px solid rgba(255, 255, 255, 0.2);">
                                                <span style="color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
                                                    IICE 2026 CONFERENCE
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <h1 style="color: #ffffff; font-size: 20px; font-weight: 900; line-height: 1.3; margin: 0 0 6px 0; letter-spacing: -0.3px;">
                                                თსუ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი
                                            </h1>
                                            <p style="color: rgba(255, 255, 255, 0.85); font-size: 13px; margin: 0; font-weight: 500;">
                                                TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Body Content -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="content-padding" style="padding: 36px 36px; color: #1e293b; font-size: 14px; line-height: 1.6;">
                                ${contentHtml}
                            </td>
                        </tr>
                    </table>

                    <!-- Official Footer -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f8fafc; border-top: 1px solid #e2e8f0;">
                        <tr>
                            <td class="content-padding" style="padding: 24px 36px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.5;">
                                <p style="margin: 0 0 8px 0; font-weight: 700; color: #334155;">
                                    საორგანიზაციო კომიტეტი / Organizing Committee — IICE 2026
                                </p>
                                <p style="margin: 0 0 10px 0;">
                                    თბილისი, საქართველო • 2026 წლის 24-26 სექტემბერი<br>
                                    Tbilisi, Georgia • September 24-26, 2026
                                </p>
                                <p style="margin: 0 0 6px 0;">
                                    ელ-ფოსტა: <a href="mailto:iice@tsu.ge" style="color: #60318e;">iice@tsu.ge</a> &nbsp;|&nbsp; 
                                    ვებგვერდი: <a href="https://iice.tsu.ge" target="_blank" style="color: #60318e;">iice.tsu.ge</a>
                                </p>
                                <p style="margin: 12px 0 0 0; font-size: 11px; color: #94a3b8;">
                                    © ${currentYear} თსუ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი. ყველა უფლება დაცულია.
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

/**
 * 1. Default Registration Confirmation Template (Bilingual Georgian / English)
 * Note: Can easily be replaced or customized by editing this function.
 */
export function getRegistrationConfirmationTemplate(data) {
    const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'მონაწილე / Participant';
    const code = data.abstract_number || data.abstractNumber || 'IICE-2026';
    const title = data.presentation_title || data.presentationTitle || 'N/A';
    const topic = getTopicLabel(data.thematic_topic || data.thematicTopic || '');
    const presType = (data.presentation_type === 'oral' || data.presentationType === 'oral') ? 'ზეპირი მოხსენება (Oral)' : 'სასტენდო მოხსენება (Poster)';
    const attendance = (data.is_attending_in_person || data.isAttendingInPerson) ? 'პირისპირ (In-Person)' : 'ონლაინ (Online)';
    const affiliation = data.affiliation || 'N/A';
    const coAuthors = data.co_authors || data.coAuthors || null;

    const subject = `თსუ IICE 2026: რეგისტრაციის დადასტურება / Registration Confirmation (${code})`;

    const contentHtml = `
        <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge">${code}</span>
            <h2 style="color: #1e293b; font-size: 18px; font-weight: 800; margin: 12px 0 4px 0;">
                თქვენი რეგისტრაცია წარმატებით მიღებულია!
            </h2>
            <p style="color: #64748b; font-size: 13px; margin: 0;">
                Your conference registration has been successfully received.
            </p>
        </div>

        <p style="font-size: 14px; margin: 0 0 16px 0;">
            <strong>პატივცემულო ${fullName},</strong>
        </p>
        <p style="font-size: 13px; color: #334155; margin: 0 0 16px 0; line-height: 1.6;">
            გმადლობთ თსუ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის 70 წლის იუბილესადმი მიძღვნილ საერთაშორისო სამეცნიერო კონფერენციაში (<strong>IICE 2026</strong>) რეგისტრაციისთვის.
        </p>

        <!-- Details Card -->
        <div class="info-card">
            <h3 style="color: #60318e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; margin: 0 0 12px 0;">
                განაცხადის დეტალები / Submission Summary
            </h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 13px; color: #1e293b;">
                <tr>
                    <td width="35%" style="color: #64748b; font-weight: 600; padding: 4px 0;">თეზისის ნომერი:</td>
                    <td style="font-weight: 800; color: #60318e; font-family: monospace;">${code}</td>
                </tr>
                <tr>
                    <td style="color: #64748b; font-weight: 600; padding: 4px 0;">მოხსენების სათაური:</td>
                    <td style="font-weight: 700; color: #0f172a;">„${title}“</td>
                </tr>
                <tr>
                    <td style="color: #64748b; font-weight: 600; padding: 4px 0;">სამეცნიერო სექცია:</td>
                    <td style="font-weight: 600; color: #334155;">${topic}</td>
                </tr>
                <tr>
                    <td style="color: #64748b; font-weight: 600; padding: 4px 0;">ფორმატი:</td>
                    <td style="font-weight: 600; color: #334155;">${presType} • ${attendance}</td>
                </tr>
                <tr>
                    <td style="color: #64748b; font-weight: 600; padding: 4px 0;">ორგანიზაცია:</td>
                    <td style="color: #334155;">${affiliation}</td>
                </tr>
                ${coAuthors ? `<tr>
                    <td style="color: #64748b; font-weight: 600; padding: 4px 0;">თანაავტორები:</td>
                    <td style="color: #334155;">${coAuthors}</td>
                </tr>` : ''}
            </table>
        </div>

        <h4 style="color: #0f172a; font-size: 13px; font-weight: 800; margin: 20px 0 8px 0;">
            შემდეგი ნაბიჯები / Next Steps:
        </h4>
        <ul style="margin: 0 0 20px 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.6;">
            <li>საორგანიზაციო კომიტეტი და ექსპერტთა საბჭო განიხილავს თქვენ მიერ წარმოდგენილ თეზისს.</li>
            <li>თეზისის მიღების ოფიციალური შეტყობინება (Acceptance Letter) და პროგრამის განრიგი გამოგეგზავნებათ ამავე ელ-ფოსტის მისამართზე.</li>
            <li>კითხვების შემთხვევაში შეგიძლიათ დაგვიკავშირდეთ: <a href="mailto:iice@tsu.ge">iice@tsu.ge</a>.</li>
        </ul>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;">

        <!-- English Section -->
        <p style="font-size: 13px; color: #334155; margin: 0 0 12px 0; line-height: 1.6;">
            <strong>Dear ${fullName},</strong><br>
            Thank you for registering for the International Scientific Conference dedicated to the 70th Anniversary of TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry (<strong>IICE 2026</strong>), held in Tbilisi, Georgia on September 24-26, 2026.
        </p>
        <p style="font-size: 12px; color: #64748b; margin: 0; line-height: 1.5;">
            Your abstract is currently under peer-review by the Scientific Committee. You will receive an official notification and acceptance letter shortly. Please keep your Abstract Reference Code (<strong>${code}</strong>) for any future correspondence.
        </p>
    `;

    const previewText = `თქვენი რეგისტრაცია წარმატებით მიღებულია (კოდი: ${code}). მოხსენება: ${title}`;

    return {
        subject,
        html: wrapInEmailLayout({
            title: subject,
            contentHtml,
            previewText
        }),
        text: `IICE 2026 - რეგისტრაციის დადასტურება\n\nპატივცემულო ${fullName},\nთქვენი რეგისტრაცია წარმატებით მიღებულია.\n\nთეზისის ნომერი: ${code}\nმოხსენების სათაური: ${title}\nსექცია: ${topic}\nფორმატი: ${presType} (${attendance})\nორგანიზაცია: ${affiliation}\n\nსაორგანიზაციო კომიტეტი განიხილავს თქვენს თეზისს და შედეგებს გაცნობებთ ამავე მეილზე.\n\nსაორგანიზაციო კომიტეტი IICE 2026\niice@tsu.ge | https://iice.tsu.ge`
    };
}

/**
 * 2. Official Acceptance Letter Template Preset (Georgian)
 */
export function getAcceptanceLetterGeorgianTemplate(data = {}) {
    const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim() || '{name}';
    const code = data.abstract_number || '{abstract_number}';
    const title = data.presentation_title || '{presentation_title}';
    const topic = data.thematic_topic ? getTopicLabel(data.thematic_topic) : '{thematic_topic}';
    const presType = (data.presentation_type === 'oral') ? 'ზეპირი მოხსენება (Oral Presentation)' : 'სასტენდო მოხსენება (Poster Presentation)';
    const todayFormatted = new Date().toLocaleDateString('ka-GE', { year: 'numeric', month: 'long', day: 'numeric' });

    const subject = `IICE 2026: ოფიციალური მიღებისა და მოწვევის წერილი (${code})`;

    const bodyText = `ოფიციალური მიღებისა და მოწვევის წერილი
რეგისტრაციის №: ${code}
თარიღი: ${todayFormatted}

ადრესატი: ${fullName}
დაწესებულება: ${data.affiliation || '{affiliation}'}
ქვეყანა: ${data.citizenship || 'საქართველო'}

პატივცემულო კოლეგა,

თსუ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წლის იუბილესადმი მიძღვნილი საერთაშორისო სამეცნიერო კონფერენციის (IICE 2026) საორგანიზაციო კომიტეტის სახელით გაცნობებთ, რომ თქვენ მიერ წარმოდგენილი თეზისი:

„${title}“

ოფიციალურად განხილულ და მიღებულ იქნა კონფერენციის სამეცნიერო პროგრამაში:
>> ${presType} <<
სექცია: „${topic}“

კონფერენცია გაიმართება ქ. თბილისში, 2026 წლის 24-26 სექტემბერს.
მოხარული ვიქნებით თქვენი მობრძანებით და კონფერენციის მუშაობაში მონაწილეობის მიღებით.

წინამდებარე ოფიციალური წერილი ადასტურებს თქვენი თეზისის ჩართვას IICE 2026 საერთაშორისო კონფერენციის სამეცნიერო შრომათა კრებულში.

პატივისცემით,
საორგანიზაციო კომიტეტი
თსუ რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი
ელ-ფოსტა: iice@tsu.ge | ვებგვერდი: https://iice.tsu.ge`;

    return { subject, bodyText };
}

/**
 * 3. Official Acceptance Letter Template Preset (English)
 */
export function getAcceptanceLetterEnglishTemplate(data = {}) {
    const fullName = `${data.titulation ? data.titulation.toUpperCase() + '. ' : ''}${data.first_name || ''} ${data.last_name || ''}`.trim() || '{name}';
    const code = data.abstract_number || '{abstract_number}';
    const title = data.presentation_title || '{presentation_title}';
    const topic = data.thematic_topic ? getTopicLabel(data.thematic_topic, 'en') : '{thematic_topic}';
    const presType = (data.presentation_type === 'oral') ? 'Oral Presentation' : 'Poster Presentation';
    const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const subject = `IICE 2026: Official Acceptance & Invitation Letter (${code})`;

    const bodyText = `OFFICIAL ACCEPTANCE & INVITATION LETTER
Reference No: ${code}
Date: ${todayFormatted}

To: ${fullName}
Affiliation: ${data.affiliation || '{affiliation}'}
Country: ${data.citizenship || 'Georgia'}

Dear Colleague,

On behalf of the Scientific and Organizing Committee of the International Scientific Conference dedicated to the 70th Anniversary of TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry (IICE 2026), we are pleased to inform you that your abstract entitled:

"${title}"

has been officially reviewed and ACCEPTED for inclusion in the conference program as an:
>> ${presType} <<
Under the thematic topic: "${topic}"

The conference will take place in Tbilisi, Georgia, on September 24-26, 2026.
You are cordially invited to present your research findings and participate in the academic sessions.

This official acceptance letter confirms the inclusion of your abstract into the registered proceedings of the IICE 2026 Conference.

We look forward to welcoming you to Tbilisi.

Sincerely,
Organizing Committee
TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry
Email: iice@tsu.ge | Web: https://iice.tsu.ge`;

    return { subject, bodyText };
}

/**
 * 4. Revision Needed Template Preset
 */
export function getRevisionNeededTemplate(data = {}) {
    const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim() || '{name}';
    const code = data.abstract_number || '{abstract_number}';
    const title = data.presentation_title || '{presentation_title}';

    const subject = `IICE 2026: თეზისის გადამუშავების მოთხოვნა (${code})`;

    const bodyText = `პატივცემულო ${fullName},

გაცნობებთ, რომ IICE 2026 საერთაშორისო კონფერენციაზე თქვენ მიერ წარმოდგენილი თეზისი:
„${title}“ (კოდი: ${code})
განიხილა სარედაქციო კოლეგიამ და საჭიროებს გარკვეულ გადამუშავებას/დაზუსტებას.

გთხოვთ, გაითვალისწინოთ შემდეგი შენიშვნები:
- [აქ ჩაწერეთ კონკრეტული შენიშვნა ან მოთხოვნა]

შესწორებული ფაილის გადმოგზავნა შეგიძლიათ საპასუხო მეილით ან კონფერენციის ვებგვერდიდან.

პატივისცემით,
IICE 2026 საორგანიზაციო კომიტეტი
ელ-ფოსტა: iice@tsu.ge`;

    return { subject, bodyText };
}

/**
 * Converts plain text/markdown paragraphs to styled HTML blocks for custom emails
 */
export function formatCustomEmailHtml(bodyText) {
    if (!bodyText) return '';

    // Convert newlines to paragraphs or linebreaks
    const paragraphs = bodyText.split(/\n{2,}/).map(para => {
        const lines = para.trim().split('\n').map(line => {
            let l = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            if (l.startsWith('>>') && l.endsWith('<<')) {
                return `<div style="text-align: center; margin: 12px 0;"><span style="display: inline-block; padding: 6px 16px; background: #f3e8ff; color: #60318e; font-weight: 800; border-radius: 8px; font-size: 14px;">${l.slice(2, -2).trim()}</span></div>`;
            }
            if (l.startsWith('- ') || l.startsWith('* ')) {
                return `<li style="margin-bottom: 4px;">${l.substring(2)}</li>`;
            }
            return l;
        }).join('<br>');

        if (lines.includes('<li>')) {
            return `<ul style="margin: 12px 0; padding-left: 20px; color: #334155;">${lines}</ul>`;
        }
        return `<p style="margin: 0 0 14px 0; line-height: 1.6; color: #334155;">${lines}</p>`;
    }).join('');

    return paragraphs;
}
