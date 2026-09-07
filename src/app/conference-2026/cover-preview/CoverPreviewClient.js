'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Calendar, MapPin, Download, Send, Award, Globe, ArrowLeft, Check, Sparkles, Eye, Layers, Sun, Moon } from 'lucide-react';

// Dynamically import 3D Three.js components with SSR disabled for maximum performance
const Molecules3D = dynamic(() => import('../../../components/conference3d/Molecules3D'), { ssr: false });
const CrystalLattice3D = dynamic(() => import('../../../components/conference3d/CrystalLattice3D'), { ssr: false });
const IonicNetwork3D = dynamic(() => import('../../../components/conference3d/IonicNetwork3D'), { ssr: false });
const AnniversaryOrbitals3D = dynamic(() => import('../../../components/conference3d/AnniversaryOrbitals3D'), { ssr: false });
const GreenHorizon3D = dynamic(() => import('../../../components/conference3d/GreenHorizon3D'), { ssr: false });
const EcoChemistry3D = dynamic(() => import('../../../components/conference3d/EcoChemistry3D'), { ssr: false });
const SilkWaveEco3D = dynamic(() => import('../../../components/conference3d/SilkWaveEco3D'), { ssr: false });

const VARIANTS = [
    // 3 NEW ELEVATED VARIANTS BASED DIRECTLY ON USER'S UPLOADED BANNER PHOTO
    {
        id: 'green-horizon',
        num: 5,
        category: 'banner-style',
        isNew: true,
        defaultTheme: 'light',
        titleKa: 'ვარიანტი 5: მწვანე ენერგეტიკის ჰორიზონტი & 3D ტურბინები',
        titleEn: 'Variant 5: Green Energy Horizon & 3D Turbines',
        icon: '🍃',
        tagKa: 'მბრუნავი 3D ტურბინები, მზის პანელები და იისფერ-მწვანე ტალღები',
        tagEn: 'Rotating 3D Wind Turbines, Solar Array & Flowing Swooshes',
        descKa: 'ქავერის ბანერის სტილში შექმნილი ნათელი და დახვეწილი 3D სცენა: რეალურ დროში მბრუნავი ქარის ტურბინები, მზის ამრეკლი პანელები და ჰორიზონტზე მოძრავი იისფერი და ზურმუხტისფერი ტალღოვანი ლენტები. ზუსტად გადმოსცემს მწვანე ენერგეტიკის არსს.',
        descEn: 'Clean luminous 3D scene directly inspired by the conference banner: smoothly spinning 3D wind turbines, photovoltaic solar panels, and fluid purple-to-emerald swooshes.',
        Component: GreenHorizon3D
    },
    {
        id: 'eco-chem',
        num: 6,
        category: 'banner-style',
        isNew: true,
        defaultTheme: 'light',
        titleKa: 'ვარიანტი 6: ელექტროქიმიური სინთეზი & ეკო-წვეთი',
        titleEn: 'Variant 6: Electrochemical Synthesis & Eco Droplet',
        icon: '💧',
        tagKa: 'წყალბადის/წყლის 3D წვეთი ფოთლით, ლაბორატორიული კოლბა და იონები',
        tagEn: 'Hydrogen/Water Droplet with Leaf Core, Lab Glassware & Effervescent Ions',
        descKa: 'ბანერის მთავარი სამეცნიერო სიმბოლოები: მწვანე ენერგიის 3D წვეთი ფოთლის ბირთვით, ქიმიური კოლბა ამომავალი წყალბადის/იონების ბუშტუკებით და აბრეშუმისებრი იისფერ-მწვანე ტალღები.',
        descEn: 'Scientific motifs from the banner: floating 3D eco water/hydrogen droplet with a leaf core, laboratory flask with effervescent bubbles, and silky purple-emerald ribbons.',
        Component: EcoChemistry3D
    },
    {
        id: 'silk-wave',
        num: 7,
        category: 'banner-style',
        isNew: true,
        defaultTheme: 'light',
        titleKa: 'ვარიანტი 7: საიუბილეო 70 წელი & აბრეშუმის ტალღები',
        titleEn: 'Variant 7: 70th Anniversary Silk Wave & Atomic Fusion',
        icon: '✨',
        tagKa: 'მრავალშრიანი აბრეშუმისებრი ტალღები, ატომური ორბიტალები და ქარის ნიავი',
        tagEn: 'Multi-layered Silk Ribbon Waves, Atomic Orbits & Clean Breeze',
        descKa: 'ინსტიტუტის 70 წლის საიუბილეო ემბლემას გარს უვლის 3D ატომური ორბიტალები, ფონზე კი ლავირებს მრავალშრიანი იისფერი, ზურმუხტისფერი და ოქროსფერი აბრეშუმისებრი ტალღები და სუფთა ენერგიის ნიავი.',
        descEn: 'Prestigious fusion: multi-axis 3D atomic orbitals framing the 70th logo, accompanied by undulating silk wave ribbons in royal purple, emerald, and gold.',
        Component: SilkWaveEco3D
    },
    // PREVIOUS 4 DARK/COSMIC 3D CONCEPTS
    {
        id: 'molecules',
        num: 1,
        category: 'tech-dark',
        isNew: false,
        defaultTheme: 'dark',
        titleKa: 'ვარიანტი 1: ელექტროქიმია & მწვანე მოლეკულები',
        titleEn: 'Variant 1: Electrochemistry & Green Molecules',
        icon: '🧪',
        tagKa: 'მოლეკულური ბმები და იონური ენერგია',
        tagEn: 'Chemical Bonds & Ionic Energy Flow',
        descKa: 'სივრცეში მოტივტივე 3D მოლეკულური სტრუქტურები (ატომები და ბმები) და მათ შორის მოძრავი ენერგეტიკული ნაკადები. რეაგირებს მაუსის მოძრაობაზე (Parallax სიღრმე).',
        descEn: 'Floating 3D chemical molecules and covalent bonds with glowing ionic energy pulses in royal purple and emerald green.',
        Component: Molecules3D
    },
    {
        id: 'crystal',
        num: 2,
        category: 'tech-dark',
        isNew: false,
        defaultTheme: 'dark',
        titleKa: 'ვარიანტი 2: კრისტალური მესერი & ნანო-მატრიცა',
        titleEn: 'Variant 2: Crystal Lattice & Nano Matrix',
        icon: '💎',
        tagKa: 'არაორგანული კრისტალები და ტალღოვანი ველი',
        tagEn: 'Inorganic Polyhedra & Undulating Lattice',
        descKa: 'არაორგანული ნივთიერებების გეომეტრიული კრისტალური მესერი და მბრუნავი 3D პოლიედრები მანათობელი ბირთვით. მესერი ტალღისებურად ირხევა.',
        descEn: 'Geometric crystal lattice mesh undulating like an energy wave with rotating inorganic polyhedra (icosahedrons) featuring glowing cores.',
        Component: CrystalLattice3D
    },
    {
        id: 'ionic',
        num: 3,
        category: 'tech-dark',
        isNew: false,
        defaultTheme: 'dark',
        titleKa: 'ვარიანტი 3: იონური ნაკადი & ელექტროლიტური ქსელი',
        titleEn: 'Variant 3: Ionic Stream & Electrolyte Network',
        icon: '⚡',
        tagKa: 'იონების კონსტელაცია და ელექტროდული ველი',
        tagEn: 'Constellation of Ions & Charge Transfer',
        descKa: 'მანათობელი იონების დინამიკური ქსელი. მაუსის კურსორი მუშაობს როგორც ელექტროდი და იზიდავს/ამოძრავებს იონებს ელექტროქიმიური უჯრედის მსგავსად.',
        descEn: 'Dynamic constellation of charged ions drifting in an electric field. The cursor acts as an active electrode attracting charge particles.',
        Component: IonicNetwork3D
    },
    {
        id: 'orbitals',
        num: 4,
        category: 'tech-dark',
        isNew: false,
        defaultTheme: 'dark',
        titleKa: 'ვარიანტი 4: 70 წლის საიუბილეო ორბიტალები & ეკო-ტალღა',
        titleEn: 'Variant 4: 70th Anniversary Orbitals & Eco Ribbon',
        icon: '⚛️',
        tagKa: 'ატომური ორბიტალები ლოგოს გარშემო და მწვანე ნაკადი',
        tagEn: 'Atomic Orbitals Framing 70th Logo & Eco Flux',
        descKa: 'ინსტიტუტის 70 წლის საიუბილეო ემბლემას გარშემო უვლის 3D ატომური ორბიტალების მანათობელი რგოლები ელექტრონებით, ფონზე კი მწვანე ენერგეტიკის ტალღებია.',
        descEn: 'Multi-axis 3D atomic orbital rings with orbiting electron beads dynamically framing the 70th anniversary emblem.',
        Component: AnniversaryOrbitals3D
    }
];

