'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CollaborationPage() {
    const { language } = useLanguage();
    const isEn = language === 'en';
    const [selectedImage, setSelectedImage] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedImage(null);
            }
        };
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImage]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <title>{isEn ? 'Collaboration | IICE' : 'კოლაბორაცია | IICE'}</title>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] leading-tight">
                        {isEn ? 'Collaboration' : 'კოლაბორაცია'}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-8">

                    {/* Item 1: Green Hydrogen Lab */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#60318e] animate-fade-in-up">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#EBD3F8]/40 rounded-xl flex items-center justify-center text-[#60318e] border border-purple-100 shrink-0">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                    </svg>
                                </div>
                                <h3 className="text-lg md:text-xl font-extrabold text-[#60318e] uppercase leading-snug">
                                    {isEn ? 'International Green Hydrogen Laboratory' : 'საერთაშორისო მწვანე წყალბადის ლაბორატორია'}
                                </h3>
                            </div>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
                                {isEn ?
                                    "Within the framework of the bilateral agreement signed in Baku (IICE), the institute begins working on the development of an international green hydrogen laboratory. The project aims to deepen scientific collaboration and introduce innovations in the field of energy technologies." :
                                    "ბაქოში გაფორმებული ორმხრივი ხელშეკრულების ფარგლებში (IICE), ინსტიტუტი იწყებს მუშაობას საერთაშორისო მწვანე წყალბადის ლაბორატორიის განვითარებაზე. პროექტი მიზნად ისახავს სამეცნიერო თანამშრომლობის გაღრმავებას და ენერგეტიკული ტექნოლოგიების სფეროში ინოვაციების დანერგვას."
                                }
                            </p>
                        </div>

                        {/* Image Preview Container */}
                        <div className="w-full lg:w-72 shrink-0">
                            <div 
                                onClick={() => setSelectedImage({
                                    src: '/images/collaboration/green-hydrogen-lab.jpg',
                                    title: isEn ? 'Establishment of the International Green Hydrogen Laboratory' : 'საერთაშორისო მწვანე წყალბადის ლაბორატორიის დაფუძნების შეთანხმება'
                                })}
                                className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md cursor-pointer bg-slate-100 aspect-[3/4] max-h-80 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <img 
                                    src="/images/collaboration/green-hydrogen-lab.jpg" 
                                    alt={isEn ? "International Green Hydrogen Laboratory Agreement" : "საერთაშორისო მწვანე წყალბადის ლაბორატორია"}
                                    className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                    <span className="inline-flex items-center gap-2 text-white text-xs font-bold bg-[#60318e]/90 px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                        </svg>
                                        {isEn ? 'Click to Enlarge' : 'სრულად ნახვა'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2: Scientific and Technical Collaboration (Azerbaijan) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#AD49E1] animate-fade-in-up">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-[#AD49E1] border border-purple-100 shrink-0">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <h3 className="text-lg md:text-xl font-extrabold text-[#60318e] uppercase leading-snug">
                                    {isEn ? 'About Scientific and Technical Collaboration' : 'სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ'}
                                    <span className="block text-sm md:text-base font-bold text-[#AD49E1] mt-0.5">{isEn ? '(Azerbaijan)' : '(აზერბაიჯანი)'}</span>
                                </h3>
                            </div>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
                                {isEn ?
                                    "Development of scientific and technical collaboration between the Institute of Radiation Problems of the Ministry of Science and Education of the Republic of Azerbaijan and the R. Agladze Institute of Inorganic Chemistry and Electrochemistry of Tbilisi State University." :
                                    "აზერბაიჯანის რესპუბლიკის მეცნიერებისა და განათლების სამინისტროს რადიაციული პრობლემების ინსტიტუტსა და თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს შორის სამეცნიერო და ტექნიკური კოლაბორაციის განვითარება."
                                }
                            </p>
                        </div>

                        {/* Image Preview Container */}
                        <div className="w-full lg:w-72 shrink-0">
                            <div 
                                onClick={() => setSelectedImage({
                                    src: '/images/collaboration/radiation-collaboration.jpg',
                                    title: isEn ? 'Agreement on Scientific and Technical Cooperation (Azerbaijan)' : 'შეთანხმება სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ (აზერბაიჯანი)'
                                })}
                                className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md cursor-pointer bg-slate-100 aspect-[3/4] max-h-80 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <img 
                                    src="/images/collaboration/radiation-collaboration.jpg" 
                                    alt={isEn ? "Scientific and Technical Collaboration Agreement (Azerbaijan)" : "სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ (აზერბაიჯანი)"}
                                    className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                    <span className="inline-flex items-center gap-2 text-white text-xs font-bold bg-[#AD49E1]/90 px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                        </svg>
                                        {isEn ? 'Click to Enlarge' : 'სრულად ნახვა'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 3: Kazakhstan */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:shadow-md transition-shadow animate-fade-in-up">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-[#60318e] border border-slate-200 shrink-0">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-extrabold text-[#60318e] uppercase mb-4 leading-snug">
                                {isEn ? 'About Scientific and Technical Collaboration' : 'სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ'}
                                <span className="block text-sm md:text-base font-bold text-slate-500 mt-0.5">{isEn ? '(Kazakhstan)' : '(ყაზახეთი)'}</span>
                            </h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 text-justify">
                                {isEn ?
                                    "Development of scientific and technical collaboration between the International Scientific Complex 'Astana' (Kazakhstan) and the R. Agladze Institute of Inorganic Chemistry and Electrochemistry of Tbilisi State University." :
                                    "სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ საერთაშორისო სამეცნიერო კომპლექსი „ასტანა“ (ყაზახეთი) და თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს შორის სამეცნიერო და ტექნიკური კოლაბორაციის განვითარება."
                                }
                            </p>
                            <a 
                                href="https://qazaqgreen.com/news/kazakhstan/1972/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-5 py-2.5 rounded-lg text-xs md:text-sm uppercase transition-colors shadow-sm"
                            >
                                <span>{isEn ? 'View More' : 'მეტის ნახვა'}</span>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            {/* High Resolution Lightbox Modal mounted via Portal to document.body */}
            {mounted && selectedImage && createPortal(
                <div 
                    className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6"
                    role="dialog" 
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
                        onClick={() => setSelectedImage(null)}
                    />

                    {/* Modal Card centered in viewport */}
                    <div 
                        className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-700/60"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
                            <h4 className="text-xs sm:text-sm md:text-base font-bold truncate pr-4 text-slate-100">
                                {selectedImage.title}
                            </h4>
                            <div className="flex items-center gap-2 shrink-0">
                                <a 
                                    href={selectedImage.src} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
                                    title={isEn ? "Open full size in new tab" : "ორიგინალის გახსნა ახალ ფანჯარაში"}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span className="hidden sm:inline">{isEn ? 'Open Full' : 'ორიგინალი'}</span>
                                </a>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-colors"
                                    aria-label="Close"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Image Viewer with vertical scroll and perfect center fit */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-black/60 flex items-center justify-center min-h-[50vh]">
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.title}
                                className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
