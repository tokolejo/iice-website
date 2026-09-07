'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Sun, Moon, Languages, Check, Eye } from 'lucide-react';

// Dynamically load master Three.js interactive canvas (no SSR)
const InteractiveLogoCanvas = dynamic(
    () => import('../../components/anniversary3d/InteractiveLogoCanvas'),
    { ssr: false }
);

const VARIANTS = [
    {
        id: 1,
        titleKa: 'ვარიანტი 1: აკადემიური საიუბილეო მედალიონი და დაფნის გვირგვინი',
        titleEn: 'Variant 1: Academic Jubilee Medal & Laurel Wreath',
        badgeKa: 'სურათის მიხედვით • რეკომენდებული',
        badgeEn: 'EXACT PHOTO MOTIF • RECOMMENDED',
        shortDescKa: 'თქვენ მიერ გამოგზავნილი სურათის ზუსტი სტილით: ოქროსფერი დაფნის რტოები, 3D ემბლემა და 70 წლისთავი.',
        shortDescEn: 'Directly matching the laurel branch motif from your reference: 3D embossed medal, laurel wreath, and 70th jubilee.',
        scientificFocusKa: 'აკადემიური პრესტიჟი & ოფიციალური საიუბილეო მედალი'
    },
    {
        id: 2,
        titleKa: 'ვარიანტი 2: არქიტექტურული ფასადი & ოქროსფერი საიუბილეო ლუქი',
        titleEn: 'Variant 2: Architectural Elevation & Golden Seal',
        badgeKa: 'ინსტიტუტის შენობა • სუფთა ხედი',
        badgeEn: 'INSTITUTE BUILDING • ELEVATION',
        shortDescKa: 'ინსტიტუტის 4-სართულიანი შენობა ცენტრში, ოქროსფერი დაფნის ბეჭდით და საიუბილეო პოდიუმით.',
        shortDescEn: 'Clean architectural view of the institute building with a proud floating golden seal and pedestal.',
        scientificFocusKa: 'ისტორიული არქიტექტურა & აგლაძის ინსტიტუტი'
    },
    {
        id: 3,
        titleKa: 'ვარიანტი 3: ატომური ორბიტალები & კვანტური ენერგია',
        titleEn: 'Variant 3: Atomic Orbitals & Quantum Dynamics',
        badgeKa: 'ქიმია & ატომები • დინამიკური 3D',
        badgeEn: 'CHEMISTRY & ORBITALS • DYNAMIC',
        shortDescKa: 'მრავალღერძიანი მბრუნავი 3D ორბიტალები მოძრავი მანათობელი იონებითა და ცენტრალური ემბლემით.',
        shortDescEn: 'Multi-axis rotating 3D atomic orbital rings with orbiting glowing ions encircling the core logo.',
        scientificFocusKa: 'არაორგანული ქიმია & ატომური სტრუქტურა'
    },
    {
        id: 4,
        titleKa: 'ვარიანტი 4: ელექტროქიმიური უჯრედი & იონური ნაკადი',
        titleEn: 'Variant 4: Electrochemical Cell & Ionic Flow',
        badgeKa: 'ელექტროქიმია • აგლაძის სკოლა',
        badgeEn: 'ELECTROCHEMISTRY • AGLADZE LEGACY',
        shortDescKa: 'კათოდ-ანოდის მანათობელი 3D რკალები და წყალბადის ამომავალი ბუშტუკები (აგლაძის ელექტროქიმიის მემკვიდრეობა).',
        shortDescEn: 'Glowing cathode-anode energy arcs and rising effervescent bubbles representing electrolytic science.',
        scientificFocusKa: 'ელექტროქიმია, ელექტროლიზი & ბატარეები'
    },
    {
        id: 5,
        titleKa: 'ვარიანტი 5: კოორდინაციული პოლიედრი & კრისტალური მესერი',
        titleEn: 'Variant 5: Coordination Polyhedron & Crystal Lattice',
        badgeKa: 'კრისტალოგრაფია • კომპლექსნაერთები',
        badgeEn: 'CRYSTALLOGRAPHY • COORDINATION',
        shortDescKa: 'არაორგანული ქიმიის ოქტაედრული კრისტალური მესერი 3D სივრცეში ოქროსფერი და იისფერი წიბოებით.',
        shortDescEn: 'Rotating 3D octahedral coordination complex lattice wireframe surrounding the central seal.',
        scientificFocusKa: 'კოორდინაციული ნაერთები & მინერალები'
    },
    {
        id: 6,
        titleKa: 'ვარიანტი 6: მწვანე წყალბადი & ეკოლოგიური ენერგია',
        titleEn: 'Variant 6: Green Hydrogen & Clean Energy Wave',
        badgeKa: 'მწვანე ენერგეტიკა • წყალბადი',
        badgeEn: 'GREEN ENERGY • HYDROGEN WAVE',
        shortDescKa: 'H2 მოლეკულური ბმები და ზურმუხტისფერ-იისფერი ენერგეტიკული ტალღები სუფთა მომავლისთვის.',
        shortDescEn: 'Fluid emerald and cyan energy waves with hydrogen bonds representing renewable energy.',
        scientificFocusKa: 'მწვანე წყალბადის ტექნოლოგიები'
    },
    {
        id: 7,
        titleKa: 'ვარიანტი 7: მინის კრისტალური მონოლითი & ოპტიკური პრიზმა',
        titleEn: 'Variant 7: Glass Prism Monolith & Caustic Glint',
        badgeKa: 'მინის კრისტალი • ლაქშერი',
        badgeEn: 'GLASS CRYSTAL • LUXURY',
        shortDescKa: 'არქიტექტურული მინის პრიზმა შიგნით ინტეგრირებული შენობით, ლოგოთი და სინათლის ბზინვარებით.',
        shortDescEn: 'Refractive optical glass prism with the building and seal embedded inside, reflecting dynamic light.',
        scientificFocusKa: 'ოპტიკური ქიმია & ფიზიკური ანალიზი'
    },
    {
        id: 8,
        titleKa: 'ვარიანტი 8: საიუბილეო ქრონომეტრი 1956 — 2026',
        titleEn: 'Variant 8: Jubilee Chronometer Dial (1956 — 2026)',
        badgeKa: '70-წლიანი გზა • ქრონომეტრი',
        badgeEn: '70-YEAR TIMELINE • PRECISION',
        shortDescKa: 'მეცნიერების 70-წლიანი დიადი გზის აღმნიშვნელი კონცენტრული მბრუნავი ოქროსფერი ციფერბლატები.',
        shortDescEn: 'Precision concentric rotating scientific dials marking the 70-year anniversary milestone.',
        scientificFocusKa: '70-წლიანი აკადემიური მემკვიდრეობა'
    },
    {
        id: 9,
        titleKa: 'ვარიანტი 9: ჰოლოგრაფიული სამეცნიერო სფერო',
        titleEn: 'Variant 9: Holographic Science Sphere',
        badgeKa: 'გლობალური მეცნიერება • სფერო',
        badgeEn: 'GLOBAL SCIENCE • SPHERE',
        shortDescKa: 'საერთაშორისო სამეცნიერო თანამშრომლობის 3D გეოდეზიური ბადე და მანათობელი ბირთვი.',
        shortDescEn: '3D holographic geodesic sphere representing international research networks and innovation.',
        scientificFocusKa: 'საერთაშორისო სამეცნიერო თანამშრომლობა'
    },
    {
        id: 10,
        titleKa: 'ვარიანტი 10: სამეფო აკადემიური კრესტი & ემბლემა',
        titleEn: 'Variant 10: Royal Academic Crest & Octagonal Seal',
        badgeKa: 'კლასიკური ლაქშერი • აკადემიური',
        badgeEn: 'CLASSIC ACADEMIC • ROYAL LUXURY',
        shortDescKa: 'ოქტაგონალური პრესტიჟული ოქროსფერი გერბი დაფნის გვირგვინით და იისფერი მინანქრით.',
        shortDescEn: 'Regal octagonal academic crest with fine golden filigree, laurel border, and royal purple enamel.',
        scientificFocusKa: 'საინსტიტუტო ტრადიცია & აკადემია'
    }
];

