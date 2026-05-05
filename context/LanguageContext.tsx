'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize state directly from localStorage/navigator to avoid cascading renders
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('portfolio-lang') as Language;
      if (savedLang && (savedLang === 'fr' || savedLang === 'en')) return savedLang;
      
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0];
      return (browserLang === 'en' || browserLang === 'fr') ? (browserLang as Language) : 'fr';
    }
    return 'fr';
  });

  // Sync HTML lang attribute with the current language
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('portfolio-lang', newLang);
  };

  const toggleLanguage = () => {
    const newLang = lang === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
