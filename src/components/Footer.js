'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en';
import ka from '../locales/ka';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
    const pathname = usePathname();
    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;

    const isAdmin = pathname === '/admin' || pathname?.startsWith('/admin/');
    if (isAdmin) {
        return null;
    }

    return (
        <footer className="bg-[#2e0d42] border-t border-white/10 pt-8 pb-10 text-white transition-all duration-300 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AD49E1] via-[#EBD3F8] to-[#AD49E1]"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-blob-slow pointer-events-none"></div>
            <div className="absolute top-20 -left-20 w-72 h-72 bg-[#AD49E1]/20 rounded-full blur-3xl animate-float-blob-reverse pointer-events-none"></div>

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand & Info Section (Spans 4 columns) */}
                    <ScrollReveal className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 transform hover:scale-105 flex-shrink-0 bg-white/10 rounded-2xl p-2 border border-white/20 relative">
                                <Image src="/logo.png" alt="IICE Logo" width={64} height={64} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="text-lg md:text-xl font-black tracking-tight text-white mb-0.5 md:mb-1">{t.footer.tsuAgladze}</h2>
                                <h3 className="text-xs md:text-sm font-medium text-white/80">{t.footer.instituteTitleHead}</h3>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 font-medium text-white/80 max-w-sm">
                            {t.footer.description || 'რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი'}
                        </p>
                    </ScrollReveal>

                    {/* About Us (Spans 2 columns) */}
                    <ScrollReveal delay={100} className="lg:col-span-2">
                        <h3 className="text-sm md:text-base font-black uppercase tracking-widest mb-4 md:mb-6 text-white border-b-2 border-white/30 inline-block pb-2 hover:border-white transition-colors duration-300">
                            {t.footer.instituteMenuTitle}
                        </h3>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base font-bold text-white">
                            <li><Link href="/history" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.history}</Link></li>
                            <li><Link href="/mission" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.mission}</Link></li>
                            <li><Link href="/statute" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.statute}</Link></li>
                        </ul>
                    </ScrollReveal>

                    {/* Academic & Research (Spans 3 columns) */}
                    <ScrollReveal delay={200} className="lg:col-span-3">
                        <h3 className="text-sm md:text-base font-black uppercase tracking-widest mb-4 md:mb-6 text-white border-b-2 border-white/30 inline-block pb-2 hover:border-white transition-colors duration-300">
                            {t.footer.academicMenuTitle}
                        </h3>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base font-bold text-white">
                            <li><Link href="/departments" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.departments}</Link></li>
                            <li><Link href="/scientific-council" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.scientificCouncil}</Link></li>
                            <li><Link href="/reports" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.scientificReports}</Link></li>
                            <li><Link href="/important-projects" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.importantProjects}</Link></li>
                            <li><Link href="/news" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>{t.nav.news}</Link></li>
                        </ul>
                    </ScrollReveal>

                    {/* Contact (Spans 3 columns) */}
                    <ScrollReveal delay={300} className="lg:col-span-3">
                        <h3 className="text-sm md:text-base font-black uppercase tracking-widest mb-4 md:mb-6 text-white border-b-2 border-white/30 inline-block pb-2 hover:border-white transition-colors duration-300">
                            {t.footer.contactMenuTitle}
                        </h3>
                        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-white font-bold">
                            <li className="flex items-start gap-3 md:gap-4 text-sm md:text-base hover:text-white/80 group">
                                <span className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD49E1] transition-colors text-white">
                                    <MapPin aria-hidden="true" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EBD3F8]" />
                                </span>
                                <div className="pt-0.5 md:pt-1 leading-relaxed whitespace-pre-line text-xs md:text-sm">{t.footer.address}</div>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 text-sm md:text-base hover:text-white/80 group">
                                <span className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD49E1] transition-colors text-white">
                                    <Phone aria-hidden="true" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EBD3F8]" />
                                </span>
                                <a href="tel:+995322123456" className="hover:text-white transition-colors font-bold text-xs md:text-sm">+(995 32) 212 34 56</a>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 text-sm md:text-base hover:text-white/80 group">
                                <span className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD49E1] transition-colors text-white">
                                    <Mail aria-hidden="true" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EBD3F8]" />
                                </span>
                                <a href="mailto:info@iice.ge" className="hover:text-white transition-colors font-bold text-xs md:text-sm">info@iice.ge</a>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 text-sm md:text-base hover:text-white/80 group">
                                <span className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD49E1] transition-colors text-white">
                                    <Lock aria-hidden="true" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EBD3F8]" />
                                </span>
                                <a href="https://mail.iice.ge:2096" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-bold text-xs md:text-sm">
                                    {language === 'en' ? 'Staff Webmail' : 'კორპორატიული ფოსტა'}
                                </a>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-[#AD49E1] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20 shadow-sm">
                                {t.footer.sendMessage}
                            </Link>
                        </div>
                    </ScrollReveal>

                </div>

                <div className="border-t border-white/10 pt-8 pb-4 flex flex-col justify-center items-center gap-4 text-xs font-medium text-white/70 text-center">
                    <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
