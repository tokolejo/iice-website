'use client';

import React from 'react';
import Head from 'next/head';
import { useLanguage } from '../../context/LanguageContext';

const councilMembers = [
    { nameKa: 'თამაზ მარსაგიშვილი', nameEn: 'Tamaz Marsagishvili', roleKa: 'საბჭოს თავმჯდომარე', roleEn: 'Chairman of the Council' },
    { nameKa: 'ნათელა ანანიაშვილი', nameEn: 'Natela Ananiashvili', roleKa: 'საბჭოს მდივანი', roleEn: 'Secretary of the Council' },
    { nameKa: 'გრიგორ ტატიშვილი', nameEn: 'Grigor Tatishvili', roleKa: '', roleEn: '' },
    { nameKa: 'თინა ლეჟავა', nameEn: 'Tina Lezhava', roleKa: '', roleEn: '' },
    { nameKa: 'ვიტალი ბახტაძე', nameEn: 'Vitali Bakhtadze', roleKa: '', roleEn: '' },
    { nameKa: 'ვერა ვარაზაშვილი', nameEn: 'Vera Varazashvili', roleKa: '', roleEn: '' },
    { nameKa: 'ირინე გურგენიძე', nameEn: 'Irine Gurgenidze', roleKa: '', roleEn: '' },
    { nameKa: 'ნიკოლოზ ნიორაძე', nameEn: 'Nikoloz Nioradze', roleKa: '', roleEn: '' },
    { nameKa: 'ნანა ქოიავა', nameEn: 'Nana Koiava', roleKa: '', roleEn: '' },
    { nameKa: 'ვაჟა ჩაგელიშვილი', nameEn: 'Vazha Chagelishvili', roleKa: '', roleEn: '' },
    { nameKa: 'თემურ ჩახუნაშვილი', nameEn: 'Temur Chakhunashvili', roleKa: '', roleEn: '' },
    { nameKa: 'მაია ცინცაძე', nameEn: 'Maia Tsintsadze', roleKa: '', roleEn: '' },
    { nameKa: 'ელიზავეტა ცხაკაია', nameEn: 'Elizaveta Tskhakaia', roleKa: '', roleEn: '' },
    { nameKa: 'დალი ძანაშვილი', nameEn: 'Dali Dzanashvili', roleKa: '', roleEn: '' },
    { nameKa: 'გიგლა წურწუმია', nameEn: 'Gigla Tsurtsumia', roleKa: '', roleEn: '' },
    { nameKa: 'სპარტაკ ხუციშვილი', nameEn: 'Spartak Khutsishvili', roleKa: '', roleEn: '' },
    { nameKa: 'შუქრი ჯაფარიძე', nameEn: 'Shukri Japaridze', roleKa: '', roleEn: '' }
];

export default function ScientificCouncilPage() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>{isEn ? 'Scientific Council | IICE' : 'სამეცნიერო საბჭო | IICE'}</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] leading-tight">
                        {isEn ? 'Scientific Council' : 'სამეცნიერო საბჭო'}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 border-t-4 border-t-[#AD49E1] animate-fade-in-up">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {councilMembers.map((member, idx) => (
                                <li key={idx} className="flex items-center text-base border-b border-slate-50 pb-3">
                                    <span className="text-[#AD49E1] font-bold text-xl mr-4 leading-none relative -top-0.5">•</span>
                                    <div>
                                        <strong className="text-slate-900 font-bold">{isEn ? member.nameEn : member.nameKa}</strong>
                                        {(isEn ? member.roleEn : member.roleKa) && (
                                            <span className="text-slate-500 font-medium ml-2">({isEn ? member.roleEn : member.roleKa})</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
