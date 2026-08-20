'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function StudiesInternshipsPage() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <title>{isEn ? 'Studies & Internships | TSU IICE' : 'სწავლება და სტაჟირება | TSU IICE'}</title>
            <meta name="description" content={isEn ? "Educational programs, student internships, and research opportunities at the R. Agladze Institute of Inorganic Chemistry and Electrochemistry." : "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის საგანმანათლებლო პროგრამები, სტაჟირება და სტუდენტური შესაძლებლობები."} />
            <meta property="og:title" content={isEn ? 'Studies & Internships | TSU IICE' : 'სწავლება და სტაჟირება | TSU IICE'} />
            <meta property="og:description" content={isEn ? "Educational programs, student internships, and research opportunities at the R. Agladze Institute of Inorganic Chemistry and Electrochemistry." : "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის საგანმანათლებლო პროგრამები, სტაჟირება და სტუდენტური შესაძლებლობები."} />
            <link rel="canonical" href="https://iice.ge/studies-internships" />

            {/* Page Header */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] leading-tight">
                        {isEn ? 'Studies & Internships' : 'სწავლება და სტაჟირება'}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up mt-8" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white rounded-[2rem] shadow-sm border border-purple-100/50 p-8 md:p-16 hover:shadow-md transition-shadow max-w-3xl mx-auto text-center flex flex-col items-center">
                    
                    {/* Elegant Animated Graphic */}
                    <div className="w-20 h-20 bg-purple-50 text-[#AD49E1] rounded-2xl flex items-center justify-center mb-8 relative shadow-inner border border-purple-100/50">
                        <span className="absolute inset-0 rounded-2xl bg-[#AD49E1]/10 animate-ping opacity-75"></span>
                        <svg className="w-10 h-10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-[#60318e] mb-4">
                        {isEn ? 'Information is Being Prepared' : 'მიმდინარეობს ინფორმაციის მომზადება'}
                    </h2>
                    
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md font-medium">
                        {isEn
                            ? 'The educational and internship program catalog is currently being updated. Details will be published shortly.'
                            : 'სწავლისა და სტაჟირების პროგრამების კატალოგი ამჟამად განახლების პროცესშია. დეტალური ინფორმაცია გამოქვეყნდება უახლოეს მომავალში.'}
                    </p>

                    <div className="flex gap-4">
                        <Link href="/" className="inline-flex items-center justify-center bg-[#60318e] hover:bg-[#AD49E1] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95">
                            {isEn ? 'Go to Homepage' : 'მთავარ გვერდზე გადასვლა'}
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center bg-white border border-slate-200 hover:border-[#AD49E1] text-slate-600 hover:text-[#AD49E1] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm active:scale-95">
                            {isEn ? 'Contact Us' : 'კონტაქტი'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
