'use client';

import Head from 'next/head';
import { useLanguage } from '../../context/LanguageContext';
import en from '../../locales/en';
import ka from '../../locales/ka';

export default function StructurePage() {
    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;
    const isEn = language === 'en';

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <Head>
                <title>{isEn ? 'Structure | TSU IICE' : 'სტრუქტურა | TSU IICE'}</title>
                <meta name="description" content={isEn ? "The organizational structure and administration of the R. Agladze Institute of Inorganic Chemistry and Electrochemistry." : "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის ორგანიზაციული სტრუქტურა და ადმინისტრაცია."} />
                <meta property="og:title" content={isEn ? 'Structure | TSU IICE' : 'სტრუქტურა | TSU IICE'} />
                <meta property="og:description" content={isEn ? "The organizational structure and administration of the R. Agladze Institute of Inorganic Chemistry and Electrochemistry." : "რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის ორგანიზაციული სტრუქტურა და ადმინისტრაცია."} />
                <link rel="canonical" href="https://iice.ge/structure" />
            </Head>
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] leading-tight">
                        {language === 'en' ? 'Structure' : 'სტრუქტურა'}
                    </h1>
                </div>
            </div>

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 hover:shadow-lg transition-shadow">
                    <div className="w-full h-64 md:h-96 bg-slate-50 rounded-2xl mb-10 overflow-hidden shadow-inner border border-slate-100 flex items-center justify-center relative group">
                        <img src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&q=80" alt="Test Layout" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80"></div>
                        <h3 className="absolute bottom-8 left-8 text-white font-extrabold text-2xl drop-shadow-md">
                            {language === 'en' ? 'Visual Test Layout' : 'ვიზუალური სატესტო განლაგება'}
                        </h3>
                    </div>
                    <div className="prose prose-purple max-w-none text-text-body">
                        <p className="text-base leading-relaxed mb-6">
                            {language === 'en'
                                ? 'This is a high-fidelity visual test layout requested to see how content will look on this page.'
                                : 'ეს არის მაღალი ხარისხის ვიზუალური სატესტო განლაგება, რათა დაინახოთ როგორ გამოჩნდება კონტენტი ამ გვერდზე.'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:-translate-y-1 transition-transform">
                                <h4 className="text-lg font-bold text-gray-900 mb-3">{language === 'en' ? 'Test Informational Block 1' : 'საინფორმაციო ტესტ-ბლოკი 1'}</h4>
                                <p>{language === 'en' ? 'Testing card-based content block within the page to visualize structured data.' : 'ბარათის ტიპის კონტენტის ბლოკის ტესტირება გვერდის შიგნით სტრუქტურირებული მონაცემებისთვის.'}</p>
                            </div>
                            <div className="bg-[#EBD3F8]/30 p-6 rounded-2xl border border-purple-100 hover:-translate-y-1 transition-transform">
                                <h4 className="text-lg font-bold text-[#60318e] mb-3">{language === 'en' ? 'Test Highlight Block 2' : 'გამორჩეული ტესტ-ბლოკი 2'}</h4>
                                <p>{language === 'en' ? 'Testing highlight block with primary branding colors for important announcements.' : 'გამოყოფილი ბლოკის ტესტირება ბრენდის ძირითადი ფერებით მნიშვნელოვანი განცხადებებისთვის.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
