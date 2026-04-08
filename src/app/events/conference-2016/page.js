'use client';

import { useLanguage } from '../../../context/LanguageContext';
import { FileText, Download, Calendar, MapPin, Image as ImageIcon, Presentation } from 'lucide-react';

export default function Conference2016() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const translations = {
        ka: {
            title: "საერთაშორისო სამეცნიერო კონფერენცია",
            subtitle: "თანამედროვე კვლევები და მათი გამოყენების პერსპექტივები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში",
            description: "კონფერენცია ეძღვნება რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის 60 წლისთავს.",
            date: "21-23 სექტემბერი, 2016",
            location: "ურეკი, საქართველო",
            materials: "კონფერენციის მასალები და გამოცემები",
            documents: "დამატებითი მასალები",
            photos: "ფოტო მასალა",
            presentation: "პრეზენტაცია",
            program: "კონფერენციის პროგრამა",
            circular: "ცირკულარი",
            tezis: "თეზისები"
        },
        en: {
            title: "International Scientific Conference",
            subtitle: "Modern researches and prospects of their use in chemistry, chemical engineering and related fields",
            description: "The conference is dedicated to the 60th anniversary of R. Agladze Institute of Inorganic Chemistry and Electrochemistry.",
            date: "September 21-23, 2016",
            location: "Ureki, Georgia",
            materials: "Conference Materials and Publications",
            documents: "Additional Materials",
            photos: "Photo Materials",
            presentation: "Presentation",
            program: "Conference Program",
            circular: "Circular",
            tezis: "Theses"
        }
    };

    const t = isEn ? translations.en : translations.ka;

    return (
        <div className="bg-slate-50 min-h-screen pb-16 w-full overflow-hidden flex flex-col">
            {/* Hero Section */}
            <div className="bg-[#60318e] text-white pt-12 pb-16 md:pt-16 md:pb-24 relative overflow-hidden shadow-md w-full flex-shrink-0">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 animate-fade-in-up leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-lg md:text-2xl font-medium text-purple-100 max-w-4xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {t.subtitle}
                    </p>
                    <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {t.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                            <Calendar size={20} className="text-purple-200" />
                            <span className="font-semibold">{t.date}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                            <MapPin size={20} className="text-purple-200" />
                            <span className="font-semibold">{t.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 w-full mb-10 text-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 border border-gray-100">
                    
                    {/* Books/Journals Grid */}
                    <div className="mb-16">
                        <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6">
                            <FileText className="text-[#AD49E1]" size={36}/>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#60318e] text-center">
                                {t.materials}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                            {/* Book 1 */}
                            <a 
                                href="/conference-2016/chemical-series-volume-42-3.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="w-full max-w-[280px] aspect-[1/1.4] rounded-lg overflow-hidden shadow-md mb-6 relative">
                                    <img 
                                        src="/conference-2016/chemical-series-volume-42-3.jpg" 
                                        alt="Chemical Series Volume 42-3"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-[#60318e] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/90 rounded-full p-4 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                            <Download size={20} className="text-[#60318e]" />
                                            <span className="font-bold text-[#60318e] text-sm hidden group-hover:block px-2">PDF</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-[#AD49E1] transition-colors line-clamp-2">
                                    Chemical Series Volume 42-3
                                </h3>
                            </a>

                            {/* Book 2 */}
                            <a 
                                href="/conference-2016/chemical-series-volume-42-4.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="w-full max-w-[280px] aspect-[1/1.4] rounded-lg overflow-hidden shadow-md mb-6 relative">
                                    <img 
                                        src="/conference-2016/chemical-series-volume-42-4.jpg" 
                                        alt="Chemical Series Volume 42-4"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-[#60318e] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/90 rounded-full p-4 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                            <Download size={20} className="text-[#60318e]" />
                                            <span className="font-bold text-[#60318e] text-sm hidden group-hover:block px-2">PDF</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-[#AD49E1] transition-colors line-clamp-2">
                                    Chemical Series Volume 42-4
                                </h3>
                            </a>
                        </div>
                    </div>

                    {/* Documents Library */}
                    <div>
                        <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6">
                            <FileText className="text-[#AD49E1]" size={36}/>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                                {t.documents}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                            {[
                                { file: "21-22-23 september programm 070916.pdf", title: t.program, icon: <Calendar size={24} /> },
                                { file: "CIRKULAR6.docx", title: t.circular, icon: <FileText size={24} /> },
                                { file: "photos-ureki-13.11.16-2.pdf", title: t.photos, icon: <ImageIcon size={24} /> },
                                { file: "prez.- konferencia.pdf", title: t.presentation, icon: <Presentation size={24} /> },
                            ].map((doc, idx) => (
                                <a 
                                    key={idx}
                                    href={`/conference-2016/${doc.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 hover:shadow-md transition-all group relative overflow-hidden"
                                >
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#AD49E1] shadow-sm group-hover:scale-110 group-hover:bg-[#AD49E1] group-hover:text-white transition-all z-10 flex-shrink-0">
                                        {doc.icon}
                                    </div>
                                    <div className="flex-1 min-w-0 z-10">
                                        <h4 className="font-bold text-gray-800 text-sm truncate group-hover:text-[#60318e] transition-colors">
                                            {doc.title}
                                        </h4>
                                        <div className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${doc.file.endsWith('.pdf') ? 'text-red-500' : 'text-blue-500'}`}>
                                            {doc.file.split('.').pop()} FILE
                                        </div>
                                    </div>
                                    <Download size={18} className="text-[#AD49E1] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all z-10 flex-shrink-0"/>
                                    
                                    {/* Hover background element */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-60 transition-opacity z-0 pointer-events-none"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
