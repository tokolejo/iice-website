'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function NewsModal({ item, onClose }) {
    const { language } = useLanguage();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showFullContent, setShowFullContent] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!item) return null;

    const title = language === 'en' ? item.titleEn : item.title;
    const content = language === 'en' ? item.contentEn : item.content;

    // Only include valid images
    const images = (item.images || [item.imageUrl]).filter(img => img && img !== '');
    const hasImages = images.length > 0;

    const handleNextImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Calculate if content is long enough to need "Read More"
    const isLongContent = content.length > 300;
    const displayContent = showFullContent || !isLongContent ? content : content.slice(0, 300) + '...';

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#60318e]/90 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 bg-white/50 hover:bg-white rounded-full text-[#60318e] hover:text-[#AD49E1] transition-all shadow-xl hover:scale-110 active:scale-95 group"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto w-full">
                    {/* Top Section: Media Gallery (Conditional) */}
                    {hasImages && (
                        <div className="w-full bg-slate-950 relative group/gallery flex items-center justify-center h-[300px] md:h-[450px]">
                            <img
                                key={activeImageIndex}
                                src={images[activeImageIndex]}
                                alt={title}
                                className="w-full h-full object-contain animate-fade-in"
                            />

                            {/* Gallery Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all opacity-0 group-hover/gallery:opacity-100 -translate-x-4 group-hover/gallery:translate-x-0"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all opacity-0 group-hover/gallery:opacity-100 translate-x-4 group-hover/gallery:translate-x-0"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Indicators */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Content Section */}
                    <div className={`p-6 md:p-10 bg-white flex flex-col ${!hasImages ? 'pt-12 md:pt-16' : ''}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-sm ${item.category === 'news' ? 'bg-[#AD49E1] text-white' : 'bg-[#60318e] text-white'
                                }`}>
                                {item.category === 'news'
                                    ? (language === 'en' ? 'News' : 'სიახლეები')
                                    : (language === 'en' ? 'Seminar' : 'სემინარი')}
                            </span>
                            <div className="h-px flex-grow bg-slate-100"></div>
                            <span className="text-[11px] text-slate-400 font-bold tracking-wider">{item.date}</span>
                        </div>

                        <h2 className="text-lg md:text-xl font-black text-[#60318e] mb-6 leading-snug tracking-tight max-w-3xl">
                            {title}
                        </h2>

                        <div className="prose prose-slate max-w-3xl overflow-hidden">
                            <p className="text-slate-600 text-sm md:text-sm leading-relaxed whitespace-pre-line font-medium text-justify">
                                {displayContent}
                            </p>
                        </div>

                        {/* Read More Toggle */}
                        {isLongContent && (
                            <button
                                onClick={() => setShowFullContent(!showFullContent)}
                                className="mt-8 text-[#AD49E1] font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all w-fit"
                            >
                                {showFullContent
                                    ? (language === 'en' ? 'Show Less' : 'ნაკლების ჩვენება')
                                    : (language === 'en' ? 'Read More' : 'მეტის ჩამოშლა')}
                                <svg className={`w-4 h-4 transition-transform ${showFullContent ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        )}

                        {/* Gallery Thumbnails (Conditional) */}
                        {hasImages && images.length > 1 && (
                            <div className="mt-16 pt-10 border-t border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Explore Gallery</p>
                                <div className="flex flex-wrap gap-3">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${idx === activeImageIndex ? 'border-[#AD49E1] scale-105 shadow-xl ring-4 ring-[#AD49E1]/10' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt="" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
