'use client';

import React from 'react';
import Head from 'next/head';

const councilMembers = [
    { name: 'თამაზ მარსაგიშვილი', role: 'საბჭოს თავმჯდომარე' },
    { name: 'ნათელა ანანიაშვილი', role: 'საბჭოს მდივანი' },
    { name: 'გრიგორ ტატიშვილი', role: '' },
    { name: 'თინა ლეჟავა', role: '' },
    { name: 'ვიტალი ბახტაძე', role: '' },
    { name: 'ვერა ვარაზაშვილი', role: '' },
    { name: 'ირინე გურგენიძე', role: '' },
    { name: 'ნიკოლოზ ნიორაძე', role: '' },
    { name: 'ნანა ქოიავა', role: '' },
    { name: 'ვაჟა ჩაგელიშვილი', role: '' },
    { name: 'თემურ ჩახუნაშვილი', role: '' },
    { name: 'მაია ცინცაძე', role: '' },
    { name: 'ელიზავეტა ცხაკაია', role: '' },
    { name: 'დალი ძანაშვილი', role: '' },
    { name: 'გიგლა წურწუმია', role: '' },
    { name: 'სპარტაკ ხუციშვილი', role: '' },
    { name: 'შუქრი ჯაფარიძე', role: '' }
];

export default function ScientificCouncilPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>Scientific Council | IICE</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] leading-tight">
                        სამეცნიერო საბჭო
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
                                        <strong className="text-slate-900 font-bold">{member.name}</strong>
                                        {member.role && (
                                            <span className="text-slate-500 font-medium ml-2">({member.role})</span>
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
