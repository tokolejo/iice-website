'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { ChevronDown } from 'lucide-react';

export default function ImportantProjectsPage() {
    const [openIndex, setOpenIndex] = useState(1); // 1 is default open based on mock

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>Important Projects | IICE</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#60318e] leading-tight">
                        მნიშვნელოვანი პროექტები
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl space-y-6">

                    {/* Accordion 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
                        <button
                            className="w-full flex items-center justify-between p-6 md:p-8 bg-white hover:bg-slate-50 transition-colors"
                            onClick={() => toggleAccordion(0)}
                        >
                            <h4 className="text-[#60318e] font-bold text-lg md:text-xl uppercase text-left pr-4">
                                მიმდინარე პროექტები
                            </h4>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${openIndex === 0 ? 'bg-[#AD49E1] text-white rotate-180' : 'bg-slate-100 text-[#60318e]'}`}>
                                <ChevronDown size={20} />
                            </div>
                        </button>
                        {openIndex === 0 && (
                            <div className="overflow-hidden">
                                <div className="p-6 md:p-8 pt-0 border-t border-slate-100">
                                    <p className="text-slate-600 text-lg">ინფორმაცია მალე განახლდება.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Accordion 2 */}
                    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden animate-fade-in-up ${openIndex === 1 ? 'border-[#663191]' : 'border-slate-200'}`} style={{ animationDelay: '0.1s' }}>
                        <button
                            className="w-full flex items-center justify-between p-6 md:p-8 bg-white hover:bg-slate-50 transition-colors"
                            onClick={() => toggleAccordion(1)}
                        >
                            <h4 className="text-[#663191] font-bold text-lg md:text-xl uppercase text-left pr-4">
                                ინდუსტრიულ პარტნიორებთან კოლაბორაციაში განხორციელებული პროექტები
                            </h4>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${openIndex === 1 ? 'bg-[#AD49E1] text-white rotate-180' : 'bg-slate-100 text-[#60318e]'}`}>
                                <ChevronDown size={20} />
                            </div>
                        </button>
                        {openIndex === 1 && (
                            <div className="overflow-hidden">
                                <div className="p-6 md:p-8 pt-0 border-t border-slate-100">

                                    <div className="space-y-8">
                                        <p className="text-lg font-bold text-slate-900 border-l-4 border-l-[#663191] pl-4">
                                            გარემოსდაცვითი და აგრარული მიმართულების პროექტების შესახებ თსუ რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში
                                        </p>

                                        <div>
                                            <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">საბიუჯეტო დაფინანსების ფარგლებში:</h5>
                                            <div className="space-y-4 text-slate-700 text-lg leading-relaxed text-justify">
                                                <p>
                                                    უკანასკნელი ხუთი წლის განმავლობაში ინსტიტუტში მიმდინარეობს სამუშაოთა ციკლი:
                                                    „პლასტმასებისა და ცელულოზის შემცველი ნარჩენების (თხილისა და კაკლის ნაჭუჭი, ნექტარინისა და ატმის კურკები, ხის ნახერხი და ა.შ.) თერმოქიმიური კონვერსიით განვითარებული ზედაპირის მქონე სორბენტების მიღება ნახშირბადოვანი ფხვნილოვანი მასალების სახით და მათი აპლიკაციები: ა) სორბენტებად - სასმელი და ჩამდინარე წყლების მძიმე მეტალების იონებისა და ფარმაცევტული ნარჩენებისაგან გასასუფთავებლად; ბ) დოპინგებად - კომპოზიციური ელექტროქიმიური დანაფარების მიღებისთვის“.
                                                </p>
                                                <p>
                                                    2022-2023 წლებში დადგენილი იქნა ზემოთ აღნიშნული ნახშირბადოვანი მასალების სელექტურობა მძიმე ლითონების, კერძოდ, Pb++, Cu++, Fe++, Co++, Cd++ - იონებისა და წყალში ხსნადი ანტიბიოტიკების მიმართ.
                                                </p>
                                                <p>
                                                    ამ მიმართულებით საქართველოს მეცნიერებათა ეროვნული აკადემიის მიერ გამოცხადებულ კონკურსში 2024 წლის საუკეთესო პროექტის სტატუსის მოსაპოვებლად წარდგენილია პროექტი: #GE0009: „Development of sorbents for capturing carbon dioxide and catalysts for its utilization by methane into syngas“.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">საერთაშორისო კერძო დაკვეთები:</h5>
                                            <div className="space-y-4 text-slate-700 text-lg leading-relaxed text-justify">
                                                <p>
                                                    2021–2022 წლებში ინსტიტუტში განხორციელდა სამუშაო საერთაშორისო ორგანიზაცია <strong>Neos Group, Inc.</strong> - EMEA located at Loft Offices Building 2, Suite 204, Dubai Media City, Dubai, United Arab Emirates -ის დაკვეთით, მათი პროექტის: Research and development project in areas of utilizing green hydrogen technology for electricity generation, storage, transportation and distribution („მწვანე წყალბადის ტექნოლოგიის გამოყენება ელექტროენერგიის წარმოების, შენახვის, ტრანსპორტირების და განაწილების სფეროში“), [კონტრაქტების ნომრები: NS-HYDR-2107, NS-HYDR-2108, NS-HYDR-2109].
                                                </p>
                                                <p>
                                                    2023 წელს ამ სამუშაოს გაგრძელება მოხდა ინსტიტუტის წლიურ გეგმაში მისი შეტანით და იგი გაგრძელდება 2024 წელსაც. მიზანია შემუშავებული ტექნოლოგიის პატენტუნარიანობის მიღწევა.
                                                </p>
                                                <p>
                                                    კლიმატის ცვლილებების შემსუბუქებასთან დაკავშირებულ გადაწყვეტილებების მიღებასა და სუფთა ენერგიის გამომუშავებაში ოპერირებადი კანადური კომპანიის <strong>Planetary Technology Inc.</strong>-ის დაკვეთით დაფინანსდა პროექტი: „ზღვის წყალში ტუტიანობის განსაზღვრის მეთოდოლოგიის შემუშავება ეკოლოგიურად უსაფრთხო ელექტროქიმიური ტექნოლოგიის გამოყენებით“ (ხელშეკრულება № 2023-01, 01.05.2023).
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}
