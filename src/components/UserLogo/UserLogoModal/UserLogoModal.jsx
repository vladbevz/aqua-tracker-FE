
import css from "./UserLogoModal.module.css";
import { RiSettings3Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
export const UserLogoModal = ({ onSettingsClick, onLogoutClick, onClose }) => {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.dropdownMenu} onClick={(e) => e.stopPropagation()}>
        <button className={css.menuBtn} onClick={onSettingsClick}>
          <RiSettings3Line className={css.icons}/>
          <p className={css.text}>Settings</p> 
        </button>
        <button className={css.menuBtn} onClick={onLogoutClick}>
          <TbLogout className={css.icons}/>
          <p className={css.text}>Log Out</p>
        </button>
      </div>
    </div>
  );
};