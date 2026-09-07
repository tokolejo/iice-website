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
