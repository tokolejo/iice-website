'use client';

import React, { useState, useEffect } from 'react';
// import Head from 'next/head'; // Should not be used in App Router client components for metadata.
import { useLanguage } from '../../context/LanguageContext';
import { newsData } from '../../data/newsData';
import NewsCard from '../../components/NewsCard';
import NewsModal from '../../components/NewsModal';
import en from '../../locales/en';
import ka from '../../locales/ka';

export default function NewsPage() {
    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;
    const [filter, setFilter] = useState('all');
    const [selectedNews, setSelectedNews] = useState(null);
    const [visibleCount, setVisibleCount] = useState(8);

    const filteredNews = filter === 'all'
        ? newsData
        : newsData.filter(item => item.category === filter);

    const visibleNews = filteredNews.slice(0, visibleCount);
    const hasMore = visibleCount < filteredNews.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 8);
    };

    // Reset visible count when filter changes
    useEffect(() => {
        setVisibleCount(8);
    }, [filter]);

    const categories = [
        { id: 'all', label: language === 'en' ? 'All' : 'ყველა' },
        { id: 'news', label: language === 'en' ? 'News' : 'სიახლეები' },
        { id: 'seminars', label: language === 'en' ? 'Seminars' : 'სემინარები' }
    ];

    return (
        <div className="bg-[#FAF9FF] min-h-screen pb-16">
            {/* აქედან რეგულირდება ფუტერსა და კონტენტს შორის დაშორება (მაგ: pb-12, pb-20, pb-32) */}
            {/* Head should be handled by metadata API or layout in App Router */}

            <div className="relative bg-gradient-to-b from-[#F8F6FF] to-[#FAF9FF] pt-4 pb-12 overflow-hidden border-b border-[#EBD3F8]/30">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#AD49E1]/5 to-transparent"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#AD49E1]/5 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-4 animate-fade-in-up">
                            <span className="w-12 h-1 bg-[#AD49E1] rounded-full"></span>
                            <span className="text-[#AD49E1] text-[10px] font-black uppercase tracking-[0.3em]">{t.nav.news}</span>
                        </div>
                        <h1 className="text-lg md:text-xl lg:text-2xl font-black text-[#60318e] leading-tight mb-4 animate-fade-in-up uppercase tracking-wider" style={{ animationDelay: '0.1s' }}>
                            {language === 'en' ? 'Latest Updates & Scientific Events' : 'უახლესი ამბები და სამეცნიერო ღონისძიებები'}
                        </h1>
                        <p className="text-slate-500 text-sm md:text-sm animate-fade-in-up max-w-2xl font-medium leading-relaxed" style={{ animationDelay: '0.2s' }}>
                            {language === 'en'
                                ? 'Stay informed about our latest research discoveries, international collaborations, and upcoming scientific seminars.'
                                : 'გაეცანით ჩვენს უახლეს სამეცნიერო აღმოჩენებს, საერთაშორისო თანამშრომლობასა და მომავალ სემინარებს.'
                            }
                        </p>
                    </div>
                </div>
            </div >

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-8">
                {/* Filters */}
                <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white/70 backdrop-blur-xl p-2 rounded-[2rem] shadow-xl border border-white inline-flex">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-8 py-3 rounded-[1.5rem] text-[11px] font-black uppercase tracking-wider transition-all duration-500 ${filter === cat.id
                                    ? 'bg-[#AD49E1] text-white shadow-[0_8px_20px_-4px_rgba(173,73,225,0.4)] scale-105'
                                    : 'text-slate-500 hover:text-[#AD49E1] hover:bg-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {visibleNews.map((item, index) => (
                        <NewsCard
                            key={item.id}
                            item={item}
                            onClick={() => setSelectedNews(item)}
                        />
                    ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="mt-20 text-center animate-fade-in">
                        <button
                            onClick={handleLoadMore}
                            className="bg-white text-[#60318e] border-2 border-[#EBD3F8] px-12 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#AD49E1] hover:text-white hover:border-[#AD49E1] hover:shadow-[0_20px_40px_-10px_rgba(173,73,225,0.3)] transition-all duration-500 active:scale-95"
                        >
                            {language === 'en' ? 'View More' : 'მეტის ნახვა'}
                        </button>
                    </div>
                )}

                {filteredNews.length === 0 && (
                    <div className="text-center py-32">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                            {language === 'en' ? 'No matches found.' : 'შედეგი არ მოიძებნა.'}
                        </p>
                    </div>
                )}
            </div>

            {/* New Modal Component */}
            {
                selectedNews && (
                    <NewsModal
                        item={selectedNews}
                        onClose={() => setSelectedNews(null)}
                    />
                )
            }
        </div >
    );
}

