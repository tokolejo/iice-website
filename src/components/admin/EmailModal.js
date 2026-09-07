'use client';

import { useState, useEffect, useRef } from 'react';
import AdminModal from './AdminModal';
import {
    Mail,
    Send,
    Eye,
    Edit3,
    Sparkles,
    AlertCircle,
    CheckCircle2,
    Loader2,
    Users,
    User,
    FileText,
    Copy
} from 'lucide-react';
import { toast } from './AdminToast';
import {
    getAcceptanceLetterGeorgianTemplate,
    getAcceptanceLetterEnglishTemplate,
    getRevisionNeededTemplate,
    replacePlaceholders,
    wrapInEmailLayout,
    formatCustomEmailHtml
} from '../../lib/emailTemplates';

const PLACEHOLDERS = [
    { tag: '{name}', label: 'სახელი და გვარი' },
    { tag: '{first_name}', label: 'სახელი' },
    { tag: '{last_name}', label: 'გვარი' },
    { tag: '{abstract_number}', label: 'თეზისის #' },
    { tag: '{presentation_title}', label: 'მოხსენების სათაური' },
    { tag: '{thematic_topic}', label: 'სექცია / თემატიკა' },
    { tag: '{presentation_type}', label: 'ფორმატი (ზეპირი/სასტენდო)' },
    { tag: '{affiliation}', label: 'ორგანიზაცია' }
];

