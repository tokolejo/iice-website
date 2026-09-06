-- ==============================================================================
-- TSU IICE (Raphael Agladze Institute) - COMPLETE MASTER SUPABASE DATABASE SCHEMA
-- Generated with ALL Website Data (Departments, Staff, News, Infrastructure, Auth, 2026 Conf)
-- Execute this entire script in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description_ka TEXT,
    description_en TEXT,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Seed Departments
INSERT INTO public.departments (slug, name_ka, name_en, description_ka, description_en, order_index)
VALUES ('applied-chemistry', 'გამოყენებითი ქიმიის განყოფილება', 'Department of Applied Chemistry', 'დღეს, მსოფლიო განიცდის სწრაფ და დინამიურ ცვლილებებს, რომლებიც გამოწვეულია გარემოსდაცვითი საკითხებით, ენერგეტიკული გამოწვევებით, ინფორმაციული ტექნოლოგიების მიღწევებით და ხელოვნური ინტელექტის სწრაფი პროგრესით. ამის ფონზე, უაღრესად მნიშვნელოვანია ახალი მასალების შექმნა და მათი გამოყენება პრაქტიკულ, თანამედროვე ტექნოლოგიებში. ჩვენს განყოფილებაში ვითარდება კვლევები მაღალი სისუფთავისა და სასურველი ფიზიკო-ქიმიური მახასიათებლების მქონე ახალი ნაერთების სინთეზისა და მათი ენერგეტიკისა და ეკოლოგიის მიმართულებით გამოყენების შესაძლებლობის შესწავლის მიზნით.

ცირკულარული ეკონომიკის კონცეფცია რომელიც წარმოადგენს რევოლუციურ გადახვევას ტრადიციული „ამოიღე-აწარმოე-მოიშორე“ მოდელიდან მიზნად ისახავს პროდუქტების, კომპონენტებისა და მასალების სარგებლიანობისა და ღირებულების ოპტიმიზაციას მათი მიმოქცევაში რაც შეიძლება დიდხანს შენარჩუნების უზრუნველყოფით. სწორედ ასეთი მიდგომებით ხელმძღვანელობს ჩვენი განყოფილება და ავითარებს ისეთ პროექტებს რომლებიც ემსახურება გარემოზე ზემოქმედებისა და რესურსებზე დამოკიდებულების შემცირებას მეორადი ნედლეულის, ნამუშევარი კომპონენტების და ნარჩენი მასალების გამოყენების ხელშეწყობის გზით.

ჩვენს განყოფილებაში, მანგანუმის შემცველი მეორადი ნედლეულის სხვადასხვა მეთოდით გადამუშავებით ვახორციელებთ მაღალი სისუფთავის მანგანუმის სულფატის მონოჰიდრატის მიღებას რომელიც გამოიყენება ლითიუმ იონური ბატარეების საკათოდე მასალის მწარმოებელ კომპონენტად. ჩვენთან ხდება ნამუშევარი ბატარეების უტილიზაციისა და საწარმოო მნიშვნელობის მქონე პროდუქტების (ლითიუმი, მანგანუმის დიოქსიდი) ამოღების ტექნოლოგიების დამუშავება. ასევე პრიორიტეტულია ჩამდინარე საწარმოო წყლების გაწმენდა და მათგან ლითონების ამოღების მეთოდების შემუშავება.

გამოსარჩევია არაორგანული პოლიმერების და ცვეთამედეგი მასალების სინთეზის მიმართულებით გაწეული სამუშაოები. წყალბადის წყალხსნარებიდან გენერირების (წყალბადის ენერგეტიკა) სამუშაოები ასევე არის მოქცეული ჩვენი განყოფიელბის სამეცნიერო ინტერესის სფეროში.

გამოყენებითი ქიმიის განყოფილების პრიორიტეტებში შედის საგანმანათლებო პროცესში აქტიური ჩართულობა. ჩვენთან სისტემატურად გადიან სტაჟირებას და ასრულებენ საბაკალავრო სამეცნიერო კვლევებს თსუ-ს და საქართველოს აგრარული უნივერსიტეტების სტუდენტები. ჩვენთან პრაქტიკა გავლილი სტუდენტები დასაქმებული არიან სპეციალობით ან აგრძელებენ სწავლას როგორც საქართველოში ისე ქვეყნის ფარგლებს გარეთ ევროპის მაღალ რეიტინგულ პროგრამებზე.

განყოფილებაში მუშაობს 26 კვალიფიციური თანამშრომელი. აქედან 6 მთავარი, 12 უფროსი და 8 მეცნიერ თანამშრომელი.', 'Today, the world is experiencing rapid and dynamic changes driven by environmental issues, energy challenges, advances in information technology, and the rapid progress of artificial intelligence. Against this background, the creation of new materials and their application in practical modern technologies is highly important. Our department conducts research aimed at the synthesis of new compounds with high purity and desired physical-chemical characteristics, as well as exploring their potential application in the fields of energy and ecology.

The concept of the circular economy, which represents a revolutionary departure from the traditional ''take-make-dispose'' model, aims to optimize the utility and value of products, components, and materials by ensuring they remain in circulation for as long as possible. Our department is guided by these very approaches and develops projects that serve to reduce environmental impact and reliance on primary resources by promoting the use of secondary raw materials, spent components, and residual materials.

In our department, through the processing of manganese-containing secondary raw materials by various methods, we produce a high-purity manganese sulfate monohydrate, which is used as an essential component in manufacturing cathode materials for lithium-ion batteries. We develop technologies for the utilization of spent batteries and the extraction of industrially significant products (lithium, manganese dioxide). Another priority is the purification of industrial wastewater and the development of methods for extracting metals from it.

The research carried out in the field of synthesizing inorganic polymers and wear-resistant materials is particularly noteworthy. Furthermore, works on hydrogen generation from aqueous solutions (hydrogen energy) fall within the scope of our department''s scientific interest.

Active involvement in the educational process is among the priorities of the Department of Applied Chemistry. Students of Tbilisi State University and the Agricultural University of Georgia systematically undergo internships and perform their bachelor''s scientific research with us. Students who have completed practical training with us are subsequently employed in their specialty or continue their studies in highly ranked programs in Europe, both within Georgia and abroad.

The department employs 26 qualified staff members. Among them are 6 chief researchers, 12 senior researchers, and 8 researchers.', 1)
ON CONFLICT (slug) DO UPDATE SET
    name_ka = EXCLUDED.name_ka,
    name_en = EXCLUDED.name_en,
    description_ka = EXCLUDED.description_ka,
    description_en = EXCLUDED.description_en,
    order_index = EXCLUDED.order_index;
INSERT INTO public.departments (slug, name_ka, name_en, description_ka, description_en, order_index)
VALUES ('fundamental-research', 'ფუნდამენტური კვლევებისა და კომპოზიციური მასალების სინთეზის განყოფილება', 'Department of Fundamental Research and Composite Materials Synthesis', 'მიმდინარეობს სამუშაოები განვითარებული ზედაპირის მქონე რთულ ჰეტეროგენულ სისტემებში წყალბადის გამოყოფის პროცესების საფუძვლების შესწავლაზე. ასევე, რთულ არაპოლარულ სისტემებში მუხტის გადატანის პროცესების თეორიული საფუძვლების შემუშავება გარემოს სიხშირული და სივრცითი დისპერსიის ეფექტების გათვალისწინებით. წყალბადის ენერგეტიკის განვითარებისათვის საჭირო მასალების: ინტერმეტალიდების და კომპოზიციური მასალების, ორ და სამ კომპონენტიანი ფხვნილების სინთეზი, მიღებული მასალების ჰიდრირება და პროცესების თერმოდინამიკური და კინეტიკური პარამეტრების განსაზღვრა.

განყოფილების კვლევების მიზანია, საქართველოში მწვანე წყალბდის და შესაბამისად, მწვანე ეკონომიკის განვითარებისთვის მნიშვნელოვანი – წყალბადის აკუმულირების და ტრანსპორტირებისათვის საჭირო – პერიოდული სისტემის IV და V თანაური ჯგუფის ლითონების ბაზაზე ინტერმეტალიდების ელექტროქიმიური სინთეზი და მათი შემდგომი ჰიდრირება. მიღებული იქნება ანალიზური გამოსახულებები არაპოლარულ სისტემებში წყალბადის გამოყოფით მიმდინარე მუხტის გადატანის პროცესების კინეტიკური პარამეტრებისათვის გარემოს სიხშირული და სივრცითი დისპერსიის ეფექტების გათვალისწინებით.

ჰეტეროგენული და ჰომოგენური არაპოლარული სისტემები, განხილული იქნება, როგორც შემთხვევითი ძალების ან იმპულსების ველი, რომელიც მოქმედებს მორეაგირე ნაწილაკებზე. გარემო აღწერილი იქნება სიხშირული და სივრცითი დისპერსიის ეფექტების გათვალისწინებით, რეაგენტების გარემოსთან ურთიერთქმედება აღწერილი იქნება გარემოს ნაწილაკის იმპულსის ფლუქტუაციისა და რეაგენტის სიჩქარის ფუნქციის საშუალებით. ასეთი სისტემის კინეტიკური პარამეტრების გათვლისას გამოყენებული იქნება მუხტის გადატანის პროცესების კვანტური თეორია კონდენსირებული გარემოს იმპულსების სიმკვრივის ოპერატორების გრინის ტემპერატურული ფუნქციების გამოყენებით. მიღებული იქნება ანალიზური გამოსახულებები პროცესის კინეტიკური პარამეტრებისათვის.

განყოფილება აგრძელებს მრავალწლიან კვლევებს შემდეგი 2 მიმართულებით:<br /> 1. ცელულოზაშემცველი სასოფლო-სამეურნეო ნარჩენების გადამუშავება და მიღებული პროდუქტის გამოყენება ადსორბენტებად სასმელი და ჩამდინარე წყლების მძიმე ლითონებისაგან, ანტიბიოტიკებისაგან გასაწმენდად; მიმდინარეობს იგივე მასალის გამოცდა გამონაბოლქვი მავნე აირების ჩასაჭერად.<br /> 2. წყლიდან წყალბადის ელექტროქიმიური მეთოდით მიღებისათვის საელექტროდე მასალების შემუშავება.', 'Work is currently underway to study the theoretical fundamentals of hydrogen evolution processes in complex heterogeneous systems with an enhanced surface area. Furthermore, it involves the development of theoretical foundations for charge transfer processes in complex non-polar systems, taking into account the effects of the spatial and frequency dispersion of the medium. The research also focuses on the synthesis of materials required for the development of hydrogen energy, including intermetallics, composite materials, and two- or three-component powders, as well as the hydrogenation of the synthesized materials and the determination of the thermodynamic and kinetic parameters of these processes.

The goal of the department''s research is to facilitate the development of green hydrogen and, consequently, the green economy in Georgia. This involves the electrochemical synthesis of intermetallics based on the transition metals of Groups IV and V of the periodic system—which are essential for hydrogen accumulation and transportation—and their subsequent hydrogenation. Analytical expressions will be derived for the kinetic parameters of charge transfer processes accompanying hydrogen evolution in non-polar systems, taking the effects of spatial and frequency dispersion of the medium into account.

Heterogeneous and homogeneous non-polar systems will be considered as a field of random forces or impulses acting upon reacting particles. The medium will be described considering the effects of frequency and spatial dispersion, and the interaction of the reagents with the environment will be modeled using the fluctuation of the medium particle''s momentum and the velocity function of the reagent. For the calculation of the kinetic parameters of such a system, the quantum theory of charge transfer processes will be applied using the temperature Green''s functions of the operators of impulse density of the condensed media. Analytical expressions for the kinetic parameters of the process will be obtained.

The department continues its long-term research in two main directions:<br /> 1. The processing of cellulose-containing agricultural waste and the application of the resulting product as adsorbents for purifying drinking and wastewater from heavy metals and antibiotics. The same material is currently being tested for the capture of harmful exhaust gases.<br /> 2. The development of electrode materials for the electrochemical production of hydrogen from water.', 2)
ON CONFLICT (slug) DO UPDATE SET
    name_ka = EXCLUDED.name_ka,
    name_en = EXCLUDED.name_en,
    description_ka = EXCLUDED.description_ka,
    description_en = EXCLUDED.description_en,
    order_index = EXCLUDED.order_index;
INSERT INTO public.departments (slug, name_ka, name_en, description_ka, description_en, order_index)
VALUES ('coordination-compounds', 'კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების განყოფილება', 'Coordination Compounds and Sorption-Catalytic Processes Department', 'კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების განყოფილება უზრუნველყოფს რამდენიმე სტრუქტურული ერთეულის კატალიზის და არაორგანული ნაერთების ფიზიკა-ქიმიის ლაბორატორიების ინტეგრაციას.

კატალიზის მიმართულება მუშაობს CO-ს დაჟანგვის ოქსიდური კატალიზატორების ფიზიკო-ქიმიური მახასიათებლების მოდიფიცირებასა და აირგამწმენდ ეკოლოგიურ პროცესებში მათი გამოყენების დადგენის მიმართულებით. არაორგანული ნაერთების ფიზიკა-ქიმიის ლაბორატორია კი წლებია წარმატებით მუშაობს კომპლექსური ნაერთების სინთეზის, მათი აგებულებისა და თვისებების კვლევის მიმართულებით.

განყოფილების საქმიანობა ეფუძნება იმ ძირითად პრინციპებსა და მიდგომებს, რაც კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების შესწავლის ძირითად ფუნდამენტად მიიჩნევა. განყოფილების ძირითად მიმართულებად განისაზღვრება სორბციული და კატალიზური პროცესების შესწავლა.', 'The Coordination Compounds and Sorption-Catalytic Processes Department ensures the integration of several structural units, namely the Catalysis and the Physics and Chemistry of Inorganic Compounds laboratories.

The Catalysis direction is working on modifying the physical and chemical characteristics of oxide catalysts for CO oxidation and determining their application in ecological gas purification processes. Meanwhile, the Laboratory of Physics and Chemistry of Inorganic Compounds has been successfully working for years in the direction of the synthesis, structure, and property investigation of complex compounds.

The department''s activities are based on the core principles and approaches that are considered the fundamental basis for studying coordination compounds and sorption-catalytic processes. The primary focus of the department has been defined as the investigation of sorption and catalytic processes.', 3)
ON CONFLICT (slug) DO UPDATE SET
    name_ka = EXCLUDED.name_ka,
    name_en = EXCLUDED.name_en,
    description_ka = EXCLUDED.description_ka,
    description_en = EXCLUDED.description_en,
    order_index = EXCLUDED.order_index;
INSERT INTO public.departments (slug, name_ka, name_en, description_ka, description_en, order_index)
VALUES ('high-energy-chemistry', 'მაღალი ენერგიების ქიმიის განყოფილება', 'High Energy Chemistry Department', 'განყოფილებაში გაერთიანებულია რადიაციული ქიმიის და თერმოქიმიური კვლევების ლაბორატორიები. რადიაციული ქიმიის მიმართულებით (პასუხისმგებელი - გ.ტატიშვილი) შეისწავლება მაიონიზებელი და მომიჯნავე პროცესების ზეგავლენა ქიმიურ და ბიოლოგიურ ობიექტებზე და მუშავდება კომბინირებული ტექნოლოგიური მეთოდები სხვადასხვა ეკოსისტემების დასაცავად მომწამლავი ნივთიერებებისგან, მავნე მიკროორგანიზმების.

ასევე წარმოებს კვლევები ეკოსისტემების რადიაციული უსაფრთხოების ხელშესაწყობად, რაც ითვალისწინებს რადიაციული და მომიჯნავე ტექნოლოგიების აპლიკაციების შექმნა/მოდიფიცირებას და შესაბამისი თეორიული გათვლების უზრუნველყოფას.

თერმოქიმიის მიმართულებით (პასუხისმგებელი - მ.ხუნდაძე) კვლევები ითვალისწინებს ეფექტური თვისებების მქონე მრავალკომპონენტიანი ოქსიდური მასალების მიზანმიმართულ ძიებას და მათი მიღებისთვის ოპტიმალური ტექნოლოგიური პროცესების შემუშავებას, საბაზისო ოქსიდური სისტემების თერმოდინამიკური და თერმოფიზიკური თვისებების შესწავლით. ლაბორატორიაში, საკუთარი გაზომვებით მიღებული და, აგრეთვე, ლიტერატურული მონაცემების საფუძველზე, შექმნილია რთული ოქსიდების საბაზისო თერმოდინამიკური პარამეტრების ელექტრონული, უწყვეტად განახლებადი ბანკი.

ლაბორატორიაში მნიშვნელოვანი ადგილი ეთმობა საკვლევი კომპოზიციებისათვის დამახასიათებელ სტრუქტურულ, მაგნიტურ, ელექტრულ და სხვა სახის ფაზური გარდაქმნების და ანომალიების გამოვლენას და მათ ენერგეტიკულ დახასიათებას, აგრეთვე თერმულ მახასიათებლებზე ნანოსტრუქტურული მდგომარეობის გავლენის ასახვას. მიღებული მონაცემების ერთობლიობა ქმნის შესაძლებლობას, რომ მიზანმიმართულად შევარჩიოთ კომპოზიციური ცვლილებები და ენერგოდამზოგავი ტექნილოგიური პროცესები.', 'This department unites the Radiation Chemistry and Thermochemical Research laboratories. Under the Radiation Chemistry direction (Head: G. Tatishvili), the influence of ionizing and associated processes on chemical and biological objects is studied. Furthermore, combined technological methods are being developed to protect various ecosystems from toxic substances and harmful microorganisms.

Research is also carried out to promote the radiation safety of ecosystems, which involves creating or modifying applications of radiation and allied technologies while providing the necessary theoretical calculations.

Under the Thermochemistry direction (Head: M. Khundadze), the research involves a systematic search for multicomponent oxide materials with effective target properties, and the development of optimal technological processes for their production by studying the thermodynamic and thermophysical properties of the fundamental oxide systems. Based on the laboratory''s original measurements and available literature data, a continuously updatable electronic databank of essential thermodynamic parameters for complex oxides has been established.

A significant part of the laboratory’s focus is devoted to detecting structural, magnetic, electrical, and other phase transitions and anomalies characteristic of the investigated compositions, as well as providing their energetic characterization. It also explores the impact of the nanostructural state on thermal properties. The comprehensive set of data gathered makes it possible to deliberately select compositional modifications and energy-saving technological processes.', 4)
ON CONFLICT (slug) DO UPDATE SET
    name_ka = EXCLUDED.name_ka,
    name_en = EXCLUDED.name_en,
    description_ka = EXCLUDED.description_ka,
    description_en = EXCLUDED.description_en,
    order_index = EXCLUDED.order_index;
INSERT INTO public.departments (slug, name_ka, name_en, description_ka, description_en, order_index)
VALUES ('phys-chem-analysis', 'ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილება', 'Department of Physical-Chemical Research and Analysis', 'ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილებას (არაწყალხსნართა ელექტროქიმიის ლაბორატორიის სამეცნიერო-კვლევითი მუშაობისას დაგროვილი ცოდნის ბაზაზე) აქვს დიდი გამოცდილება პოლაროგრაფიულად, დიფერენციალურ-იმპულსური მეთოდის გამოყენებით, განსაზღვროს ესენციალური მიკროელემენტები: სპილენძი (Cu), თუთია (Zn) და ძლიერ ტოქსიკურ ელემენტები: ტყვია (Pb) და კადმიუმი (Cd).

განყოფილება სინთეზური და ბუნებრივი პოლიმერების საფუძველზე ახორციელებს კვლევებს ლითონების ნანოკომპოზიტების შემუშავებაზე, ანტიპარაზიტული მოქმედების მქონე პრეპარატების სინთეზზე და გარემოსდაცვითი ტექნოლოგიების დახვეწაზე. ერთ-ერთი მნიშვნელოვანი მიზანია ენერგეტიკის სფეროს გამოწვევებზე პასუხი, კერძოდ მწვანე წყალბადის გენერაციასთან დაკავშირებული პროექტები და ხელოვნური ინტელექტის ჩართულობა სიმულაციური მოდელების შექმნაში.', 'The Department of Physical-Chemical Research and Analysis (building on the wealth of knowledge accumulated during the scientific-research work of the Non-Aqueous Electrochemistry Laboratory) has extensive expertise in the polarographic determination of essential trace elements using the differential pulse method. These elements include copper (Cu) and zinc (Zn), alongside highly toxic heavy metals like lead (Pb) and cadmium (Cd).

Relying on synthetic and natural polymers, the department conducts research aimed at developing metal nanocomposites, synthesizing anti-parasitic pharmaceutical agents, and refining environmental technologies. Addressing key challenges in the energy sector is a major goal; in particular, the department leads projects concerning green hydrogen generation and integrates artificial intelligence in the creation of simulation models.', 5)
ON CONFLICT (slug) DO UPDATE SET
    name_ka = EXCLUDED.name_ka,
    name_en = EXCLUDED.name_en,
    description_ka = EXCLUDED.description_ka,
    description_en = EXCLUDED.description_en,
    order_index = EXCLUDED.order_index;

-- 2. Staff Members Table
CREATE TABLE IF NOT EXISTS public.staff_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legacy_id TEXT UNIQUE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    first_name_ka TEXT NOT NULL,
    last_name_ka TEXT NOT NULL,
    first_name_en TEXT,
    last_name_en TEXT,
    position_ka TEXT NOT NULL,
    position_en TEXT,
    scientific_degree_ka TEXT,
    scientific_degree_en TEXT,
    email TEXT,
    phone TEXT,
    photo_url TEXT,
    bio_ka TEXT,
    bio_en TEXT,
    cv_file_url TEXT,
    publications_file_url TEXT,
    google_scholar_url TEXT,
    scopus_url TEXT,
    web_of_science_url TEXT,
    orcid_url TEXT,
    is_head BOOLEAN DEFAULT FALSE,
    is_management BOOLEAN DEFAULT FALSE,
    is_council_member BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_staff_department_id ON public.staff_members(department_id);
CREATE INDEX IF NOT EXISTS idx_staff_order ON public.staff_members(order_index);

-- Seed Staff Members
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'nioradze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ნიკოლოზ', 'ნიორაძე', 'Nikoloz', 'Nioradze',
    'განყოფილების ხელმძღვანელი, მთავარი მეცნიერი თანამშრომელი', 'Head of Dept. Principal Researcher',
    'nikoloz.nioradze@tsu.ge', '/staff/applied-chemistry/nioradze-pic.jpg', NULL, '/staff/applied-chemistry/Nikoloz Nioradze_Bio_GEO.pdf', '/staff/applied-chemistry/Nikoloz Nioradze_Bio_ENG.pdf',
    'https://scholar.google.com/citations?user=jKgIBQkAAAAJ&hl=en&oi=ao', NULL, NULL, NULL,
    true, 1
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'chakhunashvili',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'თემური', 'ჩახუნაშვილი', 'Temur', 'Chakhunashvili',
    'მთავარი მეცნიერი თანამშრომელი', 'Chief Researcher',
    'info@iice.ge', '/staff/applied-chemistry/chakhunashvili-pic.jpeg', '/staff/applied-chemistry/temur-chakhunashvili-cv-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 2
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'Gigla_Tsurtsumia_2',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'გიგლა', 'წურწუმია', 'Gigla', 'Tsurtsumia',
    'მთავარი მეცნიერი თანამშრომელი', 'Chief Researcher',
    'g.tsurtsumia@iice.ge', '/staff/applied-chemistry/tsurtsumia-pic.jpg', '/staff/applied-chemistry/gigla-tsurtsumia-cv-ka.pdf', NULL, NULL,
    'https://scholar.google.com/citations?hl=en&user=gicYVU0AAAAJ', 'https://www.scopus.com/authid/detail.uri?authorId=15842446600', 'https://www.webofscience.com/wos/author/record/31795455', NULL,
    false, 3
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'koiava',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ნანა', 'ქოიავა', 'Nana', 'Koiava',
    'მთავარი მეცნიერ-თანამშრომელი', 'Chief Researcher',
    'nana.kioava@gmail.com', '/staff/applied-chemistry/koiava-pic.jpg', '/staff/applied-chemistry/nana-koiava-cv-ka.pdf', NULL, NULL,
    'https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=nana+koiava&oq=', 'https://www.scopus.com/authid/detail.uri?authorId=56688624100', 'https://www.webofscience.com/wos/author/record/3893483', NULL,
    false, 4
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'lezhava',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'თინათინი', 'ლეჟავა', 'Tinatin', 'Lezhava',
    'მთავარი მეცნიერ-თანამშრომელი, დირექტორის მოადგილე', 'Chief Researcher, Deputy Director',
    'tinatin.lezhava@tsu.ge', '/staff/applied-chemistry/lezhava-pic.png', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 5
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'chagelishvili_v',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ვაჟა', 'ჩაგელიშვილი', 'Vazha', 'Chagelishvili',
    'მთავარი მეცნიერ-თანამშრომელი', 'Chief Researcher',
    'info@iice.ge', '/staff/applied-chemistry/chagelishvili-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 6
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'roqva',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'თეიმურაზი', 'როყვა', 'Teimurazi', 'Roqva',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/roqva-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 7
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'gagnidze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ცისანა', 'გაგნიძე', 'Tsisana', 'Gagnidze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/gagnidze-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 8
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'qebadze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ჟიული', 'ქებაძე', 'Zhiuli', 'Qebadze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/qebadze-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 9
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'dundua',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'რუსუდანი', 'დუნდუა', 'Rusudan', 'Dundua',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/dundua-pic.jpg', '/staff/applied-chemistry/rusudan-dundua-cv-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 10
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'nikoleishvili',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'პაატა', 'ნიკოლეიშვილი', 'Paata', 'Nikoleishvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'nikoleishvili@gmail.com', '/staff/applied-chemistry/nikoleishvili-pic.jpg', '/staff/applied-chemistry/paata-nikoleishvili-cv-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 11
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'gorelishvili',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'გიორგი', 'გორელიშვილი', 'Giorgi', 'Gorelishvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/gorelishvili-pic.png', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 12
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'donadze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'მარინე', 'დონაძე', 'Marine', 'Donadze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/donadze-pic.png', '/staff/applied-chemistry/donadze-cv-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 13
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'zaqaraia',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'მერაბი', 'ზაქარაია', 'Merabi', 'Zaqaraia',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/zaqaraia-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 14
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'avaliani',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'მარინე', 'ავალიანი', 'Marine', 'Avaliani',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/avaliani-pic.jpg', '/staff/applied-chemistry/marine-avaliani-cv-ka.pdf', NULL, NULL,
    'https://scholar.google.com/citations?user=wZcWCYkAAAAJ&hl=en', NULL, 'http://www.researcherid.com/rid/D-2860-2017', 'http://orcid.org/0000-0002-4800-2836',
    false, 15
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'r_chagelishvili',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'რუსუდან', 'ჩაგელიშვილი', 'Rusudan', 'Chagelishvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/rchagelishvili-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 16
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'chankashvili',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'მანანა', 'ჩანკაშვილი', 'Manana', 'Chankashvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/applied-chemistry/chankashvili-pic.jpg', '/staff/applied-chemistry/manana-chankashvili-cv-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 17
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'gvenstradze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'დავითი', 'გვენცაძე', 'Davit', 'Gvencadze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'david.gven@gmail.com', '/staff/applied-chemistry/gvencadze-pic.png', '/staff/applied-chemistry/gventsadze-cv-ka.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 18
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'ugrelidze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ქეთევან', 'უგრელიძე', 'Ketevan', 'Ugrelidze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'ketiugrelidze@gmail.com', '/staff/applied-chemistry/ugrelidze-pic.jpg', '/staff/applied-chemistry/ketevan-ugrelidze-cv-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 19
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'vatsadze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ზინაიდა', 'ვაწაძე', 'Zinaida', 'Vatsadze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/applied-chemistry/vatsadze-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 20
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'butliashvili',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ნანული', 'ბუთლიაშვილი', 'Nanuli', 'Butliashvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/applied-chemistry/butliashvili-pic.png', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 21
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'kurtanidze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'რუსუდან', 'კურტანიძე', 'Rusudan', 'Kurtanidze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'rusudankurtanidze@gmail.com', '/staff/applied-chemistry/kurtanidze-pic.jpg', '/staff/applied-chemistry/rusudan-kuranitdze-cv-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 22
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'jokhadze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ნუნუ', 'ჯოხაძე', 'Nunu', 'Jokhadze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/applied-chemistry/jokhadze-pic.jpg', '/staff/applied-chemistry/nunu-jokhadze-cv-ka.pdf', NULL, NULL,
    'https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=Nunu+jokhadze&oq', 'https://www.scopus.com/authid/detail.uri?authorId=57200280963', 'https://www.webofscience.com/wos/author/record/3878900', NULL,
    false, 23
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'barnovi',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'ნანა', 'ბარნოვი', 'Nana', 'Barnovi',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/applied-chemistry/barnovi-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 24
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'maghradze',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'გიორგი', 'მაღრაძე', 'Giorgi', 'Maghradze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/applied-chemistry/maghradze-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 25
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'vibliani',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'მარიამ', 'ვიბლიანი', 'Mariam', 'Vibliani',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/applied-chemistry/vibliani-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 26
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'marsagishvili',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'თამაზ', 'მარსაგიშვილი', 'Tamaz', 'Marsagishvili',
    'განყოფილების ხელმძღვანელი, მთავარი მეცნიერი თანამშრომელი', 'Head of Dept., Chief Researcher',
    't.marsagishvili@iice.ge', '/staff/fundamental-research/tamaz-marsagishvili-pic.jpg', '/staff/fundamental-research/CV-Marsagishvili_Geo.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    true, 27
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_ananiashvili',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'ნათელა', 'ანანიაშვილი', 'Natela', 'Ananiashvili',
    'მთავარი მეცნიერ-თანამშრომელი', 'Chief Researcher',
    'info@iice.ge', '/staff/fundamental-research/ananiashvili-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 28
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_gachechiladze',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'მანანა', 'გაჩეჩილაძე', 'Manana', 'Gachechiladze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 29
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_machavariani',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'მარინე', 'მაჭავარიანი', 'Marine', 'Machavariani',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/fundamental-research/M.Matchavariani-pic.jpg', '/staff/fundamental-research/CV_Matchavariani_MarineGeo1.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 30
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_ghurchumelia',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'ლალი', 'ღურჭუმელია', 'Lali', 'Ghurchumelia',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 31
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_tsagareli',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'გიორგი', 'ცაგარელი', 'Giorgi', 'Tsagareli',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 32
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_khutsishvili',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'მარინე', 'ხუციშვილი', 'Marine', 'Khutsishvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 33
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_kipiani',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'გულნარა', 'ყიფიანი', 'Gulnara', 'Kipiani',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 34
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_samkharadze',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'ზურაბი', 'სამხარაძე', 'Zurabi', 'Samkharadze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 35
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_tskitishvili',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'სოფიო', 'ცქიტიშვილი', 'Sophio', 'Tskitishvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 36
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_giorgadze',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'ნინო', 'გიორგაძე', 'Nino', 'Giorgadze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 37
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_maisuradze',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'ნინო', 'მაისურაძე', 'Nino', 'Maisuradze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 38
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_abazadze',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'ლია', 'აბაზაძე', 'Lia', 'Abazadze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 39
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'f_suramelashvili',
    (SELECT id FROM public.departments WHERE slug = 'fundamental-research' LIMIT 1),
    'ელიზბარ', 'სურამელაშვილი', 'Elizbar', 'Suramelashvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 40
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'tskhakaia',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'ელიზავეტა', 'ცხაკაია', 'Elizaveta', 'Tskhakaia',
    'განყოფილების ხელმძღვანელი, მთავარი მეცნიერი თანამშრომელი', 'Head of Dept., Chief Researcher',
    'elizaveta.tskhakaia@tsu.ge', '/staff/coordination-compounds/tskhakaia-pic.jpg', '/staff/coordination-compounds/Elizaveta_Tskhakaia_CV.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    true, 41
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_bakhtadze',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'ვიტალი', 'ბახტაძე', 'Vitali', 'Bakhtadze',
    'მთავარი მეცნიერ-თანამშრომელი', 'Chief Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 42
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_tsintsadze_m',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'მაია', 'ცინცაძე', 'Maia', 'Tsintsadze',
    'მთავარი მეცნიერ-თანამშრომელი', 'Chief Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 43
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_lochoshvili',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'დიმიტრი', 'ლოჩოშვილი', 'Dimitri', 'Lochoshvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 44
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_tsintsadze_t',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'თამარი', 'ცინცაძე', 'Tamari', 'Tsintsadze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 45
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_mosidze',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'ვაჟა', 'მოსიძე', 'Vazha', 'Mosidze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 46
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_baghaturia',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'ლამზირა', 'ბაღათურია', 'Lamzira', 'Baghaturia',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 47
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_pajishvili',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'მარინე', 'ფაჯიშვილი', 'Marine', 'Pajishvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 48
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_kilasonia',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'ნინო', 'კილასონია', 'Nino', 'Kilasonia',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 49
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_gegeshidze',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'ნანა', 'გეგეშიძე', 'Nana', 'Gegeshidze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 50
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'c_nasuashvili',
    (SELECT id FROM public.departments WHERE slug = 'coordination-compounds' LIMIT 1),
    'თამარი', 'ნასუაშვილი', 'Tamari', 'Nasuashvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 51
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'khundadze',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'მზია', 'ხუნდაძე', 'Mzia', 'Khundadze',
    'განყოფილების ხელმძღვანელი, უფროსი მეცნიერ-თანამშრომელი', 'Head of Dept., Senior Researcher',
    'mziakhundi@gmail.com', '/staff/high-energy-chemistry/khundadze-pic.jpg', '/staff/high-energy-chemistry/Mzia Khundadze-ka.pdf', NULL, NULL,
    'https://scholar.google.com/citations?hl=ru&user=epzazBUAAAAJ&view_op=list_works&gmla=APjjwuacijU436jgL_h2-elKtayj-RBh3Jsa-rq828H4D_0iRdJNQRw', NULL, NULL, NULL,
    true, 52
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_tatishvili',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'გრიგორ', 'ტატიშვილი', 'Grigor', 'Tatishvili',
    'მთავარი მეცნიერ-თანამშრომელი, დირექტორი', 'Chief Researcher, Director',
    'tati@iice.ge', '/staff/high-energy-chemistry/tatishvili-pic.jpg', '/staff/high-energy-chemistry/Grigor_Tatishvili_CV.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 53
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_varazashvili',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'ვერა', 'ვარაზაშვილი', 'Vera', 'Varazashvili',
    'მთავარი მეცნიერ-თანამშრომელი', 'Chief Researcher',
    'v_varazi@yahoo.com', '/staff/high-energy-chemistry/varazashvili-pic.jpg', '/staff/high-energy-chemistry/vera varazashvili-ge.docx', NULL, NULL,
    'https://scholar.google.com/citations?user=xZoQAjkAAAAJ&hl=en', NULL, NULL, NULL,
    false, 54
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_jorbenadze',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'რუსუდანი', 'ჯორბენაძე', 'Rusudan', 'Jorbenadze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'rusudan.jorbenadze@tsu.ge', '/staff/high-energy-chemistry/jorbenadze-pic.jpg', '/staff/high-energy-chemistry/რუსუდან ჯორბენაძე-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 55
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_dzotsenidze',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'მურმანი', 'ძოწენიძე', 'Murman', 'Dzotsenidze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'murman.tsarakhovi@tsu.ge', '/staff/high-energy-chemistry/dzotsenidze-pic.jpg', '/staff/high-energy-chemistry/მურმან ძოწენიძე-ka.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 56
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_macharashvili',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'მარინე', 'მაჭარაშვილი', 'Marine', 'Macharashvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 57
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_dughashvili',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'დარეჯანი', 'დუღაშვილი', 'Darejan', 'Dughashvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, '/staff/phys-chem-analysis/Darejan Dughashvili.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 58
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_tvaliashvili',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'ვლადიმერი', 'თვალიაშვილი', 'Vladimer', 'Tvaliashvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 59
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_mamardashvili',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'მანანა', 'მამარდაშილი', 'Manana', 'Mamardashvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, '/staff/high-energy-chemistry/Curriculum vitae Mamardashvili GEO.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 60
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_basiladze',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'ციური', 'ბასილაძე', 'Tsiuri', 'Basiladze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, '/staff/high-energy-chemistry/Curriculum vitae Basiladze GEO.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 61
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_shanidze',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'გენრიეტა', 'შანიძე', 'Genrieta', 'Shanidze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, '/staff/high-energy-chemistry/Curriculum vitae Shanidze GEO.pdf', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 62
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_kvirkvelia',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'ნინო', 'კვირკველია', 'Nino', 'Kvirkvelia',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, '/staff/high-energy-chemistry/ნინო კვირკველიას-ka.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 63
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'h_benashvili',
    (SELECT id FROM public.departments WHERE slug = 'high-energy-chemistry' LIMIT 1),
    'არჩილი', 'ბენაშვილი', 'Archil', 'Benashvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 64
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'gurgenidze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ირინე', 'გურგენიძე', 'Irine', 'Gurgenidze',
    'განყოფილების ხელმძღვანელი, მთავარი მეცნიერი თანამშრომელი', 'Head of Dept., Chief Researcher',
    'Irina_gurgenidze@yahoo.com', '/staff/phys-chem-analysis/gurgenidze2-pic.jpg', '/staff/phys-chem-analysis/Irine Gurgenidze.docx', NULL, NULL,
    'https://scholar.google.com/citations?user=LkPibW8AAAAJ&hl=en', 'https://www.scopus.com/authid/detail.uri?authorId=9839949400', 'https://www.webofscience.com/wos/author/record/68228215', 'https://orcid.org/0009-0007-5406-0286',
    true, 65
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_dzanashvili',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'დალი', 'ძანაშვილი', 'Dali', 'Dzanashvili',
    'მთავარი მეცნიერი თანამშრომელი', 'Chief Researcher',
    'dalidza@yahoo.com', '/staff/phys-chem-analysis/dzanashvili-pic.jpg', '/staff/phys-chem-analysis/Dali Dzanashvili.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 66
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_japaridze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'შუქრი', 'ჯაფარიძე', 'Shukri', 'Japaridze',
    'მთავარი მეცნიერი თანამშრომელი', 'Chief Researcher',
    'japaridzeshukri@yahoo.com', '/staff/phys-chem-analysis/japaridze-pic.jpg', '/staff/phys-chem-analysis/Shukri Japaridze.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 67
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_khutsishvili',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'სპარტაკ', 'ხუციშვილი', 'Spartak', 'Khutsishvili',
    'მთავარი მეცნიერი თანამშრომელი', 'Chief Researcher',
    'Khutsishvili_sp@yahoo.com', '/staff/phys-chem-analysis/khutsishvili-pic.jpg', '/staff/phys-chem-analysis/Spartak Khutsishvili.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 68
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_enukidze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ლიანა', 'ენუქიძე', 'Liana', 'Enukidze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'enukidzeliana@gmail.com', '/staff/phys-chem-analysis/enukidze-pic.jpg', '/staff/phys-chem-analysis/Enukidze Liana.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 69
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_kvinikadze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ლელა', 'კვინიკაძე', 'Lela', 'Kvinikadze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'lela.kvinikadze@tsu.ge', '/staff/phys-chem-analysis/lela-kvinikadze-pic.jpg', '/staff/phys-chem-analysis/lela-kvinikadze-geo-eng.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 70
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_gigauri',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'რუსუდან', 'გიგაური', 'Rusudan', 'Gigauri',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'gigaurirusudan@gmail.com', '/staff/phys-chem-analysis/gigauri-pic.png', '/staff/phys-chem-analysis/Rusudan Gigauri.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 71
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_paikidze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'თამარი', 'პაიკიძე', 'Tamari', 'Paikidze',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'tamarpaikidze@gmail.com', '/staff/phys-chem-analysis/paikidze-pic.jpg', '/staff/phys-chem-analysis/Paikidze Tamar.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 72
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_zavradashvili',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ნინო', 'ზავრადაშვილი', 'Nino', 'Zavradashvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/phys-chem-analysis/zavradashvili-pic.jpg', '/staff/phys-chem-analysis/Zavradashvili_12.02.2026.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 73
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_dzebisashvili',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ნათელა', 'ძებისაშვილი', 'Natela', 'Dzebisashvili',
    'უფროსი მეცნიერ-თანამშრომელი', 'Senior Researcher',
    'info@iice.ge', '/staff/phys-chem-analysis/dzebisashvili-pic.jpg', '/staff/phys-chem-analysis/Natela Dzebisashvili.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 74
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_loladze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'თეონა', 'ლოლაძე', 'Teona', 'Loladze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'Teonalolandze22@gmail.com', '/staff/phys-chem-analysis/loladze-pic.png', '/staff/phys-chem-analysis/Teona Loladze.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 75
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_chalidze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ნონა', 'ჭალიძე', 'Nona', 'Chalidze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'Nona.chalidze@gmail.com', '/staff/phys-chem-analysis/tchalidze-pic.jpg', '/staff/phys-chem-analysis/Nona Tchalidze.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 76
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_shamanauri',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ლანა', 'შამანაური', 'Lana', 'Shamanauri',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/phys-chem-analysis/shamanauri-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 77
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_ugulava',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'გრიგოლი', 'უგულავა', 'Grigol', 'Ugulava',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/phys-chem-analysis/ugulava-pic.jpg', NULL, NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 78
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_davitaia',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'თამარი', 'დავითაია', 'Tamari', 'Davitaia',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/phys-chem-analysis/davitaia-pic.jpg', '/staff/phys-chem-analysis/Tamar Davitaia.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 79
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_godibadze',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'ბაგრატ', 'გოდიბაძე', 'Bagrat', 'Godibadze',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'bgodibadze@gmail.com', '/staff/phys-chem-analysis/godibadze-pic.jpg', '/staff/phys-chem-analysis/Godibadze Bagrat.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 80
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'p_tediashvili',
    (SELECT id FROM public.departments WHERE slug = 'phys-chem-analysis' LIMIT 1),
    'დავით', 'თედიაშვილი', 'Davit', 'Tediashvili',
    'მეცნიერ-თანამშრომელი', 'Researcher',
    'info@iice.ge', '/staff/phys-chem-analysis/tediashvili-pic.jpg', '/staff/phys-chem-analysis/Davit Tediashvili.docx', NULL, NULL,
    NULL, NULL, NULL, NULL,
    false, 81
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;
INSERT INTO public.staff_members (
    legacy_id, department_id, first_name_ka, last_name_ka, first_name_en, last_name_en,
    position_ka, position_en, email, photo_url, cv_file_url, bio_ka, bio_en,
    google_scholar_url, scopus_url, web_of_science_url, orcid_url, is_head, order_index
) VALUES (
    'tsurtsumia',
    (SELECT id FROM public.departments WHERE slug = 'applied-chemistry' LIMIT 1),
    'გიგლა', 'წურწუმია', 'Gigla', 'Tsurtsumia',
    'მთავარი მეცნიერი თანამშრომელი', 'Chief Research Scientist',
    'giglat@hotmail.com', '/images/staff/Gigla Tsurtsumia-pic.jpg', NULL, NULL, NULL,
    'https://scholar.google.com/citations?hl=en&user=gicYVU0AAAAJ', 'https://www.scopus.com/authid/detail.uri?authorId=15842446600', 'https://www.webofscience.com/wos/author/record/31795455', NULL,
    false, 82
) ON CONFLICT (legacy_id) DO UPDATE SET
    first_name_ka = EXCLUDED.first_name_ka,
    last_name_ka = EXCLUDED.last_name_ka,
    first_name_en = EXCLUDED.first_name_en,
    last_name_en = EXCLUDED.last_name_en,
    position_ka = EXCLUDED.position_ka,
    position_en = EXCLUDED.position_en,
    photo_url = EXCLUDED.photo_url,
    cv_file_url = EXCLUDED.cv_file_url,
    google_scholar_url = EXCLUDED.google_scholar_url,
    scopus_url = EXCLUDED.scopus_url,
    web_of_science_url = EXCLUDED.web_of_science_url,
    orcid_url = EXCLUDED.orcid_url,
    is_head = EXCLUDED.is_head;

-- 3. News Categories & News Table
CREATE TABLE IF NOT EXISTS public.news_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.news_categories (slug, name_ka, name_en, order_index) VALUES
('general', 'სიახლეები', 'News', 1),
('news', 'სიახლეები', 'News', 2),
('seminars', 'სემინარები', 'Seminars', 3),
('conferences', 'კონფერენციები', 'Conferences', 4)
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legacy_id TEXT UNIQUE,
    category_id UUID REFERENCES public.news_categories(id) ON DELETE SET NULL,
    title_ka TEXT NOT NULL,
    title_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    cover_image_url TEXT,
    gallery_urls TEXT[] DEFAULT '{}',
    content_ka TEXT NOT NULL,
    content_en TEXT,
    attached_files JSONB DEFAULT '[]',
    status TEXT DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_news_category_id ON public.news(category_id);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);

-- Seed All News & Seminars Items
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-999',
    (SELECT id FROM public.news_categories WHERE slug = 'seminars' LIMIT 1),
    'სემინარი თემაზე: „ინფრაწითელი სპექტროსკოპია - მეთოდის პრინციპები და სპექტრული ინტერპრეტაციის ძირითადი საფუძვლები“', 'Seminar on: "Infrared Spectroscopy - Principles of the Method and Basic Fundamentals of Spectral Interpretation"', 'news-999',
    '/images/news/seminar-khutsishvili-1.jpg', ARRAY['/images/news/seminar-khutsishvili-1.jpg','/images/news/seminar-khutsishvili-2.jpg']::TEXT[],
    '<p>2026 წლის 25 მაისს ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში გაიმართა მეცნიერი თანამშრომლის სპარტაკ ხუციშვილის სემინარი თემაზე ,, „ინფრაწითელი სპექტროსკოპია - მეთოდის პრინციპები და სპექტრული ინტერპრეტაციის ძირითადი საფუძვლები“.</p><p>სემინარი მიეძღვნა ინფრაწითელი სპექტროსკოპიის საფუძვლებს, როგორც ნივთიერებების მოლეკულური სტრუქტურის ანალიზის მეთოდს. განხილული იქნა ინფრაწითელი გამოსხივების შთანთქმის პრინციპები, რომლებიც დაკავშირებულია მოლეკულებში ვიბრაციულ გადასვლებთან, ასევე ის პირობები, რომლებიც აუცილებელია ინფრაწითელი სპექტროსკოპიის განხორციელებისთვის. სემინარზე მოკლედ იქნა წარმოდგენილი მოლეკულური ვიბრაციების ძირითადი ტიპები (გაჭიმვითი და მოხრითი ვიბრაციები) და მათი კავშირი ფუნქციურ ჯგუფებთან. განსაკუთრებული ყურადღება დაეთმო სპექტრის ინტერპრეტაციის ძირითად მიდგომებს, მათ შორის დამახასიათებელი შთანთქმის ზოლების იდენტიფიკაციას და მათ კორელაციას მოლეკულების სტრუქტურულ ფრაგმენტებთან.</p>', '<p>On May 25, 2026, a seminar by researcher Spartak Khutsishvili on "Infrared Spectroscopy - Principles of the Method and Basic Fundamentals of Spectral Interpretation" was held at the R. Agladze Institute of Inorganic Chemistry and Electrochemistry of Ivane Javakhishvili Tbilisi State University.</p><p>The seminar was dedicated to the basics of infrared spectroscopy as a method for analyzing the molecular structure of substances. The principles of infrared radiation absorption associated with vibrational transitions in molecules were discussed, as well as the conditions necessary for infrared spectroscopy. The main types of molecular vibrations (stretching and bending vibrations) and their relationship with functional groups were briefly presented. Special attention was paid to the main approaches to spectral interpretation, including the identification of characteristic absorption bands and their correlation with structural fragments of molecules.</p>',
    'published', '2026-05-25T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-1',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'ლატვიის სახელმწიფო სასწავლო სტიპენდიები 2026/2027 აკადემიური წლისთვის', '[ENG] ლატვიის სახელმწიფო სასწავლო სტიპენდიები 2026/2027 აკადემიური წლისთვის', 'news-1',
    '/images/news-placeholder.jpg', '{}'::TEXT[],
    '<p>სემინარების კვირეულის ფარგლებში, 2025 წლის 2 ივლისს, „ფუნდამეტური კვლევებისა და კომპოზიციური მასალების სინთეზის განყოფილების“ თანამშრომელმა და დოქტორანტურის საფეხურის სტუდენტმა სოფო ცქიტიშვილმა წაიკითხა მოხსენება თემაზე- „ადსორბენტები მეორადი ნედლეულისა და ცეოლითის ბაზაზე - CO2-ის ჩაჭერა“.</p><p>სემინარზე წარმოდგენილი იყო კვლევის საწყის ეტაპზე მიღებული შედეგები და წინასწარი დასკვნები. მიღებულ შედეგებზე დაყრდნობით, აღნიშნული თემის სიღრმისეული შესწავლის მიზნით, განხილული იყო შესრულებული კვლევის ეტაპები. სემინარის დასკვნით ნაწილში გარიმართა დისკუსია, წამოიჭრა რიგი საინტერესო საკითხებისა, რომელთა გათვალისწინებაც მომავალში დოქტორანტს ხელს შეუწობს სწორად დაგეგმოს სადისერტაციო ნაშრომის მომდევნო ეტაპები.</p><p> სემინარის მორე ნაწილს გაუძღვა „ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილების“ თანამშრომელი - სპარტაკ ხუციშვილი, თემატიკით: „სიახლეები ელექტრონ მაგნიტური რეზონანსის ჯგუფის ყოველწლიური საერთაშორისო შეხვედრიდან,ლონდონი“.</p><p>2025 წლის ივნისში ლონდონში გამართულ კონფერენციაზე წარმოდგენილი იყო EPR კვლევების უახლესი მიღწევები ბიომედიცინის, სპინტრონიკის, ნანომატერიალების, მოლეკულური მაგნიტების და სხვა სფეროებში. ჩვენმა ინსტიტუტმა წარმოადგინა ნაშრომი - "ბიონანოკომპოზიტების ანტიოქსიდანტური და ბაქტერიოსტატიკური აქტივობა ბუნებრივი სულფატირებული პოლისაქარიდების ბაზაზე, მანგანუმის (ჰიდრ)ოქსიდის ნანონაწილაკებით", CRDF GLOBAL ფონდთან თანამშრომლობით.</p>		
			<style>/*! elementor - v3.23.0 - 25-07-2024 */
.elementor-image-gallery .gallery-item{display:inline-block;text-align:center;vertical-align:top;width:100%;max-width:100%;margin:0 auto}.elementor-image-gallery .gallery-item img{margin:0 auto}.elementor-image-gallery .gallery-item .gallery-caption{margin:0}.elementor-image-gallery figure img{display:block}.elementor-image-gallery figure figcaption{width:100%}.gallery-spacing-custom .elementor-image-gallery .gallery-icon{padding:0}@media (min-width:768px){.elementor-image-gallery .gallery-columns-2 .gallery-item{max-width:50%}.elementor-image-gallery .gallery-columns-3 .gallery-item{max-width:33.33%}.elementor-image-gallery .gallery-columns-4 .gallery-item{max-width:25%}.elementor-image-gallery .gallery-columns-5 .gallery-item{max-width:20%}.elementor-image-gallery .gallery-columns-6 .gallery-item{max-width:16.666%}.elementor-image-gallery .gallery-columns-7 .gallery-item{max-width:14.28%}.elementor-image-gallery .gallery-columns-8 .gallery-item{max-width:12.5%}.elementor-image-gallery .gallery-columns-9 .gallery-item{max-width:11.11%}.elementor-image-gallery .gallery-columns-10 .gallery-item{max-width:10%}}@media (min-width:480px) and (max-width:767px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:50%}}@media (max-width:479px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:100%}}</style>		
			<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture7" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNSwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTcuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture7.jpg''><img width="225" height="300" src="/images/news/Picture7.jpg" alt="" decoding="async" srcset="/images/news/Picture7.jpg 225w, /images/news/Picture7.jpg 709w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture5" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNywidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTUuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture5.jpg''><img width="225" height="300" src="/images/news/Picture5.jpg" alt="" decoding="async" srcset="/images/news/Picture5.jpg 225w, /images/news/Picture5.jpg 767w, /images/news/Picture5.jpg 768w, /images/news/Picture5.jpg 848w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture11" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMSwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTExLnBuZyIsInNsaWRlc2hvdyI6IjgxMjQ0NDYifQ%3D%3D" href=''/images/news/Picture11.png''><img width="211" height="300" src="/images/news/Picture11.png" alt="" decoding="async" srcset="/images/news/Picture11.png 211w, /images/news/Picture11.png 474w" sizes="(max-width: 211px) 100vw, 211px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture8" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTguanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture8.jpg''><img width="300" height="265" src="/images/news/Picture8.jpg" alt="" decoding="async" srcset="/images/news/Picture8.jpg 300w, /images/news/Picture8.jpg 768w, /images/news/Picture8.jpg 915w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture4" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxOCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTQuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture4.jpg''><img width="225" height="300" src="/images/news/Picture4.jpg" alt="" decoding="async" srcset="/images/news/Picture4.jpg 225w, /images/news/Picture4.jpg 768w, /images/news/Picture4.jpg 868w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture9" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMywidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTkucG5nIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture9.png''><img width="300" height="205" src="/images/news/Picture9.png" alt="" decoding="async" srcset="/images/news/Picture9.png 300w, /images/news/Picture9.png 500w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture12" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTEyLnBuZyIsInNsaWRlc2hvdyI6IjgxMjQ0NDYifQ%3D%3D" href=''/images/news/Picture12.png''><img width="263" height="300" src="/images/news/Picture12.png" alt="" decoding="async" srcset="/images/news/Picture12.png 263w, /images/news/Picture12.png 410w" sizes="(max-width: 263px) 100vw, 263px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture6" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTYuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture6.jpg''><img width="291" height="300" src="/images/news/Picture6.jpg" alt="" decoding="async" srcset="/images/news/Picture6.jpg 291w, /images/news/Picture6.jpg 768w, /images/news/Picture6.jpg 943w" sizes="(max-width: 291px) 100vw, 291px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture10" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTEwLnBuZyIsInNsaWRlc2hvdyI6IjgxMjQ0NDYifQ%3D%3D" href=''/images/news/Picture10.png''><img width="300" height="188" src="/images/news/Picture10.png" alt="" decoding="async" srcset="/images/news/Picture10.png 300w, /images/news/Picture10.png 605w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure>', '[ENG] Translation needed for: ლატვიის სახელმწიფო სასწავლო სტიპენდიები 2026/2027 აკადემიური წლისთვის',
    'published', '2026-02-10T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-2',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'ენერგიის გარდაქმნისა და შემნახველი სისტემებისთვის ახალი თაობის მასალების განვითარება', 'Development of Next-Generation Materials for Energy Conversion and Storage Systems', 'news-2',
    '/images/news/post-2/energy-materials-1.jpg', ARRAY['/images/news/post-2/energy-materials-1.jpg','/images/news/post-2/energy-materials-2.jpg','/images/news/post-2/energy-materials-3.jpg','/images/news/post-2/energy-materials-4.jpg']::TEXT[],
    '<p>2026 წლის 22 იანვარს ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს ეწვია ტარბიათ მოდარესის უნივერსიტეტის (თეირანი, ირანი) გამორჩეული (Distinguished) პროფესორი მირ ფაზლოლა მოუსავი. პროფესორმა წაიკითხა სამეცნიერო მოხსენება თემაზე „ენერგიის გარდაქმნისა და შემნახველი სისტემებისთვის ახალი თაობის მასალების განვითარება“.მოხსენება დაეთმო განახლებადი ენერგიის სისტემებისთვის განკუთვნილი თანამედროვე მასალების სინთეზს, მათ ფიზიკურ-ქიმიურ დახასიათებას თანამედროვე ანალიზური მეთოდების გამოყენებით (XRD, XPS, XAS, EIS), აგრეთვე აღნიშნული მასალების საფუძველზე დამზადებული მოწყობილობების შემდგომ ლაბორატორიულ ტესტირებას. კერძოდ, წარმოდგენილი იყო ფენოვანი ორმაგი ჰიდროქსიდების (LDH) საფუძველზე მიღებული სულფიზიდირებული საკათოდე კომპოზიტები, აგრეთვე ბორით დოპირებული ელექტროკატალიზატორები ლითონ-ჰაერის ტიპის ბატარეებისთვის.</p>
<p>პროფესორმა ასევე ისაუბრა რეტიკულარული მასალების შესახებ, კერძოდ ლითონ-ორგანული ჩარჩოების (MOF) და მათგან მიღებული Ni/Co-MOF-აღდგენილი გრაფენის ოქსიდის ნანოკომპოზიტების გამოყენებაზე, როგორც მაღალი წარმადობის მქონე საელექტროდო მასალების სუპერკონდენსატორული ენერგიის შემნახველი სისტემებისთვის. განსაკუთრებული ყურადღება დაეთმო მისი კვლევითი ჯგუფის მიერ დასინთეზებული მრავალფუნქციური, ეპიტაქსიალურად გაზრდილი MOF-ების (Fe, Co, Ni) გამოყენებას ელექტროკატალიზატორებად ჟანგბადის გამოყოფის (OER), წყალბადის გენერაციის (HER) და ჟანგბადის აღდგენის რეაქციებში (ORR), აგრეთვე მათ გამოყენებას ფსევდოკონდენსატორულ ენერგიის შემნახველ მოწყობილობებში.</p>
<p>აღსანიშნავია წარმოდგენილი სამეცნიერო ნაშრომების მაღალი ხარისხი, რაც დასტურდება შესაბამისი პუბლიკაციებით ისეთ მაღალრეიტინგულ საერთაშორისო სამეცნიერო ჟურნალებში, როგორიცაა Advanced Energy Materials, Electrochimica Acta, Journal of the American Chemical Society, Chemical Science, Energy &amp; Environmental Science, Small და Advanced Functional Materials.</p>		
			<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="1000112391" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjI5NCwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjZcLzAyXC8xMDAwMTEyMzkxLXNjYWxlZC5qcGciLCJzbGlkZXNob3ciOiJmZjI4ZTk3In0%3D" href=''/images/news/1000112391.jpg''><img width="150" height="150" src="/images/news/1000112391.jpg" alt="" decoding="async" srcset="/images/news/1000112391.jpg 150w, /images/news/1000112391.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="1000112397" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjI5MiwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjZcLzAyXC8xMDAwMTEyMzk3LXNjYWxlZC5qcGciLCJzbGlkZXNob3ciOiJmZjI4ZTk3In0%3D" href=''/images/news/1000112397.jpg''><img width="150" height="150" src="/images/news/1000112397.jpg" alt="" decoding="async" srcset="/images/news/1000112397.jpg 150w, /images/news/1000112397.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="1000112393" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjI5MCwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjZcLzAyXC8xMDAwMTEyMzkzLXNjYWxlZC5qcGciLCJzbGlkZXNob3ciOiJmZjI4ZTk3In0%3D" href=''/images/news/1000112393.jpg''><img width="150" height="150" src="/images/news/1000112393.jpg" alt="" decoding="async" srcset="/images/news/1000112393.jpg 150w, /images/news/1000112393.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure>', '<p>On January 22, 2026, the R. Agladze Institute of Inorganic Chemistry and Electrochemistry of Ivane Javakhishvili Tbilisi State University hosted Distinguished Professor Mir Fazlollah Mousavi from Tarbiat Modares University (Tehran, Iran). He delivered an invited lecture entitled “Development of Next-Generation Materials for Energy Conversion and Storage Systems.” The lecture addressed the synthesis of advanced materials for renewable energy systems, their comprehensive physicochemical characterization using techniques such as X-ray diffraction (XRD), X-ray photoelectron spectroscopy (XPS), X-ray absorption spectroscopy (XAS), and electrochemical impedance spectroscopy (EIS), as well as subsequent laboratory-scale testing of devices fabricated from these materials. In particular, sulfide-derived cathodic composites based on layered double hydroxide (LDH) materials and boron-doped electrocatalysts for metal–air battery applications were presented.</p><p>Furthermore, Professor Mousavi discussed reticular materials, including metal–organic frameworks (MOFs), and Ni/Co-MOF–reduced graphene oxide nanocomposites derived from them, emphasizing their potential as high-performance electrode materials for supercapacitors. Special attention was given to multifunctional, epitaxially grown MOFs (Fe, Co, Ni) synthesized by his research group and their application as electrocatalysts for the oxygen evolution reaction (OER), hydrogen evolution reaction (HER), and oxygen reduction reaction (ORR), as well as their use in pseudocapacitive energy storage devices.</p><p>The high scientific quality of the presented research is demonstrated by publications in leading peer-reviewed journals, including Advanced Energy Materials, Electrochimica Acta, Journal of the American Chemical Society, Chemical Science, Energy & Environmental Science, Small, and Advanced Functional Materials.</p>',
    'published', '2026-02-02T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-3',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'კომპიუტერული ქიმიის ზოგიერთი პროგრამისა და მეთოდის მიმოხილვა', 'Review of Some Computational Chemistry Programs and Methods', 'news-3',
    '/images/news/post-3/20251023_162138-scaled.jpg', ARRAY['/images/news/post-3/20251023_162138-scaled.jpg','/images/news/post-3/20251023_162151-scaled.jpg','/images/news/post-3/20251023_162227-scaled.jpg','/images/news/post-3/20251023_162258-scaled.jpg','/images/news/post-3/20251023_165956-scaled.jpg']::TEXT[],
    '<p>2025 წლის 23 ოქტომბერს, რაფიელ აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში, კოორდინაციული ნაერთებისა და სორბციულ-კატალიზური პროცესების განყოფილების უფროსმა მეცნიერმა თანამშრომელმა დიმიტრი ლოჩოშვილმა წაიკითხა სემინარი თემაზე: „კომპიუტერული ქიმიის ზოგიერთი პროგრამისა და მეთოდის მიმოხილვა“ (Review of Some Computational Chemistry Programs and Methods). სემინარის მიზანი იყო კომპიუტერული ქიმიის თანამედროვე მეთოდებისა და შესაბამისი პროგრამული პაკეტების განხილვა, რომლებიც გამოიყენება მოლეკულურ დონეზე ქიმიური სისტემების შესასწავლად.</p><p><strong>მოლეკულური მექანიკის მეთოდი</strong></p><p>მოლეკულური მექანიკის მიდგომა ეფუძნება კლასიკური მექანიკისა და ელექტროსტატიკის პრინციპებს. ამ მეთოდით მოლეკულური სისტემები განიხილება კლასიკური ფიზიკის ჩარჩოში, რაც საშუალებას იძლევა კომპიუტერზე ვიზუალურად აიწყოს და გაანალიზდეს მოლეკულის სამგანზომილებიანი სტრუქტურა.</p><p>მიუხედავად მისი სიმარტივისა და ეფექტურობისა, მოლეკულური მექანიკის მეთოდი არ გამოირჩევა მაღალი სიზუსტით, რაც ზღუდავს მის გამოყენებას რთული მოლეკულური სისტემების შესწავლისას.</p><p><strong>კვანტურ-ქიმიური მეთოდები</strong></p><p>მაღალი სიზუსტის მისაღწევად მეცნიერები იყენებენ კვანტურ-ქიმიურ მეთოდებს, რომელთა შორისაა:</p><p><strong>არაემპირიული (ab initio) მეთოდები;</strong></p><p><strong>ნახევრადემპირიული მიდგომები;</strong></p><p><strong>და სიმკვრივის ფუნქციონალის თეორიის (DFT) მეთოდები.</strong></p><p><strong>არაემპირიული მეთოდები </strong> უზრუნველყოფენ გათვლების შედარებით მაღალ სიზუსტეს . არაემპირიული გათვლების გამოყენებისას კომპიუტერი პროცესორულ დროს ძირითადად ხარჯავს ელექტრონთაშორისი ურთიერთქმედების ინტეგრალების გაანგარიშებაზე. მოლეკულის ზომების ზრდა იწვევს ასეთი ინტეგრალების რაოდენობის ზრდას, შესაბამისად მატულობს გათვლების დროც. არაემპირიული მეთოდების გამოყენება შესაძლებელია მცირე ზომის მოლეკულებისათვის.</p><p><strong>ნახევრადემპირიული მეთოდები</strong> წარმოადგენს გამარტივებულ ვარიანტს, სადაც რთული ინტეგრალები ჩანაცვლებულია ექსპერიმენტული მონაცემებიდან მიღებული პარამეტრებით. ისინი იძლევიან კარგ სიზუსტეს გარკვეული ტიპის ნაერთებისთვის და საშუალებას აძლევენ მკვლევრებს შეისწავლონ ასეულობით ატომის მქონე მოლეკულები.</p><p><strong>სიმკვრივის ფუნქციონალის თეორიის (DFT) მეთოდები</strong>  გაცილებით  დიდ ყურადღებას იქცევენ, რადგან ახასიათებთ მცირე რაოდენობის მიახლოებები და გათვლების შედეგების მაღალი სიზუსტე, რომელიც  არაემპირიული მეთოდების სიზუსტის თანაზომადია. DFT-ს მეშვეობით შეიძლება გაცილებით უფრო დიდი მოლეკულების კვანტურ-ქიმიური გათვლების შესრულება ვიდრე არაემპირიული მეთოდებით.</p><p><strong>პროგრამული პაკეტები</strong></p><p>სემინარზე განხილული იქნა რამდენიმე პოპულარული პროგრამა, რომლებიც გამოიყენება კვანტურ-ქიმიურ გამოთვლებში:</p><p><strong>Q-Chem</strong> – ერთ-ერთი წამყვანი პროგრამა არაემპირიული და DFT გათვლებისთვის;</p><p><strong>IQMol</strong> – Q-Chem-ის შედეგების ვიზუალიზაციის პროგრამა;</p><p><strong>ChemOffice</strong> – მოლეკულური მოდელირებისა და ქიმიური სტრუქტურების ანალიზის უნივერსალური პაკეტი.</p><p>დიმიტრი ლოჩოშვილმა წარმოადგინა მაგალითი პარა-პირიდინალდეჰიდის იზონიკოტინოილჰიდრაზონის მოლეკულაზე ჩატარებული DFT გათვლების შესახებ, სადაც გამოყენებულ იქნა სამი განსხვავებული მეთოდი შედეგების შესადარებლად.</p><p>დიმიტრი ლოჩოშვილის სემინარმა ცხადყო, რომ კომპიუტერული ქიმიის თანამედროვე მეთოდები წარმოადგენს შეუცვლელ ინსტრუმენტს მოლეკულური სისტემების შესწავლისა და პროგნოზირებისათვის. სხვადასხვა მეთოდისა და პროგრამული უზრუნველყოფის სწორად შერჩევა მეცნიერებს საშუალებას აძლევს მიაღწიონ ოპტიმალურ ბალანსს სიზუსტესა და გამოთვლით სირთულეს შორის.</p><p>აღნიშნული მიდგომები განსაკუთრებით მნიშვნელოვანია ახალი ნაერთების დიზაინისა და ქიმიური რეაქციების მექანიზმების გაანალიზებისას.</p><p> </p>		
			<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251023_162138" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIwMSwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAyM18xNjIxMzgtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251023_162138.jpg''><img width="225" height="300" src="/images/news/20251023_162138.jpg" alt="" decoding="async" srcset="/images/news/20251023_162138.jpg 225w, /images/news/20251023_162138.jpg 768w, /images/news/20251023_162138.jpg 1152w, /images/news/20251023_162138.jpg 1536w, /images/news/20251023_162138.jpg 9w, /images/news/20251023_162138.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251023_162227" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIwMiwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAyM18xNjIyMjctc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251023_162227.jpg''><img width="225" height="300" src="/images/news/20251023_162227.jpg" alt="" decoding="async" srcset="/images/news/20251023_162227.jpg 225w, /images/news/20251023_162227.jpg 768w, /images/news/20251023_162227.jpg 1152w, /images/news/20251023_162227.jpg 1536w, /images/news/20251023_162227.jpg 9w, /images/news/20251023_162227.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251023_162254" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIwMywidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAyM18xNjIyNTQtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251023_162254.jpg''><img width="225" height="300" src="/images/news/20251023_162254.jpg" alt="" decoding="async" srcset="/images/news/20251023_162254.jpg 225w, /images/news/20251023_162254.jpg 768w, /images/news/20251023_162254.jpg 1152w, /images/news/20251023_162254.jpg 1536w, /images/news/20251023_162254.jpg 9w, /images/news/20251023_162254.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251023_162151" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIwNCwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAyM18xNjIxNTEtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251023_162151.jpg''><img width="225" height="300" src="/images/news/20251023_162151.jpg" alt="" decoding="async" srcset="/images/news/20251023_162151.jpg 225w, /images/news/20251023_162151.jpg 768w, /images/news/20251023_162151.jpg 1152w, /images/news/20251023_162151.jpg 1536w, /images/news/20251023_162151.jpg 9w, /images/news/20251023_162151.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251023_165956" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIwNSwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAyM18xNjU5NTYtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251023_165956.jpg''><img width="225" height="300" src="/images/news/20251023_165956.jpg" alt="" decoding="async" srcset="/images/news/20251023_165956.jpg 225w, /images/news/20251023_165956.jpg 768w, /images/news/20251023_165956.jpg 1152w, /images/news/20251023_165956.jpg 1536w, /images/news/20251023_165956.jpg 9w, /images/news/20251023_165956.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251023_162312" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIwNiwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAyM18xNjIzMTItc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251023_162312.jpg''><img width="225" height="300" src="/images/news/20251023_162312.jpg" alt="" decoding="async" srcset="/images/news/20251023_162312.jpg 225w, /images/news/20251023_162312.jpg 768w, /images/news/20251023_162312.jpg 1152w, /images/news/20251023_162312.jpg 1536w, /images/news/20251023_162312.jpg 9w, /images/news/20251023_162312.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251023_162258" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIwNywidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAyM18xNjIyNTgtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251023_162258.jpg''><img width="225" height="300" src="/images/news/20251023_162258.jpg" alt="" decoding="async" srcset="/images/news/20251023_162258.jpg 225w, /images/news/20251023_162258.jpg 768w, /images/news/20251023_162258.jpg 1152w, /images/news/20251023_162258.jpg 1536w, /images/news/20251023_162258.jpg 9w, /images/news/20251023_162258.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure>', '<p>On October 23, 2025, a seminar titled “Review of Some Computational Chemistry Programs and Methods” was held at the Raphael Agladze Institute of Inorganic Chemistry and Electrochemistry. The seminar was led by Dimitri Lochoshvili, Senior Researcher at the Department of Coordination Compounds and Sorption-Catalytic Processes. The aim of the seminar was to present modern approaches in computational chemistry and discuss software tools applied for analyzing and predicting molecular structures and properties of chemical systems.</p><p><strong>Molecular Mechanics Method</strong></p><p>The molecular mechanics approach is based on the principles of classical mechanics and electrostatics. It treats molecular systems within the framework of classical physics, allowing visualization and analysis of three-dimensional molecular structures on a computer. Although the method is simple and efficient, its accuracy is limited, which restricts its use for studying complex molecular systems.</p><p><strong>Quantum-Chemical Methods</strong></p><p>To achieve higher accuracy, scientists employ various quantum-chemical methods, including:</p><p><strong>Ab initio methods,</strong></p><p><strong>Semi-empirical approaches,</strong></p><p><strong>Density Functional Theory (DFT).</strong></p><p><strong>Ab initio methods</strong> provide relatively high accuracy of calculations. When performing ab initio computations, the computer spends most of its processor time calculating the integrals of electron–electron interactions. As the size of a molecule increases, the number of such integrals grows accordingly, leading to longer computation times. Therefore, ab initio methods are applicable mainly to small molecules.</p><p><strong>Semi-empirical methods</strong> simplify calculations by replacing complex integrals with parameters derived from experimental data. These approaches enable the study of molecules containing hundreds of atoms with reasonable accuracy.</p><p><strong>Density Functional Theory (DFT)</strong> attracts considerably greater attention because it involves a smaller number of approximations and provides high accuracy of results, comparable to that of ab initio methods. Using DFT, it is possible to perform quantum-chemical calculations for much larger molecules than with ab initio approaches.</p><p><strong>Software Packages</strong></p><p>During the seminar, several popular computational chemistry programs were discussed, including:</p><p><strong>Q-Chem</strong> – one of the leading programs for ab initio and DFT calculations;</p><p><strong>IQMol</strong> – a visualization tool designed for Q-Chem output;</p><p><strong>ChemOffice</strong> – a multifunctional suite for molecular modeling and structural analysis.</p><p>Dimitri Lochoshvili presented a case study on para-pyridinealdehyde isonicotinoylhydrazone, where DFT calculations were performed using three different methods to compare accuracy and performance.</p><p>The seminar clearly demonstrated that modern computational chemistry methods are indispensable tools for the investigation and prediction of molecular systems.</p><p>The appropriate selection of methods and software ensures an optimal balance between computational efficiency and accuracy, which is crucial for the design of new compounds and the analysis of reaction mechanisms.</p>',
    'published', '2025-12-15T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-4',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'დოქტორ პაულა ფრაგა გარსიას ვიზიტი  თსუ რ.აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში', 'Visit of Dr. Paula Fraga García to the R.Agladze Institute of Inorganic Chemistry and Electrochemistry', 'news-4',
    '/images/news/post-4/post-6199-main.jpg', ARRAY['/images/news/post-4/20251008_120401.jpg','/images/news/post-4/20251008_120536.jpg','/images/news/post-4/20251008_120556.jpg','/images/news/post-4/20251008_120657.jpg','/images/news/post-4/20251008_122957.jpg','/images/news/post-4/20251008_123016.jpg','/images/news/post-4/IMG_1341.jpg','/images/news/post-4/IMG_1342.jpg','/images/news/post-4/IMG_1348.jpg','/images/news/post-4/post-6199-main.jpg']::TEXT[],
    '<p>2025 წლის 8 ოქტომბერს თსუ  რ.აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტმა მასპინძლობა გაუწია დოქტორ პაულა ფრაგა გარსიას, რომელიც წარმოადგენს მიუნხენის ტექნიკური უნივერსიტეტის (TUM) ბიოსეპარაციის ინჟინერიის კათედრას. ვიზიტი განხორციელდა პროექტის ფარგლებში — „ვერცხლშემცველი ჰუმინის მჟავებზე დაფუძნებული ბიონანოკომპოზიტები, როგორც ანტიბაქტერიული და ანთების საწინააღმდეგო აგენტები“, რომლის ხელმძღვანელია დოქტორი სპარტაკ ხუციშვილი, ხოლო დაფინანსებულია საქართველოს ეროვნული სამეცნიერო ფონდის მიერ. ვიზიტის ფარგლებში დოქტორმა ფრაგამ წაიკითხა მოხსენება თემაზე — „მატარებელი მასალისა და სამიზნე თვისებების გავლენა ბიოსეპარაციის ინჟინერიაზე“.</p><p>პრეზენტაცია დაიწყო მიუნხენის ტექნიკური უნივერსიტეტის ზოგადი ინფორმაციისა და ბიოსეპარაციის ინჟინერიის კათედრაზე მიმდინარე კვლევების მიმოხილვით.დოქტორმა ფრაგამ წარმოადგინა მაგნიტური ნანონაწილაკების ძირითადი ტიპები, რომლებიც ფართოდ გამოიყენება მის კვლევით ჯგუფში, ხაზი გაუსვა მათ ფიზიკურ-ქიმიურ თვისებებს და ბიოსეპარაციის პროცესებში მათ მნიშვნელობას. მოხსენება მოიცავდა ექსპერიმენტულ მონაცემებს ამინომჟავების, ცილებისა და სხვა ბიომოლეკულების ხსნარებში ქცევის შესახებ, აგრეთვე მათი ადსორბციული თვისებების განხილვას იზოთერმული ანალიზის საფუძველზე. გარდა ამისა, დოქტორმა ფრაგამ გააფართოვა პრეზენტაციის თემატიკა და ისაუბრა ელექტროსორბციულ პროცესებზე, წარმოადგინა ცილების განცალკევების შედეგები მეტალიზებული მემბრანების გამოყენებით და განმარტა, თუ როგორ შეიძლება მოლეკულების შეკავშირება და გამოყოფა განხორციელდეს ელექტრული პოტენციალის ზემოქმედებით.</p><p>მოხსენების შემდეგ ინსტიტუტის თანამშრომლებმა დოქტორ ფრაგასთან ერთად განიხილეს ფიზიკური და ქიმიური ადსორბციის მექანიზმები, აგრეთვე სხვადასხვა მოვლენები, რომლებიც მიმდინარეობს წყალხსნარებში. რამდენიმე კითხვა შეეხო იმ მეთოდოლოგიებს, რომლებიც გამოიყენება კოლოიდური სისტემების თვისებების უკეთ შესასწავლად.</p><p>აღსანიშნავია, რომ ეს არ ყოფილა დოქტორ ფრაგას პირველი ვიზიტი აგლაძის ინსტიტუტში — ის ესტუმრა 2024 წლის სექტემბერში მოხსენებით თემაზე  „ადსორბცია და მაგნიტური განცალკევება ბიოტექნოლოგიაში მოლეკულების აღდგენის მიზნით“.</p><p>პირველი ვიზიტი დაეთმო ნარევებისა და რთული სისტემების (მაგალითად, მარილიანი მიკროალგების) ქცევის შესწავლას მაგნიტურ ნაწილაკებთან ინკუბაციისას.ასევე, დოქტორმა ფრაგამ ისაუბრა მაგნეტიტის მადნების დაფქვასთან დაკავშირებულ სირთულეებსა და შესაძლებლობებზე და წარმოაჩინა, როგორ განსხვავდება ადსორბციული პროცესების შედეგები გამოყენებული მაგნიტური მასალის თვისებების მიხედვით.</p><p>დოქტორ ფრაგას ლექციებმა და დისკუსიებმა მნიშვნელოვანი წვლილი შეიტანა ბიოსეპარაციისა და მაგნიტური განცალკევების თანამედროვე მიდგომების გაგებაში — როგორც ლაბორატორიულ, ისე ტექნიკურ დონეზე. მისი ვიზიტი კიდევ უფრო გააძლიერებს თანამშრომლობას მიუნხენის ტექნიკურ უნივერსიტეტსა და აგლაძის ინსტიტუტს შორის.</p>		
			<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251008_120401" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIyNywidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAwOF8xMjA0MDEtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251008_120401.jpg''><img width="150" height="150" src="/images/news/20251008_120401.jpg" alt="" decoding="async" srcset="/images/news/20251008_120401.jpg 150w, /images/news/20251008_120401.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251008_120536" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIyNiwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAwOF8xMjA1MzYtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251008_120536.jpg''><img width="150" height="150" src="/images/news/20251008_120536.jpg" alt="" decoding="async" srcset="/images/news/20251008_120536.jpg 150w, /images/news/20251008_120536.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251008_120556" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIyNSwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAwOF8xMjA1NTYtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251008_120556.jpg''><img width="150" height="150" src="/images/news/20251008_120556.jpg" alt="" decoding="async" srcset="/images/news/20251008_120556.jpg 150w, /images/news/20251008_120556.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251008_120657" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIyMywidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAwOF8xMjA2NTctc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251008_120657.jpg''><img width="150" height="150" src="/images/news/20251008_120657.jpg" alt="" decoding="async" srcset="/images/news/20251008_120657.jpg 150w, /images/news/20251008_120657.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="20251008_123016" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIyMiwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8yMDI1MTAwOF8xMjMwMTYtc2NhbGVkLmpwZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/20251008_123016.jpg''><img width="150" height="150" src="/images/news/20251008_123016.jpg" alt="" decoding="async" srcset="/images/news/20251008_123016.jpg 150w, /images/news/20251008_123016.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="IMG_1341" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIyMSwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC9JTUdfMTM0MS1zY2FsZWQuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/IMG_1341.jpg''><img width="150" height="150" src="/images/news/IMG_1341.jpg" alt="" decoding="async" srcset="/images/news/IMG_1341.jpg 150w, /images/news/IMG_1341.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="IMG_1342" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIyMCwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC9JTUdfMTM0Mi1zY2FsZWQuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/IMG_1342.jpg''><img width="150" height="150" src="/images/news/IMG_1342.jpg" alt="" decoding="async" srcset="/images/news/IMG_1342.jpg 150w, /images/news/IMG_1342.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="IMG_1343" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIxOSwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC9JTUdfMTM0My1zY2FsZWQuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/IMG_1343.jpg''><img width="150" height="150" src="/images/news/IMG_1343.jpg" alt="" decoding="async" srcset="/images/news/IMG_1343.jpg 150w, /images/news/IMG_1343.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="IMG_1347" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIxOCwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC9JTUdfMTM0Ny1zY2FsZWQuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/IMG_1347.jpg''><img width="150" height="150" src="/images/news/IMG_1347.jpg" alt="" decoding="async" srcset="/images/news/IMG_1347.jpg 150w, /images/news/IMG_1347.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="IMG_1348" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIxNywidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC9JTUdfMTM0OC1zY2FsZWQuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/IMG_1348.jpg''><img width="150" height="150" src="/images/news/IMG_1348.jpg" alt="" decoding="async" srcset="/images/news/IMG_1348.jpg 150w, /images/news/IMG_1348.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="001" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIxNiwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8wMDEuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/001.jpg''><img width="150" height="150" src="/images/news/001.jpg" alt="" decoding="async" srcset="/images/news/001.jpg 150w, /images/news/001.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="002" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIxNSwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC8wMDIuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/002.jpg''><img width="150" height="150" src="/images/news/002.jpg" alt="" decoding="async" srcset="/images/news/002.jpg 150w, /images/news/002.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="IMG_7606" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIxNCwidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC9JTUdfNzYwNi1zY2FsZWQuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/IMG_7606.jpg''><img width="150" height="150" src="/images/news/IMG_7606.jpg" alt="" decoding="async" srcset="/images/news/IMG_7606.jpg 150w, /images/news/IMG_7606.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="IMG_7603" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjIxMywidXJsIjoiaHR0cHM6XC9cL2lpY2UuZ2VcL3dwLWNvbnRlbnRcL3VwbG9hZHNcLzIwMjVcLzEyXC9JTUdfNzYwMy1zY2FsZWQuanBnIiwic2xpZGVzaG93IjoiZmYyOGU5NyJ9" href=''/images/news/IMG_7603.jpg''><img width="150" height="150" src="/images/news/IMG_7603.jpg" alt="" decoding="async" srcset="/images/news/IMG_7603.jpg 150w, /images/news/IMG_7603.jpg 400w" sizes="(max-width: 150px) 100vw, 150px" /></a>
			</figure>', '<p>On October 8, 2025, R.Agladze Institute of Inorganic Chemistry and Electrochemistry had the pleasure of hosting Dr. Paula Fraga García from the Chair of Bioseparation Engineering at the Technical University of Munich (TUM). The visit took place within the framework of the project “Bionanocomposites based on silver-containing humic acids as antibacterial and anti-inflammatory agents”, led by Dr. Spartak Khutsishvili and funded by the National Science Foundation of Georgia. As part of her visit, Dr. Fraga delivered a lecture titled “Impact of Carrier Material and Target Properties on Bioseparation Engineering.”</p><p>Paula started her presentation with some “facts and figures” about TUM and a general overview of the research topics in the Chair of Bioseparation Engineering. Afterwards, Paula provided an overview of the magnetic nanoparticles commonly employed in her research group, highlighting their physicochemical properties and their relevance in bioseparation processes. She presented experimental data illustrating the behavior of amino acids, proteins, and other biomolecules in solution, and discussed their adsorption characteristics through isotherm analyses. Furthermore, she expanded the scope of the talk to include results from electrosorption processes, offering valuable insights regarding protein separation using metallized membranes and how molecule binding and release can be triggered applying an electrical potential to the membranes.</p><p>After the presentation the members of the institute discussed with Paula Fraga about physical and chemical adsorption and about different phenomena taking place in aqueous solutions. Several questions dealt with the methodology applied to advance understanding of the properties of colloidal systems.</p><p>Paula had already visited our Agladze Institute of Inorganic Chemistry and Electrochemistry one year before, in September 2024. At that time, she had given a talk with the title “Adsorption and Magnetic Separation for Molecule Recovery in Biotechnology”.</p><p>This first presentation had focused on the behavior of mixtures and complex systems as saline microalgae upon incubation with magnetic particles for biomolecule separation purposes. Moreover, Paula had explained about difficulties and opportunities related with grinding of magnetite ores and about differences in the output of adsorption processes depending on the properties of the initial magnetic material. The colleagues of the Agladze Institute could learn about magnetic separation not only in the lab scale, but also at the technical scale.</p><p>Dr. Fraga''s lectures and discussions have contributed significantly to the understanding of modern approaches to bioseparation and magnetic separation—at both laboratory and technical levels. Her visit will further strengthen the cooperation between the Technical University of Munich and the Agladze Institute.</p>',
    'published', '2025-12-15T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-5',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'საქართველოს მეცნიერებათა ეროვნული აკადემიის მაცნეს ქიმიის სერიის(ISSN – 0132 – 6074)2025 წლის 45-ე ტომი', 'Volume 45 of the Chemistry Series of the Georgian National Academy of Sciences (ISSN – 0132 – 6074) 2025', 'news-5',
    '/images/news/post-5/post-6161-main.jpg', ARRAY['/images/news/post-5/post-6161-main.jpg']::TEXT[],
    '<p>,,საქართველოს მეცნიერებათა ეროვნული აკადემიის მაცნეს ქიმიის სერიის <b>(</b><b>ISSN – 0132 – 6074</b><b>)</b>&nbsp;2025 წლის&nbsp;45-ე&nbsp;ტომი მოიცავს 2023 წლის 23-25 ნოემბერს ქ.თბილისში ჩატარებული მე-2 საერთაშორისო სამეცნიერო კონფერენციისა და&nbsp;სეზონური&nbsp;სკოლის ,,მეცნიერება,&nbsp;განათლება,&nbsp;ინოვაციები&nbsp;და&nbsp;ქიმიური&nbsp;ტექნოლოგიები&nbsp;–&nbsp;იდეიდან&nbsp;დანერგვამდე“&nbsp;მასალებს.&nbsp;</p>
<p data-wp-editing="1"><a style="color: #0e1da1; font-weight: bold;" href="/images/news/macne-qimiis-seria-2025-tomi-45.pdf" target="_blank" rel="noopener">📄 ჩამოტვირთე PDF</a></p>', '<p>Volume 45 of the Chemistry Series of the Georgian National Academy of Sciences (ISSN – 0132 – 6074) 2025 includes the materials of the 2nd International Scientific Conference and Seasonal School "Science, Education, Innovations and Chemical Technologies - from Idea to Implementation" held in Tbilisi on November 23-25, 2023.</p><p data-wp-editing="1"><a style="color: #0e1da1; font-weight: bold;" href="/images/news/macne-qimiis-seria-2025-tomi-45.pdf" target="_blank" rel="noopener">📄 Download PDF</a></p>',
    'published', '2025-10-16T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-6',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'კვლევები კომპოზიციურ პოლიმერების მიმართულებით', '[ENG] კვლევები კომპოზიციურ პოლიმერების მიმართულებით', 'news-6',
    '/images/news/post-6/post-6023-main.png', ARRAY['/images/news/post-6/post-6023-main.png']::TEXT[],
    '<p>სხვადასხვა თერმოპლასტიური და თერმორეაქტიული პოლიმერების (პოლიეთილენის, პოლიპროპოლენის, პოლიეთილენტერეფტალატის, ეპოქსიდური ფისების) საფუძველზე  მიღებულია პოლიმერული კომპოზიტები. შემავსებლად გამოყენებულია საქართველოში გავრცელებული მინერალების  წვრილდისპერსიული  ფხვნილები (ანდეზიტი, საჩხერის კვარცის ქვიშა, ბენტონიტი, დოლომიტი, ოკამის წიდა  და დიატომიტი), აგრეთვე ორგანული შემვსებები (ხის ფქვილი, ნახერხი, სხვადასხვა მცენარეების ფოთლებისა და წიწვების ნარჩენები).  შევისწავლეთ მიღებული კომპოზიტების ფიზიკურ-მექანიკური, ქიმიური, ჰიდროფობური და თერმული თვისებები. ექსპერიმენტალურად  დადგენილია, რომ მათი თვისებები არსებითად დამოკიდებულია შემავსებლის ტიპსა და კონცენტრაციაზე. თითოეული შემავსებლის გარკვეული რაოდენობისას გამოვლენილია       საუკეთესო თვისების მქონე მასალა.</p><p> კომპოზიციური მასალის თვისებათა გაუმჯობესების მიზნით გამოყენებულია მინერალების მოდიფიცირების მეთოდი დაბალმოლეკულურo ორგანული სილიკონური ნარევით-ეთილსილიკატით. </p><p>   დადგენილია, რომ კომპოზიციური მასალის ყველა თვისება არსებითად უმჯობესდება, როდესაც შემვსებები მოდიფიცირებულია სილიკოორგანული ნარევის-ეთილსილიკატის საშუალებით. კომპოზიტები მოდიფიცირებული მინერალებით აჩვენებენ კომპონენტების უფრო მაღალ თავსებადობას, ვიდრე არამოდიფიცირებული მინერალებით შევსებული იგივე კომპოზიტები. ეს ფაქტორი განპირობებულია ე.წ. ,,ბუფერული" ზონებით, რომლებსაც  სილანის მოლეკულები წარმოქმნის შემავსებლის მარცვლებსა და ჰომოპოლიმერის მაკრომოლეკულებს შორის. ამის გამო მოდიფიცირებულ შემავსებელს უფრო ძლიერი კონტაქტი აქვს პოლიმერულ მატრიცასთან, ვიდრე არამოდიფიცირებულ შემავსებელს. ძლიერდება თავსებადობა შემავსებლის მარცვლებსა და პოლიმერის მაკრომოლეკულებს შორის, რაც განაპირობებს კომპოზიციური მასალის ფიზიკურ-მექანიკური და თერმული თვისებების ზრდას. ეთილსილიკატი აძლიერებს რა ინგრედიენტების თავსებადობას, ამცირებს კომპოზიტების სიმყიფეს და მასალაში დეფექტების წარმოქმნას, რის გამოც მცირდება კომპოზიტების წყალშთანთქმა. პოლიმერული კომპოზიტების ჰიდროფობური თვისებები საკმაოდ მაღალია, კომპოზიტების წყალშთანთქმა არ აღემატება 1,5% - ს.</p><p>     მიღებულია აგრეთვე, პოლიმერული კომპოზიტები  ბინალური (ორმაგი) შემვსებებით, კრძოდ, ანდეზიტი/დიატომიტი, ანდეზიტი/ოკამის წიდა და სხვა. ბინალურ შემვსებთა გარკვეული თანაფარდობისას ადგილი აქვს  ,,სინერგიულ ეფექტს", რომელიც კომპოზიციური მასალის ფიზიკურ-მექანიკური და თერმული თვისებების გაზრდის ერთ -ერთი მიზეზია. </p><p>   კომპოზიტები მოდიფიცირებული ბინალური (ორმაგი) შემვსებებით  აჩვენებს კომპონენტების უფრო მაღალ  თავსებადობას, ვიდრე არამოდიფიცირებული შემავსებლით შევსებული იგივე კომპოზიტები და, შესაბამისად, უფრო  მეტად გაუმჯობესებულ საექსპლუატაციო თვისებებს.</p>		
			<style>/*! elementor - v3.23.0 - 25-07-2024 */
.elementor-image-gallery .gallery-item{display:inline-block;text-align:center;vertical-align:top;width:100%;max-width:100%;margin:0 auto}.elementor-image-gallery .gallery-item img{margin:0 auto}.elementor-image-gallery .gallery-item .gallery-caption{margin:0}.elementor-image-gallery figure img{display:block}.elementor-image-gallery figure figcaption{width:100%}.gallery-spacing-custom .elementor-image-gallery .gallery-icon{padding:0}@media (min-width:768px){.elementor-image-gallery .gallery-columns-2 .gallery-item{max-width:50%}.elementor-image-gallery .gallery-columns-3 .gallery-item{max-width:33.33%}.elementor-image-gallery .gallery-columns-4 .gallery-item{max-width:25%}.elementor-image-gallery .gallery-columns-5 .gallery-item{max-width:20%}.elementor-image-gallery .gallery-columns-6 .gallery-item{max-width:16.666%}.elementor-image-gallery .gallery-columns-7 .gallery-item{max-width:14.28%}.elementor-image-gallery .gallery-columns-8 .gallery-item{max-width:12.5%}.elementor-image-gallery .gallery-columns-9 .gallery-item{max-width:11.11%}.elementor-image-gallery .gallery-columns-10 .gallery-item{max-width:10%}}@media (min-width:480px) and (max-width:767px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:50%}}@media (max-width:479px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:100%}}</style>		
			<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="79fa724" data-elementor-lightbox-title="Picture1" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NTk5NCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTEuanBnIiwic2xpZGVzaG93IjoiNzlmYTcyNCJ9" href=''/images/news/Picture1.jpg''><img width="225" height="300" src="/images/news/Picture1.jpg" alt="" decoding="async" srcset="/images/news/Picture1.jpg 225w, /images/news/Picture1.jpg 768w, /images/news/Picture1.jpg 830w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="79fa724" data-elementor-lightbox-title="Picture2" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NTk5MywidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTIuanBnIiwic2xpZGVzaG93IjoiNzlmYTcyNCJ9" href=''/images/news/Picture2.jpg''><img width="225" height="300" src="/images/news/Picture2.jpg" alt="" decoding="async" srcset="/images/news/Picture2.jpg 225w, /images/news/Picture2.jpg 769w, /images/news/Picture2.jpg 768w, /images/news/Picture2.jpg 786w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="79fa724" data-elementor-lightbox-title="Picture3" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NTk5MiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTMuanBnIiwic2xpZGVzaG93IjoiNzlmYTcyNCJ9" href=''/images/news/Picture3.jpg''><img width="300" height="252" src="/images/news/Picture3.jpg" alt="" decoding="async" srcset="/images/news/Picture3.jpg 300w, /images/news/Picture3.jpg 1024w, /images/news/Picture3.jpg 768w, /images/news/Picture3.jpg 1166w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure>', '[ENG] Translation needed for: კვლევები კომპოზიციურ პოლიმერების მიმართულებით',
    'published', '2025-07-15T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-7',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    '2 ივლისის სემინარი', '[ENG] 2 ივლისის სემინარი', 'news-7',
    '/images/news/post-7/post-6005-main.png', ARRAY['/images/news/post-7/post-6005-img-0.png','/images/news/post-7/post-6005-img-1.jpg','/images/news/post-7/post-6005-img-2.jpg','/images/news/post-7/post-6005-img-3.png','/images/news/post-7/post-6005-img-4.jpg','/images/news/post-7/post-6005-img-5.jpg','/images/news/post-7/post-6005-img-6.png','/images/news/post-7/post-6005-img-7.jpg','/images/news/post-7/post-6005-main.png']::TEXT[],
    '<p>სემინარების კვირეულის ფარგლებში, 2025 წლის 2 ივლისს, „ფუნდამეტური კვლევებისა და კომპოზიციური მასალების სინთეზის განყოფილების“ თანამშრომელმა და დოქტორანტურის საფეხურის სტუდენტმა სოფო ცქიტიშვილმა წაიკითხა მოხსენება თემაზე- „ადსორბენტები მეორადი ნედლეულისა და ცეოლითის ბაზაზე - CO2-ის ჩაჭერა“.</p><p>სემინარზე წარმოდგენილი იყო კვლევის საწყის ეტაპზე მიღებული შედეგები და წინასწარი დასკვნები. მიღებულ შედეგებზე დაყრდნობით, აღნიშნული თემის სიღრმისეული შესწავლის მიზნით, განხილული იყო შესრულებული კვლევის ეტაპები. სემინარის დასკვნით ნაწილში გარიმართა დისკუსია, წამოიჭრა რიგი საინტერესო საკითხებისა, რომელთა გათვალისწინებაც მომავალში დოქტორანტს ხელს შეუწობს სწორად დაგეგმოს სადისერტაციო ნაშრომის მომდევნო ეტაპები.</p><p> სემინარის მორე ნაწილს გაუძღვა „ფიზიკურ-ქიმიური კვლევისა და ანალიზის განყოფილების“ თანამშრომელი - სპარტაკ ხუციშვილი, თემატიკით: „სიახლეები ელექტრონ მაგნიტური რეზონანსის ჯგუფის ყოველწლიური საერთაშორისო შეხვედრიდან,ლონდონი“.</p><p>2025 წლის ივნისში ლონდონში გამართულ კონფერენციაზე წარმოდგენილი იყო EPR კვლევების უახლესი მიღწევები ბიომედიცინის, სპინტრონიკის, ნანომატერიალების, მოლეკულური მაგნიტების და სხვა სფეროებში. ჩვენმა ინსტიტუტმა წარმოადგინა ნაშრომი - "ბიონანოკომპოზიტების ანტიოქსიდანტური და ბაქტერიოსტატიკური აქტივობა ბუნებრივი სულფატირებული პოლისაქარიდების ბაზაზე, მანგანუმის (ჰიდრ)ოქსიდის ნანონაწილაკებით", CRDF GLOBAL ფონდთან თანამშრომლობით.</p>		
			<style>/*! elementor - v3.23.0 - 25-07-2024 */
