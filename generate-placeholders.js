const fs = require('fs');
const path = require('path');

const routes = [
  'history',
  'mission',
  'structure',
  'administration',
  'scientific-council',
  'statute',
  'reports',
  'studies-internships',
  'important-projects',
  'collaboration',
  'events/seminars',
  'events/conference',
  'infrastructure',
  'news',
  'contact'
];

const getKaName = (r) => {
  const map = {
    'history': 'ისტორია',
    'mission': 'მისია',
    'structure': 'სტრუქტურა',
    'administration': 'ადმინისტრაცია',
    'scientific-council': 'სამეცნიერო საბჭო',
    'statute': 'ინსტიტუტის დებულება',
    'reports': 'სამეცნიერო ანგარიშები',
    'studies-internships': 'სწავლა/სტაჟირება',
    'important-projects': 'მნიშვნელოვანი პროექტები',
    'collaboration': 'კოლაბორაცია',
    'events/seminars': 'სემინარები',
    'events/conference': 'კონფერენცია',
    'infrastructure': 'ინფრასტრუქტურა',
    'news': 'სიახლეები',
    'contact': 'კონტაქტი'
  };
  return map[r] || r;
};

const getNavKey = (r) => {
  const map = {
    'history': 'history',
    'mission': 'mission',
    'structure': 'structure',
    'administration': 'administration',
    'scientific-council': 'scientificCouncil',
    'statute': 'statute',
    'reports': 'scientificReports',
    'studies-internships': 'studiesInternships',
    'important-projects': 'importantProjects',
    'collaboration': 'collaboration',
    'events/seminars': 'seminars',
    'events/conference': 'conference',
    'infrastructure': 'infrastructure',
    'news': 'news',
    'contact': 'contact'
  };
  return map[r] || r;
};

const template = (routeName, kaName, navKey) => `'use client';
import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en';
import ka from '../locales/ka';

export default function EnhancedPlaceholderPage() {
  const { language } = useLanguage();
  const t = language === 'en' ? en : ka;
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-purple-100 py-12 md:py-16 mb-12 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
            {t.nav.home} / {t.nav['${navKey}'] || '${routeName.replace(/[-/]/g, ' ')}'}
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight capitalize">
             {language === 'en' ? '${routeName.replace(/[-/]/g, ' ')}' : '${kaName}'}
          </h1>
        </div>
      </div>

      {/* Visual Test Layout Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100 p-8 md:p-12 hover:shadow-lg transition-shadow">
          
           {/* Large Hero Image for the content block */}
           <div className="w-full h-64 md:h-96 bg-purple-50 rounded-2xl mb-10 overflow-hidden shadow-inner border border-purple-100 flex items-center justify-center relative group">
              <img src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&q=80" alt="Test Layout" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80"></div>
              <h3 className="absolute bottom-8 left-8 text-white font-extrabold text-3xl drop-shadow-md">
                 {language === 'en' ? 'Visual Test Layout' : 'ვიზუალური სატესტო განლაგება'}
              </h3>
           </div>

           {/* Typography and Paragraphs */}
           <div className="prose prose-purple max-w-none text-text-body">
              <p className="text-lg leading-relaxed mb-6">
                 {language === 'en' 
                    ? 'This is a high-fidelity visual test layout requested to see how content will look on this page. The typography, spacings, and imagery here are just placeholders meant to demonstrate the beautiful design system, allowing you to visualize the final look.' 
                    : 'ეს არის მაღალი ხარისხის ვიზუალური სატესტო განლაგება, რათა დაინახოთ როგორ გამოჩნდება კონტენტი ამ გვერდზე. აქ გამოყენებული ტიპოგრაფია, დაშორებები და სურათი არის მხოლოდ დიზაინის სისტემის დემონსტრირებისთვის, რაც საშუალებას გაძლევთ აღიქვათ საბოლოო იერსახე.'}
              </p>
              
              {/* Simulated Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:-translate-y-1 transition-transform">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm text-primary flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                       </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{language === 'en' ? 'Test Informational Block 1' : 'საინფორმაციო ტესტ-ბლოკი 1'}</h4>
                    <p>{language === 'en' ? 'Testing card-based content block within the page to visualize structured data.' : 'ბარათის ტიპის კონტენტის ბლოკის ტესტირება გვერდის შიგნით სტრუქტურირებული მონაცემებისთვის.'}</p>
                 </div>
                 <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 hover:-translate-y-1 transition-transform">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm text-primary flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <h4 className="text-xl font-bold text-primary mb-3">{language === 'en' ? 'Test Highlight Block 2' : 'გამორჩეული ტესტ-ბლოკი 2'}</h4>
                    <p>{language === 'en' ? 'Testing highlight block with primary branding colors for important announcements.' : 'გამოყოფილი ბლოკის ტესტირება ბრენდის ძირითადი ფერებით მნიშვნელოვანი განცხადებებისთვის.'}</p>
                 </div>
              </div>
              
              <p className="text-lg leading-relaxed border-l-4 border-primary pl-4 py-2 mt-8 bg-slate-50 rounded-r-lg">
                 <strong>{language === 'en' ? 'Notice:' : 'შენიშვნა:'}</strong> {language === 'en' ? 'Real content will be dynamically loaded or statically added here soon by the administration.' : 'რეალური კონტენტი მალე დაემატება დინამიურად ან სტატიკურად ადმინისტრაციის მიერ.'}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
`;

const baseDir = path.join(__dirname, 'src', 'app');

routes.forEach(route => {
  const isNested = route.includes('/');
  const kaName = getKaName(route);
  const navKey = getNavKey(route);

  let targetDir = path.join(baseDir, route);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, 'page.js');

  const importDepth = isNested ? '../../context/LanguageContext' : '../context/LanguageContext';
  const localeDepth = isNested ? '../../locales' : '../locales';

  const content = template(route, kaName, navKey)
    .replace('../context/LanguageContext', importDepth)
    .replace('../locales/en', localeDepth + '/en')
    .replace('../locales/ka', localeDepth + '/ka');

  fs.writeFileSync(filePath, content);
  console.log('Created: ', filePath);
});

console.log('Enhanced visual placeholders generated successfully!');
