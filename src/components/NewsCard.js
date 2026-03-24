'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function NewsCard({ item, onClick }) {
    const { language } = useLanguage();

    const title = language === 'en' ? item.titleEn : item.title;
    const description = language === 'en' ? item.descriptionEn : item.description;
    const categoryLabel = item.category === 'news'
        ? (language === 'en' ? 'News' : 'სიახლეები')
        : (language === 'en' ? 'Seminar' : 'სემინარი');

    return (
        <div
            className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/80 overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(173,73,225,0.15)] transition-all duration-500 flex flex-col group h-full cursor-pointer"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                {(!item.imageUrl || item.imageUrl.includes('placeholder.jpg')) ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#60318e] to-[#8c3ab8] transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 flex items-center justify-center relative overflow-hidden">
                        {/* Elegant Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#AD49E1] rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
                        
                        {/* Elegant Icon */}
                        <div className="relative z-10 p-5 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-10 h-10 text-white/90 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {item.category === 'news' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                )}
                            </svg>
                        </div>
                    </div>
                ) : (
                    <img
                        src={item.imageUrl?.startsWith('/') ? `/iice-website${item.imageUrl}` : item.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                    />
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#60318e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Badge - Glassmorphism */}
                <div className="absolute top-5 left-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] backdrop-blur-md shadow-lg border border-white/20 ${item.category === 'news'
                        ? 'bg-[#AD49E1]/90 text-white'
                        : 'bg-[#60318e]/90 text-white'
                        }`}>
                        {categoryLabel}
                    </span>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-5 right-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-[#60318e] shadow-xl border border-white/50">
                        {item.date}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-grow bg-white relative z-10">
                <div className="flex items-center text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                    <span className="w-8 h-px bg-slate-200 mr-3 transition-all duration-500 group-hover:w-12 group-hover:bg-[#AD49E1]"></span>
                    {item.date}
                </div>

                <h3 className="text-lg font-black text-[#60318e] mb-4 leading-[1.25] group-hover:text-[#AD49E1] transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-[#AD49E1] group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                        {language === 'en' ? 'Explore' : 'ვრცლად'}
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>

                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-[#AD49E1] group-hover:text-[#AD49E1] transition-all duration-500 group-hover:rotate-45">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
