'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Sun, Moon, Layers, Check, Info } from 'lucide-react';

// Dynamic SSR-disabled imports for Three.js 3D WebGL scenes
const ArchitecturalStage3D = dynamic(() => import('../../components/anniversary3d/ArchitecturalStage3D'), { ssr: false });
const AtomicOrbitals3D = dynamic(() => import('../../components/anniversary3d/AtomicOrbitals3D'), { ssr: false });
const GlassShowcase3D = dynamic(() => import('../../components/anniversary3d/GlassShowcase3D'), { ssr: false });

const CONCEPTS = [
    {
        id: 'architectural',
        num: 1,
        titleKa: 'ვარიანტი 1: არქიტექტურული 3D პოდიუმი & მცურავი მედალიონი',
        titleEn: 'Variant 1: Architectural 3D Stage & Floating Medallion',
        tagKa: 'რეკომენდებული • პრესტიჟული აკადემიური სტილი',
        badge: 'RECOMMENDED',
        descKa: 'ინსტიტუტის 4-სართულიანი შენობა დგას სუფთა, ელეგანტურ 3D პლატფორმაზე. შენობის ზემოთ ლავირებს ინსტიტუტის ოფიციალური ლოგო ოქროსფერ-იისფერი 3D მედალიონის სახით, ხოლო ძირში დატანილია დახვეწილი საიუბილეო წარწერა „70 YEARS • 1956—2026“. მაუსის მოძრაობაზე მთელი სცენა მსუბუქად რეაგირებს.',
        Component: ArchitecturalStage3D
    },
    {
        id: 'orbitals',
        num: 2,
        titleKa: 'ვარიანტი 2: ატომური ორბიტალები & საიუბილეო ჰოლოგრამა',
        titleEn: 'Variant 2: Atomic Orbitals & Scientific Hologram',
        tagKa: 'ქიმია & ელექტროქიმია • დინამიკური 3D ორბიტები',
        badge: 'SCIENTIFIC',
        descKa: 'ცენტრში წარმოდგენილია სუფთა შენობა, რომელსაც გარს უვლის 3D ოქროსფერი და იისფერი ატომური ორბიტალები მოძრავი მანათობელი იონებით. ზედა ნაწილში ინტეგრირებულია დახვეწილი საიუბილეო კაფსულა „70 YEARS“ და ინსტიტუტის ოფიციალური ბეჭედი.',
        Component: AtomicOrbitals3D
    },
    {
        id: 'glass',
        num: 3,
        titleKa: 'ვარიანტი 3: მინის კრისტალური ვიტრინა (Glass Crystal Showcase)',
        titleEn: 'Variant 3: Glass Crystal Showcase & Precision Typography',
        tagKa: 'ულტრა-თანამედროვე • მინიმალისტური ლაქშერი',
        badge: 'MODERN LUXURY',
        descKa: 'ინსტიტუტის შენობა დაცულია ნახევრადგამჭვირვალე 3D მინის კრისტალში ოქროსფერი წახნაგებით. მაუსის მოძრაობას დაყვება დინამიკური განათება (Spotlight), რომელიც მინასა და შენობაზე აჩენს სინათლის ბზინვარებას. ლოგო და საიუბილეო წარწერა ამოტვიფრულია მინის წახნაგზე.',
        Component: GlassShowcase3D
    }
];

