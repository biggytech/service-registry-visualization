import i18n from "i18next";
import { useTranslation as useTranslationI18, initReactI18next } from "react-i18next";
import en from '../locales/en.json'
import ru from '../locales/ru.json'

export const initTranslation = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: en
        },
        ru: {
          translation: ru
        }
      },
      lng: "en",
      fallbackLng: "en",

      interpolation: {
        escapeValue: false
      }
    });
};

export const useTranslation = () => {
  const { t } = useTranslationI18();

  return { translate: t }
};