import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  welcomeTitle: {
    en: 'Smart Connected Rural Healthcare',
    hi: 'स्मार्ट कनेक्टेड ग्रामीण स्वास्थ्य सेवा'
  },
  welcomeDescription: {
    en: 'Bringing quality healthcare services to rural communities through innovative technology and telemedicine solutions.',
    hi: 'नवीन तकनीक और टेलीमेडिसिन समाधानों के माध्यम से ग्रामीण समुदायों को गुणवत्तापूर्ण स्वास्थ्य सेवाएं प्रदान करना।'
  },
  getStarted: {
    en: 'Get Started',
    hi: 'शुरू करें'
  },
  telemedicine: {
    en: 'Telemedicine',
    hi: 'टेलीमेडिसिन'
  },
  telemedicineDescription: {
    en: 'Access healthcare professionals remotely through video consultations',
    hi: 'वीडियो परामर्श के माध्यम से दूर से स्वास्थ्य सेवा विशेषज्ञों से संपर्क करें'
  },
  emergencySupport: {
    en: 'Emergency Support',
    hi: 'आपातकालीन सहायता'
  },
  emergencySupportDescription: {
    en: 'Quick access to emergency services and immediate medical assistance',
    hi: 'आपातकालीन सेवाओं और तत्काल चिकित्सा सहायता तक त्वरित पहुंच'
  },
  mentalHealth: {
    en: 'Mental Health',
    hi: 'मानसिक स्वास्थ्य'
  },
  mentalHealthDescription: {
    en: 'Professional mental health support and counseling services',
    hi: 'पेशेवर मानसिक स्वास्थ्य सहायता और परामर्श सेवाएं'
  },
  admin: {
    en: 'Admin',
    hi: 'प्रशासन'
  },
  patientsServed: {
    en: 'Patients Served',
    hi: 'सेवित मरीज'
  },
  healthcareProviders: {
    en: 'Healthcare Providers',
    hi: 'स्वास्थ्य सेवा प्रदाता'
  },
  emergencySupportTime: {
    en: 'Emergency Support',
    hi: 'आपातकालीन सहायता'
  },
  satisfactionRate: {
    en: 'Satisfaction Rate',
    hi: 'संतुष्टि दर'
  }
};

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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