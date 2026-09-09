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

export const SITE_URL = 'https://iice.ge';
export const CONTACT_EMAIL = 'info@iice.ge';

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
        '{date}': new Date().toLocaleDateString('ka-GE', { year: 'numeric', month: 'long', day: 'numeric' }),
        '{site_url}': SITE_URL,
        '{contact_email}': CONTACT_EMAIL
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
        .email-container a { color: #60318e; text-decoration: none; font-weight: 600; }
        .email-container a:hover { text-decoration: underline; }
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
                                                რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი
                                            </h1>
                                            <p style="color: rgba(255, 255, 255, 0.85); font-size: 13px; margin: 0; font-weight: 500;">
                                                R. Agladze Institute of Inorganic Chemistry and Electrochemistry
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
                                    თბილისი, საქართველო • 2026 წლის 25-27 ნოემბერი<br>
                                    Tbilisi, Georgia • November 25-27, 2026
                                </p>
                                <p style="margin: 0 0 6px 0;">
                                    ელ-ფოსტა: <a href="mailto:${CONTACT_EMAIL}" style="color: #60318e;">${CONTACT_EMAIL}</a> &nbsp;|&nbsp; 
                                    ვებგვერდი: <a href="${SITE_URL}" target="_blank" style="color: #60318e;">iice.ge</a>
                                </p>
                                <p style="margin: 12px 0 0 0; font-size: 11px; color: #94a3b8;">
                                    © ${currentYear} რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი. ყველა უფლება დაცულია.
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

/**
 * Standard System Default Templates
 */
export const DEFAULT_TEMPLATES = {
    registration_confirmation: {
        key: 'registration_confirmation',
        title: 'რეგისტრაციის დადასტურება (ავტომატური მეილი)',
        description: 'იგზავნება ავტომატურად მომხსენებლის რეგისტრაციისთანავე',
        subject: 'IICE 2026: რეგისტრაციის დადასტურება / Registration Confirmation ({abstract_number})',
        body_text: `თქვენი რეგისტრაცია წარმატებით მიღებულია! (Your conference registration has been successfully received).

პატივცემულო {name},

გმადლობთ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის 70 წლის იუბილესადმი მიძღვნილ საერთაშორისო სამეცნიერო კონფერენციაში (IICE 2026) რეგისტრაციისთვის.

განაცხადის დეტალები / Submission Summary:
- თეზისის ნომერი: {abstract_number}
- მოხსენების სათაური: „{presentation_title}“
- სამეცნიერო სექცია: {thematic_topic}
- ფორმატი: {presentation_type} • {attendance_type}
- ორგანიზაცია: {affiliation}
- თანაავტორები: {co_authors}

შემდეგი ნაბიჯები / Next Steps:
- საორგანიზაციო კომიტეტი და ექსპერტთა საბჭო განიხილავს თქვენ მიერ წარმოდგენილ თეზისს.
- თეზისის მიღების ოფიციალური შეტყობინება (Acceptance Letter) და პროგრამის განრიგი გამოგეგზავნებათ ამავე ელ-ფოსტის მისამართზე.
- კითხვების შემთხვევაში შეგიძლიათ დაგვიკავშირდეთ: info@iice.ge

Dear {name},
Thank you for registering for the International Scientific Conference dedicated to the 70th Anniversary of R. Agladze Institute of Inorganic Chemistry and Electrochemistry (IICE 2026), held in Tbilisi, Georgia on November 25-27, 2026.

Your abstract is currently under peer-review by the Scientific Committee. You will receive an official notification and acceptance letter shortly. Please keep your Abstract Reference Code ({abstract_number}) for any future correspondence.

საორგანიზაციო კომიტეტი / Organizing Committee IICE 2026
info@iice.ge | https://iice.ge`
    },

    acceptance_ka: {
        key: 'acceptance_ka',
        title: 'ოფიციალური მიღების წერილი (ქართული)',
        description: 'ოფიციალური მიწვევისა და მიღების წერილი ქართულ ენაზე',
        subject: 'IICE 2026: ოფიციალური მიღებისა და მოწვევის წერილი ({abstract_number})',
        body_text: `ოფიციალური მიღებისა და მოწვევის წერილი
რეგისტრაციის №: {abstract_number}
თარიღი: {date}

ადრესატი: {name}
დაწესებულება: {affiliation}
ქვეყანა: {citizenship}

პატივცემულო კოლეგა,

რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წლის იუბილესადმი მიძღვნილი საერთაშორისო სამეცნიერო კონფერენციის (IICE 2026) საორგანიზაციო კომიტეტის სახელით გაცნობებთ, რომ თქვენ მიერ წარმოდგენილი თეზისი:

„{presentation_title}“

ოფიციალურად განხილულ და მიღებულ იქნა კონფერენციის სამეცნიერო პროგრამაში:
>> {presentation_type} <<
სექცია: „{thematic_topic}“

კონფერენცია გაიმართება ქ. თბილისში, 2026 წლის 25-27 ნოემბერს.
მოხარული ვიქნებით თქვენი მობრძანებით და კონფერენციის მუშაობაში მონაწილეობის მიღებით.

წინამდებარე ოფიციალური წერილი ადასტურებს თქვენი თეზისის ჩართვას IICE 2026 საერთაშორისო კონფერენციის სამეცნიერო შრომათა კრებულში.

პატივისცემით,
საორგანიზაციო კომიტეტი
რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი
ელ-ფოსტა: info@iice.ge | ვებგვერდი: https://iice.ge`
    },

    acceptance_en: {
        key: 'acceptance_en',
        title: 'Official Acceptance Letter (English)',
        description: 'Official acceptance & invitation letter in English',
        subject: 'IICE 2026: Official Acceptance & Invitation Letter ({abstract_number})',
        body_text: `OFFICIAL ACCEPTANCE & INVITATION LETTER
Reference No: {abstract_number}
Date: {date}

To: {name}
Affiliation: {affiliation}
Country: {citizenship}

Dear Colleague,

On behalf of the Scientific and Organizing Committee of the International Scientific Conference dedicated to the 70th Anniversary of R. Agladze Institute of Inorganic Chemistry and Electrochemistry (IICE 2026), we are pleased to inform you that your abstract entitled:

"{presentation_title}"

has been officially reviewed and ACCEPTED for inclusion in the conference program as an:
>> {presentation_type} <<
Under the thematic topic: "{thematic_topic}"

The conference will take place in Tbilisi, Georgia, on November 25-27, 2026.
You are cordially invited to present your research findings and participate in the academic sessions.

This official acceptance letter confirms the inclusion of your abstract into the registered proceedings of the IICE 2026 Conference.

We look forward to welcoming you to Tbilisi.

Sincerely,
Organizing Committee
R. Agladze Institute of Inorganic Chemistry and Electrochemistry
Email: info@iice.ge | Web: https://iice.ge`
    },

    revision_needed: {
        key: 'revision_needed',
        title: 'თეზისის გადამუშავების მოთხოვნა',
        description: 'შეტყობინება თეზისის შესწორების ან დაზუსტების მოთხოვნით',
        subject: 'IICE 2026: თეზისის გადამუშავების მოთხოვნა ({abstract_number})',
        body_text: `პატივცემულო {name},

გაცნობებთ, რომ IICE 2026 საერთაშორისო კონფერენციაზე თქვენ მიერ წარმოდგენილი თეზისი:
„{presentation_title}“ (კოდი: {abstract_number})
განიხილა სარედაქციო კოლეგიამ და საჭიროებს გარკვეულ გადამუშავებას/დაზუსტებას.

გთხოვთ, გაითვალისწინოთ შემდეგი შენიშვნები:
- [აქ ჩაწერეთ კონკრეტული შენიშვნა ან მოთხოვნა]

შესწორებული ფაილის გადმოგზავნა შეგიძლიათ საპასუხო მეილით ან კონფერენციის ვებგვერდიდან.

პატივისცემით,
IICE 2026 საორგანიზაციო კომიტეტი
ელ-ფოსტა: info@iice.ge | ვებგვერდი: https://iice.ge`
    },

    rejection: {
        key: 'rejection',
        title: 'უარყოფის შეტყობინება (Rejection Letter)',
        description: 'თეზისის უარყოფის ოფიციალური შეტყობინება',
        subject: 'IICE 2026: შეტყობინება თეზისის განხილვის შესახებ ({abstract_number})',
        body_text: `პატივცემულო {name},

გმადლობთ IICE 2026 საერთაშორისო სამეცნიერო კონფერენციით დაინტერესებისთვის და თეზისის: „{presentation_title}“ (კოდი: {abstract_number}) წარმოდგენისთვის.

გაცნობებთ, რომ სამეცნიერო კომიტეტის ექსპერტული შეფასების საფუძველზე, პროგრამაში ადგილების შეზღუდულობის გამო, თქვენი თეზისის ჩართვა მიმდინარე კონფერენციის პროგრამაში ვერ მოხერხდა.

გისურვებთ წარმატებებს შემდგომ სამეცნიერო და კვლევით საქმიანობაში.

პატივისცემით,
IICE 2026 საორგანიზაციო კომიტეტი
რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი
ელ-ფოსტა: info@iice.ge | https://iice.ge`
    },

    admin_invite: {
        key: 'admin_invite',
        title: 'ადმინისტრატორის / თანამშრომლის მოწვევა',
        description: 'მოწვევის წერილი მართვის პორტალზე წვდომის გასააქტიურებლად',
        subject: 'IICE მართვის პორტალი: მოწვევა სისტემაში ({site_url})',
        body_text: `მოგესალმებით,

თქვენ მოწვეული ხართ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის (IICE) ოფიციალური ვებ-პორტალის მართვის სისტემაში.

პორტალზე შესასვლელად გამოიყენეთ თქვენი სამსახურებრივი ელ-ფოსტის მისამართი:
ბმული: {site_url}/admin/login

ავტორიზაციის შემდეგ ხელმისაწვდომი იქნება თქვენთვის მონიჭებული როლების შესაბამისი ფუნქციონალი.

კითხვების შემთხვევაში დაუკავშირდით ადმინისტრაციას: {contact_email}

პატივისცემით,
IICE ადმინისტრაცია`
    },

    general_announcement: {
        key: 'general_announcement',
        title: 'ზოგადი საინფორმაციო შეტყობინება',
        description: 'უნივერსალური წერილი მონაწილეებისთვის ან თანამშრომლებისთვის',
        subject: 'IICE 2026: მნიშვნელოვანი საინფორმაციო შეტყობინება',
        body_text: `პატივცემულო კოლეგა {name},

გაცნობებთ IICE 2026 საერთაშორისო სამეცნიერო კონფერენციასთან დაკავშირებულ მნიშვნელოვან სიახლეს:

[აქ ჩაწერეთ საინფორმაციო ტექსტი]

დეტალური ინფორმაციისთვის ეწვიეთ ჩვენს ვებგვერდს: {site_url}
კითხვების შემთხვევაში დაგვიკავშირდით: {contact_email}

პატივისცემით,
საორგანიზაციო კომიტეტი
IICE 2026`
    }
};

/**
 * Renders an email given a template (or custom subject/body) and recipient data
 */
export function renderTemplateWithData({ subject, bodyText, data = {} }) {
    const personalizedSubject = replacePlaceholders(subject, data);
    const personalizedBody = replacePlaceholders(bodyText, data);

    const contentHtml = formatCustomEmailHtml(personalizedBody);
    const fullHtml = wrapInEmailLayout({
        title: personalizedSubject,
        contentHtml,
        previewText: personalizedBody.slice(0, 100)
    });

    return {
        subject: personalizedSubject,
        bodyText: personalizedBody,
        html: fullHtml,
        text: personalizedBody
    };
}

/**
 * 1. Default Registration Confirmation Template function
 */
export function getRegistrationConfirmationTemplate(data) {
    const tmpl = DEFAULT_TEMPLATES.registration_confirmation;
    return renderTemplateWithData({
        subject: tmpl.subject,
        bodyText: tmpl.body_text,
        data
    });
}

/**
 * 2. Official Acceptance Letter Template Preset (Georgian)
 */
export function getAcceptanceLetterGeorgianTemplate(data = {}) {
    const tmpl = DEFAULT_TEMPLATES.acceptance_ka;
    return {
        subject: replacePlaceholders(tmpl.subject, data),
        bodyText: replacePlaceholders(tmpl.body_text, data)
    };
}

/**
 * 3. Official Acceptance Letter Template Preset (English)
 */
export function getAcceptanceLetterEnglishTemplate(data = {}) {
    const tmpl = DEFAULT_TEMPLATES.acceptance_en;
    return {
        subject: replacePlaceholders(tmpl.subject, data),
        bodyText: replacePlaceholders(tmpl.body_text, data)
    };
}

/**
 * 4. Revision Needed Template Preset
 */
export function getRevisionNeededTemplate(data = {}) {
    const tmpl = DEFAULT_TEMPLATES.revision_needed;
    return {
        subject: replacePlaceholders(tmpl.subject, data),
        bodyText: replacePlaceholders(tmpl.body_text, data)
    };
}