export default function LogoPreviewPage() {
    const [selectedVariant, setSelectedVariant] = useState(1);
    const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
    const [lang, setLang] = useState('ka');     // 'ka' | 'en'

    const active = VARIANTS.find(v => v.id === selectedVariant) || VARIANTS[0];

    return (
        <div className={`min-h-screen transition-colors duration-500 font-sans ${
            theme === 'dark' ? 'bg-[#150422] text-white' : 'bg-slate-50 text-slate-900'
        }`}>
            {/* Header Sticky Control Bar */}
            <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
                theme === 'dark' ? 'bg-[#240838]/90 border-purple-900/40 text-white' : 'bg-white/90 border-purple-100 text-slate-800'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/" 
                            className={`p-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${
                                theme === 'dark' ? 'hover:bg-white/10 text-purple-200' : 'hover:bg-purple-50 text-[#60318e]'
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>მთავარზე</span>
                        </Link>
                        <div className="h-4 w-px bg-purple-200/30 hidden sm:block"></div>
                        <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                            10 Anniversary Logo Concepts
                        </span>
                    </div>

                    {/* Toggles: Language & Theme */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Language Switcher */}
                        <div className="flex items-center border border-purple-200/40 bg-white/10 rounded-full p-0.5">
                            <button
                                onClick={() => setLang('ka')}
                                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                                    lang === 'ka' ? 'bg-amber-400 text-slate-950 font-black shadow-xs' : 'text-purple-200 hover:text-white'
                                }`}
                            >
                                GE
                            </button>
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                                    lang === 'en' ? 'bg-amber-400 text-slate-950 font-black shadow-xs' : 'text-purple-200 hover:text-white'
                                }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Theme Switcher */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-xs ${
                                theme === 'dark' 
                                    ? 'bg-purple-900/50 text-amber-300 border-purple-700/50 hover:bg-purple-900/70' 
                                    : 'bg-white text-[#60318e] border-purple-200 hover:bg-purple-50'
                            }`}
                        >
                            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                            <span className="hidden sm:inline">{theme === 'dark' ? 'ღია ფონი' : 'მუქი ფონი'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Stage */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Intro Title */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>10 საუკეთესო საიუბილეო კონცეფცია ინსტიტუტისთვის</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                        {lang === 'en' ? 'Select Your Preferred 70th Anniversary Emblem' : 'აირჩიეთ საიუბილეო ლოგოს სასურველი ვარიანტი'}
                    </h1>
                    <p className={`mt-2 text-xs sm:text-sm font-medium leading-relaxed ${
                        theme === 'dark' ? 'text-purple-200/80' : 'text-slate-600'
                    }`}>
                        {lang === 'en' 
                            ? 'Every concept below is paired with the exact official dedication text in Georgian & English.'
                            : 'თითოეულ ვარიანტს ქვემოთ თან ახლავს თქვენ მიერ გამოგზავნილი ოფიციალური საიუბილეო ტექსტი ქართულ და ინგლისურ ენებზე.'}
                    </p>
                </div>

                {/* 10-Button Quick Variant Selector Bar */}
                <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
                    {VARIANTS.map((v) => {
                        const isSel = v.id === selectedVariant;
                        return (
                            <button
                                key={`btn-${v.id}`}
                                onClick={() => setSelectedVariant(v.id)}
                                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                                    isSel
                                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-md scale-105'
                                        : theme === 'dark'
                                            ? 'bg-white/5 hover:bg-white/10 text-purple-200 border-white/10'
                                            : 'bg-white hover:bg-purple-50 text-slate-700 border-purple-200 shadow-xs'
                                }`}
                            >
                                <span>#{v.id}</span>
                                <span className="hidden md:inline">{lang === 'en' ? v.titleEn.split(':')[1] : v.titleKa.split(':')[1]}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Active Showcase Card */}
                <div className={`relative rounded-3xl p-6 sm:p-10 border transition-all duration-500 shadow-2xl overflow-hidden mb-16 ${
                    theme === 'dark' 
                        ? 'bg-gradient-to-b from-[#220735] via-[#180426] to-[#0f0119] border-purple-800/40 shadow-purple-950/60' 
                        : 'bg-gradient-to-b from-white via-purple-50/40 to-indigo-50/30 border-purple-200 shadow-purple-200/40'
                }`}>
                    {/* Ambient Glows */}
                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#AD49E1]/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Badge & Title of Active Variant */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                        <div>
                            <span className="inline-block text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider bg-amber-400 text-slate-950 mb-1">
                                {lang === 'en' ? active.badgeEn : active.badgeKa}
                            </span>
                            <h2 className="text-lg sm:text-2xl font-black">
                                {lang === 'en' ? active.titleEn : active.titleKa}
                            </h2>
                            <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-purple-200/70' : 'text-slate-500'}`}>
                                {lang === 'en' ? active.scientificFocusKa : active.scientificFocusKa}
                            </p>
                        </div>
                        <div className="text-right hidden sm:block">
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
                                🖱️ ამოძრავეთ მაუსი 3D რეაგირებისთვის
                            </span>
                        </div>
                    </div>

                    {/* Interactive 3D Canvas */}
                    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center">
                        <InteractiveLogoCanvas 
                            variantId={active.id} 
                            theme={theme} 
                            lang={lang} 
                            key={`canvas-${active.id}-${theme}-${lang}`} 
                        />
                    </div>

                    {/* THE EXACT DEDICATION TEXT DISPLAYED UNDERNEATH THE LOGO (User's Exact Image Content) */}
                    <div className="mt-8 pt-6 border-t border-purple-300/20 text-center max-w-2xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                            <span>📜 ოფიციალური საიუბილეო მიძღვნა (თქვენ მიერ გამოგზავნილი ტექსტი)</span>
                        </div>

                        {lang === 'en' ? (
                            <div className="space-y-1">
                                <p className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-amber-400">
                                    Dedicated to the 70th Anniversary of
                                </p>
                                <p className={`text-sm sm:text-base md:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Rafiel Agladze Institute of
                                </p>
                                <p className={`text-sm sm:text-base md:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Inorganic Chemistry and Electrochemistry
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <p className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-amber-400">
                                    ეძღვნება რაფიელ აგლაძის სახელობის
                                </p>
                                <p className={`text-sm sm:text-base md:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    არაორგანული ქიმიისა და ელექტროქიმიის
                                </p>
                                <p className={`text-sm sm:text-base md:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    ინსტიტუტის დაარსების 70 წლისთავს
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 10-Card Comparison Grid (Compare All 10 in Real-Time) */}
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-3xl font-black">
                            10-ვე ვარიანტის შედარებითი გალერეა
                        </h2>
                        <p className={`text-xs sm:text-sm mt-1 ${theme === 'dark' ? 'text-purple-200/70' : 'text-slate-500'}`}>
                            დააკლიკეთ ნებისმიერ ვარიანტს ზედა მთავარ სცენაზე სანახავად
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {VARIANTS.map((v) => {
                            const isSelected = v.id === selectedVariant;
                            return (
                                <div
                                    key={`grid-card-${v.id}`}
                                    onClick={() => {
                                        setSelectedVariant(v.id);
                                        window.scrollTo({ top: 220, behavior: 'smooth' });
                                    }}
                                    className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                                        isSelected
                                            ? 'ring-2 ring-amber-400 border-amber-400 shadow-xl'
                                            : theme === 'dark'
                                                ? 'bg-white/5 border-purple-900/40 hover:border-[#AD49E1]/60 hover:bg-white/10'
                                                : 'bg-white border-purple-100 shadow-md hover:shadow-lg'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-black text-amber-400">
                                                #{v.id}
                                            </span>
                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                                isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-purple-200'
                                            }`}>
                                                {lang === 'en' ? v.badgeEn : v.badgeKa}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-sm leading-snug group-hover:text-amber-400 transition-colors">
                                            {lang === 'en' ? v.titleEn : v.titleKa}
                                        </h3>
                                        <p className={`text-xs mt-1.5 line-clamp-2 ${theme === 'dark' ? 'text-purple-200/70' : 'text-slate-500'}`}>
                                            {lang === 'en' ? v.shortDescEn : v.shortDescKa}
                                        </p>
                                    </div>

                                    {/* Mini Interactive Canvas for each card */}
                                    <div className="relative w-full h-[220px] my-3 rounded-xl overflow-hidden bg-black/20">
                                        <InteractiveLogoCanvas 
                                            variantId={v.id} 
                                            theme={theme} 
                                            lang={lang} 
                                            key={`mini-${v.id}-${theme}-${lang}`} 
                                        />
                                    </div>

                                    {/* Card Footer: Dedication snippet */}
                                    <div className="pt-2 border-t border-purple-300/20 text-center">
                                        <p className="text-[11px] font-bold text-amber-400 line-clamp-1">
                                            {lang === 'en' 
                                                ? 'Dedicated to 70th Anniversary of IICE' 
                                                : 'ეძღვნება ინსტიტუტის 70 წლისთავს'}
                                        </p>
                                        <span className="text-[10px] text-purple-300/80 font-medium">
                                            დააჭირეთ გასადიდებლად ↑
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Decision Banner */}
                <div className="mt-16 p-8 rounded-3xl text-center bg-gradient-to-r from-[#60318e] via-[#7A1CAC] to-[#AD49E1] text-white shadow-2xl">
                    <h3 className="text-xl sm:text-2xl font-black mb-2">
                        რომელი ვარიანტი გსურთ, რომ დავაყენოთ საიტზე?
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto mb-6">
                        დაასახელეთ სასურველი ვარიანტის ნომერი (#1-დან #10-მდე) და მე მას დაუყოვნებლივ ჩავაშენებ მთავარ გვერდზე და კონფერენციის ჰედერში!
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="px-6 py-3 rounded-xl bg-white text-[#60318e] font-extrabold text-xs sm:text-sm hover:bg-purple-50 transition-all shadow-md"
                        >
                            მთავარ გვერდზე დაბრუნება
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
