import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import cn from './locales/cn.json'; 
import de from './locales/de.json'; 
import ru from './locales/ru.json'; 
import gb from './locales/gb.json';

// Setup i18next configuration
i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
      cn: { translation: cn },
      ru: { translation: ru },
      'en-GB': { translation: gb },
    },
    lng: Localization.getLocales()[0].languageTag || en, 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
