'use client';

import React from 'react';
import Head from 'next/head';

export default function CollaborationPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>Collaboration | IICE</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#2E073F] leading-tight">
                        კოლაბორაცია
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl space-y-8">

                    {/* Item 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow hover:border-[#AD49E1]/30 border-l-4 border-l-[#2E073F] animate-fade-in-up">
                        <div className="min-w-[70px] h-[70px] bg-[#EBD3F8]/30 rounded-2xl flex items-center justify-center text-[#2E073F] border border-purple-100 shrink-0">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-extrabold text-[#2E073F] uppercase mb-4 leading-snug">
                                საერთაშორისო მწვანე წყალბადის ლაბორატორია
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6 text-justify">
                                ბაქოში გაფორმებული ორმხრივი ხელშეკრულების ფარგლებში (IICE), ინსტიტუტი იწყებს მუშაობას საერთაშორისო მწვანე წყალბადის ლაბორატორიის განვითარებაზე. პროექტი მიზნად ისახავს სამეცნიერო თანამშრომლობის გაღრმავებას და ენერგეტიკული ტექნოლოგიების სფეროში ინოვაციების დანერგვას.
                            </p>
                            <a href="https://iice.ge/ka/welcome-to-our-clinic-3/" className="inline-block bg-[#663191] hover:bg-purple-800 text-white font-bold px-6 py-3 rounded-lg text-sm uppercase transition-colors shadow-sm">
                                ვრცლად ნახვა
                            </a>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow hover:border-[#AD49E1]/30 animate-fade-in-up">
                        <div className="min-w-[70px] h-[70px] bg-slate-50 rounded-2xl flex items-center justify-center text-[#AD49E1] border border-slate-100 shrink-0">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-extrabold text-[#2E073F] uppercase mb-4 leading-snug">
                                სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ<br />(აზერბაიჯანი)
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6 text-justify">
                                აზერბაიჯანის რესპუბლიკის მეცნიერებისა და განათლების სამინისტროს რადიაციული პრობლემების ინსტიტუტსა და თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს შორის სამეცნიერო და ტექნიკური კოლაბორაციის განვითარება.
                            </p>
                            <span className="inline-block bg-slate-100 text-slate-500 font-extrabold px-4 py-2 rounded-md text-xs uppercase border border-slate-200">
                                ინფორმაცია მუშავდება
                            </span>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow hover:border-[#AD49E1]/30 animate-fade-in-up">
                        <div className="min-w-[70px] h-[70px] bg-slate-50 rounded-2xl flex items-center justify-center text-[#AD49E1] border border-slate-100 shrink-0">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-extrabold text-[#2E073F] uppercase mb-4 leading-snug">
                                სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ<br />(ყაზახეთი)
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6 text-justify">
                                სამეცნიერო და ტექნიკური თანამშრომლობის შესახებ საერთაშორისო სამეცნიერო კომპლექსი „ასტანა“ (ყაზახეთი) და თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს შორის სამეცნიერო და ტექნიკური კოლაბორაციის განვითარება.
                            </p>
                            <span className="inline-block bg-slate-100 text-slate-500 font-extrabold px-4 py-2 rounded-md text-xs uppercase border border-slate-200">
                                ინფორმაცია მუშავდება
                            </span>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
