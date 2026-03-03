'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function InfrastructurePage() {
    const { language } = useLanguage();
    const isEn = language === 'en';
    const [visibleCount, setVisibleCount] = useState(8);
    const [selectedItem, setSelectedItem] = useState(null);

    const infraData = [
        {
            name: 'მაღალი სიზუსტის რენტგენოფლუორესცენტული სპექტრომეტრი EDX 3600H Mining Analyzer',
            nameEn: 'High Precision X-Ray Fluorescence Spectrometer EDX 3600H Mining Analyzer',
            desc: 'ხელსაწყო გამოიყენება მყარი ნივთიერებების ელემენტური ანალიზისთვის ამ ნივთიერების ხსნარში გადაყვანის გარეშე. პროგრამული ოფციები: პროგრამა ელემენტების სრული დიაპაზონისათვის Na-დან (ნატრიუმიდან) U-მდე (ურანამდე); RoHS სტანდარტის აპლიკაციის დამატების საშუალება; მინერალების ანალიზის დამატებითი პროგრამა; დაფარვის სისქის გამზომი აპლიკაციის დამატების საშუალება; ვირტუალური და მანუალური კალიბრაციის საშუალება ყველა თავსებადი აპლიკაციისათვის.',
            descEn: 'The device is used for elemental analysis of solids without dissolving them. Software options: a program for the full range of elements from Na to U; ability to add RoHS standard application; additional mineral analysis program; ability to add a coating thickness measurement application; virtual and manual calibration tools for all compatible applications.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 115',
            locEn: 'Laboratory Building, Room 115',
            images: []
        },
        {
            name: 'ტრინოკულარული მიკროსკოპი Amscope T690C-PL10m (HOLLAND)',
            nameEn: 'Trinocular Microscope Amscope T690C-PL10m (HOLLAND)',
            desc: 'მიკროსკოპი გამჭოლი სხივით გაუმჭვირვალე და გამჭვირვალე მასალებისთვის.',
            descEn: 'Microscope with transmitted light for opaque and transparent materials.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 216',
            locEn: 'Laboratory Building, Room 216',
            images: []
        },
        {
            name: 'ტრინოკულარული მეტალურგიული მიკროსკოპი Euromex ME 2660 and ME 2665 ციფრული კამერით (1/2.5 CMOC sensoriT Euromex DC 5000c)',
            nameEn: 'Trinocular Metallurgical Microscope Euromex ME 2660 and ME 2665 with Digital Camera',
            desc: 'მიკროსკოპი გამჭოლი სხივით გაუმჭვირვალე და გამჭვირვალე მასალებისთვის.',
            descEn: 'Microscope with transmitted light for opaque and transparent materials.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 216',
            locEn: 'Laboratory Building, Room 216',
            images: []
        },
        {
            name: 'ციფრული pH - მეტრი Auxilab Digital - meter model 907',
            nameEn: 'Digital pH-meter Auxilab Digital - meter model 907',
            desc: 'ხელსაწყო პოტენციომეტრული მეთოდით მანგანუმის განსასაზღვრად.',
            descEn: 'Instrument for potentiometric determination of manganese.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 106',
            locEn: 'Laboratory Building, Room 106',
            images: []
        },
        {
            name: 'სპექტროფოტომეტრი auxilab zuzi speqtometer 4201/50',
            nameEn: 'Spectrophotometer Auxilab Zuzi Spectrometer 4201/50',
            desc: 'სპექტროფოტომეტრი Zuzi მოდელი 4201/50 წარმოადგენს უნივერსალურ ხელსაწყოს, რომელსაც შეუძლია შეასრულოს ზუსტი თვისებრივი და რაოდენობრივი ანალიზი ულტრაიისფერ სპექტრში.',
            descEn: 'The Spectrophotometer Zuzi model 4201/50 is a versatile instrument capable of performing precise qualitative and quantitative analysis in the ultraviolet spectrum.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 216',
            locEn: 'Laboratory Building, Room 216',
            images: []
        },
        {
            name: 'ატომურ-აბსორბციული სპექტროფოტომეტრი ANALYST 200-1004 TAM / AAS-200 - Perkin Elmer',
            nameEn: 'Atomic Absorption Spectrophotometer ANALYST 200-1004 TAM / AAS-200 - Perkin Elmer',
            desc: 'ხელსაწყო გამოიყენება ნებისმიერი ტექნიკურ ან ბუნებრივი ობიექტის ელემენტური ანალიზისთვის, განსაკუთრებით იქ, სადაც საჭიროა ელემენტის მცირე შემცველობის განსაზღვრა (აღმოჩენის ქვედა ზღვარი- 10-5 - 10-6 მგ/ლ). ხელსაწყოზე შეიძლება განისაზღვროს 70-მდე ელემენტი (შესაბამისი ნათურებით აღჭურვის შემთხვევაში) სხვადასხვა წარმოშობის ნივთიერებებში: მადნებში, ლითონებში, შენადნობებში, ნიადაგში, სასუქებში, მცენარეებში და სხვა აგროქიმიურ მასალებში. ხელსაწყო შეოძლება გამოყენებულ იქნეს აგრეთვე კლინიკურ და ბიოლოგიურ ანალიზებშიც (სისხლი, პლაზმა). ხელსაწყო გამოიყენება უპირეტესად მიკრო მონარევების განსასაზღვრავად, მაგრამ, მისი გამოყენება აგრეთვე შესაძლებელია სხვადასხვა ობიექტებში ელემენტების მაღალი კონცენტრაციის შემცველობის დროსაც. ხელსაწყო აღჭურვილია კომპიუტერული მართვის სისტემით, ატომიზაციისათვის გამოყენებულია აცეტილენი.',
            descEn: 'The device is used for the elemental analysis of any technical or natural object, especially where the determination of small element contents is required. Up to 70 elements can be determined in substances of various origins. Equipped with a computerized control system, acetylene is used for atomization.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 115',
            locEn: 'Laboratory Building, Room 115',
            images: []
        },
        {
            name: 'ატომურ-აბსორბციული სპექტროფოტომეტრი С-115',
            nameEn: 'Atomic Absorption Spectrophotometer C-115',
            desc: 'დანადგარი გამოიყენება ხსნარებში მყარი, თხევადი და აირადი ნივთიერებების თანაბარი განაწილებისათვის (ჰომოგენიზაციიისათვის).',
            descEn: 'The equipment is used for the uniform distribution of solid, liquid, and gaseous substances in solutions (homogenization).',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 115',
            locEn: 'Laboratory Building, Room 115',
            images: []
        },
        {
            name: 'ულტრაბგერითი რხევების დისპერგატორი Dowellultrasonic dw s20-2000',
            nameEn: 'Ultrasonic Disperser Dowellultrasonic dw s20-2000',
            desc: 'დანადგარი გამოიყენება ხსნარებში მყარი, თხევადი და აირადი ნივთიერებების თანაბარი განაწილებისათვის (ჰომოგენიზაციიისათვის).',
            descEn: 'The equipment is used for the uniform distribution of solid, liquid, and gaseous substances in solutions (homogenization).',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 216',
            locEn: 'Laboratory Building, Room 216',
            images: []
        },
        {
            name: 'STA 2500 Regulus. Simultaneous Thermal Analysis',
            nameEn: 'STA 2500 Regulus. Simultaneous Thermal Analysis',
            desc: 'თერმული ანალიზატორი მაღალი გარჩევადობის მონიტორით.',
            descEn: 'Thermal analyzer with a high-resolution monitor.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 116',
            locEn: 'Laboratory Building, Room 116',
            images: []
        },
        {
            name: 'კოროზიის გამზომი უჯრედი ეტალონური ელექტროდებით',
            nameEn: 'Corrosion Measuring Cell with Reference Electrodes',
            desc: 'უჯრედი გამოიყენება ლითონთა კოროზიისა და სხვა ელექტროქიმიური პროცესების შესასწავლად.',
            descEn: 'The cell is used to study the corrosion of metals and other electrochemical processes.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 207',
            locEn: 'Laboratory Building, Room 207',
            images: []
        },
        {
            name: 'პოტენციოსტატი - ელექტროქიმიური ანალიზატორი ch instruments CHI 660F , CHI 1140',
            nameEn: 'Potentiostat - Electrochemical Analyzer CH Instruments CHI 660F, CHI 1140',
            desc: 'პოტენციოსტატი - ციკლური და ხაზობრივი ვოლტამპერომეტრიული გაზომვები, ღია წრედის პოტენციალის გაზომვა, ქრონოპოტენციომეტრია, ქრონოამპერომეტრია.',
            descEn: 'Potentiostat - cyclic and linear voltametric measurements, open circuit potential measurement, chronopotentiometry, chronoamperometry.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 207 / ოთახი 307',
            locEn: 'Laboratory Building, Room 207 / Room 307',
            images: []
        },
        {
            name: 'დერივატოფგრაფი- Derivatograph-Q 1500D C15',
            nameEn: 'Derivatograph - Derivatograph-Q 1500D C15',
            desc: 'ხელსაწყო გამოიყენება თერმიული (DTA) და თერმოგრავიმეტრული (DTG) ანალიზისთვის. იგი ზომავს ერთდროულად ტემპერატურას (T), მასის ცვლილებას (TG), მასის ცვლილების სიჩქარეს (DTG) და სითბოშემცველობის ცვლილებას (DTA). ხელსაწყოზე მიღებული დერევატოგრამის მიხედვით, შესაძლებელია ნივთიერებათა ნარევებში მიმდინარე პროცესების შესწავლა ნიმუშის გახურევისას 20 - 1000÷1500C ტემპერატორულ ინტერვალში, ამ პროცესების თერმიული ეფექტის განსაზღვრა. ხელსაწყო იძლევა აგრეთვე ჰიგროსკოპული და საკრისტალიზაციო წყლის განსაზღვრის საშუალებას ნიმუშში.',
            descEn: 'The instrument is used for thermal (DTA) and thermogravimetric (DTG) analysis. It simultaneously measures temperature (T), mass change (TG), rate of mass change (DTG), and heat content change (DTA).',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 116',
            locEn: 'Laboratory Building, Room 116',
            images: []
        },
        {
            name: 'სინჯის დაშლის მიკროტალღური სისტემა Microwave Digestion System MDS-6G',
            nameEn: 'Microwave Digestion System MDS-6G',
            desc: 'გამოიყენება მყარი ნიმუშების ხსნარში გადასაყვანად ატომურ აბსორბციული სპექტრული ანალიზისათვის. მიკროტალღური გადამამუშავებელი ხელსაწყო MDS-6G გამოიყენება ერთდროულად რამოდენიმე ნივთიერების ხსნარის დასამზადებლად. ხელსაწყო ამცირებს ხსნარების მომზადების დროს, აადვილებს ძნელად ხსნადი ნივთიერებების გახსნას და ზოგავს გამხსნელის ხარჯს.',
            descEn: 'Used to dissolve solid samples for atomic absorption spectral analysis.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 106',
            locEn: 'Laboratory Building, Room 106',
            images: []
        },
        {
            name: 'ინფრა-წითელი სპექტროფოტომეტრი Tensor II - Bruker FT-IR spectrometer TENZOR II',
            nameEn: 'Infrared Spectrophotometer Tensor II - Bruker FT-IR spectrometer TENZOR II',
            desc: 'ხელსაწყო გამოიყენება ნივთიერების აღნაგობის შესასწავლად, მასში ფუნქციონალური ჯგუფების აღმოსაჩენად, ცნობილი და უცნობი ნივთიერების იდენტობის დასადგენად, აგრეთვე სუფთა ნივთიერებაში მინარევების აღმოსაჩენად. მოლეკულათშორისი და შიდამოლეკულური ურთიერთქმედების დასადგენად, წყალბადური ბმის აღმოსაჩენად და სხვა.',
            descEn: 'The device is used to study the structure of a substance, discover functional groups in it, determine the identity of known and unknown substances, as well as discover impurities in pure substances.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 106',
            locEn: 'Laboratory Building, Room 106',
            images: []
        },
        {
            name: 'რენტგენული დიფრაქტომეტრი ДРОН- 3М',
            nameEn: 'X-ray Diffractometer DRON-3M',
            desc: 'ხელსაწყო გამოიყენება კრისტალური ნივთიერებების (მყარი ფხვნილების) შესწავლისთვის, მათში შემავალი ინდივიდუალური ნივთიერებების იდენტიფიკაციისათვის და ნივთიერებათა კრისტალოგრაფიული მახასიათებლების დასადგენად. იმ შემთხვევაშიც კი როდესაც მიღებული რენტგენოგრამის ანალოგი არ იძებნება სტანდარტული რენტგენოგრამების ცნობარებში, ახალი ნივთიერების რენტგენოგრამები მათი სერიულობის შემთხვევაში შეიძლება გამოყენებული იქნეს ამ ნივთიერების ე.წ. „პასპორტად“ მათი შემდგომი ამოცნობისთვის. ხელსაწყოზე მიღებული რენტგენოგრამები იძლევა აგრეთვე კრისტალური ნივთიერებების დისპერსულობის ხარისხის შეფასების საშუალებას.',
            descEn: 'The instrument is used for studying crystalline substances (solid powders), identifying individual substances contained in them, and determining crystallographic characteristics.',
            loc: 'ლაბორატორიული კორპუსი, ოთახი 113',
            locEn: 'Laboratory Building, Room 113',
            images: []
        },
        {
            name: 'Micromeritics Gemini VII 2390T',
            nameEn: 'Micromeritics Gemini VII 2390T',
            desc: 'არის მაღალგანვითარებული ზედაპირის ფართობის ანალიზატორი, რომელიც ცნობილია თავისი სიჩქარით, სიზუსტითა და საიმედოობით. Gemini VII 2390T მოდელის საშუალებით შესაძლებელია მყარი მასალების ფიზიკურ-ქიმიური მახასიათებლების, კერძდ BET და Langmuir ზედაპირების, მიკროფორების ფართობებისა და მოცულობების განსაზღვრა, ასევე, ადსორბცია-დესორბციის იზოთერმისა და ფორების ზომის განაწილების სრული გაზომვები, აზოტის კაპილარული კონდენსაციის მეთოდით.',
            descEn: 'Is a highly advanced surface area analyzer known for its speed, accuracy, and reliability.',
            loc: '....',
            locEn: '....',
            images: []
        }
    ];

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 8, infraData.length));
    };

    const hasMore = visibleCount < infraData.length;
    const itemsToShow = infraData.slice(0, visibleCount);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-16 mb-8 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#60318e] leading-tight mb-4 uppercase tracking-wider">
                        {isEn ? 'Infrastructure' : 'მატერიალურ-ტექნიკური ბაზა'}
                    </h1>
                    <p className="text-sm md:text-sm text-[#60318e]/70 max-w-3xl mx-auto font-medium leading-relaxed">
                        {isEn
                            ? 'To implement research projects, our institute offers the following material and technical base, in the form of scientific instruments and technological equipment.'
                            : 'კვლევითი პროექტების განხორციელებისათვის თსუ რ.აგლაძის სახელობის არაორგანული ქიმიისა და ელექრტროქიმიის ინსტიტუტი თავაზობს შემდეგ მატერიალურ-ტექნიკურ ბაზას, სამეცნიერო ხელსაწყოებისა და ტექნოლოგიური მოწყობილობის სახით.'}
                    </p>
                </div>
            </div>

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {itemsToShow.map((item, index) => {
                        const description = isEn ? item.descEn : item.desc;
                        const isLongDesc = description.length > 150;

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/80 overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(173,73,225,0.15)] transition-all duration-500 flex flex-col group h-full cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-slate-50 flex items-center justify-center">
                                    {item.images && item.images.length > 0 ? (
                                        <img
                                            src={item.images[0]}
                                            alt={isEn ? item.nameEn : item.name}
                                            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-50 to-slate-100 flex items-center justify-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1">
                                            <svg className="w-16 h-16 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#60318e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Badge */}
                                    <div className="absolute top-5 left-5">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] backdrop-blur-md shadow-lg border border-white/20 bg-[#AD49E1]/90 text-white`}>
                                            #{index + 1}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-7 flex flex-col flex-grow bg-white relative z-10">
                                    <h3 className="text-sm md:text-base font-black text-[#60318e] mb-4 leading-[1.25] group-hover:text-[#AD49E1] transition-colors duration-300">
                                        {isEn ? item.nameEn : item.name}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                                        {description}
                                    </p>

                                    <div className="mt-auto flex flex-col gap-4">
                                        <div className="flex items-start gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="line-clamp-2">{isEn ? item.locEn : item.loc}</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-xs font-black uppercase tracking-widest text-[#AD49E1] group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                                                {isEn ? 'Explore' : 'ვრცლად'}
                                                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>

                                            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-[#AD49E1] group-hover:text-[#AD49E1] transition-all duration-500 group-hover:rotate-45 shrink-0">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-white border-2 border-slate-200 text-gray-700 hover:border-[#AD49E1] hover:text-[#AD49E1] font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                        >
                            {isEn ? 'Load More' : 'მეტის ნახვა'}
                        </button>
                    </div>
                )}
            </div>

            {/* Read More Modal */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#60318e]/90 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 bg-white/50 hover:bg-white rounded-full text-[#60318e] hover:text-[#AD49E1] transition-all shadow-xl hover:scale-110 active:scale-95 group"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="overflow-y-auto w-full">
                            {/* Images Gallery */}
                            {selectedItem.images && selectedItem.images.length > 0 && (
                                <div className="w-full bg-slate-950 relative group/gallery flex items-center justify-center h-[300px] md:h-[450px]">
                                    <img
                                        src={selectedItem.images[0]}
                                        alt={isEn ? selectedItem.nameEn : selectedItem.name}
                                        className="w-full h-full object-contain animate-fade-in"
                                    />
                                </div>
                            )}

                            {/* Content Section */}
                            <div className={`p-6 md:p-10 bg-white flex flex-col ${!(selectedItem.images && selectedItem.images.length > 0) ? 'pt-12 md:pt-16' : ''}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-sm bg-[#AD49E1] text-white`}>
                                        {isEn ? 'Equipment' : 'მოწყობილობა'}
                                    </span>
                                    <div className="h-px flex-grow bg-slate-100"></div>
                                    <span className="text-[11px] text-slate-400 font-bold tracking-wider flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {isEn ? selectedItem.locEn : selectedItem.loc}
                                    </span>
                                </div>

                                <h2 className="text-lg md:text-xl font-black text-[#60318e] mb-6 leading-snug tracking-tight max-w-3xl">
                                    {isEn ? selectedItem.nameEn : selectedItem.name}
                                </h2>

                                <div className="prose prose-slate max-w-3xl overflow-hidden">
                                    <p className="text-slate-600 text-sm md:text-sm leading-relaxed whitespace-pre-line font-medium text-justify">
                                        {isEn ? selectedItem.descEn : selectedItem.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
