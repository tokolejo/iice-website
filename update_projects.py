import os

page_path = r"c:\Users\tokol\OneDrive\Desktop\PROJECT\iice-website\src\app\important-projects\page.js"
with open(page_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

en_content = """<div className="space-y-8 text-slate-700 text-base leading-relaxed text-justify">
    <p className="text-base font-bold text-slate-900 border-l-4 border-l-[#663191] pl-4">
        Environmental and agricultural projects at the TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry
    </p>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">Within the framework of budgetary financing:</h5>
        <div className="space-y-4">
            <p>Over the past five years, the institute has been conducting a work cycle: "Obtaining sorbents with a developed surface by thermochemical conversion of plastics and cellulose-containing waste (nut and walnut shells, nectarine and peach pits, wood sawdust, etc.) in the form of carbonaceous powder materials and their applications: a) as sorbents - for cleaning drinking and wastewater from heavy metal ions and pharmaceutical waste; b) as dopants - for obtaining composite electrochemical coatings".</p>
            <p>In 2022-2023, the selectivity of the above-mentioned carbon materials towards heavy metals, namely Pb++, Cu++, Fe++, Co++, Cd++ - ions and the most widely used water-soluble pharmaceutical drugs (paracetamol, tetracycline), was determined.</p>
            <p>In 2023, the employees of the institute - Natela Ananiashvili, Manana Gachechiladze, Tamaz Marsagishvili, Marine Machavariani, Grigor Tatishvili and Elizaveta Tskhakaia - were awarded the “Giorgi Nikoladze Prize” in the field of chemical technology for the work cycle “Obtaining carbon materials from cellulose-containing waste and their applications”.</p>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">International scientific-technological - industrial realized projects:</h5>
        <div className="space-y-4">
            <p className="font-semibold">15/10/2011-15/10/2014 . "Hydrogen production from Black Sea water by sulfide-driven fuel cell". BS-ERA.NET Project within the EU - FP7.</p>
            <p>An investigation of the possibility of obtaining electricity from hydrogen sulfide in the Black Sea using a fuel cell was carried out in this work. The described process allows the removal of hydrogen sulfide, dissolved in seawater, from deep water and its use as a fuel. A laboratory and large-laboratory models of the fuel cell, which will work on the surface of water, are created for the first time in our work.</p>
            <p>One more advantage of this technology is that it has no harmful influence on environment. There is no influence on seawater, the balance is not disturbed. Instead of hydrogen sulfide, we return into the seawater a weak acid H2SO4, the composition of seawater is not changed, and no waste is formed.</p>

            <p className="font-semibold mt-6">08/06/2015 - 31/12/17. "Conduct experiments and development of the Waste-To-Energy Devices".</p>
            <p>The Project carried out within the Master Agreements between: Long Arc Technologies Corporation, NJ 07920, USA and N.P.L.E. Andronikashvili lnstitute of Physics-"ADVTEC" Advanced Technologies Center; N.P.L.E. Tsulukidze Mining Institute – “GEOMAT” Center of Advance Materials; and N.P.L.E. Rafael Agladze Institute of Inorganic Chemistry & Electrochemistry New Technology Center.</p>
            <p>In 2015-2017, the Institute developed laboratory-type and, afterwards, semi-production technology for secondary tire recycling by the direct investment of the USA private company – "Long Arc Technologies Corporation". The Institute developed carbon nano-material, so-called “black carbon”, which is highly demanded on the world market. By the co-authorship of the Institute staff (T. Marsagishvili, G. Tatishvili, A. Peikrishvili), this product obtained the USA patent: No 9663662, 05/30/2017, “System and method for tire conversion into carbon black, liquid and gaseous products”.</p>

            <p className="font-semibold mt-6">01/01/2018 - 30/06/2019. "Development of Scrap Tire Conversion Reactor and Carbon Black Enrichment System - Phase1".</p>
            <p>The partner project via the Science and Technology Center in Ukraine - STCU P#716: (partner organization: G3C Technologies -USA). Based on the obtained results, in the framework of STCU foundation, the Institute entered into a partnership project contract P#716: “Production of residual tire recycler reactor and development of black carbon enrichment technology – part #1” with the US private company G3C Technologies Corporation from January 1, 2018.</p>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">International contractual work:</h5>
        <div className="space-y-4">
            <p>In 2021–2022, by a contractual order of the international organization Neos Group, Inc. - EMEA located at Loft Offices Building 2, Suite 204, Dubai Media City, Dubai, United Arab Emirates, was implemented project: Research and development project in areas of utilizing green hydrogen technology for electricity generation, storage, transportation and distribution, [Contract numbers: NS-HYDR-2107, NS-HYDR-2108, NS-HYDR-2109].</p>
            <p>In 2023, this work was continued by including it in the Institute's annual plan and will continue in 2024. The goal is to achieve patentability of the developed technology.</p>
            <p>The project "Development of a methodology for determining alkalinity in seawater using environmentally safe electrochemical technology" was funded by Planetary Technology Inc., a Canadian company operating in climate change mitigation and clean energy production (Agreement No. 2023-01, 01.05.2023).</p>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">Scientific-technological - industrial realized projects within the public-private partnership:</h5>
        <div className="space-y-4">
            <p className="font-semibold">Filters from secondary carbonaceous material for water treatment.</p>
            <p>High-quality, cheap carbon sorbents were obtained by a technological method developed at the institute. The process is based on the invention, which provides sorbents with a developed surface in the form of carbonaceous powder material. Sorbents are obtained from plastic and cellulose-containing wastes during the thermo-chemical process by adding a cheap reagent. The resulting product has a low cost.</p>
            <p>A patent application (AP 2019 1503) is submitted to the National Patent Organization in order to protect this invention. The above mentioned carbonaceous sorbents were tested for the removal of heavy metals and decomposition products of radioactive substances from water. The results showed were promising.</p>
            <p>Our partner LLC “Service Administration Company” manufactured a filter obtained from carbon sorbents at the institute, which successfully passed tests in the water purification system of one of the branches of the "Evex" medical clinic in Tbilisi.</p>
            
            <p className="font-semibold mt-6">Ozone Generator "IICE-20".</p>
            <p>In the context of COVID-19 spread prevention and management, the Institute faced a new task, and consequently, the government has been presented with its own achievements in the field of disinfection using ozone: Research conducted in collaboration with the National Center for Disease Control and Public Health (NCDC) on the use of ozone for remediation of wastewater. A similar method was successfully experienced in practice at the National Center for Tuberculosis and Lung Disease (NCTBLD) in Tbilisi.</p>
            
            <p className="font-semibold mt-6">The Ozone Generator model developed at the Institute:</p>
            <p>The Institute has created an ozone generator with appropriate productivity (IICE-20 model) of universal design.</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>2.5-3.0 times cheaper than branded Ozonators of similar power in the consumer market;</li>
                <li>It is possible to go to different capacities;</li>
                <li>Easy to control the rate of ozone delivery in the reaction area;</li>
                <li>Allows the production of ozone-containing gases of the desired concentration;</li>
            </ul>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">International Projects of the Institute (Applied Chemistry Department):</h5>
        <div className="space-y-4">
            <p className="font-semibold">1. IICE – World Bank – GITA</p>
            <p>In 2019 – 2021, the Institute implemented a pilot technology transfer program... The developed innovative hydroelectrometallurgical technology was used to process unreduced and reduced manganese-containing oxide ores to obtain high-purity (≥99%) manganese sulfate monohydrate (HPMSM).</p>
            
            <p className="font-semibold mt-6">2. IICE - Planetary Technology Inc.</p>
            <p>In 2022-2023, our institute collaborated with the Canadian company Planetary Technology Inc., on whose behalf it implemented a decarbonization-related project: “Indirect Electrogeneration of Magnesium Hydroxide in Water Splitting Electrochemical Cell”.</p>
            
            <p className="font-semibold mt-6">3. IICE - Ourea Lithium Corp</p>
            <p>In October-December 2025, the Institute was involved in the implementation of the Ourea Lithium Corp (USA) project: “Electrochemical and Hydrometallurgical Recovery of Lithium from Lithium-Bearing Ores”.</p>
        </div>
    </div>
</div>"""

ge_content = """<div className="space-y-8 text-slate-700 text-base leading-relaxed text-justify">
    <p className="text-base font-bold text-slate-900 border-l-4 border-l-[#663191] pl-4">
        გარემოსდაცვითი და აგრარული მიმართულების პროექტების შესახებ თსუ რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტში
    </p>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">საბიუჯეტო დაფინანსების ფარგლებში:</h5>
        <div className="space-y-4">
            <p>უკანასკნელი ხუთი წლის განმავლობაში ინსტიტუტში მიმდინარეობს სამუშაოთა ციკლი:<br/>„პლასტმასებისა და ცელულოზის შემცველი ნარჩენების (თხილისა და კაკლის ნაჭუჭი, ნექტარინისა და ატმის კურკები, ხის ნახერხი და ა.შ.) თერმოქიმიური კონვერსიით  განვითარებული ზედაპირის მქონე სორბენტების მიღება ნახშირბადოვანი ფხვნილოვანი მასალების სახით და მათი აპლიკაციები: 
            ა) სორბენტებად - სასმელი და ჩამდინარე წყლების მძიმე მეტალების იონებისა და ფარმაცევტული ნარჩენებისაგან გასასუფთავებლად; 
            ბ) დოპინგებად - კომპოზიციური ელექტროქიმიური დანაფარების მიღებისთვის“.</p>
            <p>2022-2023 წლებში დადგენილი იქნა ზემოთ აღნიშნული ნახშირბადოვანი მასალების სელექტურობა მძიმე ლითონების, კერძოდ, Pb++, Cu++, Fe++,Co++, Cd++ - იონებისა და  წყალში ხსნადი ყველაზე ფართოდ მოხმარებადი ფარმაცევტული პრეპარატების (პარაცეტამოლი, ტეტრაციკლინი) მიმართ.</p>
            <p>2024 წელს გამოიცდება სელექტურობა სხვა დამაბინძურებლების (მიკრობიოლოგიური, ბიოგენური, ორგანული მინარევები)  მიმართ.</p>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">შოთა რუსთაველის ეროვნული სამეცნიერო ფონდის პროექტები:</h5>
        <div className="space-y-4">
            <p><span className="font-semibold tracking-wider text-slate-900">2021-2023 წწ. PHDF-21-268:</span> „მყარი ორგანული პოლიმერული ნარჩენებისაგან ალტერნატიული სორბენტების მიღების უნარჩენო პროცესის შემუშავება ქვეყანაში ცირკულარული ეკონომიკის განვითარების მიზნით“;</p>
            <p><span className="font-semibold tracking-wider text-slate-900">2022-2025 წწ. FR-21-12546:</span> „მყარი საყოფაცხოვრებო ნარჩენების პოლიგონზე  ნაჟური წყლების კომპლექსური გასუფთავების შესწავლა ნახშირბადოვანი ნანომასალის გამოყენებით ნარჩენების მართვის მდგრადი განვითარების ხელშეწყობის მიზნით“;</p>
            <p><span className="font-semibold tracking-wider text-slate-900">2023-2024 წწ. STEM-22-1751:</span> „ბუნებრივი პოლისაქარიდების საფუძველზე უსაფრთხო, ბიოდეგრადირებადი, უნივერსალური, ბიონანოკომპოზიტური ახალი თაობის მიკროსასუქების შემუშავება, მომავლის სოფლის მეურნეობის განვითარების მიზნით“.</p>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">საერთაშორისო ფონდების საგრანტო პროექტები:</h5>
        <div className="space-y-4">
            <p><span className="font-semibold text-slate-900">2021-დღემდე (გაგრძელდება 2024):</span> “მანგანუმის  ოქსიდური ნედლეულის გადამუშავება“ [ხელშეკრულებაGE-GITA-208861-NC-DIR]; პროექტი არის ტექნოლოგიების გადაცემის საპილოტე პროგრამის ფარგლებში(TTPP), რომელსაც ევროკავშირის დაფინანსებით ახორციელებს  მსოფლიოს ბანკი (WBG) და  საქართველოს ინოვაციებისა და ტექნოლოგიების სააგენტო (GITA).</p>
            <p><span className="font-semibold text-slate-900">2024 წლის კონკურსისთვის</span> საერთაშორისო სამეცნიერო ტექნოლოგიურ ცენტრში (ISTC) წარდგენილია პროექტი: #GE0009: „Development of sorbents for capturing carbon dioxide and catalysts for its utilization by methane into syngas“</p>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">საერთაშორისო კერძო დაკვეთები:</h5>
        <div className="space-y-4">
            <p>2021–2022 წლებში ინსტიტუტში განხორციელდა სამუშაო  საერთაშორისო ორგანიზაცია  Neos Group, Inc.- EMEA located at Loft Offices Building 2, Suite 204, Dubai Media City, Dubai, United Arab Emirates -ის დაკვეთით, მათი პროექტის:  Research and development project in areas of utilizing green hydrogen technology for electricity generation, storage, transportation and distribution („მწვანე წყალბადის ტექნოლოგიის გამოყენება ელექტროენერგიის წარმოების, შენახვის, ტრანსპორტირების და განაწილების სფეროში“), [კონტრაქტების ნომრები:: NS-HYDR-2107,. NS-HYDR-2108 NS-HYDR-2109].</p>
            <p>2023 წელს ამ სამუშაოს გაგრძელება  მოხდა ინსტიტუტის წლიურ გეგმაში მისი შეტანით და იგი გაგრძელდება 2024 წელსაც. მიზანია შემუშავებული ტექნოლოგიის პატენტუნარიანობის მიღწევა.</p>
        </div>
    </div>

    <div>
        <h5 className="text-[#663191] font-bold uppercase mb-4 border-b-2 border-b-[#663191] inline-block pb-1">კლიმატის ცვლილებების შემსუბუქებასთან დაკავშირებულ გადაწყვეტილებების მიღებასა და სუფთა ენერგიის გამომუშავებაში ოპერირებადი კანადური კომპანიის „Planetary Technologies, Inc” დაკვეთებით:</h5>
        <div className="space-y-4">
            <p>2022  წელს შესრულდა პროექტი - „მაგნიუმის ჰიდროქსიდის არაპირდაპირი გენერაცია წყლის დაშლის  ელექტროქიმიურ უჯრედში” [(DocuSign Envelope ID: 32AEBD2-95E6-43B7-AAA4-679833A1 AAFB];</p>
            <p>2023 წლის ივნისიდან მიმდინარეობს  პროექტი: „გაფართოებული ელექტროქიმიური კვლევა - წყლის ელექტროლიზის აბაზანის პროტოტიპი Mg(OH)2-ის მიღებისათვის“ (DocuSign Envelope ID: 91E8B108-FB5F-487B-8A4D-57C7925BA0AD). გაგრძელდება 2024 წელს.</p>
        </div>
    </div>
</div>"""

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "{openIndex === 1 && (" in line:
        start_idx = i
        break

for i in range(start_idx, len(lines)):
    if "</div>" in lines[i] and i > start_idx + 10:
        # We need to find the matching brackets accurately, but since it's hardcoded, let's just find the end of openIndex === 1 block.
        if ")}\n" in lines[i] or ")} " in lines[i]:
            pass

# the block is exactly between line 74 and line 131 in the original. Let's find:
# <div className="p-6 md:p-8 pt-0 border-t border-slate-100">
p_idx = -1
for i, line in enumerate(lines):
    if '<div className="p-6 md:p-8 pt-0 border-t border-slate-100">' in line:
        p_idx = i
        break

# and the closing div is before <div className="overflow-hidden"> closing, which is around 133
close_p_idx = -1
for i in range(p_idx+1, len(lines)):
    if "</div>" in lines[i] and "</div>" in lines[i+1] and ")} " in lines[i+2] or ")}\n" in lines[i+2]:
        close_p_idx = i
        break

if p_idx != -1 and close_p_idx != -1:
    new_content = [lines[j] for j in range(p_idx+1)]
    new_content.append(" " * 32 + "{isEn ? (\n")
    for l in en_content.split("\\n"):
        new_content.append(" " * 36 + l + "\\n")
    new_content.append(" " * 32 + ") : (\n")
    for l in ge_content.split("\\n"):
        new_content.append(" " * 36 + l + "\\n")
    new_content.append(" " * 32 + ")}\n")
    new_content.extend([lines[j] for j in range(close_p_idx, len(lines))])

    with open(page_path, "w", encoding="utf-8") as f:
        f.writelines(new_content)
    print("Successfully replaced.")
else:
    print(f"Failed to find boundary: p_idx={p_idx}, close_p_idx={close_p_idx}")
