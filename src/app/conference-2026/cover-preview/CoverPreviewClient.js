'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Calendar, MapPin, Download, Send, Award, Globe, ArrowLeft, Check, Sparkles, Eye, Layers } from 'lucide-react';

// Dynamically import 3D Three.js components with SSR disabled for maximum performance
const Molecules3D = dynamic(() => import('../../../components/conference3d/Molecules3D'), { ssr: false });
const CrystalLattice3D = dynamic(() => import('../../../components/conference3d/CrystalLattice3D'), { ssr: false });
const IonicNetwork3D = dynamic(() => import('../../../components/conference3d/IonicNetwork3D'), { ssr: false });
const AnniversaryOrbitals3D = dynamic(() => import('../../../components/conference3d/AnniversaryOrbitals3D'), { ssr: false });

const VARIANTS = [
    {
        id: 'molecules',
        num: 1,
        titleKa: 'ვარიანტი 1: ელექტროქიმია & მწვანე მოლეკულები',
        titleEn: 'Variant 1: Electrochemistry & Green Molecules',
        icon: '🧪',
        tagKa: 'მოლეკულური ბმები და იონური ენერგია',
        tagEn: 'Chemical Bonds & Ionic Energy Flow',
        descKa: 'სივრცეში მოტივტივე 3D მოლეკულური სტრუქტურები (ატომები და ბმები) და მათ შორის მოძრავი ენერგეტიკული ნაკადები. რეაგირებს მაუსის მოძრაობაზე (Parallax სიღრმე). ასახავს ქიმიას, ელექტროქიმიასა და სუფთა ენერგოტექნოლოგიებს.',
        descEn: 'Floating 3D chemical molecules and covalent bonds with glowing ionic energy pulses in royal purple and emerald green, responding to cursor parallax.',
        Component: Molecules3D
    },
    {
        id: 'crystal',
        num: 2,
        titleKa: 'ვარიანტი 2: კრისტალური მესერი & ნანო-მატრიცა',
        titleEn: 'Variant 2: Crystal Lattice & Nano Matrix',
        icon: '💎',
        tagKa: 'არაორგანული კრისტალები და ტალღოვანი ველი',
        tagEn: 'Inorganic Polyhedra & Undulating Lattice',
        descKa: 'არაორგანული ნივთიერებების გეომეტრიული კრისტალური მესერი და მბრუნავი 3D პოლიედრები (იკოსაედრები და ოქტაედრები) მანათობელი ბირთვით. მესერი ტალღისებურად ირხევა, რაც ქმნის მაღალტექნოლოგიურ და აკადემიურ იერს.',
        descEn: 'Geometric crystal lattice mesh undulating like an energy wave with rotating inorganic polyhedra (icosahedrons) featuring glowing cores.',
        Component: CrystalLattice3D
    },
    {
        id: 'ionic',
        num: 3,
        titleKa: 'ვარიანტი 3: იონური ნაკადი & ელექტროლიტური ქსელი',
        titleEn: 'Variant 3: Ionic Stream & Electrolyte Network',
        icon: '⚡',
        tagKa: 'იონების კონსტელაცია და ელექტროდული ველი',
        tagEn: 'Constellation of Ions & Charge Transfer',
        descKa: 'მანათობელი იონების დინამიკური ქსელი, რომლებიც ერთმანეთს ენერგეტიკული ხაზებით უკავშირდებიან. მაუსის კურსორი მუშაობს როგორც ელექტროდი და იზიდავს/ამოძრავებს იონებს ელექტროქიმიური უჯრედის მსგავსად.',
        descEn: 'Dynamic constellation of charged ions drifting in an electric field. The cursor acts as an active electrode attracting charge particles.',
        Component: IonicNetwork3D
    },
    {
        id: 'orbitals',
        num: 4,
        titleKa: 'ვარიანტი 4: 70 წლის საიუბილეო ორბიტალები & ეკო-ტალღა',
        titleEn: 'Variant 4: 70th Anniversary Orbitals & Eco Ribbon',
        icon: '⚛️',
        tagKa: 'ატომური ორბიტალები ლოგოს გარშემო და მწვანე ნაკადი',
        tagEn: 'Atomic Orbitals Framing 70th Logo & Eco Flux',
        descKa: 'ინსტიტუტის 70 წლის საიუბილეო ემბლემას გარშემო უვლის 3D ატომური ორბიტალების მანათობელი რგოლები ელექტრონებით, ხოლო ფონზე იშლება მწვანე ენერგეტიკის (ქარისა და მზის) მსუბუქი ტალღოვანი 3D ლენტები.',
        descEn: 'Multi-axis 3D atomic orbital rings with orbiting electron beads dynamically framing the 70th anniversary emblem, flanked by flowing green energy ribbons.',
        Component: AnniversaryOrbitals3D
    }
];