.elementor-image-gallery .gallery-item{display:inline-block;text-align:center;vertical-align:top;width:100%;max-width:100%;margin:0 auto}.elementor-image-gallery .gallery-item img{margin:0 auto}.elementor-image-gallery .gallery-item .gallery-caption{margin:0}.elementor-image-gallery figure img{display:block}.elementor-image-gallery figure figcaption{width:100%}.gallery-spacing-custom .elementor-image-gallery .gallery-icon{padding:0}@media (min-width:768px){.elementor-image-gallery .gallery-columns-2 .gallery-item{max-width:50%}.elementor-image-gallery .gallery-columns-3 .gallery-item{max-width:33.33%}.elementor-image-gallery .gallery-columns-4 .gallery-item{max-width:25%}.elementor-image-gallery .gallery-columns-5 .gallery-item{max-width:20%}.elementor-image-gallery .gallery-columns-6 .gallery-item{max-width:16.666%}.elementor-image-gallery .gallery-columns-7 .gallery-item{max-width:14.28%}.elementor-image-gallery .gallery-columns-8 .gallery-item{max-width:12.5%}.elementor-image-gallery .gallery-columns-9 .gallery-item{max-width:11.11%}.elementor-image-gallery .gallery-columns-10 .gallery-item{max-width:10%}}@media (min-width:480px) and (max-width:767px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:50%}}@media (max-width:479px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:100%}}</style>		
			<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture7" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNSwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTcuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture7.jpg''><img width="225" height="300" src="/images/news/Picture7.jpg" alt="" decoding="async" srcset="/images/news/Picture7.jpg 225w, /images/news/Picture7.jpg 709w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture5" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNywidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTUuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture5.jpg''><img width="225" height="300" src="/images/news/Picture5.jpg" alt="" decoding="async" srcset="/images/news/Picture5.jpg 225w, /images/news/Picture5.jpg 767w, /images/news/Picture5.jpg 768w, /images/news/Picture5.jpg 848w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture11" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMSwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTExLnBuZyIsInNsaWRlc2hvdyI6IjgxMjQ0NDYifQ%3D%3D" href=''/images/news/Picture11.png''><img width="211" height="300" src="/images/news/Picture11.png" alt="" decoding="async" srcset="/images/news/Picture11.png 211w, /images/news/Picture11.png 474w" sizes="(max-width: 211px) 100vw, 211px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture8" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTguanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture8.jpg''><img width="300" height="265" src="/images/news/Picture8.jpg" alt="" decoding="async" srcset="/images/news/Picture8.jpg 300w, /images/news/Picture8.jpg 768w, /images/news/Picture8.jpg 915w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture4" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxOCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTQuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture4.jpg''><img width="225" height="300" src="/images/news/Picture4.jpg" alt="" decoding="async" srcset="/images/news/Picture4.jpg 225w, /images/news/Picture4.jpg 768w, /images/news/Picture4.jpg 868w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture9" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMywidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTkucG5nIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture9.png''><img width="300" height="205" src="/images/news/Picture9.png" alt="" decoding="async" srcset="/images/news/Picture9.png 300w, /images/news/Picture9.png 500w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture12" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTEyLnBuZyIsInNsaWRlc2hvdyI6IjgxMjQ0NDYifQ%3D%3D" href=''/images/news/Picture12.png''><img width="263" height="300" src="/images/news/Picture12.png" alt="" decoding="async" srcset="/images/news/Picture12.png 263w, /images/news/Picture12.png 410w" sizes="(max-width: 263px) 100vw, 263px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture6" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxNiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTYuanBnIiwic2xpZGVzaG93IjoiODEyNDQ0NiJ9" href=''/images/news/Picture6.jpg''><img width="291" height="300" src="/images/news/Picture6.jpg" alt="" decoding="async" srcset="/images/news/Picture6.jpg 291w, /images/news/Picture6.jpg 768w, /images/news/Picture6.jpg 943w" sizes="(max-width: 291px) 100vw, 291px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="8124446" data-elementor-lightbox-title="Picture10" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAxMiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvUGljdHVyZTEwLnBuZyIsInNsaWRlc2hvdyI6IjgxMjQ0NDYifQ%3D%3D" href=''/images/news/Picture10.png''><img width="300" height="188" src="/images/news/Picture10.png" alt="" decoding="async" srcset="/images/news/Picture10.png 300w, /images/news/Picture10.png 605w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure>', '[ENG] Translation needed for: 2 ივლისის სემინარი',
    'published', '2025-07-15T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-8',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'რადიაციული უსაფრთხოების ახალი რეალობა საქართველოში: გამოწვევებიდან მდგრად განვითარებამდე', '[ENG] რადიაციული უსაფრთხოების ახალი რეალობა საქართველოში: გამოწვევებიდან მდგრად განვითარებამდე', 'news-8',
    '/images/news/post-8/post-5999-main.jpg', ARRAY['/images/news/post-8/post-5999-img-0.jpg','/images/news/post-8/post-5999-img-1.jpg','/images/news/post-8/post-5999-img-2.jpg','/images/news/post-8/post-5999-main.jpg']::TEXT[],
    '<p>2025 წლის 1 ივლისს, რაფიელ აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში, რადიაციული მეცნიერებებისა და უსაფრთხოების ინტერდისციპლინურმა კონსორციუმმა გამართა პირველი სამეცნიერო-პრაქტიკული სემინარი - „რადიაციული უსაფრთხოების ახალი რეალობა საქართველოში: გამოწვევებიდან მდგრად განვითარებამდე“, რომელიც მიზნად ისახავს რადიაციულ რისკებთან დაკავშირებული თანამედროვე გამოწვევების შეფასებას და დარგთაშორისი თანამშრომლობის გაღრმავებას.</p><p>სემინარის ფარგლებში დაიგეგმა ინოვაციური პლატფორმის შექმნა, რომელიც ხელს შეუწყობს მეცნიერების, საჯარო სექტორისა და საზოგადოების ინტეგრირებულ თანამშრომლობას. ეს იქნება სივრცე, სადაც ჩამოყალიბდება ერთიანი ხედვები რადიაციული უსაფრთხოების მართვაზე, შეიქმნება სამოქმედო გეგმები, ჩატარდება საჯარო კონსულტაციები, და დაინერგება მონაცემთა ღია ბაზები, რაც უზრუნველყოფს გადაწყვეტილებების მიღებას ფაქტებზე დაყრდნობით და ეთიკური სტანდარტების გათვალისწინებით.</p><p>საქართველო მნიშვნელოვან სტრატეგიულ მონაწილეს წარმოადგენს რეგიონული რადიაციული უსაფრთხოების არქიტექტურის ფორმირებასა და გამყარებაში. სტრატეგიული ჩართულობის გასაძლიერებლად, სემინარი კონცენტრირდა შემდეგ პრაქტიკულ მიმართულებებზე: რადიაციული უსაფრთხოება; რადიაციული დაბინძურების პრევენცია; განათლება და რადიაციული დაცვის კულტურა.</p><p><em><u>კონსორციუმის დამფუძნებელი ორგანიზაციები:</u></em></p><ul><li>ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი;</li><li>ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის  ელეფთერ ანდრონიკაშვილის სახელობის ფიზიკის ინსტიტუტი;</li><li>ივანე ბერიტაშვილის ექსპერიმენტული ბიომედიცინის ცენტრის რადიაციული უსაფრთხოების პრობლემათა ლაბორატორია;</li><li>ა(ა)იპ სასწავლო-კვლევითი სამეცნიერო ცენტრი</li></ul><p> </p><p>სემინარს დაესწრენ სხვადასხვა დარგის დოქტორანტები, რომლებიც მუშაობენ რადიაციული უსაფრთხოებისა და განათლების მიმართულებით და დარგობრივი სპეციალისტები, მათ შორის:</p><p>ნინო     უტიაშვილი       -  ბირთვული        და          რადიაციული   უსაფრთხოების სააგენტოს დირექტორი და წარმომადგენლები საქართველოს გარემოს დაცვის და სოფლის მეურნეობის  სამინისტროს,  გარემოს  დაცვითი  ინფორმაციის  და განათლების ცენტრიდან.</p>		
			<style>/*! elementor - v3.23.0 - 25-07-2024 */
