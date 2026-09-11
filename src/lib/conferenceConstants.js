export const CONFERENCE_TOPICS = [
    {
        id: '1',
        num: 'I',
        titleKa: 'I. ნანოპროცესები და ნანოტექნოლოგიები',
        titleEn: 'I. Nanoprocesses and nanotechnologies',
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
        titleEn: 'II. Fundamental and technological aspects of mineral and secondary raw material processing',
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
        titleEn: 'III. Green chemistry',
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
        titleEn: 'IV. Popularization and commercialization of scientific innovations',
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
        return lang === 'en' ? 'In-Person (პირისპირ)' : 'პირისპირ (დარბაზში)';
    }
    return lang === 'en' ? 'Online (ონლაინ)' : 'ონლაინ (დისტანციური)';
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
        affiliationEn: 'Institute of Catalysis and Inorganic Chemistry named after acad. M. Nagiyev, ANAS, Baku, Azerbaijan',
        affiliationKa: 'აკად. მ. ნაგიევის სახელობის კატალიზისა და არაორგანული ქიმიის ინსტიტუტი, აზერბაიჯანის მეცნიერებათა ეროვნული აკადემია (AMEA)',
        roleEn: 'Head of Laboratory of Nanoelectrochemistry and Electrocatalysis',
        roleKa: 'ნანოელექტროქიმიისა და ელექტროკატალიზის ლაბორატორიის ხელმძღვანელი',
        topicEn: 'Nanoelectrochemistry and Electrocatalysis: Semiconductor Thin Films and Photoelectrolysis',
        topicKa: 'ნანოელექტროქიმია და ელექტროკატალიზი: ნახევარგამტარული თხელი ფენები და წყლის ფოტოელექტროლიზი',
        bioEn: 'Doctor of Chemical Sciences, Professor, and leading specialist in nanoelectrochemistry and semiconductor nanostructured materials. His work pioneers the development of GaAs/TiO2 and GaP/TiO2 photoanodic heterosystems for solar water photoelectrolysis and electrochemical thin-film deposition. Founder and Executive Secretary of the SCOPUS-indexed journal "Chemical Problems".',
        bioKa: 'ქიმიის მეცნიერებათა დოქტორი, პროფესორი და ნანოელექტროქიმიისა და ელექტროკატალიზის ლაბორატორიის ხელმძღვანელი. იკვლევს ნახევარგამტარულ ნანომასალებს, GaAs/TiO2 და GaP/TiO2 ჰეტეროსისტემებს წყლის მზის ფოტოელექტროლიზისთვის და თხელი ფენების ელექტროქიმიურ სინთეზს. არის საერთაშორისო SCOPUS-ინდექსირებული ჟურნალ „Chemical Problems“-ის თანადამფუძნებელი და აღმასრულებელი მდივანი.',
        image: '/conference-2026/speakers/akif-aliyev.jpg',
        countryEn: 'Azerbaijan',
        countryKa: 'აზერბაიჯანი',
    },
    {
        id: 'lisdat',
        nameEn: 'Prof. Dr. Fred Lisdat',
        nameKa: 'პროფ. ფრედ ლისდატი',
        affiliationEn: 'Institute of Applied Life Sciences and Biomedical Technologies, Technical University of Applied Sciences Wildau (TH Wildau), Germany',
        affiliationKa: 'გამოყენებითი ბიომეცნიერებებისა და ბიოსამედიცინო ტექნოლოგიების ინსტიტუტი, ვილდაუს ტექნიკური უნივერსიტეტი (TH Wildau), გერმანია',
        roleEn: 'Chair of Biosystems Technology, President of the Bioelectrochemical Society (BES)',
        roleKa: 'ბიოსისტემური ტექნოლოგიების კათედრის ხელმძღვანელი, ბიოელექტროქიმიური საერთაშორისო საზოგადოების (BES) პრეზიდენტი',
        topicEn: 'Biosystems Engineering: Photo-Active Biomolecules and Electrochemical Sensing Interfaces',
        topicKa: 'ბიოსისტემური ინჟინერია: ფოტოაქტიური ბიომოლეკულები და ელექტროქიმიური სენსორული ინტერფეისები',
        bioEn: 'World-renowned scholar in biosensors, direct protein electrochemistry, biofuel cells, and impedance spectroscopy. Chair of Biosystems Technology at TH Wildau and elected President of the International Bioelectrochemical Society (BES). Recipient of the prestigious Bioelectrochemistry Prize for outstanding contributions to bioelectronics and analytical sensor systems.',
        bioKa: 'მსოფლიოში აღიარებული მეცნიერი ბიოსენსორების, ცილოვანი ელექტროქიმიის, ბიოსათბობი ელემენტებისა და იმპედანს-სპექტროსკოპიის მიმართულებით. ვილდაუს ტექნიკური უნივერსიტეტის პროფესორი და საერთაშორისო ბიოელექტროქიმიური საზოგადოების (BES) პრეზიდენტი. ბიოელექტროქიმიისა და ანალიზური სენსორული სისტემების განვითარებაში შეტანილი განსაკუთრებული წვლილისთვის მინიჭებული აქვს Bioelectrochemistry Prize.',
        image: '/conference-2026/speakers/fred-lisdat.jpg',
        countryEn: 'Germany',
        countryKa: 'გერმანია',
    },
];


