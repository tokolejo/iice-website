/**
 * Email Dispatch Service for IICE 2026 Website
 * 
 * Supports:
 * - Resend API (Primary)
 * - SMTP fallback
 * - Safe simulated mode if no provider keys are configured
 */

import { Resend } from 'resend';
import { getRegistrationConfirmationTemplate, renderTemplateWithData } from './emailTemplates.js';
import { getTemplateByKey } from './emailTemplateService.js';

let resendInstance = null;

function getResend() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return null;
    if (!resendInstance) {
        resendInstance = new Resend(apiKey);
    }
    return resendInstance;
}

/**
 * Universal email send function
 * 
 * @param {Object} options
 * @param {string|string[]} options.to - Recipient email or array of emails
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML content
 * @param {string} [options.text] - Plain text alternative
 * @param {string} [options.from] - Custom sender address
 * @returns {Promise<{success: boolean, id?: string, simulated?: boolean, error?: string}>}
 */
export async function sendEmail({ to, subject, html, text, from }) {
    const recipientList = Array.isArray(to) ? to : [to];
    const validRecipients = recipientList.map(r => String(r || '').trim()).filter(Boolean);

    if (validRecipients.length === 0) {
        return { success: false, error: 'ადრესატის ელ-ფოსტის მისამართი არ არის მითითებული' };
    }

    if (!subject || !html) {
        return { success: false, error: 'სათაური და წერილის შინაარსი სავალდებულოა' };
    }

    // Default sender address
    const defaultFrom = process.env.RESEND_FROM || 'IICE Conference 2026 <onboarding@resend.dev>';
    const sender = from || defaultFrom;

    // 1. Try Resend
    const resend = getResend();
    if (resend) {
        try {
            const { data, error } = await resend.emails.send({
                from: sender,
                to: validRecipients,
                subject,
                html,
                text: text || undefined,
            });

            if (error) {
                console.error('[EMAIL ERROR Resend]:', error);
                return { success: false, error: error.message || 'Resend API შეცდომა' };
            }

            return { success: true, id: data?.id, provider: 'resend' };
        } catch (err) {
            console.error('[EMAIL EXCEPTION Resend]:', err);
            return { success: false, error: err.message || 'ელ-ფოსტის გაგზავნის შეცდომა' };
        }
    }

    // 2. Safe Simulated Mode (if no key is provided)
    console.warn('[EMAIL SIMULATION]: No email provider configured. Simulating dispatch to:', validRecipients);
    console.log('[EMAIL SIMULATION Subject]:', subject);

    return {
        success: true,
        simulated: true,
        provider: 'dry-run',
        message: 'ელ-ფოსტის პროვაიდერი ჯერ არ არის დაკონფიგურირებული .env.local-ში. წერილი დაგენერირდა სატესტო რეჟიმში.'
    };
}

/**
 * Sends automated registration confirmation email to applicant
 * 
 * @param {Object} registration
 * @returns {Promise<{success: boolean, id?: string, simulated?: boolean, error?: string}>}
 */
export async function sendRegistrationConfirmationEmail(registration) {
    if (!registration || !registration.email) {
        return { success: false, error: 'მომხსენებლის მეილი არ არის მითითებული' };
    }

    try {
        let rendered;
        try {
            const activeTmpl = await getTemplateByKey('registration_confirmation');
            if (activeTmpl && activeTmpl.subject && activeTmpl.body_text) {
                rendered = renderTemplateWithData({
                    subject: activeTmpl.subject,
                    bodyText: activeTmpl.body_text,
                    data: registration
                });
            }
        } catch (e) {
            console.warn('Fallback to static registration template:', e.message);
        }

        if (!rendered) {
            rendered = getRegistrationConfirmationTemplate(registration);
        }

        const result = await sendEmail({
            to: registration.email,
            subject: rendered.subject,
            html: rendered.html,
            text: rendered.text,
        });

        return result;
    } catch (err) {
        console.error('Error sending registration confirmation email:', err);
        return { success: false, error: err.message };
    }
}