.elementor-image-gallery .gallery-item{display:inline-block;text-align:center;vertical-align:top;width:100%;max-width:100%;margin:0 auto}.elementor-image-gallery .gallery-item img{margin:0 auto}.elementor-image-gallery .gallery-item .gallery-caption{margin:0}.elementor-image-gallery figure img{display:block}.elementor-image-gallery figure figcaption{width:100%}.gallery-spacing-custom .elementor-image-gallery .gallery-icon{padding:0}@media (min-width:768px){.elementor-image-gallery .gallery-columns-2 .gallery-item{max-width:50%}.elementor-image-gallery .gallery-columns-3 .gallery-item{max-width:33.33%}.elementor-image-gallery .gallery-columns-4 .gallery-item{max-width:25%}.elementor-image-gallery .gallery-columns-5 .gallery-item{max-width:20%}.elementor-image-gallery .gallery-columns-6 .gallery-item{max-width:16.666%}.elementor-image-gallery .gallery-columns-7 .gallery-item{max-width:14.28%}.elementor-image-gallery .gallery-columns-8 .gallery-item{max-width:12.5%}.elementor-image-gallery .gallery-columns-9 .gallery-item{max-width:11.11%}.elementor-image-gallery .gallery-columns-10 .gallery-item{max-width:10%}}@media (min-width:480px) and (max-width:767px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:50%}}@media (max-width:479px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:100%}}</style>		
			<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="picutre25" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAyNSwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvcGljdXRyZTI1LXNjYWxlZC5qcGciLCJzbGlkZXNob3ciOiJmZjI4ZTk3In0%3D" href=''/images/news/picutre25.jpg''><img width="225" height="300" src="/images/news/picutre25.jpg" alt="" decoding="async" srcset="/images/news/picutre25.jpg 225w, /images/news/picutre25.jpg 768w, /images/news/picutre25.jpg 1152w, /images/news/picutre25.jpg 1536w, /images/news/picutre25.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="picture24" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAyNiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvcGljdHVyZTI0LXNjYWxlZC5qcGciLCJzbGlkZXNob3ciOiJmZjI4ZTk3In0%3D" href=''/images/news/picture24.jpg''><img width="300" height="225" src="/images/news/picture24.jpg" alt="" decoding="async" srcset="/images/news/picture24.jpg 300w, /images/news/picture24.jpg 1024w, /images/news/picture24.jpg 768w, /images/news/picture24.jpg 1536w, /images/news/picture24.jpg 2048w" sizes="(max-width: 300px) 100vw, 300px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="picture23" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAyNywidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvcGljdHVyZTIzLXNjYWxlZC5qcGciLCJzbGlkZXNob3ciOiJmZjI4ZTk3In0%3D" href=''/images/news/picture23.jpg''><img width="225" height="300" src="/images/news/picture23.jpg" alt="" decoding="async" srcset="/images/news/picture23.jpg 225w, /images/news/picture23.jpg 768w, /images/news/picture23.jpg 1152w, /images/news/picture23.jpg 1536w, /images/news/picture23.jpg 1920w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure><figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="ff28e97" data-elementor-lightbox-title="picture22" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NjAyOCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wN1wvcGljdHVyZTIyLnBuZyIsInNsaWRlc2hvdyI6ImZmMjhlOTcifQ%3D%3D" href=''/images/news/picture22.png''><img width="225" height="300" src="/images/news/picture22.png" alt="" decoding="async" srcset="/images/news/picture22.png 225w, /images/news/picture22.png 485w" sizes="(max-width: 225px) 100vw, 225px" /></a>
			</figure>
		/images/news/7-radiatsiuli-ks.mp4', '[ENG] Translation needed for: რადიაციული უსაფრთხოების ახალი რეალობა საქართველოში: გამოწვევებიდან მდგრად განვითარებამდე',
    'published', '2025-07-15T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-9',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'ბუნებრივი პოლისაქარიდების საფუძველზე უსაფრთხო.', '[ENG] ბუნებრივი პოლისაქარიდების საფუძველზე უსაფრთხო.', 'news-9',
    '/images/news/post-10/post-5881-main.jpg', ARRAY['/images/news/post-10/post-5881-img-0.jpg','/images/news/post-10/post-5881-img-1.jpg','/images/news/post-10/post-5881-img-2.jpg','/images/news/post-10/post-5881-main.jpg']::TEXT[],
    '<!-- wp:paragraph -->
