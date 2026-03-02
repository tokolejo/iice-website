'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ka'); // Default is Georgian

    useEffect(() => {
        // Check local storage for saved preference on mount
        const savedLang = localStorage.getItem('iice-lang');
        if (savedLang) {
            setLanguage(savedLang);
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