export default function CoverPreviewClient() {
    const [selectedTab, setSelectedTab] = useState('green-horizon'); // default to the new elevated banner variant
    const [isEn, setIsEn] = useState(false);
    const [copied, setCopied] = useState(false);
    // Theme overrides map: { [variantId]: 'light' | 'dark' }
    const [themeOverrides, setThemeOverrides] = useState({});

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const toggleTheme = (variantId, currentTheme) => {
        setThemeOverrides(prev => ({
            ...prev,
            [variantId]: currentTheme === 'light' ? 'dark' : 'light'
        }));
    };

    // Render single banner with specific 3D background
    const renderBanner = (variant) => {
        const { Component, id, num, titleKa, titleEn, tagKa, tagEn, descKa, descEn, icon, defaultTheme, isNew } = variant;
        const currentTheme = themeOverrides[id] || defaultTheme || 'dark';
        const isLight = currentTheme === 'light';

        return (
            <div key={id} className="space-y-3">
                {/* Variant Header Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-purple-50 border border-purple-100">{icon}</span>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-purple-950">
                                    {isEn ? titleEn : titleKa}
                                </span>
                                {isNew && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
                                        {isEn ? "★ New Banner Style" : "★ ახალი ბანერის სტილი"}
                                    </span>
                                )}
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">
                                    {isEn ? `Option ${num}` : `ვარიანტი ${num}`}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                                {isEn ? tagEn : tagKa}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Theme Toggle Button (Light/Dark) */}
                        <button
                            onClick={() => toggleTheme(id, currentTheme)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer shadow-2xs ${
                                isLight
                                    ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                                    : 'bg-slate-900 text-purple-200 border-purple-800 hover:bg-slate-800'
                            }`}
                            title="Toggle Light / Dark mode for this banner"
                        >
                            {isLight ? (
                                <>
                                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                                    <span>{isEn ? "Light Theme" : "ნათელი ბექგრაუნდი"}</span>
                                </>
                            ) : (
                                <>
                                    <Moon className="w-3.5 h-3.5 text-purple-400" />
                                    <span>{isEn ? "Dark Theme" : "მუქი ბექგრაუნდი"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* The Realistic Banner Container */}
                <div
                    className={`relative overflow-hidden rounded-3xl border-2 shadow-2xl transition-all ${
                        isLight
                            ? 'bg-gradient-to-br from-white via-[#fbf7fe] to-[#edfcf5] border-emerald-400/40 text-slate-900'
                            : 'bg-gradient-to-br from-[#180327] via-[#2a0845] to-[#1a042e] border-purple-500/30 text-white'
                    }`}
                >
                    {/* Live Three.js 3D Background Canvas */}
                    <Component className={isLight ? "opacity-95" : "opacity-90"} theme={currentTheme} />

                    {/* Subtle Overlay to ensure perfect text readability */}
                    <div
                        className={`absolute inset-0 pointer-events-none z-2 ${
                            isLight
                                ? 'bg-gradient-to-r from-white/92 via-white/50 to-white/70'
                                : 'bg-gradient-to-r from-[#180327]/85 via-[#180327]/40 to-[#180327]/80'
                        }`}
                    />

                    {/* Banner Content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pointer-events-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            {/* Left Column: Titles & Details (7 cols) */}
                            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                                
                                {/* Top Badge */}
                                <div
                                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide border backdrop-blur-md shadow-xs ${
                                        isLight
                                            ? 'bg-purple-100/90 text-purple-900 border-purple-300/80'
                                            : 'bg-gradient-to-r from-purple-500/25 to-emerald-500/25 text-purple-200 border-purple-400/30'
                                    }`}
                                >
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                    <span>{isEn ? "3rd International Scientific Conference 2026" : "2026 წლის საერთაშორისო კონფერენცია"}</span>
                                </div>

                                {/* Main Heading */}
                                <h1
                                    className={`text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-black leading-snug tracking-tight drop-shadow-sm ${
                                        isLight ? 'text-purple-950' : 'text-white'
                                    }`}
                                >
                                    {isEn ? (
                                        <>
                                            <span>3rd International Scientific Conference: </span>
                                            <span
                                                className={
                                                    isLight
                                                        ? 'text-emerald-700 font-extrabold underline decoration-emerald-400/60 decoration-2'
                                                        : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-purple-200'
                                                }
                                            >
                                                “Modern Trends in Chemistry, Chemical Technologies and Related Fields: Green Energy Prospects, Ecological Sustainability, Food Safety. 2026”
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>მე-3 საერთაშორისო სამეცნიერო კონფერენცია: </span>
                                            <span
                                                className={
                                                    isLight
                                                        ? 'text-emerald-700 font-extrabold underline decoration-emerald-400/60 decoration-2'
                                                        : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-purple-200'
                                                }
                                            >
                                                „თანამედროვე ტენდენციები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში: მწვანე ენერგეტიკის პერსპექტივები, ეკოლოგიური მდგრადობა, სურსათის უვნებელობა. 2026“
                                            </span>
                                        </>
                                    )}
                                </h1>

                                {/* Key Thematic Focus Badges */}
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold shadow-2xs border ${
                                            isLight
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                                        }`}
                                    >
                                        <span>⚡ {isEn ? "Green Energy Prospects" : "მწვანე ენერგეტიკა"}</span>
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold shadow-2xs border ${
                                            isLight
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                                        }`}
                                    >
                                        <span>🌿 {isEn ? "Ecological Sustainability" : "ეკოლოგიური მდგრადობა"}</span>
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold shadow-2xs border ${
                                            isLight
                                                ? 'bg-purple-100 text-purple-900 border-purple-300'
                                                : 'bg-purple-500/20 border-purple-400/30 text-purple-200'
                                        }`}
                                    >
                                        <span>🧪 {isEn ? "Chemical Technologies" : "ქიმიური ტექნოლოგიები"}</span>
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold shadow-2xs border ${
                                            isLight
                                                ? 'bg-purple-100 text-purple-900 border-purple-300'
                                                : 'bg-purple-500/20 border-purple-400/30 text-purple-200'
                                        }`}
                                    >
                                        <span>🛡️ {isEn ? "Food Safety" : "სურსათის უვნებელობა"}</span>
                                    </span>
                                </div>

                                {/* 70th Anniversary Commemorative Ribbon */}
                                <div
                                    className={`inline-flex items-center gap-2.5 rounded-r-2xl py-2 px-4 shadow-sm border-y border-r backdrop-blur-md max-w-2xl text-left border-l-4 ${
                                        isLight
                                            ? 'bg-purple-900/10 border-purple-300 border-l-purple-700 text-purple-950'
                                            : 'bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 border-l-amber-400 border-amber-300/30 text-amber-100'
                                    }`}
                                >
                                    <Award className={`w-5 h-5 flex-shrink-0 ${isLight ? 'text-purple-700' : 'text-amber-300'}`} />
                                    <span className="text-xs sm:text-[13px] font-bold leading-snug">
                                        {isEn
                                            ? "Dedicated to the 70th anniversary of the founding of Rafael Agladze Institute of Inorganic Chemistry and Electrochemistry (1956–2026)"
                                            : "ეძღვნება რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წელს (1956–2026)"}
                                    </span>
                                </div>

                                {/* Dates & Venues Pills */}
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-0.5 text-xs">
                                    <div
                                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl backdrop-blur-md border shadow-xs ${
                                            isLight
                                                ? 'bg-white/90 text-slate-800 border-slate-300'
                                                : 'bg-white/10 text-white border-white/15'
                                        }`}
                                    >
                                        <Calendar className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-purple-700' : 'text-amber-300'}`} />
                                        <span className="font-bold">{isEn ? "November 25 – 27, 2026" : "25 – 27 ნოემბერი, 2026"}</span>
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl backdrop-blur-md border shadow-xs ${
                                            isLight
                                                ? 'bg-white/90 text-slate-800 border-slate-300'
                                                : 'bg-white/10 text-white border-white/15'
                                        }`}
                                    >
                                        <MapPin className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-purple-700' : 'text-amber-300'}`} />
                                        <span className="font-bold">
                                            {isEn
                                                ? "Tbilisi (TSU) & Telavi (Telavi State University), Georgia"
                                                : "თბილისი (თსუ) & თელავი (თელავის სახელმწიფო უნივერსიტეტი)"}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA Action Buttons */}
                                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#AD49E1] to-[#7A1CAC] text-white font-extrabold px-6 py-2.5 rounded-full text-xs shadow-lg shadow-purple-500/25">
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{isEn ? "Registration & Abstract Submission" : "რეგისტრაცია და აბსტრაქტი"}</span>
                                    </div>
                                    <div
                                        className={`inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-xs border backdrop-blur-md shadow-xs ${
                                            isLight
                                                ? 'bg-white text-purple-900 border-purple-200 hover:bg-purple-50'
                                                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                        }`}
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>{isEn ? "Download Templates (DOCX)" : "შაბლონების ჩამოტვირთვა"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: 70th Anniversary Emblem with Institute Building */}
                            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                                <div
                                    className={`absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-2xl pointer-events-none ${
                                        isLight
                                            ? 'bg-gradient-to-tr from-purple-300/30 via-emerald-300/30 to-amber-200/30'
                                            : 'bg-gradient-to-tr from-[#AD49E1]/30 via-purple-500/20 to-emerald-400/20'
                                    }`}
                                ></div>

                                <div className="relative group transition-all duration-500 hover:scale-105">
                                    <img
                                        src="/conference-2026/iice-70-anniversary-emblem.png"
                                        alt="70th Anniversary Emblem - R. Agladze Institute of Inorganic Chemistry and Electrochemistry"
                                        className="w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] select-none"
                                    />
                                </div>

                                <div className="mt-2 text-center">
                                    <span
                                        className={`inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-widest px-4 py-1 rounded-full border backdrop-blur-md shadow-xs ${
                                            isLight
                                                ? 'text-purple-900 bg-white/85 border-purple-200'
                                                : 'text-purple-200/90 bg-white/10 border-white/15'
                                        }`}
                                    >
                                        {isEn ? "1956 – 2026 • 70 Years Anniversary Edition" : "1956 – 2026 • 70 წლის საიუბილეო გამოცემა"}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Interactive hint bottom strip */}
                    <div
                        className={`relative z-10 px-4 py-2 border-t backdrop-blur-sm flex items-center justify-between text-[11px] ${
                            isLight
                                ? 'bg-white/80 border-slate-200 text-slate-700'
                                : 'bg-black/40 border-white/10 text-purple-200'
                        }`}
                    >
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>{isEn ? "Interactive 3D: Move your mouse or touch the canvas to experience real-time 3D parallax" : "ინტერაქტიული 3D: გადაატარეთ მაუსი ან შეეხეთ ეკრანს 3D სივრცის სამოძრაოდ"}</span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                            Three.js WebGL • 60 FPS
                        </span>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
            
            {/* Top Navigation & Sticky Selector Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        
                        {/* Title & Back to official conference */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                            <Link
                                href="/conference-2026"
                                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-200 transition-all"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>{isEn ? "Official Conference Page" : "კონფერენციის გვერდი"}</span>
                            </Link>
                            
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-purple-600 text-white shadow-xs">
                                    <Eye className="w-4 h-4" />
                                </span>
                                <div>
                                    <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-none">
                                        {isEn ? "3D Cover Live Showcase" : "3D ქავერების საჩვენებელი გვერდი"}
                                    </h2>
                                    <span className="text-[10px] text-gray-500 font-bold">
                                        Conference 2026 • 7 Scientific Concepts
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Language & Share buttons */}
                        <div className="flex items-center gap-2 self-end md:self-auto">
                            {/* Copy Link button */}
                            <button
                                onClick={handleCopyLink}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition-all cursor-pointer"
                                title="Copy link to share with colleagues"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="text-emerald-700 font-extrabold">{isEn ? "Copied!" : "დაკოპირდა!"}</span>
                                    </>
                                ) : (
                                    <>
                                        <Layers className="w-3.5 h-3.5 text-purple-600" />
                                        <span>{isEn ? "Share Link" : "ბმულის კოპირება"}</span>
                                    </>
                                )}
                            </button>

                            {/* Language Toggle */}
                            <button
                                onClick={() => setIsEn(!isEn)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-extrabold text-purple-800 transition-all cursor-pointer"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span>{isEn ? "🇬🇪 ქართული" : "🇬🇧 English"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Category Label + Variant Tabs Navigation */}
                    <div className="mt-3 pt-2 border-t border-purple-50 space-y-2">
                        
                        {/* Section 1: The 3 Elevated Banner Style Variants */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                            <span className="text-[10px] uppercase tracking-wider font-black text-emerald-800 bg-emerald-100 px-2 py-1 rounded-md whitespace-nowrap flex-shrink-0">
                                {isEn ? "★ Banner Style (Light/Waves):" : "★ ბანერის სტილის (ტალღები/ტურბინები):"}
                            </span>
                            {VARIANTS.filter(v => v.category === 'banner-style').map(v => {
                                const isSelected = selectedTab === v.id;
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedTab(v.id)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                                            isSelected
                                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
                                                : 'bg-white hover:bg-emerald-50 text-slate-800 border border-emerald-200'
                                        }`}
                                    >
                                        <span>{v.icon}</span>
                                        <span>{isEn ? `Option ${v.num}` : `ვარიანტი ${v.num}`}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Section 2: The 4 Tech/Dark 3D Variants */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                            <span className="text-[10px] uppercase tracking-wider font-black text-purple-800 bg-purple-100 px-2 py-1 rounded-md whitespace-nowrap flex-shrink-0">
                                {isEn ? "🌌 Cosmic Tech 3D:" : "🌌 კოსმიური / ტექ 3D:"}
                            </span>
                            {VARIANTS.filter(v => v.category === 'tech-dark').map(v => {
                                const isSelected = selectedTab === v.id;
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedTab(v.id)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                                            isSelected
                                                ? 'bg-purple-700 text-white shadow-md shadow-purple-600/25 scale-[1.02]'
                                                : 'bg-white hover:bg-purple-50 text-slate-700 border border-gray-200'
                                        }`}
                                    >
                                        <span>{v.icon}</span>
                                        <span>{isEn ? `Option ${v.num}` : `ვარიანტი ${v.num}`}</span>
                                    </button>
                                );
                            })}

                            {/* "View All" button */}
                            <button
                                onClick={() => setSelectedTab('all')}
                                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                                    selectedTab === 'all'
                                        ? 'bg-slate-900 text-white shadow-md'
                                        : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                                }`}
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>{isEn ? "View All 7 (Comparison)" : "ყველა 7 ერთად (შედარება)"}</span>
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
                
                {/* Intro notice banner */}
                <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 text-white p-5 rounded-2xl shadow-md border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <h3 className="text-sm font-black tracking-wide text-emerald-200">
                                {isEn ? "7 Interactive 3D Concepts for Conference 2026" : "კონფერენციის 7 ინტერაქტიული 3D ქავერის საჩვენებელი გვერდი"}
                            </h3>
                        </div>
                        <p className="text-xs text-purple-200 leading-relaxed max-w-3xl">
                            {isEn
                                ? "We have added 3 new elevated concepts (Variants 5, 6, 7) directly inspired by your conference banner: featuring rotating 3D wind turbines, solar panels, water/hydrogen droplets with leaf cores, laboratory glassware, and silky flowing purple-emerald waves. Every banner can be toggled between Light and Dark backgrounds."
                                : "თქვენი ბანერის სტილში დაემატა 3 ახალი დახვეწილი ვარიანტი (ვარიანტები 5, 6, 7): რეალურ დროში მბრუნავი 3D ქარის ტურბინებით, მზის პანელებით, ეკო-წვეთით, ლაბორატორიული კოლბითა და აბრეშუმისებრი იისფერ-მწვანე ტალღებით. თითოეულ ვარიანტს აქვს ნათელი/მუქი ბექგრაუნდის გადამრთველი ღილაკი."}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-xs font-bold border border-emerald-400/30 text-emerald-300">
                            {isEn ? "7 Live 3D Variants" : "7 ინტერაქტიული ვარიანტი"}
                        </span>
                    </div>
                </div>

                {/* Banner Render Area */}
                {selectedTab === 'all' ? (
                    // Render all 7 stacked for comparison
                    <div className="space-y-12">
                        {VARIANTS.map(v => renderBanner(v))}
                    </div>
                ) : (
                    // Render single selected variant
                    <div>
                        {VARIANTS.filter(v => v.id === selectedTab).map(v => renderBanner(v))}
                    </div>
                )}

                {/* Concept Descriptions & Evaluation Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                        <h3 className="text-lg font-black text-slate-900">
                            {isEn ? "Summary of All 7 Scientific 3D Concepts" : "ყველა 7 სამეცნიერო 3D კონცეფციის შედარება და აღწერა"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {isEn ? "Click any card below to jump to that 3D concept." : "დააკლიკეთ ნებისმიერ ბარათს ქვემოთ, რომ ზემოთ პირდაპირ ჩაირთოს შესაბამისი 3D სცენა."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {VARIANTS.map(v => {
                            const isCurrent = selectedTab === v.id;
                            return (
                                <div
                                    key={v.id}
                                    onClick={() => {
                                        setSelectedTab(v.id);
                                        window.scrollTo({ top: 180, behavior: 'smooth' });
                                    }}
                                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                        isCurrent
                                            ? 'border-emerald-600 bg-emerald-50/50 shadow-md scale-[1.01]'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{v.icon}</span>
                                                <div>
                                                    <h4 className="text-xs font-black text-slate-900">
                                                        {isEn ? v.titleEn : v.titleKa}
                                                    </h4>
                                                    <span className="text-[10px] font-bold text-emerald-700">
                                                        {isEn ? v.tagEn : v.tagKa}
                                                    </span>
                                                </div>
                                            </div>
                                            {isCurrent && (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-700 text-white flex items-center gap-0.5">
                                                    <Check className="w-2.5 h-2.5" />
                                                    <span>{isEn ? "Active" : "აქტიური"}</span>
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed mt-2">
                                            {isEn ? v.descEn : v.descKa}
                                        </p>
                                    </div>
                                    {v.isNew && (
                                        <div className="mt-3 pt-2 border-t border-emerald-100 flex items-center justify-between text-[10px]">
                                            <span className="font-extrabold text-emerald-700">★ Banner Style</span>
                                            <span className="text-gray-400">Light / Dark toggle</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>
        </div>
    );
}