<p><p><i>გრანტი STEM-22-1751 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </i><i>29.05.2025</i></p>
<p><i>შოთა რუსთაველის საქართველოს ეროვნული სამეცნიერო ფონდი</i></p>
<p><i>Shota Rustaveli National Science Foundation of Georgia</i></p>
<p><b>ბუნებრივი პოლისაქარიდების საფუძველზე უსაფრთხო, ბიოდეგრადირებადი, უნივერსალური, ბიონანოკომპოზიტური ახალი თაობის მიკროსასუქების შემუშავება, მომავლის სოფლის მეურნეობის განვითარების მიზნით</b></p>
<p>&nbsp;</p>
<p>პროექტი მიზნად ისახავს ინტეგრირებული თანამედროვე მიდგომის შემუშავებას ახალი უნივერსალური ტროფიკული დაბალი დოზით მანგანუმშემცველი ბიონანოკომპოზიტების შესაქმნელად, რომელიც დაფუძნებულია ბუნებრივ პოლისაქარიდებზე (კარაგინანები (მ.შ. κ-კარაგინანი, l-კარაგინანი), სახამებელი) მიკროსასუქების მიზანმიმართული მიწოდებისთვის და მცენარეთა დაცვისთვის. შემოთავაზებული პროექტი ფოკუსირებულია მანგანუმშემცველი შედგენილობის ნანო-ნივთიერებების შემუშავებაზე, რომლებიც ხელს უწყობენ მცენარეების მიერ სასუქების უკეთეს შეწოვას უსაფრთხო დოზებით. ასეთი ორგანო-მინერალური სასუქები შესაძლებელს ხდის უფრო მაღალი მოსავლიანობის მიღებას და, შენელებული მოქმედების გამო, ნიადაგიდან მიკროელემენტების გამორეცხვისადმი მდგრადობას, ხოლო საკვები ნივთიერებების უკეთესი შეწოვა, ასევე, ამცირებს მათ დანაკარგს გარემოსთვის. უდავოა, რომ ყველაზე უსაფრთხო და ეკო-მეგობრული მიდგომა ეფუძნება ბიონანოკომპოზიტების სინთეზისთვის ბუნებრივი ბიოთავსებადი და ადვილად ბიოდეგრადირებადი პოლისაქარიდების ნაერთების გამოყენებას. თავის მხრივ, მიღებულ ნანოკომპოზიტებს აქვთ თვისებების სინერგია მცენარეების განვითარებისა და მათი დაცვის სტიმულირებისთვის, კერძოდ, ანტიბაქტერიული ეფექტები ფიტოპათოგენების წინააღმდეგ და, ასევე, არატოქსიკურია ნიადაგის ბუნებრივი მიკრობიომისთვის. მიღებული შედეგები საინტერესოა სოფლის მეურნეობისთვის ნანოქიმიის ახალი სფეროების შემდგომი განვითარებისთვის.</p>
<p><b>სემინარის დროს წარმოდგენილი იყო პროექტის შედეგები:</b></p>
<p>ბუნებრივ პოლისაქარიდებს გააჩნიათ მნიშვნელოვანი თვისებები, როგორიცაა ბიოშეთავსებადობა, არატოქსიკურობა, ბიოდეგრადირებადობა, ჰიდროგელის წარმოქმნა, ჰიდროტროპულობა (დაბალი ხსნადობის მქონე ნივთიერებების ხსნადობის გაზრდის უნარი) და მრავალი სხვა. ამ თვისებებმა ახალ იმპულსი მიანიჭა თანამედროვე ნანომასალების განვითარებას სოფლის მეურნეობისთვის. ნანომასალების ნიადაგის მინერალებით გამდიდრების აშკარა გამოყენების გარდა, პოლისაქარიდებზე დაფუძნებული ნანონაერთები ხელს უწყობენ თესლის სწრაფად აღმოცენებას, იცავენ მცენარეებს სხვადასხვა დაავადებისგან, ზრდიან მათ მდგრადობას სხვადასხვა სტრესფაქტორის მიმართ, ეხმარებიან წყლის შენარჩუნებასა და ტრანსპორტირებაში მცენარეულ ქსოვილებში, აგრეთვე ზრდიან მოსავლიანობას და სხვა.</p>
<p>დასინთეზდა ბიონანოკომპოზიტი, რომელიც დაფუძნებულია ბუნებრივ პოლისაქარიდ ι-carrageenan და შეიცავს მანგანუმის ოქსიდის ნანონაწილაკებს (ზომის დიაპაზონი 3–11 ნმ), ჩაშენებულს ბიოპოლიმერულ მატრიცაში. ჩვენ ვაჩვენეთ, რომ აღნიშნული კომპოზიტი გამოირჩევა პერსპექტული და მნიშვნელოვანი თვისებებით, რაც მას საფუძვლად აქცევს ახალი თაობის უსაფრთხო, ბიოდეგრადირებადი და არატოქსიკური მრავალფუნქციური მიკროსასუქების შესაქმნელად (მანგანუმის შემცველობით 0.7–1.5 წ.%), რომლებიც აგროკულტურებისთვის აუცილებელი მინერალური მიკროელემენტების მატარებლის ფუნქციას შეასრულებენ. ერთ-ერთი ყველაზე მნიშვნელოვანი შედეგია ის, რომ მიღებულ ნანოკომპოზიტს აქვს ანტიბაქტერიული მოქმედება ფიტოპათოგენურ ბაქტერიაზე Clavibacter michiganensis subsp. sepedonicus-ზე, და საკონტროლო ნიმუშთან შედარებით იგი აფერხებს ამ ბაქტერიის ზრდას 67%-ით. დაფიქსირებული აქტივობა შეიძლება აიხსნას შერჩეული სულფატირებული პოლისაქარიდის ι-კარაგინანის ბიობაქტიური თვისებებისა და ლითონის ოქსიდის ნანონაწილაკების ანტიბაქტერიული მოქმედების სინერგიული ეფექტით.</p>
<p>შემდგომი განვითარების ეტაპი მოიცავს კვლევებს მცენარეებზე ასეპტიკურ ლაბორატორიულ პირობებში, ასევე ღია ან დაცულ ნიადაგზე, ეს კი მიზნად ისახავს სოფლის მეურნეობაში არსებული გამოწვევების დაძლევის გადაწყვეტილებების შექმნას.&nbsp; გარდა ამისა, მიღებული ბიონანოკომპოზიტების გამოყენება შესაძლებელია მცენარეთა მოსაყვანად ხელოვნურ საკვებ გარემოზე, რომელიც შეიცავს მკვებავი კომპონენტების დაბალანსებულ შემადგენლობას, რაც აუცილებელია მცენარეთა ზრდისა და განვითარების გასაუმჯობესებლად იმ შემთხვევაში, როდესაც მათი გაშენება რთულია ჩვეულებრივ პირობებში. ასეთი ხელოვნური საკვები მედიის გამოყენებას დიდი მნიშვნელობა აქვს ავტონომიური სიცოცხლის უზრუნველყოფის სისტემების დასაპროექტებლად, მაგალითად, გრძელვადიანი კოსმოსური ფრენებისთვის.</p></p>
<!-- /wp:paragraph -->