export default function LogoPreviewPage() {
    const [activeConcept, setActiveConcept] = useState('architectural');
    const [theme, setTheme] = useState('dark'); // 'dark' | 'light'

    const current = CONCEPTS.find(c => c.id === activeConcept) || CONCEPTS[0];
    const Active3D = current.Component;

    return (
        <div className={`min-h-screen transition-colors duration-500 font-sans ${
            theme === 'dark' ? 'bg-[#180527] text-white' : 'bg-slate-50 text-slate-900'
        }`}>
            {/* Top Navigation Bar */}
            <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
                theme === 'dark' ? 'bg-[#2e0d42]/90 border-purple-900/40 text-white' : 'bg-white/90 border-purple-100 text-slate-800'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/" 
                            className={`p-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${
                                theme === 'dark' ? 'hover:bg-white/10 text-purple-200' : 'hover:bg-purple-50 text-[#60318e]'
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>მთავარზე დაბრუნება</span>
                        </Link>
                        <div className="h-4 w-px bg-purple-200/30 hidden sm:block"></div>
                        <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                            70 Years 3D Logo Lab
                        </span>
                    </div>

                    {/* Controls: Theme Switcher */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-xs ${
                                theme === 'dark' 
                                    ? 'bg-purple-900/40 text-amber-300 border-purple-700/50 hover:bg-purple-900/70' 
                                    : 'bg-white text-[#60318e] border-purple-200 hover:bg-purple-50'
                            }`}
                            title="ფონის შეცვლა (მთავარი გვერდის ღია ფონი vs კონფერენციის მუქი ფონი)"
                        >
                            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                            <span>{theme === 'dark' ? 'ღია ფონი (მთავარი)' : 'მუქი ფონი (კონფერენცია)'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header Title */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>საიუბილეო ლოგოს 3D კონცეფციების სატესტო ლაბორატორია</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                        შენობა • ინსტიტუტის ლოგო • 70 წელი
                    </h1>
                    <p className={`mt-2 text-xs sm:text-sm font-medium leading-relaxed ${
                        theme === 'dark' ? 'text-purple-200/80' : 'text-slate-600'
                    }`}>
                        გაეცანით სამივე ინტერაქტიულ 3D ვარიანტს რეალურ დროში. გადაამოწმეთ მაუსის მიმართულებაზე რეაგირება და შეადარეთ როგორც ღია, ისე მუქ ფონზე.
                    </p>
                </div>

                {/* Variant Switcher Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                    {CONCEPTS.map((c) => {
                        const active = c.id === activeConcept;
                        return (
                            <button
                                key={c.id}
                                onClick={() => setActiveConcept(c.id)}
                                className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                                    active
                                        ? theme === 'dark'
                                            ? 'bg-gradient-to-br from-[#3c1356] to-[#250838] border-[#AD49E1] ring-2 ring-[#AD49E1]/50 shadow-xl'
                                            : 'bg-white border-[#7A1CAC] ring-2 ring-purple-200 shadow-lg'
                                        : theme === 'dark'
                                            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                                            : 'bg-white/70 border-slate-200 hover:bg-white text-slate-700'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                        active ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-400'
                                    }`}>
                                        {c.badge}
                                    </span>
                                    {active && <Check className="w-4 h-4 text-emerald-400" />}
                                </div>
                                <h3 className={`font-bold text-sm sm:text-base ${active ? (theme === 'dark' ? 'text-white' : 'text-[#60318e]') : ''}`}>
                                    {c.titleKa}
                                </h3>
                                <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-purple-200/70' : 'text-slate-500'}`}>
                                    {c.tagKa}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Interactive 3D Showcase Stage */}
                <div className={`relative rounded-3xl p-6 sm:p-10 border transition-all duration-500 shadow-2xl overflow-hidden ${
                    theme === 'dark' 
                        ? 'bg-gradient-to-b from-[#240838] via-[#1b052b] to-[#12021d] border-purple-800/40 shadow-purple-950/50' 
                        : 'bg-gradient-to-b from-white via-purple-50/40 to-indigo-50/40 border-purple-200 shadow-purple-200/40'
                }`}>
                    {/* Ambient Glows */}
                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#AD49E1]/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Canvas Stage Frame */}
                    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center">
                        <Active3D theme={theme} key={`${activeConcept}-${theme}`} />
                    </div>

                    {/* Sub-Card Information & Decision Guide */}
                    <div className={`mt-6 pt-6 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                        theme === 'dark' ? 'border-white/10 text-purple-200' : 'border-purple-100 text-slate-700'
                    }`}>
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-1">
                                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                                <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wide">
                                    კონცეფციის აღწერა:
                                </h4>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed">
                                {current.descKa}
                            </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
                                🖱️ ამოძრავეთ მაუსი 3D სიღრმის შესამოწმებლად
                            </span>
                        </div>
                    </div>
                </div>

                {/* Comparison Grid (View All 3 Side by Side) */}
                <div className="mt-16">
                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl font-black">
                            სამივე ვარიანტის პარალელური შედარება
                        </h2>
                        <p className={`text-xs sm:text-sm mt-1 ${theme === 'dark' ? 'text-purple-200/70' : 'text-slate-500'}`}>
                            შეადარეთ სამივე მიდგომა ერთდროულად თქვენი საბოლოო არჩევანისთვის
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {CONCEPTS.map((c) => {
                            const MiniComp = c.Component;
                            return (
                                <div
                                    key={`grid-${c.id}`}
                                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                                        theme === 'dark'
                                            ? 'bg-white/5 border-purple-900/40 hover:border-[#AD49E1]/60'
                                            : 'bg-white border-purple-100 shadow-md hover:shadow-lg'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-black text-amber-400">
                                                #{c.num} • {c.badge}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    setActiveConcept(c.id);
                                                    window.scrollTo({ top: 180, behavior: 'smooth' });
                                                }}
                                                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                                            >
                                                დიდ ეკრანზე ნახვა
                                            </button>
                                        </div>
                                        <h3 className="font-bold text-sm mb-2">
                                            {c.titleKa}
                                        </h3>
                                    </div>

                                    <div className="relative w-full h-[280px] my-3 rounded-xl overflow-hidden bg-black/20">
                                        <MiniComp theme={theme} key={`mini-${c.id}-${theme}`} />
                                    </div>

                                    <p className={`text-xs leading-relaxed mt-2 ${theme === 'dark' ? 'text-purple-200/70' : 'text-slate-600'}`}>
                                        {c.descKa}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 p-8 rounded-3xl text-center bg-gradient-to-r from-[#60318e] via-[#7A1CAC] to-[#AD49E1] text-white shadow-2xl">
                    <h3 className="text-xl sm:text-2xl font-black mb-2">
                        რომელი ვარიანტი მოგწონთ ყველაზე მეტად?
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto mb-6">
                        მითხარით არჩეული ვარიანტის ნომერი (#1, #2 ან #3) და მე მას პირდაპირ ჩავაშენებ მთავარ გვერდზე და კონფერენციის ჰედერში!
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
