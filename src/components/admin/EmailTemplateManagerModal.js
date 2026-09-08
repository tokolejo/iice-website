'use client';

import { useState, useEffect, useRef } from 'react';
import AdminModal from './AdminModal';
import {
    Settings,
    Save,
    RotateCcw,
    Send,
    Eye,
    Edit3,
    CheckCircle2,
    Loader2,
    FileText,
    Sparkles,
    AlertCircle,
    Info,
    Mail
} from 'lucide-react';
import { toast } from './AdminToast';
import {
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
    { tag: '{attendance_type}', label: 'დასწრება (პირისპირ/ონლაინ)' },
    { tag: '{affiliation}', label: 'ორგანიზაცია' },
    { tag: '{co_authors}', label: 'თანაავტორები' },
    { tag: '{date}', label: 'დღევანდელი თარიღი' },
    { tag: '{site_url}', label: 'საიტის ბმული (iice.ge)' },
    { tag: '{contact_email}', label: 'ელ-ფოსტა (info@iice.ge)' }
];

const SAMPLE_DATA = {
    first_name: 'ნიკოლოზ',
    last_name: 'ნიორაძე',
    email: 'nikoloz.nioradze@tsu.ge',
    abstract_number: 'IICE-2026-001',
    presentation_title: 'Electrochemical Synthesis of Nanostructured Materials',
    thematic_topic: 'ნანოპროცესები და ნანოტექნოლოგიები',
    presentation_type: 'oral',
    is_attending_in_person: true,
    affiliation: 'TSU R. Agladze Institute',
    citizenship: 'საქართველო',
    co_authors: 'გ. ტატიშვილი, თ. ლეჟავა'
};