<style>/*! elementor - v3.23.0 - 25-07-2024 */<br />
.elementor-image-gallery .gallery-item{display:inline-block;text-align:center;vertical-align:top;width:100%;max-width:100%;margin:0 auto}.elementor-image-gallery .gallery-item img{margin:0 auto}.elementor-image-gallery .gallery-item .gallery-caption{margin:0}.elementor-image-gallery figure img{display:block}.elementor-image-gallery figure figcaption{width:100%}.gallery-spacing-custom .elementor-image-gallery .gallery-icon{padding:0}@media (min-width:768px){.elementor-image-gallery .gallery-columns-2 .gallery-item{max-width:50%}.elementor-image-gallery .gallery-columns-3 .gallery-item{max-width:33.33%}.elementor-image-gallery .gallery-columns-4 .gallery-item{max-width:25%}.elementor-image-gallery .gallery-columns-5 .gallery-item{max-width:20%}.elementor-image-gallery .gallery-columns-6 .gallery-item{max-width:16.666%}.elementor-image-gallery .gallery-columns-7 .gallery-item{max-width:14.28%}.elementor-image-gallery .gallery-columns-8 .gallery-item{max-width:12.5%}.elementor-image-gallery .gallery-columns-9 .gallery-item{max-width:11.11%}.elementor-image-gallery .gallery-columns-10 .gallery-item{max-width:10%}}@media (min-width:480px) and (max-width:767px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:50%}}@media (max-width:479px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:100%}}</style>
<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="921bc08" data-elementor-lightbox-title="Picture4" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NTk2OCwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wNVwvUGljdHVyZTQuanBnIiwic2xpZGVzaG93IjoiOTIxYmMwOCJ9" href=''/images/news/Picture4.jpg''><img width="225" height="300" src="/images/news/Picture4.jpg" alt="" decoding="async" srcset="/images/news/Picture4.jpg 225w, /images/news/Picture4.jpg 768w, /images/news/Picture4.jpg 808w" sizes="(max-width: 225px) 100vw, 225px" /></a><br />
			</figure>
