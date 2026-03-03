export const newsData = [
    {
        id: 1,
        category: 'news',
        date: '2024-03-01',
        title: 'ინსტიტუტში ახალი ლაბორატორია გაიხსნა',
        titleEn: 'New Laboratory Opened at the Institute',
        description: 'თბილისის სახელმწიფო უნივერსიტეტის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში თანამედროვე სტანდარტების ახალი ლაბორატორია ამოქმედდა.',
        descriptionEn: 'A new state-of-the-art laboratory has been opened at the TSU Institute of Inorganic Chemistry and Electrochemistry.',
        content: `თბილისის სახელმწიფო უნივერსიტეტის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში თანამედროვე სტანდარტების ახალი ლაბორატორია ამოქმედდა. პროექტი განხორციელდა საერთაშორისო პარტნიორების მხარდაჭერით და მიზნად ისახავს კვლევითი შესაძლებლობების გაფართოებას მწვანე ენერგიის მიმართულებით. 
        ლაბორატორია აღჭურვილია უახლესი აპარატურით, რაც მკვლევარებს საშუალებას მისცემს ჩაატარონ მაღალი სიზუსტის ექსპერიმენტები.`,
        contentEn: `A new state-of-the-art laboratory has been opened at the TSU Institute of Inorganic Chemistry and Electrochemistry. The project was implemented with the support of international partners and aims to expand research capabilities in the field of green energy.
        The laboratory is equipped with the latest technology, allowing researchers to conduct high-precision experiments.`,
        imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&q=80',
            'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
            'https://images.unsplash.com/photo-1532187875605-7fe35984366b?w=1200&q=80',
            'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=80'
        ]
    },
    {
        id: 2,
        category: 'seminars',
        date: '2024-03-15',
        title: 'სემინარი: ელექტროქიმიური ინოვაციები',
        titleEn: 'Seminar: Electrochemical Innovations',
        description: 'ჩატარდება სამეცნიერო სემინარი ელექტროქიმიის თანამედროვე გამოწვევებისა და ინოვაციების შესახებ.',
        descriptionEn: 'A scientific seminar will be held on modern challenges and innovations in electrochemistry.',
        content: `მოხარული ვართ მოგიწვიოთ სამეცნიერო სემინარზე, რომელიც ეძღვნება ელექტროქიმიის სფეროში არსებულ ბოლო მიღწევებს. მომხსენებლები იქნებიან როგორც ქართველი, ასევე მოწვეული საერთაშორისო ექსპერტები.
        სემინარი მოიცავს დისკუსიას ახალი ტიპის ელემენტებისა და ენერგიის შენახვის ტექნოლოგიების შესახებ.`,
        contentEn: `We are pleased to invite you to a scientific seminar dedicated to recent achievements in the field of electrochemistry. Speakers will include both Georgian and invited international experts.
        The seminar will include a discussion on new types of batteries and energy storage technologies.`,
        imageUrl: 'https://images.unsplash.com/photo-1591115710333-f750f0ef1b22?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1591115710333-f750f0ef1b22?w=1200&q=80',
            'https://images.unsplash.com/photo-1540575861501-7ad067638ef4?w=1200&q=80'
        ]
    },
    ...Array.from({ length: 38 }, (_, i) => ({
        id: i + 3,
        category: i % 2 === 0 ? 'news' : 'seminars',
        date: `2024-02-${String((i % 28) + 1).padStart(2, '0')}`,
        title: `სატესტო სიახლე #${i + 3}`,
        titleEn: `Test News #${i + 3}`,
        description: 'ეს არის სატესტო სიახლის მოკლე აღწერა, რომელიც გამოიყენება დიზაინის შესამოწმებლად.',
        descriptionEn: 'This is a short description of a test news item used for design verification.',
        content: 'ეს არის სრული ტექსტი სატესტო სიახლისთვის. აქ შეიძლება იყოს განთავსებული ვრცელი ინფორმაცია კვლევების, მიღწევებისა და სხვადასხვა ღონისძიებების შესახებ.',
        contentEn: 'This is the full text for the test news item. Detailed information about research, achievements, and various events can be placed here.',
        imageUrl: `https://images.unsplash.com/photo-${[
            '1532187875605-7fe35984366b',
            '1507413245164-6160d8298b31',
            '1581093588401-fbb62a02f120',
            '1576086213369-97a306d36557',
            '1582719508461-905c673771fd',
            '1591115710333-f750f0ef1b22',
            '1540575861501-7ad067638ef4',
            '1521791136368-328ac1975a31',
            '1557804506-669a67965ba0',
            '1523240795612-9a054b0db644'
        ][i % 10]}?w=800&q=80`,
        images: [
            `https://images.unsplash.com/photo-${[
                '1532187875605-7fe35984366b',
                '1507413245164-6160d8298b31',
                '1581093588401-fbb62a02f120'
            ][i % 3]}?w=1200&q=80`
        ]
    }))
];