export default function EmailTemplateManagerModal({ isOpen, onClose }) {
    const [templates, setTemplates] = useState({});
    const [selectedKey, setSelectedKey] = useState('registration_confirmation');
    const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    // Form inputs for selected template
    const [subject, setSubject] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [testEmail, setTestEmail] = useState('tokolejo@gmail.com');

    const textareaRef = useRef(null);

    // Load templates on modal open
    useEffect(() => {
        if (!isOpen) return;

        async function fetchTemplates() {
            setIsLoading(true);
            try {
                const res = await fetch('/api/admin/conference/templates');
                const data = await res.json();
                if (data.success && data.templates) {
                    setTemplates(data.templates);
                    const current = data.templates[selectedKey] || data.templates.registration_confirmation;
                    if (current) {
                        setSubject(current.subject || '');
                        setBodyText(current.body_text || '');
                    }
                }
            } catch (err) {
                console.error('Failed to load email templates:', err);
                toast('შაბლონების ჩატვირთვა ვერ მოხერხდა', 'error');
            } finally {
                setIsLoading(false);
            }
        }

        fetchTemplates();
    }, [isOpen]);

    // Handle template switch
    const handleSelectTemplate = (key) => {
        setSelectedKey(key);
        const tmpl = templates[key];
        if (tmpl) {
            setSubject(tmpl.subject || '');
            setBodyText(tmpl.body_text || '');
        }
    };

    // Insert placeholder at cursor
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

    // Save current template
    const handleSave = async () => {
        if (!subject.trim()) {
            toast('სათაური არ შეიძლება იყოს ცარიელი', 'error');
            return;
        }
        if (!bodyText.trim()) {
            toast('წერილის ტექსტი არ შეიძლება იყოს ცარიელი', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/conference/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: selectedKey,
                    subject,
                    body_text: bodyText
                })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'შენახვა ვერ მოხერხდა');
            }

            setTemplates(prev => ({
                ...prev,
                [selectedKey]: data.template
            }));

            toast('შაბლონი წარმატებით შეინახა! ნებისმიერი ახალი გაგზავნა ამ შაბლონს გამოიყენებს.', 'success');
        } catch (err) {
            console.error('Error saving template:', err);
            toast('შენახვის შეცდომა: ' + err.message, 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // Reset current template to factory default
    const handleReset = async () => {
        if (!confirm('ნამდვილად გსურთ ამ შაბლონის საწყის (ქარხნულ) ტექსტზე დაბრუნება?')) {
            return;
        }

        setIsResetting(true);
        try {
            const res = await fetch('/api/admin/conference/templates/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: selectedKey })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'დაბრუნება ვერ მოხერხდა');
            }

            setTemplates(prev => ({
                ...prev,
                [selectedKey]: data.template
            }));
            setSubject(data.template.subject || '');
            setBodyText(data.template.body_text || '');

            toast('შაბლონი დაბრუნდა საწყის მდგომარეობაში', 'info');
        } catch (err) {
            console.error('Error resetting template:', err);
            toast('შეცდომა: ' + err.message, 'error');
        } finally {
            setIsResetting(false);
        }
    };

    // Send test email to admin
    const handleTestSend = async () => {
        if (!testEmail.trim()) {
            toast('მიუთითეთ ელ-ფოსტის მისამართი', 'error');
            return;
        }

        setIsTesting(true);
        try {
            const res = await fetch('/api/admin/conference/templates/test-send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject,
                    body_text: bodyText,
                    targetEmail: testEmail
                })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'ტესტის გაგზავნა ვერ მოხერხდა');
            }

            toast(data.message || `სატესტო წერილი გაეგზავნა: ${testEmail}`, 'success');
        } catch (err) {
            console.error('Test send error:', err);
            toast('ტესტის შეცდომა: ' + err.message, 'error');
        } finally {
            setIsTesting(false);
        }
    };

    // Live preview generation
    const previewSubject = replacePlaceholders(subject, SAMPLE_DATA);
    const previewBody = replacePlaceholders(bodyText, SAMPLE_DATA);
    const previewHtml = wrapInEmailLayout({
        title: previewSubject,
        contentHtml: formatCustomEmailHtml(previewBody),
        previewText: previewBody.slice(0, 100)
    });

    const activeTemplate = templates[selectedKey] || {};
    const isRegistrationTmpl = selectedKey === 'registration_confirmation';

    if (!isOpen) return null;

    return (
        <AdminModal
            isOpen={isOpen}
            onClose={onClose}
            title="მეილის შაბლონების მართვა (Email Templates Manager)"
            subtitle="შეცვალეთ რეგისტრაციის დროს გასაგზავნი ავტომატური წერილი ან ოფიციალური შეტყობინებები"
            icon={Settings}
            maxWidth="max-w-5xl"
            footer={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                    {/* Test Send Section */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                                type="email"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                                placeholder="ტესტის მიმღები მეილი"
                                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] w-48 sm:w-56 bg-white"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleTestSend}
                            disabled={isTesting || !testEmail.trim()}
                            className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#60318e] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                            title="გააგზავნეთ ამ შაბლონის სატესტო ვარიანტი მითითებულ მეილზე"
                        >
                            {isTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                            <span>სატესტო გაგზავნა</span>
                        </button>
                    </div>

                    {/* Actions: Reset & Save */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={isResetting || isSaving}
                            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors cursor-pointer flex items-center gap-1.5"
                            title="საწყის ქარხნულ ტექსტზე დაბრუნება"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>საწყისზე დაბრუნება</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving || !subject.trim() || !bodyText.trim()}
                            className="px-5 py-2 rounded-xl bg-[#60318e] hover:bg-[#4a2470] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            <span>შაბლონის შენახვა</span>
                        </button>
                    </div>
                </div>
            }
        >
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-[#60318e]" />
                    <span className="text-xs font-bold">შაბლონები იტვირთება...</span>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Template Selection Tabs Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {Object.entries(templates).map(([k, t]) => {
                            const isSelected = selectedKey === k;
                            return (
                                <button
                                    key={k}
                                    type="button"
                                    onClick={() => handleSelectTemplate(k)}
                                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                                        isSelected
                                            ? 'bg-purple-50/80 border-[#60318e] shadow-xs'
                                            : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[11px] font-black uppercase tracking-wider ${isSelected ? 'text-[#60318e]' : 'text-slate-700'}`}>
                                            {t.title}
                                        </span>
                                        {t.is_customized && (
                                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                                                შეცვლილია
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-slate-500 line-clamp-1">
                                        {t.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Banner for Registration confirmation */}
                    {isRegistrationTmpl && (
                        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-[#60318e] flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-slate-700 leading-relaxed">
                                <strong className="text-[#60318e] font-extrabold block mb-0.5">
                                    ავტომატური რეგისტრაციის შაბლონი
                                </strong>
                                ეს არის წერილი, რომელიც <strong>ყველა დარეგისტრირებულ მომხსენებელს</strong> ავტომატურად მიუვა მეილზე.
                                ქვემოთ შეგიძლიათ ჩაასწოროთ სათაური და ტექსტი, გამოიყენოთ ცვლადები ({'{name}'}, {'{abstract_number}'}, და ა.შ.) და დააჭიროთ „შაბლონის შენახვა“-ს.
                            </div>
                        </div>
                    )}

                    {/* Editor Control Header: Mode Switcher (Edit vs Preview) */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <div>
                            <span className="text-xs font-bold text-slate-800">
                                {activeTemplate.title}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                                გასაღები: <code className="font-mono text-[#60318e]">{selectedKey}</code>
                            </span>
                        </div>

                        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setActiveTab('edit')}
                                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    activeTab === 'edit'
                                        ? 'bg-white text-[#60318e] shadow-xs'
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
                                        ? 'bg-white text-[#60318e] shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>გადახედვა (Live Preview)</span>
                            </button>
                        </div>
                    </div>

                    {/* Tab 1: Edit Form */}
                    {activeTab === 'edit' && (
                        <div className="space-y-3.5 animate-fade-in">
                            {/* Subject */}
                            <div>
                                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                                    წერილის თემა (Subject) *
                                </label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="შაბლონის სათაური..."
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all bg-white"
                                />
                            </div>

                            {/* Placeholders Toolbar */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                        დინამიკური ცვლადების ჩასმა (დააჭირეთ ჩასასმელად):
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
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
                                    შაბლონის ტექსტი (Body) *
                                </label>
                                <textarea
                                    ref={textareaRef}
                                    value={bodyText}
                                    onChange={(e) => setBodyText(e.target.value)}
                                    rows={14}
                                    placeholder="აკრიფეთ ან ჩაასწორეთ შაბლონის ტექსტი..."
                                    className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all bg-white resize-y"
                                />
                                <p className="text-[11px] text-slate-400 mt-1">
                                    💡 რჩევა: აბზაცებს შორის ცარიელი ხაზის დატოვება ტექსტს ლამაზად გაყოფს ბლოკებად. ხაზის დასაწყისში &quot;- &quot; ჩასვამს ჩამონათვალის ბულეტს.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Live Preview */}
                    {activeTab === 'preview' && (
                        <div className="space-y-3 animate-fade-in">
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-800">
                                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>გადახედვა:</strong> ქვემოთ ნაჩვენებია წერილის ზუსტი ვიზუალი სატესტო მომხსენებლისთვის (<strong>{SAMPLE_DATA.first_name} {SAMPLE_DATA.last_name}</strong>, თეზისი: <strong>{SAMPLE_DATA.abstract_number}</strong>).
                                </div>
                            </div>

                            <div className="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner bg-slate-100 p-3 sm:p-4">
                                <div className="bg-white rounded-xl p-3 border border-slate-200 mb-3 text-xs space-y-1">
                                    <p><span className="text-slate-400 font-bold">გამგზავნი:</span> <span className="font-bold text-slate-800">TSU IICE 2026 Conference &lt;info@iice.ge&gt;</span></p>
                                    <p><span className="text-slate-400 font-bold">ადრესატი:</span> <span className="font-mono text-purple-700">{SAMPLE_DATA.email}</span></p>
                                    <p><span className="text-slate-400 font-bold">თემა:</span> <span className="font-bold text-slate-900">{previewSubject}</span></p>
                                </div>

                                <div className="bg-white rounded-xl shadow-xs overflow-hidden h-[520px] border border-slate-200">
                                    <iframe
                                        title="Email Preview"
                                        srcDoc={previewHtml}
                                        className="w-full h-full border-0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AdminModal>
    );
}