<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="921bc08" data-elementor-lightbox-title="Picture5" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NTk2NywidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wNVwvUGljdHVyZTUuanBnIiwic2xpZGVzaG93IjoiOTIxYmMwOCJ9" href=''/images/news/Picture5.jpg''><img width="300" height="225" src="/images/news/Picture5.jpg" alt="" decoding="async" srcset="/images/news/Picture5.jpg 300w, /images/news/Picture5.jpg 768w, /images/news/Picture5.jpg 911w" sizes="(max-width: 300px) 100vw, 300px" /></a><br />
			</figure>
<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="921bc08" data-elementor-lightbox-title="Picture6" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NTk2NiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wNVwvUGljdHVyZTYuanBnIiwic2xpZGVzaG93IjoiOTIxYmMwOCJ9" href=''/images/news/Picture6.jpg''><img width="300" height="225" src="/images/news/Picture6.jpg" alt="" decoding="async" srcset="/images/news/Picture6.jpg 300w, /images/news/Picture6.jpg 1024w, /images/news/Picture6.jpg 768w, /images/news/Picture6.jpg 1154w" sizes="(max-width: 300px) 100vw, 300px" /></a><br />
			</figure>

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->', '[ENG] Translation needed for: ბუნებრივი პოლისაქარიდების საფუძველზე უსაფრთხო.',
    'published', '2025-05-27T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-10',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'ბაქო -ორმხრივი ხელშეკრულება ', '[ENG] ბაქო -ორმხრივი ხელშეკრულება ', 'news-10',
    '/images/news/post-9/post-5882-main.jpg', ARRAY['/images/news/post-9/post-5882-img-0.jpg','/images/news/post-9/post-5882-main.jpg']::TEXT[],
    '<p>2025 წლის 5 ივნისს გაფორმდა შეთანხმება ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის რაფაელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტს და აზერბაიჯანის ნაგიევის სახელობის კატალიზის და არაორგანული ქიმიის ინსტიტუტსა შორის "საერთაშორისო მწვანე წყალბადის ლაბორატორიის" შექმნის შესახებ. შეთანხმება ხელმოწერილი იქნა რაფაელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დირექტორის, საქართველოს მეცნიერებათა ეროვნული აკადემიის აკადემიკოს წევრის, გრიგორ ტატიშვილის და კატალიზის და არაორგანული ქიმიის ინსტიტუტის გენერალური დირექტორის, აკადემიკოს დილგამ ტაგიევის მიერ.</p>
