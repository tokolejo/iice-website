'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { newsData } from '../../data/newsData';
import NewsCard from '../../components/NewsCard';
import NewsModal from '../../components/NewsModal';
import en from '../../locales/en';
import ka from '../../locales/ka';

function NewsContent() {
    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState('all');
    const [selectedNews, setSelectedNews] = useState(null);
    const [visibleCount, setVisibleCount] = useState(8);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const categoryParam = searchParams.get('category') || searchParams.get('filter');
        if (categoryParam && ['all', 'news', 'seminars'].includes(categoryParam)) {
            setFilter(categoryParam);
        }
    }, [searchParams]);

    const handleFilterChange = (catId) => {
        setFilter(catId);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            if (catId === 'all') {
                url.searchParams.delete('category');
                url.searchParams.delete('filter');
            } else {
                url.searchParams.set('category', catId);
                url.searchParams.delete('filter');
            }
            window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
        }
    };

    const filteredNews = newsData
        .filter(item => {
            const matchesCategory = filter === 'all' || item.category === filter;
            const title = language === 'en' ? item.titleEn : item.title;
            const content = language === 'en' ? item.contentEn : item.content;
            const matchesSearch = !searchQuery.trim() ||
                title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                content?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

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

    const countByCategory = (catId) => {
        if (catId === 'all') return newsData.length;
        return newsData.filter(item => item.category === catId).length;
    };

    return (
        <div className="bg-[#FAF9FF] min-h-screen pb-16">
            <title>{language === 'en' ? 'News & Seminars | TSU IICE' : 'სიახლეები და სემინარები | TSU IICE'}</title>
            <meta name="description" content={language === 'en' ? "Latest news, academic seminars, and announcements from the R. Agladze Institute of Inorganic Chemistry and Electrochemistry." : "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის უახლესი ამბები, აკადემიური სემინარები და ანონსები."} />
            <meta property="og:title" content={language === 'en' ? 'News & Seminars | TSU IICE' : 'სიახლეები და სემინარები | TSU IICE'} />
            <meta property="og:description" content={language === 'en' ? "Latest news, academic seminars, and announcements from the R. Agladze Institute of Inorganic Chemistry and Electrochemistry." : "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის უახლესი ამბები, აკადემიური სემინარები და ანონსები."} />
            <link rel="canonical" href="https://iice.ge/news" />

            <div className="relative bg-gradient-to-b from-[#F8F6FF] to-[#FAF9FF] pt-4 pb-12 overflow-hidden border-b border-[#EBD3F8]/30">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#AD49E1]/5 to-transparent"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#AD49E1]/5 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-4 animate-fade-in-up">
                            <span className="w-12 h-1 bg-[#AD49E1] rounded-full"></span>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#AD49E1]">{language === 'en' ? 'Information Hub' : 'საინფორმაციო სივრცე'}</span>
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
            </div>

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-8">
                {/* Search Bar & Filters Horizontal Control Panel */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                    {/* Categories (Left) */}
                    <div className="bg-slate-100/90 backdrop-blur-xl p-1.5 rounded-[2rem] shadow-lg border border-slate-200 inline-flex shrink-0">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleFilterChange(cat.id)}
                                className={`px-5 py-2.5 rounded-[1.5rem] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 ${filter === cat.id
                                    ? 'bg-[#AD49E1] text-white shadow-[0_6px_15px_-3px_rgba(173,73,225,0.35)] scale-105 font-black'
                                    : 'text-slate-600 hover:text-[#AD49E1] hover:bg-white'
                                    }`}
                            >
                                <span>{cat.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold transition-all duration-300 ${
                                    filter === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                    {countByCategory(cat.id)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search Input (Right) */}
                    <div className="relative w-full max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="focus:ring-2 focus:ring-[#AD49E1]/20 focus:border-[#AD49E1] block w-full pl-10 pr-10 py-2.5 text-xs md:text-sm border border-slate-300 focus:outline-none rounded-full bg-white shadow-md text-slate-800 font-bold placeholder-slate-500"
                            placeholder={language === 'en' ? "Search..." : "ძებნა..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {visibleNews.map((item) => (
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
                            className="bg-white border-2 border-slate-200 text-gray-700 hover:border-[#AD49E1] hover:text-[#AD49E1] font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
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

            {/* Modal Component */}
            {selectedNews && (
                <NewsModal
                    item={selectedNews}
                    onClose={() => setSelectedNews(null)}
                />
            )}
        </div>
    );
}

export default function NewsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FAF9FF]" />}>
            <NewsContent />
        </Suspense>
    );
}
