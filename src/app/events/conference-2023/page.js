'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { 
    FileText, 
    Download, 
    Calendar, 
    MapPin, 
    BookOpen, 
    Users, 
    GraduationCap, 
    Building2,
    CheckCircle2
} from 'lucide-react';

export default function Conference2023() {
    const { language } = useLanguage();
    const isEn = language === 'en';
    const [activeTab, setActiveTab] = useState('materials');

    const t = {
        title: isEn ? "2nd International Scientific Conference" : "II საერთაშორისო სამეცნიერო კონფერენცია",
        subtitle: isEn 
            ? "“Science, Education, Innovations and Chemical Technologies – From Idea to Implementation” 2023"
            : "„მეცნიერება, განათლება, ინოვაციები და ქიმიური ტექნოლოგიები – იდეიდან განხორციელებამდე“ 2023",
        description: isEn
            ? "Dedicated to the 108th anniversary of Academician Giorgi Tsitsishvili and the 112th anniversary of Academician Rafael Agladze."
            : "ეძღვნება აკადემიკოს გიორგი ციციშვილის დაბადებიდან 108 წლისთავს და აკადემიკოს რაფიელ აგლაძის დაბადებიდან 112 წლისთავს.",
        date: isEn ? "November 23 – 25, 2023" : "23 – 25 ნოემბერი, 2023",
        location: isEn ? "Tbilisi, Georgia (TSU)" : "თბილისი, საქართველო (თსუ)",
        tabs: {
            materials: isEn ? "Materials" : "მასალები",
            about: isEn ? "Topics" : "თემატიკა",
            speakers: isEn ? "Speakers" : "მომხსენებლები",
            school: isEn ? "Seasonal School" : "სეზონური სკოლა",
            committees: isEn ? "Committees" : "კომიტეტები",
            venue: isEn ? "Venue" : "ლოკაცია"
        },
        materialsTitle: isEn ? "Conference Materials and Publications" : "კონფერენციის მასალები და გამოცემები",
        documentsTitle: isEn ? "Official Documents & Circulars" : "დამატებითი მასალები და პროგრამა",
        aboutTitle: isEn ? "About the Conference" : "კონფერენციის შესახებ",
        aboutText: isEn
            ? "The aim of the conference is sharing the results and achievements of the latest fundamental and technological research with representatives of broad and interdisciplinary scientific schools of chemistry and related fields, planning possible joint research, based on research methodologies and experience, deepening partnership in order to create innovative technologies, among them with potential to be appropriate to framework of the regional socio-economic development strategy of “Horizon Europe”, finding potential partners in the production/applied sector to develop their interest in financing scientific/applied projects."
            : "კონფერენციის მიზანია უახლესი ფუნდამენტური და ტექნოლოგიური კვლევების შედეგებისა და მიღწევების გაზიარება ქიმიისა და მომიჯნავე დარგების ფართო და ინტერდისციპლინარული სამეცნიერო სკოლების წარმომადგენლებთან, ერთობლივი კვლევების დაგეგმვა, პარტნიორობის გაღრმავება ინოვაციური ტექნოლოგიების შესაქმნელად (მათ შორის „Horizon Europe“-ის რეგიონული სოციალურ-ეკონომიკური განვითარების სტრატეგიის ფარგლებში) და პოტენციური პარტნიორების მოძიება წარმოებასა და გამოყენებით სექტორში.",
        topicsTitle: isEn ? "Conference Topics" : "კონფერენციის თემატიკა",
        speakersTitle: isEn ? "Invited Keynote Speakers" : "მოწვეული მომხსენებლები",
        schoolTitle: isEn ? "Seasonal School for Masters and PhD Students" : "სეზონური სკოლა მაგისტრანტებისა და დოქტორანტებისთვის",
        committeesTitle: isEn ? "Committees" : "კომიტეტები",
        venueTitle: isEn ? "Venue & Host" : "ჩატარების ადგილი"
    };

    const publications = [
        {
            title: isEn ? "Abstract Book 2023" : "თეზისების კრებული 2023",
            subtitle: isEn ? "Book of Abstracts of the 2nd International Scientific Conference" : "II საერთაშორისო სამეცნიერო კონფერენციის თეზისების კრებული",
            file: "pdf-Abstract-Book-conference-2023.pdf",
            cover: "/conference-2023/abstract-book-2023.jpg"
        },
        {
            title: isEn ? "Proceedings: Chemical Series Vol. 45" : "ჟურნალი „ქიმიის სერია“, ტომი 45",
            subtitle: isEn ? "Proceedings of the National Academy of Sciences of Georgia" : "საქართველოს მეცნიერებათა ეროვნული აკადემიის მაცნე, ქიმიის სერია",
            file: "qimiis-seria-tom-45.pdf",
            cover: "/conference-2023/chemical-series-volume-45.jpg"
        }
    ];

    const documentsList = [
        { 
            file: "Program-Conference.pdf", 
            title: isEn ? "Conference Programme (PDF)" : "კონფერენციის პროგრამა (PDF)", 
            ext: "PDF", 
            color: "text-red-500" 
        },
        { 
            file: "Seassonal-school-Programm.pdf", 
            title: isEn ? "Seasonal School Programme (PDF)" : "სეზონური სკოლის პროგრამა (PDF)", 
            ext: "PDF", 
            color: "text-red-500" 
        },
        { 
            file: "სკოლა-2023-Transl-.docx", 
            title: isEn ? "Seasonal School Guidelines (DOCX)" : "სეზონური სკოლის მასალები (DOCX)", 
            ext: "DOCX", 
            color: "text-blue-500" 
        },
        { 
            file: "Template-PGNAS-ChemSer.docx", 
            title: isEn ? "Paper Submission Template (DOCX)" : "სტატიის შაბლონი - PGNAS (DOCX)", 
            ext: "DOCX", 
            color: "text-blue-500" 
        }
    ];

    const topics = [
        {
            title: isEn ? "1. Nano processes and nanotechnologies" : "1. ნანოპროცესები და ნანოტექნოლოგიები",
            items: isEn 
                ? ["Nano powders", "Nano coatings", "Nano sensors"]
                : ["ნანოფხვნილები", "ნანოდანაფარები", "ნანოსენსორები"]
        },
        {
            title: isEn ? "2. Processing of minerals & secondary raw materials" : "2. მინერალებისა და მეორადი ნედლეულის გადამუშავების საფუძვლები",
            items: isEn
                ? ["Fundamental and technological aspects of natural resources processing", "Recycling of secondary raw materials and industrial waste"]
                : ["ბუნებრივი რესურსების გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები", "მეორადი ნედლეულისა და ინდუსტრიული ნარჩენების რეციკლირება"]
        },
        {
            title: isEn ? "3. Green Chemistry & Ecology" : "3. მწვანე ქიმია და ეკოლოგია",
            items: isEn
                ? ["Innovative technologies in the development of new materials", "New methods of cleaning natural and wastewater", "Energy and ecology"]
                : ["ინოვაციური ტექნოლოგიები ახალი მასალების შექმნაში", "ბუნებრივი და ჩამდინარე წყლების გაწმენდის ახალი მეთოდები", "ენერგია და ეკოლოგია"]
        },
        {
            title: isEn ? "4. Energy" : "4. ენერგეტიკა",
            items: isEn
                ? ["Energy Sources", "Energy Conversion", "Energy Storage (Hydrogen, fuel cells, supercapacitors)"]
                : ["ენერგიის წყაროები", "ენერგიის გარდაქმნა", "ენერგიის შენახვა (წყალბადი, სათბობი ელემენტები, სუპერკონდენსატორები)"]
        },
        {
            title: isEn ? "5. Promotion & commercialization of scientific innovations" : "5. სამეცნიერო ინოვაციების ხელშეწყობა და კომერციალიზაცია",
            items: isEn
                ? ["Protection and promotion of research results", "Innovative technologies and public-private partnership", "Corporate-social responsibility in the field of innovation"]
                : ["კვლევის შედეგების დაცვა და ხელშეწყობა", "ინოვაციური ტექნოლოგიები და საჯარო-კერძო პარტნიორობა", "კორპორაციულ-სოციალური პასუხისმგებლობა ინოვაციების სფეროში"]
        }
    ];

    const keynoteSpeakers = [
        {
            name: "Prof. Dr. Fred Lisdat",
            inst: "Technical University of Applied Sciences Wildau, Germany",
            topic: isEn 
                ? "Introductory course in impedance spectroscopy and its usefulness in studying sensing interfaces"
                : "იმპედანს-სპექტროსკოპიის საფუძვლები და მისი გამოყენება სენსორული ინტერფეისების კვლევაში",
            country: isEn ? "Germany" : "გერმანია"
        },
        {
            name: "Dr. Matteo Gerlini",
            inst: "University of Siena, Italy",
            topic: isEn
                ? "International cooperation as a tool to improve educational pattern: the International Nuclear Security Education Network experience"
                : "საერთაშორისო თანამშრომლობა საგანმანათლებლო მოდელის გასაუმჯობესებლად: INSEN-ის გამოცდილება",
            country: isEn ? "Italy" : "იტალია"
        },
        {
            name: "Prof. Dr. Arkadiusz Modrzejewski",
            inst: "University of Gdansk, Poland",
            topic: isEn
                ? "Publication strategy: how to publish the scientific article being a young scholar"
                : "საგამომცემლო სტრატეგია: როგორ გამოვაქვეყნოთ სამეცნიერო სტატია ახალგაზრდა მეცნიერმა",
            country: isEn ? "Poland" : "პოლონეთი"
        },
        {
            name: "Prof. Dr. Sylwia M. Mrozowska",
            inst: "Vice-Rector for Innovation, University of Gdansk, Poland",
            topic: isEn
                ? "Transferable skills for early-career researchers: Challenges and Recommendations"
                : "ტრანსფერული უნარები ახალგაზრდა მკვლევრებისთვის: გამოწვევები და რეკომენდაციები",
            country: isEn ? "Poland" : "პოლონეთი"
        },
        {
            name: "Dr. Venko Beschkov",
            inst: "Institute of Chemical Engineering, Bulgarian Academy of Sciences, Sofia",
            topic: isEn
                ? "Carbon dioxide recycling in fuel cell application"
                : "ნახშირორჟანგის რეციკლირება სათბობ ელემენტებში გამოყენებისათვის",
            country: isEn ? "Bulgaria" : "ბულგარეთი"
        },
        {
            name: "Prof. Dr. Eldar Ismailov",
            inst: "Institute of Catalysis and Inorganic Chemistry, ANAS, Azerbaijan",
            topic: isEn
                ? "Catalytic hydrogenation of carbon dioxide: Achievements and prospects"
                : "ნახშირორჟანგის კატალიზური ჰიდრირება: მიღწევები და პერსპექტივები",
            country: isEn ? "Azerbaijan" : "აზერბაიჯანი"
        },
        {
            name: "Dr. Marina Nalbandyan",
            inst: "Yerevan Haybusak University / National Academy of Sciences of Armenia",
            topic: isEn
                ? "Modern methods of assessing the impact of air/water/soil pollution on human health"
                : "გარემოს დაბინძურების ზეგავლენის შეფასების თანამედროვე მეთოდები ადამიანის ჯანმრთელობაზე",
            country: isEn ? "Armenia" : "სომხეთი"
        },
        {
            name: "Dr. Merab Kutsia",
            inst: "Head of Department of Inventions, Sakpatenti, Georgia",
            topic: isEn
                ? "Intellectual property – from Idea to Innovation"
                : "ინტელექტუალური საკუთრება – იდეიდან ინოვაციამდე",
            country: isEn ? "Georgia" : "საქართველო"
        },
        {
            name: "Levan Jioshvili",
            inst: "World Bank Consultant, Georgia’s Innovation and Technology Agency (GITA)",
            topic: isEn
                ? "Technology Transfer in Georgia: Problems and Opportunities"
                : "ტექნოლოგიების ტრანსფერი საქართველოში: პრობლემები და შესაძლებლობები",
            country: isEn ? "Georgia" : "საქართველო"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-16 w-full overflow-hidden flex flex-col">
            <title>{isEn ? '2nd International Scientific Conference 2023 | IICE' : 'II საერთაშორისო სამეცნიერო კონფერენცია 2023 | IICE'}</title>

            {/* Hero Section - Exact text sizes and styling from 2016 */}
            <div className="bg-[#60318e] text-white pt-10 pb-14 md:pt-14 md:pb-20 relative overflow-hidden shadow-md w-full flex-shrink-0">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 animate-fade-in-up leading-snug text-white max-w-4xl mx-auto">
                        {t.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-purple-100 max-w-3xl mx-auto mb-5 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
                        {t.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                        {t.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white">
                            <Calendar size={20} className="text-purple-200" />
                            <span className="font-semibold">{t.date}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white">
                            <MapPin size={20} className="text-purple-200" />
                            <span className="font-semibold">{t.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 w-full mb-10 text-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 border border-gray-100">
                    
                    {/* Thematic Tabs Navigation - Clean Grid without any scrollbar */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 mb-12 w-full max-w-5xl mx-auto">
                        {Object.entries(t.tabs).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`w-full py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-center flex items-center justify-center ${
                                    activeTab === key
                                        ? 'bg-[#60318e] text-white shadow-md font-extrabold'
                                        : 'text-slate-600 hover:text-[#60318e] hover:bg-white'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Tab 1: Publications & Documents */}
                    {activeTab === 'materials' && (
                        <div className="space-y-16 animate-fade-in text-center">
                            
                            {/* Books/Journals Grid */}
                            <div>
                                <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6">
                                    <FileText className="text-[#AD49E1]" size={36}/>
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#60318e] text-center">
                                        {t.materialsTitle}
                                    </h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                                    {publications.map((pub, idx) => (
                                        <a 
                                            key={idx}
                                            href={`/conference-2023/${pub.file}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="group flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2"
                                        >
                                            <div className="w-full max-w-[280px] aspect-[1/1.35] rounded-lg overflow-hidden shadow-md mb-6 relative bg-white">
                                                <img 
                                                    src={pub.cover} 
                                                    alt={pub.title}
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
                                            <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-[#AD49E1] transition-colors line-clamp-2 mb-1">
                                                {pub.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 line-clamp-2">
                                                {pub.subtitle}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Documents Library */}
                            <div>
                                <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6">
                                    <FileText className="text-[#AD49E1]" size={36}/>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                                        {t.documentsTitle}
                                    </h2>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left max-w-4xl mx-auto">
                                    {documentsList.map((doc, idx) => (
                                        <a 
                                            key={idx}
                                            href={`/conference-2023/${doc.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 hover:shadow-md transition-all group relative overflow-hidden"
                                        >
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#AD49E1] shadow-sm group-hover:scale-110 group-hover:bg-[#AD49E1] group-hover:text-white transition-all z-10 flex-shrink-0 font-bold text-xs">
                                                {doc.ext}
                                            </div>
                                            <div className="flex-1 min-w-0 z-10">
                                                <h4 className="font-bold text-gray-800 text-sm truncate group-hover:text-[#60318e] transition-colors">
                                                    {doc.title}
                                                </h4>
                                                <div className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${doc.color}`}>
                                                    {doc.ext} FILE
                                                </div>
                                            </div>
                                            <Download size={18} className="text-[#AD49E1] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all z-10 flex-shrink-0"/>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-60 transition-opacity z-0 pointer-events-none"></div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Tab 2: About & Topics */}
                    {activeTab === 'about' && (
                        <div className="space-y-10 animate-fade-in text-left max-w-4xl mx-auto">
                            <div>
                                <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6 text-center">
                                    <BookOpen className="text-[#AD49E1]" size={36}/>
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#60318e] text-center">
                                        {t.aboutTitle}
                                    </h2>
                                </div>
                                
                                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 text-slate-700 text-sm md:text-base leading-relaxed text-justify mb-10">
                                    <p>{t.aboutText}</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg md:text-xl font-bold text-[#60318e] mb-4">
                                        {t.topicsTitle}:
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {topics.map((top, idx) => (
                                            <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                                                <h4 className="font-bold text-slate-800 text-sm md:text-base mb-2 text-[#60318e]">
                                                    {top.title}
                                                </h4>
                                                <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                                                    {top.items.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-[#AD49E1] font-bold">•</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Keynote Speakers */}
                    {activeTab === 'speakers' && (
                        <div className="space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
                            <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6 text-center">
                                <Users className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e] text-center">
                                    {t.speakersTitle}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {keynoteSpeakers.map((sp, idx) => (
                                    <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-purple-200 hover:shadow-md transition-all">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#60318e] bg-purple-100/70 px-2.5 py-0.5 rounded-full border border-purple-200">
                                                    <MapPin className="w-3 h-3 text-[#AD49E1]" />
                                                    {sp.country}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-slate-800 text-sm md:text-base text-[#60318e] mb-1">
                                                {sp.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 mb-3 font-semibold">
                                                {sp.inst}
                                            </p>
                                            <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed italic">
                                                "{sp.topic}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Seasonal School */}
                    {activeTab === 'school' && (
                        <div className="space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
                            <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6 text-center">
                                <GraduationCap className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e] text-center">
                                    {t.schoolTitle}
                                </h2>
                            </div>

                            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 space-y-6">
                                <h3 className="font-extrabold text-[#60318e] text-base md:text-lg">
                                    {isEn ? "“Innovations – From idea to implementation”" : "„ინოვაციები — იდეიდან განხორციელებამდე“"}
                                </h3>
                                <p className="text-slate-700 text-sm md:text-base leading-relaxed text-justify">
                                    {isEn
                                        ? "Within the framework of the conference, a dedicated seasonal school was conducted for young scientists, PhD students, and master candidates. The school combined theoretical masterclasses on intellectual property, publication strategies, and transferable skills with practical hands-on workshops at TSU FabLab and Telavi State University."
                                        : "კონფერენციის ფარგლებში გაიმართა სპეციალური სეზონური სკოლა ახალგაზრდა მეცნიერების, დოქტორანტებისა და მაგისტრანტებისთვის. სკოლა მოიცავდა როგორც თეორიულ მასტერკლასებს ინტელექტუალური საკუთრების, საგამომცემლო სტრატეგიისა და ტექნოლოგიების ტრანსფერის შესახებ, ისე პრაქტიკულ ვორქშოფებს თსუ FabLab-ში და თელავის სახელმწიფო უნივერსიტეტში."
                                    }
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                                        <h5 className="font-bold text-sm text-slate-800 mb-1 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                            {isEn ? "FabLab TSU Workshops" : "თსუ FabLab ვორქშოფები"}
                                        </h5>
                                        <p className="text-xs text-slate-500">
                                            {isEn ? "3D scanning, laser engraving (Epilog), drone lab and prototyping." : "3D სკანირება, ლაზერული გრავირება, დრონების ლაბორატორია და პროტოტიპირება."}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                                        <h5 className="font-bold text-sm text-slate-800 mb-1 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                            {isEn ? "Telavi State University" : "თელავის სახელმწიფო უნივერსიტეტი"}
                                        </h5>
                                        <p className="text-xs text-slate-500">
                                            {isEn ? "Environmental monitoring, bio-systems and wine chemistry." : "ეკოლოგიური მონიტორინგი, ბიო-სისტემები და ქვევრის ღვინის ქიმია."}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 text-center">
                                    <a
                                        href="/conference-2023/Seassonal-school-Programm.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm uppercase transition-all shadow-md"
                                    >
                                        <Download size={16} />
                                        <span>{isEn ? "Download Seasonal School Programme" : "სეზონური სკოლის პროგრამის ჩამოტვირთვა"}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 5: Committees */}
                    {activeTab === 'committees' && (
                        <div className="space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
                            <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6 text-center">
                                <Users className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e] text-center">
                                    {t.committeesTitle}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="text-base md:text-lg font-bold text-[#60318e] mb-3 pb-2 border-b border-slate-200">
                                        {isEn ? "Honorary Committee" : "საპატიო კომიტეტი"}
                                    </h3>
                                    <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                                        <li>• <strong>Acad. Jaba Samushia</strong> — Rector of Ivane Javakhishvili Tbilisi State University</li>
                                        <li>• <strong>Acad. Roin Metreveli</strong> — President of the Georgian National Academy of Sciences</li>
                                        <li>• <strong>Acad. Dilgam Tagiyev</strong> — Vice-President of the Azerbaijan National Academy of Sciences</li>
                                        <li>• <strong>Prof. Dr. Sylwia Mrozowska</strong> — Vice-Rector for Innovation, University of Gdansk, Poland</li>
                                    </ul>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="text-base md:text-lg font-bold text-[#60318e] mb-3 pb-2 border-b border-slate-200">
                                        {isEn ? "International Scientific Committee" : "საერთაშორისო სამეცნიერო კომიტეტი"}
                                    </h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-700">
                                        <li>• <strong>Grigor Tatishvili</strong> (Chair, Georgia)</li>
                                        <li>• <strong>Fred Lisdat</strong> (Germany)</li>
                                        <li>• <strong>Venko Beschkov</strong> (Bulgaria)</li>
                                        <li>• <strong>Matteo Gerlini</strong> (Italy)</li>
                                        <li>• <strong>Arkadiusz Modrzejewski</strong> (Poland)</li>
                                        <li>• <strong>Eldar Ismailov</strong> (Azerbaijan)</li>
                                        <li>• <strong>Marina Nalbandyan</strong> (Armenia)</li>
                                        <li>• <strong>Tamaz Marsagishvili</strong> (Georgia)</li>
                                        <li>• <strong>Vitali Bakhtadze</strong> (Georgia)</li>
                                        <li>• <strong>Nikoloz Nioradze</strong> (Georgia)</li>
                                        <li>• <strong>Spartak Khutsishvili</strong> (Georgia)</li>
                                        <li>• <strong>Lela Kvinikadze</strong> (Georgia)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 6: Venue */}
                    {activeTab === 'venue' && (
                        <div className="space-y-8 animate-fade-in text-left max-w-4xl mx-auto">
                            <div className="flex flex-col items-center justify-center gap-3 mb-10 border-b pb-6 text-center">
                                <Building2 className="text-[#AD49E1]" size={36}/>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#60318e] text-center">
                                    {t.venueTitle}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                    <h4 className="font-bold text-base text-[#60318e] uppercase">
                                        {isEn ? "Main Venue (Tbilisi)" : "მთავარი ლოკაცია (თბილისი)"}
                                    </h4>
                                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                                        <strong>{isEn ? "Ivane Javakhishvili Tbilisi State University" : "ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი"}</strong><br />
                                        {isEn ? "Building 1, 1 Ilia Tchavtchavadze Ave, Tbilisi 0179, Georgia" : "I კორპუსი, ილია ჭავჭავაძის გამზ. 1, თბილისი 0179"}<br />
                                        <span className="text-xs text-slate-500 block mt-2">
                                            • {isEn ? "Nov 23: Auditorium 107" : "23 ნოემბერი: აუდიტორია 107"}<br />
                                            • {isEn ? "Nov 24: Auditorium 115 & FabLab TSU" : "24 ნოემბერი: აუდიტორია 115 და თსუ FabLab"}
                                        </span>
                                    </p>
                                </div>

                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                    <h4 className="font-bold text-base text-[#60318e] uppercase">
                                        {isEn ? "Regional Session (Telavi)" : "რეგიონული სესია (თელავი)"}
                                    </h4>
                                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                                        <strong>{isEn ? "Iakob Gogebashvili Telavi State University" : "იაკობ გოგებაშვილის სახელობის თელავის სახელმწიფო უნივერსიტეტი"}</strong><br />
                                        {isEn ? "1 University Str, Telavi, Kakheti Region, Georgia" : "უნივერსიტეტის ქ. 1, თელავი, კახეთი"}<br />
                                        <span className="text-xs text-slate-500 block mt-2">
                                            • {isEn ? "Nov 25: Seasonal school sessions & cultural program" : "25 ნოემბერი: სეზონური სკოლის სესიები და კულტურული პროგრამა"}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-purple-50/60 rounded-xl border border-purple-100 text-center">
                                <h5 className="font-bold text-[#60318e] text-xs sm:text-sm uppercase mb-1">
                                    {isEn ? "Host Secretariat" : "საორგანიზაციო სამდივნო"}
                                </h5>
                                <p className="text-xs text-slate-600">
                                    {isEn 
                                        ? "R. Agladze Institute of Inorganic Chemistry and Electrochemistry of TSU (Mindeli str. 11, Tbilisi 0186)"
                                        : "თსუ რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი (მინდელის ქ. 11, თბილისი 0186)"
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
