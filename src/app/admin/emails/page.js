'use client';

import { useState, useEffect, useRef } from 'react';
import {
    Mail,
    Send,
    Save,
    RotateCcw,
    Eye,
    Edit3,
    History,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Sparkles,
    Search,
    RefreshCw,
    Globe,
    FileText,
    ExternalLink,
    Check,
    Clock,
    User,
    Laptop,
    Tag,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import { toast } from '../../../components/admin/AdminToast';
import AdminModal from '../../../components/admin/AdminModal';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import {
    replacePlaceholders,
    wrapInEmailLayout,
    formatCustomEmailHtml
} from '../../../lib/emailTemplates';

const PLACEHOLDERS = [
    { tag: '{name}', label: 'სრული სახელი' },
    { tag: '{first_name}', label: 'სახელი' },
    { tag: '{last_name}', label: 'გვარი' },
    { tag: '{abstract_number}', label: 'თეზისის #' },
    { tag: '{presentation_title}', label: 'მოხსენების სათაური' },
    { tag: '{thematic_topic}', label: 'სექცია / თემატიკა' },
    { tag: '{presentation_type}', label: 'ფორმატი (ზეპირი/სასტენდო)' },
    { tag: '{attendance_type}', label: 'დასწრება (პირისპირ/ონლაინ)' },
    { tag: '{affiliation}', label: 'ორგანიზაცია' },
    { tag: '{co_authors}', label: 'თანაავტორები' },
    { tag: '{date}', label: 'თარიღი' },
    { tag: '{site_url}', label: 'საიტის ბმული' },
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
    affiliation: 'თსუ რ. აგლაძის ინსტიტუტი',
    citizenship: 'საქართველო',
    co_authors: 'გ. ტატიშვილი, თ. ლეჟავა'
};

export default function AdminEmailsPage() {
    const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'logs'
    const [templates, setTemplates] = useState({});
    const [selectedKey, setSelectedKey] = useState('registration_confirmation');
    const [editorLang, setEditorLang] = useState('ka'); // 'ka' | 'en'
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [testEmail, setTestEmail] = useState('tokolejo@gmail.com');
    const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' | 'mobile'

    // Form inputs for currently selected template
    const [subjectKa, setSubjectKa] = useState('');
    const [bodyTextKa, setBodyTextKa] = useState('');
    const [subjectEn, setSubjectEn] = useState('');
    const [bodyTextEn, setBodyTextEn] = useState('');

    // Logs state
    const [logs, setLogs] = useState([]);
    const [isLogsLoading, setIsLogsLoading] = useState(false);
    const [logsSearch, setLogsSearch] = useState('');
    const [selectedLog, setSelectedLog] = useState(null);

    const textareaKaRef = useRef(null);
    const textareaEnRef = useRef(null);

    // Fetch templates on load
    const fetchTemplates = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/emails/templates');
            const data = await res.json();
            if (data.success && data.templates) {
                setTemplates(data.templates);
                const current = data.templates[selectedKey] || Object.values(data.templates)[0];
                if (current) {
                    setSubjectKa(current.subject || '');
                    setBodyTextKa(current.body_text || '');
                    setSubjectEn(current.subject_en || '');
                    setBodyTextEn(current.body_text_en || '');
                }
            }
        } catch (err) {
            console.error('Failed to load email templates:', err);
            toast('შაბლონების ჩატვირთვა ვერ მოხერხდა', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch logs
    const fetchLogs = async () => {
        setIsLogsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            let token = null;
            if (supabase) {
                try {
                    const { data: { session } } = await supabase.auth.getSession();
                    token = session?.access_token;
                } catch (e) {
                    console.warn('[EMAILS] Session read warning:', e);
                }
            }

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            // 1. Try API endpoint with token
            let apiLoaded = false;
            try {
                const res = await fetch(`/api/admin/emails/logs?q=${encodeURIComponent(logsSearch)}`, {
                    headers,
                    cache: 'no-store'
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.logs) && data.logs.length > 0) {
                        setLogs(data.logs);
                        apiLoaded = true;
                        return;
                    }
                }
            } catch (err) {
                console.warn('[EMAILS] API log fetch failed, trying direct supabase client:', err);
            }

            // 2. Direct browser Supabase client fallback (with active user session)
            if (!apiLoaded && supabase) {
                let q = supabase
                    .from('audit_logs')
                    .select('*')
                    .or('action.ilike.%EMAIL%,action.ilike.%MAIL%,table_name.ilike.%email%,action.eq.CONFERENCE_REGISTRATION_EMAIL')
                    .order('created_at', { ascending: false })
                    .limit(100);

                const { data, error } = await q;
                if (!error && data) {
                    let filtered = data;
                    if (logsSearch.trim()) {
                        const lower = logsSearch.toLowerCase();
                        filtered = filtered.filter(row => {
                            const user = (row.user_email || '').toLowerCase();
                            const record = (row.record_id || '').toLowerCase();
                            const details = JSON.stringify(row.details || {}).toLowerCase();
                            return user.includes(lower) || record.includes(lower) || details.includes(lower);
                        });
                    }
                    setLogs(filtered);
                    return;
                }
            }

            setLogs([]);
        } catch (err) {
            console.error('Failed to load email logs:', err);
            setLogs([]);
        } finally {
            setIsLogsLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (activeTab === 'logs') {
            fetchLogs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    // Handle template switch
    const handleSelectTemplate = (key) => {
        setSelectedKey(key);
        const tmpl = templates[key];
        if (tmpl) {
            setSubjectKa(tmpl.subject || '');
            setBodyTextKa(tmpl.body_text || '');
            setSubjectEn(tmpl.subject_en || '');
            setBodyTextEn(tmpl.body_text_en || '');
        }
    };

    // Insert tag at cursor position
    const insertTag = (tag) => {
        const ref = editorLang === 'ka' ? textareaKaRef.current : textareaEnRef.current;
        if (!ref) return;

        const currentVal = editorLang === 'ka' ? bodyTextKa : bodyTextEn;
        const setVal = editorLang === 'ka' ? setBodyTextKa : setBodyTextEn;

        const start = ref.selectionStart ?? currentVal.length;
        const end = ref.selectionEnd ?? currentVal.length;
        const updated = currentVal.substring(0, start) + tag + currentVal.substring(end);

        setVal(updated);

        setTimeout(() => {
            ref.focus();
            ref.setSelectionRange(start + tag.length, start + tag.length);
        }, 10);
    };

    // Save Template
    const handleSaveTemplate = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/emails/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: selectedKey,
                    subject: subjectKa,
                    body_text: bodyTextKa,
                    subject_en: subjectEn,
                    body_text_en: bodyTextEn,
                    updated_by: 'admin'
                })
            });

            const data = await res.json();
            if (data.success) {
                toast('შაბლონი წარმატებით შეინახა!', 'success');
                setTemplates(prev => ({
                    ...prev,
                    [selectedKey]: {
                        ...prev[selectedKey],
                        subject: subjectKa,
                        body_text: bodyTextKa,
                        subject_en: subjectEn,
                        body_text_en: bodyTextEn,
                        is_customized: true
                    }
                }));
            } else {
                toast(data.error || 'შენახვის შეცდომა', 'error');
            }
        } catch (err) {
            console.error('Save template error:', err);
            toast('შენახვის შეცდომა', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // Reset Template
    const handleResetTemplate = async () => {
        if (!window.confirm('ნამდვილად გსურთ ამ შაბლონის საწყის პარამეტრებზე დაბრუნება? თქვენი ცვლილებები გაუქმდება.')) {
            return;
        }

        setIsResetting(true);
        try {
            const res = await fetch(`/api/admin/emails/templates?key=${selectedKey}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success && data.template) {
                setSubjectKa(data.template.subject || '');
                setBodyTextKa(data.template.body_text || '');
                setSubjectEn(data.template.subject_en || '');
                setBodyTextEn(data.template.body_text_en || '');
                setTemplates(prev => ({
                    ...prev,
                    [selectedKey]: data.template
                }));
                toast('შაბლონი დაბრუნდა საწყის პარამეტრებზე', 'info');
            } else {
                toast(data.error || 'შეცდომა აღდგენისას', 'error');
            }
        } catch (err) {
            console.error('Reset template error:', err);
            toast('შეცდომა აღდგენისას', 'error');
        } finally {
            setIsResetting(false);
        }
    };

    // Send Test Email
    const handleSendTest = async () => {
        if (!testEmail || !testEmail.includes('@')) {
            toast('მიუთითეთ სწორი ელ-ფოსტის მისამართი', 'error');
            return;
        }

        const currentSubject = editorLang === 'ka' ? subjectKa : (subjectEn || subjectKa);
        const currentBody = editorLang === 'ka' ? bodyTextKa : (bodyTextEn || bodyTextKa);

        setIsTesting(true);
        try {
            const res = await fetch('/api/admin/emails/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: testEmail,
                    subject: currentSubject,
                    body_text: currentBody,
                    sample_data: SAMPLE_DATA
                })
            });

            const data = await res.json();
            if (data.success) {
                toast(data.message || `ტესტური წერილი გაიგზავნა: ${testEmail}`, 'success');
                // Automatically refresh delivery logs so the new test log appears immediately
                fetchLogs();
            } else {
                toast(data.error || 'გაგზავნის შეცდომა', 'error');
            }
        } catch (err) {
            console.error('Send test email error:', err);
            toast('გაგზავნის შეცდომა: ' + err.message, 'error');
        } finally {
            setIsTesting(false);
        }
    };

    // Live rendered preview HTML
    const activeSubject = editorLang === 'ka' ? subjectKa : (subjectEn || subjectKa);
    const activeBody = editorLang === 'ka' ? bodyTextKa : (bodyTextEn || bodyTextKa);
    const previewSubject = replacePlaceholders(activeSubject, SAMPLE_DATA);
    const previewBody = replacePlaceholders(activeBody, SAMPLE_DATA);
    const previewHtml = wrapInEmailLayout({
        title: previewSubject,
        contentHtml: formatCustomEmailHtml(previewBody),
        previewText: previewBody.slice(0, 100)
    });

    const currentTemplate = templates[selectedKey] || {};

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Mail className="w-7 h-7 text-[#60318e]" />
                        ელ-ფოსტა & ავტომატური შეტყობინებები
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        ორენოვანი ოფიციალური შაბლონების რედაქტირება, სატესტო წერილების გაგზავნა და მიწოდების ჟურნალის კონტროლი
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-xs self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setActiveTab('templates')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'templates'
                                ? 'bg-white text-[#60318e] shadow-xs ring-1 ring-slate-200/80'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>შაბლონები</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('logs')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'logs'
                                ? 'bg-white text-[#60318e] shadow-xs ring-1 ring-slate-200/80'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                    >
                        <History className="w-3.5 h-3.5" />
                        <span>გაგზავნის ჟურნალი</span>
                    </button>
                </div>
            </div>

            {/* TAB 1: TEMPLATES MANAGER */}
            {activeTab === 'templates' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar: Template Selection */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
                                ხელმისაწვდომი შაბლონები
                            </h3>

                            <div className="space-y-2">
                                {Object.entries(templates).map(([key, tmpl]) => {
                                    const isSelected = selectedKey === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handleSelectTemplate(key)}
                                            className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border flex items-start justify-between gap-3 ${
                                                isSelected
                                                    ? 'bg-purple-50/80 border-[#AD49E1] shadow-sm ring-1 ring-[#AD49E1]/30'
                                                    : 'bg-slate-50/60 border-slate-200/70 hover:bg-purple-50/40 hover:border-purple-200'
                                            }`}
                                        >
                                            <div className="space-y-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#60318e]' : 'bg-slate-400'}`}></span>
                                                    <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-[#60318e]' : 'text-slate-800'}`}>
                                                        {tmpl.title || key}
                                                    </h4>
                                                </div>
                                                <p className="text-[11px] text-slate-500 line-clamp-1 pl-4">
                                                    {tmpl.description || tmpl.subject}
                                                </p>
                                            </div>

                                            {tmpl.is_customized && (
                                                <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-[#60318e] border border-purple-200">
                                                    მორგებული
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Test Email Dispatch Card */}
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50/60 rounded-3xl p-5 border border-purple-200/70 shadow-sm space-y-3.5">
                            <div className="flex items-center gap-2">
                                <Send className="w-4 h-4 text-[#60318e]" />
                                <h3 className="text-xs font-bold text-slate-900">
                                    ტესტური წერილის გაგზავნა
                                </h3>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                                გააგზავნეთ შერჩეული შაბლონის სატესტო ნიმუში თქვენს ელ-ფოსტაზე, რათა შეამოწმოთ ვიზუალი რეალურ საფოსტო კლიენტში (Gmail, Outlook და ა.შ.).
                            </p>

                            <div className="space-y-2">
                                <input
                                    type="email"
                                    value={testEmail}
                                    onChange={(e) => setTestEmail(e.target.value)}
                                    placeholder="your-email@example.com"
                                    className="w-full px-3.5 py-2 rounded-xl border border-purple-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                />
                                <button
                                    onClick={handleSendTest}
                                    disabled={isTesting}
                                    className="w-full bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {isTesting ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>იგზავნება...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            <span>ტესტის გაგზავნა</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Area: Editor & Live Preview */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
                            {/* Editor Header: Title + Language Switcher + Save Buttons */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                <div>
                                    <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                                        <span>{currentTemplate.title || selectedKey}</span>
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {currentTemplate.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {/* Language Switcher */}
                                    <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setEditorLang('ka')}
                                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                                editorLang === 'ka'
                                                    ? 'bg-white text-[#60318e] shadow-xs'
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            ქართული (KA)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditorLang('en')}
                                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                                editorLang === 'en'
                                                    ? 'bg-white text-[#60318e] shadow-xs'
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            English (EN)
                                        </button>
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                        type="button"
                                        onClick={handleResetTemplate}
                                        disabled={isResetting || !currentTemplate.is_customized}
                                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 cursor-pointer"
                                        title="ნაგულისხმევ პარამეტრებზე დაბრუნება"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>

                                    {/* Save Button */}
                                    <button
                                        type="button"
                                        onClick={handleSaveTemplate}
                                        disabled={isSaving}
                                        className="bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                <span>ინახება...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-3.5 h-3.5" />
                                                <span>შენახვა</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Form: Subject Line */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                                    <span>წერილის სათაური (Subject Line) - {editorLang === 'ka' ? 'ქართულად' : 'English'}</span>
                                    <span className="text-[11px] text-slate-400 font-normal">მხარს უჭერს პლეისჰოლდერებს</span>
                                </label>
                                <input
                                    type="text"
                                    value={editorLang === 'ka' ? subjectKa : subjectEn}
                                    onChange={(e) => {
                                        if (editorLang === 'ka') setSubjectKa(e.target.value);
                                        else setSubjectEn(e.target.value);
                                    }}
                                    placeholder={editorLang === 'ka' ? 'მაგ: IICE 2026: რეგისტრაციის დადასტურება...' : 'e.g. IICE 2026: Registration Confirmation...'}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                />
                            </div>

                            {/* Placeholder Chips Bar */}
                            <div className="space-y-2 pt-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                                        <Tag className="w-3 h-3 text-[#60318e]" />
                                        <span>დინამიური ველები (დააწკაპუნეთ ჩასასმელად):</span>
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 p-2 rounded-2xl bg-purple-50/50 border border-purple-100">
                                    {PLACEHOLDERS.map((p) => (
                                        <button
                                            key={p.tag}
                                            type="button"
                                            onClick={() => insertTag(p.tag)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100/70 text-[#60318e] border border-purple-200/80 text-[11px] font-bold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                                            title={`ჩასვი ${p.tag}`}
                                        >
                                            <code>{p.tag}</code>
                                            <span className="text-slate-400 text-[10px]">({p.label})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Body Textarea */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700">
                                    წერილის შინაარსი (Email Body) - {editorLang === 'ka' ? 'ქართულად' : 'English'}
                                </label>
                                {editorLang === 'ka' ? (
                                    <textarea
                                        ref={textareaKaRef}
                                        rows={12}
                                        value={bodyTextKa}
                                        onChange={(e) => setBodyTextKa(e.target.value)}
                                        placeholder="დაწერეთ წერილის ტექსტი ქართულად..."
                                        className="w-full p-4 rounded-2xl border border-slate-300 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1] leading-relaxed resize-y"
                                    />
                                ) : (
                                    <textarea
                                        ref={textareaEnRef}
                                        rows={12}
                                        value={bodyTextEn}
                                        onChange={(e) => setBodyTextEn(e.target.value)}
                                        placeholder="Enter email body text in English..."
                                        className="w-full p-4 rounded-2xl border border-slate-300 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1] leading-relaxed resize-y"
                                    />
                                )}
                            </div>

                            {/* Live HTML Email Preview Accordion */}
                            <div className="pt-3 border-t border-slate-200">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-[#60318e]" />
                                        <h3 className="text-xs font-bold text-slate-800">
                                            ცოცხალი გადახედვა (Live HTML Email Preview)
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-[10px] font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setPreviewMode('desktop')}
                                            className={`px-2 py-0.5 rounded cursor-pointer ${previewMode === 'desktop' ? 'bg-white shadow-xs text-[#60318e]' : 'text-slate-500'}`}
                                        >
                                            Desktop
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPreviewMode('mobile')}
                                            className={`px-2 py-0.5 rounded cursor-pointer ${previewMode === 'mobile' ? 'bg-white shadow-xs text-[#60318e]' : 'text-slate-500'}`}
                                        >
                                            Mobile (420px)
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-center bg-slate-100 p-4 rounded-2xl border border-slate-200 overflow-x-auto">
                                    <div
                                        className={`transition-all duration-300 bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 ${
                                            previewMode === 'mobile' ? 'w-[400px]' : 'w-full max-w-[660px]'
                                        }`}
                                    >
                                        <div className="p-3 bg-slate-900 text-white text-[11px] font-bold flex items-center justify-between border-b border-slate-800">
                                            <span className="truncate max-w-[80%]">Subject: {previewSubject}</span>
                                            <span className="text-[10px] text-slate-400 font-mono">HTML Preview</span>
                                        </div>
                                        <iframe
                                            title="Email HTML Preview"
                                            srcDoc={previewHtml}
                                            className="w-full h-[550px] bg-slate-50 border-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: EMAIL LOGS */}
            {activeTab === 'logs' && (
                <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                                <History className="w-4 h-4 text-[#60318e]" />
                                <span>გაგზავნილი წერილების ისტორია & სტატუსი</span>
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                სისტემური და საკონფერენციო წერილების სრული აუდიტის ჩანაწერები
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={logsSearch}
                                    onChange={(e) => setLogsSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && fetchLogs()}
                                    placeholder="ძებნა მეილით ან თემით..."
                                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                />
                            </div>
                            <button
                                onClick={fetchLogs}
                                disabled={isLogsLoading}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                title="განახლება"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${isLogsLoading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Logs Table */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black uppercase text-[10px] tracking-wider">
                                    <th className="py-3 px-4">დრო</th>
                                    <th className="py-3 px-4">ადრესატი / მომხმარებელი</th>
                                    <th className="py-3 px-4">მოვლენა</th>
                                    <th className="py-3 px-4">თემა / დეტალები</th>
                                    <th className="py-3 px-4 text-center">სტატუსი</th>
                                    <th className="py-3 px-4 text-right">დეტალები</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {logs.length > 0 ? (
                                    logs.map((log) => {
                                        const date = log.created_at ? new Date(log.created_at).toLocaleString('ka-GE') : '—';
                                        const recipient = log.details?.recipient || log.record_id || log.user_email || '—';
                                        const subject = log.details?.subject || log.details?.template_key || '—';
                                        const isSimulated = log.details?.simulated;
                                        const isError = log.details?.error;

                                        return (
                                            <tr key={log.id} className="hover:bg-purple-50/30 transition-colors">
                                                <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                                                    {date}
                                                </td>
                                                <td className="py-3 px-4 font-bold text-slate-900">
                                                    {recipient}
                                                </td>
                                                <td className="py-3 px-4 whitespace-nowrap">
                                                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-[#60318e] font-mono text-[10px] font-bold">
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 max-w-xs truncate text-slate-600" title={subject}>
                                                    {subject}
                                                </td>
                                                <td className="py-3 px-4 text-center whitespace-nowrap">
                                                    {isError ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                                            <AlertCircle className="w-2.5 h-2.5" />
                                                            <span>შეცდომა</span>
                                                        </span>
                                                    ) : isSimulated ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                            <Clock className="w-2.5 h-2.5" />
                                                            <span>სატესტო (Simulated)</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            <CheckCircle2 className="w-2.5 h-2.5" />
                                                            <span>გაგზავნილია</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setSelectedLog(log)}
                                                        className="p-1.5 rounded-lg bg-slate-100 text-[#60318e] hover:bg-[#60318e] hover:text-white transition-colors cursor-pointer"
                                                        title="დეტალურად"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                                            {isLogsLoading ? 'იტვირთება ჩანაწერები...' : 'გაგზავნილი წერილების ჩანაწერები ჯერ არ არის.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Log Details Modal */}
            {selectedLog && (
                <AdminModal
                    isOpen={Boolean(selectedLog)}
                    onClose={() => setSelectedLog(null)}
                    title="წერილის გაგზავნის დეტალები"
                    subtitle={`ID: ${selectedLog.id}`}
                    icon={Mail}
                >
                    <div className="space-y-4 text-xs font-medium text-slate-700">
                        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">დრო</span>
                                <span className="font-bold text-slate-900">{new Date(selectedLog.created_at).toLocaleString('ka-GE')}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">ინიციატორი</span>
                                <span className="font-bold text-slate-900">{selectedLog.user_email || 'სისტემა'}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">მოქმედება</span>
                                <span className="font-mono text-[#60318e] font-bold">{selectedLog.action}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">ცხრილი / ობიექტი</span>
                                <span className="font-bold text-slate-900">{selectedLog.table_name || '—'}</span>
                            </div>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">დამატებითი პარამეტრები (JSON Metadata)</span>
                            <pre className="p-3.5 rounded-xl bg-slate-900 text-purple-200 text-[11px] font-mono overflow-x-auto">
                                {JSON.stringify(selectedLog.details, null, 2)}
                            </pre>
                        </div>
                    </div>
                </AdminModal>
            )}
        </div>
    );
}
