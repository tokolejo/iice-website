'use client';

import Head from 'next/head';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>{isEn ? 'Contact | TSU IICE' : 'კონტაქტი | TSU IICE'}</title>
                <meta name="description" content={isEn ? "Contact the R. Agladze Institute of Inorganic Chemistry and Electrochemistry. Find our address, phone number, and email." : "დაუკავშირდით რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს. მისამართი, ტელეფონი და ელ-ფოსტა."} />
                <meta property="og:title" content={isEn ? 'Contact | TSU IICE' : 'კონტაქტი | TSU IICE'} />
                <meta property="og:description" content={isEn ? "Contact the R. Agladze Institute of Inorganic Chemistry and Electrochemistry. Find our address, phone number, and email." : "დაუკავშირდით რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს. მისამართი, ტელეფონი და ელ-ფოსტა."} />
                <link rel="canonical" href="https://iice.ge/contact" />
            </Head>
            {/* Page Header */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-16 mb-8 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#60318e] leading-tight mb-4">
                        {language === 'en' ? 'Contact' : 'კონტაქტი'}
                    </h1>
                    <p className="text-sm md:text-sm text-[#60318e]/70 max-w-2xl mx-auto font-medium">
                        {language === 'en' ? 'Contact us anytime. We are ready to answer your questions and discuss collaboration details.' : 'დაგვიკავშირდით ნებისმიერ დროს. ჩვენ მზად ვართ ვუპასუხოთ თქვენს კითხვებს და განვიხილოთ თანამშრომლობის დეტალები.'}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">

                    {/* Column 1: Contact Info Cards */}
                    <div className="space-y-6 flex flex-col h-full">
                        {/* Address Card */}
                        <div className="flex-1 bg-white p-6 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-50 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-50 text-[#5d2373] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#5d2373] group-hover:text-white transition-colors duration-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-extrabold text-[#5d2373] mb-2">მისამართი</h3>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                თბილისი 0186, საქართველო<br />
                                ივ. ჯავახიშვილის თბილისის სახელმწიფო უნივერსიტეტი<br />
                                ქავთარაძის ქ. ილია ვეკუას #11
                            </p>
                        </div>

                        {/* Contact Details Card */}
                        <div className="flex-1 bg-white p-6 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-50 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-50 text-[#5d2373] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#5d2373] group-hover:text-white transition-colors duration-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-extrabold text-[#5d2373] mb-2">დაკავშირება</h3>
                            <div className="space-y-2 mt-3">
                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                    <span className="font-bold text-[#AD49E1]">ელ-ფოსტა:</span>
                                    <a href="mailto:info@iice.ge" className="hover:text-[#5d2373] transition-colors truncate">info@iice.ge</a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                    <span className="font-bold text-[#AD49E1]">ტელეფონი:</span>
                                    <a href="tel:+995322123456" className="hover:text-[#5d2373] transition-colors whitespace-nowrap">+(995 32) 212 34 56</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Contact Form Panel */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-50 h-full flex flex-col">
                        <h2 className="text-lg font-extrabold text-[#5d2373] mb-5">მოგვწერეთ წერილი</h2>
                        <form className="space-y-4 flex-grow flex flex-col">
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="block text-xs font-bold text-slate-700 ml-1">სახელი და გვარი</label>
                                <input type="text" id="name" placeholder="შენი სახელი" className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-[#AD49E1] focus:ring-[#AD49E1] text-sm py-2.5 px-3 transition-colors" />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-xs font-bold text-slate-700 ml-1">ელექტრონული ფოსტა</label>
                                <input type="email" id="email" placeholder="example@email.com" className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-[#AD49E1] focus:ring-[#AD49E1] text-sm py-2.5 px-3 transition-colors" />
                            </div>
                            <div className="space-y-1.5 flex-grow flex flex-col">
                                <label htmlFor="message" className="block text-xs font-bold text-slate-700 ml-1">შეტყობინება</label>
                                <textarea id="message" placeholder="დაწერეთ თქვენი წერილი აქ..." className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-[#AD49E1] focus:ring-[#AD49E1] text-sm py-2.5 px-3 transition-colors resize-none flex-grow min-h-[100px]"></textarea>
                            </div>
                            <button type="button" className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md shadow-purple-900/10 text-sm font-extrabold text-white bg-[#5d2373] hover:bg-[#431456] focus:outline-none focus:ring-4 focus:ring-[#AD49E1]/30 transition-all transform hover:-translate-y-0.5">
                                <span>გაგზავნა</span>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </form>
                    </div>

                    {/* Column 3: Map Placeholder Panel */}
                    <div className="bg-white p-3 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-50 h-[400px] lg:h-auto">
                        {/* Dummy Map Area */}
                        <div className="w-full h-full min-h-[300px] bg-[#f8fafc] rounded-[1.25rem] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 relative overflow-hidden group">
                            <svg className="w-10 h-10 mb-2 text-[#AD49E1]/50 group-hover:scale-110 !transition-transform !duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <span className="font-bold text-sm tracking-wide text-slate-500">რუკის სივრცე</span>
                            <span className="text-xs mt-1 px-4 text-center text-slate-400">აქ განთავსდება Google Maps</span>

                            {/* Decorative map elements */}
                            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-md shadow flex flex-col items-center justify-center gap-0.5 opacity-50">
                                <div className="w-4 h-0.5 bg-slate-300"></div>
                                <div className="w-4 h-0.5 bg-slate-300"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
