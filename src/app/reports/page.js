'use client';

import React from 'react';
import Head from 'next/head';
import { FileText, Download, Clock } from 'lucide-react';

const reports = [
    { year: '2025', url: 'https://iice.ge/wp-content/uploads/2026/02/angarishi-2025.pdf', status: 'active' },
    { year: '2024', url: '#', status: 'coming_soon' },
    { year: '2023', url: 'https://iice.ge/wp-content/uploads/2026/02/angarishi-2023.pdf', status: 'active' },
    { year: '2022', url: 'https://iice.ge/wp-content/uploads/2026/02/angarishi-2022.pdf', status: 'active' },
    { year: '2021', url: 'https://iice.ge/wp-content/uploads/2026/02/angarishi-2021.pdf', status: 'active' }
];

export default function ReportsPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>Scientific Reports | IICE</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#60318e] leading-tight">
                        სამეცნიერო ანგარიშები
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-3xl space-y-5">

                    {reports.map((report, idx) => {
                        const isActive = report.status === 'active';

                        return (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 border animate-fade-in-up ${isActive ? 'shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#AD49E1]/40 border-slate-100 border-l-4 border-l-[#60318e]' : 'opacity-70 bg-slate-50 border-slate-200'}`}
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#AD49E1] shrink-0">
                                        {isActive ? <FileText size={24} /> : <Clock size={24} className="text-slate-400" />}
                                    </div>
                                    <h3 className={`text-2xl font-extrabold ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                                        {report.year} წლის ანგარიში
                                    </h3>
                                </div>

                                <div className="w-full md:w-auto flex justify-end">
                                    {isActive ? (
                                        <a
                                            href={report.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#AD49E1] hover:bg-[#7A1CAC] text-white px-6 py-3 rounded-xl font-bold uppercase text-sm transition-colors shadow-sm whitespace-nowrap"
                                        >
                                            <Download size={18} />
                                            ჩამოტვირთვა
                                        </a>
                                    ) : (
                                        <span className="w-full md:w-auto inline-flex items-center justify-center bg-slate-200 text-slate-500 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider">
                                            მალე დაემატება
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </section>
        </div>
    );
}
