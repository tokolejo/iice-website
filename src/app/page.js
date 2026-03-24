'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en';
import ka from '../locales/ka';
import { departmentsData, staffData } from '../data';
import { newsData } from '../data/newsData';

// Specific icons setup for the 5 grid
const getIconForDepartment = (id) => {
  switch (id) {
    case 'applied-chemistry': return <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
    case 'fundamental-research': return <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>;
    case 'coordination-compounds': return <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'high-energy-chemistry': return <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 21V11l-8-6m14 6l-8 6m0 0v10" /></svg>;
    case 'phys-chem-analysis': return <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
    default: return <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
  }
};

export default function Home() {
  const { language } = useLanguage();
  const t = language === 'en' ? en : ka;
  const deptSliderRef = useRef(null);
  const newsSliderRef = useRef(null);
  const announcementsSliderRef = useRef(null);

  const scrollSlider = (ref, direction) => {
    if (ref && ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Filter latest news and seminars (6 of each)
  // Filter latest news and seminars (6 of each) - Sorted by date
  const latestNews = newsData
    .filter(item => item.category === 'news')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);
  const latestAnnouncements = newsData
    .filter(item => item.category === 'announcements')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* Improved and Compact Hero Section */}
      <section className="relative bg-white overflow-hidden animate-fade-in-up border-b border-slate-100 flex items-center min-h-[40vh]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight font-extrabold text-[#60318e] drop-shadow-sm">
              <span className="block xl:inline leading-tight text-[#60318e]">{t.home.heroTitle}</span>{' '}
              <span className="block text-[#7A1CAC] xl:inline leading-tight mt-1">{t.home.heroTitleHighlight}</span>
            </h1>
            <p className="mt-4 text-xs md:text-sm lg:text-sm text-text-body font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
              {t.home.heroSubtitle}
            </p>
          </div>

          {/* Image Content - More Compact */}
          <div className="w-full md:w-5/12 relative z-10 hidden md:block">
            <div className="aspect-w-16 aspect-h-7 lg:aspect-w-16 lg:aspect-h-9 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80" alt="IICE Laboratory" className="w-full h-full object-cover" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-200 rounded-full z-[-1] opacity-60 blur-xl"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full z-[-1] opacity-60 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Departments Grid (Restored and limited to 3) */}
      <section className="py-16 bg-white shrink-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 sm:gap-0">
            <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#60318e] tracking-tight uppercase">{t.nav?.departments || 'განყოფილებები'}</h2>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <Link href="/departments" className="text-[#60318e] font-bold hover:text-[#7A1CAC] transition-colors uppercase text-xs sm:text-sm tracking-wide">
                {language === 'en' ? 'All Departments' : 'ყველა განყოფილება'} &rarr;
              </Link>
              <div className="flex gap-2">
                <button aria-label="Previous Slide" onClick={() => scrollSlider(deptSliderRef, 'left')} className="p-1.5 sm:p-2 border-2 border-[#AD49E1] text-[#AD49E1] rounded-full hover:bg-[#AD49E1] hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button aria-label="Next Slide" onClick={() => scrollSlider(deptSliderRef, 'right')} className="p-1.5 sm:p-2 border-2 border-[#AD49E1] text-[#AD49E1] rounded-full hover:bg-[#AD49E1] hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          </div>

          <div
            ref={deptSliderRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar style-hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {departmentsData.map((dept) => {
              const head = staffData.find(s => s.departmentId === dept.id && s.isHead);
              const headName = language === 'en' && head?.nameEn ? head.nameEn : head?.name;
              const deptName = language === 'en' ? dept.nameEn : dept.name;

              return (
                <Link href={`/departments/${dept.id}`} key={dept.id} className="w-full min-w-full sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)] block group snap-start shrink-0">
                  <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover-scale flex flex-col p-6 transition-all duration-300 hover:shadow-xl hover:border-[#AD49E1] relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-slate-50 text-[#AD49E1] rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#60318e] group-hover:text-white transition-colors duration-300 border border-slate-100">
                        {getIconForDepartment(dept.id)}
                      </div>
                      <div className="flex-grow pt-1">
                        <h3 className="text-sm md:text-base font-extrabold text-slate-900 leading-tight group-hover:text-[#663191] transition-colors line-clamp-3">
                          {deptName}
                        </h3>
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News & Announcements Sliders */}
      <section className="py-16 bg-slate-50 shrink-0 border-t border-purple-100/50 animate-fade-in-up flex-grow" style={{ animationDelay: '0.2s' }}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* სიახლეები (News) */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 sm:gap-0">
              <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#663191] tracking-tight uppercase">
                {language === 'en' ? 'Latest News' : 'სიახლეები'}
              </h2>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <Link href="/news" className="text-[#663191] font-bold hover:text-[#AD49E1] transition-colors uppercase text-xs sm:text-sm tracking-wide">
                  {language === 'en' ? 'See All News' : 'ყველა სიახლე'} &rarr;
                </Link>
                <div className="flex gap-2">
                  <button aria-label="Previous Slide" onClick={() => scrollSlider(newsSliderRef, 'left')} className="p-1.5 sm:p-2 border-2 border-[#AD49E1] text-[#AD49E1] rounded-full hover:bg-[#AD49E1] hover:text-white transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button aria-label="Next Slide" onClick={() => scrollSlider(newsSliderRef, 'right')} className="p-1.5 sm:p-2 border-2 border-[#AD49E1] text-[#AD49E1] rounded-full hover:bg-[#AD49E1] hover:text-white transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={newsSliderRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar style-hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {latestNews.map(news => (
                <div key={news.id} className="w-full min-w-full sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)] flex-1 bg-white rounded-[20px] shadow-sm border border-slate-200 overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-900/10 hover:border-[#663191] transition-all duration-300 group flex flex-col snap-start shrink-0">
                  <div className="h-[220px] w-full relative overflow-hidden flex items-center justify-center">
                    {news.imageUrl && !news.imageUrl.includes('placeholder.jpg') ? (
                      <img 
                        src={news.imageUrl?.startsWith('/') ? `/iice-website${news.imageUrl}` : news.imageUrl} 
                        alt={language === 'en' ? news.titleEn : news.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#60318e] to-[#8c3ab8] flex items-center justify-center relative overflow-hidden">
                        {/* Elegant Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#AD49E1] rounded-full mix-blend-screen filter blur-3xl opacity-70"></div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
                        
                        {/* Elegant Icon */}
                        <div className="relative z-10 p-5 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                          <svg className="w-10 h-10 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#60318e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-[10px] md:text-[11px] text-[#663191] font-extrabold uppercase mb-2 md:mb-3 tracking-widest">{news.date}</div>
                    <h3 className="font-extrabold text-sm md:text-[18px] text-slate-900 mb-2 md:mb-4 leading-snug line-clamp-2">
                      {language === 'en' ? news.titleEn : news.title}
                    </h3>
                    <p className="text-xs md:text-[14px] text-slate-600 leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-3">
                      {language === 'en' ? news.descriptionEn : news.description}
                    </p>
                    <Link href="/news" className="self-start text-[#663191] border-2 border-[#663191] px-6 py-2.5 rounded-full text-xs font-bold uppercase transition-colors hover:bg-[#663191] hover:text-white">
                      {language === 'en' ? 'Read More' : 'ვრცლად'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-slate-200 mb-16"></div>

          {/* ანონსები (Announcements/Seminars) */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 sm:gap-0">
              <h2 className="text-2xl font-extrabold text-[#663191] tracking-tight uppercase">
                {language === 'en' ? 'Announcements' : 'ანონსები'}
              </h2>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <Link href="/news" className="text-[#663191] font-bold hover:text-[#AD49E1] transition-colors uppercase text-xs sm:text-sm tracking-wide">
                  {language === 'en' ? 'See All Announcements' : 'ყველა ანონსი'} &rarr;
                </Link>
                <div className="flex gap-2">
                  <button aria-label="Previous Slide" onClick={() => scrollSlider(announcementsSliderRef, 'left')} className="p-1.5 sm:p-2 border-2 border-[#AD49E1] text-[#AD49E1] rounded-full hover:bg-[#AD49E1] hover:text-white transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button aria-label="Next Slide" onClick={() => scrollSlider(announcementsSliderRef, 'right')} className="p-1.5 sm:p-2 border-2 border-[#AD49E1] text-[#AD49E1] rounded-full hover:bg-[#AD49E1] hover:text-white transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={announcementsSliderRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar style-hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {latestAnnouncements.map(news => (
                <div key={news.id} className="w-full min-w-full sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)] flex-1 bg-white rounded-[20px] shadow-sm border border-slate-200 overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-900/10 hover:border-[#663191] transition-all duration-300 group flex flex-col snap-start shrink-0">
                  <div className="h-[220px] w-full relative overflow-hidden flex items-center justify-center">
                    {news.imageUrl && !news.imageUrl.includes('placeholder.jpg') ? (
                      <img 
                        src={news.imageUrl?.startsWith('/') ? `/iice-website${news.imageUrl}` : news.imageUrl} 
                        alt={language === 'en' ? news.titleEn : news.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#60318e] to-[#8c3ab8] flex items-center justify-center relative overflow-hidden">
                        {/* Elegant Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#AD49E1] rounded-full mix-blend-screen filter blur-3xl opacity-70"></div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
                        
                        {/* Elegant Icon */}
                        <div className="relative z-10 p-5 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                          <svg className="w-10 h-10 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#663191] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                        {language === 'en' ? 'ACADEMIC' : 'აკადემიური'}
                      </span>
                    </div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#60318e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center shadow-sm">
                        <span className="text-[10px] font-black text-[#663191]">{new Date(news.date).getDate()}</span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase">{new Date(news.date).toLocaleString(language === 'en' ? 'en-US' : 'ka-GE', { month: 'short' })}</span>
                      </div>
                      <div className="h-4 w-px bg-slate-200"></div>
                      <div className="text-[10px] text-[#AD49E1] font-bold uppercase tracking-widest">
                        {language === 'en' ? 'Announcement' : 'ანონსი'}
                      </div>
                    </div>
                    <h3 className="font-extrabold text-sm md:text-lg text-slate-900 mb-2 leading-tight group-hover:text-[#663191] transition-colors line-clamp-2">
                      {language === 'en' ? news.titleEn : news.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {language === 'en' ? news.descriptionEn : news.description}
                    </p>
                    <Link href={`/news/${news.id}`} className="flex items-center gap-2 text-[#663191] font-bold text-xs uppercase group/btn">
                      <span>{language === 'en' ? 'Read Details' : 'დეტალურად'}</span>
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            .style-hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
          `}} />
        </div>
      </section>

    </div>
  );
}
