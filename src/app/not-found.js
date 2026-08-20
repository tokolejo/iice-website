'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
            <div className="bg-white rounded-[2rem] shadow-sm border border-purple-100/50 p-8 md:p-16 hover:shadow-md transition-shadow max-w-2xl w-full text-center flex flex-col items-center animate-fade-in-up">
                
                {/* Elegant Graphic */}
                <div className="w-24 h-24 bg-purple-50 text-[#AD49E1] rounded-full flex items-center justify-center mb-8 relative shadow-inner border border-purple-100/50">
                    <span className="absolute inset-0 rounded-full bg-[#AD49E1]/10 animate-ping opacity-75"></span>
                    <span className="text-4xl font-extrabold relative z-10 select-none">404</span>
                </div>

                <h1 className="text-xl md:text-2xl font-black text-[#60318e] mb-4">
                    {isEn ? 'Page Not Found or Under Construction' : 'გვერდი ვერ მოიძებნა ან განახლების პროცესშია'}
                </h1>
                
                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md font-medium">
                    {isEn
                        ? 'The requested page does not exist or the information is currently being prepared and will be added soon.'
                        : 'მოთხოვნილი გვერდი არ არსებობს ან ინფორმაცია ამჟამად განახლების პროცესშია და მალე დაემატება.'}
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/" className="inline-flex items-center justify-center bg-[#60318e] hover:bg-[#AD49E1] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95">
                        {isEn ? 'Go to Homepage' : 'მთავარ გვერდზე გადასვლა'}
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center bg-white border border-slate-200 hover:border-[#AD49E1] text-slate-600 hover:text-[#AD49E1] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm active:scale-95">
                        {isEn ? 'Contact Us' : 'კონტაქტი'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
