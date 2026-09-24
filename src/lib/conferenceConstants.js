export const CONFERENCE_TOPICS = [
    {
        id: '1',
        num: 'I',
        titleKa: 'I. ნანოპროცესები და ნანოტექნოლოგიები',
        titleEn: 'I. Nanoprocesses and Nanotechnologies',
        subtopicsKa: [
            'ნანოფხვნილები',
            'ნანოდანაფარები',
            'ნანოსენსორები'
        ],
        subtopicsEn: [
            'Nanopowders',
            'Nanocoatings',
            'Nanosensors'
        ]
    },
    {
        id: '2',
        num: 'II',
        titleKa: 'II. სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები',
        titleEn: 'II. Fundamental and Technological Aspects of Mineral and Secondary Raw Material Processing',
        subtopicsKa: [
            'ბუნებრივი რესურსების გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები',
            'მეორადი ნედლეულის და საწარმოო ნარჩენების გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები'
        ],
        subtopicsEn: [
            'Fundamental and technological aspects of natural resource processing',
            'Fundamental and technological aspects of secondary raw material and industrial waste processing'
        ]
    },
    {
        id: '3',
        num: 'III',
        titleKa: 'III. მწვანე ქიმია',
        titleEn: 'III. Green Chemistry',
        subtopicsKa: [
            'ინოვაციური ტექნოლოგიები ახალი მასალების შემუშავებაში',
            'ბუნებრივი და ჩამდინარე წყლების გაწმენდის ახალი მეთოდები',
            'ენერგეტიკა და ეკოლოგია'
        ],
        subtopicsEn: [
            'Innovative technologies in the development of new materials',
            'New methods for natural and wastewater treatment',
            'Energy and ecology'
        ]
    },
    {
        id: '4',
        num: 'IV',
        titleKa: 'IV. სამეცნიერო ინოვაციების პოპულარიზაცია და კომერციალიზაცია',
        titleEn: 'IV. Popularization and Commercialization of Scientific Innovations',
        subtopicsKa: [
            'კვლევის შედეგების დაცვა და პოპულარიზაცია',
            'ინოვაციური ტექნოლოგიები და საჯარო-კერძო პარტნიორობა',
            'კორპორაციულ-სოციალური პასუხისმგებლობა ინოვაციის სფეროში'
        ],
        subtopicsEn: [
            'Protection and popularization of research results',
            'Innovative technologies and public-private partnerships',
            'Corporate Social Responsibility in the Field of Innovation'
        ]
    },
    {
        id: '5',
        num: 'V',
        titleKa: 'V. სურსათის ქიმია და ხარისხი',
        titleEn: 'V. Food Chemistry and Quality',
        subtopicsKa: [
            'ბიოქიმიური და ქიმიური ცვლილებები სურსათის შენახვისა და გადამუშავებისას, შეფუთვა და მისი ქიმიური გავლენა სურსათზე',
            'სურსათის ხარისხის მაჩვენებლები, უსაფრთხოება ქიმიური თვალსაზრისით, ფალსიფიკაციის ქიმიური ინდიკატორები და შეფასების მეთოდები',
            'თანამედროვე ტექნოლოგიები სურსათის ქიმიურ ანალიზში'
        ],
        subtopicsEn: [
            'Biochemical and Chemical Changes During Food Storage and Processing, Packaging and its Chemical Impact on Food',
            'Food Quality Indicators, Chemical Safety, Chemical Indicators of Adulteration and Assessment Methods',
            'Modern Technologies in Chemical Analysis of Food'
        ]
    },
    {
        id: '6',
        num: 'VI',
        titleKa: 'VI. STEM+P: მეცნიერება, ინოვაცია და პოლიტიკა',
        titleEn: 'VI. STEM+P: Science, Innovation and Policy',
        subtopicsKa: [
            'მეცნიერებისა და ინოვაციების საჯარო მართვა: სამეცნიერო კვლევითი ერთეულების მართვის თანამედროვე მოდელები და სახელმწიფო პოლიტიკა',
            'მწვანე ეკონომიკა და ცირკულარული მოდელები: ქიმიური ტექნოლოგიების როლი მდგრად ეკონომიკურ განვითარებაში',
            'ინტელექტუალური საკუთრების სამართალი: სამეცნიერო აღმოჩენებისა და ტექნოლოგიური ინოვაციების სამართლებრივი დაცვა, პატენტირება და ლიცენზირება საერთაშორისო ბაზარზე'
        ],
        subtopicsEn: [
            'Public Governance of Science and Innovation: Modern Models of Scientific Research Unit Management and Public Policy',
            'Green Economy and Circular Models: The Role of Chemical Technologies in Sustainable Economic Development',
            'Intellectual Property Law: Legal Protection, Patenting and Licensing of Scientific Discoveries and Technological Innovations in the International Market'
        ]
    },
];

