'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StaffModal from '../../components/StaffModal';

export default function AdministrationPage() {
    const { language } = useLanguage();
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const adminData = [
        {
            roleKa: 'დირექტორი',
            roleEn: 'Director',
            nameKa: 'გრიგორ ტატიშვილი',
            nameEn: 'Grigor Tatishvili',
            degreeKa: 'საქართველოს მეცნიერებათა ეროვნული აკადემიის წევრ-კორესპონდენტი',
            degreeEn: 'Corresponding Member of the Georgian National Academy of Sciences',
            email: 'g.tatishvili@iice.ge',
            image: '/staff/high-energy-chemistry/tatishvili-pic.jpg'
        },
        {
            roleKa: 'დირექტორის მოადგილე',
            roleEn: 'Deputy Director',
            nameKa: 'თინათინ ლეჟავა',
            nameEn: 'Tinatin Lezhava',
            degreeKa: 'ტექნიკურ მეცნიერებათა კანდიდატი / აკადემიური დოქტორი',
            degreeEn: 'Candidate of Technical Sciences / Academic Doctor',
            email: 'tinatin.lezhava@tsu.ge',
            image: '/staff/applied-chemistry/lezhava-pic.png'
        },
        {
            roleKa: 'სწავლული მდივანი',
            roleEn: 'Scientific Secretary',
            nameKa: 'ნათელა ანანიაშვილი',
            nameEn: 'Natela Ananiashvili',
            degreeKa: 'ქიმიის მეცნიერებათა კანდიდატი / აკადემიური დოქტორი',
            degreeEn: 'Candidate of Chemical Sciences / Academic Doctor',
            email: 'natela.ananiashvili@tsu.ge',
            image: null
        },
        {
            roleKa: 'მენეჯერი (საგარეო ურთ.)',
            roleEn: 'Manager (Foreign Relations)',
            nameKa: 'ლელა კვინიკაძე',
            nameEn: 'Lela Kvinikadze',
            degreeKa: 'ქიმიის მეცნიერებათა კანდიდატი / აკადემიური დოქტორი',
            degreeEn: 'Candidate of Chemical Sciences / Academic Doctor',
            email: 'lela.kvinikadze@tsu.ge',
            image: '/staff/phys-chem-analysis/kvinikadze-pic.jpg'
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-16 mb-8 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-wider">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#60318e] leading-tight mb-4">
                        {language === 'en' ? 'Administration' : 'ადმინისტრაცია'}
                    </h1>
                    <p className="text-sm md:text-sm text-[#60318e]/70 max-w-2xl mx-auto font-medium">
                        {language === 'en'
                            ? 'The administrative and management team of the institute.'
                            : 'ინსტიტუტის ადმინისტრაციული და მმართველი გუნდი.'}
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover-scale-group">
                    {adminData.map((admin, index) => {
                        const role = language === 'en' ? admin.roleEn : admin.roleKa;
                        const name = language === 'en' ? admin.nameEn : admin.nameKa;
                        const degree = language === 'en' ? admin.degreeEn : admin.degreeKa;

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedAdmin(admin)}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-[#AD49E1] transition-all duration-300 flex flex-col items-center text-center h-full group cursor-pointer"
                            >

                                {/* Future Avatar Placeholder */}
                                <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 border-4 border-white shadow-md relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    {admin.image ? (
                                        <img src={admin.image?.startsWith('/') ? `/iice-website${admin.image}` : admin.image} alt={name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-purple-50 flex items-center justify-center text-[#AD49E1]">
                                            {/* Generic user icon */}
                                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Role Badge */}
                                <div className="inline-block bg-purple-50 text-[#AD49E1] text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-purple-100 shadow-sm">
                                    {role}
                                </div>

                                {/* Name */}
                                <h3 className="text-base font-extrabold text-gray-900 mb-2 group-hover:text-[#AD49E1] transition-colors leading-tight">
                                    {name}
                                </h3>

                                {/* Degree */}
                                <p className="text-gray-500 text-xs md:text-sm mb-6 flex-grow leading-relaxed">
                                    {degree}
                                </p>

                                {/* Email Button */}
                                <a
                                    href={`mailto:${admin.email}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="mt-auto w-full flex items-center justify-center gap-2 bg-white border-2 border-[#AD49E1] text-[#AD49E1] hover:bg-[#AD49E1] hover:text-white font-bold py-2.5 px-4 rounded-full transition-all duration-300 text-xs md:text-sm group-hover:shadow-md"
                                >
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="truncate">{admin.email}</span>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            <StaffModal
                isOpen={!!selectedAdmin}
                onClose={() => setSelectedAdmin(null)}
                member={selectedAdmin ? {
                    name: language === 'en' ? selectedAdmin.nameEn : selectedAdmin.nameKa,
                    role: language === 'en' ? selectedAdmin.roleEn : selectedAdmin.roleKa,
                    department: language === 'en' ? selectedAdmin.degreeEn : selectedAdmin.degreeKa,
                    imageUrl: selectedAdmin.image,
                    emails: [selectedAdmin.email],
                    links: []
                } : null}
            />
        </div>
    );
}
