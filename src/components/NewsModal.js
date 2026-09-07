import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NewsModal({ item, onClose }) {
    const { language } = useLanguage();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showFullContent, setShowFullContent] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Lock body scroll and listen for ESC key when modal is open
    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            setMounted(false);
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!item) return null;
    if (!mounted) return null;

    const title = language === 'en' ? item.titleEn : item.title;
    const rawContent = language === 'en' ? item.contentEn : item.content;

    // Strip WordPress gallery HTML, images, and empty paragraphs from the content
    const content = rawContent ? rawContent
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
        .replace(/<img[^>]*>/gi, '')
        .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '') : '';

    // Only include valid images
    const images = (item.images || [item.imageUrl]).filter(img => img && img !== '' && !img.includes('placeholder.jpg'));
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

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#2e0d42]/80 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in border border-purple-100/50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button - Glassmorphic high contrast */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] p-2 md:p-3 bg-slate-950/40 hover:bg-slate-950/80 text-white backdrop-blur-md rounded-full border border-white/10 transition-all shadow-xl hover:scale-110 active:scale-95 group"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto w-full">
                    {/* Top Section: Media Gallery (Stage 1.1 - Full-bleed Dark Gallery) */}
                    {hasImages && (
                        <div className="w-full bg-slate-950 flex flex-col relative group/gallery border-b border-slate-900 overflow-hidden">
                            {/* Main Slider Canvas */}
                            <div className="w-full relative flex items-center justify-center h-[280px] md:h-[400px]">
                                {/* Subtle background gradient grid overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-[#2e1065]/40 opacity-90 z-0"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>

                                {/* Main Foreground Image */}
                                <img
                                    key={activeImageIndex}
                                    src={images[activeImageIndex]?.startsWith('/') ? `${images[activeImageIndex]}` : images[activeImageIndex]}
                                    alt={title}
                                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl animate-fade-in"
                                />

                                {/* Floating Page Indicator Badge (Glassmorphic) */}
                                {images.length > 1 && (
                                    <div className="absolute top-4 left-4 z-20 px-3 py-1 text-[10px] font-black tracking-widest text-white bg-slate-900/60 backdrop-blur-md rounded-full border border-white/10 shadow-md select-none">
                                        {activeImageIndex + 1} / {images.length}
                                    </div>
                                )}

                                {/* Gallery Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 border border-white/5"
                                        >
                                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 border border-white/5"
                                        >
                                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Filmstrip (inside the dark block at the bottom) */}
                            {images.length > 1 && (
                                <div className="bg-slate-950/70 border-t border-white/5 flex gap-2 overflow-x-auto py-3 justify-center max-w-full hide-scrollbar z-20">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative w-14 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                                                idx === activeImageIndex
                                                    ? 'border-[#AD49E1] scale-105 shadow-md'
                                                    : 'border-white/10 hover:border-[#AD49E1]/50'
                                            }`}
                                        >
                                            <img
                                                src={img?.startsWith('/') ? img : `${img}`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content Section */}
                    <div className={`p-6 md:p-10 bg-white flex flex-col ${!hasImages ? 'pt-12 md:pt-16' : 'pt-6 md:pt-8'}`}>
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

                        <div className="prose prose-slate max-w-3xl overflow-hidden mb-8">
                            {showFullContent || !isLongContent ? (
                                <div 
                                    className="text-slate-600 text-sm md:text-sm leading-relaxed font-medium text-justify wp-content"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            ) : (
                                <p className="text-slate-600 text-sm md:text-sm leading-relaxed font-medium text-justify">
                                    {language === 'en' ? item.descriptionEn : item.description}
                                </p>
                            )}
                        </div>

                        {/* Read More Toggle */}
                        {isLongContent && (
                            <button
                                onClick={() => setShowFullContent(!showFullContent)}
                                className="text-[#AD49E1] font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all w-fit"
                            >
                                {showFullContent
                                    ? (language === 'en' ? 'Show Less' : 'ნაკლების ჩვენება')
                                    : (language === 'en' ? 'Read More' : 'მეტის ჩამოშლა')}
                                <svg className={`w-4 h-4 transition-transform ${showFullContent ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
