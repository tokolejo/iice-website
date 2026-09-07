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
        affiliationEn: 'INFN-Laboratori Nazionali di Frascati, Frascati, Italy',
        affiliationKa: 'INFN - ფრასკატის ეროვნული ლაბორატორიები, ფრასკატი, იტალია',
        roleEn: 'First Researcher, Head of NEXT Nanotechnology Group',
        roleKa: 'მთავარი მკვლევარი, NEXT ნანოტექნოლოგიების ჯგუფის ხელმძღვანელი',
        topicEn: 'Innovative 2D material for nanoelectronics, molecular sensing, optical properties, and cationic pollutant removal from aqueous solutions',
        topicKa: 'ინოვაციური 2D მასალები ნანოელექტრონიკის, მოლეკულური სენსორების, ოპტიკური თვისებებისა და წყალხსნარებიდან კათიონური დამაბინძურებლების მოსაცილებლად',
        bioEn: 'Professor Bellucci is First Researcher at INFN-Laboratori Nazionali di Frascati and leads advanced investigations in carbon nanotubes, graphene, polymer composites, and biomedical nanotechnology.',
        bioKa: 'პროფესორი ბელუჩი არის INFN-ის ფრასკატის ეროვნული ლაბორატორიების წამყვანი მკვლევარი. ხელმძღვანელობს მოწინავე კვლევებს ნანომასალების, გრაფენის, ნახშირბადის ნანომილაკებისა და ბიომედიცინაში მათი გამოყენების მიმართულებით.',
        image: '/conference-2026/speakers/stefano-bellucci.png',
        countryEn: 'Italy',
        countryKa: 'იტალია',
    },
    {
        id: 'beschkov',
        nameEn: 'Prof. Dr. Venko N. Beschkov',
        nameKa: 'პროფ. ვენკო ნ. ბეშკოვი',
        affiliationEn: 'Institute of Chemical Engineering, Bulgarian Academy of Sciences, Sofia, Bulgaria',
        affiliationKa: 'ქიმიური ინჟინერიის ინსტიტუტი, ბულგარეთის მეცნიერებათა აკადემია, სოფია, ბულგარეთი',
        roleEn: 'Professor, Institute of Chemical Engineering (BAS)',
        roleKa: 'პროფესორი, ქიმიური ინჟინერიის ინსტიტუტი (ბულგარეთის მეცნიერებათა აკადემია)',
        topicEn: 'Carbon-free chemical sources of energy: the hydrogen sulfide',
        topicKa: 'ენერგიის უნახშირბადო ქიმიური წყაროები: გოგირდწყალბადი',
        bioEn: 'Prominent scientist in chemical engineering, environmental protection, bioprocess engineering, and hydrogen sulfide utilization as a renewable, carbon-free energy carrier.',
        bioKa: 'საერთაშორისოდ აღიარებული მეცნიერი ქიმიურ ინჟინერიაში, გარემოსდაცვით ტექნოლოგიებში, ბიოპროცესებსა და გოგირდწყალბადისგან ენერგიის მიღების მწვანე მეთოდებში.',
        image: '/conference-2026/speakers/venko-beschkov.jpg',
        countryEn: 'Bulgaria',
        countryKa: 'ბულგარეთი',
    },
    {
        id: 'tagiyev',
        nameEn: 'Acad. Prof. Dilgam Babir Tagiyev',
        nameKa: 'აკად. პროფ. დილგამ ტაგიევი',
        affiliationEn: 'Institute of Catalysis and Inorganic Chemistry, ANAS, Baku, Azerbaijan',
        affiliationKa: 'მ. ნაგიევის სახ. კატალიზისა და არაორგანული ქიმიის ინსტიტუტი, აზერბაიჯანის მეცნიერებათა ეროვნული აკადემია',
        roleEn: 'Vice-President of ANAS, Director of the Institute of Catalysis and Inorganic Chemistry',
        roleKa: 'აზერბაიჯანის მეცნიერებათა ეროვნული აკადემიის ვიცე-პრეზიდენტი, ინსტიტუტის დირექტორი',
        topicEn: 'Heterogeneous and homogeneous catalysts for petrochemical synthesis and eco-friendly technologies',
        topicKa: 'ჰეტეროგენული და ჰომოგენური კატალიზატორები ნავთობქიმიური სინთეზისა და ეკოლოგიურად სუფთა ტექნოლოგიებისთვის',
        bioEn: 'Academician Tagiyev is a leading international expert in chemical kinetics, catalysis, and zeolite chemistry, authoring numerous international monographs.',
        bioKa: 'აკადემიკოსი ტაგიევი არის ქიმიური კინეტიკის, კატალიზისა და ცეოლითების ქიმიის წამყვანი ექსპერტი, მრავალი საერთაშორისო მონოგრაფიისა და სამეცნიერო პროექტის ავტორი.',
        image: null,
        initials: 'DT',
        countryEn: 'Azerbaijan',
        countryKa: 'აზერბაიჯანი',
    },
    {
        id: 'aliyev',
        nameEn: 'Prof. Dr. Akif Shikhan Aliyev',
        nameKa: 'პროფ. აკიფ ალიევი',
        affiliationEn: 'Institute of Catalysis and Inorganic Chemistry, ANAS, Baku, Azerbaijan',
        affiliationKa: 'მ. ნაგიევის სახ. კატალიზისა და არაორგანული ქიმიის ინსტიტუტი, აზერბაიჯანის მეცნიერებათა ეროვნული აკადემია',
        roleEn: 'Head of Laboratory of Nanoelectrochemistry and Electrocatalysis',
        roleKa: 'ნანოელექტროქიმიისა და ელექტროკატალიზის ლაბორატორიის ხელმძღვანელი',
        topicEn: 'Nanoelectrochemistry and Electrocatalysis: Semiconductor Thin Films and Photoelectrolysis',
        topicKa: 'ნანოელექტროქიმია და ელექტროკატალიზი: ნახევარგამტარული თხელი ფენები და წყლის ფოტოელექტროლიზი',
        bioEn: 'Doctor of Chemical Sciences, specializing in semiconductor nanostructured materials, photoelectrochemical water splitting, and thin-film electrodeposition.',
        bioKa: 'ქიმიის მეცნიერებათა დოქტორი, იკვლევს ნახევარგამტარულ ნანომასალებს, წყლის ფოტოელექტროლიზსა და ელექტროკატალიზურ პროცესებს.',
        image: null,
        initials: 'AA',
        countryEn: 'Azerbaijan',
        countryKa: 'აზერბაიჯანი',
    },
    {
        id: 'lisdat',
        nameEn: 'Prof. Dr. Fred Lisdat',
        nameKa: 'პროფ. ფრედ ლისდატი',
        affiliationEn: 'Institute of Applied Life Sciences and Biomedical Technologies, TH Wildau, Wildau, Germany',
        affiliationKa: 'სიცოცხლის შემსწავლელი გამოყენებითი მეცნიერებებისა და ბიოსამედიცინო ტექნოლოგიების ინსტიტუტი, ვილდაუს ტექნიკური უნივერსიტეტი, გერმანია',
        roleEn: 'Chair of Biosystems Technology, President of the Bioelectrochemical Society',
        roleKa: 'ბიოსისტემური ტექნოლოგიების კათედრის ხელმძღვანელი, ბიოელექტროქიმიური საზოგადოების პრეზიდენტი',
        topicEn: 'Biosystems engineering, electrochemical biosensors, and impedance spectroscopy in sensing interfaces',
        topicKa: 'ბიოსისტემური ინჟინერია, ელექტროქიმიური ბიოსენსორები და იმპედანსური სპექტროსკოპია სენსორულ ინტერფეისებში',
        bioEn: 'World-renowned scholar in biosensors, direct protein electrochemistry, and bio-fuel cells. Elected President of the Bioelectrochemical Society in 2022.',
        bioKa: 'ბიოელექტროქიმიის, ბიოსენსორებისა და ცილოვანი ელექტროქიმიის მსოფლიოში აღიარებული მეცნიერი. 2022 წლიდან საერთაშორისო ბიოელექტროქიმიური საზოგადოების პრეზიდენტი.',
        image: null,
        initials: 'FL',
        countryEn: 'Germany',
        countryKa: 'გერმანია',
    },
];


