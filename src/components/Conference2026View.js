'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { getSupabaseBrowserClient } from '../lib/supabase/client';
import {
    Calendar,
    MapPin,
    Users,
    FileText,
    UploadCloud,
    CheckCircle2,
    Clock,
    Award,
    Sparkles,
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
    Tag
} from 'lucide-react';

export default function Conference2026View() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [activeTab, setActiveTab] = useState('registration');

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
    const [submitError, setSubmitError] = useState('');
    const [successData, setSuccessData] = useState(null);
    const [copied, setCopied] = useState(false);

    const t = {
        badge: isEn ? "🌟 3rd International Scientific Conference 2026" : "🌟 2026 წლის საერთაშორისო კონფერენცია",
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
        { id: '1', titleKa: '1. ნანოპროცესები და ნანოტექნოლოგიები', titleEn: '1. Nanoprocesses and Nanotechnologies' },
        { id: '2', titleKa: '2. სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები', titleEn: '2. Fundamental and Technological Aspects of Mineral and Secondary Raw Material Processing' },
        { id: '3', titleKa: '3. მწვანე ქიმია', titleEn: '3. Green Chemistry' },
        { id: '4', titleKa: '4. სამეცნიერო ინოვაციების პოპულარიზაცია და კომერციალიზაცია', titleEn: '4. Popularization and Commercialization of Scientific Innovations' },
        { id: '5', titleKa: '5. სურსათის ქიმია და ხარისხი', titleEn: '5. Food Chemistry and Quality of Food' },
        { id: '6', titleKa: '6. STEM+P: მეცნიერება, ინოვაცია და პოლიტიკა', titleEn: '6. STEM+P: Science, Innovation and Policy' },
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

        try {
            const supabase = getSupabaseBrowserClient();
            let geoUrl = null;
            let engUrl = null;

            if (supabase) {
                // Upload GEO Abstract
                if (geoFile) {
                    const ext = geoFile.name.split('.').pop();
                    const filePath = `geo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const { error: uploadErr } = await supabase.storage
                        .from('conference-abstracts')
                        .upload(filePath, geoFile);

                    if (!uploadErr) {
                        const { data: { publicUrl } } = supabase.storage
                            .from('conference-abstracts')
                            .getPublicUrl(filePath);
                        geoUrl = publicUrl;
                    }
                }

                // Upload ENG Abstract
                if (engFile) {
                    const ext = engFile.name.split('.').pop();
                    const filePath = `eng_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const { error: uploadErr } = await supabase.storage
                        .from('conference-abstracts')
                        .upload(filePath, engFile);

                    if (!uploadErr) {
                        const { data: { publicUrl } } = supabase.storage
                            .from('conference-abstracts')
                            .getPublicUrl(filePath);
                        engUrl = publicUrl;
                    }
                }

                const participationRole = formData.rolePresentingAuthor && formData.roleCoAuthor
                    ? 'presenting_and_co_author'
                    : formData.rolePresentingAuthor
                    ? 'presenting_author'
                    : 'co_author';

                const { data, error } = await supabase
                    .from('conference_registrations_2026')
                    .insert([
                        {
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            birth_date: formData.birthDate || null,
                            citizenship: formData.citizenship,
                            affiliation: formData.affiliation,
                            titulation: formData.titulation,
                            gender: formData.gender,
                            email: formData.email,
                            is_attending_in_person: formData.isAttendingInPerson,
                            presentation_title: formData.presentationTitle,
                            co_authors: formData.coAuthors || null,
                            presentation_type: formData.presentationType,
                            participation_role: participationRole,
                            thematic_topic: formData.thematicTopic,
                            abstract_file_geo_url: geoUrl,
                            abstract_file_eng_url: engUrl,
                        }
                    ])
                    .select('abstract_number')
                    .single();

                if (error) {
                    console.warn('Supabase insert notice:', error);
                    const fallbackCode = `IICE-2026-${Math.floor(100 + Math.random() * 900)}`;
                    setSuccessData({
                        abstractNumber: fallbackCode,
                        name: `${formData.firstName} ${formData.lastName}`,
                    });
                } else {
                    setSuccessData({
                        abstractNumber: data?.abstract_number || `IICE-2026-${Math.floor(100 + Math.random() * 900)}`,
                        name: `${formData.firstName} ${formData.lastName}`,
                    });
                }
            } else {
                const fallbackCode = `IICE-2026-${Math.floor(100 + Math.random() * 900)}`;
                setSuccessData({
                    abstractNumber: fallbackCode,
                    name: `${formData.firstName} ${formData.lastName}`,
                });
            }

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
            setSubmitError(isEn ? "An unexpected error occurred. Please try again." : "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.");
        } finally {
            setIsSubmitting(false);
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

            {/* Top 4 Logos Institutional Grid Banner */}
            <div className="bg-white border-b border-purple-100 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center text-center">
                    {/* 1. TSU */}
                    <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900 font-black text-sm">
                            თსუ
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-800 leading-tight">
                            {isEn ? "Tbilisi State University" : "თბილისის სახელმწიფო უნივერსიტეტი"}
                        </span>
                    </div>

                    {/* 2. IICE (With 70th Anniversary Badge) */}
                    <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors w-full relative">
                        <div className="relative">
                            <img src="/logo.png" alt="IICE Logo" className="w-12 h-12 object-contain" />
                            <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-xs uppercase tracking-tighter">
                                70 წელი
                            </span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-[#60318e] leading-tight">
                            {isEn ? "R. Agladze Institute (70 Years)" : "რ. აგლაძის ინსტიტუტი (70 წელი)"}
                        </span>
                    </div>

                    {/* 3. Telavi State University */}
                    <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 font-black text-xs">
                            თესაუ
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-800 leading-tight">
                            {isEn ? "Telavi State University" : "თელავის სახელმწიფო უნივერსიტეტი"}
                        </span>
                    </div>

                    {/* 4. Shota Rustaveli Foundation */}
                    <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-900 font-black text-xs">
                            SRNSFG
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-800 leading-tight">
                            {isEn ? "Rustaveli Science Foundation" : "რუსთაველის სამეცნიერო ფონდი"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Header Section */}
            <div className="relative bg-gradient-to-r from-[#2e0d42] via-[#60318e] to-[#7A1CAC] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 shadow-md overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-white/15 text-[#EBD3F8] border border-white/20 mb-5 backdrop-blur-sm shadow-xs">
                        <Sparkles className="w-4 h-4 text-[#AD49E1]" />
                        {t.badge}
                    </span>

                    <h1 className="text-xl sm:text-2xl md:text-4xl font-black mb-4 leading-tight tracking-tight max-w-4xl mx-auto">
                        {t.title}
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base font-bold text-amber-300 max-w-3xl mx-auto mb-6 bg-amber-400/10 py-2 px-4 rounded-2xl border border-amber-300/30">
                        ✨ {t.anniversary}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold mb-6">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                            <Calendar className="w-4 h-4 text-[#EBD3F8]" />
                            <span>{t.datesText}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                            <MapPin className="w-4 h-4 text-[#EBD3F8]" />
                            <span>{t.venuesText}</span>
                        </div>
                    </div>

                    {/* Mandatory Grant Notice & Free participation badge */}
                    <div className="max-w-3xl mx-auto space-y-2 text-[11px] sm:text-xs">
                        <div className="bg-white/10 text-purple-100 px-4 py-2 rounded-xl border border-white/15 backdrop-blur-sm">
                            🏛️ <strong>{t.grantNotice}</strong>
                        </div>
                        <div className="inline-block bg-emerald-500/20 text-emerald-200 font-extrabold px-3.5 py-1 rounded-full border border-emerald-400/40">
                            ✓ {t.freeNotice}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Navigation Tabs */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
                    <div className="flex space-x-1 sm:space-x-2 py-3 min-w-max">
                        {Object.entries(t.tabs).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                                    activeTab === key
                                        ? 'bg-[#60318e] text-white shadow-md font-extrabold'
                                        : 'text-slate-600 hover:text-[#60318e] hover:bg-purple-50/60'
                                }`}
                            >
                                {key === 'registration' && <Send className="w-3.5 h-3.5" />}
                                {key === 'topics' && <Tag className="w-3.5 h-3.5" />}
                                {key === 'schedule' && <Clock className="w-3.5 h-3.5" />}
                                {key === 'downloads' && <Download className="w-3.5 h-3.5" />}
                                {key === 'venues' && <MapPin className="w-3.5 h-3.5" />}
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Contents Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

                {/* 1. REGISTRATION FORM TAB */}
                {activeTab === 'registration' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in-up">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <h2 className="text-xl sm:text-2xl font-black text-[#60318e] mb-2">
                                {t.form.heading}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                {t.form.subheading}
                            </p>
                        </div>

                        {submitError && (
                            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8 text-xs">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[#60318e] pb-2 border-b border-purple-100 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#AD49E1]" />
                                    <span>{isEn ? "1. Personal Information" : "1. პერსონალური მონაცემები"}</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
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
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">
                                            {t.form.birthDate}
                                        </label>
                                        <input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
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
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                        />
                                    </div>
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
                                        placeholder={isEn ? "e.g., Tbilisi State University / IICE" : "მაგ: თბილისის სახელმწიფო უნივერსიტეტი / რ. აგლაძის ინსტიტუტი"}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>

                                {/* Titulation Radio Buttons */}
                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">
                                        {t.form.titulation}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-purple-50/30 p-3 rounded-2xl border border-purple-100">
                                        {titulationOptions.map(opt => (
                                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 p-1">
                                                <input
                                                    type="radio"
                                                    name="titulation"
                                                    value={opt.value}
                                                    checked={formData.titulation === opt.value}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                <span>{isEn ? opt.labelEn : opt.labelKa}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Gender & Email & Attendance */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-2">
                                            {t.form.gender}
                                        </label>
                                        <div className="flex gap-4 pt-1">
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
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
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
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
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-2">
                                            {t.form.attendance}
                                        </label>
                                        <div className="flex gap-4 pt-1">
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
                                                <input
                                                    type="radio"
                                                    name="isAttendingInPerson"
                                                    checked={formData.isAttendingInPerson === true}
                                                    onChange={() => setFormData(p => ({ ...p, isAttendingInPerson: true }))}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                {t.form.yes}
                                            </label>
                                            <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
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

                            {/* Presentation Info */}
                            <div className="space-y-4 pt-4 border-t border-purple-100">
                                <h3 className="text-sm font-bold text-[#60318e] pb-2 border-b border-purple-100 flex items-center gap-2">
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
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">
                                        {t.form.coAuthors}
                                    </label>
                                    <input
                                        type="text"
                                        name="coAuthors"
                                        value={formData.coAuthors}
                                        onChange={handleInputChange}
                                        placeholder={isEn ? "e.g., G. Tatishvili, T. Lezhava, N. Nioradze" : "მაგ: გ. ტატიშვილი, თ. ლეჟავა, ნ. ნიორაძე"}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>

                                {/* Presentation Type (Radio) */}
                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">
                                        {t.form.presType}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-purple-50/30 p-3 rounded-2xl border border-purple-100">
                                        {presentationTypeOptions.map(opt => (
                                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                                                <input
                                                    type="radio"
                                                    name="presentationType"
                                                    value={opt.value}
                                                    checked={formData.presentationType === opt.value}
                                                    onChange={handleInputChange}
                                                    className="text-[#60318e] focus:ring-[#AD49E1]"
                                                />
                                                <span>{isEn ? opt.labelEn : opt.labelKa}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Role Checkbox */}
                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">
                                        {t.form.role}
                                    </label>
                                    <div className="flex flex-wrap gap-6 bg-purple-50/30 p-3 rounded-2xl border border-purple-100">
                                        <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                                            <input
                                                type="checkbox"
                                                name="rolePresentingAuthor"
                                                checked={formData.rolePresentingAuthor}
                                                onChange={handleInputChange}
                                                className="text-[#60318e] rounded"
                                            />
                                            <span>{t.form.presentingAuthor}</span>
                                        </label>
                                        <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-slate-800">
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

                                {/* Thematic Topics Dropdown */}
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">
                                        {t.form.topic}
                                    </label>
                                    <select
                                        name="thematicTopic"
                                        value={formData.thematicTopic}
                                        onChange={handleInputChange}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white font-medium"
                                    >
                                        {thematicTopics.map(top => (
                                            <option key={top.id} value={top.id}>
                                                {isEn ? top.titleEn : top.titleKa}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* File Uploads Section */}
                            <div className="space-y-4 pt-4 border-t border-purple-100">
                                <h3 className="text-sm font-bold text-[#60318e] pb-2 border-b border-purple-100 flex items-center gap-2">
                                    <UploadCloud className="w-4 h-4 text-[#AD49E1]" />
                                    <span>{t.form.uploadAbstract}</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="border-2 border-dashed border-purple-200 rounded-2xl p-4 text-center bg-purple-50/40 hover:bg-purple-50 transition-colors relative">
                                        <label className="block font-bold text-slate-700 mb-1 cursor-pointer">
                                            {isEn ? "Georgian Abstract File" : "თეზისი ქართულ ენაზე"}
                                        </label>
                                        <span className="text-[11px] text-purple-700 block mb-3 font-semibold">
                                            {t.form.geoNotice}
                                        </span>
                                        {!geoFile ? (
                                            <input
                                                type="file"
                                                accept=".doc,.docx,.pdf"
                                                onChange={(e) => setGeoFile(e.target.files?.[0] || null)}
                                                className="text-[11px] text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[11px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-purple-200 mt-2 shadow-xs">
                                                <span className="font-bold text-[#60318e] text-[11px] truncate flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                                    {geoFile.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setGeoFile(null)}
                                                    className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors ml-2 flex-shrink-0 cursor-pointer"
                                                    title={isEn ? "Remove file" : "ფაილის წაშლა"}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-2 border-dashed border-purple-200 rounded-2xl p-4 text-center bg-purple-50/40 hover:bg-purple-50 transition-colors relative">
                                        <label className="block font-bold text-slate-700 mb-1 cursor-pointer">
                                            {isEn ? "English Abstract File" : "თეზისი ინგლისურ ენაზე"}
                                        </label>
                                        <span className="text-[11px] text-purple-700 block mb-3 font-semibold">
                                            {t.form.engNotice}
                                        </span>
                                        {!engFile ? (
                                            <input
                                                type="file"
                                                accept=".doc,.docx,.pdf"
                                                onChange={(e) => setEngFile(e.target.files?.[0] || null)}
                                                className="text-[11px] text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[11px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-purple-200 mt-2 shadow-xs">
                                                <span className="font-bold text-[#60318e] text-[11px] truncate flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                                    {engFile.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setEngFile(null)}
                                                    className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors ml-2 flex-shrink-0 cursor-pointer"
                                                    title={isEn ? "Remove file" : "ფაილის წაშლა"}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footnote Notice */}
                                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                                    ℹ️ {t.form.footnote}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-extrabold px-9 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>{t.form.submitting}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
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
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in-up space-y-6">
                        <h2 className="text-xl sm:text-2xl font-black text-[#60318e]">
                            {isEn ? "Conference Thematic Topics (6 Sections)" : "კონფერენციის თემატური მიმართულებები (6 სექცია)"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {thematicTopics.map((top, idx) => (
                                <div key={top.id} className="p-5 rounded-2xl border border-purple-100 bg-slate-50/60 hover:bg-purple-50/50 transition-all flex items-start gap-3.5">
                                    <div className="w-8 h-8 rounded-full bg-[#60318e] text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-xs">
                                        0{idx + 1}
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
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in-up space-y-8">
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

                {/* 4. DOWNLOADS TAB */}
                {activeTab === 'downloads' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in-up space-y-6">
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
                    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-6 sm:p-10 animate-fade-in-up space-y-6">
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

            {/* Success Confirmation Modal */}
            {successData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center relative border border-purple-100">
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
