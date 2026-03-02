'use client';

import React from 'react';
import Head from 'next/head';

export default function MissionPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>Mission | IICE</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#2E073F] leading-tight">
                        ინსტიტუტის მისია
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-8 border-l-4 border-l-[#2E073F] animate-fade-in-up">
                        <p className="text-lg text-slate-700 leading-relaxed text-justify">
                            ინსტიტუტის მისიაა არაორგანული ქიმიის და ელექტროქიმიის დარგში ახალი ტექნოლოგიებისთვის სამეცნიერო ფუნდამენტის უზრუნველყოფა. კვლევების სტრატეგიული ფოკუსი მიმართულია არაორგანულ ქიმიაში და ელექტროქიმიაში კვლევებისკენ მდგრადი ენერგეტიკის, სოფლის მეურნეობის, ჯანმრთელობის და ეკოლოგიისთვის. ინსტიტუტი წარმოადგენს საკვანძო კვლევით ცენტრს მდგრად, დეკარბონიზებულ ეკონომიკაზე გადასასვლელად, რომელიც ამუშავებს ამოცანებს განახლებადი ენერგიის ეფექტური წარმოება - შენახვიდან ახალ ეკოლოგიურ ქიმიურ წარმოებებამდე.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-8 animate-fade-in-up">
                        <p className="text-lg text-slate-700 leading-relaxed text-justify">
                            ინსტიტუტის პრიორიტეტული მიმართულებები დაბალანსებულია გლობალურ ტრენდებს, ეროვნულ ინტერესებს და საკუთარ გამოცდილებას (ექპერტიზას) შორის. პრიორიტეტების არჩევის კრიტერიუმებია: უნიკალური კომპეტენციის სპეციალისტების კრიტიკულად აუცილებელი რაოდენობის არსებობა; ინფრასტრუქტურული უზრუნველყოფა (უნიკალური კვლევითი ხელსაწყოების, დანადგარების, მოწყობილობების და ლაბორატორიების არსებობა და ახლის შექმნის შესაძლებლობა).
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 border-t-4 border-t-[#2E073F] animate-fade-in-up">
                            <h3 className="text-2xl font-bold text-[#2E073F] mb-6">ინსტიტუტის მთავარი პრიორიტეტებია:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>ახალი თაობის ენერგეტიკა:</strong> წყალბადის ენერგეტიკა; ახალი ტიპის ბატარეები და აკუმულატორები;</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>ციკლური (მწვანე) ეკონომიკის ტექნოლოგიები:</strong> რეციკლინგის ტექნოლოგიები; ეკოსისტემების მონიტორინგი და აღდგენა.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>ფუნდამენტური თეორიული საფუძლების კვლევები:</strong> მუხტის და ენერგიის გადატანის და ფოტოგადატანის შესწავლა არარეგულარულ კონდენსირებულ სისტემებში (ელექტროლიტებში და ელექტროლიტი/მყარი სხეულის ინტერფეისზე)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 border-t-4 border-t-[#AD49E1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <h3 className="text-2xl font-bold text-[#2E073F] mb-6">მთავარი გამჭოლი ამოცანები:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>სრული ინოვაციური ციკლის განხორციელება:</strong> მასალის სინთეზის იდეიდან - უჯრედის/მოწყობილობის პროტოტიპისკენ - რეალურ პირობებში შემოწმებისკენ (ერთობლივად ინდუსტრიულ პარტნიორებთან);</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>უნიკალური კვლევითი ინფრასტრუქტურის განვითარება;</strong></span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>კადრები და სწავლება:</strong> ელექტროქიმიკოსების ახალი თაობის მომზადება, რომლებიც ფლობენ დისციპლინათშორის ცოდნას;</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
