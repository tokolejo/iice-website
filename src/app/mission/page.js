'use client';

import React from 'react';
import Head from 'next/head';
import { useLanguage } from '../../context/LanguageContext';

export default function MissionPage() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>{isEn ? 'Mission | IICE' : 'მისია | IICE'}</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] leading-tight">
                        {isEn ? 'Mission of the Institute' : 'ინსტიტუტის მისია'}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-8 border-l-4 border-l-[#60318e] animate-fade-in-up">
                        <p className="text-base text-slate-700 leading-relaxed text-justify">
                            {isEn ?
                                "The mission of the institute is to provide a scientific foundation for new technologies in the field of inorganic chemistry and electrochemistry. The strategic focus of research is directed towards research in inorganic chemistry and electrochemistry for sustainable energy, agriculture, health, and ecology. The institute is a key research center for the transition to a sustainable, decarbonized economy, handling tasks from efficient renewable energy production-storage to new ecological chemical production." :
                                "ინსტიტუტის მისიაა არაორგანული ქიმიის და ელექტროქიმიის დარგში ახალი ტექნოლოგიებისთვის სამეცნიერო ფუნდამენტის უზრუნველყოფა. კვლევების სტრატეგიული ფოკუსი მიმართულია არაორგანულ ქიმიაში და ელექტროქიმიაში კვლევებისკენ მდგრადი ენერგეტიკის, სოფლის მეურნეობის, ჯანმრთელობის და ეკოლოგიისთვის. ინსტიტუტი წარმოადგენს საკვანძო კვლევით ცენტრს მდგრად, დეკარბონიზებულ ეკონომიკაზე გადასასვლელად, რომელიც ამუშავებს ამოცანებს განახლებადი ენერგიის ეფექტური წარმოება - შენახვიდან ახალ ეკოლოგიურ ქიმიურ წარმოებებამდე."
                            }
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-8 animate-fade-in-up">
                        <p className="text-base text-slate-700 leading-relaxed text-justify">
                            {isEn ?
                                "The priority directions of the institute are balanced between global trends, national interests, and our own experience (expertise). The criteria for choosing priorities are: the presence of a critically necessary number of specialists with unique competence; infrastructural support (the existence of unique research tools, installations, devices, and laboratories, and the possibility of creating new ones)." :
                                "ინსტიტუტის პრიორიტეტული მიმართულებები დაბალანსებულია გლობალურ ტრენდებს, ეროვნულ ინტერესებს და საკუთარ გამოცდილებას (ექპერტიზას) შორის. პრიორიტეტების არჩევის კრიტერიუმებია: უნიკალური კომპეტენციის სპეციალისტების კრიტიკულად აუცილებელი რაოდენობის არსებობა; ინფრასტრუქტურული უზრუნველყოფა (უნიკალური კვლევითი ხელსაწყოების, დანადგარების, მოწყობილობების და ლაბორატორიების არსებობა და ახლის შექმნის შესაძლებლობა)."
                            }
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 border-t-4 border-t-[#60318e] animate-fade-in-up">
                            <h3 className="text-xl font-bold text-[#60318e] mb-6">
                                {isEn ? 'The main priorities of the institute are:' : 'ინსტიტუტის მთავარი პრიორიტეტებია:'}
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>{isEn ? 'New Generation Energy:' : 'ახალი თაობის ენერგეტიკა:'}</strong> {isEn ? 'Hydrogen energy; new types of batteries and accumulators;' : 'წყალბადის ენერგეტიკა; ახალი ტიპის ბატარეები და აკუმულატორები;'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>{isEn ? 'Circular (Green) Economy Technologies:' : 'ციკლური (მწვანე) ეკონომიკის ტექნოლოგიები:'}</strong> {isEn ? 'Recycling technologies; ecosystem monitoring and restoration.' : 'რეციკლინგის ტექნოლოგიები; ეკოსისტემების მონიტორინგი და აღდგენა.'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>{isEn ? 'Fundamental Theoretical Research:' : 'ფუნდამენტური თეორიული საფუძლების კვლევები:'}</strong> {isEn ? 'Study of charge, energy transfer, and phototransfer in irregular condensed systems (in electrolytes and electrolyte/solid interfaces).' : 'მუხტის და ენერგიის გადატანის და ფოტოგადატანის შესწავლა არარეგულარულ კონდენსირებულ სისტემებში (ელექტროლიტებში და ელექტროლიტი/მყარი სხეულის ინტერფეისზე)'}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 border-t-4 border-t-[#AD49E1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <h3 className="text-xl font-bold text-[#60318e] mb-6">
                                {isEn ? 'Main Cross-cutting Tasks:' : 'მთავარი გამჭოლი ამოცანები:'}
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>{isEn ? 'Implementation of a Full Innovation Cycle:' : 'სრული ინოვაციური ციკლის განხორციელება:'}</strong> {isEn ? 'From the idea of material synthesis - to a cell/device prototype - to testing in real conditions (jointly with industrial partners);' : 'მასალის სინთეზის იდეიდან - უჯრედის/მოწყობილობის პროტოტიპისკენ - რეალურ პირობებში შემოწმებისკენ (ერთობლივად ინდუსტრიულ პარტნიორებთან);'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>{isEn ? 'Development of Unique Research Infrastructure;' : 'უნიკალური კვლევითი ინფრასტრუქტურის განვითარება;'}</strong></span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700"><strong>{isEn ? 'Personnel and Training:' : 'კადრები და სწავლება:'}</strong> {isEn ? 'Preparation of a new generation of electrochemists possessing interdisciplinary knowledge;' : 'ელექტროქიმიკოსების ახალი თაობის მომზადება, რომლებიც ფლობენ დისციპლინათშორის ცოდნას;'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
