export const CONFERENCE_TOPICS = [
    { id: '1', titleKa: 'ნანოპროცესები და ნანოტექნოლოგიები', titleEn: 'Nanoprocesses and Nanotechnologies' },
    { id: '2', titleKa: 'სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები', titleEn: 'Fundamental and Technological Aspects of Mineral and Secondary Raw Material Processing' },
    { id: '3', titleKa: 'მწვანე ქიმია', titleEn: 'Green Chemistry' },
    { id: '4', titleKa: 'სამეცნიერო ინოვაციების პოპულარიზაცია და კომერციალიზაცია', titleEn: 'Popularization and Commercialization of Scientific Innovations' },
    { id: '5', titleKa: 'სურსათის ქიმია და ხარისხი', titleEn: 'Food Chemistry and Quality of Food' },
    { id: '6', titleKa: 'STEM+P: მეცნიერება, ინოვაცია და პოლიტიკა', titleEn: 'STEM+P: Science, Innovation and Policy' },
];

export const TOPIC_MAP = {
    '1': 'ნანოპროცესები და ნანოტექნოლოგიები',
    '2': 'სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები',
    '3': 'მწვანე ქიმია',
    '4': 'სამეცნიერო ინოვაციების პოპულარიზაცია და კომერციალიზაცია',
    '5': 'სურსათის ქიმია და ხარისხი',
    '6': 'STEM+P: მეცნიერება, ინოვაცია და პოლიტიკა',
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

