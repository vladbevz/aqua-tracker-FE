// import css from "./Header.module.css";
// import { Logo } from "../Logo/Logo.jsx";
// import { UserAuth } from "../UserAuth/UserAuth.jsx";
// import "../../index.css";

// export const Header = () => {
//   return (
//     <div className={css.container}>
//       <header className={css.header}>
//         <Logo />
//         <UserAuth />
//       </header>
//     </div>
//   );
// };
import { useTranslation } from "react-i18next";
import css from "./Header.module.css";
import { Logo } from "../Logo/Logo.jsx";
import { UserAuth } from "../UserAuth/UserAuth.jsx";
import "../../index.css";
import { useState } from "react";

export default function Header() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleChangeLanguage = () => {
    const newLang = currentLang === "en" ? "ua" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <button className={css.langBtn} onClick={handleChangeLanguage}>
          {currentLang === "en" ? "Укр" : "En"}{" "}
        </button>
        <UserAuth />
      </header>
    </div>
  );
}
