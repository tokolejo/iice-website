'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

const directors = [
    { name: 'აკადემიის წევრ-კორესპონდენტი გრიგორ ტატიშვილი', nameEn: 'Corresponding Member of the Academy Grigor Tatishvili', years: '2006 - დღემდე', yearsEn: '2006 - Present', img: 'https://iice.ge/wp-content/uploads/2026/director/g.tatishvili.jpg' },
    { name: 'აკადემიკოსი ჯონდო ჯაფარიძე', nameEn: 'Academician Jondo Japaridze', years: '1996 - 2006', yearsEn: '1996 - 2006', img: 'https://iice.ge/wp-content/uploads/2026/director/j.jafaridze.jpg' },
    { name: 'აკადემიის წევრ-კორესპონდენტი ლევან ჯაფარიძე', nameEn: 'Corresponding Member of the Academy Levan Japaridze', years: '1980 - 1996', yearsEn: '1980 - 1996', img: 'https://iice.ge/wp-content/uploads/2026/director/l.jafaridze.jpg' },
    { name: 'აპოლონ ავალიანი', nameEn: 'Apollon Avaliani', years: '1972 - 1980', yearsEn: '1972 - 1980', img: 'https://iice.ge/wp-content/uploads/2026/director/a.avaliani.jpg' },
    { name: 'აკადემიკოსი ნიკოლოზ ლანდია', nameEn: 'Academician Nikoloz Landia', years: '1960 - 1972', yearsEn: '1960 - 1972', img: 'https://iice.ge/wp-content/uploads/2026/director/n.landia.jpg' },
    { name: 'აკადემიკოსი რაფიელ აგლაძე', nameEn: 'Academician Rafael Agladze', years: '1956 - 1960', yearsEn: '1956 - 1960', img: 'https://iice.ge/wp-content/uploads/2026/director/r.agladze.jpg' }
];