export const TOPIC_MAP = {
    '1': 'I. ნანოპროცესები და ნანოტექნოლოგიები',
    '2': 'II. სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები',
    '3': 'III. მწვანე ქიმია',
    '4': 'IV. სამეცნიერო ინოვაციების პოპულარიზაცია და კომერციალიზაცია',
    '5': 'V. სურსათის ქიმია და ხარისხი',
    '6': 'VI. STEM+P: მეცნიერება, ინოვაცია და პოლიტიკა',
};

export const getTopicLabel = (val, lang = 'ka') => {
    if (!val) return '—';
    const str = String(val).trim();
    const found = CONFERENCE_TOPICS.find(t => t.id === str || t.titleKa === str || t.titleEn === str);
    if (found) {
        return lang === 'en' ? found.titleEn : found.titleKa;
    }
    if (TOPIC_MAP[str]) return TOPIC_MAP[str];
    return str;
};

export const TITULATION_MAP = {
    prof: { ka: 'პროფესორი (Prof.)', en: 'Prof.' },
    dr: { ka: 'დოქტორი (Dr.)', en: 'Dr.' },
    msc: { ka: 'მაგისტრი (MSc)', en: 'MSc' },
    bsc: { ka: 'ბაკალავრი (BSc)', en: 'BSc' },
    student: { ka: 'სტუდენტი (დოქტორანტი / მაგისტრანტი / ბაკალავრი)', en: 'Student (PhD / Master / Bachelor)' },
};

export const ROLE_MAP = {
    presenting_author: { ka: 'მომხსენებელი', en: 'Presenting Author' },
    co_author: { ka: 'თანაავტორი', en: 'Co-Author' },
    presenting_and_co_author: { ka: 'მომხსენებელი & თანაავტორი', en: 'Presenting & Co-Author' },
};

export const GENDER_MAP = {
    female: { ka: 'მდედრობითი (Female)', en: 'Female' },
    male: { ka: 'მამრობითი (Male)', en: 'Male' },
};

export const PRESENTATION_TYPE_MAP = {
    oral: { ka: 'ზეპირი მოხსენება (Oral)', en: 'Oral Presentation' },
    poster: { ka: 'სასტენდო მოხსენება (Poster)', en: 'Poster Presentation' },
};

export const getTitulationLabel = (val, lang = 'ka') => {
    if (!val) return '—';
    const key = String(val).toLowerCase().trim();
    if (TITULATION_MAP[key]) return TITULATION_MAP[key][lang] || TITULATION_MAP[key].ka;
    return val;
};

export const getRoleLabel = (val, lang = 'ka') => {
    if (!val) return '—';
    const key = String(val).toLowerCase().trim();
    if (ROLE_MAP[key]) return ROLE_MAP[key][lang] || ROLE_MAP[key].ka;
    return val;
};

export const getGenderLabel = (val, lang = 'ka') => {
    if (!val) return '—';
    const key = String(val).toLowerCase().trim();
    if (GENDER_MAP[key]) return GENDER_MAP[key][lang] || GENDER_MAP[key].ka;
    return val;
};

export const getPresentationTypeLabel = (val, lang = 'ka') => {
    if (!val) return '—';
    const key = String(val).toLowerCase().trim();
    if (PRESENTATION_TYPE_MAP[key]) return PRESENTATION_TYPE_MAP[key][lang] || PRESENTATION_TYPE_MAP[key].ka;
    return val;
};

export const getAttendanceLabel = (isAttendingInPerson, lang = 'ka') => {
    if (isAttendingInPerson === true || isAttendingInPerson === 'true' || isAttendingInPerson === 1) {
        return lang === 'en' ? 'In-Person' : 'პირისპირ (დარბაზში)';
    }
    return lang === 'en' ? 'Online' : 'ონლაინ (დისტანციური)';
};

