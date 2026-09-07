'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Download, ExternalLink, Check } from 'lucide-react';

const VERSIONS = [
    {
        id: 'v1-geo',
        titleKa: 'ვერსია 1A: სუფთა აკადემიური მედალიონი — ქართული („იიცე“)',
        titleEn: 'Version 1A: Clean Academic Ring — Georgian ("იიცე")',
        badgeKa: 'რეკომენდებული #1 • სუფთა წრე',
        badgeEn: 'RECOMMENDED #1 • CLEAN CIRCLE',
        descKa: 'სრულიად თავისუფალი ყოველგვარი გადამფარავი ორბიტებისა და თავთავებისგან. "0"-ის შიგნით ინსტიტუტის რეალური შენობა და ნაძვები, ზემოთ "იიცე", ქვემოთ "1956 — 2026", ლენტზე "70 წლის იუბილე".',
        descEn: 'Completely free of overlapping orbits and wheat. Authentic building with pine trees inside the "0", "იიცე" at top, "1956 — 2026" at bottom, and Georgian ribbon.',
        imgSrc: '/conference-2026/iice-70-clean-geo.png',
        downloadName: 'iice-70-clean-geo.png',
        lang: 'ka'
    },
    {
        id: 'v1-eng',
        titleKa: 'ვერსია 1B: სუფთა აკადემიური მედალიონი — ინგლისური („IICE“)',
        titleEn: 'Version 1B: Clean Academic Ring — English ("IICE")',
        badgeKa: 'საერთაშორისო ვერსია • სუფთა წრე',
        badgeEn: 'INTERNATIONAL • CLEAN CIRCLE',
        descKa: 'ინგლისურენოვანი ოფიციალური საიუბილეო ემბლემა: ზემოთ "IICE" (თსუ-ს გარეშე), ქვემოთ "1956 — 2026", ლენტზე "70 YEARS ANNIVERSARY". სუფთა, სიმეტრიული და დახვეწილი.',
        descEn: 'Official international jubilee emblem: "IICE" at top (no TSU), "1956 — 2026" at bottom, and "70 YEARS ANNIVERSARY" ribbon. Symmetrical and pristine.',
        imgSrc: '/conference-2026/iice-70-clean-eng.png',
        downloadName: 'iice-70-clean-eng.png',
        lang: 'en'
    },
    {
        id: 'v2-curve',
        titleKa: 'ვერსია 2: ინსტიტუტის ელექტროქიმიური ვოლტამპეროგრამით',
        titleEn: 'Version 2: Electrochemical Voltammetry Curve Edition',
        badgeKa: 'სამეცნიერო იდენტობა • აგლაძის სკოლა',
        badgeEn: 'SCIENTIFIC IDENTITY • VOLTAMMETRY',
        descKa: 'იგივე სუფთა წრიული სილუეტი, სადაც შენობის თავზე ცაში ნაზად არის ინტეგრირებული ინსტიტუტის ოფიციალური ლოგოს ციკლური ვოლტამპეროგრამა (გადამფარავი ორბიტების გარეშე).',
        descEn: 'Clean circular silhouette subtly integrating the official cyclic voltammetry curve in the sky above the building, with zero overlapping orbits.',
        imgSrc: '/conference-2026/iice-70-clean-curve.png',
        downloadName: 'iice-70-clean-curve.png',
        lang: 'en'
    },
    {
        id: 'v1-stars',
        titleKa: 'ვერსია 1C: აკადემიური რკალი ოქროს საიუბილეო ვარსკვლავებით',
        titleEn: 'Version 1C: Academic Ring with Jubilee Stars',
        badgeKa: 'აკადემიური პრესტიჟი • ვარსკვლავები',
        badgeEn: 'ACADEMIC PRESTIGE • STARS',
        descKa: 'რკალის გასწვრივ ჩამწკრივებული ნაზი ოქროსფერი ვარსკვლავები, რაც ხაზს უსვამს ინსტიტუტის 70-წლიან უწყვეტ სამეცნიერო წარმატებას.',
        descEn: 'Delicate gold stars aligned along the inner rim celebrating 70 years of continuous scientific excellence.',
        imgSrc: '/conference-2026/iice-70-clean-stars.png',
        downloadName: 'iice-70-clean-stars.png',
        lang: 'en'
    }
];

