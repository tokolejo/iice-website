'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { getSupabaseBrowserClient } from '../lib/supabase/client';
import { recordAuditLog } from '../lib/auditLogger';
import { CONFERENCE_TOPICS, INVITED_SPEAKERS } from '../lib/conferenceConstants';
import {
    Calendar,
    MapPin,
    Users,
    FileText,
    UploadCloud,
    CheckCircle2,
    Clock,
    Award,
    Send,
    Download,
    Copy,
    Check,
    AlertCircle,
    Info,
    Building2,
    GraduationCap,
    Landmark,
    FileCheck,
    Coffee,
    Bus,
    PartyPopper,
    Tag,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    X
} from 'lucide-react';

export default function Conference2026View() {

    const { language } = useLanguage();
    const isEn = language === 'en';

    const [activeTab, setActiveTab] = useState('registration');
    const tabsContainerRef = useRef(null);

    const scrollTabs = (direction) => {
        if (tabsContainerRef.current) {
            tabsContainerRef.current.scrollBy({
                left: direction === 'left' ? -240 : 240,
                behavior: 'smooth'
            });
        }
    };

    // Registration Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        citizenship: '',
        affiliation: '',
        titulation: 'dr',
        gender: 'female',
        email: '',
        isAttendingInPerson: true,
        presentationTitle: '',
        coAuthors: '',
        presentationType: 'oral',
        rolePresentingAuthor: true,
        roleCoAuthor: false,
        thematicTopic: CONFERENCE_TOPICS[0].titleKa,
    });

    const [geoFile, setGeoFile] = useState(null);
    const [engFile, setEngFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [successData, setSuccessData] = useState(null);
    const [copied, setCopied] = useState(false);

    const t = {
        badge: isEn ? "International Scientific Conference 2026" : "2026 წლის საერთაშორისო სამეცნიერო კონფერენცია",
        title: isEn
            ? "3rd International Scientific Conference: “Modern Trends in Chemistry, Chemical Technologies and Related Fields: Green Energy Prospects, Ecological Sustainability, Food Safety. 2026”"
            : "მე-3 საერთაშორისო სამეცნიერო კონფერენცია: „თანამედროვე ტენდენციები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში: მწვანე ენერგეტიკის პერსპექტივები, ეკოლოგიური მდგრადობა, სურსათის უვნებელობა. 2026“",
        anniversary: isEn
            ? "Dedicated to the 70th anniversary of the founding of Rafael Agladze Institute of Inorganic Chemistry and Electrochemistry"
            : "ეძღვნება რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წლისთავს",
        datesText: isEn ? "November 25 – 27, 2026" : "25 – 27 ნოემბერი, 2026",
        deadlineText: isEn ? "Abstract Submission Deadline: October 15, 2026" : "აბსტრაქტების მიღების ბოლო ვადა: 15 ოქტომბერი, 2026",
        venuesText: isEn
            ? "Tbilisi (TSU) & Telavi (TESAU), Georgia"
            : "თბილისი (თსუ) & თელავი (თესაუ)",
        grantNotice: isEn
            ? "The event is supported by the Shota Rustaveli National Science Foundation of Georgia [Grant number ISE-26-286]"
            : "ღონისძიება ხორციელდება შოთა რუსთაველის საქართველოს ეროვნული სამეცნიერო ფონდის მხარდაჭერით [გრანტის ნომერი ISE-26-286]",
        freeNotice: isEn
            ? "No fee is charged to conference participants (Participation is Free)"
            : "კონფერენციაში მონაწილეობა უფასოა",
        tabs: {
            registration: isEn ? "Registration & Submission" : "რეგისტრაცია და აბსტრაქტი",
            topics: isEn ? "Thematic Topics" : "თემატური მიმართულებები",
            speakers: isEn ? "Invited Speakers" : "მოწვეული მომხსენებლები",
            schedule: isEn ? "Preliminary Program" : "წინასწარი პროგრამა",
            organizers: isEn ? "Organizing Institutions" : "საორგანიზაციო ინსტიტუციები",
            venues: isEn ? "Venues & Transport" : "ლოკაციები და ტრანსპორტი",
        },
        form: {
            heading: isEn ? "Conference Registration & Abstract Submission" : "კონფერენციის რეგისტრაცია და აბსტრაქტის ატვირთვა",
            subheading: "",
            firstName: isEn ? "First Name (სახელი)" : "სახელი",
            lastName: isEn ? "Last Name (გვარი)" : "გვარი",
            birthDate: isEn ? "Date of Birth (დაბადების თარიღი)" : "დაბადების თარიღი",
            citizenship: isEn ? "Citizenship (მოქალაქეობა)" : "მოქალაქეობა",
            affiliation: isEn ? "Affiliation (Institute / University / Organization, Country)" : "აფილაცია (ინსტიტუტი / უნივერსიტეტი / ორგანიზაცია, ქვეყანა)",
            titulation: isEn ? "Titulation (მიმართვა / სამეცნიერო წოდება)" : "მიმართვა (სამეცნიერო ხარისხი / წოდება)",
            gender: isEn ? "Gender (გენდერი)" : "გენდერი",
            female: isEn ? "Female (მდედრობითი)" : "მდედრობითი",
            male: isEn ? "Male (მამრობითი)" : "მამრობითი",
            email: isEn ? "Email Address (ელ-ფოსტა)" : "ელ-ფოსტა",
            attendance: isEn ? "Attending conference (კონფერენციას ვესწრები)" : "კონფერენციას ვესწრები",
            yes: isEn ? "Yes (დიახ)" : "დიახ",
            no: isEn ? "No (არა)" : "არა",
            presTitle: isEn ? "Title of presentation (მოხსენების სათაური)" : "მოხსენების სათაური",
            coAuthors: isEn ? "Co-authors (თანაავტორები)" : "თანაავტორები (გამოყავით მძიმით)",
            presType: isEn ? "Preferred type of presentation (პრეზენტაციის ფორმა)" : "პრეზენტაციის ფორმა",
            role: isEn ? "Role (მონაწილეობის როლი)" : "მონაწილეობის როლი",
            presentingAuthor: isEn ? "Presenting author (მომხსენებელი)" : "მომხსენებელი",
            coAuthor: isEn ? "Co-Author (თანაავტორი)" : "თანაავტორი",
            topic: isEn ? "Thematic topic (თემატური სექცია)" : "თემატური სექცია",
            uploadAbstract: isEn ? "Upload Abstract — Must be submitted in two languages: Georgian and English" : "აბსტრაქტის ატვირთვა — წარმოდგენილი უნდა იყოს ორ ენაზე: ქართულად და ინგლისურად",
            geoNotice: isEn ? "Georgian Abstract (.doc, .docx)" : "თეზისი ქართულად (.doc, .docx)",
            engNotice: isEn ? "English Abstract (.doc, .docx)" : "ინგლისური აბსტრაქტი (.doc, .docx)",
            footnote: isEn
                ? "Note: The Organizing Committee will ensure the translation of abstracts submitted by foreign citizens."
                : "შენიშვნა: უცხო ქვეყნის მოქალაქეების მიერ წარმოდგენილი აბსტრაქტების თარგმნას უზრუნველყოფს საორგანიზაციო კომიტეტი.",
            posterNotice: isEn
                ? "When preparing a poster, please note that the poster size is A0, and it is advisable to include a photo of the speaker."
                : "პოსტერის მოსამზადებლად, გაითვალისწინეთ, პოსტერის ზომაა A0, სასურველია დატანილი იყოს მომხსენებლის ფოტო.",
            downloadTemplatesHeading: isEn ? "Download Abstract Templates:" : "აბსტრაქტის შაბლონები ჩამოსატვირთად:",
            submitting: isEn ? "Submitting Registration..." : "მიმდინარეობს რეგისტრაცია...",
            submitBtn: isEn ? "Submit Registration →" : "რეგისტრაციის გაგზავნა →",
        },
        success: {
            title: isEn ? "Registration Successfully Received!" : "თქვენი რეგისტრაცია წარმატებით მიღებულია!",
            numberText: isEn ? "Your Abstract Registration Number:" : "თქვენი აბსტრაქტის ნომერია:",
            copied: isEn ? "Copied!" : "დაკოპირდა!",
            copy: isEn ? "Copy Number" : "ნომრის კოპირება",
            advice: isEn
                ? "Please save this registration code for all future communications with the organizing committee."
                : "გთხოვთ შეინახოთ ეს კოდი საორგანიზაციო კომიტეტთან შემდგომი კომუნიკაციისთვის.",
            close: isEn ? "Close" : "დახურვა",
        }
    };

    const thematicTopics = CONFERENCE_TOPICS;

    const titulationOptions = [
        { value: 'prof', labelKa: 'პროფ.', labelEn: 'Prof.' },
        { value: 'dr', labelKa: 'დოქტორი', labelEn: 'Dr.' },
        { value: 'msc', labelKa: 'მაგისტრი', labelEn: 'MSc' },
        { value: 'bsc', labelKa: 'ბაკალავრი', labelEn: 'BSc' },
        { value: 'student', labelKa: 'სტუდენტი: (დოქტორანტი, მაგისტრანტი, ბაკალავრიატის სტუდენტი)', labelEn: 'Student: (PhD student, Master\'s student, Undergraduate student)' },
    ];

    const presentationTypeOptions = [
        { value: 'oral', labelKa: 'ზეპირი', labelEn: 'Oral' },
        { value: 'online', labelKa: 'ონლაინ', labelEn: 'Online' },
        { value: 'poster', labelKa: 'პოსტერი', labelEn: 'Poster' },
        { value: 'abstract_only', labelKa: 'მხოლოდ თეზისი', labelEn: 'Abstract Only' },
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleGeoFileChange = (file) => {
        setGeoFile(file);
        if (fieldErrors.files) {
            setFieldErrors(prev => {
                const next = { ...prev };
                delete next.files;
                return next;
            });
        }
    };

    const handleEngFileChange = (file) => {
        setEngFile(file);
        if (fieldErrors.files) {
            setFieldErrors(prev => {
                const next = { ...prev };
                delete next.files;
                return next;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        const errors = {};
        if (!formData.firstName?.trim()) errors.firstName = isEn ? "First name is required" : "სახელი სავალდებულოა";
        if (!formData.lastName?.trim()) errors.lastName = isEn ? "Last name is required" : "გვარი სავალდებულოა";
        if (!formData.birthDate) errors.birthDate = isEn ? "Date of birth is required" : "დაბადების თარიღი სავალდებულოა";
        if (!formData.citizenship?.trim()) errors.citizenship = isEn ? "Citizenship is required" : "მოქალაქეობა სავალდებულოა";
        if (!formData.affiliation?.trim()) errors.affiliation = isEn ? "Affiliation is required" : "აფილაცია სავალდებულოა";
        if (!formData.email?.trim()) errors.email = isEn ? "Email address is required" : "ელ-ფოსტა სავალდებულოა";
        if (!formData.presentationTitle?.trim()) errors.presentationTitle = isEn ? "Presentation title is required" : "მოხსენების სათაური სავალდებულოა";
        if (!geoFile && !engFile) errors.files = isEn ? "Please upload at least one abstract file (.doc, .docx)" : "გთხოვთ ატვირთოთ მინიმუმ ერთი თეზისი (.doc, .docx)";

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setSubmitError(
                isEn 
                    ? "Please complete the highlighted required fields."
                    : "გთხოვთ შეავსოთ მონიშნული სავალდებულო ველები."
            );
            
            // Auto-scroll to the first invalid field
            const firstKey = Object.keys(errors)[0];
            const targetEl = document.querySelector(`[name="${firstKey}"]`) || document.getElementById(`field-${firstKey}`);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (targetEl.focus) {
                    try { targetEl.focus(); } catch (_) {}
                }
            }
            return;
        }

        setFieldErrors({});

        setIsSubmitting(true);
        setUploadStatus(isEn ? 'Preparing registration...' : 'რეგისტრაციის მომზადება...');

        try {
            const supabase = getSupabaseBrowserClient();
            let clientGeoUrl = null;
            let clientEngUrl = null;

            // 1. Direct browser upload to Supabase Storage (conference-abstracts)
            if (supabase && geoFile) {
                try {
                    setUploadStatus(isEn ? 'Uploading Georgian abstract...' : 'მიმდინარეობს ქართული თეზისის ატვირთვა...');
                    const ext = (geoFile.name.split('.').pop() || 'docx').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'docx';
                    const path = `geo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const { error: upErr } = await supabase.storage
                        .from('conference-abstracts')
                        .upload(path, geoFile, { upsert: true });

                    if (!upErr) {
                        const { data } = supabase.storage.from('conference-abstracts').getPublicUrl(path);
                        clientGeoUrl = data?.publicUrl || null;
                    } else {
                        console.warn('Browser GEO upload notice:', upErr.message);
                    }
                } catch (cErr) {
                    console.warn('Browser GEO upload exception:', cErr);
                }
            }

            if (supabase && engFile) {
                try {
                    setUploadStatus(isEn ? 'Uploading English abstract...' : 'მიმდინარეობს ინგლისური თეზისის ატვირთვა...');
                    const ext = (engFile.name.split('.').pop() || 'docx').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'docx';
                    const path = `eng_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const { error: upErr } = await supabase.storage
                        .from('conference-abstracts')
                        .upload(path, engFile, { upsert: true });

                    if (!upErr) {
                        const { data } = supabase.storage.from('conference-abstracts').getPublicUrl(path);
                        clientEngUrl = data?.publicUrl || null;
                    } else {
                        console.warn('Browser ENG upload notice:', upErr.message);
                    }
                } catch (cErr) {
                    console.warn('Browser ENG upload exception:', cErr);
                }
            }

            setUploadStatus(isEn ? 'Submitting registration details...' : 'მონაცემების რეგისტრაცია...');

            const fd = new FormData();
            fd.append('firstName', formData.firstName);
            fd.append('lastName', formData.lastName);
            if (formData.birthDate) fd.append('birthDate', formData.birthDate);
            fd.append('citizenship', formData.citizenship);
            fd.append('affiliation', formData.affiliation);
            fd.append('titulation', formData.titulation);
            fd.append('gender', formData.gender);
            fd.append('email', formData.email);
            fd.append('isAttendingInPerson', String(formData.isAttendingInPerson));
            fd.append('presentationTitle', formData.presentationTitle);
            if (formData.coAuthors) fd.append('coAuthors', formData.coAuthors);
            fd.append('presentationType', formData.presentationType);

            const participationRole = formData.rolePresentingAuthor && formData.roleCoAuthor
                ? 'presenting_and_co_author'
                : formData.rolePresentingAuthor
                ? 'presenting_author'
                : 'co_author';
            fd.append('participationRole', participationRole);
            fd.append('thematicTopic', formData.thematicTopic);

            if (clientGeoUrl) fd.append('clientGeoUrl', clientGeoUrl);
            if (clientEngUrl) fd.append('clientEngUrl', clientEngUrl);

            // Raw files fallback
            if (geoFile) fd.append('geoFile', geoFile);
            if (engFile) fd.append('engFile', engFile);

            const res = await fetch('/api/conference/register', {
                method: 'POST',
                body: fd
            });

            let assignedAbstractNumber = `IICE-2026-${Math.floor(100 + Math.random() * 900)}`;

            if (res.ok) {
                const resData = await res.json();
                if (resData.abstractNumber) {
                    assignedAbstractNumber = resData.abstractNumber;
                }
                setSuccessData({
                    abstractNumber: assignedAbstractNumber,
                    name: `${formData.firstName} ${formData.lastName}`,
                });
                setTimeout(() => {
                    const el = document.getElementById('registration-success-banner');
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            } else {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'რეგისტრაცია ვერ მოხერხდა');
            }

            // Trigger audit logging for conference participant registration
            recordAuditLog({
                userEmail: formData.email,
                action: 'CONFERENCE_REGISTER',
                tableName: 'conference_participants_2026',
                recordId: assignedAbstractNumber,
                details: {
                    abstractNumber: assignedAbstractNumber,
                    fullName: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    affiliation: formData.affiliation,
                    citizenship: formData.citizenship,
                    presentationTitle: formData.presentationTitle,
                    presentationType: formData.presentationType,
                    thematicTopic: formData.thematicTopic,
                    hasGeoFile: Boolean(clientGeoUrl || geoFile),
                    hasEngFile: Boolean(clientEngUrl || engFile),
                }
            });

            // Reset form fields
            setFormData({
                firstName: '',
                lastName: '',
                birthDate: '',
                citizenship: '',
                affiliation: '',
                titulation: 'dr',
                gender: 'female',
                email: '',
                isAttendingInPerson: true,
                presentationTitle: '',
                coAuthors: '',
                presentationType: 'oral',
                rolePresentingAuthor: true,
                roleCoAuthor: false,
                thematicTopic: CONFERENCE_TOPICS[0].titleKa,
            });
            setGeoFile(null);
            setEngFile(null);
        } catch (err) {
            console.error('Submission error:', err);
            setSubmitError(err.message || (isEn ? "An unexpected error occurred. Please try again." : "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან."));
        } finally {
            setIsSubmitting(false);
            setUploadStatus('');
        }
    };

    const copyAbstractCode = () => {
        if (successData?.abstractNumber) {
            navigator.clipboard.writeText(successData.abstractNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Custom Modern Conference Header Banner - Institute Theme & Bilingual */}
            <div className="relative animated-gradient-bg overflow-hidden border-b border-purple-100/80 pt-3 sm:pt-4 lg:pt-5 pb-6 sm:pb-8 lg:pb-8 px-4 sm:px-6 lg:px-10 shadow-xs">
                {/* Ambient soft background blobs like main page */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-float-blob-slow pointer-events-none"></div>
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-200/30 rounded-full blur-3xl animate-float-blob-reverse pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-pink-100/20 rounded-full blur-3xl animate-float-blob pointer-events-none"></div>

                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                        
                        {/* Left Column: Academic & Conference Identity (7 cols) */}
                        <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
                            
                            {/* Top Badge */}
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black tracking-wide bg-purple-100 text-[#60318e] border border-purple-200 shadow-xs">
                                <span>{t.badge}</span>
                            </div>

                            {/* Main Heading - Matched exactly to homepage announcement card */}
                            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                                {isEn
                                    ? '3rd International Scientific Conference: “Modern Trends in Chemistry, Chemical Technologies and Related Fields: Green Energy Prospects, Ecological Sustainability, Food Safety. 2026”'
                                    : 'მე-3 საერთაშორისო სამეცნიერო კონფერენცია: „თანამედროვე ტენდენციები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში: მწვანე ენერგეტიკის პერსპექტივები, ეკოლოგიური მდგრადობა, სურსათის უვნებელობა. 2026“'}
                            </h1>

                            {/* Key Thematic Focus Badges (Green Energy, Eco, Chem Tech, Food Safety) */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-purple-200 text-slate-700 text-xs font-semibold shadow-xs">
                                    <span>⚡ {isEn ? "Green Energy Prospects" : "მწვანე ენერგეტიკა"}</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-purple-200 text-slate-700 text-xs font-semibold shadow-xs">
                                    <span>🌿 {isEn ? "Ecological Sustainability" : "ეკოლოგიური მდგრადობა"}</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-purple-200 text-slate-700 text-xs font-semibold shadow-xs">
                                    <span>🧪 {isEn ? "Chemical Technologies" : "ქიმიური ტექნოლოგიები"}</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-purple-200 text-slate-700 text-xs font-semibold shadow-xs">
                                    <span>🛡️ {isEn ? "Food Safety" : "სურსათის უვნებელობა"}</span>
                                </span>
                            </div>

                            {/* 70th Anniversary Commemorative Ribbon */}
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100/90 via-amber-50 to-purple-50/50 border-l-4 border-amber-500 rounded-2xl py-3 px-4 shadow-sm border border-amber-300/70 ring-1 ring-amber-400/20 max-w-2xl text-left">
                                <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-black text-amber-950 leading-snug tracking-tight">
                                    {t.anniversary}
                                </span>
                            </div>

                            {/* Dates & Venues & Deadline Pills */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs">
                                <div className="flex items-center gap-2 bg-gradient-to-r from-[#60318e] to-[#7A1CAC] text-white px-4 py-2 rounded-xl shadow-sm font-bold">
                                    <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                    <span>{t.datesText}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-purple-200 shadow-xs text-slate-700 font-semibold">
                                    <MapPin className="w-4 h-4 text-[#60318e] flex-shrink-0" />
                                    <span>{t.venuesText}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-xl border border-emerald-200 shadow-xs font-bold">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>{t.deadlineText}</span>
                                </div>
                            </div>

                            {/* Rustaveli Foundation Grant Support Callout with Official Logo */}
                            <div className="flex items-center gap-3 bg-white/90 text-slate-700 p-2.5 rounded-2xl border border-purple-200/80 shadow-xs max-w-2xl text-left text-xs">
                                <Image 
                                    src="/conference-2026/rustaveli-logo.png" 
                                    alt="Shota Rustaveli National Science Foundation" 
                                    width={32} 
                                    height={32} 
                                    className="w-8 h-8 object-contain rounded-lg bg-white p-0.5 flex-shrink-0 shadow-xs border border-slate-100" 
                                />
                                <span className="text-[11px] sm:text-xs font-medium leading-tight text-slate-700">
                                    {t.grantNotice}
                                </span>
                            </div>

                            {/* CTA Action Buttons */}
                            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <button
                                    onClick={() => {
                                        setActiveTab('registration');
                                        document.getElementById('tabs-navigation')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#60318e] to-[#7A1CAC] hover:from-[#7A1CAC] hover:to-[#AD49E1] text-white font-extrabold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{isEn ? "Go to Registration Form ↓" : "რეგისტრაცია და აბსტრაქტი ↓"}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab('schedule');
                                        document.getElementById('tabs-navigation')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-[#60318e] font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm border border-purple-200 shadow-xs hover:shadow-sm transition-all cursor-pointer"
                                >
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{isEn ? "Preliminary Program" : "კონფერენციის პროგრამა"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Column: High-Impact 70th Anniversary Emblem with Institute Building (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/95 via-purple-50/70 to-indigo-50/90 shadow-xl border-2 border-purple-200/80 backdrop-blur-sm transform hover:scale-105 transition-all duration-500 flex flex-col items-center justify-center group">
                                {/* The Clean Cropped 70th Emblem with the Institute Building inside the '0' */}
                                <Image
                                    src={isEn ? "/conference-2026/iice-70-clean-eng.png" : "/conference-2026/iice-70-clean-geo.png"}
                                    alt={isEn ? "70th Anniversary Emblem - R. Agladze Institute of Inorganic Chemistry and Electrochemistry" : "70 წლის საიუბილეო ემბლემა - რაფიელ აგლაძის ინსტიტუტი"}
                                    width={520}
                                    height={260}
                                    priority
                                    className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] h-auto object-contain drop-shadow-xl select-none"
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-200/50 rounded-full z-[-1] blur-xl animate-float-blob pointer-events-none"></div>
                            <div className="absolute -top-4 -right-4 w-28 h-28 bg-indigo-100/60 rounded-full z-[-1] blur-xl animate-float-blob-reverse pointer-events-none"></div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Sticky Navigation Tabs with Chevron Scroll and Zero Native Scrollbar */}
            <div id="tabs-navigation" className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
                <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center relative py-2">
                    {/* Left Scroll Button */}
                    <button
                        type="button"
                        onClick={() => scrollTabs('left')}
                        className="p-1.5 sm:p-2 rounded-xl bg-purple-50 hover:bg-[#60318e] text-[#60318e] hover:text-white transition-colors flex-shrink-0 cursor-pointer shadow-xs mr-1 flex items-center justify-center border border-purple-100"
                        aria-label="Scroll Tabs Left"
                        title="მარცხნივ გადახვევა"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Scrollable Tabs */}
                    <div
                        ref={tabsContainerRef}
                        role="tablist"
                        aria-label={isEn ? "Conference Sections" : "კონფერენციის სექციები"}
                        className="flex space-x-1 sm:space-x-2 py-1 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth flex-grow"
                    >
                        {Object.entries(t.tabs).map(([key, label]) => (
                            <button
                                key={key}
                                role="tab"
                                aria-selected={activeTab === key}
                                aria-controls={`tabpanel-${key}`}
                                id={`tab-${key}`}
                                onClick={() => setActiveTab(key)}
                                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                                    activeTab === key
                                        ? 'bg-[#60318e] text-white shadow-md font-extrabold'
                                        : 'text-slate-600 hover:text-[#60318e] hover:bg-purple-50/60'
                                }`}
                            >
                                {key === 'registration' && <Send className="w-3.5 h-3.5" />}
                                {key === 'topics' && <Tag className="w-3.5 h-3.5" />}
                                {key === 'speakers' && <Users className="w-3.5 h-3.5" />}
                                {key === 'schedule' && <Clock className="w-3.5 h-3.5" />}
                                {key === 'organizers' && <Building2 className="w-3.5 h-3.5" />}
                                {key === 'venues' && <MapPin className="w-3.5 h-3.5" />}
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Scroll Button */}
                    <button
                        type="button"
                        onClick={() => scrollTabs('right')}
                        className="p-1.5 sm:p-2 rounded-xl bg-purple-50 hover:bg-[#60318e] text-[#60318e] hover:text-white transition-colors flex-shrink-0 cursor-pointer shadow-xs ml-1 flex items-center justify-center border border-purple-100"
                        aria-label="Scroll Tabs Right"
                        title="მარჯვნივ გადახვევა"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tab Contents Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

                {/* 1. REGISTRATION FORM TAB (Compact, Sleek & Fully Visible) */}
                {activeTab === 'registration' && (
                    <div id="tabpanel-registration" role="tabpanel" aria-labelledby="tab-registration" className="bg-white rounded-3xl shadow-sm border border-purple-100 p-4 sm:p-6 md:p-7 animate-fade-in">
                        <div className="text-center max-w-xl mx-auto mb-4">
                            <h2 className="text-base sm:text-lg font-black text-[#60318e] mb-1">
                                {t.form.heading}
                            </h2>
                        </div>

                        {submitError && (
                            <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                            {/* 1. Personal Info */}
                            <div className="space-y-2.5 bg-purple-50/20 p-3 sm:p-4 rounded-2xl border border-purple-100/70">
                                <h3 className="text-xs font-bold text-[#60318e] pb-1 border-b border-purple-100 flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5 text-[#AD49E1]" />
                                    <span>{isEn ? "1. Personal Information" : "1. პერსონალური მონაცემები"}</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.firstName} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "First name" : "სახელი"}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white min-h-[44px] transition-all ${
                                                fieldErrors.firstName ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-200 focus:ring-[#AD49E1]'
                                            }`}
                                        />
                                        {fieldErrors.firstName && (
                                            <span className="text-[10px] text-red-500 font-semibold mt-1 block">{fieldErrors.firstName}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.lastName} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "Last name" : "გვარი"}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white min-h-[44px] transition-all ${
                                                fieldErrors.lastName ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-200 focus:ring-[#AD49E1]'
                                            }`}
                                        />
                                        {fieldErrors.lastName && (
                                            <span className="text-[10px] text-red-500 font-semibold mt-1 block">{fieldErrors.lastName}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                                    <div className="flex flex-col">
                                        <label className="block font-bold text-slate-700 text-xs mb-1 min-h-[32px] flex items-end">
                                            <span>{t.form.birthDate} <span className="text-red-500">*</span></span>
                                        </label>
                                        <input
                                            type="date"
                                            name="birthDate"
                                            required
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white min-h-[44px] transition-all ${
                                                fieldErrors.birthDate ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-200 focus:ring-[#AD49E1]'
                                            }`}
                                        />
                                        {fieldErrors.birthDate && (
                                            <span className="text-[10px] text-red-500 font-semibold mt-1 block">{fieldErrors.birthDate}</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="block font-bold text-slate-700 text-xs mb-1 min-h-[32px] flex items-end">
                                            <span>{t.form.citizenship} <span className="text-red-500">*</span></span>
                                        </label>
                                        <input
                                            type="text"
                                            name="citizenship"
                                            required
                                            value={formData.citizenship}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "e.g., Georgia" : "მაგ: საქართველო"}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white min-h-[44px] transition-all ${
                                                fieldErrors.citizenship ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-200 focus:ring-[#AD49E1]'
                                            }`}
                                        />
                                        {fieldErrors.citizenship && (
                                            <span className="text-[10px] text-red-500 font-semibold mt-1 block">{fieldErrors.citizenship}</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="block font-bold text-slate-700 text-xs mb-1 min-h-[32px] flex items-end leading-tight">
                                            <span>{t.form.affiliation} <span className="text-red-500">*</span></span>
                                        </label>
                                        <input
                                            type="text"
                                            name="affiliation"
                                            required
                                            value={formData.affiliation}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "Institute / University / Organization, Country" : "ინსტიტუტი / უნივერსიტეტი / ორგანიზაცია, ქვეყანა"}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white min-h-[44px] transition-all ${
                                                fieldErrors.affiliation ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-200 focus:ring-[#AD49E1]'
                                            }`}
                                        />
                                        {fieldErrors.affiliation && (
                                            <span className="text-[10px] text-red-500 font-semibold mt-1 block">{fieldErrors.affiliation}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Titulation Wrap Pills - Never Cut Off */}
                                <div>
                                    <label className="block font-bold text-slate-700 text-xs mb-1">
                                        {t.form.titulation}
                                    </label>
                                    <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-xl border border-purple-100/90">
                                        {titulationOptions.map(opt => {
                                            const isChecked = formData.titulation === opt.value;
                                            return (
                                                <label
                                                    key={opt.value}
                                                    className={`inline-flex items-center gap-1.5 cursor-pointer text-xs py-1 px-2.5 rounded-lg border transition-all select-none ${
                                                        isChecked
                                                            ? 'bg-purple-100/80 border-[#60318e] text-[#60318e] font-extrabold shadow-2xs'
                                                            : 'bg-white border-slate-200/80 text-slate-700 hover:bg-purple-50/50 hover:border-purple-200'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="titulation"
                                                        value={opt.value}
                                                        checked={isChecked}
                                                        onChange={handleInputChange}
                                                        className="text-[#60318e] focus:ring-[#AD49E1] h-3.5 w-3.5"
                                                    />
                                                    <span className="leading-snug">{isEn ? opt.labelEn : opt.labelKa}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Gender & Email & Attendance */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.gender}
                                        </label>
                                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 min-h-[44px]">
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === 'female'}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] focus:ring-[#AD49E1] h-3.5 w-3.5"
                                                />
                                                <span>{t.form.female}</span>
                                            </label>
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === 'male'}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] focus:ring-[#AD49E1] h-3.5 w-3.5"
                                                />
                                                <span>{t.form.male}</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.email} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="researcher@domain.com"
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white min-h-[44px] transition-all ${
                                                fieldErrors.email ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-200 focus:ring-[#AD49E1]'
                                            }`}
                                        />
                                        {fieldErrors.email && (
                                            <span className="text-[10px] text-red-500 font-semibold mt-1 block">{fieldErrors.email}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.attendance}
                                        </label>
                                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 min-h-[44px]">
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="isAttendingInPerson"
                                                    checked={formData.isAttendingInPerson === true}
                                                    onChange={() => setFormData(p => ({ ...p, isAttendingInPerson: true }))}
                                                    className="text-[#60318e] focus:ring-[#AD49E1] h-3.5 w-3.5"
                                                />
                                                <span>{t.form.yes}</span>
                                            </label>
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="isAttendingInPerson"
                                                    checked={formData.isAttendingInPerson === false}
                                                    onChange={() => setFormData(p => ({ ...p, isAttendingInPerson: false }))}
                                                    className="text-[#60318e] focus:ring-[#AD49E1] h-3.5 w-3.5"
                                                />
                                                <span>{t.form.no}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Presentation Details */}
                            <div className="space-y-2.5 bg-purple-50/20 p-3 sm:p-4 rounded-2xl border border-purple-100/70">
                                <h3 className="text-xs font-bold text-[#60318e] pb-1 border-b border-purple-100 flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-[#AD49E1]" />
                                    <span>{isEn ? "2. Presentation & Abstract Details" : "2. მოხსენებისა და აბსტრაქტის დეტალები"}</span>
                                </h3>

                                <div>
                                    <label className="block font-bold text-slate-700 text-xs mb-1">
                                        {t.form.presTitle} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="presentationTitle"
                                        required
                                        rows={2}
                                        value={formData.presentationTitle}
                                        onChange={handleInputChange}
                                        placeholder={isEn ? "Title of your presentation..." : "თქვენი სამეცნიერო მოხსენების სათაური..."}
                                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white min-h-[64px] resize-none transition-all ${
                                            fieldErrors.presentationTitle ? 'border-red-400 focus:ring-red-200 bg-red-50/20' : 'border-slate-200 focus:ring-[#AD49E1]'
                                        }`}
                                    />
                                    {fieldErrors.presentationTitle && (
                                        <span className="text-[10px] text-red-500 font-semibold mt-1 block">{fieldErrors.presentationTitle}</span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.coAuthors}
                                        </label>
                                        <input
                                            type="text"
                                            name="coAuthors"
                                            value={formData.coAuthors}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "e.g., G. Tatishvili, T. Lezhava" : "მაგ: გ. ტატიშვილი, თ. ლეჟავა"}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white min-h-[44px]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.topic}
                                        </label>
                                        <select
                                            name="thematicTopic"
                                            value={formData.thematicTopic}
                                            onChange={handleInputChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white font-medium truncate min-h-[44px]"
                                        >
                                            {thematicTopics.map(top => (
                                                <option key={top.id} value={top.titleKa}>
                                                    {isEn ? top.titleEn : top.titleKa}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Presentation Type & Role */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.presType}
                                        </label>
                                        <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-xl border border-purple-100 min-h-[44px] items-center">
                                            {presentationTypeOptions.map(opt => {
                                                const isChecked = formData.presentationType === opt.value;
                                                return (
                                                    <label
                                                        key={opt.value}
                                                        className={`inline-flex items-center gap-1.5 cursor-pointer text-xs py-1.5 px-2.5 rounded-lg border transition-all ${
                                                            isChecked
                                                                ? 'bg-purple-100/90 border-[#60318e] text-[#60318e] font-extrabold shadow-2xs'
                                                                : 'bg-white border-transparent text-slate-700 hover:bg-purple-50/50'
                                                        }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="presentationType"
                                                            value={opt.value}
                                                            checked={isChecked}
                                                            onChange={handleInputChange}
                                                            className="text-[#60318e] focus:ring-[#AD49E1] h-3.5 w-3.5"
                                                        />
                                                        <span className="whitespace-nowrap">{isEn ? opt.labelEn : opt.labelKa}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 text-xs mb-1">
                                            {t.form.role}
                                        </label>
                                        <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-xl border border-purple-100 min-h-[44px] items-center px-2.5">
                                            <label className={`inline-flex items-center gap-1.5 cursor-pointer text-xs py-1 px-2 rounded-md transition-all ${
                                                formData.rolePresentingAuthor
                                                    ? 'bg-purple-100/90 text-[#60318e] font-bold'
                                                    : 'text-slate-700 hover:text-[#60318e]'
                                            }`}>
                                                <input
                                                    type="checkbox"
                                                    name="rolePresentingAuthor"
                                                    checked={formData.rolePresentingAuthor}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] rounded h-3.5 w-3.5"
                                                />
                                                <span>{t.form.presentingAuthor}</span>
                                            </label>
                                            <label className={`inline-flex items-center gap-1.5 cursor-pointer text-xs py-1 px-2 rounded-md transition-all ${
                                                formData.roleCoAuthor
                                                    ? 'bg-purple-100/90 text-[#60318e] font-bold'
                                                    : 'text-slate-700 hover:text-[#60318e]'
                                            }`}>
                                                <input
                                                    type="checkbox"
                                                    name="roleCoAuthor"
                                                    checked={formData.roleCoAuthor}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] rounded h-3.5 w-3.5"
                                                />
                                                <span>{t.form.coAuthor}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. File Uploads (Strictly .doc, .docx - NO PDF) */}
                            <div id="field-files" className={`space-y-3 p-3 sm:p-4 rounded-2xl border transition-all ${
                                fieldErrors.files ? 'bg-red-50/30 border-red-300 ring-2 ring-red-200' : 'bg-purple-50/20 border-purple-100/70'
                            }`}>
                                <div className="pb-1 border-b border-purple-100">
                                    <h3 className="text-xs font-bold text-[#60318e] flex items-center gap-2">
                                        <UploadCloud className="w-3.5 h-3.5 text-[#AD49E1]" />
                                        <span>{isEn ? "3. Upload Abstract" : "3. აბსტრაქტის ატვირთვა"}</span>
                                    </h3>
                                    <p className="text-[11px] text-purple-900 font-semibold mt-0.5">
                                        {isEn 
                                            ? "Must be submitted in two languages: Georgian and English" 
                                            : "წარმოდგენილი უნდა იყოს ორ ენაზე: ქართულად და ინგლისურად"}
                                    </p>
                                    {fieldErrors.files && (
                                        <p className="text-xs text-red-600 font-bold mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            <span>{fieldErrors.files}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div className="border border-dashed border-purple-200 rounded-xl p-2.5 text-center bg-white hover:bg-purple-50/30 transition-colors relative">
                                        <label className="block font-bold text-slate-800 text-xs mb-0.5 cursor-pointer">
                                            {t.form.geoNotice}
                                        </label>
                                        <span className="text-[10px] text-slate-500 block mb-1.5 font-medium">
                                            {isEn ? "Only Word files (.doc, .docx)" : "მხოლოდ Word ფორმატი (.doc, .docx)"}
                                        </span>
                                        {!geoFile ? (
                                            <input
                                                type="file"
                                                accept=".doc,.docx"
                                                onChange={(e) => handleGeoFileChange(e.target.files?.[0] || null)}
                                                className="text-[11px] text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-between bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 shadow-xs">
                                                <span className="font-bold text-[#60318e] text-[11px] truncate flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                                    {geoFile.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleGeoFileChange(null)}
                                                    className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-colors ml-1 flex-shrink-0 cursor-pointer"
                                                    title={isEn ? "Remove file" : "ფაილის წაშლა"}
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border border-dashed border-purple-200 rounded-xl p-2.5 text-center bg-white hover:bg-purple-50/30 transition-colors relative">
                                        <label className="block font-bold text-slate-800 text-xs mb-0.5 cursor-pointer">
                                            {t.form.engNotice}
                                        </label>
                                        <span className="text-[10px] text-slate-500 block mb-1.5 font-medium">
                                            {isEn ? "Only Word files (.doc, .docx)" : "მხოლოდ Word ფორმატი (.doc, .docx)"}
                                        </span>
                                        {!engFile ? (
                                            <input
                                                type="file"
                                                accept=".doc,.docx"
                                                onChange={(e) => handleEngFileChange(e.target.files?.[0] || null)}
                                                className="text-[11px] text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-between bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 shadow-xs">
                                                <span className="font-bold text-[#60318e] text-[11px] truncate flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                                    {engFile.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEngFileChange(null)}
                                                    className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-colors ml-1 flex-shrink-0 cursor-pointer"
                                                    title={isEn ? "Remove file" : "ფაილის წაშლა"}
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Abstract Templates Direct Download Box */}
                                <div className="p-3 rounded-2xl bg-white border border-purple-200/90 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-2xs">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                                        <FileText className="w-4 h-4 text-[#60318e]" />
                                        <span>{t.form.downloadTemplatesHeading}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <a
                                            href="/conference-2026/Abstract-template-GEO.doc"
                                            download="Abstract-template GEO.doc"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#60318e] font-bold text-[11px] border border-purple-200 transition-all shadow-2xs"
                                        >
                                            <Download className="w-3 h-3" />
                                            <span>{isEn ? "Template GEO (.doc)" : "შაბლონი ქართული (.doc)"}</span>
                                        </a>
                                        <a
                                            href="/conference-2026/Abstract-template-ENG.docx"
                                            download="Abstract-template ENG.docx"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#60318e] font-bold text-[11px] border border-purple-200 transition-all shadow-2xs"
                                        >
                                            <Download className="w-3 h-3" />
                                            <span>{isEn ? "Template ENG (.docx)" : "შაბლონი ინგლისური (.docx)"}</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Poster Guidance Box */}
                                <div className="p-2.5 rounded-xl bg-blue-50/90 border border-blue-200 text-blue-950 text-[11px] leading-relaxed flex items-start gap-2">
                                    <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span className="font-medium">{t.form.posterNotice}</span>
                                </div>

                                {/* Translation Footnote Notice */}
                                <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-[11px] leading-relaxed flex items-start gap-2">
                                    <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <span className="font-medium">{t.form.footnote}</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-1.5 text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-extrabold px-8 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>{uploadStatus || t.form.submitting}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            <span>{t.form.submitBtn}</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Inline Success Registration Card (Shown below form instead of popup) */}
                            {successData && (
                                <div
                                    id="registration-success-banner"
                                    className="mt-6 p-6 sm:p-8 bg-gradient-to-br from-emerald-50/90 via-purple-50/40 to-white rounded-3xl border-2 border-emerald-300 shadow-lg animate-fade-in text-center max-w-xl mx-auto"
                                >
                                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-black text-[#60318e] mb-2">
                                        {t.success.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-medium">
                                        {t.success.numberText}
                                    </p>

                                    <div className="bg-purple-50/60 border-2 border-dashed border-[#AD49E1] rounded-2xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-md mx-auto shadow-2xs">
                                        <span className="text-xl sm:text-2xl font-black text-[#60318e] tracking-wider font-mono">
                                            {successData.abstractNumber}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={copyAbstractCode}
                                            className="inline-flex items-center gap-1.5 bg-[#60318e] hover:bg-[#7A1CAC] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer interactive-tap"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4 text-emerald-300" />
                                                    <span>{t.success.copied}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    <span>{t.success.copy}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed mb-5">
                                        {t.success.advice}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => setSuccessData(null)}
                                        className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                                    >
                                        <span>{t.success.close}</span>
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* 2. THEMATIC TOPICS TAB */}
                {activeTab === 'topics' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#60318e] mb-1">
                                {isEn ? "Conference Thematic Topics" : "კონფერენციის თემატური მიმართულებები"}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {isEn
                                    ? "Abstracts and oral/poster presentations are invited in the following scientific sections and subtopics:"
                                    : "სამეცნიერო მოხსენებები და აბსტრაქტები მიიღება შემდეგ თემატურ სექციებსა და ქვემიმართულებებში:"}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {thematicTopics.map((top) => (
                                <div
                                    key={top.id}
                                    className="p-5 sm:p-6 rounded-2xl border border-purple-100 bg-slate-50/50 hover:bg-purple-50/40 hover:border-purple-200 transition-all flex flex-col justify-between group shadow-2xs"
                                >
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-2.5">
                                            <span className="w-8 h-8 rounded-xl bg-[#60318e] text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-xs">
                                                {top.num}
                                            </span>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#AD49E1] bg-purple-100/70 px-2.5 py-0.5 rounded-full">
                                                {isEn ? `Section ${top.num}` : `სექცია ${top.num}`}
                                            </span>
                                        </div>

                                        <h4 className="font-extrabold text-sm sm:text-base text-gray-900 leading-snug mb-3 group-hover:text-[#60318e] transition-colors">
                                            {isEn ? top.titleEn : top.titleKa}
                                        </h4>

                                        {/* Subtopics List */}
                                        {(isEn ? top.subtopicsEn : top.subtopicsKa)?.length > 0 && (
                                            <div className="pt-2 border-t border-purple-100/80">
                                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                                    {isEn ? "Subtopics & Directions:" : "ქვემიმართულებები:"}
                                                </span>
                                                <ul className="space-y-1.5">
                                                    {(isEn ? top.subtopicsEn : top.subtopicsKa).map((sub, sIdx) => (
                                                        <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                            <span>{sub}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2.1 INVITED SPEAKERS TAB */}
                {activeTab === 'speakers' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#60318e] text-xs font-bold mb-2">
                                <Users className="w-3.5 h-3.5 text-[#AD49E1]" />
                                <span>{isEn ? "Keynote Lectures" : "პლენარული მოხსენებები"}</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#60318e] mb-1">
                                {isEn ? "Invited Keynote Speakers" : "მოწვეული მომხსენებლები"}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {isEn
                                    ? "Distinguished international scientists delivering keynote lectures at the 3rd International Scientific Conference 2026."
                                    : "საერთაშორისო დონის მეცნიერები და მოწვეული მკვლევრები, რომლებიც წარადგენენ პლენარულ მოხსენებებს მე-3 საერთაშორისო კონფერენციაზე."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {INVITED_SPEAKERS.map((speaker) => (
                                <div
                                    key={speaker.id}
                                    className="p-6 rounded-3xl border border-purple-100 bg-slate-50/40 hover:bg-purple-50/30 hover:border-purple-200 transition-all flex flex-col justify-between shadow-2xs space-y-4"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-4">
                                            {speaker.image ? (
                                                <img
                                                    src={speaker.image}
                                                    alt={isEn ? speaker.nameEn : speaker.nameKa}
                                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-200 shadow-sm flex-shrink-0 bg-white"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#60318e] to-[#AD49E1] text-white flex items-center justify-center font-black text-xl shadow-sm flex-shrink-0 border-2 border-purple-200">
                                                    {speaker.initials}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-[#60318e] border border-purple-200 inline-block mb-1">
                                                    {isEn ? speaker.countryEn : speaker.countryKa} • Keynote
                                                </span>
                                                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-snug">
                                                    {isEn ? speaker.nameEn : speaker.nameKa}
                                                </h3>
                                                <p className="text-[11px] font-semibold text-purple-900 mt-0.5 line-clamp-2">
                                                    {isEn ? speaker.roleEn : speaker.roleKa}
                                                </p>
                                                <p className="text-[11px] text-gray-500 mt-0.5">
                                                    {isEn ? speaker.affiliationEn : speaker.affiliationKa}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Presentation topic box */}
                                        <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 text-xs">
                                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#60318e] block mb-0.5 flex items-center gap-1">
                                                <FileText className="w-3 h-3 text-[#AD49E1]" />
                                                {isEn ? "Presentation Topic:" : "მოხსენების თემა:"}
                                            </span>
                                            <p className="font-bold text-gray-900 italic leading-snug">
                                                „{isEn ? speaker.topicEn : speaker.topicKa}“
                                            </p>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {isEn ? speaker.bioEn : speaker.bioKa}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. PRELIMINARY SCHEDULE TAB */}
                {activeTab === 'schedule' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-[#60318e]">
                                    {isEn ? "Preliminary Program" : "კონფერენციის წინასწარი პროგრამა"}
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {isEn
                                        ? "Detailed preliminary schedule of plenary, sectional, and social events."
                                        : "პლენარული, სექციური და სოციალური ღონისძიებების დეტალური წინასწარი განრიგი."}
                                </p>
                            </div>
                            <span className="text-xs font-bold text-[#AD49E1] bg-purple-50 px-3 py-1 rounded-full border border-purple-200 self-start sm:self-auto">
                                25–27 ნოემბერი, 2026
                            </span>
                        </div>

                        {/* Day 1 */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-black text-[#60318e]">
                                <Landmark className="w-5 h-5 text-[#AD49E1]" />
                                <h3>
                                    {isEn
                                        ? "Day 1: Wednesday, November 25 — Tbilisi (Ivane Javakhishvili Tbilisi State University)"
                                        : "დღე 1: ოთხშაბათი, 25 ნოემბერი — თბილისი (ივ. ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი)"}
                                </h3>
                            </div>
                            <div className="space-y-2 text-xs border-l-2 border-purple-200 ml-2.5 pl-4">
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">09:00 – 10:00:</strong>{" "}
                                    {isEn ? "Registration of participants" : "მონაწილეთა რეგისტრაცია"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 10:30:</strong>{" "}
                                    {isEn
                                        ? "Welcome remarks: Ministry of Education and Science of Georgia, TSU Administration, Georgian National Academy of Sciences, Foreign Guest"
                                        : "მისალმება: საქართველოს განათლებისა და მეცნიერების სამინისტრო, თსუ ადმინისტრაცია, საქართველოს მეცნიერებათა ეროვნული აკადემია, უცხოელი სტუმარი"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:30 – 11:00:</strong>{" "}
                                    {isEn
                                        ? "Grigor Tatishvili, Corresponding Member, Georgian National Academy of Sciences; Director, R. Agladze Institute of Inorganic Chemistry and Electrochemistry"
                                        : "გრიგორ ტატიშვილი, წევრ-კორესპონდენტი, საქართველოს მეცნიერებათა ეროვნული აკადემია; დირექტორი, რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">11:00 – 12:00:</strong>{" "}
                                    {isEn ? "Plenary reports: Two speeches" : "პლენარული მოხსენებები: ორი მოხსენება"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">12:00 – 12:30:</strong>{" "}
                                    {isEn ? "Coffee break" : "შესვენება ყავაზე"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">12:30 – 14:00:</strong>{" "}
                                    {isEn ? "Plenary reports: Two speeches" : "პლენარული მოხსენებები: ორი მოხსენება"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 14:00:</strong>{" "}
                                    {isEn ? "Poster section (exhibition)" : "პოსტერული სექცია (გამოფენა)"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">14:00 – 15:00:</strong>{" "}
                                    {isEn ? "Lunch (Refreshments)" : "ხემსი"}
                                </div>
                                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200">
                                    <strong className="text-amber-900">16:00:</strong>{" "}
                                    {isEn
                                        ? "Departure to Telavi (Free transportation provided by the organizing committee)"
                                        : "გამგზავრება თელავში (ტრანსპორტს უზრუნველყოფენ ორგანიზატორები)"}
                                </div>
                            </div>
                        </div>

                        {/* Day 2 */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-black text-[#60318e]">
                                <GraduationCap className="w-5 h-5 text-[#AD49E1]" />
                                <h3>
                                    {isEn
                                        ? "Day 2: Thursday, November 26 — Telavi (Iakob Gogebashvili Telavi State University)"
                                        : "დღე 2: ხუთშაბათი, 26 ნოემბერი — თელავი (ი. გოგებაშვილის სახელობის თელავის სახელმწიფო უნივერსიტეტი)"}
                                </h3>
                            </div>
                            <div className="space-y-2 text-xs border-l-2 border-purple-200 ml-2.5 pl-4">
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">09:30 – 10:00:</strong>{" "}
                                    {isEn ? "Registration" : "რეგისტრაცია"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 12:00:</strong>{" "}
                                    {isEn
                                        ? "Plenary and parallel sections: Nanoprocesses & Nanotechnologies; Mineral Processing; Green Chemistry; Popularization of Innovations; Food Chemistry & Quality"
                                        : "პლენარული და პარალელური სექციები: ნანოპროცესები და ნანოტექნოლოგიები, სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავება, მწვანე ქიმია, სამეცნიერო ინოვაციების პოპულარიზაცია, სურსათის ქიმია"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">12:00 – 13:00:</strong>{" "}
                                    {isEn ? "Coffee break" : "შესვენება ყავაზე"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">12:00 – 13:30:</strong>{" "}
                                    {isEn ? "Poster section (exhibition – discussion)" : "პოსტერული სექცია (გამოფენა-განხილვა)"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">13:30 – 15:00:</strong>{" "}
                                    {isEn ? "Plenary and parallel sections" : "პლენარული და პარალელური სექციები"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">15:00 – 16:00:</strong>{" "}
                                    {isEn ? "Lunch" : "სადილი"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">16:00 – 18:00:</strong>{" "}
                                    {isEn ? "Plenary and parallel sections" : "პლენარული და პარალელური სექციები"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 17:00:</strong>{" "}
                                    {isEn ? "Poster section (exhibition)" : "პოსტერული სექცია (გამოფენა)"}
                                </div>
                            </div>
                        </div>

                        {/* Day 3 */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-black text-[#60318e]">
                                <PartyPopper className="w-5 h-5 text-[#AD49E1]" />
                                <h3>
                                    {isEn
                                        ? "Day 3: Friday, November 27 — Telavi (Iakob Gogebashvili Telavi State University)"
                                        : "დღე 3: პარასკევი, 27 ნოემბერი — თელავი (ი. გოგებაშვილის სახელობის თელავის სახელმწიფო უნივერსიტეტი)"}
                                </h3>
                            </div>
                            <div className="space-y-2 text-xs border-l-2 border-purple-200 ml-2.5 pl-4">
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">09:30 – 10:00:</strong>{" "}
                                    {isEn ? "Registration" : "რეგისტრაცია"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 13:00:</strong>{" "}
                                    {isEn ? "Plenary and parallel sections" : "პლენარული და პარალელური სექციები"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">13:00 – 13:30:</strong>{" "}
                                    {isEn ? "Lunch (Refreshments)" : "ხემსი"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">13:30 – 14:00:</strong>{" "}
                                    {isEn
                                        ? "Closing of the conference & Presentation of certificates (in-person and online participants)"
                                        : "ღონისძიების დახურვა (სერტიფიკატების გადაცემა დამსწრეებს, სხვა მონაწილეებს ონლაინ)"}
                                </div>
                                <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
                                    <strong className="text-emerald-900">15:00 – 20:00:</strong>{" "}
                                    {isEn
                                        ? "Social program & Gala Dinner (18:00 – 20:00)"
                                        : "სოციალური პროგრამა და საზეიმო ვახშამი (18:00 – 20:00)"}
                                </div>
                            </div>
                        </div>

                        {/* Program Direct Downloads Box */}
                        <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h4 className="font-extrabold text-sm text-[#60318e] flex items-center gap-2">
                                    <Download className="w-4 h-4 text-[#AD49E1]" />
                                    <span>{isEn ? "Download Preliminary Program Documents" : "პროგრამის დოკუმენტების ჩამოტვირთვა"}</span>
                                </h4>
                                <p className="text-xs text-gray-600 mt-0.5">
                                    {isEn
                                        ? "Save the complete preliminary program schedule in Microsoft Word format (.docx)"
                                        : "ჩამოტვირთეთ კონფერენციის წინასწარი პროგრამა Word-ის ფორმატში (.docx)"}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2.5">
                                <a
                                    href="/conference-2026/Preliminary-Program-GEO.docx"
                                    download="Preliminary-Program-GEO.docx"
                                    className="inline-flex items-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{isEn ? "Program GEO (.docx)" : "პროგრამა ქართულად (.docx)"}</span>
                                </a>
                                <a
                                    href="/conference-2026/Preliminary-Program-ENG.docx"
                                    download="Preliminary-Program-ENG.docx"
                                    className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-[#60318e] font-bold px-4 py-2 rounded-xl text-xs border border-purple-300 shadow-xs transition-colors cursor-pointer"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{isEn ? "Program ENG (.docx)" : "პროგრამა ინგლისურად (.docx)"}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3.1 ORGANIZERS TAB */}
                {activeTab === 'organizers' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-10">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#60318e] mb-2">
                                {isEn ? "Organizing Institutions" : "საორგანიზაციო ინსტიტუციები"}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                {isEn
                                    ? "The 3rd International Scientific Conference 2026 is organized jointly by Georgia's leading universities and scientific research institutes."
                                    : "მე-3 საერთაშორისო სამეცნიერო კონფერენცია 2026 იმართება საქართველოს წამყვანი უნივერსიტეტებისა და სამეცნიერო-კვლევითი ინსტიტუტების მიერ."}
                            </p>
                        </div>

                        {/* Organizing Institutions & Supporters Banner Cards (Reference Photo Style) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-2">
                            {/* 1. IICE */}
                            <div className="flex flex-col group">
                                <div className="mb-2.5 flex items-center">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-2xs bg-amber-100 text-amber-900 border-amber-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                                        {isEn ? "Main Organizer" : "მთავარი ორგანიზატორი"}
                                    </span>
                                </div>
                                <Link
                                    href="/"
                                    title={isEn ? "Visit IICE Institute Portal" : "გადასვლა ინსტიტუტის გვერდზე"}
                                    className="relative flex items-center h-[114px] sm:h-[122px] md:h-[128px] rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] cursor-pointer overflow-visible bg-[#3b2164] hover:bg-[#462777] border border-purple-900/30"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center -ml-2 sm:-ml-3 md:-ml-4 pl-3 sm:pl-4 py-2">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full flex items-center justify-center relative drop-shadow-md">
                                            <img
                                                src="/logo.png"
                                                alt="TSU IICE"
                                                className="w-full h-full object-contain rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 py-3 px-3 sm:px-5 flex flex-col justify-center min-w-0 select-none">
                                        <h3 className="font-black text-white text-[12.5px] sm:text-[13.5px] md:text-[14.5px] leading-snug tracking-tight">
                                            {isEn
                                                ? "R. Agladze Institute of Inorganic Chemistry and Electrochemistry"
                                                : "რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი"}
                                        </h3>
                                    </div>
                                </Link>
                            </div>

                            {/* 2. TSU */}
                            <div className="flex flex-col group">
                                <div className="mb-2.5 flex items-center">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-2xs bg-blue-100 text-blue-900 border-blue-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                        {isEn ? "Co-Organizer" : "თანაორგანიზატორი"}
                                    </span>
                                </div>
                                <a
                                    href="https://www.tsu.ge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={isEn ? "Visit Tbilisi State University Website" : "გადასვლა თბილისის სახელმწიფო უნივერსიტეტის საიტზე"}
                                    className="relative flex items-center h-[114px] sm:h-[122px] md:h-[128px] rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] cursor-pointer overflow-visible bg-[#185fa3] hover:bg-[#1d6cb5] border border-blue-900/30"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center -ml-2 sm:-ml-3 md:-ml-4 pl-3 sm:pl-4 py-2">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full flex items-center justify-center relative drop-shadow-md">
                                            <img
                                                src="/conference-2026/tsu-seal.svg"
                                                alt="TSU"
                                                className="w-full h-full object-contain rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 py-3 px-3 sm:px-5 flex flex-col justify-center min-w-0 select-none">
                                        <h3 className="font-black text-white text-[12.5px] sm:text-[13.5px] md:text-[14.5px] leading-snug tracking-tight">
                                            {isEn
                                                ? "Ivane Javakhishvili Tbilisi State University"
                                                : "ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი"}
                                        </h3>
                                    </div>
                                </a>
                            </div>

                            {/* 3. TESAU */}
                            <div className="flex flex-col group">
                                <div className="mb-2.5 flex items-center">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-2xs bg-emerald-100 text-emerald-900 border-emerald-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                        {isEn ? "Host University" : "მასპინძელი უნივერსიტეტი"}
                                    </span>
                                </div>
                                <a
                                    href="https://tesau.edu.ge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={isEn ? "Visit Telavi State University Website" : "გადასვლა თელავის სახელმწიფო უნივერსიტეტის საიტზე"}
                                    className="relative flex items-center h-[114px] sm:h-[122px] md:h-[128px] rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] cursor-pointer overflow-visible bg-[#0f603c] hover:bg-[#137248] border border-emerald-900/30"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center -ml-2 sm:-ml-3 md:-ml-4 pl-3 sm:pl-4 py-2">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full flex items-center justify-center relative drop-shadow-md">
                                            <img
                                                src="/conference-2026/tesau-logo.png"
                                                alt="TESAU"
                                                className="w-full h-full object-contain rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 py-3 px-3 sm:px-5 flex flex-col justify-center min-w-0 select-none">
                                        <h3 className="font-black text-white text-[12.5px] sm:text-[13.5px] md:text-[14.5px] leading-snug tracking-tight">
                                            {isEn
                                                ? "Iakob Gogebashvili Telavi State University"
                                                : "იაკობ გოგებაშვილის სახელობის თელავის სახელმწიფო უნივერსიტეტი"}
                                        </h3>
                                    </div>
                                </a>
                            </div>

                            {/* 4. SHOTA RUSTAVELI NATIONAL SCIENCE FOUNDATION */}
                            <div className="flex flex-col group">
                                <div className="mb-2.5 flex items-center">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-2xs bg-purple-100 text-purple-900 border-purple-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                                        {isEn ? "Grant Donor & Supporter" : "გრანტის დონორი და მხარდამჭერი"}
                                    </span>
                                </div>
                                <a
                                    href="https://rustaveli.org.ge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={isEn ? "Visit Shota Rustaveli National Science Foundation Website" : "გადასვლა რუსთაველის ეროვნული სამეცნიერო ფონდის საიტზე"}
                                    className="relative flex items-center h-[114px] sm:h-[122px] md:h-[128px] rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] cursor-pointer overflow-visible bg-[#1a2d48] hover:bg-[#22395b] border border-slate-700/40"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center -ml-2 sm:-ml-3 md:-ml-4 pl-3 sm:pl-4 py-2">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full bg-white p-2 sm:p-2.5 flex items-center justify-center relative drop-shadow-md border border-white/20">
                                            <img
                                                src="/conference-2026/rustaveli-official.png"
                                                alt="Shota Rustaveli National Science Foundation"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 py-3 px-3 sm:px-5 flex flex-col justify-center min-w-0 select-none">
                                        <h3 className="font-black text-white text-[12.5px] sm:text-[13.5px] md:text-[14.5px] leading-snug tracking-tight">
                                            {isEn
                                                ? "Shota Rustaveli National Science Foundation of Georgia"
                                                : "შოთა რუსთაველის ეროვნული სამეცნიერო ფონდი"}
                                        </h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. VENUES & TRANSPORT TAB */}
                {activeTab === 'venues' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-6">
                        <h2 className="text-xl sm:text-2xl font-black text-[#60318e]">
                            {isEn ? "Venues & Transportation Information" : "ლოკაციები და ტრანსპორტირება"}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/30 space-y-3">
                                <span className="text-xs font-bold text-[#60318e] bg-white px-3 py-1 rounded-full border border-purple-200 inline-block">
                                    {isEn ? "Day 1 (Nov 25) • Tbilisi" : "დღე 1 (25 ნოემბერი) • თბილისი"}
                                </span>
                                <h4 className="font-black text-sm text-gray-900">
                                    {isEn ? "TSU (Tbilisi State University)" : "ივანე ჯავახიშვილის სახელობის თსუ"}
                                </h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEn
                                        ? "1 Ilia Chavchavadze Ave / 11 E. Mindeli St. (TSU R. Agladze Institute). Plenary sessions, registration, and anniversary celebrations."
                                        : "ილია ჭავჭავაძის გამზ. 1 / ე. მინდელის ქ. 11 (თსუ რ. აგლაძის ინსტიტუტი). გახსნა, პლენარული სხდომები და საიუბილეო ღონისძიება."}
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/30 space-y-3">
                                <span className="text-xs font-bold text-[#60318e] bg-white px-3 py-1 rounded-full border border-purple-200 inline-block">
                                    {isEn ? "Days 2 & 3 (Nov 26-27) • Telavi" : "დღეები 2 & 3 (26-27 ნოემბერი) • თელავი"}
                                </span>
                                <h4 className="font-black text-sm text-gray-900">
                                    {isEn ? "Telavi State University (TESAU)" : "იაკობ გოგებაშვილის სახელობის თელავის სახელმწიფო უნივერსიტეტი (თესაუ)"}
                                </h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEn
                                        ? "1 University St., Telavi, Kakheti region. Section meetings across all 6 directions, poster sessions, certificates, and closing Gala Dinner."
                                        : "ქ. თელავი, ქართული უნივერსიტეტის ქ. 1. სექციური მუშაობა 6-ვე მიმართულებით, პოსტერები და საზეიმო ვახშამი."}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                            <Bus className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                            <p>
                                <strong>{isEn ? "Organized Transport:" : "ტრანსპორტის უზრუნველყოფა:"}</strong>{" "}
                                {isEn
                                    ? "25 November, 16:00: Free comfortable buses will be provided by the organizing committee to transport all registered delegates from Tbilisi to Telavi."
                                    : "25 ნოემბერს 16:00 საათზე თბილისიდან თელავში მონაწილეთა ტრანსპორტირებას კომფორტული ავტობუსებით სრულად უზრუნველყოფს საორგანიზაციო კომიტეტი."}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Institutional Partners & Sponsors Section (Bottom Banner with Official Logos) */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-8 border-t border-purple-100">
                <div className="text-center mb-6">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {isEn ? "Organizing Partners & Supporting Organizations" : "საორგანიზაციო პარტნიორები და მხარდამჭერები"}
                    </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                    {/* TSU */}
                    <a
                        href="https://www.tsu.ge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md hover:border-purple-300 transition-all group cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-xl bg-blue-50/50 p-1.5 flex items-center justify-center mb-2 relative">
                            <Image src="/conference-2026/tsu-logo.png" alt="TSU" width={56} height={56} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-extrabold text-blue-700 uppercase">TSU • თსუ</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2 group-hover:text-[#60318e] transition-colors">
                            {isEn ? "Tbilisi State University" : "თბილისის სახელმწიფო უნივერსიტეტი"}
                        </p>
                    </a>

                    {/* IICE */}
                    <Link
                        href="/"
                        className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md hover:border-purple-300 transition-all group cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-xl bg-purple-50 p-1.5 flex items-center justify-center mb-2 relative">
                            <Image src="/logo.png" alt="IICE" width={56} height={56} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-extrabold text-[#60318e] uppercase">IICE • 70 წელი</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2 group-hover:text-[#60318e] transition-colors">
                            {isEn ? "R. Agladze Institute" : "რ. აგლაძის ინსტიტუტი"}
                        </p>
                    </Link>

                    {/* TESAU */}
                    <a
                        href="https://tesau.edu.ge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md hover:border-purple-300 transition-all group cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-xl bg-emerald-50/50 p-1.5 flex items-center justify-center mb-2 relative">
                            <Image src="/conference-2026/tesau-logo.png" alt="TESAU" width={56} height={56} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-700 uppercase">TESAU • თესაუ</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2 group-hover:text-[#60318e] transition-colors">
                            {isEn ? "Telavi State University" : "თელავის სახელმწიფო უნივერსიტეტი"}
                        </p>
                    </a>

                    {/* SRNSFG */}
                    <a
                        href="https://rustaveli.org.ge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md hover:border-amber-400 transition-all group cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-xl bg-amber-50/50 p-1 flex items-center justify-center mb-2 relative">
                            <Image src="/conference-2026/rustaveli-logo.png" alt="SRNSFG" width={56} height={56} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-extrabold text-amber-800 uppercase">გრანტი ISE-26-286</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2 group-hover:text-[#60318e] transition-colors">
                            {isEn ? "Rustaveli Foundation" : "რუსთაველის ეროვნული ფონდი"}
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
}
