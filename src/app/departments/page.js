'use client';

import Link from 'next/link';
import { departmentsData, staffData } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import en from '../../locales/en';
import ka from '../../locales/ka';

// Specific icons for each of the 5 departments
const getIconForDepartment = (id) => {
    switch (id) {
        case 'applied-chemistry':
            return (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            );
        case 'fundamental-research':
            return (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
            );
        case 'coordination-compounds':
            return (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
        case 'high-energy-chemistry':
            return (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 21V11l-8-6m14 6l-8 6m0 0v10" />
                </svg>
            );
        case 'phys-chem-analysis':
            return (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            );
        default:
            return (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            );
    }
};

export default function DepartmentsPage() {
    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">

            {/* Page Header */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#60318e] leading-tight mb-2">
                        {t.nav.departments}
                    </h1>
                    <p className="text-sm md:text-base text-[#60318e]/70 max-w-2xl mx-auto font-medium">
                        {language === 'en' ? 'Explore our dedicated research departments driving scientific excellence.' : 'გაეცანით ჩვენს კვლევით განყოფილებებს, რომლებიც განაპირობებენ სამეცნიერო სრულყოფილებას.'}
                    </p>
                </div>
            </div>

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up mt-3" style={{ animationDelay: '0.1s' }}>
                {/* Horizontal Grid for 5 departments */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
                    {departmentsData.map((dept) => {
                        const head = staffData.find(s => s.departmentId === dept.id && s.isHead);
                        const headName = language === 'en' && head?.nameEn ? head.nameEn : head?.name;
                        const deptName = language === 'en' ? dept.nameEn : dept.name;

                        return (
                            <Link href={`/departments/${dept.id}`} key={dept.id} className="block group">
                                <div className={`h-full bg-white rounded-3xl shadow-sm border border-purple-100 overflow-hidden hover-scale flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-xl hover:border-[#AD49E1] relative`}>

                                    {/* Decorative background circle */}
                                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-50 rounded-full z-0 opacity-50 transition-transform group-hover:scale-150 duration-500"></div>

                                    {/* Icon Area */}
                                    <div className={`relative z-10 w-20 h-20 bg-purple-50 text-[#AD49E1] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300 border border-purple-100`}>
                                        {getIconForDepartment(dept.id)}
                                    </div>

                                    {/* Dept Name - Reduced font size */}
                                    <h3 className="relative z-10 text-sm lg:text-base font-extrabold text-gray-900 mb-6 leading-snug group-hover:text-[#AD49E1] transition-colors min-h-[3rem]">
                                        {deptName}
                                    </h3>

                                    {/* Head Info */}
                                    <div className="relative z-10 mt-auto pt-6 border-t border-purple-50 w-full flex flex-col items-center">
                                        <p className="text-[10px] md:text-xs text-[#AD49E1] uppercase tracking-widest font-bold mb-3">{t.departments.headOfDepartment}</p>

                                        <div className="flex flex-col items-center gap-2">
                                            {head?.imageUrl ? (
                                                /* 
                                                   თუ გინდათ სურათის ზომის შეცვლა (If you want to change image size): 
                                                   შეცვალეთ w-16 (სიგანე/width) და h-24 (სიმაღლე/height). 
                                                   მაგ: w-20 h-28 უფრო დიდისთვის, w-12 h-20 უფრო პატარასთვის.
                                                */
                                                <div className="w-16 h-24 rounded-xl overflow-hidden shadow-md border-2 border-white ring-2 ring-purple-100/50 mb-1">
                                                    <img
                                                        src={head.imageUrl}
                                                        alt={headName}
                                                        className="w-full h-full object-cover object-top"
                                                    />
                                                </div>
                                            ) : null}
                                            <span className="font-bold text-sm text-gray-800 text-center">{headName}</span>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
