'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en';
import ka from '../locales/ka';

export default function Header() {
    const { language, toggleLanguage } = useLanguage();
    const t = language === 'en' ? en : ka;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileDropdowns, setOpenMobileDropdowns] = useState({});

    const toggleMobileDropdown = (menu) => {
        setOpenMobileDropdowns(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        /* 
           ფერის შეცვლა: bg-[#2e0d42] (უფრო მუქი იასამნისფერი)
        */
        <header className="bg-[#2e0d42] shadow-lg sticky top-0 z-50 mb-3 transition-all duration-300">
            <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* 
                   ზომის აწევა/დაწევა (სიმაღლე): h-20 
                   თუ გსურთ უფრო ვიწრო, ჩაწერეთ h-16, თუ განიერი - h-24  
                */}
                <div className="flex justify-between lg:grid lg:grid-cols-[240px_1fr_100px] xl:grid-cols-[280px_1fr_120px] items-center h-22 gap-2 xl:gap-4">
                    {/* Logo Segment */}
                    <div className="flex items-center animate-fade-in-up">
                        <Link href="/" className="flex items-center gap-2 xl:gap-3 group">
                            {/* Site Logo */}
                            <div className="w-10 h-10 xl:w-14 xl:h-14 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 flex-shrink-0">
                                <img src="/iice-website/logo.png" alt="IICE Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="hidden sm:block transition-all duration-300 transform group-hover:translate-x-1">
                                <h1 className="font-bold text-xs lg:text-sm xl:text-base text-white leading-tight" style={{ color: '#ffffff' }}>TSU R.Agladze Institute</h1>
                                <p className="text-[9px] lg:text-[10px] xl:text-xs text-white truncate whitespace-normal" style={{ color: '#ffffff', opacity: 0.9 }}>of Inorganic Chemistry and Electrochemistry</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex justify-center space-x-1 xl:space-x-3 items-center whitespace-nowrap px-1">
                        <Link href="/" className="text-white hover:text-white/80 px-2 py-2 rounded-md text-sm xl:text-base font-bold transition-colors hover:bg-white/10">
                            {t.nav.home}
                        </Link>

                        {/* About Us Menu */}
                        <div className="relative group">
                            <button className="text-white hover:text-white/80 px-2 py-2 rounded-md text-sm xl:text-base font-bold transition-colors hover:bg-white/10 inline-flex items-center">
                                {t.nav.about}
                                <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top border-t-4 border-[#7A1CAC] flex flex-col pt-2 pb-2 z-50">
                                <Link href="/history" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.history}</Link>
                                <Link href="/mission" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.mission}</Link>
                                <div className="px-4 py-2 text-sm font-bold text-gray-800 mt-1 cursor-default">{t.nav.structure}</div>
                                <Link href="/administration" className="px-4 py-1.5 text-xs text-gray-600 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors ml-4 border-l-2 border-purple-100">{t.nav.administration}</Link>
                                <Link href="/scientific-council" className="px-4 py-1.5 text-xs text-gray-600 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors ml-4 border-l-2 border-purple-100 mb-1">{t.nav.scientificCouncil}</Link>
                                <Link href="/statute" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.statute}</Link>
                                <Link href="/reports" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.scientificReports}</Link>
                                <Link href="/studies-internships" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.studiesInternships}</Link>
                                <Link href="/important-projects" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.importantProjects}</Link>
                                <Link href="/collaboration" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.collaboration}</Link>
                            </div>
                        </div>

                        <Link href="/departments" className="text-white hover:text-white/80 px-2 py-2 rounded-md text-sm xl:text-base font-bold transition-colors hover:bg-white/10">
                            {t.nav.departments}
                        </Link>

                        {/* Events Menu */}
                        <div className="relative group">
                            <button className="text-white hover:text-white/80 px-2 py-2 rounded-md text-sm xl:text-base font-bold transition-colors hover:bg-white/10 inline-flex items-center">
                                {t.nav.events}
                                <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top flex flex-col pt-2 pb-2 border-t-4 border-[#7A1CAC] z-50">
                                <Link href="/events/seminars" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.seminars}</Link>
                                <div className="px-4 py-2 text-sm font-bold text-gray-800 border-t border-purple-50 mt-1">{t.nav.conference}</div>
                                <a href="https://conference23iice.ge/" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 text-xs text-gray-600 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors ml-4 border-l-2 border-purple-100 flex items-center justify-between">
                                    <span>2023</span>
                                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                                <Link href="/events/conference-2016" className="px-4 py-1.5 text-xs text-gray-600 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors ml-4 border-l-2 border-purple-100 mb-1">2016</Link>
                            </div>
                        </div>

                        <Link href="/infrastructure" className="text-white hover:text-white/80 px-2 py-2 rounded-md text-sm xl:text-base font-bold transition-colors hover:bg-white/10">
                            {t.nav.infrastructure}
                        </Link>

                        <Link href="/news" className="text-white hover:text-white/80 px-2 py-2 rounded-md text-sm xl:text-base font-bold transition-colors hover:bg-white/10">
                            {t.nav.news}
                        </Link>

                        <Link href="/contact" className="text-white hover:text-white/80 px-2 py-2 rounded-md text-sm xl:text-base font-bold transition-colors hover:bg-white/10">
                            {t.nav.contact}
                        </Link>
                    </nav>

                    {/* Utils (Lang Switcher & Mobile Menu Toggle) */}
                    <div className="flex justify-end items-center space-x-1 xl:space-x-2 animate-fade-in-up">
                        {/* Language Switcher - visible on both mobile and desktop inline with the header */}
                        <div className="flex items-center border border-white/20 bg-white/10 rounded-full p-1 shadow-inner w-[60px] xl:w-[68px] justify-between flex-shrink-0 mr-1 lg:mr-0 lg:ml-1">
                            <button
                                onClick={() => toggleLanguage('ka')}
                                className={`w-7 h-7 xl:w-8 xl:h-8 flex items-center justify-center rounded-full text-[10px] xl:text-xs font-bold transition-all duration-300 ${language === 'ka' ? 'bg-white text-[#60318e] shadow-md' : 'text-white/60 hover:text-white'}`}
                            >
                                GE
                            </button>
                            <button
                                onClick={() => toggleLanguage('en')}
                                className={`w-7 h-7 xl:w-8 xl:h-8 flex items-center justify-center rounded-full text-[10px] xl:text-xs font-bold transition-all duration-300 ${language === 'en' ? 'bg-white text-[#60318e] shadow-md' : 'text-white/60 hover:text-white'}`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white hover:text-white/80 focus:outline-none p-2 rounded-md hover:bg-white/5 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-purple-100 px-4 pt-2 pb-6 shadow-inner animate-fade-in-up overflow-y-auto max-h-[75vh]">
                    <div className="space-y-1">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-sm font-medium text-text-body hover:text-primary hover:bg-slate-50">
                            {t.nav.home}
                        </Link>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <button onClick={() => toggleMobileDropdown('about')} className="w-full flex justify-between items-center px-3 py-3 font-medium text-primary focus:outline-none hover:bg-slate-50 rounded-md">
                            <span>{t.nav.about}</span>
                            <svg className={`h-5 w-5 transition-transform duration-200 ${openMobileDropdowns['about'] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdowns['about'] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="pl-6 space-y-1 pb-2 mt-1">
                                <Link href="/history" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.history}</Link>
                                <Link href="/mission" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.mission}</Link>

                                <button onClick={() => toggleMobileDropdown('structure')} className="w-full flex justify-between items-center px-3 py-2 mt-1 rounded-md text-sm font-bold text-text-body hover:text-primary hover:bg-slate-50 focus:outline-none">
                                    <span>{t.nav.structure}</span>
                                    <svg className={`h-4 w-4 transition-transform duration-200 ${openMobileDropdowns['structure'] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdowns['structure'] ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-4 space-y-1 border-l-2 border-purple-100 ml-3 mb-2 mt-1">
                                        <Link href="/administration" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.administration}</Link>
                                        <Link href="/scientific-council" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.scientificCouncil}</Link>
                                    </div>
                                </div>

                                <Link href="/statute" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.statute}</Link>
                                <Link href="/reports" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.scientificReports}</Link>
                                <Link href="/studies-internships" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.studiesInternships}</Link>
                                <Link href="/important-projects" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.importantProjects}</Link>
                                <Link href="/collaboration" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.collaboration}</Link>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1 mt-2 pt-2 border-t border-gray-100">
                        <Link href="/departments" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-sm font-medium text-text-body hover:text-primary hover:bg-slate-50">
                            {t.nav.departments}
                        </Link>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <button onClick={() => toggleMobileDropdown('events')} className="w-full flex justify-between items-center px-3 py-3 font-medium text-primary focus:outline-none hover:bg-slate-50 rounded-md">
                            <span>{t.nav.events}</span>
                            <svg className={`h-5 w-5 transition-transform duration-200 ${openMobileDropdowns['events'] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdowns['events'] ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="pl-6 space-y-1 pb-2 mt-1">
                                <Link href="/events/seminars" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm text-text-body hover:text-primary hover:bg-slate-50">{t.nav.seminars}</Link>
                                <div className="px-3 py-2 text-sm font-bold text-text-body border-t border-gray-100 mt-1">{t.nav.conference}</div>
                                <div className="pl-4 border-l-2 border-purple-100 ml-3 mb-2 space-y-1">
                                    <a href="https://conference23iice.ge/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-1.5 text-sm text-text-body hover:text-primary hover:bg-slate-50">
                                        <span>2023</span>
                                        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                    <Link href="/events/conference-2016" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-1.5 text-sm text-text-body hover:text-primary hover:bg-slate-50">2016</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1 mt-2 pt-2 border-t border-gray-100">
                        <Link href="/infrastructure" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-sm font-medium text-text-body hover:text-primary hover:bg-slate-50">
                            {t.nav.infrastructure}
                        </Link>
                        <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-sm font-medium text-text-body hover:text-primary hover:bg-slate-50">
                            {t.nav.news}
                        </Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-sm font-medium text-text-body hover:text-primary hover:bg-slate-50">
                            {t.nav.contact}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