export default function EmailModal({
    isOpen,
    onClose,
    recipients = [],
    initialTemplate = 'custom', // 'custom' | 'acceptance_ka' | 'acceptance_en' | 'revision'
    initialSubject = '',
    initialBody = '',
    onSuccess
}) {
    const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'
    const [selectedPreset, setSelectedPreset] = useState(initialTemplate);
    const [subject, setSubject] = useState(initialSubject);
    const [bodyText, setBodyText] = useState(initialBody);
    const [isSending, setIsSending] = useState(false);

    const textareaRef = useRef(null);

    // Primary sample recipient for preview and template generation
    const sampleRecipient = recipients[0] || {};
    const recipientCount = recipients.length;

    // Load initial or selected preset
    useEffect(() => {
        if (!isOpen) return;

        if (initialSubject || initialBody) {
            setSubject(initialSubject);
            setBodyText(initialBody);
            return;
        }

        applyPreset(selectedPreset);
    }, [isOpen, initialTemplate, initialSubject, initialBody]);

    const applyPreset = (presetKey) => {
        setSelectedPreset(presetKey);

        if (presetKey === 'acceptance_ka') {
            const tmpl = getAcceptanceLetterGeorgianTemplate(sampleRecipient);
            setSubject(tmpl.subject);
            setBodyText(tmpl.bodyText);
        } else if (presetKey === 'acceptance_en') {
            const tmpl = getAcceptanceLetterEnglishTemplate(sampleRecipient);
            setSubject(tmpl.subject);
            setBodyText(tmpl.bodyText);
        } else if (presetKey === 'revision') {
            const tmpl = getRevisionNeededTemplate(sampleRecipient);
            setSubject(tmpl.subject);
            setBodyText(tmpl.bodyText);
        } else if (presetKey === 'custom') {
            const defaultName = recipientCount === 1 ? `${sampleRecipient.first_name || ''} ${sampleRecipient.last_name || ''}`.trim() : '{name}';
            setSubject(`თსუ IICE 2026: შეტყობინება საორგანიზაციო კომიტეტიდან`);
            setBodyText(`პატივცემულო ${defaultName || 'კოლეგა'},

გაცნობებთ, რომ ...

პატივისცემით,
IICE 2026 საორგანიზაციო კომიტეტი
ელ-ფოსტა: iice@tsu.ge | ვებგვერდი: https://iice.tsu.ge`);
        }
    };

    // Insert placeholder at cursor position
    const insertPlaceholder = (tag) => {
        if (!textareaRef.current) {
            setBodyText(prev => prev + ' ' + tag);
            return;
        }

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = bodyText;
        const newText = text.substring(0, start) + tag + text.substring(end);

        setBodyText(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + tag.length, start + tag.length);
        }, 50);
    };

    // Generate live preview HTML for sample recipient
    const previewSubject = replacePlaceholders(subject, sampleRecipient);
    const previewBody = replacePlaceholders(bodyText, sampleRecipient);
    const previewHtml = wrapInEmailLayout({
        title: previewSubject,
        contentHtml: formatCustomEmailHtml(previewBody),
        previewText: previewBody.slice(0, 100)
    });

    // Send email handler
    const handleSend = async () => {
        if (!subject.trim()) {
            toast('გთხოვთ მიუთითოთ წერილის თემა (Subject)', 'error');
            return;
        }

        if (!bodyText.trim()) {
            toast('გთხოვთ მიუთითოთ წერილის შინაარსი (Body)', 'error');
            return;
        }

        if (recipients.length === 0) {
            toast('ადრესატების სია ცარიელია', 'error');
            return;
        }

        setIsSending(true);

        try {
            const res = await fetch('/api/admin/conference/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipients,
                    subject,
                    bodyText,
                    templateType: selectedPreset
                })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'გაგზავნა ვერ მოხერხდა');
            }

            const isSimulated = data.results?.some(r => r.simulated);

            if (isSimulated) {
                toast(`სატესტო რეჟიმი: წერილი წარმატებით დაგენერირდა ${data.sentCount} ადრესატისთვის`, 'info');
            } else {
                toast(`წერილი წარმატებით გაეგზავნა ${data.sentCount} ადრესატს!`, 'success');
            }

            if (data.failedCount > 0) {
                toast(`${data.failedCount} ადრესატთან გაგზავნა ვერ მოხერხდა`, 'error');
            }

            if (onSuccess) onSuccess();
            onClose();

        } catch (err) {
            console.error('Error in EmailModal send:', err);
            toast('შეცდომა: ' + err.message, 'error');
        } finally {
            setIsSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="ელ-ფოსტის გაგზავნა (Email Dispatcher)"
            subtitle={recipientCount === 1
                ? `ადრესატი: ${sampleRecipient.first_name || ''} ${sampleRecipient.last_name || ''} (${sampleRecipient.email})`
                : `მონიშნულია ${recipientCount} მონაწილე`}
            icon={Mail}
            maxWidth="max-w-4xl"
            footer={
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Users className="w-4 h-4 text-[#60318e]" />
                        <span>სულ: <strong className="text-slate-800">{recipientCount}</strong> ადრესატი</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSending}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
                        >
                            გაუქმება
                        </button>
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={isSending || !subject.trim() || !bodyText.trim()}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#60318e] hover:bg-[#4a2470] text-white shadow-md flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>იგზავნება...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>გაგზავნა ({recipientCount})</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            }
        >
            <div className="space-y-4">
                {/* Top Control Bar: Recipient Chips, Preset Selector, Tab Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100">
                    {/* Presets dropdown */}
                    <div className="flex items-center gap-2 flex-1">
                        <Sparkles className="w-4 h-4 text-[#60318e] flex-shrink-0" />
                        <label className="text-xs font-bold text-slate-700 whitespace-nowrap">შაბლონი:</label>
                        <select
                            value={selectedPreset}
                            onChange={(e) => applyPreset(e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-purple-200 bg-white text-xs font-bold text-[#60318e] focus:outline-none focus:ring-2 focus:ring-[#AD49E1] cursor-pointer w-full max-w-xs"
                        >
                            <option value="custom">✍️ თავისუფალი / საკუთარი ტექსტი</option>
                            <option value="acceptance_ka">📜 მიღების ოფიციალური წერილი (ქართული)</option>
                            <option value="acceptance_en">📜 Official Acceptance Letter (English)</option>
                            <option value="revision">⚠️ გადამუშავების მოთხოვნა (შენიშვნები)</option>
                        </select>
                    </div>

                    {/* Tabs Switcher: Edit vs Live Preview */}
                    <div className="flex items-center bg-white p-1 rounded-xl border border-purple-200 shadow-2xs self-end sm:self-auto">
                        <button
                            type="button"
                            onClick={() => setActiveTab('edit')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                activeTab === 'edit'
                                    ? 'bg-[#60318e] text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>რედაქტირება</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                activeTab === 'preview'
                                    ? 'bg-[#60318e] text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span>გადახედვა (Preview)</span>
                        </button>
                    </div>
                </div>

                {/* Recipients Chips Preview (collapsed summary) */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-500 font-medium mr-2">მიმღებები:</span>
                    {recipientCount === 1 ? (
                        <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {sampleRecipient.first_name} {sampleRecipient.last_name} &lt;{sampleRecipient.email}&gt; ({sampleRecipient.abstract_number || 'IICE-2026'})
                        </span>
                    ) : (
                        <div className="inline-flex flex-wrap gap-1 mt-1">
                            <span className="font-bold text-[#60318e] bg-purple-100 px-2 py-0.5 rounded-full">
                                {recipientCount} ადრესატი
                            </span>
                            {recipients.slice(0, 4).map((r, i) => (
                                <span key={i} className="font-mono text-[11px] text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {r.email}
                                </span>
                            ))}
                            {recipientCount > 4 && (
                                <span className="text-[11px] text-slate-400 font-semibold self-center">
                                    + კიდევ {recipientCount - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Tab 1: Edit Mode */}
                {activeTab === 'edit' && (
                    <div className="space-y-3.5 animate-fade-in">
                        {/* Subject Input */}
                        <div>
                            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                                წერილის თემა (Subject) *
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="მაგ: თსუ IICE 2026 - ოფიციალური შეტყობინება"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all bg-white"
                            />
                        </div>

                        {/* Placeholders Toolbar */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                    დინამიკური ცვლადების ჩასმა (დააჭირეთ ჩასასმელად):
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                                {PLACEHOLDERS.map((p) => (
                                    <button
                                        key={p.tag}
                                        type="button"
                                        onClick={() => insertPlaceholder(p.tag)}
                                        className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-[11px] font-mono text-[#60318e] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                                        title={`ჩასვამს: ${p.label}`}
                                    >
                                        <span>{p.tag}</span>
                                        <span className="text-[10px] text-slate-400 font-sans font-normal">({p.label})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Body Textarea */}
                        <div>
                            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                                წერილის ტექსტი (Body) *
                            </label>
                            <textarea
                                ref={textareaRef}
                                value={bodyText}
                                onChange={(e) => setBodyText(e.target.value)}
                                rows={13}
                                placeholder="აკრიფეთ ან ჩაასწორეთ გასაგზავნი ტექსტი..."
                                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all bg-white resize-y"
                            />
                            <p className="text-[11px] text-slate-400 mt-1">
                                💡 რჩევა: აბზაცებს შორის ცარიელი ხაზის დატოვება ტექსტს ლამაზად გაყოფს ბლოკებად. ხაზის დასაწყისში &quot;- &quot; ჩასვამს ჩამონათვალის ბულეტს.
                            </p>
                        </div>
                    </div>
                )}

                {/* Tab 2: Live Preview Mode */}
                {activeTab === 'preview' && (
                    <div className="space-y-3 animate-fade-in">
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-800">
                            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <strong>გადახედვა:</strong> ქვემოთ ნაჩვენებია წერილის ზუსტი ვიზუალი პირველი ადრესატისთვის (<strong>{sampleRecipient.first_name || 'მონაწილე'} {sampleRecipient.last_name || ''}</strong>). ჯგუფური გაგზავნისას თითოეულ ადრესატს ჩაენაცვლება თავისი ინდივიდუალური მონაცემები.
                            </div>
                        </div>

                        {/* Simulated Email Client Preview Frame */}
                        <div className="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner bg-slate-100 p-3 sm:p-4">
                            <div className="bg-white rounded-xl p-3 border border-slate-200 mb-3 text-xs space-y-1">
                                <p><span className="text-slate-400 font-bold">გამგზავნი:</span> <span className="font-bold text-slate-800">TSU IICE 2026 Conference &lt;conference@iice.tsu.ge&gt;</span></p>
                                <p><span className="text-slate-400 font-bold">ადრესატი:</span> <span className="font-mono text-purple-700">{sampleRecipient.email || 'recipient@example.com'}</span></p>
                                <p><span className="text-slate-400 font-bold">თემა:</span> <span className="font-bold text-slate-900">{previewSubject}</span></p>
                            </div>

                            {/* Rendered HTML Container */}
                            <div className="bg-white rounded-xl shadow-xs overflow-hidden max-h-[500px] overflow-y-auto border border-slate-200">
                                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminModal>
    );
}
