export const departmentsData = [
    {
        id: 'applied-chemistry',
        name: 'გამოყენებითი ქიმიის განყოფილება',
        nameEn: 'Department of Applied Chemistry',
        description: 'დღეს, მსოფლიო განიცდის სწრაფ და დინამიურ ცვლილებებს, რომლებიც გამოწვეულია გარემოსდაცვითი საკითხებით, ენერგეტიკული გამოწვევებით, ინფორმაციული ტექნოლოგიების მიღწევებით და ხელოვნური ინტელექტის სწრაფი პროგრესით. ჩვენს განყოფილებაში ვითარდება კვლევები მაღალი სისუფთავისა და სასურველი ფიზიკო-ქიმიური მახასიათებლების მქონე ახალი ნაერთების სინთეზისა და მათი ენერგეტიკისა და ეკოლოგიის მიმართულებით გამოყენების შესაძლებლობის შესწავლის მიზნით.',
    },
    {
        id: 'fundamental-research',
        name: 'ფუნდამენტური კვლევებისა და კომპოზიციური მასალების სინთეზის განყოფილება',
        nameEn: 'Department of Fundamental Research and Composite Materials Synthesis',
        description: 'მიმდინარეობს სამუშაოები განვითარებული ზედაპირის მქონე რთულ ჰეტეროგენულ სისტემებში წყალბადის გამოყოფის პროცესების საფუძვლების შესწავლაზე. ასევე, რთულ არაპოლარულ სისტემებში მუხტის გადატანის პროცესების თეორიული საფუძვლების შემუშავება გარემოს სიხშირული და სივრცითი დისპერსიის ეფექტების გათვალისწინებით. წყალბადის ენერგეტიკის განვითარებისათვის საჭირო მასალების სინთეზი.',
    },
    {
        id: 'coordination-compounds',
        name: 'კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების განყოფილება',
        nameEn: 'Coordination Compounds and Sorption-Catalytic Processes Department',
        description: 'კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების განყოფილება უზრუნველყოფს რამდენიმე სტრუქტურული ერთეულის კატალიზის და არაორგანული ნაერთების ფიზიკა-ქიმიის ლაბორატორიების ინტეგრაციას. კატალიზის მიმართულება მუშაობს CO-ს დაჟანგვის ოქსიდური კატალიზატორების დაფუძნებაზე.',
    },
    {
        id: 'high-energy-chemistry',
        name: 'მაღალი ენერგიების ქიმიის განყოფილება',
        nameEn: 'High Energy Chemistry Department',
        description: 'განყოფილებაში გაერთიანებულია რადიაციული ქიმიის და თერმოქიმიური კვლევების ლაბორატორიები. რადიაციული ქიმიის მიმართულებით შეისწავლება მაიონიზებელი პროცესების ზეგავლენა ობიექტებზე. თერმოქიმიის მიმართულებით ეძიებენ ეფექტური თვისებების მქონე ოქსიდურ მასალებს.',
    },
    {
        id: 'phys-chem-analysis',
        name: 'ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილება',
        nameEn: 'Department of Physical-Chemical Research and Analysis',
        description: 'ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილებას აქვს დიდი გამოცდილება პოლაროგრაფიულად განსაზღვროს ესენციალური მიკროელემენტები: სპილენძი, თუთია, ტყვია და კადმიუმი. კვლევები ფოკუსირდება გარემოსდაცვითი ტექნოლოგიების დახვეწაზე.',
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
