'use client';

import React from 'react';
import Head from 'next/head';
import { FileText, Download } from 'lucide-react';

export default function StatutePage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>Statute | IICE</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#60318e] leading-tight">
                        ინსტიტუტის დებულება
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-100 p-10 md:p-14 border-t-4 border-t-[#AD49E1] text-center animate-fade-in-up">
                        <div className="w-20 h-20 bg-[#EBD3F8]/30 rounded-full flex items-center justify-center text-[#60318e] mx-auto mb-8 border border-purple-100">
                            <FileText size={36} strokeWidth={1.5} />
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-800 mb-6 uppercase">
                            რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი
                        </h2>

                        <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                            გაეცანით ინსტიტუტის დებულებას, რომელიც განსაზღვრავს ორგანიზაციულ სტრუქტურას, მართვის პრინციპებსა და სამეცნიერო-კვლევითი საქმიანობის სამართლებრივ საფუძვლებს.
                        </p>

                        <a
                            href="https://iice.ge/wp-content/uploads/2025/03/422017_d1.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#AD49E1] hover:bg-[#7A1CAC] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wide transition-all transform hover:-translate-y-1 shadow-md hover:shadow-purple-900/30"
                        >
                            <Download size={20} />
                            დებულების ჩამოტვირთვა (PDF)
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
