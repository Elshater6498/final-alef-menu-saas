import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { ar } from "./Lang/AR";
import { en } from "./Lang/EN";

const resources = { en, ar };

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: "customDetector",
  lookup() {
    const cachedLang = localStorage.getItem("i18nextLng");
    return cachedLang || "ar";
  },
  cacheUserLanguage(lng) {
    localStorage.setItem("i18nextLng", lng);
  },
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ar",
    supportedLngs: ["ar", "en"],
    detection: {
      order: ["customDetector", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n