export const INVITED_SPEAKERS = [
    {
        id: 'bellucci',
        nameEn: 'Prof. Dr. Stefano Bellucci',
        nameKa: 'პროფ. სტეფანო ბელუჩი',
        affiliationEn: 'INFN - Laboratori Nazionali di Frascati (LNF), Frascati, Italy',
        affiliationKa: 'ბირთვული ფიზიკის ეროვნული ინსტიტუტი (INFN) - ფრასკატის ეროვნული ლაბორატორიები, ფრასკატი, იტალია',
        roleEn: 'First Researcher, Head of NEXT Nanotechnology Group',
        roleKa: 'მთავარი მკვლევარი (First Researcher), NEXT ნანოტექნოლოგიების ჯგუფის ხელმძღვანელი',
        topicEn: 'Innovative 2D Materials for Nanoelectronics, Molecular Sensing, Optical Properties, and Cationic Pollutant Removal from Aqueous Solutions',
        topicKa: 'ინოვაციური 2D მასალები ნანოელექტრონიკის, მოლეკულური სენსორების, ოპტიკური თვისებებისა და წყალხსნარებიდან კათიონური დამაბინძურებლების მოსაცილებლად',
        bioEn: 'Prof. Dr. Stefano Bellucci is First Researcher at the National Institute for Nuclear Physics (INFN-LNF) and leads the NEXT Nanotechnology Group. With over 500 scientific publications, his research focuses on 2D nanomaterials, carbon nanotubes, graphene nanocomposites, and their cutting-edge applications in nanoelectronics and biomedicine.',
        bioKa: 'პროფესორი სტეფანო ბელუჩი არის იტალიის ბირთვული ფიზიკის ეროვნული ინსტიტუტის (INFN-LNF) მთავარი მკვლევარი და NEXT ნანოტექნოლოგიების ჯგუფის ხელმძღვანელი. 500-ზე მეტი სამეცნიერო ნაშრომის ავტორი, რომლის კვლევებიც ეძღვნება 2D ნანომასალებს, ნახშირბადის ნანომილაკებს, გრაფენის კომპოზიტებსა და მათ გამოყენებას ნანოელექტრონიკასა და ბიომედიცინაში.',
        image: '/conference-2026/speakers/stefano-bellucci.jpg',
        countryEn: 'Italy',
        countryKa: 'იტალია',
    },
    {
        id: 'beschkov',
        nameEn: 'Prof. Dr. Venko N. Beschkov',
        nameKa: 'პროფ. ვენკო ნ. ბეშკოვი',
        affiliationEn: 'Institute of Chemical Engineering, Bulgarian Academy of Sciences (BAS), Sofia, Bulgaria',
        affiliationKa: 'ქიმიური ინჟინერიის ინსტიტუტი, ბულგარეთის მეცნიერებათა აკადემია (BAS), სოფია, ბულგარეთი',
        roleEn: 'Professor, former Director of the Institute of Chemical Engineering (BAS)',
        roleKa: 'პროფესორი, ქიმიური ინჟინერიის ინსტიტუტის ყოფილი დირექტორი (ბულგარეთის მეცნიერებათა აკადემია)',
        topicEn: 'Carbon-Free Chemical Sources of Energy: The Hydrogen Sulfide',
        topicKa: 'ენერგიის უნახშირბადო ქიმიური წყაროები: გოგირდწყალბადი',
        bioEn: 'Internationally recognized authority in chemical engineering, environmental protection, bioprocess engineering, and hydrogen sulfide utilization as a green, carbon-free energy carrier. Former Director of the Institute of Chemical Engineering (1993–2014) and former Deputy Minister of Environment of Bulgaria. Author of 17 patents and participant in over 30 international ecological research projects.',
        bioKa: 'საერთაშორისოდ აღიარებული მეცნიერი ქიმიურ ინჟინერიაში, გარემოსდაცვით ტექნოლოგიებში, ბიოპროცესებსა და გოგირდწყალბადისგან ენერგიის მიღების მწვანე მეთოდებში. 21 წლის განმავლობაში ხელმძღვანელობდა ბულგარეთის მეცნიერებათა აკადემიის ქიმიური ინჟინერიის ინსტიტუტს (1993–2014), იყო ბულგარეთის გარემოს დაცვის მინისტრის მოადგილე. არის 17 პატენტისა და 30-ზე მეტი საერთაშორისო პროექტის ავტორი.',
        image: '/conference-2026/speakers/venko-beschkov.jpg',
        countryEn: 'Bulgaria',
        countryKa: 'ბულგარეთი',
    },
    {
        id: 'tagiyev',
        nameEn: 'Acad. Prof. Dilgam Babir Tagiyev',
        nameKa: 'აკად. პროფ. დილგამ ტაგიევი',
        affiliationEn: 'Institute of Catalysis and Inorganic Chemistry named after acad. M. Nagiyev, ANAS, Baku, Azerbaijan',
        affiliationKa: 'აკად. მ. ნაგიევის სახელობის კატალიზისა და არაორგანული ქიმიის ინსტიტუტი, აზერბაიჯანის მეცნიერებათა ეროვნული აკადემია (AMEA)',
        roleEn: 'Vice-President of ANAS, Director General of the Institute of Catalysis and Inorganic Chemistry',
        roleKa: 'აზერბაიჯანის მეცნიერებათა ეროვნული აკადემიის (AMEA) ვიცე-პრეზიდენტი, ინსტიტუტის გენერალური დირექტორი',
        topicEn: 'Heterogeneous and Homogeneous Catalysts for Petrochemical Synthesis and Eco-Friendly Technologies',
        topicKa: 'ჰეტეროგენული და ჰომოგენური კატალიზატორები ნავთობქიმიური სინთეზისა და ეკოლოგიურად სუფთა ტექნოლოგიებისთვის',
        bioEn: 'Academician Dilgam Tagiyev is Vice-President of the Azerbaijan National Academy of Sciences (ANAS) and Director General of the Institute of Catalysis and Inorganic Chemistry. World-class scholar in chemical kinetics, heterogeneous and homogeneous catalysis, zeolite chemistry, and low-carbon petrochemical conversion technologies. Author of numerous international monographs and scientific patents.',
        bioKa: 'აკადემიკოსი დილგამ ტაგიევი არის აზერბაიჯანის მეცნიერებათა ეროვნული აკადემიის (AMEA) ვიცე-პრეზიდენტი და მ. ნაგიევის სახელობის კატალიზისა და არაორგანული ქიმიის ინსტიტუტის გენერალური დირექტორი. მსოფლიო დონის მკვლევარი ქიმიურ კინეტიკაში, ჰეტეროგენულ და ჰომოგენურ კატალიზში, ცეოლითების ქიმიასა და ეკოლოგიურ ნავთობქიმიურ სინთეზში.',
        image: '/conference-2026/speakers/dilgam-tagiyev.jpg',
        countryEn: 'Azerbaijan',
        countryKa: 'აზერბაიჯანი',
    },
    {
        id: 'aliyev',
        nameEn: 'Prof. Dr. Akif Shikhan Aliyev',
        nameKa: 'პროფ. აკიფ ალიევი',
        affiliationEn: 'Head of Laboratory of Nanoelectrochemistry and Electrocatalysis, Institute of Catalysis and Inorganic Chemistry named after acad. M. Nagiyev, Baku, Azerbaijan',
        affiliationKa: 'ნანოელექტროქიმიისა და ელექტროკატალიზის ლაბორატორიის ხელმძღვანელი, აკად. მ. ნაგიევის სახელობის კატალიზისა და არაორგანული ქიმიის ინსტიტუტი, ბაქო, აზერბაიჯანი',
        roleEn: 'Doctor of Chemical Sciences, Professor, Head of Laboratory',
        roleKa: 'ქიმიის მეცნიერებათა დოქტორი, პროფესორი, ლაბორატორიის ხელმძღვანელი',
        topicEn: 'Nanoelectrochemistry and Electrocatalysis: Semiconductor Thin Films and Photoelectrolysis',
        topicKa: 'ნანოელექტროქიმია და ელექტროკატალიზი: ნახევარგამტარული თხელი ფენები და წყლის ფოტოელექტროლიზი',
        bioEn: 'Doctor of Chemical Sciences, Professor, and leading specialist in nanoelectrochemistry and semiconductor nanostructured materials at the Institute of Catalysis and Inorganic Chemistry. His work pioneers the development of GaAs/TiO2 and GaP/TiO2 photoanodic heterosystems for solar water photoelectrolysis and electrochemical thin-film deposition. Founder and Executive Secretary of the SCOPUS-indexed journal "Chemical Problems".',
        bioKa: 'ქიმიის მეცნიერებათა დოქტორი, პროფესორი და ნანოელექტროქიმიისა და ელექტროკატალიზის ლაბორატორიის ხელმძღვანელი. იკვლევს ნახევარგამტარულ ნანომასალებს, GaAs/TiO2 და GaP/TiO2 ჰეტეროსისტემებს წყლის მზის ფოტოელექტროლიზისთვის და თხელი ფენების ელექტროქიმიურ სინთეზს. არის საერთაშორისო SCOPUS-ინდექსირებული ჟურნალ „Chemical Problems“-ის თანადამფუძნებელი და აღმასრულებელი მდივანი.',
        image: '/conference-2026/speakers/akif-aliyev.jpg',
        countryEn: 'Azerbaijan',
        countryKa: 'აზერბაიჯანი',
    },
    {
        id: 'kranz',
        nameEn: 'Assoc. Prof. Christine Kranz',
        nameKa: 'ასოც. პროფესორი კრისტინე კრანცი',
        affiliationEn: 'Institute of Analytical and Bioanalytical Chemistry (IABC), Assoc. Professor at Ulm University, Ulm, Germany',
        affiliationKa: 'ანალიზური და ბიოანალიზური ქიმიის ინსტიტუტის (IABC) ასოცირებული პროფესორი, ულმის უნივერსიტეტი, ულმი, გერმანია',
        roleEn: 'Invited Speaker (Germany)',
        roleKa: 'მოწვეული მომხსენებელი (გერმანია)',
        topicEn: '',
        topicKa: '',
        bioEn: 'Dr. Christine Kranz received her Ph.D. in Chemistry from the Technical University of Munich (Germany). After spending a year as a postdoctoral fellow at the Vienna University of Technology, Institute of Analytical Chemistry (Austria), she accepted a position at the School of Chemistry and Biochemistry, Georgia Institute of Technology (USA). In 2008, she returned to Germany and is currently Assoc. Professor at Ulm University, Institute of Analytical and Bioanalytical Chemistry (IABC). Her main research focus is on scanning (electrochemical) probe microscopy for studying interfacial processes at post-Li battery materials and light-driven molecular photocatalysis systems, besides she works on the development of miniaturized electrochemical sensors for bioanalytical applications. She published more than 295 papers in peer-reviewed journals. She is on the editorial boards of ACS Electrochemistry, Electrochemical Science Advances, Analyst, and Electrochimica Acta. Since 2020, she is Editor of Bioelectrochemistry (Elsevier).',
        bioKa: 'დოქტორმა კრისტინე კრანცმა ქიმიის მიმართულებით სადოქტორო ხარისხი მიუნხენის ტექნიკურ უნივერსიტეტში (გერმანია) მოიპოვა. ვენის ტექნიკურ უნივერსიტეტში (ავსტრია), ანალიზური ქიმიის ინსტიტუტში, პოსტდოქტორანტად ერთი წლის გატარების შემდეგ, მან მუშაობა დაიწყო ჯორჯიის ტექნოლოგიური ინსტიტუტის (აშშ) ქიმიისა და ბიოქიმიის სკოლაში. 2008 წელს იგი გერმანიაში დაბრუნდა და ამჟამად ულმის უნივერსიტეტის ანალიზური და ბიოანალიზური ქიმიის ინსტიტუტის (IABC) ასოცირებული პროფესორია. მისი კვლევითი საქმიანობა ძირითადად ფოკუსირებულია სკანირებად (ელექტროქიმიურ) ზონდურ მიკროსკოპიაზე, რომლის საშუალებითაც შეისწავლება ფაზათა საზღვარზე მიმდინარე პროცესები ლითიუმ-იონურის შემდგომი თაობის (post-Li) ბატარეების მასალებსა და სინათლით აქტივირებულ მოლეკულურ ფოტოკატალიზურ სისტემებში; გარდა ამისა, იგი მუშაობს ბიოანალიზური დანიშნულების მინიატურული ელექტროქიმიური სენსორების შემუშავებაზე. მას გამოქვეყნებული აქვს 295-ზე მეტი სამეცნიერო ნაშრომი რეცენზირებად ჟურნალებში. იგი არის ისეთი ჟურნალების სარედაქციო საბჭოს წევრი, როგორიცაა: ACS Electrochemistry, Electrochemical Science Advances, Analyst და Electrochimica Acta. 2020 წლიდან იგი ჟურნალ Bioelectrochemistry-ის (გამომცემლობა Elsevier) რედაქტორია.',
        image: '/conference-2026/speakers/christine-kranz.jpg',
        countryEn: 'Germany',
        countryKa: 'გერმანია',
    },
    {
        id: 'tsitsishvili',
        nameEn: 'Academician Vladimer Tsitsishvili, Georgian National Academy of Sciences',
        nameKa: 'აკადემიკოსი ვლადიმერ ციციშვილი, საქართველოს მეცნიერებათა ეროვნული აკადემია',
        affiliationEn: 'P. Melikishvili Institute of Physical and Organic Chemistry, Georgia',
        affiliationKa: 'პ. მელიქიშვილის ფიზიკური და ორგანული ქიმიის ინსტიტუტი, საქართველო',
        roleEn: 'Chair of the Scientific Council, Chief Research Scientist',
        roleKa: 'სამეცნიერო საბჭოს თავმჯდომარე, მთავარი მეცნიერი თანამშრომელი',
        topicEn: '',
        topicKa: '',
        bioEn: 'Prof. Vladimer Tsitsishvili graduated from the Faculty of Physics of Tbilisi State University in 1970 and subsequently specialized in physical chemistry. He received his degree of Candidate of Physical and Mathematical Sciences in 1975 and Doctor of Chemical Sciences in 1988/1989. He has worked at several research institutes of the Georgian Academy of Sciences and served as Director of the Petre Melikishvili Institute of Physical and Organic Chemistry from 2006 to 2018. He has been a Corresponding Member of the Georgian National Academy of Sciences since 2001 and was elected a Full Member (Academician) in 2019. He currently serves as Academician-Secretary of the Department of Chemistry and Chemical Technologies of the Georgian National Academy of Sciences.\n\nHis main research interests include physical chemistry, zeolite chemistry, adsorption, ion exchange, molecular sieves, and heterogeneous catalysis. His research has contributed to the development and modification of zeolite molecular sieves, adsorbents, ion exchangers, and catalysts, as well as to the study of transport and relaxation phenomena in heterogeneous systems. Prof. Tsitsishvili has authored more than 450 scientific publications and two books and holds several patents. His scientific achievements have been recognized with the A. Tvalchrelidze Prize and G. Tsitsishvili Prize of the Georgian National Academy of Sciences, as well as the Order of Honour of Georgia.',
        bioKa: 'პროფესორმა ვლადიმერ ციციშვილმა 1970 წელს დაამთავრა თბილისის სახელმწიფო უნივერსიტეტის ფიზიკის ფაკულტეტი და შემდგომში ფიზიკურ ქიმიაში სპეციალიზდა. მან ფიზიკა-მათემატიკის მეცნიერებათა კანდიდატის ხარისხი 1975 წელს, ხოლო ქიმიის მეცნიერებათა დოქტორის ხარისხი — 1988/1989 წლებში მიიღო. იგი მუშაობდა საქართველოს მეცნიერებათა აკადემიის რამდენიმე სამეცნიერო-კვლევით ინსტიტუტში, ხოლო 2006-2018 წლებში ხელმძღვანელობდა პეტრე მელიქიშვილის სახელობის ფიზიკური და ორგანული ქიმიის ინსტიტუტს. 2001 წლიდან იგი საქართველოს მეცნიერებათა ეროვნული აკადემიის წევრ-კორესპონდენტია, 2019 წელს კი აკადემიის ნამდვილ წევრად (აკადემიკოსად) აირჩიეს. ამჟამად იგი საქართველოს მეცნიერებათა ეროვნული აკადემიის ქიმიისა და ქიმიური ტექნოლოგიების განყოფილების აკადემიკოს-მდივნის თანამდებობას იკავებს.\n\nმისი სამეცნიერო ინტერესების ძირითადი სფეროებია: ფიზიკური ქიმია, ცეოლითების ქიმია, ადსორბცია, იონური გაცვლა, მოლეკულური საცრები და ჰეტეროგენული კატალიზი. მისმა კვლევებმა ხელი შეუწყო ცეოლითური მოლეკულური საცრების, ადსორბენტების, იონგამცვლელებისა და კატალიზატორების შემუშავებასა და მოდიფიკაციას, ასევე — ჰეტეროგენულ სისტემებში ტრანსპორტისა და რელაქსაციის მოვლენების შესწავლას. პროფესორი ციციშვილი 450-ზე მეტი სამეცნიერო პუბლიკაციისა და ორი წიგნის ავტორია; ფლობს რამდენიმე პატენტს. მისი სამეცნიერო მიღწევები აღინიშნა საქართველოს მეცნიერებათა ეროვნული აკადემიის ა. თვალჭრელიძისა და გ. ციციშვილის სახელობის პრემიებით, ასევე — საქართველოს ღირსების ორდენით.',
        image: '/conference-2026/speakers/Tsitsishvili.jpg',
        countryEn: 'Georgia',
        countryKa: 'საქართველო',
    },
    {
        id: 'katsarava',
        nameEn: 'Academician Ramaz Katsarava, Georgian National Academy of Sciences',
        nameKa: 'აკადემიკოსი რამაზ ქაცარავა, საქართველოს მეცნიერებათა ეროვნული აკადემია',
        affiliationEn: 'Institute of Chemistry and Molecular Engineering, Agricultural University of Georgia, Georgia',
        affiliationKa: 'საქართველოს აგრარული უნივერსიტეტის ქიმიისა და მოლეკულური ინჟინერიის ინსტიტუტი, საქართველო',
        roleEn: 'Director, Professor',
        roleKa: 'დირექტორი, პროფესორი',
        topicEn: '',
        topicKa: '',
        bioEn: 'Prof. Ramaz Katsarava received his degree in Chemical Engineering from the Georgian Polytechnic Institute in 1966 and completed postgraduate studies at the D. I. Mendeleev Institute of Chemical Technology in Moscow. He received his Ph.D. in Chemistry in 1971 and his Doctor of Chemical Sciences degree in 1988 from the A. N. Nesmeyanov Institute of Element-Organic Compounds of the Russian Academy of Sciences. He is currently Professor and Director of the Institute of Chemistry and Molecular Engineering at the Agricultural University of Georgia.\n\nHis main research interests include polymer chemistry, biodegradable polymers, biomaterials, and polymer-based biomedical applications. Prof. Katsarava pioneered new polycondensation methods and the development of biodegradable polymers based on naturally occurring α-amino acids, known as pseudo-proteins, with applications in regenerative medicine, drug delivery, and other biomedical technologies. He is the author of numerous scientific publications and 66 inventions, including 18 U.S. patents and 6 PCT applications, and has supervised the research of numerous Ph.D. and doctoral researchers. His scientific achievements have been recognized by several national and international awards, including the WIPO Gold Medal and the National Prize of Georgia.',
        bioKa: 'პროფესორმა რამაზ ქაცარავამ 1966 წელს საქართველოს პოლიტექნიკურ ინსტიტუტში მიიღო განათლება ქიმიურ ინჟინერიაში, ხოლო ასპირანტურა გაიარა მოსკოვის დ. ი. მენდელეევის სახელობის ქიმიურ-ტექნოლოგიურ ინსტიტუტში. ქიმიის მეცნიერებათა კანდიდატის ხარისხი მან 1971 წელს, ხოლო ქიმიის მეცნიერებათა დოქტორის ხარისხი — 1988 წელს მიიღო რუსეთის მეცნიერებათა აკადემიის ა. ნ. ნესმეიანოვის სახელობის ელემენტორგანულ ნაერთთა ინსტიტუტში. ამჟამად იგი საქართველოს აგრარული უნივერსიტეტის ქიმიისა და მოლეკულური ინჟინერიის ინსტიტუტის პროფესორი და დირექტორია.\n\nმისი კვლევითი ინტერესები მოიცავს პოლიმერების ქიმიას, ბიოდეგრადირებად პოლიმერებს, ბიომასალებსა და პოლიმერებზე დაფუძნებულ ბიოსამედიცინო ტექნოლოგიებს. პროფესორმა ქაცარავამ საფუძველი ჩაუყარა პოლიკონდენსაციის ახალ მეთოდებსა და ბუნებრივ α-ამინომჟავებზე დაფუძნებული ბიოდეგრადირებადი პოლიმერების (ე.წ. „ფსევდო-ცილების“) შემუშავებას, რომლებიც გამოიყენება რეგენერაციულ მედიცინაში, წამლის მიწოდების სისტემებსა და სხვა ბიოსამედიცინო სფეროებში. იგი მრავალი სამეცნიერო პუბლიკაციისა და 66 გამოგონების (მათ შორის, აშშ-ის 18 პატენტისა და PCT-ის სისტემით შეტანილი 6 განაცხადის) ავტორია და ხელმძღვანელობდა მრავალი დოქტორანტისა და მეცნიერის კვლევით საქმიანობას. მისი სამეცნიერო მიღწევები აღიარებულია არაერთი ეროვნული და საერთაშორისო ჯილდოთი, მათ შორის — WIPO-ს (ინტელექტუალური საკუთრების მსოფლიო ორგანიზაციის) ოქროს მედლითა და საქართველოს ეროვნული პრემიით.',
        image: '/conference-2026/speakers/Katsarava.jpg',
        countryEn: 'Georgia',
        countryKa: 'საქართველო',
    },
    {
        id: 'mustafayev',
        nameEn: 'Prof. Islam Mustafayev, Corresponding Member of the Azerbaijan National Academy of Sciences',
        nameKa: 'პროფ. ისლამ მუსტაფაევი, აზერბაიჯანის მეცნიერებათა ეროვნული აკადემიის წევრ-კორესპონდენტი',
        affiliationEn: 'The Institute of Radiation Problems at National Academy of Sciences Azerbaijan, Baku, Azerbaijan',
        affiliationKa: 'რადიაციულ პრობლემათა ინსტიტუტი, ბაქო, აზერბაიჯანი',
        roleEn: 'General Director, Head of Laboratory',
        roleKa: 'გენერალური დირექტორი, ლაბორატორიის ხელმძღვანელი',
        topicEn: '',
        topicKa: '',
        bioEn: 'Prof. Islam Mustafayev received his higher education at Azerbaijan State University, graduating from the Faculty of Physics in 1973. He completed his postgraduate studies at the Institute of Chemical Physics of the Academy of Sciences of the USSR in Moscow, where he defended his Ph.D. in 1978 and Doctor of Sciences dissertation in 1991. He is currently General Director of the Institute of Radiation Problems of the Ministry of Science and Education of the Republic of Azerbaijan and Head of the Laboratory of Energy-Saving Radiation Processes. In 2014, he was elected a Corresponding Member of the Azerbaijan National Academy of Sciences.\n\nHis main research interests include radiation chemistry, radiation-thermal processes, environmental chemistry, energy technologies, and the radiation-chemical transformation of organic fuels and wastes. His research has particularly focused on radiation-assisted processing of petroleum products, oil-containing wastes and waters, as well as the production of hydrogen and synthesis gas from solid and liquid organic materials. Prof. Mustafayev has authored more than 315 scientific publications and holds 17 patents and authorship certificates. He also serves as Editor-in-Chief of the Journal of Radiation Researches and has received several national scientific awards for his contributions to radiation chemistry and environmental research.',
        bioKa: 'პროფესორმა ისლამ მუსტაფაევმა უმაღლესი განათლება აზერბაიჯანის სახელმწიფო უნივერსიტეტში მიიღო და 1973 წელს ფიზიკის ფაკულტეტი დაამთავრა. ასპირანტურა მან მოსკოვში, სსრკ მეცნიერებათა აკადემიის ქიმიური ფიზიკის ინსტიტუტში გაიარა, სადაც 1978 წელს საკანდიდატო, ხოლო 1991 წელს — სადოქტორო დისერტაცია დაიცვა. ამჟამად იგი აზერბაიჯანის რესპუბლიკის მეცნიერებისა და განათლების სამინისტროს რადიაციული პრობლემების ინსტიტუტის გენერალური დირექტორი და ენერგოდამზოგავი რადიაციული პროცესების ლაბორატორიის ხელმძღვანელია. 2014 წელს იგი აზერბაიჯანის მეცნიერებათა ეროვნული აკადემიის წევრ-კორესპონდენტად აირჩიეს.\n\nმისი კვლევითი ინტერესები მოიცავს რადიაციულ ქიმიას, რადიაციულ-თერმულ პროცესებს, გარემოს ქიმიას, ენერგეტიკულ ტექნოლოგიებსა და ორგანული საწვავისა და ნარჩენების რადიაციულ-ქიმიურ გარდაქმნას. მისი კვლევები განსაკუთრებით ფოკუსირებულია ნავთობპროდუქტების, ნავთობის შემცველი ნარჩენებისა და წყლების რადიაციულ დამუშავებაზე, ასევე — მყარი და თხევადი ორგანული მასალებიდან წყალბადისა და სინთეზ-გაზის მიღებაზე. პროფესორი მუსტაფაევი 315-ზე მეტი სამეცნიერო პუბლიკაციის ავტორია და ფლობს 17 პატენტსა და საავტორო მოწმობას. იგი ასევე არის ჟურნალ „Journal of Radiation Researches“-ის მთავარი რედაქტორი და რადიაციული ქიმიისა და გარემოსდაცვითი კვლევების სფეროში შეტანილი წვლილისთვის არაერთი ეროვნული სამეცნიერო ჯილდო აქვს მიღებული.',
        image: '/conference-2026/speakers/Mustafayev.jpg',
        countryEn: 'Azerbaijan',
        countryKa: 'აზერბაიჯანი',
    },
];

