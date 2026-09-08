'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { 
    FileText, 
    Download, 
    Calendar, 
    MapPin, 
    Image as ImageIcon, 
    Presentation,
    Award,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Building2
} from 'lucide-react';

export default function Conference2016() {
    const { language } = useLanguage();
    const isEn = language === 'en';
    const [activeTab, setActiveTab] = useState('materials');
    const tabsContainerRef = useRef(null);

    const scrollTabs = (direction) => {
        if (tabsContainerRef.current) {
            tabsContainerRef.current.scrollBy({
                left: direction === 'left' ? -240 : 240,
                behavior: 'smooth'
            });
        }
    };

    const translations = {
        ka: {
            badge: "I საერთაშორისო სამეცნიერო კონფერენცია 2016",
            title: "საერთაშორისო სამეცნიერო კონფერენცია",
            subtitle: "თანამედროვე კვლევები და მათი გამოყენების პერსპექტივები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში",
            description: "კონფერენცია ეძღვნება რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის 60 წლისთავს.",
            date: "21-23 სექტემბერი, 2016",
            location: "ურეკი, საქართველო",
            tabs: {
                materials: "გამოცემები და კრებულები",
                documents: "ოფიციალური მასალები",
                photos: "ფოტოარქივი",
                presentation: "პრეზენტაცია",
                venue: "ლოკაცია"
            },
            materials: "კონფერენციის მასალები და გამოცემები",
            documents: "დამატებითი მასალები და პროგრამა",
            photos: "ფოტო მასალა",
            presentation: "პრეზენტაცია",
            program: "კონფერენციის პროგრამა",
            circular: "ცირკულარი",
            tezis: "თეზისები",
            venueTitle: "ჩატარების ადგილი",
            venueDesc: "კონფერენცია ჩატარდა საკურორტო დაბა ურეკში (შავი ზღვის სანაპირო, საქართველო)."
        },
        en: {
            badge: "1st International Scientific Conference 2016",
            title: "International Scientific Conference",
            subtitle: "Modern researches and prospects of their use in chemistry, chemical engineering and related fields",
            description: "The conference is dedicated to the 60th anniversary of R. Agladze Institute of Inorganic Chemistry and Electrochemistry.",
            date: "September 21-23, 2016",
            location: "Ureki, Georgia",
            tabs: {
                materials: "Materials & Publications",
                documents: "Official Documents",
                photos: "Photo Archive",
                presentation: "Presentation",
                venue: "Venue"
            },
            materials: "Conference Materials and Publications",
            documents: "Additional Materials & Program",
            photos: "Photo Materials",
            presentation: "Presentation",
            program: "Conference Program",
            circular: "Circular",
            tezis: "Theses",
            venueTitle: "Venue & Location",
            venueDesc: "The conference was held in the coastal resort town of Ureki, Black Sea coast, Georgia."
        }
    };

    const t = isEn ? translations.en : translations.ka;

    return (
        <div className="bg-slate-50 min-h-screen pb-16 w-full overflow-hidden flex flex-col">
            {/* Hero Header Section - Matching Royal Purple Gradient & Badges */}
            <div className="relative bg-gradient-to-b from-[#180327] via-[#2f0d46] to-[#1c062c] text-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 shadow-xl overflow-hidden w-full flex-shrink-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(173,73,225,0.18),transparent_70%)] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-purple-500/25 to-amber-500/25 text-amber-200 border border-amber-400/35 mb-3 backdrop-blur-md shadow-xs">
                        <span>{t.badge}</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3.5 leading-snug tracking-tight max-w-4xl mx-auto drop-shadow-xs">
                        {t.title}
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg font-semibold text-purple-100 max-w-3xl mx-auto mb-4 leading-relaxed">
                        {t.subtitle}
                    </p>

                    {/* 60 Years Commemorative Banner */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 text-amber-200 py-2 px-4 rounded-xl border border-amber-300/30 shadow-xs mb-5 max-w-3xl backdrop-blur-md">
                        <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-amber-100 leading-snug">
                            {t.description}
                        </span>
                    </div>

                    {/* Dates & Venues Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold">
                        <div className="flex items-center gap-1.5 bg-white/10 text-white px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/15 shadow-xs">
                            <Calendar className="w-4 h-4 text-amber-300" />
                            <span>{t.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 text-white px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/15 shadow-xs">
                            <MapPin className="w-4 h-4 text-amber-300" />
                            <span>{t.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Navigation Tabs with Chevron Scroll */}
            <div id="tabs-navigation" className="sticky top-16 xl:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
                <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center relative py-2">
                    <button
                        type="button"
                        onClick={() => scrollTabs('left')}
                        className="p-1.5 sm:p-2 rounded-xl bg-purple-50 hover:bg-[#60318e] text-[#60318e] hover:text-white transition-colors flex-shrink-0 cursor-pointer shadow-xs mr-1 flex items-center justify-center border border-purple-100"
                        aria-label="Scroll Tabs Left"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div
                        ref={tabsContainerRef}
                        className="flex space-x-1 sm:space-x-2 py-1 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth flex-grow justify-start md:justify-center"
                    >
                        {Object.entries(t.tabs).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 interactive-tap ${
                                    activeTab === key
                                        ? 'bg-[#60318e] text-white shadow-md font-extrabold'
                                        : 'text-slate-600 hover:text-[#60318e] hover:bg-purple-50/60'
                                }`}
                            >
                                {key === 'materials' && <FileText className="w-3.5 h-3.5" />}
                                {key === 'documents' && <BookOpen className="w-3.5 h-3.5" />}
                                {key === 'photos' && <ImageIcon className="w-3.5 h-3.5" />}
                                {key === 'presentation' && <Presentation className="w-3.5 h-3.5" />}
                                {key === 'venue' && <MapPin className="w-3.5 h-3.5" />}
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollTabs('right')}
                        className="p-1.5 sm:p-2 rounded-xl bg-purple-50 hover:bg-[#60318e] text-[#60318e] hover:text-white transition-colors flex-shrink-0 cursor-pointer shadow-xs ml-1 flex items-center justify-center border border-purple-100"
                        aria-label="Scroll Tabs Right"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100">
                    
                    {/* Tab 1: Books & Publications */}
                    {activeTab === 'materials' && (
                        <div className="space-y-12 animate-fade-in text-center">
                            <div className="flex flex-col items-center justify-center gap-3 border-b pb-6">
                                <FileText className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e]">
                                    {t.materials}
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                                {/* Book 1 */}
                                <a 
                                    href="/conference-2016/chemical-series-volume-42-3.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <div className="w-full max-w-[280px] aspect-[1/1.4] rounded-lg overflow-hidden shadow-md mb-6 relative bg-white">
                                        <img 
                                            src="/conference-2016/chemical-series-volume-42-3.jpg" 
                                            alt="Chemical Series Volume 42-3"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-[#60318e] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/90 rounded-full p-4 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                                <Download size={20} className="text-[#60318e]" />
                                                <span className="font-bold text-[#60318e] text-sm hidden group-hover:block px-2">PDF</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-[#AD49E1] transition-colors line-clamp-2">
                                        Chemical Series Volume 42-3
                                    </h3>
                                </a>

                                {/* Book 2 */}
                                <a 
                                    href="/conference-2016/chemical-series-volume-42-4.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <div className="w-full max-w-[280px] aspect-[1/1.4] rounded-lg overflow-hidden shadow-md mb-6 relative bg-white">
                                        <img 
                                            src="/conference-2016/chemical-series-volume-42-4.jpg" 
                                            alt="Chemical Series Volume 42-4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-[#60318e] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/90 rounded-full p-4 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                                <Download size={20} className="text-[#60318e]" />
                                                <span className="font-bold text-[#60318e] text-sm hidden group-hover:block px-2">PDF</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-[#AD49E1] transition-colors line-clamp-2">
                                        Chemical Series Volume 42-4
                                    </h3>
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Documents & Circulars */}
                    {activeTab === 'documents' && (
                        <div className="space-y-8 animate-fade-in text-center">
                            <div className="flex flex-col items-center justify-center gap-3 border-b pb-6">
                                <BookOpen className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e]">
                                    {t.documents}
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left max-w-4xl mx-auto">
                                {[
                                    { file: "21-22-23 september programm 070916.pdf", title: t.program, icon: <Calendar size={24} /> },
                                    { file: "CIRKULAR6.docx", title: t.circular, icon: <FileText size={24} /> },
                                ].map((doc, idx) => (
                                    <a 
                                        key={idx}
                                        href={`/conference-2016/${doc.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 hover:shadow-md transition-all group relative overflow-hidden"
                                    >
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#AD49E1] shadow-sm group-hover:scale-110 group-hover:bg-[#AD49E1] group-hover:text-white transition-all z-10 flex-shrink-0 font-bold text-xs">
                                            {doc.file.split('.').pop().toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0 z-10">
                                            <h4 className="font-bold text-gray-800 text-sm truncate group-hover:text-[#60318e] transition-colors">
                                                {doc.title}
                                            </h4>
                                            <div className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${doc.file.endsWith('.pdf') ? 'text-red-500' : 'text-blue-500'}`}>
                                                {doc.file.split('.').pop().toUpperCase()} FILE
                                            </div>
                                        </div>
                                        <Download size={18} className="text-[#AD49E1] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all z-10 flex-shrink-0"/>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Photos */}
                    {activeTab === 'photos' && (
                        <div className="space-y-8 animate-fade-in text-center">
                            <div className="flex flex-col items-center justify-center gap-3 border-b pb-6">
                                <ImageIcon className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e]">
                                    {t.photos}
                                </h2>
                            </div>

                            <div className="max-w-xl mx-auto">
                                <a 
                                    href="/conference-2016/photos-ureki-13.11.16-2.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/60 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#AD49E1] shadow-sm group-hover:scale-105 group-hover:bg-[#AD49E1] group-hover:text-white transition-all">
                                        <ImageIcon size={26} />
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <h4 className="font-bold text-slate-900 text-base group-hover:text-[#60318e] transition-colors">
                                            {t.photos} (PDF)
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Ureki Conference Archive Photos</p>
                                    </div>
                                    <Download size={20} className="text-[#AD49E1] flex-shrink-0" />
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Presentations */}
                    {activeTab === 'presentation' && (
                        <div className="space-y-8 animate-fade-in text-center">
                            <div className="flex flex-col items-center justify-center gap-3 border-b pb-6">
                                <Presentation className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e]">
                                    {t.presentation}
                                </h2>
                            </div>

                            <div className="max-w-xl mx-auto">
                                <a 
                                    href="/conference-2016/prez.- konferencia.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/60 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#AD49E1] shadow-sm group-hover:scale-105 group-hover:bg-[#AD49E1] group-hover:text-white transition-all">
                                        <Presentation size={26} />
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <h4 className="font-bold text-slate-900 text-base group-hover:text-[#60318e] transition-colors">
                                            {t.presentation} (PDF)
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Scientific Presentations & Slides</p>
                                    </div>
                                    <Download size={20} className="text-[#AD49E1] flex-shrink-0" />
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Tab 5: Venue */}
                    {activeTab === 'venue' && (
                        <div className="space-y-8 animate-fade-in text-left max-w-3xl mx-auto">
                            <div className="flex flex-col items-center justify-center gap-3 border-b pb-6 text-center">
                                <MapPin className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e]">
                                    {t.venueTitle}
                                </h2>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                <h4 className="font-bold text-base text-[#60318e] uppercase flex items-center gap-2">
                                    <MapPin size={18} className="text-[#AD49E1]" />
                                    <span>{t.location}</span>
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {t.venueDesc}
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
