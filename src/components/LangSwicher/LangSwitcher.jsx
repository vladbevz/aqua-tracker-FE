import { useState } from "react";
import { useTranslation } from "react-i18next";
import css from "./LangSwitcher.module.css";
import { MdLanguage } from "react-icons/md";

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleChangeLanguage = () => {
    const newLang = currentLang === "en" ? "ua" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };
  return (
    <>
      <button className={css.langBtn} onClick={handleChangeLanguage}>
        <MdLanguage />
      </button>
    </>
  );
}
