'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { useLanguage } from '../../context/LanguageContext';
import { newsData } from '../../data/newsData';
import NewsCard from '../../components/NewsCard';
import en from '../../locales/en';
import ka from '../../locales/ka';

export default function NewsPage() {
    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;
    const [filter, setFilter] = useState('all');
    const [selectedNews, setSelectedNews] = useState(null);

    const filteredNews = filter === 'all'
        ? newsData
        : newsData.filter(item => item.category === filter);

    const categories = [
        { id: 'all', label: language === 'en' ? 'All' : 'ყველა' },
        { id: 'news', label: language === 'en' ? 'News' : 'სიახლეები' },
        { id: 'seminars', label: language === 'en' ? 'Seminars' : 'სემინარები' }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <Head>
                <title>{t.nav.news} | IICE</title>
            </Head>

            {/* Header */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-8 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#2E073F] leading-tight">
                        {t.nav.news}
                    </h1>
                </div>
            </div>

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${filter === cat.id
                                    ? 'bg-[#AD49E1] text-white border-[#AD49E1] shadow-md scale-105'
                                    : 'bg-white text-slate-500 border-slate-100 hover:border-[#AD49E1] hover:text-[#AD49E1]'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {filteredNews.map((item, index) => (
                        <NewsCard
                            key={item.id}
                            item={item}
                            onClick={() => setSelectedNews(item)}
                        />
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        {language === 'en' ? 'No news found in this category.' : 'ამ კატეგორიაში სიახლეები არ მოიძებნა.'}
                    </div>
                )}
            </div>

            {/* News Modal */}
            {selectedNews && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2E073F]/60 backdrop-blur-sm animate-fade-in">
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedNews(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-[#AD49E1] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Modal Content */}
                        <div className="overflow-y-auto">
                            <div className="h-64 md:h-80 w-full relative">
                                <img
                                    src={selectedNews.imageUrl}
                                    alt={language === 'en' ? selectedNews.titleEn : selectedNews.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                            </div>

                            <div className="p-8 md:p-12 -mt-12 relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${selectedNews.category === 'news' ? 'bg-[#AD49E1] text-white' : 'bg-[#2E073F] text-white'
                                        }`}>
                                        {selectedNews.category === 'news'
                                            ? (language === 'en' ? 'News' : 'სიახლეები')
                                            : (language === 'en' ? 'Seminar' : 'სემინარი')}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium">{selectedNews.date}</span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-extrabold text-[#2E073F] mb-6 leading-tight">
                                    {language === 'en' ? selectedNews.titleEn : selectedNews.title}
                                </h2>

                                <div className="prose prose-slate max-w-none">
                                    <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                                        {language === 'en' ? selectedNews.contentEn : selectedNews.content}
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
                                    <button
                                        onClick={() => setSelectedNews(null)}
                                        className="bg-[#2E073F] text-white px-8 py-3 rounded-full font-bold hover:bg-[#AD49E1] transition-all shadow-lg hover:shadow-purple-200"
                                    >
                                        {language === 'en' ? 'Close' : 'დახურვა'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
