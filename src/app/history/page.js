'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const directors = [
    { name: 'აკადემიის წევრ-კორესპონდენტი გრიგორ ტატიშვილი', years: '2006 - დღემდე', img: 'https://iice.ge/wp-content/uploads/2026/director/g.tatishvili.jpg' },
    { name: 'აკადემიკოსი ჯონდო ჯაფარიძე', years: '1996 - 2006', img: 'https://iice.ge/wp-content/uploads/2026/director/j.jafaridze.jpg' },
    { name: 'აკადემიის წევრ-კორესპონდენტი ლევან ჯაფარიძე', years: '1980 - 1996', img: 'https://iice.ge/wp-content/uploads/2026/director/l.jafaridze.jpg' },
    { name: 'აპოლონ ავალიანი', years: '1972 - 1980', img: 'https://iice.ge/wp-content/uploads/2026/director/a.avaliani.jpg' },
    { name: 'აკადემიკოსი ნიკოლოზ ლანდია', years: '1960 - 1972', img: 'https://iice.ge/wp-content/uploads/2026/director/n.landia.jpg' },
    { name: 'აკადემიკოსი რაფიელ აგლაძე', years: '1956 - 1960', img: 'https://iice.ge/wp-content/uploads/2026/director/r.agladze.jpg' }
];