export default function CoverPreviewClient() {
    const [selectedTab, setSelectedTab] = useState('molecules'); // 'molecules' | 'crystal' | 'ionic' | 'orbitals' | 'all'
    const [isEn, setIsEn] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    // Render single banner with specific 3D background
    const renderBanner = (variant) => {
        const { Component, id, num, titleKa, titleEn, tagKa, tagEn, descKa, descEn, icon } = variant;

        return (
            <div key={id} className="space-y-3">
                {/* Variant Header Info Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-purple-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-purple-50 border border-purple-100">{icon}</span>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-purple-950">
                                    {isEn ? titleEn : titleKa}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">
                                    {isEn ? `Option ${num}` : `ვარიანტი ${num}`}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                                {isEn ? tagEn : tagKa}
                            </p>
                        </div>
                    </div>
                    <div className="text-right max-w-md hidden sm:block">
                        <p className="text-xs text-gray-600 leading-relaxed">
                            {isEn ? descEn : descKa}
                        </p>
                    </div>
                </div>

                {/* The Realistic Banner Container */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#180327] via-[#2a0845] to-[#1a042e] border-2 border-purple-500/30 shadow-2xl transition-all">
                    
                    {/* Live Three.js 3D Background Canvas */}
                    <Component className="opacity-90" />

                    {/* Subtle Overlay to ensure perfect text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#180327]/85 via-[#180327]/40 to-[#180327]/80 pointer-events-none z-2" />

                    {/* Banner Content (identical to official conference page) */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pointer-events-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            {/* Left Column: Titles & Details (7 cols) */}
                            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                                
                                {/* Top Badge */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide bg-gradient-to-r from-purple-500/25 to-emerald-500/25 text-purple-200 border border-purple-400/30 backdrop-blur-md shadow-xs">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                    <span>{isEn ? "3rd International Scientific Conference 2026" : "2026 წლის საერთაშორისო კონფერენცია"}</span>
                                </div>

                                {/* Main Heading */}
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-black text-white leading-snug tracking-tight drop-shadow-sm">
                                    {isEn ? (
                                        <>
                                            <span>3rd International Scientific Conference: </span>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-purple-200">
                                                “Modern Trends in Chemistry, Chemical Technologies and Related Fields: Green Energy Prospects, Ecological Sustainability, Food Safety. 2026”
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>მე-3 საერთაშორისო სამეცნიერო კონფერენცია: </span>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-purple-200">
                                                „თანამედროვე ტენდენციები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში: მწვანე ენერგეტიკის პერსპექტივები, ეკოლოგიური მდგრადობა, სურსათის უვნებელობა. 2026“
                                            </span>
                                        </>
                                    )}
                                </h1>

                                {/* Key Thematic Focus Badges */}
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold shadow-2xs backdrop-blur-xs">
                                        <span>⚡ {isEn ? "Green Energy Prospects" : "მწვანე ენერგეტიკა"}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold shadow-2xs backdrop-blur-xs">
                                        <span>🌿 {isEn ? "Ecological Sustainability" : "ეკოლოგიური მდგრადობა"}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] font-bold shadow-2xs backdrop-blur-xs">
                                        <span>🧪 {isEn ? "Chemical Technologies" : "ქიმიური ტექნოლოგიები"}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] font-bold shadow-2xs backdrop-blur-xs">
                                        <span>🛡️ {isEn ? "Food Safety" : "სურსათის უვნებელობა"}</span>
                                    </span>
                                </div>

                                {/* 70th Anniversary Commemorative Ribbon */}
                                <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 border-l-4 border-amber-400 rounded-r-2xl py-2 px-4 shadow-sm border-y border-r border-amber-300/30 backdrop-blur-md max-w-2xl text-left">
                                    <Award className="w-5 h-5 text-amber-300 flex-shrink-0" />
                                    <span className="text-xs sm:text-[13px] font-bold text-amber-100 leading-snug">
                                        {isEn
                                            ? "Dedicated to the 70th anniversary of the founding of Rafael Agladze Institute of Inorganic Chemistry and Electrochemistry (1956–2026)"
                                            : "ეძღვნება რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წელს (1956–2026)"}
                                    </span>
                                </div>

                                {/* Dates & Venues Pills */}
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-0.5 text-xs">
                                    <div className="flex items-center gap-2 bg-white/10 text-white px-3.5 py-1.5 rounded-xl backdrop-blur-md border border-white/15 shadow-xs">
                                        <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                        <span className="font-bold">{isEn ? "November 25 – 27, 2026" : "25 – 27 ნოემბერი, 2026"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 text-white px-3.5 py-1.5 rounded-xl backdrop-blur-md border border-white/15 shadow-xs">
                                        <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                        <span className="font-bold">{isEn ? "Tbilisi (TSU) & Telavi (Telavi State University), Georgia" : "თბილისი (თსუ) & თელავი (თელავის სახელმწიფო უნივერსიტეტი)"}</span>
                                    </div>
                                </div>

                                {/* CTA Action Buttons */}
                                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#AD49E1] to-[#7A1CAC] text-white font-extrabold px-6 py-2.5 rounded-full text-xs shadow-lg shadow-purple-500/25">
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{isEn ? "Registration & Abstract Submission" : "რეგისტრაცია და აბსტრაქტი"}</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-5 py-2.5 rounded-full text-xs border border-white/20 backdrop-blur-md shadow-xs">
                                        <Download className="w-3.5 h-3.5" />
                                        <span>{isEn ? "Download Templates (DOCX)" : "შაბლონების ჩამოტვირთვა"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: 70th Anniversary Emblem with Institute Building */}
                            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                                <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-[#AD49E1]/30 via-purple-500/20 to-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

                                <div className="relative group transition-all duration-500 hover:scale-105">
                                    <img
                                        src="/conference-2026/iice-70-anniversary-emblem.png"
                                        alt="70th Anniversary Emblem - R. Agladze Institute of Inorganic Chemistry and Electrochemistry"
                                        className="w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] select-none"
                                    />
                                </div>

                                <div className="mt-2 text-center">
                                    <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-purple-200/90 bg-white/10 px-4 py-1 rounded-full border border-white/15 backdrop-blur-md shadow-xs">
                                        {isEn ? "1956 – 2026 • 70 Years Anniversary Edition" : "1956 – 2026 • 70 წლის საიუბილეო გამოცემა"}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Interactive hint bottom strip */}
                    <div className="relative z-10 px-4 py-2 bg-black/40 border-t border-white/10 backdrop-blur-sm flex items-center justify-between text-[11px] text-purple-200">
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>{isEn ? "Interactive 3D: Move your mouse or touch the banner to interact with the 3D space" : "ინტერაქტიული 3D: გადაატარეთ მაუსი ან შეეხეთ ეკრანს სივრცის სამოძრაოდ"}</span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
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
                                <span className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs">
                                    <Eye className="w-4 h-4" />
                                </span>
                                <div>
                                    <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-none">
                                        {isEn ? "3D Cover Live Showcase" : "3D ქავერების საჩვენებელი გვერდი"}
                                    </h2>
                                    <span className="text-[10px] text-gray-500 font-bold">
                                        Conference 2026 • 4 Visual Concepts
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

                    {/* Variant Tabs Navigation */}
                    <div className="flex items-center gap-2 overflow-x-auto py-2.5 mt-2 border-t border-purple-50 no-scrollbar">
                        {VARIANTS.map(v => {
                            const isSelected = selectedTab === v.id;
                            return (
                                <button
                                    key={v.id}
                                    onClick={() => setSelectedTab(v.id)}
                                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-purple-700 text-white shadow-md shadow-purple-600/20 scale-[1.02]'
                                            : 'bg-white hover:bg-purple-50 text-gray-700 border border-gray-200 hover:border-purple-300'
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
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                                selectedTab === 'all'
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                        >
                            <Layers className="w-3.5 h-3.5" />
                            <span>{isEn ? "View All 4 (Stacked Comparison)" : "ყველა ერთად (შედარება)"}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
                
                {/* Intro notice banner */}
                <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-5 rounded-2xl shadow-md border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <h3 className="text-sm font-black tracking-wide text-amber-200">
                                {isEn ? "Scientific Profile 3D Showcase (Three.js WebGL)" : "ინსტიტუტის პროფილზე მორგებული 3D ქავერები (Three.js WebGL)"}
                            </h3>
                        </div>
                        <p className="text-xs text-purple-200 leading-relaxed max-w-3xl">
                            {isEn
                                ? "Choose between 4 custom 3D scientific concepts designed for the TSU Rafael Agladze Institute of Inorganic Chemistry & Electrochemistry 70th Anniversary Conference 2026. Review them live on desktop or mobile, share the link with colleagues, and pick the best one to place on the live conference page."
                                : "თქვენ შეგიძლიათ მოსინჯოთ 4 განსხვავებული სამეცნიერო 3D კონცეფცია, რომელიც შექმნილია რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის 70 წლის საიუბილეო კონფერენციისათვის. შეარჩიეთ საუკეთესო და პირდაპირ დავსვამთ კონფერენციის მთავარ გვერდზე."}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold border border-white/15 backdrop-blur-md">
                            {isEn ? "4 Live Options" : "4 ინტერაქტიული ვარიანტი"}
                        </span>
                    </div>
                </div>

                {/* Banner Render Area */}
                {selectedTab === 'all' ? (
                    // Render all 4 stacked for comparison
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
                            {isEn ? "Summary & Details of the 4 Scientific 3D Concepts" : "4 სამეცნიერო 3D კონცეფციის დეტალური აღწერა და შედარება"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {isEn ? "Click any option below to switch and test it in full screen above." : "დააკლიკეთ ნებისმიერ ვარიანტს ქვემოთ, რომ ზემოთ პირდაპირ ჩაირთოს შესაბამისი 3D სცენა."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {VARIANTS.map(v => {
                            const isCurrent = selectedTab === v.id;
                            return (
                                <div
                                    key={v.id}
                                    onClick={() => {
                                        setSelectedTab(v.id);
                                        window.scrollTo({ top: 180, behavior: 'smooth' });
                                    }}
                                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                                        isCurrent
                                            ? 'border-purple-600 bg-purple-50/50 shadow-md scale-[1.01]'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-2xl">{v.icon}</span>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900">
                                                    {isEn ? v.titleEn : v.titleKa}
                                                </h4>
                                                <span className="text-[11px] font-bold text-purple-700">
                                                    {isEn ? v.tagEn : v.tagKa}
                                                </span>
                                            </div>
                                        </div>
                                        {isCurrent && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-700 text-white flex items-center gap-1">
                                                <Check className="w-3 h-3" />
                                                <span>{isEn ? "Active" : "აქტიური"}</span>
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed mt-2">
                                        {isEn ? v.descEn : v.descKa}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>
        </div>
    );
}
