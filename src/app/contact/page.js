'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const translations = {
        ka: {
            addressTitle: 'მისამართი',
            addressDetails: 'თბილისი 0186, საქართველო\nელიზბარ მინდელის ქუჩა #11',
            connectTitle: 'დაკავშირება',
            emailLabel: 'ელ-ფოსტა',
            phoneLabel: 'ტელეფონი',
            writeMessageTitle: 'მოგვწერეთ წერილი',
            fullNameLabel: 'სახელი და გვარი',
            fullNamePlaceholder: 'შენი სახელი',
            emailLabelForm: 'ელექტრონული ფოსტა',
            messageLabel: 'შეტყობინება',
            messagePlaceholder: 'დაწერეთ თქვენი წერილი აქ...',
            sendButton: 'გაგზავნა',
            sendingButton: 'იგზავნება...',
            sendSuccess: 'თქვენი შეტყობინება წარმატებით გაიგზავნა!',
            fillFields: 'გთხოვთ შეავსოთ ყველა ველი.',
            mapTitle: 'რუკა'
        },
        en: {
            addressTitle: 'Address',
            addressDetails: 'Tbilisi 0186, Georgia\n11 Elizbar Mindeli Street',
            connectTitle: 'Get in Touch',
            emailLabel: 'Email',
            phoneLabel: 'Phone',
            writeMessageTitle: 'Send a Message',
            fullNameLabel: 'Full Name',
            fullNamePlaceholder: 'Your name',
            emailLabelForm: 'Email Address',
            messageLabel: 'Message',
            messagePlaceholder: 'Write your message here...',
            sendButton: 'Send',
            sendingButton: 'Sending...',
            sendSuccess: 'Your message has been sent successfully!',
            fillFields: 'Please fill in all fields.',
            mapTitle: 'Map'
        }
    };

    const t = isEn ? translations.en : translations.ka;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ loading: false, success: false, error: t.fillFields });
            return;
        }

        setStatus({ loading: true, success: false, error: null });

        // Mock API call to simulate sending message
        setTimeout(() => {
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });
        }, 1200);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <title>{isEn ? 'Contact | TSU IICE' : 'კონტაქტი | TSU IICE'}</title>
            <meta name="description" content={isEn ? "Contact the R. Agladze Institute of Inorganic Chemistry and Electrochemistry. Find our address, phone number, and email." : "დაუკავშირდით რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს. მისამართი, ტელეფონი და ელ-ფოსტა."} />
            <meta property="og:title" content={isEn ? 'Contact | TSU IICE' : 'კონტაქტი | TSU IICE'} />
            <meta property="og:description" content={isEn ? "Contact the R. Agladze Institute of Inorganic Chemistry and Electrochemistry. Find our address, phone number, and email." : "დაუკავშირდით რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს. მისამართი, ტელეფონი და ელ-ფოსტა."} />
            <link rel="canonical" href="https://iice.ge/contact" />
            
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
                            <h3 className="text-sm font-extrabold text-[#5d2373] mb-2">{t.addressTitle}</h3>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-line">
                                {t.addressDetails}
                            </p>
                        </div>

                        {/* Contact Details Card */}
                        <div className="flex-1 bg-white p-6 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-50 group hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-50 text-[#5d2373] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#5d2373] group-hover:text-white transition-colors duration-300">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-extrabold text-[#5d2373] mb-2">{t.connectTitle}</h3>
                            <div className="space-y-2 mt-3">
                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                    <span className="font-bold text-[#AD49E1]">{t.emailLabel}:</span>
                                    <a href="mailto:info@iice.ge" className="hover:text-[#5d2373] transition-colors truncate">info@iice.ge</a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                    <span className="font-bold text-[#AD49E1]">{t.phoneLabel}:</span>
                                    <a href="tel:+995322123456" className="hover:text-[#5d2373] transition-colors whitespace-nowrap">+(995 32) 212 34 56</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Contact Form Panel */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-50 h-full flex flex-col">
                        <h2 className="text-lg font-extrabold text-[#5d2373] mb-5">{t.writeMessageTitle}</h2>
                        
                        {status.success && (
                            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold rounded-2xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t.sendSuccess}</span>
                            </div>
                        )}

                        {status.error && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-bold rounded-2xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{status.error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="block text-xs font-bold text-slate-700 ml-1">{t.fullNameLabel}</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t.fullNamePlaceholder} 
                                    className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-[#AD49E1] focus:ring-[#AD49E1] text-sm py-2.5 px-3 transition-colors focus:outline-none" 
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-xs font-bold text-slate-700 ml-1">{t.emailLabelForm}</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com" 
                                    className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-[#AD49E1] focus:ring-[#AD49E1] text-sm py-2.5 px-3 transition-colors focus:outline-none" 
                                />
                            </div>
                            <div className="space-y-1.5 flex-grow flex flex-col">
                                <label htmlFor="message" className="block text-xs font-bold text-slate-700 ml-1">{t.messageLabel}</label>
                                <textarea 
                                    id="message" 
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t.messagePlaceholder} 
                                    className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-[#AD49E1] focus:ring-[#AD49E1] text-sm py-2.5 px-3 transition-colors resize-none flex-grow min-h-[100px] focus:outline-none"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={status.loading}
                                className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md shadow-purple-900/10 text-sm font-extrabold text-white bg-[#5d2373] hover:bg-[#431456] focus:outline-none focus:ring-4 focus:ring-[#AD49E1]/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{status.loading ? t.sendingButton : t.sendButton}</span>
                                {!status.loading && (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Column 3: Live Interactive Map Panel */}
                    <div className="bg-white p-3 rounded-3xl shadow-xl shadow-purple-900/5 border border-purple-50 h-[400px] lg:h-auto overflow-hidden">
                        <iframe
                            title={t.mapTitle}
                            src="https://maps.google.com/maps?q=11%20Elizbar%20Mindeli%20St,%20Tbilisi&t=&z=16&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full min-h-[350px] rounded-[1.25rem] border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
}