<p>გაფორმებული შეთანხმების მიზანია მწვანე წყალბადის წარმოების, შენახვის, ტრანსპორტირების და გამოყენების მიმართულებით ერთობლივი კვლევების, ტექნოლოგიური ინოვაციების, აკადემიური თანამშრომლობისა და ცოდნის გაცვლისთვის მრავალდარგოვანი პლატფორმის შექმნა.</p>
<p>შექმნილი ლაბორატორია დაეფუძნება კატალიზის და არაორგანული ქიმიის ინსტიტუტის სამეცნიერო-კვლევითი განყოფილებას - ნანოელექტროქიმია და ელექტროკატალიზის ლაბორატორია (აზერბაიჯანის მხარე) და რაფაელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის სამეცნიერო-კვლევითი განყოფილებას - გამოყენებითი ქიმიის განყოფილება (საქართველო).</p>
<style>/*! elementor - v3.23.0 - 25-07-2024 */<br />
.elementor-image-gallery .gallery-item{display:inline-block;text-align:center;vertical-align:top;width:100%;max-width:100%;margin:0 auto}.elementor-image-gallery .gallery-item img{margin:0 auto}.elementor-image-gallery .gallery-item .gallery-caption{margin:0}.elementor-image-gallery figure img{display:block}.elementor-image-gallery figure figcaption{width:100%}.gallery-spacing-custom .elementor-image-gallery .gallery-icon{padding:0}@media (min-width:768px){.elementor-image-gallery .gallery-columns-2 .gallery-item{max-width:50%}.elementor-image-gallery .gallery-columns-3 .gallery-item{max-width:33.33%}.elementor-image-gallery .gallery-columns-4 .gallery-item{max-width:25%}.elementor-image-gallery .gallery-columns-5 .gallery-item{max-width:20%}.elementor-image-gallery .gallery-columns-6 .gallery-item{max-width:16.666%}.elementor-image-gallery .gallery-columns-7 .gallery-item{max-width:14.28%}.elementor-image-gallery .gallery-columns-8 .gallery-item{max-width:12.5%}.elementor-image-gallery .gallery-columns-9 .gallery-item{max-width:11.11%}.elementor-image-gallery .gallery-columns-10 .gallery-item{max-width:10%}}@media (min-width:480px) and (max-width:767px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:50%}}@media (max-width:479px){.elementor-image-gallery .gallery.gallery-columns-2 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-3 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-4 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-5 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-6 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-7 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-8 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-9 .gallery-item,.elementor-image-gallery .gallery.gallery-columns-10 .gallery-item{max-width:100%}}</style>
<figure class=''gallery-item''>
				<a data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="dd4ac8d" data-elementor-lightbox-title="Picture7" data-e-action-hash="#elementor-action%3Aaction%3Dlightbox%26settings%3DeyJpZCI6NTk3NiwidXJsIjoiaHR0cHM6XC9cL25ldy5jb25mZXJlbmNlMjNpaWNlLmdlXC93cC1jb250ZW50XC91cGxvYWRzXC8yMDI1XC8wNVwvUGljdHVyZTcuanBnIiwic2xpZGVzaG93IjoiZGQ0YWM4ZCJ9" href=''/images/news/Picture7.jpg''><img width="300" height="225" src="/images/news/Picture7.jpg" alt="" decoding="async" srcset="/images/news/Picture7.jpg 300w, /images/news/Picture7.jpg 1024w, /images/news/Picture7.jpg 768w, /images/news/Picture7.jpg 1430w" sizes="(max-width: 300px) 100vw, 300px" /></a><br />
			</figure>

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->', '[ENG] Translation needed for: ბაქო -ორმხრივი ხელშეკრულება ',
    'published', '2025-05-27T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-11',
    (SELECT id FROM public.news_categories WHERE slug = 'news' LIMIT 1),
    'ბენაშვილი Elsevier ღონისძიებაზე', 'Benashvili at the Elsevier event', 'news-11',
    '/images/news/post-11/post-3458-main.jpg', ARRAY['/images/news/post-11/post-3458-img-0.jpg','/images/news/post-11/post-3458-img-1.jpg','/images/news/post-11/post-3458-img-2.jpg','/images/news/post-11/post-3458-main.jpg']::TEXT[],
    '', '<p>The seminar shared impressions from the scientific conference “Multifunctional Hybrid & Nanomaterials” held in Montpellier in March of this year, where, among 49 countries represented, Archil Benashvili, a doctoral student at our institute, presented a poster on behalf of Georgia entitled “Simultaneously electrogenerated manganese and cobalt oxides for potential application as electrode materials for supercapacitors”.</p><p>The goal of the work is to produce economically affordable and environmentally safe electrode materials for supercapacitors from manganese and cobalt oxides that will operate more efficiently than their commercially available alternatives.</p><p>MnO/CoO/C powder was obtained by electrolysis of 0.4 M MnSO₄, 0.4 M CoSO₄ and 0.5 M Na₂SO₄ solution using graphite working and auxiliary electrodes, using chronoamperometry techniques.</p><p>A nickel cloud covered with a monolayer of graphene served as a conductor, while PEDOT (Poly(3,4-ethylenedioxythiophene)-poly(styrenesulfonate)) served as an electron collector. The charge was accumulated in MnxOy/CoxOy/C structure.</p><p>After spin-coating a graphene monolayer nickel cloud with manganese and cobalt oxides and carbon powder, we studied the morphology and composition of the layer. X-ray diffraction (XRD) analysis of the powder shows that the sample is practically amorphous. X-ray fluorescence spectral analysis of the sample shows weak emission of cobalt and relatively strong emission of manganese. Energy-dispersive spectroscopy (EDS) analysis of the sample also shows intense emission of oxygen and carbon. It also revealed other elements – sulfur, silicon, sodium and nickel.</p><p>Thermogravimetric analysis showed that CoO₂ converts to CoO₃O₄-ad. Co₃O₄ is stable and does not undergo further transformations. At about 530°C, MnO₂ is converted to Mn₂O₃. MnO is stable up to about 800-850°C, and above this temperature it transforms into the MnO form. An increase in mass above about 850°C indicates the ignition of carbon. There is a significant difference in thermogravimetry in the case of commercial MnO₂/Co₃O₄/C powder, as no noticeable mass changes are observed due to the absence of additional components. In this case too, at around 530°C, MnO₂ is converted to Mn₂O₃.</p><p>The MnxOy/CoxOy/C composite was obtained by one-step electrogeneration of MnSO₄/CoSO₄/Na₂SO₄ solution using graphite electrodes. The electrochemical properties of the electrode, which consists of a graphene monolayer nickel cloud and PEDOT-bonded MnO/CoO/C, were investigated by cyclic voltammetry (CV) and galvanostatic charge-discharge (GCD) methods in Na₂SO₄ in solution.</p><p>The specific capacitance of the electrode we fabricated is promising for the development of a supercapacitor electrode. We varied the current and obtained different specific capacitance results, which require improvement in the future compared to the commercial powder-coated electrode.</p>',
    'published', '2025-03-03T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;
INSERT INTO public.news (
    legacy_id, category_id, title_ka, title_en, slug, cover_image_url, gallery_urls,
    content_ka, content_en, status, published_at
) VALUES (
    'news-12',
    (SELECT id FROM public.news_categories WHERE slug = 'seminars' LIMIT 1),
    '3D ბიოჰიბრიდული ელექტროდების განვითარება და მათი პოტენციური გამოყენებისშესაძლებლობა ფოტოაქტიურ სუპერკონდენსატორებში', '[ENG] 3D ბიოჰიბრიდული ელექტროდების განვითარება და მათი პოტენციური გამოყენებისშესაძლებლობა ფოტოაქტიურ სუპერკონდენსატორებში', 'news-12',
    '/images/news/post-12/post-6151-main.jpg', ARRAY['/images/news/post-12/post-6151-main.jpg']::TEXT[],
    '<p>2024 წლის 31 იანვარს, ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის სააქტო დარბაზში, ჩატარდა სემინარი, სადაც პროექტის ხელმძღვანელმა, ბატონმა ნიკოლოზ ნიორაძემ დამსწრე საზოგადოებას მოახსენა სსიპ შოთა რუსთაველის საქართველოს ეროვნული სამეცნიერო ფონდის მერ დაფინანსებული კვლევითი საგრანტო პროექტის FR-22-11993 "3D ბიოჰიბრიდული  ელექტროდების განვითარება და მათი პოტენციური გამოყენების შესაძლებლობა ფოტოაქტიურ სუპერკონდენსატორებში" შუალედური შედეგები. </p>
<p>სამეცნიერო საზოგადოება სულ უფრო მეტად ინტერესდება მზის ენერგიის უწყვეტი და უხვი რესურსის გამოყენების ინოვაციური მეთოდებით ენერგიის გარდაქმნისა და შენახვის სფეროში. ამ კონტექსტში შესწავლილი ტექნოლოგიები მოიცავს ფოტოვოლტაიკურ (PV) სისტემებს, ფოტოკატალიზურ პროცესებს, ფოტოდატენვად ბატარეებს და სხვადასხვა ოპტოელექტრონულ მოწყობილობებს. აღსანიშნავია, რომ მზის რადიაციის პირდაპირ გამოყენებას ხელს უშლის მისი არარეგულარული და წყვეტილი ხასიათი, რაც ზღუდავს სრული ენერგეტიკული პოტენციალის ეფექტურ ათვისებას. ამ პრობლემის გადაჭრის გზაზე, მზის ენერგიის შეგროვების, გარდაქმნისა და შენახვის ინტეგრირება ერთ კომპაქტურ მოწყობილობაში მნიშვნელოვანი ნაბიჯი იქნება.</p>
<p>პროექტი ითვალიწინებდა ისეთი მასალების შექმნას და გამოცდას რომლებიც პოტენციურად საინტერესო იქნებოდა ფოტომგრძნობიარე სუპერკონდენსატორულ მოწყობილობებში გამოსაყენებლად. ეს არის ჰიბრიდული სისტემა, რომელიც აერთიანებს ფოტოელექტრული უჯრედებისა და სუპერკონდენსატორების თვისებებს, რათა ერთდროულად უზრუნველყოს სინათლის მიერ ენერგიის გარდაქმნა და ელექტროქიმიური ენერგიის შენახვა. მოცემული ნაშრომის მიზანია ინდიუმის და კალის ოქსიდის (ITO) მინის ბაზაზე დაფუძნებული ფოტოელექტროქიმიურად აქტიური ელექტროდის დამზადება, რომელიც მოდიფიცირებულია მანგანუმის ოქსიდით/ნახშირბადის ნაწილაკებით (Mn₂O₃/C), ტიტანის დიოქსიდით (TiO₂) და ელექტროპოლიმერიზებული პოლიანილინის (PANI) ზედაპირული ფენით.</p>
<p>მზის სინათლის პირდაპირი გამოყენების მიუხედავად, მისი არარეგულარული პერიოდულობა გავლენას ახდენს ენერგიის მოპოვებაზე და ამგვარად უზარმაზარი ენერგეტიკული პოტენციალი გამოუყენებელი რჩება. ამ ფაქტის გათვალისწინებით, მზის ენერგიის შეგროვებას, გარდაქმნას და შენახვას ერთ, კომპაქტურ მოწყობილობაში დიდი მნიშვნელობა აქვს უწყვეტი ენერგომომარაგების გრძელვადიანი პერიოდისათვის. ამ კონტექსტში, ბოლო დროს მუშავდება ახალი სისტემები, ე.წ. ფოტოსუპერკონდენსატორები (PSC), რომლებიც ერთდროულად უზრუნველყოფენ მზის ენერგიის ფოტოელექტრულ გარდაქმნას და ენერგიის შენახვას (შესაბამისად, აერთიანებენ PV-ს და სუპერკონდენსატორებს).</p>
<p>პროექტი აკავშირებს რამოდენიმე დისციპლინას ერთმანეთთან: ენერგეტიკა, ქიმია (არაორგანული, ორგანული), ფოტოქიმია, მასალათმცოდნეობა. ამგვარად, პროექტის ფარგლებში ამ დისციპლინებთან დაკავშირებული განვითარება მოხდა. კერძოდ, უნდა გამოიკვეთოს ფოტოაქტიური სისტემების განვითარება რაც არ არის ხშირი მოვლენა საქართველოს სამეცნიერო სფეროში.</p>
<p>პროექტის მიმდინარეობამ და ექსერიმენტების შედეგად მიღებულმა მონაცემებმა დამსწრე საზოგადოების ინტერესი გამოიწვია. გაიმართა დისკუსია და მსჯელობა პროექტის შემდგომი კვლევითი გეგმების მიმართულებით. გამოითქვა რიგი საინტერესო მოსაზრება კვლევების ექსპერიმენტული ნაწილის ჩატარებისათვის ახლებური მიდგომების დასატესტად.</p>

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->', '[ENG] Translation needed for: 3D ბიოჰიბრიდული ელექტროდების განვითარება და მათი პოტენციური გამოყენებისშესაძლებლობა ფოტოაქტიურ სუპერკონდენსატორებში',
    'published', '2024-01-31T10:00:00Z'
) ON CONFLICT (slug) DO UPDATE SET
    title_ka = EXCLUDED.title_ka,
    title_en = EXCLUDED.title_en,
    content_ka = EXCLUDED.content_ka,
    content_en = EXCLUDED.content_en,
    cover_image_url = EXCLUDED.cover_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    published_at = EXCLUDED.published_at;

-- 4. Infrastructure Items Table
CREATE TABLE IF NOT EXISTS public.infrastructure_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ka TEXT,
    description_en TEXT,
    location_ka TEXT,
    location_en TEXT,
    image_urls TEXT[] DEFAULT '{}',
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.infrastructure_items ENABLE ROW LEVEL SECURITY;

