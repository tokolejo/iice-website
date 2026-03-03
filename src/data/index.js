export const departmentsData = [
    {
        id: 'applied-chemistry',
        name: 'გამოყენებითი ქიმიის განყოფილება',
        nameEn: 'Department of Applied Chemistry',
        description: 'დღეს, მსოფლიო განიცდის სწრაფ და დინამიურ ცვლილებებს, რომლებიც გამოწვეულია გარემოსდაცვითი საკითხებით, ენერგეტიკული გამოწვევებით, ინფორმაციული ტექნოლოგიების მიღწევებით და ხელოვნური ინტელექტის სწრაფი პროგრესით. ჩვენს განყოფილებაში ვითარდება კვლევები მაღალი სისუფთავისა და სასურველი ფიზიკო-ქიმიური მახასიათებლების მქონე ახალი ნაერთების სინთეზისა და მათი ენერგეტიკისა და ეკოლოგიის მიმართულებით გამოყენების შესაძლებლობის შესწავლის მიზნით.',
        descriptionEn: 'Today, the world is experiencing rapid and dynamic changes driven by environmental issues, energy challenges, advances in information technology, and the rapid progress of artificial intelligence. Our department develops research aimed at synthesizing new compounds with high purity and desired physical-chemical characteristics, and studying their potential application in energy and ecology.',
    },
    {
        id: 'fundamental-research',
        name: 'ფუნდამენტური კვლევებისა და კომპოზიციური მასალების სინთეზის განყოფილება',
        nameEn: 'Department of Fundamental Research and Composite Materials Synthesis',
        description: 'მიმდინარეობს სამუშაოები განვითარებული ზედაპირის მქონე რთულ ჰეტეროგენულ სისტემებში წყალბადის გამოყოფის პროცესების საფუძვლების შესწავლაზე. ასევე, რთულ არაპოლარულ სისტემებში მუხტის გადატანის პროცესების თეორიული საფუძვლების შემუშავება გარემოს სიხშირული და სივრცითი დისპერსიის ეფექტების გათვალისწინებით. წყალბადის ენერგეტიკის განვითარებისათვის საჭირო მასალების სინთეზი.',
        descriptionEn: 'Work is currently underway to study the fundamentals of hydrogen evolution processes in complex heterogeneous systems with a developed surface. Furthermore, the development of the theoretical fundamentals of charge transfer processes in complex non-polar systems, taking into account the effects of frequency and spatial dispersion of the medium. Synthesis of materials required for the development of hydrogen energy.',
    },
    {
        id: 'coordination-compounds',
        name: 'კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების განყოფილება',
        nameEn: 'Coordination Compounds and Sorption-Catalytic Processes Department',
        description: 'კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების განყოფილება უზრუნველყოფს რამდენიმე სტრუქტურული ერთეულის კატალიზის და არაორგანული ნაერთების ფიზიკა-ქიმიის ლაბორატორიების ინტეგრაციას. კატალიზის მიმართულება მუშაობს CO-ს დაჟანგვის ოქსიდური კატალიზატორების დაფუძნებაზე.',
        descriptionEn: 'The Coordination Compounds and Sorption-Catalytic Processes Department ensures the integration of several structural units, including catalysis and physics-chemistry laboratories of inorganic compounds. The catalysis direction works on establishing oxide catalysts for CO oxidation.',
    },
    {
        id: 'high-energy-chemistry',
        name: 'მაღალი ენერგიების ქიმიის განყოფილება',
        nameEn: 'High Energy Chemistry Department',
        description: 'განყოფილებაში გაერთიანებულია რადიაციული ქიმიის და თერმოქიმიური კვლევების ლაბორატორიები. რადიაციული ქიმიის მიმართულებით შეისწავლება მაიონიზებელი პროცესების ზეგავლენა ობიექტებზე. თერმოქიმიის მიმართულებით ეძიებენ ეფექტური თვისებების მქონე ოქსიდურ მასალებს.',
        descriptionEn: 'The department unites the laboratories of radiation chemistry and thermochemical research. In the field of radiation chemistry, the impact of ionizing processes on objects is studied. In the direction of thermochemistry, oxide materials with effective properties are sought.',
    },
    {
        id: 'phys-chem-analysis',
        name: 'ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილება',
        nameEn: 'Department of Physical-Chemical Research and Analysis',
        description: 'ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილებას აქვს დიდი გამოცდილება პოლაროგრაფიულად განსაზღვროს ესენციალური მიკროელემენტები: სპილენძი, თუთია, ტყვია და კადმიუმი. კვლევები ფოკუსირდება გარემოსდაცვითი ტექნოლოგიების დახვეწაზე.',
        descriptionEn: 'The Department of Physical-Chemical Research and Analysis has extensive experience in the polarographic determination of essential trace elements: copper, zinc, lead, and cadmium. The research focuses on the refinement of environmental technologies.',
    }
];

import { appliedChemistryStaff } from './appliedChemistryStaff';
import { fundamentalResearchStaff } from './fundamentalResearchStaff';
import { coordCompoundsStaff } from './coordCompoundsStaff';
import { highEnergyStaff } from './highEnergyStaff';
import { physChemStaff } from './physChemStaff';

export const staffData = [
    ...appliedChemistryStaff,
    ...fundamentalResearchStaff,
    ...coordCompoundsStaff,
    ...highEnergyStaff,
    ...physChemStaff,
    {
        id: 'tsurtsumia',
        name: 'გიგლა წურწუმია',
        nameEn: 'Gigla Tsurtsumia',
        role: 'მთავარი მეცნიერი თანამშრომელი',
        roleEn: 'Chief Research Scientist',
        department: 'ადმინისტრაცია',
        departmentId: 'administration',
        imageUrl: '/images/staff/Gigla Tsurtsumia-pic.jpg',
        placeholderUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        bioLink: '',
        bioLinkEn: '',
        cvLink: '',
        cvLinkEn: '',
        emails: ['giglat@hotmail.com'],
        links: [
            { title: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=en&user=gicYVU0AAAAJ' },
            { title: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=15842446600' },
            { title: 'Web of Science', url: 'https://www.webofscience.com/wos/author/record/31795455' },
            { title: 'LinkedIn', url: 'https://www.linkedin.com/in/gigla-tsurtsumia-1089333aa/' }
        ],
        isHead: false
    }
];