export default function HistoryPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>History | IICE</title>
            </Head>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#2E073F] leading-tight">
                        ინსტიტუტის ისტორია
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12 max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#2E073F] animate-fade-in-up" id="section-1">
                            <p className="text-lg text-slate-700 leading-relaxed text-justify">
                                ინსტიტუტი დაარსებულია 1956 წელს, გამოეყო რა 1946 წელს დაფუძნებულ ლითონისა და სამთო საქმის ინსტიტუტს და თავდაპირველად ეწოდა საქართველოს მეცნიერებათა აკადემიის გამოყენებითი ქიმიისა და ელექტროქიმიის ინსტიტუტი, შემდგომში კი - საქართველოს მეცნიერებათა აკადემიის რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი. დაარსების მიზანი იყო ქვეყნის სასარგებლო წიაღისეულიდან კონკურენტუნარიანი პროდუქტების მიღების ტექნოლოგიების შემუშავების ამოცანების გადაწყვეტისთვის.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up">
                            <h3 className="text-xl font-bold text-[#2E073F] mb-6 uppercase">ინსტიტუტში შექმნილი ტექნოლოგიები განხორციელდა მსხვილი წარმოებების სახით:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700 text-lg">პირველად ევროპაში გაშვებულ იქნა ზესტაფონის ელექტროლიზური ლითონური მანგანუმის საამქრო, რომელიც მთლიანად უზრუნველყოფდა ამ პროდუქტზე სსრკ-ს და აღმოსავლეთ ევროპის მოთხოვნილებას;</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700 text-lg">რუსთავის ს/გ "აზოტში" ამუშავდა კალიუმის პერმანგანატის ელექტროქიმიური მიღების საამქრო (ფარავდა სსრკ მოთხოვნილების 1/3);</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#2E073F] font-bold mr-3 mt-1">•</span>
                                    <span className="text-slate-700 text-lg">რუსთავის ს/გ “აზოტში” გაეშვა ელექტროლიზური მანგანუმის დიოქსიდის საცდელ-სამრეწველო საამქრო.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#2E073F] animate-fade-in-up">
                            <p className="text-lg text-slate-700 leading-relaxed text-justify">
                                1984 -დან 2006 წლის ჩათვლით (ანუ საქართველოში განათლების და მეცნიერების მოწყობის მოდელის ძირეულად შეცვლამდე) ინსტიტუტში ფუნქციონირებდა სამეცნიერო ხარისხების მიმნიჭებელი საკვალიფიკაციო საბჭო, რომელიც იყო ერთადერთი კავკასიის რეგიონში ელექტროქიმიის, ელექტროქიმიური ტექნოლოგიისა და არაორგანული ნივთიერებების ტექნოლოგიის დარგებში. მასზე დაცულია 85 საკანდიდატო, 12 სადოქტორო დისერტაცია.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up">
                            <h3 className="text-xl font-bold text-[#2E073F] mb-6 uppercase">განვითარების შესაბამისად კვლევები გამრავალფეროვნდა:</h3>
                            <p className="text-lg text-slate-700 leading-relaxed text-justify">
                                ქიმიურ და ელექტროქიმიურ სისტემებში მუხტის გადატანის კვანტურ-მექანიკური თეორია და ექსპერიმენტი, ლითონ-ხსნარის აღნაგობა, ორგანულ და არაორგანულ ნაერთთა ადსორბცია, ელექტროქიმიური კინეტიკა, ელექტროკრისტალიზაცია, თერმოქიმია, რადიაციულ-ქიმიური გარდაქმნები, ბიოლოგიურად აქტიური კოორდინაციული ნაერთების სინთეზი და მათი ფიზიკურ - ქიმიური თვისებები, საქართველოს სასარგებლო წიაღისეულიდან ძვირადღირებული ნაერთების მიღების მეცნიერული წინაპირობების შექმნა, ქიმიური წარმოებების ჩამდინარი წყლების გაწმენდა და ტოქსიკური ნარჩენების უტილიზაცია და სხვა.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#2E073F] animate-fade-in-up">
                            <h3 className="text-xl font-bold text-[#2E073F] mb-6 uppercase">საერთაშორისო პროექტები და თანამშრომლობა:</h3>
                            <p className="text-lg text-slate-700 leading-relaxed text-justify mb-4">
                                დამოუკიდებელი საქართველოს პირობებში ინსტიტუტი ფართოდ მონაწილეობდა და ამჟამადაც ახორციელებს თანამშრომლობას საერთაშორისო პროექტების ფარგლებში. მათ შორისაა ევროკავშირის მეშვიდე ჩარჩო პროგრამის (FP7), ბრიტანული დახურული ბირთვული ქალაქების პროგრამის (CNCP), შვეიცარიის სამეცნიერო ფონდის დაფინანსებით განხორციელებული პროექტები. ასევე საპარტნიორო პროექტები აშშ ენერგეტიკის დეპარტამენტის, ნაციონალური ლაბორატორიების (ლივერმორის, ლოს ალამოსის) და კერძო ინვესტორების (Long Arc Technology, G3C Technology, Planetary Technology In) დაფინანსებით.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed text-justify">
                                შემუშავდა ქვეყანაში წყალბადის ენერგეტიკის განვითარების გეგმა და გამოიცა საქართველოს პრეზიდენტის განკარგულება № 1087 (4 სექტემბერი 2003 წელი) “საქართველოში წყალბადის ენერგეტიკის განვითარების, საერთაშორისო ორგანიზაციებთან და კომპანიებთან თანამშრომლობის და ინტეგრაციული პროცესების გაღრმავების ღონისძიებათა შესახებ”.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up">
                            <p className="text-lg text-slate-700 leading-relaxed text-justify">
                                მეცნიერებათა აკადემიის სისტემაში ინსტიტუტი ვითარდებოდა 2006 წლამდე. საქართველოს მთავრობის 2006 წლის 16 მარტის N58 დადგენილებით შეიქმნა სსიპ რაფიელ აგლაძის არაორგანული ქიმიის და ელექტროქიმიის ინსტიტუტი, რომელიც 2010 წლის 9 ივლისის N185 დადგენილებით რეორგანიზებულ იქნა სსიპ ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის დამოუკიდებელ სამეცნიერო-კვლევით ერთეულად.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 border-l-4 border-l-[#2E073F] animate-fade-in-up">
                            <h3 className="text-xl font-bold text-[#2E073F] mb-6 uppercase">2015 - 2024 წლების სამეცნიერო პროგრამა:</h3>
                            <p className="text-lg text-slate-700 leading-relaxed text-justify mb-4">
                                ინსტიტუტმა განხორციელა სახელმწიფო სამეცნიერო კვლევების ათწლიანი პროგრამა, რომლის ფარგლებშიც 3.3-ჯერ გაიზარდა საბიუჯეტო დაფინანსება. პროგრამამ მოიცვა: მეტალების ნანოფხვნილების მიღება; ნანომასალების მიღება აფეთქებით; ახალი თაობის ლითიუმ-იონური აკუმულატორებისათვის საკათოდე მასალების შემუშავება; სუპერკონდენსატორები; სათბობის ტიპის დენის წყაროები; კოორდინაციული და კომპიუტერული ქიმია; კატალიზი; არაწყალხსნართა ელექტროქიმია; ადგილობრივი წიაღისეულის გადამუშავება და სხვა.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed text-justify">
                                ამჟამად მიმდინარეობს ახალი მრავალწლიანი პროგრამის შემუშავება, რომლის სამი ძირითადი საფუძველი იქნება თანამედროვე ენერგეტიკული, წიაღისეულის და ნარჩენების გადამუშავების და ეკოლოგიის პრობლემები.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fade-in-up" id="directors">
                            <h3 className="text-xl font-bold text-[#2E073F] mb-6 uppercase">დირექტორები სხვადასხვა დროს იყვნენ:</h3>
                            <div className="flex flex-col gap-4">
                                {directors.map((dir, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-4 transition-colors">
                                        <div className="flex items-center gap-4 mb-2 sm:mb-0">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
                                                <Image src={dir.img} alt={dir.name} width={56} height={56} className="object-cover w-full h-full" unoptimized />
                                            </div>
                                            <span className="text-slate-800 font-semibold text-lg">{dir.name}</span>
                                        </div>
                                        <span className="text-[#AD49E1] font-bold bg-[#EBD3F8]/30 px-3 py-1 rounded-full text-sm sm:ml-4 flex-shrink-0">
                                            {dir.years}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Placeholder */}
                    <div className="lg:col-span-1 sticky top-24">
                        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
                            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest mb-6">სარჩევი</h4>
                            <div className="flex flex-col gap-4">
                                <a href="https://iice.ge/wp-content/uploads/2026/documents/eleqtrochemistry-skola.docx" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 bg-[#EBD3F8]/30 text-[#2E073F] rounded-lg hover:bg-[#EBD3F8]/50 transition-colors text-sm font-semibold">
                                    <span className="text-lg">📥</span>
                                    <span>საქართველოში ელექტროქიმიური სამეცნიერო სკოლის განვითარების ეტაპები (DOCX)</span>
                                </a>
                                <div className="border-t border-slate-100 my-2"></div>
                                <a href="#section-1" className="text-slate-600 hover:text-[#AD49E1] font-semibold transition-colors py-2">
                                    ინსტიტუტის ისტორია
                                </a>
                                <a href="#directors" className="text-slate-600 hover:text-[#AD49E1] font-semibold transition-colors py-2">
                                    დირექტორები
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
