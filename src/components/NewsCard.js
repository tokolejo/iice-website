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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${item.category === 'news' ? 'bg-[#AD49E1] text-white' : 'bg-[#2E073F] text-white'
                        }`}>
                        {categoryLabel}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-slate-400 mb-3 font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.date}
                </div>

                <h3 className="text-lg font-bold text-[#2E073F] mb-3 leading-tight group-hover:text-[#AD49E1] transition-colors">
                    {title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>

                <button
                    onClick={onClick}
                    className="mt-auto inline-flex items-center text-sm font-bold text-[#AD49E1] hover:text-[#7A1CAC] transition-colors group/btn"
                >
                    {language === 'en' ? 'Read More' : 'ვრცლად'}
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
