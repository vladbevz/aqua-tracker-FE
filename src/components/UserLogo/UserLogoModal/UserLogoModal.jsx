import css from "./UserLogoModal.module.css";
import { RiSettings3Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import LangSwitcher from "../../LangSwicher/LangSwitcher.jsx";
import ThemeToggleButton from "../../ThemeToggleButton/ThemeToggleButton.jsx";

export const UserLogoModal = ({ onSettingsClick, onLogoutClick }) => {
  const { t } = useTranslation();
  return (
    <div className={css.backdrop}>
      <div className={css.dropdownMenu}>
        <button className={css.menuBtn} onClick={onSettingsClick}>
          <RiSettings3Line className={css.icons} />
          <p className={css.text}>{t("modals.setting")}</p>{" "}
        </button>
        <button className={css.menuBtn} onClick={onLogoutClick}>
          <TbLogout className={css.icons} />
          <p className={css.text}>{t("modals.logout")}</p>{" "}
        </button>
        <div className={css.btnWrapper}>
          <LangSwitcher />
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};