export default function LogoPreviewPage() {
    const [selectedId, setSelectedId] = useState('v1-geo');
    const [bgPreview, setBgPreview] = useState('white');

    const active = VERSIONS.find(v => v.id === selectedId) || VERSIONS[0];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white/95 border-b border-purple-100 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/" 
                            className="p-2 rounded-xl flex items-center gap-2 text-xs font-bold text-[#60318e] hover:bg-purple-50 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>მთავარზე დაბრუნება</span>
                        </Link>
                        <div className="h-4 w-px bg-purple-200 hidden sm:block"></div>
                        <span className="text-xs font-black uppercase tracking-wider text-[#AD49E1] hidden sm:inline">
                            IICE 70th Anniversary Logo Options
                        </span>
                    </div>

                    {/* Background Surface Preview Toggles */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 hidden md:inline">ფონი:</span>
                        <div className="flex items-center border border-purple-200 bg-purple-50/50 rounded-xl p-0.5">
                            <button
                                onClick={() => setBgPreview('white')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    bgPreview === 'white' ? 'bg-white text-[#60318e] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                თეთრი
                            </button>
                            <button
                                onClick={() => setBgPreview('slate')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    bgPreview === 'slate' ? 'bg-white text-[#60318e] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                ნაცრისფერი
                            </button>
                            <button
                                onClick={() => setBgPreview('pattern')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    bgPreview === 'pattern' ? 'bg-white text-[#60318e] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                ბადე
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Stage */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Intro Title */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#60318e] text-xs font-black uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>ახალი დახვეწილი ვერსიები • ორბიტების გარეშე</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        საიუბილეო ლოგოს ახალი ვარიანტები
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        გადამფარავი ქიმიური ორბიტებისა და თავთავის გარეშე. სუფთა წრიული აკადემიური მედალიონი, რეალური შენობა და ნაძვები.
                    </p>
                </div>

                {/* Quick Switch Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    {VERSIONS.map((v) => {
                        const isSel = v.id === selectedId;
                        return (
                            <button
                                key={`btn-${v.id}`}
                                onClick={() => setSelectedId(v.id)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border flex items-center gap-2 ${
                                    isSel
                                        ? 'bg-[#60318e] text-white border-[#60318e] shadow-lg shadow-purple-900/20 scale-105'
                                        : 'bg-white hover:bg-purple-50 text-slate-700 border-purple-200 shadow-xs'
                                }`}
                            >
                                {isSel && <Check className="w-3.5 h-3.5 text-amber-300" />}
                                <span>{v.titleKa.split(':')[0]}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Big Active Showcase Card */}
                <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden mb-12">
                    {/* Top Info Bar */}
                    <div className="p-6 pb-2 sm:px-10 flex flex-wrap items-center justify-between gap-3 border-b border-purple-50">
                        <div>
                            <span className="inline-block text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider bg-amber-400 text-slate-950 mb-1">
                                {active.badgeKa}
                            </span>
                            <h2 className="text-lg sm:text-2xl font-black text-slate-900">
                                {active.titleKa}
                            </h2>
                            <p className="text-xs text-slate-500 mt-1 max-w-xl">
                                {active.descKa}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href={active.imgSrc}
                                download={active.downloadName}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md hover:scale-105 transition-all"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>გადმოწერა (გამჭვირვალე PNG)</span>
                            </a>
                            <a
                                href={active.imgSrc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl border border-purple-200 text-[#60318e] hover:bg-purple-50 transition-all"
                                title="გახსნა სრული ზომით"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Emblem Showcase Area */}
                    <div className={`relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center p-8 transition-colors duration-300 ${
                        bgPreview === 'white' 
                            ? 'bg-white' 
                            : bgPreview === 'slate' 
                                ? 'bg-slate-100' 
                                : 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50'
                    }`}>
                        <div className="group relative max-w-md sm:max-w-lg w-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
                            <img
                                src={active.imgSrc}
                                alt={active.titleKa}
                                className="w-full h-auto max-h-[420px] object-contain filter drop-shadow-xl select-none"
                            />
                        </div>
                    </div>

                    {/* Official Dedication Text */}
                    <div className="p-6 sm:p-8 bg-purple-50/50 border-t border-purple-100 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-200 text-[#60318e] text-[11px] font-black uppercase tracking-wider mb-4 shadow-xs">
                            <span>📜 ოფიციალური საიუბილეო მიძღვნის ტექსტი</span>
                        </div>

                        {active.lang === 'ka' ? (
                            <div className="space-y-1">
                                <p className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-[#60318e]">
                                    ეძღვნება რაფიელ აგლაძის სახელობის
                                </p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800">
                                    არაორგანული ქიმიისა და ელექტროქიმიის
                                </p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800">
                                    ინსტიტუტის დაარსების 70 წლისთავს
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <p className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-[#60318e]">
                                    Dedicated to the 70th Anniversary of
                                </p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800">
                                    Rafiel Agladze Institute of
                                </p>
                                <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800">
                                    Inorganic Chemistry and Electrochemistry
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comparison Grid */}
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                            ყველა ახალი ვერსიის შედარება
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            დააკლიკეთ ნებისმიერ ბარათს ზედა დიდ ეკრანზე სანახავად
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VERSIONS.map((v) => {
                            const isSel = v.id === selectedId;
                            return (
                                <div
                                    key={`card-${v.id}`}
                                    onClick={() => {
                                        setSelectedId(v.id);
                                        window.scrollTo({ top: 180, behavior: 'smooth' });
                                    }}
                                    className={`bg-white rounded-2xl p-4 border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                                        isSel
                                            ? 'ring-2 ring-[#60318e] border-[#60318e] shadow-xl scale-[1.02]'
                                            : 'border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                                isSel ? 'bg-[#60318e] text-white' : 'bg-purple-100 text-[#60318e]'
                                            }`}>
                                                {v.badgeKa.split('•')[0]}
                                            </span>
                                            {isSel && <Check className="w-4 h-4 text-[#60318e]" />}
                                        </div>
                                        <h3 className="font-bold text-xs leading-snug group-hover:text-[#60318e] transition-colors">
                                            {v.titleKa}
                                        </h3>
                                    </div>

                                    {/* Preview Image */}
                                    <div className="relative w-full h-[180px] my-3 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-3 border border-slate-100">
                                        <img
                                            src={v.imgSrc}
                                            alt={v.titleKa}
                                            className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Card Footer */}
                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-[#60318e]">
                                            {isSel ? '✓ აქტიური' : 'არჩევა ↑'}
                                        </span>
                                        <a
                                            href={v.imgSrc}
                                            download={v.downloadName}
                                            onClick={(e) => e.stopPropagation()}
                                            title="ჩამოტვირთვა"
                                            className="p-1 rounded-md text-slate-400 hover:text-[#60318e] hover:bg-purple-50 transition-all"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Decision / Next Steps Box */}
                <div className="mt-16 p-8 rounded-3xl text-center bg-gradient-to-r from-[#60318e] to-[#7A1CAC] text-white shadow-xl">
                    <h3 className="text-xl sm:text-2xl font-black mb-2">
                        რომელი ვერსია დავაყენოთ საიტზე?
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto mb-6">
                        მითხარით სასურველი ვარიანტი (მაგ. ვერსია 1A ქართული თუ 1B ინგლისური) და მე მას დაუყოვნებლივ ჩავაშენებ მთავარ გვერდზე და კონფერენციის ჰედერში!
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