-- Seed Infrastructure Items
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('მაღალი სიზუსტის რენტგენოფლუორესცენტული სპექტრომეტრი EDX 3600H Mining Analyzer', 'High Precision X-Ray Fluorescence Spectrometer EDX 3600H Mining Analyzer', 'ხელსაწყო გამოიყენება მყარი ნივთიერებების ელემენტური ანალიზისთვის ამ ნივთიერების ხსნარში გადაყვანის გარეშე. პროგრამული ოფციები: პროგრამა ელემენტების სრული დიაპაზონისათვის Na-დან (ნატრიუმიდან) U-მდე (ურანამდე); RoHS სტანდარტის აპლიკაციის დამატების საშუალება; მინერალების ანალიზის დამატებითი პროგრამა; დაფარვის სისქის გამზომი აპლიკაციის დამატების საშუალება; ვირტუალური და მანუალური კალიბრაციის საშუალება ყველა თავსებადი აპლიკაციისათვის.', 'The device is used for elemental analysis of solids without dissolving them. Software options: a program for the full range of elements from Na to U; ability to add RoHS standard application; additional mineral analysis program; ability to add a coating thickness measurement application; virtual and manual calibration tools for all compatible applications.', 'ლაბორატორიული კორპუსი, ოთახი 115', 'Laboratory Building, Room 115', 1)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('ტრინოკულარული მიკროსკოპი Amscope T690C-PL10m (HOLLAND)', 'Trinocular Microscope Amscope T690C-PL10m (HOLLAND)', 'მიკროსკოპი გამჭოლი სხივით გაუმჭვირვალე და გამჭვირვალე მასალებისთვის.', 'Microscope with transmitted light for opaque and transparent materials.', 'ლაბორატორიული კორპუსი, ოთახი 216', 'Laboratory Building, Room 216', 2)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('ტრინოკულარული მეტალურგიული მიკროსკოპი Euromex ME 2660 and ME 2665 ციფრული კამერით (1/2.5 CMOC sensoriT Euromex DC 5000c)', 'Trinocular Metallurgical Microscope Euromex ME 2660 and ME 2665 with Digital Camera', 'მიკროსკოპი გამჭოლი სხივით გაუმჭვირვალე და გამჭვირვალე მასალებისთვის.', 'Microscope with transmitted light for opaque and transparent materials.', 'ლაბორატორიული კორპუსი, ოთახი 216', 'Laboratory Building, Room 216', 3)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('ციფრული pH - მეტრი Auxilab Digital - meter model 907', 'Digital pH-meter Auxilab Digital - meter model 907', 'ხელსაწყო პოტენციომეტრული მეთოდით მანგანუმის განსასაზღვრად.', 'Instrument for potentiometric determination of manganese.', 'ლაბორატორიული კორპუსი, ოთახი 106', 'Laboratory Building, Room 106', 4)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('სპექტროფოტომეტრი auxilab zuzi speqtometer 4201/50', 'Spectrophotometer Auxilab Zuzi Spectrometer 4201/50', 'სპექტროფოტომეტრი Zuzi მოდელი 4201/50 წარმოადგენს უნივერსალურ ხელსაწყოს, რომელსაც შეუძლია შეასრულოს ზუსტი თვისებრივი და რაოდენობრივი ანალიზი ულტრაიისფერ სპექტრში.', 'The Spectrophotometer Zuzi model 4201/50 is a versatile instrument capable of performing precise qualitative and quantitative analysis in the ultraviolet spectrum.', 'ლაბორატორიული კორპუსი, ოთახი 216', 'Laboratory Building, Room 216', 5)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('ატომურ-აბსორბციული სპექტროფოტომეტრი ANALYST 200-1004 TAM / AAS-200 - Perkin Elmer', 'Atomic Absorption Spectrophotometer ANALYST 200-1004 TAM / AAS-200 - Perkin Elmer', 'ხელსაწყო გამოიყენება ნებისმიერი ტექნიკურ ან ბუნებრივი ობიექტის ელემენტური ანალიზისთვის, განსაკუთრებით იქ, სადაც საჭიროა ელემენტის მცირე შემცველობის განსაზღვრა (აღმოჩენის ქვედა ზღვარი- 10-5 - 10-6 მგ/ლ). ხელსაწყოზე შეიძლება განისაზღვროს 70-მდე ელემენტი (შესაბამისი ნათურებით აღჭურვის შემთხვევაში) სხვადასხვა წარმოშობის ნივთიერებებში: მადნებში, ლითონებში, შენადნობებში, ნიადაგში, სასუქებში, მცენარეებში და სხვა აგროქიმიურ მასალებში. ხელსაწყო შეოძლება გამოყენებულ იქნეს აგრეთვე კლინიკურ და ბიოლოგიურ ანალიზებშიც (სისხლი, პლაზმა). ხელსაწყო გამოიყენება უპირეტესად მიკრო მონარევების განსასაზღვრავად, მაგრამ, მისი გამოყენება აგრეთვე შესაძლებელია სხვადასხვა ობიექტებში ელემენტების მაღალი კონცენტრაციის შემცველობის დროსაც. ხელსაწყო აღჭურვილია კომპიუტერული მართვის სისტემით, ატომიზაციისათვის გამოყენებულია აცეტილენი.', 'The device is used for the elemental analysis of any technical or natural object, especially where the determination of small element contents is required. Up to 70 elements can be determined in substances of various origins. Equipped with a computerized control system, acetylene is used for atomization.', 'ლაბორატორიული კორპუსი, ოთახი 115', 'Laboratory Building, Room 115', 6)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('ატომურ-აბსორბციული სპექტროფოტომეტრი С-115', 'Atomic Absorption Spectrophotometer C-115', 'დანადგარი გამოიყენება ხსნარებში მყარი, თხევადი და აირადი ნივთიერებების თანაბარი განაწილებისათვის (ჰომოგენიზაციიისათვის).', 'The equipment is used for the uniform distribution of solid, liquid, and gaseous substances in solutions (homogenization).', 'ლაბორატორიული კორპუსი, ოთახი 115', 'Laboratory Building, Room 115', 7)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('ულტრაბგერითი რხევების დისპერგატორი Dowellultrasonic dw s20-2000', 'Ultrasonic Disperser Dowellultrasonic dw s20-2000', 'დანადგარი გამოიყენება ხსნარებში მყარი, თხევადი და აირადი ნივთიერებების თანაბარი განაწილებისათვის (ჰომოგენიზაციიისათვის).', 'The equipment is used for the uniform distribution of solid, liquid, and gaseous substances in solutions (homogenization).', 'ლაბორატორიული კორპუსი, ოთახი 216', 'Laboratory Building, Room 216', 8)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('STA 2500 Regulus. Simultaneous Thermal Analysis', 'STA 2500 Regulus. Simultaneous Thermal Analysis', 'თერმული ანალიზატორი მაღალი გარჩევადობის მონიტორით.', 'Thermal analyzer with a high-resolution monitor.', 'ლაბორატორიული კორპუსი, ოთახი 116', 'Laboratory Building, Room 116', 9)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('კოროზიის გამზომი უჯრედი ეტალონური ელექტროდებით', 'Corrosion Measuring Cell with Reference Electrodes', 'უჯრედი გამოიყენება ლითონთა კოროზიისა და სხვა ელექტროქიმიური პროცესების შესასწავლად.', 'The cell is used to study the corrosion of metals and other electrochemical processes.', 'ლაბორატორიული კორპუსი, ოთახი 207', 'Laboratory Building, Room 207', 10)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('პოტენციოსტატი - ელექტროქიმიური ანალიზატორი ch instruments CHI 660F , CHI 1140', 'Potentiostat - Electrochemical Analyzer CH Instruments CHI 660F, CHI 1140', 'პოტენციოსტატი - ციკლური და ხაზობრივი ვოლტამპერომეტრიული გაზომვები, ღია წრედის პოტენციალის გაზომვა, ქრონოპოტენციომეტრია, ქრონოამპერომეტრია.', 'Potentiostat - cyclic and linear voltametric measurements, open circuit potential measurement, chronopotentiometry, chronoamperometry.', 'ლაბორატორიული კორპუსი, ოთახი 207 / ოთახი 307', 'Laboratory Building, Room 207 / Room 307', 11)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('დერივატოფგრაფი- Derivatograph-Q 1500D C15', 'Derivatograph - Derivatograph-Q 1500D C15', 'ხელსაწყო გამოიყენება თერმიული (DTA) და თერმოგრავიმეტრული (DTG) ანალიზისთვის. იგი ზომავს ერთდროულად ტემპერატურას (T), მასის ცვლილებას (TG), მასის ცვლილების სიჩქარეს (DTG) და სითბოშემცველობის ცვლილებას (DTA). ხელსაწყოზე მიღებული დერევატოგრამის მიხედვით, შესაძლებელია ნივთიერებათა ნარევებში მიმდინარე პროცესების შესწავლა ნიმუშის გახურევისას 20 - 1000÷1500C ტემპერატორულ ინტერვალში, ამ პროცესების თერმიული ეფექტის განსაზღვრა. ხელსაწყო იძლევა აგრეთვე ჰიგროსკოპული და საკრისტალიზაციო წყლის განსაზღვრის საშუალებას ნიმუშში.', 'The instrument is used for thermal (DTA) and thermogravimetric (DTG) analysis. It simultaneously measures temperature (T), mass change (TG), rate of mass change (DTG), and heat content change (DTA).', 'ლაბორატორიული კორპუსი, ოთახი 116', 'Laboratory Building, Room 116', 12)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('სინჯის დაშლის მიკროტალღური სისტემა Microwave Digestion System MDS-6G', 'Microwave Digestion System MDS-6G', 'გამოიყენება მყარი ნიმუშების ხსნარში გადასაყვანად ატომურ აბსორბციული სპექტრული ანალიზისათვის. მიკროტალღური გადამამუშავებელი ხელსაწყო MDS-6G გამოიყენება ერთდროულად რამოდენიმე ნივთიერების ხსნარის დასამზადებლად. ხელსაწყო ამცირებს ხსნარების მომზადების დროს, აადვილებს ძნელად ხსნადი ნივთიერებების გახსნას და ზოგავს გამხსნელის ხარჯს.', 'Used to dissolve solid samples for atomic absorption spectral analysis.', 'ლაბორატორიული კორპუსი, ოთახი 106', 'Laboratory Building, Room 106', 13)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('ინფრა-წითელი სპექტროფოტომეტრი Tensor II - Bruker FT-IR spectrometer TENZOR II', 'Infrared Spectrophotometer Tensor II - Bruker FT-IR spectrometer TENZOR II', 'ხელსაწყო გამოიყენება ნივთიერების აღნაგობის შესასწავლად, მასში ფუნქციონალური ჯგუფების აღმოსაჩენად, ცნობილი და უცნობი ნივთიერების იდენტობის დასადგენად, აგრეთვე სუფთა ნივთიერებაში მინარევების აღმოსაჩენად. მოლეკულათშორისი და შიდამოლეკულური ურთიერთქმედების დასადგენად, წყალბადური ბმის აღმოსაჩენად და სხვა.', 'The device is used to study the structure of a substance, discover functional groups in it, determine the identity of known and unknown substances, as well as discover impurities in pure substances.', 'ლაბორატორიული კორპუსი, ოთახი 106', 'Laboratory Building, Room 106', 14)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('რენტგენული დიფრაქტომეტრი ДРОН- 3М', 'X-ray Diffractometer DRON-3M', 'ხელსაწყო გამოიყენება კრისტალური ნივთიერებების (მყარი ფხვნილების) შესწავლისთვის, მათში შემავალი ინდივიდუალური ნივთიერებების იდენტიფიკაციისათვის და ნივთიერებათა კრისტალოგრაფიული მახასიათებლების დასადგენად. იმ შემთხვევაშიც კი როდესაც მიღებული რენტგენოგრამის ანალოგი არ იძებნება სტანდარტული რენტგენოგრამების ცნობარებში, ახალი ნივთიერების რენტგენოგრამები მათი სერიულობის შემთხვევაში შეიძლება გამოყენებული იქნეს ამ ნივთიერების ე.წ. „პასპორტად“ მათი შემდგომი ამოცნობისთვის. ხელსაწყოზე მიღებული რენტგენოგრამები იძლევა აგრეთვე კრისტალური ნივთიერებების დისპერსულობის ხარისხის შეფასების საშუალებას.', 'The instrument is used for studying crystalline substances (solid powders), identifying individual substances contained in them, and determining crystallographic characteristics.', 'ლაბორატორიული კორპუსი, ოთახი 113', 'Laboratory Building, Room 113', 15)
ON CONFLICT DO NOTHING;
INSERT INTO public.infrastructure_items (name_ka, name_en, description_ka, description_en, location_ka, location_en, order_index)
VALUES ('Micromeritics Gemini VII 2390T', 'Micromeritics Gemini VII 2390T', 'Micromeritics Gemini VII 2390T არის მაღალგანვითარებული ზედაპირის ფართობის ანალიზატორი, რომელიც ცნობილია თავისი სიჩქარით, სიზუსტითა და საიმედოობით. Gemini VII 2390T მოდელის საშუალებით შესაძლებელია მყარი მასალების ფიზიკურ-ქიმიური მახასიათებლების, კერძოდ BET და Langmuir ზედაპირების, მიკროფორების ფართობებისა და მოცულობების განსაზღვრა, ასევე, ადსორბცია-დესორბციის იზოთერმისა და ფორების ზომის განაწილების სრული გაზომვები, აზოტის კაპილარული კონდენსაციის მეთოდით.', 'The Micromeritics Gemini VII 2390T is a highly advanced surface area analyzer known for its speed, accuracy, and reliability. The Gemini VII 2390T model allows the determination of physicochemical properties of solid materials, including BET and Langmuir surface areas, micropore areas and volumes, as well as complete measurements of adsorption-desorption isotherms and pore size distributions using the nitrogen capillary condensation method.', 'ტექნოპარკი', 'Techno Park', 16)
ON CONFLICT DO NOTHING;

-- 5. Conference 2026 Registrations Table
CREATE TABLE IF NOT EXISTS public.conference_registrations_2026 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    abstract_number TEXT UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date DATE,
    citizenship TEXT NOT NULL,
    affiliation TEXT NOT NULL,
    titulation TEXT NOT NULL,
    gender TEXT NOT NULL,
    email TEXT NOT NULL,
    is_attending_in_person BOOLEAN NOT NULL DEFAULT TRUE,
    presentation_title TEXT NOT NULL,
    co_authors TEXT,
    presentation_type TEXT NOT NULL,
    participation_role TEXT NOT NULL,
    thematic_topic TEXT NOT NULL,
    abstract_file_geo_url TEXT,
    abstract_file_eng_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.conference_registrations_2026 ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_conf_email ON public.conference_registrations_2026(email);
CREATE INDEX IF NOT EXISTS idx_conf_topic ON public.conference_registrations_2026(thematic_topic);

-- Automatic Abstract Number Sequence & Trigger
CREATE SEQUENCE IF NOT EXISTS public.abstract_seq_2026 START 1;

CREATE OR REPLACE FUNCTION public.generate_abstract_number_2026()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.abstract_number IS NULL OR NEW.abstract_number = '' THEN
        NEW.abstract_number := 'IICE-2026-' || LPAD(nextval('public.abstract_seq_2026')::TEXT, 3, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_abstract_number ON public.conference_registrations_2026;
CREATE TRIGGER trigger_generate_abstract_number
BEFORE INSERT ON public.conference_registrations_2026
FOR EACH ROW EXECUTE FUNCTION public.generate_abstract_number_2026();

-- 6. User Profiles & Google Auth RBAC (Multi-Role Support)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'pending', -- primary/legacy role
    roles TEXT[] DEFAULT '{pending}', -- 'super_admin', 'admin', 'editor', 'department_head', 'conference_manager', 'pending'
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL, -- for department_head role
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Ensure columns exist if table was already created
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS roles TEXT[] DEFAULT '{pending}';
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    is_super BOOLEAN;
BEGIN
    is_super := (LOWER(NEW.email) = 'tokolejo@gmail.com');

    INSERT INTO public.user_profiles (id, email, full_name, role, roles)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
        CASE WHEN is_super THEN 'super_admin' ELSE 'pending' END,
        CASE WHEN is_super THEN ARRAY['super_admin']::TEXT[] ELSE ARRAY['pending']::TEXT[] END
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        role = CASE WHEN is_super THEN 'super_admin' ELSE public.user_profiles.role END,
        roles = CASE WHEN is_super THEN ARRAY['super_admin']::TEXT[] ELSE public.user_profiles.roles END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Retroactively sync any users who already signed in before running this script
INSERT INTO public.user_profiles (id, email, full_name, role, roles)
SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', email),
    CASE WHEN LOWER(email) = 'tokolejo@gmail.com' THEN 'super_admin' ELSE 'pending' END,
    CASE WHEN LOWER(email) = 'tokolejo@gmail.com' THEN ARRAY['super_admin']::TEXT[] ELSE ARRAY['pending']::TEXT[] END
FROM auth.users
ON CONFLICT (id) DO UPDATE 
SET role = CASE WHEN LOWER(EXCLUDED.email) = 'tokolejo@gmail.com' THEN 'super_admin' ELSE public.user_profiles.role END,
    roles = CASE WHEN LOWER(EXCLUDED.email) = 'tokolejo@gmail.com' THEN ARRAY['super_admin']::TEXT[] ELSE public.user_profiles.roles END;

-- 7. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 8. Storage Buckets Setup
INSERT INTO storage.buckets (id, name, public) VALUES 
('conference-abstracts', 'conference-abstracts', true),
('staff-avatars', 'staff-avatars', true),
('staff-documents', 'staff-documents', true),
('news-media', 'news-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for Public Uploads & Reads
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
CREATE POLICY "Public Upload Access" ON storage.objects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Access" ON storage.objects;
CREATE POLICY "Public Update Access" ON storage.objects FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Delete Access" ON storage.objects;
CREATE POLICY "Public Delete Access" ON storage.objects FOR DELETE USING (true);

-- 9. Row Level Security (RLS) Configuration
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.infrastructure_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conference_registrations_2026 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent duplication errors
DROP POLICY IF EXISTS "Departments are viewable by everyone" ON public.departments;
DROP POLICY IF EXISTS "Staff members are viewable by everyone" ON public.staff_members;
DROP POLICY IF EXISTS "News are viewable by everyone" ON public.news;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.news_categories;
DROP POLICY IF EXISTS "Infrastructure viewable by everyone" ON public.infrastructure_items;
DROP POLICY IF EXISTS "Conference registration insertable by everyone" ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff_members;
DROP POLICY IF EXISTS "Admins can manage departments" ON public.departments;
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;
DROP POLICY IF EXISTS "Admins can manage infrastructure" ON public.infrastructure_items;
DROP POLICY IF EXISTS "Admins can manage conference registrations" ON public.conference_registrations_2026;
DROP POLICY IF EXISTS "Admins can view user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;

-- Public read policies
CREATE POLICY "Departments are viewable by everyone" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Staff members are viewable by everyone" ON public.staff_members FOR SELECT USING (true);
CREATE POLICY "News are viewable by everyone" ON public.news FOR SELECT USING (true);
CREATE POLICY "Categories are viewable by everyone" ON public.news_categories FOR SELECT USING (true);
CREATE POLICY "Infrastructure viewable by everyone" ON public.infrastructure_items FOR SELECT USING (true);
CREATE POLICY "Conference registration insertable by everyone" ON public.conference_registrations_2026 FOR INSERT WITH CHECK (true);

-- Authenticated admins can manage data
CREATE POLICY "Admins can manage staff" ON public.staff_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage infrastructure" ON public.infrastructure_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage conference registrations" ON public.conference_registrations_2026 FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can view user profiles" ON public.user_profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
