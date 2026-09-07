'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en';
import ka from '../locales/ka';
import { Menu, X, ChevronDown } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function Header() {
    const { language, toggleLanguage } = useLanguage();
    const t = language === 'en' ? en : ka;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileDropdowns, setOpenMobileDropdowns] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);


    const isAboutActive = ['/history', '/mission', '/administration', '/scientific-council', '/statute', '/reports', '/studies-internships', '/important-projects', '/collaboration'].some(p => pathname === p);
    const isEventsActive = ['/events/conference-2023', '/events/conference-2016'].some(p => pathname === p || pathname.startsWith('/events/'));

    const getLinkClass = (path) => {
        const active = path === '/' ? pathname === '/' : pathname.startsWith(path);
        return `px-2 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap interactive-tap ${
            active ? 'bg-white/20 text-[#EBD3F8] shadow-xs' : 'text-white/90 hover:text-white hover:bg-white/10'
        }`;
    };

    const getDropdownBtnClass = (isActive) => {
        return `px-2 py-1.5 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-semibold transition-all duration-200 inline-flex items-center gap-1 whitespace-nowrap interactive-tap ${
            isActive ? 'bg-white/20 text-[#EBD3F8] shadow-xs' : 'text-white/90 hover:text-white hover:bg-white/10'
        }`;
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 15);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            const originalBodyOverflow = document.body.style.overflow;
            const originalHtmlOverflow = document.documentElement.style.overflow;
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalBodyOverflow;
                document.documentElement.style.overflow = originalHtmlOverflow;
            };
        }
    }, [isMobileMenuOpen]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    // Close mobile drawer on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const toggleMobileDropdown = (menu) => {
        setOpenMobileDropdowns(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const isAdmin = pathname === '/admin' || pathname?.startsWith('/admin/');
    if (isAdmin) {
        return null;
    }

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-[#2e0d42]/95 backdrop-blur-md shadow-lg py-0 sm:py-0.5' 
                : 'bg-[#2e0d42] py-1 shadow-md'
        }`}>
            <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
                <div className={`flex justify-between items-center ${isScrolled ? 'h-16 xl:h-18' : 'h-20 xl:h-22'} gap-2 lg:gap-4 xl:gap-8 w-full transition-all duration-300`}>
                    {/* Logo Segment */}
                    <div className="flex-shrink-0 flex items-center animate-fade-in-up">
                        <Link href="/" className="flex items-center gap-2 xl:gap-3 group">
                            {/* Site Logo */}
                            <div className={`${isScrolled ? 'w-9 h-9 xl:w-11 xl:h-11' : 'w-10 h-10 xl:w-14 xl:h-14'} flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 flex-shrink-0 relative`}>
                                <Image
                                    src="/logo.png"
                                    alt="IICE Logo"
                                    width={56}
                                    height={56}
                                    priority
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="hidden sm:block lg:hidden xl:block transition-all duration-300 transform group-hover:translate-x-1">
                                <h1 className={`font-bold transition-all duration-300 ${isScrolled ? 'text-xs xl:text-xs' : 'text-xs lg:text-[10px] xl:text-sm'} text-white leading-tight`} style={{ color: '#ffffff' }}>
                                    {language === 'ka' ? 'თსუ რ. აგლაძის სახელობის' : 'TSU R. Agladze Institute'}
                                </h1>
                                <p className="text-[9px] lg:text-[8px] xl:text-[10px] text-white truncate whitespace-normal" style={{ color: '#ffffff', opacity: 0.9 }}>
                                    {language === 'ka' ? 'არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი' : 'of Inorganic Chemistry and Electrochemistry'}
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex flex-grow justify-center items-center gap-1 xl:gap-2 2xl:gap-3 px-1">
                        <Link href="/" className={getLinkClass('/')}>
                            {t.nav.home}
                        </Link>

                        {/* About Us Menu */}
                        <div className="relative group">
                            <button className={getDropdownBtnClass(isAboutActive)}>
                                {t.nav.about}
                                <svg aria-hidden="true" className="ml-1 h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top border-t-4 border-[#7A1CAC] flex flex-col pt-2 pb-2 z-50">
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

                        <Link href="/departments" className={getLinkClass('/departments')}>
                            {t.nav.departments}
                        </Link>

                        {/* Events Menu */}
                        <div className="relative group">
                            <button className={getDropdownBtnClass(isEventsActive)}>
                                {t.nav.events}
                                <svg aria-hidden="true" className="ml-1 h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top flex flex-col pt-2 pb-2 border-t-4 border-[#7A1CAC] z-50">
                                <Link href="/news?category=seminars" className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors">{t.nav.seminars}</Link>
                                <div className="px-4 py-2 text-sm font-bold text-gray-800 border-t border-purple-50 mt-1">{t.nav.conference}</div>
                                <Link href="/conference-2026" className="px-4 py-1.5 text-xs font-bold text-[#AD49E1] hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors ml-4 border-l-2 border-[#AD49E1] flex items-center justify-between">
                                    <span>2026</span>
                                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase shadow-xs">NEW</span>
                                </Link>
                                <Link href="/events/conference-2023" className="px-4 py-1.5 text-xs text-gray-600 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors ml-4 border-l-2 border-purple-100">2023</Link>
                                <Link href="/events/conference-2016" className="px-4 py-1.5 text-xs text-gray-600 hover:bg-purple-50 hover:text-[#7A1CAC] transition-colors ml-4 border-l-2 border-purple-100 mb-1">2016</Link>
                            </div>
                        </div>

                        <Link href="/infrastructure" className={getLinkClass('/infrastructure')}>
                            {t.nav.infrastructure}
                        </Link>

                        <Link href="/news" className={getLinkClass('/news')}>
                            {t.nav.news}
                        </Link>

                        <Link href="/contact" className={getLinkClass('/contact')}>
                            {t.nav.contact}
                        </Link>
                    </nav>

                    {/* Utils (Lang Switcher & Mobile Menu Toggle) */}
                    <div className="flex-shrink-0 flex items-center justify-end gap-2 xl:gap-3">
                        {/* Language Switcher */}
                        <div className="flex items-center border border-white/20 bg-white/10 rounded-full p-0.5 shadow-inner">
                            <button
                                onClick={() => toggleLanguage('ka')}
                                aria-label="ქართული ენა"
                                className={`w-7 h-7 xl:w-8 xl:h-8 flex items-center justify-center rounded-full text-[10px] xl:text-xs font-bold transition-all duration-200 interactive-tap ${
                                    language === 'ka' 
                                        ? 'bg-white text-[#60318e] shadow-sm font-black' 
                                        : 'text-white/70 hover:text-white'
                                }`}
                            >
                                GE
                            </button>
                            <button
                                onClick={() => toggleLanguage('en')}
                                aria-label="English Language"
                                className={`w-7 h-7 xl:w-8 xl:h-8 flex items-center justify-center rounded-full text-[10px] xl:text-xs font-bold transition-all duration-200 interactive-tap ${
                                    language === 'en' 
                                        ? 'bg-white text-[#60318e] shadow-sm font-black' 
                                        : 'text-white/70 hover:text-white'
                                }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            aria-label={isMobileMenuOpen ? (language === 'ka' ? "მენიუს დახურვა" : "Close menu") : (language === 'ka' ? "მენიუს გახსნა" : "Open menu")}
                            aria-expanded={isMobileMenuOpen}
                            className="lg:hidden text-white hover:text-purple-200 p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-all interactive-tap cursor-pointer"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" aria-hidden="true" />
                            ) : (
                                <Menu className="w-5 h-5" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Modern Off-Canvas Mobile Drawer (Portaled to document.body to prevent containing block & scroll bugs) ===== */}
            {mounted && isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] lg:hidden flex justify-end"
                    role="dialog"
                    aria-modal="true"
                    aria-label={language === 'ka' ? "მობილური ნავიგაციის მენიუ" : "Mobile navigation menu"}
                >
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/65 backdrop-blur-xs drawer-backdrop-enter cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Drawer Sheet */}
                    <div 
                        className="relative w-[85%] max-w-sm h-[100dvh] max-h-[100dvh] bg-white shadow-2xl flex flex-col z-10 drawer-enter border-l border-purple-100 overscroll-contain"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-5 py-4 bg-[#2e0d42] text-white border-b border-purple-900/30 flex-shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-white/10 p-1 flex items-center justify-center relative">
                                    <Image src="/logo.png" alt="IICE" width={32} height={32} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-xs text-white leading-tight">{language === 'ka' ? 'თსუ რ. აგლაძის ინსტიტუტი' : 'TSU IICE'}</h2>
                                    <p className="text-[9px] text-purple-200/80 leading-tight">{language === 'ka' ? 'არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი' : 'Agladze Institute'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="მენიუს დახურვა"
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors interactive-tap cursor-pointer"
                            >
                                <X className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Drawer Navigation Links */}
                        <div className="flex-grow overflow-y-auto px-4 py-4 space-y-1 text-sm overscroll-contain [webkit-overflow-scrolling:touch]">
                            <Link 
                                href="/" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                                    pathname === '/' ? 'bg-purple-100/80 text-[#60318e] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <span>{t.nav.home}</span>
                            </Link>

                            {/* About Us Accordion */}
                            <div className="rounded-xl overflow-hidden border border-slate-100">
                                <button
                                    onClick={() => toggleMobileDropdown('about')}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 font-medium text-slate-800 hover:bg-purple-50/50 transition-colors text-left cursor-pointer"
                                >
                                    <span className={isAboutActive ? 'text-[#60318e] font-bold' : ''}>{t.nav.about}</span>
                                    <ChevronDown aria-hidden="true" className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openMobileDropdowns['about'] ? 'rotate-180 text-[#7A1CAC]' : ''}`} />
                                </button>
                                {openMobileDropdowns['about'] && (
                                    <div className="bg-slate-50/70 px-3 py-2 space-y-1 border-t border-slate-100">
                                        <Link href="/history" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.history}
                                        </Link>
                                        <Link href="/mission" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.mission}
                                        </Link>
                                        
                                        <div className="pt-1.5 pb-1 px-3 text-[11px] font-bold text-[#60318e] uppercase tracking-wider">
                                            {t.nav.structure}
                                        </div>
                                        <Link href="/administration" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e] border-l-2 border-purple-200 ml-2">
                                            {t.nav.administration}
                                        </Link>
                                        <Link href="/scientific-council" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e] border-l-2 border-purple-200 ml-2">
                                            {t.nav.scientificCouncil}
                                        </Link>
                                        
                                        <div className="h-px bg-slate-200/50 my-1"></div>
                                        <Link href="/statute" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.statute}
                                        </Link>
                                        <Link href="/reports" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.scientificReports}
                                        </Link>
                                        <Link href="/studies-internships" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.studiesInternships}
                                        </Link>
                                        <Link href="/important-projects" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.importantProjects}
                                        </Link>
                                        <Link href="/collaboration" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.collaboration}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link 
                                href="/departments" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                                    pathname === '/departments' ? 'bg-purple-100/80 text-[#60318e] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <span>{t.nav.departments}</span>
                            </Link>

                            {/* Events Accordion */}
                            <div className="rounded-xl overflow-hidden border border-slate-100">
                                <button
                                    onClick={() => toggleMobileDropdown('events')}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 font-medium text-slate-800 hover:bg-purple-50/50 transition-colors text-left cursor-pointer"
                                >
                                    <span className={isEventsActive ? 'text-[#60318e] font-bold' : ''}>{t.nav.events}</span>
                                    <ChevronDown aria-hidden="true" className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openMobileDropdowns['events'] ? 'rotate-180 text-[#7A1CAC]' : ''}`} />
                                </button>
                                {openMobileDropdowns['events'] && (
                                    <div className="bg-slate-50/70 px-3 py-2 space-y-1 border-t border-slate-100">
                                        <Link href="/news?category=seminars" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-xs rounded-lg text-slate-600 hover:bg-purple-100 hover:text-[#60318e]">
                                            {t.nav.seminars}
                                        </Link>
                                        <div className="pt-1.5 pb-1 px-3 text-[11px] font-bold text-[#60318e] uppercase tracking-wider">
                                            {t.nav.conference}
                                        </div>
                                        <Link href="/conference-2026" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2 text-xs rounded-lg bg-purple-100/60 font-bold text-[#7A1CAC] ml-2">
                                            <span>2026</span>
                                            <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                                        </Link>
                                        <Link href="/events/conference-2023" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-1.5 text-xs rounded-lg text-slate-600 hover:bg-purple-100 ml-2">
                                            2023
                                        </Link>
                                        <Link href="/events/conference-2016" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-1.5 text-xs rounded-lg text-slate-600 hover:bg-purple-100 ml-2">
                                            2016
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link 
                                href="/infrastructure" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                                    pathname === '/infrastructure' ? 'bg-purple-100/80 text-[#60318e] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <span>{t.nav.infrastructure}</span>
                            </Link>

                            <Link 
                                href="/news" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                                    pathname === '/news' ? 'bg-purple-100/80 text-[#60318e] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <span>{t.nav.news}</span>
                            </Link>

                            <Link 
                                href="/contact" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                                    pathname === '/contact' ? 'bg-purple-100/80 text-[#60318e] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <span>{t.nav.contact}</span>
                            </Link>
                        </div>

                        {/* Drawer Bottom Actions */}
                        <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-100 bg-slate-50/90 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-semibold text-slate-500">
                                    {language === 'en' ? 'Language' : 'ენა'}:
                                </div>
                                <div className="flex items-center border border-purple-200 bg-white rounded-full p-0.5 shadow-xs">
                                    <button
                                        onClick={() => toggleLanguage('ka')}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-tap cursor-pointer ${
                                            language === 'ka' ? 'bg-[#60318e] text-white shadow-xs' : 'text-slate-600 hover:text-purple-900'
                                        }`}
                                    >
                                        ქართული
                                    </button>
                                    <button
                                        onClick={() => toggleLanguage('en')}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-tap cursor-pointer ${
                                            language === 'en' ? 'bg-[#60318e] text-white shadow-xs' : 'text-slate-600 hover:text-purple-900'
                                        }`}
                                    >
                                        English
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
}
