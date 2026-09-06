'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ka'); // Default is Georgian

    useEffect(() => {
        // Strict Georgian ('ka') default when site loads
        const savedLang = localStorage.getItem('iice-lang');
        if (savedLang === 'en' || savedLang === 'ka') {
            setLanguage(savedLang);
        } else {
            setLanguage('ka');
            localStorage.setItem('iice-lang', 'ka');
        }
    }, []);

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('iice-lang', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
