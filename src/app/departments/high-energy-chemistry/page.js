'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { departmentsData, staffData } from '../../../data';
import StaffCard from '../../../components/StaffCard';
import StaffModal from '../../../components/StaffModal';
import { useLanguage } from '../../../context/LanguageContext';
import en from '../../../locales/en';
import ka from '../../../locales/ka';

export default function HighEnergyChemistry() {
    const departmentId = 'high-energy-chemistry';
    const department = departmentsData.find(d => d.id === departmentId);
    const staff = staffData.filter(s => s.departmentId === departmentId);
    const headOfDepartment = staff.find(s => s.isHead);
    const otherStaff = staff.filter(s => !s.isHead);

    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;

    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [showAllStaff, setShowAllStaff] = useState(false);
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(otherStaff.length / itemsPerPage);
    const displayedStaff = showAllStaff ? otherStaff : otherStaff.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(p => p + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(p => p - 1);
    };

    const displayName = language === 'en' ? department?.nameEn : department?.name;

    if (!department) return <div>Department not found</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-16">

            {/* Compact Header */}
            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
                    <h1 className="text-xl md:text-3xl font-extrabold text-[#60318e] leading-tight uppercase tracking-wider">
                        {displayName}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up mt-3" style={{ animationDelay: '0.1s' }}>

                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    {/* Description Section */}
                    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 lg:w-2/3 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 opacity-5 w-48 h-48 bg-[#AD49E1] rounded-full z-0"></div>
                        <div className="relative z-10 flex gap-4 items-start">
                            <div className="w-12 h-12 bg-[#EBD3F8]/30 text-[#AD49E1] rounded-xl flex items-center justify-center shrink-0 border border-purple-100 mt-1">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed font-medium text-left md:text-justify w-full break-words hyphens-auto">
                                {language === 'en' ? department.descriptionEn : (
                                    <>
                                        <p className="mb-4">
                                            განყოფილებაში გაერთიანებულია რადიაციული ქიმიის და თერმოქიმიური კვლევების ლაბორატორიები. რადიაციული ქიმიის მიმართულებით (პასუხისმგებელი - გ.ტატიშვილი) შეისწავლება მაიონიზებელი და მომიჯნავე პროცესების ზეგავლენა ქიმიურ და ბიოლოგიურ ობიექტებზე და მუშავდება კომბინირებული ტექნოლოგიური მეთოდები სხვადასხვა ეკოსისტემების დასაცავად მომწამლავი ნივთიერებებისგან, მავნე მიკროორგანიზმების.
                                        </p>
                                        {isDescExpanded && (
                                            <div className="animate-fade-in-up mt-4 space-y-4">
                                                <p>ასევე წარმოებს კვლევები ეკოსისტემების რადიაციული უსაფრთხოების ხელშესაწყობად, რაც ითვალისწინებს რადიაციული და მომიჯნავე ტექნოლოგიების აპლიკაციების შექმნა/მოდიფიცირებას და შესაბამისი თეორიული გათვლების უზრუნველყოფას.</p>
                                                <p>თერმოქიმიის მიმართულებით (პასუხისმგებელი - მ.ხუნდაძე) კვლევები ითვალისწინებს ეფექტური თვისებების მქონე მრავალკომპონენტიანი ოქსიდური მასალების მიზანმიმართულ ძიებას და მათი მიღებისთვის ოპტიმალური ტექნოლოგიური პროცესების შემუშავებას, საბაზისო ოქსიდური სისტემების თერმოდინამიკური და თერმოფიზიკური თვისებების შესწავლით. ლაბორატორიაში, საკუთარი გაზომვებით მიღებული და, აგრეთვე, ლიტერატურული მონაცემების საფუძველზე, შექმნილია რთული ოქსიდების საბაზისო თერმოდინამიკური პარამეტრების ელექტრონული, უწყვეტად განახლებადი ბანკი.</p>
                                                <p>ლაბორატორიაში მნიშვნელოვანი ადგილი ეთმობა საკვლევი კომპოზიციებისათვის დამახასიათებელ სტრუქტურულ, მაგნიტურ, ელექტრულ და სხვა სახის ფაზური გარდაქმნების და ანომალიების გამოვლენას და მათ ენერგეტიკულ დახასიათებას, აგრეთვე თერმულ მახასიათებლებზე ნანოსტრუქტურული მდგომარეობის გავლენის ასახვას. მიღებული მონაცემების ერთობლიობა ქმნის შესაძლებლობას, რომ მიზანმიმართულად შევარჩიოთ კომპოზიციური ცვლილებები და ენერგოდამზოგავი ტექნილოგიური პროცესები.</p>
                                            </div>
                                        )}
                                        <div className="flex justify-center mt-6">
                                            <button
                                                onClick={() => setIsDescExpanded(!isDescExpanded)}
                                                className="border-2 border-primary text-primary px-6 py-2 rounded-full text-sm font-bold uppercase transition-colors hover:bg-primary hover:text-white"
                                            >
                                                {isDescExpanded ? 'აკეცვა ↑' : 'მეტის წაკითხვა ↓'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Head of Department */}
                    {headOfDepartment && (
                        <section className="lg:w-1/3 max-w-sm mx-auto">
                            <StaffCard
                                member={{ ...headOfDepartment, onOpenModal: (m) => { setSelectedMember(m); setIsModalOpen(true); } }}
                            />
                        </section>
                    )}
                </div>

                {/* Other Staff */}
                {otherStaff.length > 0 && (
                    <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                                    {t.departments.staffCount}
                                </h3>
                                <div className="bg-purple-100 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                    {otherStaff.length}
                                </div>
                            </div>

                            {/* Pagination Controls */}
                            {!showAllStaff && totalPages > 1 && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 0}
                                        className={`p-2 rounded-full border border-gray-200 transition-colors ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'text-primary hover:bg-purple-50 hover:border-purple-200'}`}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="text-xs md:text-sm font-medium text-gray-500 px-1 md:px-2 flex items-center gap-1">
                                        <span className="text-gray-900">{currentPage + 1}</span>
                                        <span>/</span>
                                        <span>{totalPages}</span>
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages - 1}
                                        className={`p-2 rounded-full border border-gray-200 transition-colors ${currentPage === totalPages - 1 ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'text-primary hover:bg-purple-50 hover:border-purple-200'}`}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10 transition-all duration-500 ${showAllStaff ? 'animate-fade-in-up' : ''}`}>
                            {displayedStaff.map(member => (
                                <StaffCard
                                    key={member.id}
                                    member={{ ...member, onOpenModal: (m) => { setSelectedMember(m); setIsModalOpen(true); } }}
                                />
                            ))}
                        </div>

                        {/* View All Staff Button */}
                        <div className="flex justify-center border-t border-gray-200 pt-8 mt-4">
                            <button
                                onClick={() => setShowAllStaff(!showAllStaff)}
                                className="flex items-center gap-2 bg-white border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all shadow-sm group"
                            >
                                <Users size={20} className="group-hover:scale-110 transition-transform" />
                                {language === 'en'
                                    ? (showAllStaff ? 'Collapse ↑' : 'View All Staff ↓')
                                    : (showAllStaff ? 'აკეცვა ↑' : 'ყველა თანამშრომლის ნახვა ↓')}
                            </button>
                        </div>
                    </section>
                )}
            </div>

            <StaffModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setTimeout(() => setSelectedMember(null), 300); }}
                member={selectedMember}
            />
        </div>
    );
}