export const CONFERENCE_COMMITTEES = {
    organizingSecretariat: {
        titleEn: 'Secretariat of Organizing Committee',
        titleKa: 'საორგანიზაციო კომიტეტის სამდივნო',
        head: {
            titleEn: 'Head',
            titleKa: 'ხელმძღვანელი',
            nameEn: 'Dr. Tinatin Lezhava',
            nameKa: 'დოქტ. თინათინ ლეჟავა',
        },
        members: [
            { nameEn: 'Dr. Lela Kvinikadze', nameKa: 'დოქტ. ლელა კვინიკაძე' },
            { nameEn: 'Dr. Nikoloz Nioradze', nameKa: 'დოქტ. ნიკოლოზ ნიორაძე' },
            { nameEn: 'Dr. Elizaveta Tskhakaia', nameKa: 'დოქტ. ელიზავეტა ცხაკაია' },
            { nameEn: 'Dr. Marine Matchavariani', nameKa: 'დოქტ. მარინე მაჭავარიანი' },
            { nameEn: 'Dr. Nino Giorgadze', nameKa: 'დოქტ. ნინო გიორგაძე' },
            { nameEn: 'Dr. Mzia Ghaghloshvili', nameKa: 'დოქტ. მზია ღაღოლიშვილი' },
            { nameEn: 'Dr. Nino Vepkhishvili', nameKa: 'დოქტ. ნინო ვეფხიშვილი' },
            { nameEn: 'Dr. Nino Zavradashvili', nameKa: 'დოქტ. ნინო ზავრადაშვილი' },
            { nameEn: 'Sofo Tskitishvili', nameKa: 'სოფო ცქიტიშვილი' },
            { nameEn: 'Zurab Samkharadze', nameKa: 'ზურაბ სამხარაძე' },
        ]
    },
    scientificSecretariat: {
        titleEn: 'Secretariat of International Scientific Committee',
        titleKa: 'საერთაშორისო სამეცნიერო კომიტეტის სამდივნო',
        head: {
            titleEn: 'Head',
            titleKa: 'ხელმძღვანელი',
            nameEn: 'Dr. Grigor Tatishvili',
            nameKa: 'დოქტ. გრიგორ ტატიშვილი',
        },
        deputyHead: {
            titleEn: 'Deputy Head',
            titleKa: 'მოადგილე',
            nameEn: 'Dr. Natela Ananiashvili',
            nameKa: 'დოქტ. ნათელა ანანიაშვილი',
        },
        members: [
            { nameEn: 'Dr. Tamaz Marsagishvili', nameKa: 'დოქტ. თამაზ მარსაგიშვილი' },
            { nameEn: 'Dr. Stefano Bellucci', nameKa: 'დოქტ. სტეფანო ბელუჩი' },
            { nameEn: 'Academician Ramaz Katsarava, Georgian National Academy of Sciences', nameKa: 'აკადემიკოსი რამაზ ქაცარავა, საქართველოს მეცნიერებათა ეროვნული აკადემია' },
            { nameEn: 'Dr. Corr. member of Azerbaijan National Academy of Sciences, Islam Mustafayev', nameKa: 'აზერბაიჯანის მეცნიერებათა ეროვნული აკადემიის წევრ-კორესპონდენტი, პროფ. ისლამ მუსტაფაევი' },
            { nameEn: 'Dr. Levan Shavadze', nameKa: 'დოქტ. ლევან შავაძე' },
            { nameEn: 'Dr. Venko Beschkov', nameKa: 'დოქტ. ვენკო ბეშკოვი' },
            { nameEn: 'Dr. Akif Aliyev', nameKa: 'დოქტ. აკიფ ალიევი' },
            { nameEn: 'Dr. Mariam Tsatsanashvili', nameKa: 'დოქტ. მარიამ ცაცანაშვილი' },
        ]
    }
};


