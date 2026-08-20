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
        } else {
            // Check browser language
            const browserLang = typeof navigator !== 'undefined' ? (navigator.language || navigator.userLanguage) : null;
            if (browserLang) {
                const isGeorgian = browserLang.toLowerCase().startsWith('ka');
                const defaultLang = isGeorgian ? 'ka' : 'en';
                setLanguage(defaultLang);
                localStorage.setItem('iice-lang', defaultLang);
            }
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