export default function HistoryPage() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>{isEn ? 'History | IICE' : 'ისტორია | IICE'}</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] leading-tight">
                        {isEn ? 'History of the Institute' : 'ინსტიტუტის ისტორია'}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12 max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#60318e] animate-fade-in-up" id="section-1">
                            <p className="text-base text-slate-700 leading-relaxed text-justify">
                                {isEn ?
                                    "The Institute was founded in 1956, separating from the Institute of Metal and Mining established in 1946. It was initially named the Institute of Applied Chemistry and Electrochemistry of the Georgian Academy of Sciences, and later - the Rafael Agladze Institute of Inorganic Chemistry and Electrochemistry of the Georgian Academy of Sciences. The goal of its establishment was to solve the tasks of developing technologies for obtaining competitive products from the country's useful minerals." :
                                    "ინსტიტუტი დაარსებულია 1956 წელს, გამოეყო რა 1946 წელს დაფუძნებულ ლითონისა და სამთო საქმის ინსტიტუტს და თავდაპირველად ეწოდა საქართველოს მეცნიერებათა აკადემიის გამოყენებითი ქიმიისა და ელექტროქიმიის ინსტიტუტი, შემდგომში კი - საქართველოს მეცნიერებათა აკადემიის რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი. დაარსების მიზანი იყო ქვეყნის სასარგებლო წიაღისეულიდან კონკურენტუნარიანი პროდუქტების მიღების ტექნოლოგიების შემუშავების ამოცანების გადაწყვეტისთვის."
                                }
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up">
                            <h3 className="text-lg font-bold text-[#60318e] mb-6 uppercase">
                                {isEn ? 'Technologies created in the institute were implemented in the form of large productions:' : 'ინსტიტუტში შექმნილი ტექნოლოგიები განხორციელდა მსხვილი წარმოებების სახით:'}
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700 text-base">{isEn ? 'For the first time in Europe, the Zestafoni electrolytic metallic manganese workshop was launched, which fully met the demand for this product in the USSR and Eastern Europe;' : 'პირველად ევროპაში გაშვებულ იქნა ზესტაფონის ელექტროლიზური ლითონური მანგანუმის საამქრო, რომელიც მთლიანად უზრუნველყოფდა ამ პროდუქტზე სსრკ-ს და აღმოსავლეთ ევროპის მოთხოვნილებას;'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700 text-base">{isEn ? 'An electrochemical potassium permanganate workshop was launched at the Rustavi \'Azot\' enterprise (covering 1/3 of the USSR demand);' : 'რუსთავის ს/გ "აზოტში" ამუშავდა კალიუმის პერმანგანატის ელექტროქიმიური მიღების საამქრო (ფარავდა სსრკ მოთხოვნილების 1/3);'}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#60318e] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700 text-base">{isEn ? 'A pilot-industrial workshop for electrolytic manganese dioxide was launched at the Rustavi \'Azot\' enterprise.' : 'რუსთავის ს/გ “აზოტში” გაეშვა ელექტროლიზური მანგანუმის დიოქსიდის საცდელ-სამრეწველო საამქრო.'}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#60318e] animate-fade-in-up">
                            <p className="text-base text-slate-700 leading-relaxed text-justify">
                                {isEn ?
                                    "From 1984 to 2006 (i.e. until the fundamental change of the model of education and science arrangement in Georgia), a qualification council granting scientific degrees functioned in the institute, which was the only one in the Caucasus region in the fields of electrochemistry, electrochemical technology, and inorganic substance technology. 85 candidate and 12 doctoral dissertations were defended there." :
                                    "1984 -დან 2006 წლის ჩათვლით (ანუ საქართველოში განათლების და მეცნიერების მოწყობის მოდელის ძირეულად შეცვლამდე) ინსტიტუტში ფუნქციონირებდა სამეცნიერო ხარისხების მიმნიჭებელი საკვალიფიკაციო საბჭო, რომელიც იყო ერთადერთი კავკასიის რეგიონში ელექტროქიმიის, ელექტროქიმიური ტექნოლოგიისა და არაორგანული ნივთიერებების ტექნოლოგიის დარგებში. მასზე დაცულია 85 საკანდიდატო, 12 სადოქტორო დისერტაცია."
                                }
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up">
                            <h3 className="text-lg font-bold text-[#60318e] mb-6 uppercase">
                                {isEn ? 'In accordance with the development, the research became diverse:' : 'განვითარების შესაბამისად კვლევები გამრავალფეროვნდა:'}
                            </h3>
                            <p className="text-base text-slate-700 leading-relaxed text-justify">
                                {isEn ?
                                    "Quantum-mechanical theory and experiment of charge transfer in chemical and electrochemical systems, metal-solution structure, adsorption of organic and inorganic compounds, electrochemical kinetics, electrocrystallization, thermochemistry, radiation-chemical transformations, synthesis of biologically active coordination compounds and their physico-chemical properties, creation of scientific prerequisites for obtaining valuable compounds from Georgian useful minerals, purification of chemical production wastewater and utilization of toxic waste, etc." :
                                    "ქიმიურ და ელექტროქიმიურ სისტემებში მუხტის გადატანის კვანტურ-მექანიკური თეორია და ექსპერიმენტი, ლითონ-ხსნარის აღნაგობა, ორგანულ და არაორგანულ ნაერთთა ადსორბცია, ელექტროქიმიური კინეტიკა, ელექტროკრისტალიზაცია, თერმოქიმია, რადიაციულ-ქიმიური გარდაქმნები, ბიოლოგიურად აქტიური კოორდინაციული ნაერთების სინთეზი და მათი ფიზიკურ - ქიმიური თვისებები, საქართველოს სასარგებლო წიაღისეულიდან ძვირადღირებული ნაერთების მიღების მეცნიერული წინაპირობების შექმნა, ქიმიური წარმოებების ჩამდინარი წყლების გაწმენდა და ტოქსიკური ნარჩენების უტილიზაცია და სხვა."
                                }
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#60318e] animate-fade-in-up">
                            <h3 className="text-lg font-bold text-[#60318e] mb-6 uppercase">
                                {isEn ? 'International projects and collaboration:' : 'საერთაშორისო პროექტები და თანამშრომლობა:'}
                            </h3>
                            <p className="text-base text-slate-700 leading-relaxed text-justify mb-4">
                                {isEn ?
                                    "Under the conditions of independent Georgia, the institute participated widely and currently collaborates within the framework of international projects. These include projects funded by the EU Seventh Framework Programme (FP7), the British Closed Nuclear Cities Programme (CNCP), and the Swiss Science Foundation. Also, partnership projects funded by the US Department of Energy, national laboratories (Livermore, Los Alamos) and private investors (Long Arc Technology, G3C Technology, Planetary Technology In)." :
                                    "დამოუკიდებელი საქართველოს პირობებში ინსტიტუტი ფართოდ მონაწილეობდა და ამჟამადაც ახორციელებს თანამშრომლობას საერთაშორისო პროექტების ფარგლებში. მათ შორისაა ევროკავშირის მეშვიდე ჩარჩო პროგრამის (FP7), ბრიტანული დახურული ბირთვული ქალაქების პროგრამის (CNCP), შვეიცარიის სამეცნიერო ფონდის დაფინანსებით განხორციელებული პროექტები. ასევე საპარტნიორო პროექტები აშშ ენერგეტიკის დეპარტამენტის, ნაციონალური ლაბორატორიების (ლივერმორის, ლოს ალამოსის) და კერძო ინვესტორების (Long Arc Technology, G3C Technology, Planetary Technology In) დაფინანსებით."
                                }
                            </p>
                            <p className="text-base text-slate-700 leading-relaxed text-justify">
                                {isEn ?
                                    "A plan for the development of hydrogen energy in the country was developed, and the Decree of the President of Georgia No. 1087 (September 4, 2003) 'On the Action for the Development of Hydrogen Energy in Georgia, Deepening Cooperation and Integration Processes with International Organizations and Companies' was issued." :
                                    "შემუშავდა ქვეყანაში წყალბადის ენერგეტიკის განვითარების გეგმა და გამოიცა საქართველოს პრეზიდენტის განკარგულება № 1087 (4 სექტემბერი 2003 წელი) “საქართველოში წყალბადის ენერგეტიკის განვითარების, საერთაშორისო ორგანიზაციებთან და კომპანიებთან თანამშრომლობის და ინტეგრაციული პროცესების გაღრმავების ღონისძიებათა შესახებ”."
                                }
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up">
                            <p className="text-base text-slate-700 leading-relaxed text-justify">
                                {isEn ?
                                    "In the system of the Academy of Sciences, the institute developed until 2006. By the Resolution No. 58 of the Government of Georgia of March 16, 2006, the LEPL Rafael Agladze Institute of Inorganic Chemistry and Electrochemistry was established, which was reorganized by the Resolution No. 185 of July 9, 2010, into an independent scientific-research unit of the LEPL Ivane Javakhishvili Tbilisi State University." :
                                    "მეცნიერებათა აკადემიის სისტემაში ინსტიტუტი ვითარდებოდა 2006 წლამდე. საქართველოს მთავრობის 2006 წლის 16 მარტის N58 დადგენილებით შეიქმნა სსიპ რაფიელ აგლაძის არაორგანული ქიმიის და ელექტროქიმიის ინსტიტუტი, რომელიც 2010 წლის 9 ივლისის N185 დადგენილებით რეორგანიზებულ იქნა სსიპ ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის დამოუკიდებელ სამეცნიერო-კვლევით ერთეულად."
                                }
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#60318e] animate-fade-in-up">
                            <h3 className="text-lg font-bold text-[#60318e] mb-6 uppercase">
                                {isEn ? '2015 - 2024 Scientific Program:' : '2015 - 2024 წლების სამეცნიერო პროგრამა:'}
                            </h3>
                            <p className="text-base text-slate-700 leading-relaxed text-justify mb-4">
                                {isEn ?
                                    "The institute implemented a ten-year state scientific research program, within the framework of which budget funding increased 3.3 times. The program included: obtaining metal nanopowders; obtaining nanomaterials by explosion; development of cathode materials for next-generation lithium-ion batteries; supercapacitors; fuel cell type power sources; coordination and computer chemistry; catalysis; non-aqueous electrochemistry; processing of local minerals, etc." :
                                    "ინსტიტუტმა განხორციელა სახელმწიფო სამეცნიერო კვლევების ათწლიანი პროგრამა, რომლის ფარგლებშიც 3.3-ჯერ გაიზარდა საბიუჯეტო დაფინანსება. პროგრამამ მოიცვა: მეტალების ნანოფხვნილების მიღება; ნანომასალების მიღება აფეთქებით; ახალი თაობის ლითიუმ-იონური აკუმულატორებისათვის საკათოდე მასალების შემუშავება; სუპერკონდენსატორები; სათბობის ტიპის დენის წყაროები; კოორდინაციული და კომპიუტერული ქიმია; კატალიზი; არაწყალხსნართა ელექტროქიმია; ადგილობრივი წიაღისეულის გადამუშავება და სხვა."
                                }
                            </p>
                            <p className="text-base text-slate-700 leading-relaxed text-justify">
                                {isEn ?
                                    "Currently, the development of a new multi-year program is underway, the three main pillars of which will be modern energetic, mineral and waste processing, and environmental problems." :
                                    "ამჟამად მიმდინარეობს ახალი მრავალწლიანი პროგრამის შემუშავება, რომლის სამი ძირითადი საფუძველი იქნება თანამედროვე ენერგეტიკული, წიაღისეულის და ნარჩენების გადამუშავების და ეკოლოგიის პრობლემები."
                                }
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up" id="directors">
                            <h3 className="text-lg font-bold text-[#60318e] mb-6 uppercase">
                                {isEn ? 'Directors at different times were:' : 'დირექტორები სხვადასხვა დროს იყვნენ:'}
                            </h3>
                            <div className="flex flex-col gap-4">
                                {directors.map((dir, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-4 transition-colors">
                                        <div className="flex items-center gap-4 mb-2 sm:mb-0">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
                                                <Image src={dir.img} alt={dir.name} width={56} height={56} className="object-cover w-full h-full" unoptimized />
                                            </div>
                                            <span className="text-slate-800 font-semibold text-base">{isEn ? dir.nameEn : dir.name}</span>
                                        </div>
                                        <span className="text-[#AD49E1] font-bold bg-[#EBD3F8]/30 px-3 py-1 rounded-full text-sm sm:ml-4 flex-shrink-0">
                                            {isEn ? dir.yearsEn : dir.years}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Placeholder */}
                    <div className="lg:col-span-1 sticky top-24">
                        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
                            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest mb-6">
                                {isEn ? 'Table of Contents' : 'სარჩევი'}
                            </h4>
                            <div className="flex flex-col gap-4">
                                <a href="https://iice.ge/wp-content/uploads/2026/documents/eleqtrochemistry-skola.docx" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 bg-[#EBD3F8]/30 text-[#60318e] rounded-lg hover:bg-[#EBD3F8]/50 transition-colors text-sm font-semibold">
                                    <span className="text-base">📥</span>
                                    <span>{isEn ? 'Stages of development of the electrochemical scientific school in Georgia (DOCX)' : 'საქართველოში ელექტროქიმიური სამეცნიერო სკოლის განვითარების ეტაპები (DOCX)'}</span>
                                </a>
                                <div className="border-t border-slate-100 my-2"></div>
                                <a href="#section-1" className="text-slate-600 hover:text-[#AD49E1] font-semibold transition-colors py-2">
                                    {isEn ? 'History of the Institute' : 'ინსტიტუტის ისტორია'}
                                </a>
                                <a href="#directors" className="text-slate-600 hover:text-[#AD49E1] font-semibold transition-colors py-2">
                                    {isEn ? 'Directors' : 'დირექტორები'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
