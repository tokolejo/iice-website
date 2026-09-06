'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en';
import ka from '../locales/ka';
import { departmentsData as fallbackDepts, staffData as fallbackStaff } from '../data';
import { newsData as fallbackNews } from '../data/newsData';
import { getDynamicNews } from '../lib/supabase/news';
import { getDynamicDepartments, getDynamicStaff } from '../lib/supabase/staff';
import ScrollReveal from '../components/ScrollReveal';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import {
  Sparkles,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Clock,
  Landmark,
  Download
} from 'lucide-react';

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
  const [selectedNews, setSelectedNews] = useState(null);

  const [departments, setDepartments] = useState(fallbackDepts);
  const [staff, setStaff] = useState(fallbackStaff);
  const [news, setNews] = useState(fallbackNews);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getDynamicDepartments(),
      getDynamicStaff(),
      getDynamicNews()
    ]).then(([d, s, n]) => {
      if (isMounted) {
        if (d && d.length > 0) setDepartments(d);
        if (s && s.length > 0) setStaff(s);
        if (n && n.length > 0) setNews(n);
      }
    }).catch(err => console.warn('Homepage dynamic load notice:', err));
    return () => { isMounted = false; };
  }, []);

  const scrollSlider = (ref, direction) => {
    if (ref && ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Filter latest news and seminars (6 combined) - Sorted by date
  const latestNews = news
    .filter(item => item.category === 'news' || item.category === 'seminars')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* Improved and Compact Hero Section */}
      <section className="relative animated-gradient-bg overflow-hidden border-b border-slate-100 flex items-center min-h-[40vh]">
        {/* Floating decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-float-blob-slow pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-200/30 rounded-full blur-3xl animate-float-blob-reverse pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-pink-100/20 rounded-full blur-3xl animate-float-blob pointer-events-none"></div>

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full relative z-10">
          {/* Text Content */}
          <ScrollReveal direction="left" duration={800} className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight font-extrabold text-[#60318e] drop-shadow-sm">
              <span className="block xl:inline leading-tight text-[#60318e]">{t.home.heroTitle}</span>{' '}
              <span className="block text-[#7A1CAC] xl:inline leading-tight mt-1">{t.home.heroTitleHighlight}</span>
            </h1>
            <p className="mt-4 text-xs md:text-sm lg:text-sm text-text-body font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
              {t.home.heroSubtitle}
            </p>
          </ScrollReveal>

          {/* Image Content - More Compact */}
          <ScrollReveal direction="right" duration={800} delay={200} className="w-full md:w-5/12 relative hidden md:block">
            <div className="aspect-w-16 aspect-h-7 lg:aspect-w-16 lg:aspect-h-9 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80" alt="IICE Laboratory" className="w-full h-full object-cover" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-200 rounded-full z-[-1] opacity-60 blur-xl animate-float-blob"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full z-[-1] opacity-60 blur-xl animate-float-blob-reverse"></div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2026 Conference High-Priority Featured Banner / Hero Card */}
      <section className="relative z-20 -mt-4 sm:-mt-6 mb-6 px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto w-full">
        <ScrollReveal direction="up" duration={700}>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#150325] via-[#2d0a44] to-[#4a146e] p-6 sm:p-8 lg:p-10 text-white shadow-2xl border border-purple-400/25 ring-1 ring-white/10">
            {/* Ambient Background Glows */}
            <div className="absolute -right-16 -top-16 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left Column: Academic & Event Narrative */}
              <div className="max-w-3xl space-y-4">
                {/* Status Badge Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide bg-gradient-to-r from-amber-400/20 via-purple-500/20 to-amber-400/10 text-amber-300 border border-amber-400/40 shadow-sm backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 animate-pulse" />
                  <span>
                    {language === 'en'
                      ? '3rd International Scientific Conference 2026'
                      : '2026 წლის საერთაშორისო სამეცნიერო კონფერენცია'}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white leading-snug tracking-tight drop-shadow-sm">
                  {language === 'en'
                    ? '3rd International Scientific Conference: "Modern Trends in Chemistry, Chemical Technologies and Related Fields: Green Energy Prospects, Ecological Sustainability, Food Safety. 2026"'
                    : 'მე-3 საერთაშორისო სამეცნიერო კონფერენცია: „თანამედროვე ტენდენციები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში: მწვანე ენერგეტიკის პერსპექტივები, ეკოლოგიური მდგრადობა, სურსათის უვნებელობა. 2026“'}
                </h2>

                {/* 70th Anniversary Commemorative Card */}
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border-l-4 border-amber-400 rounded-r-2xl py-2 px-4 backdrop-blur-sm">
                  <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-amber-200 leading-snug">
                    {language === 'en'
                      ? 'Dedicated to the 70th anniversary of the founding of Rafael Agladze Institute of Inorganic Chemistry and Electrochemistry (1956–2026)'
                      : 'ეძღვნება რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წლისთავს (1956–2026)'}
                  </span>
                </div>

                {/* Key Metrics & Details Chips */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-semibold text-purple-100">
                  <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-md shadow-xs">
                    <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'November 25–27, 2026'
                        : '25–27 ნოემბერი, 2026'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-md shadow-xs">
                    <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Tbilisi (TSU) & Telavi (Telavi State University)'
                        : 'თბილისი (თსუ) & თელავი (თესაუ)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-400/30 backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      {language === 'en' ? 'Free Participation' : 'მონაწილეობა უფასოა'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 text-purple-200 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-md shadow-xs">
                    <Landmark className="w-4 h-4 text-amber-300 flex-shrink-0" />
                    <span>
                      {language === 'en' ? 'Rustaveli Foundation ISE-26-286' : 'შოთა რუსთაველის ფონდი [ISE-26-286]'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Executive Interactive Action Card */}
              <div className="flex-shrink-0 w-full lg:w-80 bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {language === 'en' ? 'Call for Abstracts' : 'მიღება აქტიურია'}
                    </span>
                    <span className="text-[10px] font-bold text-purple-200 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-400/30">
                      6 {language === 'en' ? 'Sections' : 'სექცია'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'en' ? 'Submission Deadline' : 'აბსტრაქტის მიღების ბოლო ვადა'}</span>
                    </div>
                    <p className="text-lg font-black text-white">
                      {language === 'en' ? 'October 10, 2026' : '10 ოქტომბერი, 2026'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-1 border-t border-white/10">
                  <Link
                    href="/conference-2026"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-400/30 transition-all duration-200 group/btn cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Register & Details' : 'ვრცლად & რეგისტრაცია'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>

                  <a
                    href="/conference-2026/Abstract-template GEO.doc"
                    download
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors border border-white/15"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === 'en' ? 'Abstract Template (.DOC)' : 'აბსტრაქტის შაბლონი (.DOC)'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Departments Grid (Restored and limited to 3) */}
      <section className="py-16 bg-white shrink-0">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 sm:gap-0">
            <ScrollReveal><h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#60318e] tracking-tight uppercase">{t.nav?.departments || 'განყოფილებები'}</h2></ScrollReveal>
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
            {departments.map((dept) => {
              const head = staff.find(s => s.departmentId === dept.id && s.isHead);
              const headName = language === 'en' && head?.nameEn ? head.nameEn : head?.name;
              const deptName = language === 'en' ? dept.nameEn : dept.name;

              return (
                <Link href={`/departments/${dept.id}`} key={dept.id} className="w-full min-w-full sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)] block group snap-start shrink-0">
                  <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover-scale flex flex-col p-6 transition-all duration-300 hover:shadow-xl hover:border-[#AD49E1] relative card-hover-glow">
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
      <section className="py-16 bg-slate-50 shrink-0 border-t border-purple-100/50 flex-grow">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* სიახლეები (News) */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 sm:gap-0">
              <ScrollReveal><h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-[#663191] tracking-tight uppercase">
                {language === 'en' ? 'Latest News' : 'სიახლეები'}
              </h2></ScrollReveal>
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
                <div key={news.id} className="w-full min-w-full sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)] snap-start shrink-0">
                  <NewsCard item={news} onClick={() => setSelectedNews(news)} compact={true} />
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

      {selectedNews && (
        <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      )}

    </div>
  );
}
