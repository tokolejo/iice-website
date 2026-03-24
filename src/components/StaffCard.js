'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import en from '../locales/en';
import ka from '../locales/ka';
import { User } from 'lucide-react';

export default function StaffCard({ member }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);
    const { language } = useLanguage();
    const t = language === 'en' ? en : ka;

    const displayName = language === 'en' && member.nameEn ? member.nameEn : member.name;
    const displayRole = language === 'en' && member.roleEn ? member.roleEn : member.role;

    return (
        <div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col h-full animate-fade-in-up"
            onClick={() => member.onOpenModal(member)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card Image Container (ALWAYS exists to maintain exact grid height/style) */}
            <div className="aspect-square relative bg-gradient-to-br from-slate-50 to-purple-50/40 flex items-center justify-center overflow-hidden flex-shrink-0">
                {member.isHead && (
                    <div className="absolute top-3 left-3 bg-[#AD49E1] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-20 animate-fade-in-up uppercase tracking-wider">
                        {t.departments.headOfDepartment}
                    </div>
                )}
                
                {member.imageUrl && member.imageUrl !== '' && !imgError ? (
                    <img
                        src={member.imageUrl?.startsWith('/') ? `/iice-website${member.imageUrl}` : member.imageUrl}
                        alt={displayName}
                        className={`w-full h-full object-contain scale-[0.85] transition-transform duration-500 ease-out z-0 ${isHovered ? 'scale-[0.9]' : 'scale-[0.85]'}`}
                        onError={(e) => {
                            setImgError(true);
                        }}
                    />
                ) : (
                    <div className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-out z-0 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                        <div className="bg-white p-4 rounded-full shadow-sm border border-purple-100/50">
                            <User size={48} className="text-[#60318e] opacity-30" strokeWidth={1.5} />
                        </div>
                    </div>
                )}
                
                <div className={`absolute inset-0 bg-[#AD49E1] transition-opacity duration-300 z-10 pointer-events-none ${isHovered ? 'opacity-10' : 'opacity-0'}`}></div>
            </div>

            <div className="p-3 md:p-5 flex-grow flex flex-col bg-white z-10">
                <h3 className="text-sm md:text-base font-bold text-[#60318e] mb-1 group-hover:text-[#AD49E1] transition-colors line-clamp-2">{displayName}</h3>
                <p className="text-xs md:text-sm font-medium text-gray-800 mb-2 line-clamp-2">{displayRole}</p>

                <div className={`mt-auto pt-3 md:pt-4 flex items-center text-[10px] md:text-xs font-extrabold text-[#AD49E1] transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                    <span>{t.common.viewProfile}</span>
                    <svg className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
