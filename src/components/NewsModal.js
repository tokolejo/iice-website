import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';

const subscribe = () => () => {};

export default function NewsModal({ item, onClose }) {
    const { language } = useLanguage();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showFullContent, setShowFullContent] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);

    // Only include valid images
    const images = item ? (item.images || [item.imageUrl]).filter(img => img && img !== '' && !img.includes('placeholder.jpg')) : [];
    const hasImages = images.length > 0;

    // Lock body scroll and listen for ESC / Arrow keys when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isLightboxOpen) {
                    setIsLightboxOpen(false);
                } else {
                    onClose();
                }
            } else if (e.key === 'ArrowRight' && images.length > 1) {
                setActiveImageIndex((prev) => (prev + 1) % images.length);
            } else if (e.key === 'ArrowLeft' && images.length > 1) {
                setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, images.length, isLightboxOpen]);

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

    const activeImageUrl = images[activeImageIndex];
    const rawCaption = item?.galleryCaptions?.[activeImageUrl];
    const activeCaption = typeof rawCaption === 'string'
        ? rawCaption
        : (rawCaption ? (language === 'en' ? (rawCaption.en || rawCaption.ka) : rawCaption.ka) : null);

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
                                    alt={activeCaption || title}
                                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl animate-fade-in cursor-zoom-in"
                                    onClick={() => setIsLightboxOpen(true)}
                                />

                                {/* Floating Page Indicator Badge & Lightbox Zoom Button */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                                    {images.length > 1 && (
                                        <div className="px-3 py-1 text-[10px] font-black tracking-widest text-white bg-slate-900/60 backdrop-blur-md rounded-full border border-white/10 shadow-md select-none">
                                            {activeImageIndex + 1} / {images.length}
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setIsLightboxOpen(true)}
                                        className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all shadow-md"
                                        title={language === 'en' ? 'Fullscreen Preview' : 'სრული ეკრანით ნახვა'}
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </button>
                                </div>

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

                                {/* Image Caption Overlay */}
                                {activeCaption && (
                                    <div className="absolute bottom-3 left-4 right-4 z-20 mx-auto max-w-xl text-center px-4 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium shadow-lg animate-fade-in">
                                        {activeCaption}
                                    </div>
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

            {/* Fullscreen Lightbox Overlay */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-fade-in select-none"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Top Controls Bar */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
                        <div className="text-white/80 text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                            {activeImageIndex + 1} / {images.length}
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsLightboxOpen(false)}
                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105"
                            title="Close"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Big Image */}
                    <div
                        className="relative max-w-[95vw] max-h-[85vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[activeImageIndex]?.startsWith('/') ? `${images[activeImageIndex]}` : images[activeImageIndex]}
                            alt={activeCaption || title}
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl drop-shadow-2xl"
                        />
                    </div>

                    {/* Caption in Lightbox */}
                    {activeCaption && (
                        <div
                            className="mt-3 px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs md:text-sm font-medium max-w-2xl text-center pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {activeCaption}
                        </div>
                    )}

                    {/* Lightbox Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>,
        document.body
    );
}
