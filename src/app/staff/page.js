'use client';

import { useState, useMemo } from 'react';
import Head from 'next/head';
import { staffData, departmentsData } from '../../data';
import StaffCard from '../../components/StaffCard';
import StaffModal from '../../components/StaffModal';
import { useLanguage } from '../../context/LanguageContext';
import en from '../../locales/en';
import ka from '../../locales/ka';

export default function StaffDirectory() {
    const { language } = useLanguage();
    const isEn = language === 'en';
    const t = isEn ? en : ka;

    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('All');

    const handleOpenModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300);
    };

    const filteredStaff = useMemo(() => {
        return staffData.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (member.nameEn && member.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesDept = filterDepartment === 'All' || member.departmentId === filterDepartment;
            return matchesSearch && matchesDept;
        });
    }, [searchQuery, filterDepartment]);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Head>
                <title>{isEn ? 'Staff Directory | IICE' : 'თანამშრომლები | IICE'}</title>
            </Head>

            <div className="bg-white border-b border-slate-100 py-8 md:py-10 mb-3 animate-fade-in-up text-center">
                <h1 className="text-xl md:text-2xl font-extrabold text-[#60318e] uppercase tracking-wider">
                    {t.nav.staffDirectory}
                </h1>
            </div>

            <div className="flex-grow max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="focus:ring-[#AD49E1] focus:border-[#AD49E1] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                                placeholder={isEn ? "Search staff by name..." : "მოძებნეთ თანამშრომელი სახელით..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="md:w-64">
                        <select
                            className="mt-1 block w-full pl-3 pr-10 py-3 text-sm border-gray-300 focus:outline-none focus:ring-[#AD49E1] focus:border-[#AD49E1] sm:text-sm rounded-md border"
                            value={filterDepartment}
                            onChange={(e) => setFilterDepartment(e.target.value)}
                        >
                            <option value="All">{isEn ? 'All Departments' : 'ყველა განყოფილება'}</option>
                            {departmentsData.map(dept => (
                                <option key={dept.id} value={dept.id}>{isEn && dept.nameEn ? dept.nameEn : dept.name}</option>
                            ))}
                            <option value="administration">{isEn ? 'Administration' : 'ადმინისტრაცია'}</option>
                        </select>
                    </div>
                </div>

                {/* Directory Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredStaff.length > 0 ? (
                        filteredStaff.map(member => (
                            <StaffCard
                                key={member.id}
                                member={{ ...member, onOpenModal: handleOpenModal }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500 font-medium">
                            {isEn ? 'No staff members found matching your criteria.' : 'თქვენი ძიების მიხედვით თანამშრომლები ვერ მოიძებნა.'}
                        </div>
                    )}
                </div>
            </div>

            <StaffModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                member={selectedMember}
            />
        </div>
    );
}
