// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import HttpBackend from "i18next-http-backend";

// i18n
//   .use(HttpBackend)
//   .use(initReactI18next)
//   .init({
//     backend: {
//       loadPath: "i18/locales/{{lng}}.json", // путь к вашим json-файлам
//     },
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import ua from "./locales/ua.json";
import en from "./locales/en.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ua: { translation: ua },
    },
    ns: ["translation"],
    defaultNS: "translation",
  });

export default i18n;
