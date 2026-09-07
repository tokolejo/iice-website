'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { getSupabaseBrowserClient } from '../lib/supabase/client';
import { recordAuditLog } from '../lib/auditLogger';
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
        thematicTopic: '1',
    });

    const [geoFile, setGeoFile] = useState(null);
    const [engFile, setEngFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [successData, setSuccessData] = useState(null);
    const [copied, setCopied] = useState(false);

    const t = {
        badge: isEn ? "3rd International Scientific Conference 2026" : "2026 წლის საერთაშორისო კონფერენცია",
        title: isEn
            ? "3rd International Scientific Conference: “Modern Trends in Chemistry, Chemical Technologies and Related Fields: Green Energy Prospects, Ecological Sustainability, Food Safety. 2026”"
            : "მე-3 საერთაშორისო სამეცნიერო კონფერენცია: „თანამედროვე ტენდენციები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში: მწვანე ენერგეტიკის პერსპექტივები, ეკოლოგიური მდგრადობა, სურსათის უვნებელობა. 2026“",
        anniversary: isEn
            ? "Dedicated to the 70th anniversary of the founding of Rafael Agladze Institute of Inorganic Chemistry and Electrochemistry (1956–2026)"
            : "ეძღვნება რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წელს (1956–2026)",
        datesText: isEn ? "November 25 – 27, 2026" : "25 – 27 ნოემბერი, 2026",
        venuesText: isEn
            ? "Tbilisi (TSU) & Telavi (Telavi State University), Georgia"
            : "თბილისი (თსუ) & თელავი (თელავის სახელმწიფო უნივერსიტეტი)",
        grantNotice: isEn
            ? "This event was supported by Shota Rustaveli National Science Foundation of Georgia [Grant number ISE-26-286]"
            : "ღონისძიება ხორციელდება შოთა რუსთაველის საქართველოს ეროვნული სამეცნიერო ფონდის მხარდაჭერით [გრანტის ნომერი ISE-26-286]",
        freeNotice: isEn
            ? "No fee is charged to conference participants (Participation is Free)"
            : "კონფერენციაში მონაწილეობა უფასოა",
        tabs: {
            registration: isEn ? "Registration & Submission" : "რეგისტრაცია და აბსტრაქტი",
            topics: isEn ? "Thematic Topics (6)" : "თემატური სექციები (6)",
            schedule: isEn ? "Program Schedule" : "კონფერენციის პროგრამა",
            organizers: isEn ? "Organizers & Partners" : "ორგანიზატორები და პარტნიორები",
            downloads: isEn ? "Download Center" : "ფაილების ჩამოტვირთვა",
            venues: isEn ? "Venues & Transport" : "ლოკაციები და ტრანსპორტი",
        },
        form: {
            heading: isEn ? "Conference Registration & Abstract Submission" : "კონფერენციის რეგისტრაცია და აბსტრაქტის ატვირთვა",
            subheading: isEn
                ? "Please fill in the form below. Fields marked with * are required."
                : "გთხოვთ შეავსოთ ქვემოთ მოცემული ფორმა. *-ით მონიშნული ველები სავალდებულოა.",
            firstName: isEn ? "First Name (სახელი)" : "სახელი",
            lastName: isEn ? "Last Name (გვარი)" : "გვარი",
            birthDate: isEn ? "Date of Birth (დაბადების თარიღი)" : "დაბადების თარიღი",
            citizenship: isEn ? "Citizenship (მოქალაქეობა)" : "მოქალაქეობა",
            affiliation: isEn ? "Affiliation / Institution (აფილაცია - ინსტიტუტი/უნივერსიტეტი)" : "აფილაცია (ინსტიტუტი / უნივერსიტეტი / ორგანიზაცია)",
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
            uploadAbstract: isEn ? "Upload Abstract (აბსტრაქტის ატვირთვა)" : "აბსტრაქტის ატვირთვა",
            geoNotice: isEn ? "* GEO only for Georgian citizens (.doc, .docx, .pdf)" : "* GEO მხოლოდ საქართველოს მოქალაქეებისათვის (.doc, .docx, .pdf)",
            engNotice: isEn ? "ENG Abstract (.doc, .docx, .pdf)" : "ინგლისური აბსტრაქტი (.doc, .docx, .pdf)",
            footnote: isEn
                ? "Note: After registration, you can still work on your registration form (edit it or upload Abstract), when logged in through Account."
                : "შენიშვნა: რეგისტრაციის შემდეგ, თქვენ კვლავ შეგიძლიათ იმუშაოთ თქვენს რეგისტრაციის ფორმაზე (შეცვალოთ იგი ან ატვირთოთ აბსტრაქტი), თუ შეხვალთ სისტემაში საკუთარი პროფილიდან.",
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

    const thematicTopics = [
        { id: '1', titleKa: 'ნანოპროცესები და ნანოტექნოლოგიები', titleEn: 'Nanoprocesses and Nanotechnologies' },
        { id: '2', titleKa: 'სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები', titleEn: 'Fundamental and Technological Aspects of Mineral and Secondary Raw Material Processing' },
        { id: '3', titleKa: 'მწვანე ქიმია', titleEn: 'Green Chemistry' },
        { id: '4', titleKa: 'სამეცნიერო ინოვაციების პოპულარიზაცია და კომერციალიზაცია', titleEn: 'Popularization and Commercialization of Scientific Innovations' },
        { id: '5', titleKa: 'სურსათის ქიმია და ხარისხი', titleEn: 'Food Chemistry and Quality of Food' },
        { id: '6', titleKa: 'STEM+P: მეცნიერება, ინოვაცია და პოლიტიკა', titleEn: 'STEM+P: Science, Innovation and Policy' },
    ];

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.affiliation || !formData.presentationTitle) {
            setSubmitError(isEn ? "Please fill in all required fields marked with *." : "გთხოვთ შეავსოთ ყველა სავალდებულო ველი (*).");
            return;
        }

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
                thematicTopic: '1',
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
            <title>{isEn ? "3rd International Scientific Conference 2026 | TSU IICE" : "III საერთაშორისო სამეცნიერო კონფერენცია 2026 | TSU IICE"}</title>
            <meta name="description" content={isEn ? "3rd International Scientific Conference 2026 dedicated to the 70th anniversary of IICE." : "მე-3 საერთაშორისო სამეცნიერო კონფერენცია 2026 ეძღვნება რაფიელ აგლაძის ინსტიტუტის 70 წლისთავს."} />

            {/* Hero Header Section - High-Contrast Royal Purple with Ambient Glow (Compact & Refined) */}
            <div className="relative bg-gradient-to-b from-[#180327] via-[#2f0d46] to-[#1c062c] text-white py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 shadow-xl overflow-hidden">
                {/* Decorative radial mesh light */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(173,73,225,0.18),transparent_70%)] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-extrabold bg-gradient-to-r from-purple-500/25 to-amber-500/25 text-amber-200 border border-amber-400/35 mb-3 backdrop-blur-md shadow-xs">
                        <span>{t.badge}</span>
                    </div>

                    <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white mb-3 leading-snug tracking-tight max-w-2xl mx-auto drop-shadow-xs">
                        {t.title}
                    </h1>

                    {/* 70 Years Commemorative Banner */}
                    <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 text-amber-200 py-1.5 px-4 rounded-xl border border-amber-300/30 shadow-xs mb-3.5 max-w-2xl backdrop-blur-md">
                        <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs font-bold text-amber-100 leading-snug">
                            {t.anniversary}
                        </span>
                    </div>

                    {/* Dates & Venues Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs font-bold mb-3.5">
                        <div className="flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/15 shadow-xs">
                            <Calendar className="w-3.5 h-3.5 text-amber-300" />
                            <span>{t.datesText}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/15 shadow-xs">
                            <MapPin className="w-3.5 h-3.5 text-amber-300" />
                            <span>{t.venuesText}</span>
                        </div>
                    </div>

                    {/* Mandatory Grant Notice & Free Participation */}
                    <div className="max-w-2xl mx-auto space-y-2 text-[11px] mb-4">
                        <div className="bg-white/10 text-purple-100 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-md shadow-xs leading-relaxed flex items-center justify-center gap-2">
                            <Landmark className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                            <span><strong>{t.grantNotice}</strong></span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 font-extrabold px-3 py-1 rounded-full border border-emerald-400/35 shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{t.freeNotice}</span>
                        </div>
                    </div>

                    {/* Quick Call to Action */}
                    <div>
                        <button
                            onClick={() => {
                                setActiveTab('registration');
                                document.getElementById('tabs-navigation')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#AD49E1] to-[#7A1CAC] hover:from-[#bd5cf0] hover:to-[#8c25c2] text-white font-extrabold px-5 py-2.5 rounded-full text-xs shadow-md hover:shadow-lg hover:scale-102 transition-all cursor-pointer"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isEn ? "Go to Registration Form ↓" : "რეგისტრაცია & აბსტრაქტის ატვირთვა ↓"}</span>
                        </button>
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
                        className="flex space-x-1 sm:space-x-2 py-1 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth flex-grow"
                    >
                        {Object.entries(t.tabs).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                                    activeTab === key
                                        ? 'bg-[#60318e] text-white shadow-md font-extrabold'
                                        : 'text-slate-600 hover:text-[#60318e] hover:bg-purple-50/60'
                                }`}
                            >
                                {key === 'registration' && <Send className="w-3.5 h-3.5" />}
                                {key === 'topics' && <Tag className="w-3.5 h-3.5" />}
                                {key === 'schedule' && <Clock className="w-3.5 h-3.5" />}
                                {key === 'organizers' && <Building2 className="w-3.5 h-3.5" />}
                                {key === 'downloads' && <Download className="w-3.5 h-3.5" />}
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

                {/* 1. REGISTRATION FORM TAB (Compact & Elegant) */}
                {activeTab === 'registration' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-5 sm:p-7 md:p-8 animate-fade-in">
                        <div className="text-center max-w-2xl mx-auto mb-6">
                            <h2 className="text-lg sm:text-xl font-black text-[#60318e] mb-1">
                                {t.form.heading}
                            </h2>
                            <p className="text-xs text-slate-500 font-medium">
                                {t.form.subheading}
                            </p>
                        </div>

                        {submitError && (
                            <div className="mb-5 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                            {/* 1. Personal Info */}
                            <div className="space-y-3 bg-purple-50/20 p-4 sm:p-5 rounded-2xl border border-purple-100/70">
                                <h3 className="text-xs sm:text-sm font-bold text-[#60318e] pb-1.5 border-b border-purple-100 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#AD49E1]" />
                                    <span>{isEn ? "1. Personal Information" : "1. პერსონალური მონაცემები"}</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.firstName} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "First name" : "სახელი"}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.lastName} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "Last name" : "გვარი"}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.birthDate}
                                        </label>
                                        <input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.citizenship} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="citizenship"
                                            required
                                            value={formData.citizenship}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "e.g., Georgia" : "მაგ: საქართველო"}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.affiliation} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="affiliation"
                                            required
                                            value={formData.affiliation}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "Institution / University" : "ინსტიტუტი / უნივერსიტეტი"}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Titulation Pills */}
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">
                                        {t.form.titulation}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-white p-2 rounded-xl border border-purple-100">
                                        {titulationOptions.map(opt => (
                                            <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 text-xs py-1 px-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="titulation"
                                                    value={opt.value}
                                                    checked={formData.titulation === opt.value}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                <span className="truncate">{isEn ? opt.labelEn : opt.labelKa}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Gender & Email & Attendance */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.gender}
                                        </label>
                                        <div className="flex gap-4 pt-1 bg-white px-3 py-2 rounded-xl border border-slate-200">
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === 'female'}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                {t.form.female}
                                            </label>
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === 'male'}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                {t.form.male}
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.email} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="researcher@domain.com"
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.attendance}
                                        </label>
                                        <div className="flex gap-4 pt-1 bg-white px-3 py-2 rounded-xl border border-slate-200">
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="isAttendingInPerson"
                                                    checked={formData.isAttendingInPerson === true}
                                                    onChange={() => setFormData(p => ({ ...p, isAttendingInPerson: true }))}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                {t.form.yes}
                                            </label>
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                                                <input
                                                    type="radio"
                                                    name="isAttendingInPerson"
                                                    checked={formData.isAttendingInPerson === false}
                                                    onChange={() => setFormData(p => ({ ...p, isAttendingInPerson: false }))}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                {t.form.no}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Presentation Details */}
                            <div className="space-y-3 bg-purple-50/20 p-4 sm:p-5 rounded-2xl border border-purple-100/70">
                                <h3 className="text-xs sm:text-sm font-bold text-[#60318e] pb-1.5 border-b border-purple-100 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#AD49E1]" />
                                    <span>{isEn ? "2. Presentation & Abstract Details" : "2. მოხსენებისა და აბსტრაქტის დეტალები"}</span>
                                </h3>

                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">
                                        {t.form.presTitle} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="presentationTitle"
                                        required
                                        rows={2}
                                        value={formData.presentationTitle}
                                        onChange={handleInputChange}
                                        placeholder={isEn ? "Title of your presentation..." : "თქვენი სამეცნიერო მოხსენების სათაური..."}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.coAuthors}
                                        </label>
                                        <input
                                            type="text"
                                            name="coAuthors"
                                            value={formData.coAuthors}
                                            onChange={handleInputChange}
                                            placeholder={isEn ? "e.g., G. Tatishvili, T. Lezhava" : "მაგ: გ. ტატიშვილი, თ. ლეჟავა"}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.topic}
                                        </label>
                                        <select
                                            name="thematicTopic"
                                            value={formData.thematicTopic}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white font-medium truncate"
                                        >
                                            {thematicTopics.map(top => (
                                                <option key={top.id} value={top.id}>
                                                    {isEn ? top.titleEn : top.titleKa}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Presentation Type & Role */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.presType}
                                        </label>
                                        <div className="grid grid-cols-2 gap-1.5 bg-white p-2 rounded-xl border border-purple-100">
                                            {presentationTypeOptions.map(opt => (
                                                <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 text-xs py-0.5">
                                                    <input
                                                        type="radio"
                                                        name="presentationType"
                                                        value={opt.value}
                                                        checked={formData.presentationType === opt.value}
                                                        onChange={handleInputChange}
                                                        className="text-[#60318e] focus:ring-[#AD49E1]"
                                                    />
                                                    <span className="truncate">{isEn ? opt.labelEn : opt.labelKa}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.role}
                                        </label>
                                        <div className="flex flex-wrap gap-4 bg-white p-2 rounded-xl border border-purple-100 h-[46px] items-center px-3">
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-bold text-slate-800 text-xs">
                                                <input
                                                    type="checkbox"
                                                    name="rolePresentingAuthor"
                                                    checked={formData.rolePresentingAuthor}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] rounded"
                                                />
                                                <span>{t.form.presentingAuthor}</span>
                                            </label>
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-bold text-slate-800 text-xs">
                                                <input
                                                    type="checkbox"
                                                    name="roleCoAuthor"
                                                    checked={formData.roleCoAuthor}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] rounded"
                                                />
                                                <span>{t.form.coAuthor}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. File Uploads */}
                            <div className="space-y-3 bg-purple-50/20 p-4 sm:p-5 rounded-2xl border border-purple-100/70">
                                <h3 className="text-xs sm:text-sm font-bold text-[#60318e] pb-1.5 border-b border-purple-100 flex items-center gap-2">
                                    <UploadCloud className="w-4 h-4 text-[#AD49E1]" />
                                    <span>{t.form.uploadAbstract}</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="border-2 border-dashed border-purple-200 rounded-xl p-3 text-center bg-white hover:bg-purple-50/40 transition-colors relative">
                                        <label className="block font-bold text-slate-700 text-xs mb-0.5 cursor-pointer">
                                            {isEn ? "Georgian Abstract (.doc, .docx, .pdf)" : "თეზისი ქართულად (.doc, .docx, .pdf)"}
                                        </label>
                                        <span className="text-[10px] text-purple-700 block mb-2 font-semibold">
                                            {t.form.geoNotice}
                                        </span>
                                        {!geoFile ? (
                                            <input
                                                type="file"
                                                accept=".doc,.docx,.pdf"
                                                onChange={(e) => setGeoFile(e.target.files?.[0] || null)}
                                                className="text-[11px] text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-between bg-purple-50 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-xs">
                                                <span className="font-bold text-[#60318e] text-[11px] truncate flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                                    {geoFile.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setGeoFile(null)}
                                                    className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-colors ml-1 flex-shrink-0 cursor-pointer"
                                                    title={isEn ? "Remove file" : "ფაილის წაშლა"}
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-2 border-dashed border-purple-200 rounded-xl p-3 text-center bg-white hover:bg-purple-50/40 transition-colors relative">
                                        <label className="block font-bold text-slate-700 text-xs mb-0.5 cursor-pointer">
                                            {isEn ? "English Abstract (.doc, .docx, .pdf)" : "თეზისი ინგლისურად (.doc, .docx, .pdf)"}
                                        </label>
                                        <span className="text-[10px] text-purple-700 block mb-2 font-semibold">
                                            {t.form.engNotice}
                                        </span>
                                        {!engFile ? (
                                            <input
                                                type="file"
                                                accept=".doc,.docx,.pdf"
                                                onChange={(e) => setEngFile(e.target.files?.[0] || null)}
                                                className="text-[11px] text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-between bg-purple-50 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-xs">
                                                <span className="font-bold text-[#60318e] text-[11px] truncate flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                                    {engFile.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setEngFile(null)}
                                                    className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-colors ml-1 flex-shrink-0 cursor-pointer"
                                                    title={isEn ? "Remove file" : "ფაილის წაშლა"}
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footnote Notice */}
                                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
                                    <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <span>{t.form.footnote}</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2 text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-extrabold px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
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
                        </form>
                    </div>
                )}

                {/* 2. THEMATIC TOPICS TAB */}
                {activeTab === 'topics' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-6">
                        <h2 className="text-xl sm:text-2xl font-black text-[#60318e]">
                            {isEn ? "Conference Thematic Topics (6 Sections)" : "კონფერენციის თემატური მიმართულებები (6 სექცია)"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {thematicTopics.map((top, idx) => (
                                <div key={top.id} className="p-5 rounded-2xl border border-purple-100 bg-slate-50/60 hover:bg-purple-50/50 transition-all flex items-start gap-3.5">
                                    <div className="w-8 h-8 rounded-full bg-[#60318e] text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-xs">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-sm text-gray-900 leading-snug">
                                            {isEn ? top.titleEn : top.titleKa}
                                        </h4>
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
                            <h2 className="text-xl sm:text-2xl font-black text-[#60318e]">
                                {isEn ? "Preliminary Program Schedule 2026" : "კონფერენციის წინასწარი პროგრამა 2026"}
                            </h2>
                            <span className="text-xs font-bold text-[#AD49E1] bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                                25–27 ნოემბერი, 2026
                            </span>
                        </div>

                        {/* Day 1 */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-black text-[#60318e]">
                                <Landmark className="w-5 h-5 text-[#AD49E1]" />
                                <h3>{isEn ? "Day 1: November 25 — Tbilisi (TSU Campus)" : "დღე 1: 25 ნოემბერი — თბილისი (თსუ)"}</h3>
                            </div>
                            <div className="space-y-2 text-xs border-l-2 border-purple-200 ml-2.5 pl-4">
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">09:00 – 10:00:</strong> {isEn ? "Registration of participants" : "მონაწილეთა რეგისტრაცია"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 10:30:</strong> {isEn ? "Welcome & opening remarks (Ministry of Education, TSU Administration, National Academy of Sciences)" : "მისალმება (განათლებისა და მეცნიერების სამინისტრო, თსუ ადმინისტრაცია, მეცნიერებათა ეროვნული აკადემია)"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:30 – 11:00:</strong> {isEn ? "Grigor Tatishvili (Director) — Institute Presentation & 70th Anniversary Video Collage" : "გრიგორ ტატიშვილი (დირექტორი) — მოხსენება და ინსტიტუტის 70 წლის საიუბილეო კოლაჟი/ვიდეო"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">11:00 – 14:00:</strong> {isEn ? "Plenary presentations, Coffee break (Anniversary cake cutting) and Poster section" : "პლენარული მოხსენებები, ყავის შესვენება (საიუბილეო ტორტის გაჭრა) და პოსტერული სექცია"}
                                </div>
                                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                                    <strong className="text-amber-900">15:30:</strong> {isEn ? "Departure to Telavi (Transport provided by the organizing committee)" : "გამგზავრება თელავში (ტრანსპორტს უზრუნველყოფენ ორგანიზატორები)"}
                                </div>
                            </div>
                        </div>

                        {/* Day 2 */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-black text-[#60318e]">
                                <GraduationCap className="w-5 h-5 text-[#AD49E1]" />
                                <h3>{isEn ? "Day 2: November 26 — Telavi (Telavi State University)" : "დღე 2: 26 ნოემბერი — თელავი (თელავის უნივერსიტეტი)"}</h3>
                            </div>
                            <div className="space-y-2 text-xs border-l-2 border-purple-200 ml-2.5 pl-4">
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">09:30 – 10:00:</strong> {isEn ? "Registration" : "რეგისტრაცია"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 18:00:</strong> {isEn ? "Plenary and parallel sessions across all 6 thematic directions, poster exhibition-discussion, lunch and coffee breaks" : "პლენარული და პარალელური სექციები 6-ვე თემაზე, პოსტერული გამოფენა-განხილვა, სადილი და ყავის შესვენებები"}
                                </div>
                            </div>
                        </div>

                        {/* Day 3 */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-black text-[#60318e]">
                                <PartyPopper className="w-5 h-5 text-[#AD49E1]" />
                                <h3>{isEn ? "Day 3: November 27 — Telavi (Closing & Gala Dinner)" : "დღე 3: 27 ნოემბერი — თელავი (დახურვა და საზეიმო ვახშამი)"}</h3>
                            </div>
                            <div className="space-y-2 text-xs border-l-2 border-purple-200 ml-2.5 pl-4">
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">10:00 – 13:00:</strong> {isEn ? "Section work" : "სექციური მუშაობა"}
                                </div>
                                <div className="p-3 bg-purple-50/40 rounded-xl">
                                    <strong className="text-[#60318e]">13:30 – 14:00:</strong> {isEn ? "Closing of the conference & Presentation of certificates" : "ღონისძიების დახურვა და სერტიფიკატების გადაცემა"}
                                </div>
                                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                                    <strong className="text-emerald-900">15:00 – 20:00:</strong> {isEn ? "Social program & Gala Dinner (18:00–20:00)" : "სოციალური პროგრამა და საზეიმო ვახშამი (18:00–20:00)"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3.1 ORGANIZERS TAB */}
                {activeTab === 'organizers' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-8">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#60318e] mb-2">
                                {isEn ? "Organizing Committee & Supporting Institutions" : "საორგანიზაციო ინსტიტუციები და კომიტეტი"}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                {isEn
                                    ? "The 3rd International Scientific Conference 2026 is organized jointly by Georgia's leading scientific and educational institutions, supported by the Shota Rustaveli National Science Foundation."
                                    : "მე-3 საერთაშორისო სამეცნიერო კონფერენცია 2026 იმართება საქართველოს წამყვანი სამეცნიერო და საგანმანათლებლო დაწესებულებების პარტნიორობით, შოთა რუსთაველის საქართველოს ეროვნული სამეცნიერო ფონდის მხარდაჭერით."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* IICE */}
                            <div className="p-6 rounded-3xl border-2 border-amber-400/40 bg-purple-50/30 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-2xl bg-white p-2 border border-purple-100 shadow-xs flex items-center justify-center">
                                        <img src="/logo.png" alt="IICE" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                            მთავარი ორგანიზატორი • 70 წელი
                                        </span>
                                        <h4 className="font-extrabold text-sm text-gray-900 mt-1">
                                            {isEn ? "R. Agladze Institute of Inorganic Chemistry & Electrochemistry" : "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი"}
                                        </h4>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEn
                                        ? "Founded in 1956. Over seven decades of pioneer research in applied electrochemistry, mineral processing, nanomaterials, and green energy."
                                        : "დაარსდა 1956 წელს. 7 ათწლეულის განმავლობაში ინსტიტუტი არის მოწინავე სამეცნიერო ცენტრი გამოყენებით ელექტროქიმიაში, წიაღისეულის გადამუშავებასა და ნანოტექნოლოგიებში."}
                                </p>
                            </div>

                            {/* TSU */}
                            <div className="p-6 rounded-3xl border border-purple-100 bg-slate-50/60 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 shadow-xs flex items-center justify-center">
                                        <Landmark className="w-7 h-7 text-blue-700" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                            თანაორგანიზატორი
                                        </span>
                                        <h4 className="font-extrabold text-sm text-gray-900 mt-1">
                                            {isEn ? "Ivane Javakhishvili Tbilisi State University (TSU)" : "ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი"}
                                        </h4>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEn
                                        ? "The first national university in the Caucasus, fostering scientific excellence, higher education, and international collaboration."
                                        : "პირველი ეროვნული უნივერსიტეტი კავკასიაში, ქართული საუნივერსიტეტო განათლებისა და მეცნიერების მთავარი კერა."}
                                </p>
                            </div>

                            {/* TeSaU */}
                            <div className="p-6 rounded-3xl border border-purple-100 bg-slate-50/60 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-xs flex items-center justify-center">
                                        <GraduationCap className="w-7 h-7 text-emerald-700" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                            მასპინძელი უნივერსიტეტი
                                        </span>
                                        <h4 className="font-extrabold text-sm text-gray-900 mt-1">
                                            {isEn ? "Iakob Gogebashvili Telavi State University (TeSaU)" : "იაკობ გოგებაშვილის სახელობის თელავის სახელმწიფო უნივერსიტეტი"}
                                        </h4>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEn
                                        ? "Host institution in Kakheti region, providing state-of-the-art auditoriums for sectional meetings, discussions, and academic exchange."
                                        : "კახეთის რეგიონის წამყვანი საგანმანათლებლო ცენტრი, რომელიც მასპინძლობს კონფერენციის სექციურ სხდომებს, დისკუსიებსა და შემაჯამებელ ღონისძიებას."}
                                </p>
                            </div>

                            {/* SRNSFG */}
                            <div className="p-6 rounded-3xl border border-purple-100 bg-slate-50/60 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs flex items-center justify-center">
                                        <Award className="w-7 h-7 text-amber-600" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                                            გრანტის დონორი და მხარდამჭერი
                                        </span>
                                        <h4 className="font-extrabold text-sm text-gray-900 mt-1">
                                            {isEn ? "Shota Rustaveli National Science Foundation" : "შოთა რუსთაველის საქართველოს ეროვნული სამეცნიერო ფონდი"}
                                        </h4>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isEn
                                        ? "Grant project ISE-26-286. Supporting the dissemination of high-level scientific findings and international cooperation in Georgia."
                                        : "საგრანტო პროექტი ISE-26-286. უზრუნველყოფს სამეცნიერო კვლევების პოპულარიზაციას, საერთაშორისო ინტეგრაციასა და ახალგაზრდა მეცნიერთა ჩართულობას."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. DOWNLOADS TAB */}
                {activeTab === 'downloads' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in space-y-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#60318e] mb-1">
                                {isEn ? "Download Center" : "ფაილების ჩამოტვირთვა"}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {isEn ? "Download abstract templates and preliminary program schedules." : "ჩამოტვირთეთ აბსტრაქტის შაბლონები და კონფერენციის წინასწარი პროგრამა."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    name: "Abstract-template GEO.doc",
                                    desc: isEn ? "Abstract Template (Georgian language)" : "აბსტრაქტის შაბლონი (ქართულ ენაზე)",
                                    fileUrl: "/conference-2026/Abstract-template GEO.doc",
                                    badge: "GEO DOC",
                                },
                                {
                                    name: "Abstract-template_ENG.docx",
                                    desc: isEn ? "Abstract Template (English language)" : "აბსტრაქტის შაბლონი (ინგლისურ ენაზე)",
                                    fileUrl: "/conference-2026/Abstract-template_ENG.docx",
                                    badge: "ENG DOCX",
                                },
                                {
                                    name: "Preliminary Programm 2026 GEO.docx",
                                    desc: isEn ? "Preliminary Program Schedule (GEO)" : "წინასწარი პროგრამა 2026 (ქართულად)",
                                    fileUrl: "/conference-2026/Preliminary Programm 2026 GEO.docx",
                                    badge: "PROGRAM GEO",
                                },
                                {
                                    name: "Preliminary Programm 2026 ENG.docx",
                                    desc: isEn ? "Preliminary Program Schedule (ENG)" : "წინასწარი პროგრამა 2026 (ინგლისურად)",
                                    fileUrl: "/conference-2026/Preliminary Programm 2026 ENG.docx",
                                    badge: "PROGRAM ENG",
                                },
                            ].map((doc, idx) => (
                                <div key={idx} className="p-5 rounded-2xl border border-purple-100 bg-slate-50/60 hover:bg-purple-50/50 transition-all flex flex-col justify-between">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-mono font-bold bg-[#60318e] text-white px-2 py-0.5 rounded">
                                                {doc.badge}
                                            </span>
                                            <FileText className="w-5 h-5 text-[#AD49E1]" />
                                        </div>
                                        <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 mb-1">
                                            {doc.name}
                                        </h4>
                                        <p className="text-[11px] text-gray-500">
                                            {doc.desc}
                                        </p>
                                    </div>
                                    <a
                                        href={doc.fileUrl}
                                        download
                                        className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-xs"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>{isEn ? "Download File" : "ფაილის ჩამოტვირთვა"}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. VENUES & TRANSPORT TAB */}
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
                                    {isEn ? "Telavi State University (TESAU)" : "იაკობ გოგებაშვილის სახელობის თელავის სახელმწიფო უნივერსიტეტი"}
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
                                    ? "25 November, 15:30: Free comfortable buses will be provided by the organizing committee to transport all registered delegates from Tbilisi to Telavi."
                                    : "25 ნოემბერს 15:30 საათზე თბილისიდან თელავში მონაწილეთა ტრანსპორტირებას კომფორტული ავტობუსებით სრულად უზრუნველყოფს საორგანიზაციო კომიტეტი."}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Institutional Partners & Sponsors Section (Moved down) */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-8 border-t border-purple-100">
                <div className="text-center mb-6">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {isEn ? "Partners & Supporting Organizations" : "მხარდამჭერი ორგანიზაციები და დონორები"}
                    </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                    {/* IICE */}
                    <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 p-1.5 flex items-center justify-center mb-2">
                            <img src="/logo.png" alt="IICE" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-extrabold text-[#60318e] uppercase">IICE • 70 წელი</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2">
                            {isEn ? "R. Agladze Institute" : "რ. აგლაძის ინსტიტუტი"}
                        </p>
                    </div>

                    {/* TSU */}
                    <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-2 text-blue-700">
                            <Landmark className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold text-blue-700 uppercase">TSU • თსუ</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2">
                            {isEn ? "Tbilisi State University" : "თბილისის სახელმწიფო უნივერსიტეტი"}
                        </p>
                    </div>

                    {/* TeSaU */}
                    <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-2 text-emerald-700">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-700 uppercase">TeSaU • თელავი</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2">
                            {isEn ? "Telavi State University" : "თელავის სახელმწიფო უნივერსიტეტი"}
                        </p>
                    </div>

                    {/* SRNSFG */}
                    <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-2 text-amber-600">
                            <Award className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold text-amber-800 uppercase">გრანტის დონორი</span>
                        <p className="text-xs font-bold text-slate-800 mt-1 line-clamp-2">
                            {isEn ? "Rustaveli Foundation" : "რუსთაველის ეროვნული ფონდი"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Success Confirmation Modal */}
            {successData && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setSuccessData(null);
                    }}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center relative border border-purple-100 animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-[#60318e] mb-2">
                            {t.success.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                            {t.success.numberText}
                        </p>

                        <div className="bg-purple-50 border-2 border-dashed border-[#AD49E1] rounded-2xl p-4 mb-6 flex items-center justify-between">
                            <span className="text-lg sm:text-xl font-black text-[#60318e] tracking-wider font-mono">
                                {successData.abstractNumber}
                            </span>
                            <button
                                onClick={copyAbstractCode}
                                className="inline-flex items-center gap-1.5 bg-[#60318e] hover:bg-[#7A1CAC] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                                        <span>{t.success.copied}</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>{t.success.copy}</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="text-[11px] text-slate-400 mb-6">
                            {t.success.advice}
                        </p>

                        <button
                            onClick={() => setSuccessData(null)}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                        >
                            {t.success.close}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
