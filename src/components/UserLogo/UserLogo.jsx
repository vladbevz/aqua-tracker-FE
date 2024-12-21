import { useState } from "react";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import { UserLogoModal } from "./UserLogoModal/UserLogoModal.jsx";
import { UserLogoutModal } from "../UserLogoutModal/UserLogoutModal.jsx";
import css from "./UserLogo.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SettingUser } from "../SettingUser/SettingUser.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
const UserLogo = () => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const user = useSelector(selectUser);
  const toggleBackdrop = () => {
    setIsBackdropOpen((prev) => !prev);
  };

  const toggleModal = (modalType) => {
    setActiveModal((prev) => (prev === modalType ? null : modalType));
    setIsBackdropOpen(false);
  };

  const getFallbackAvatar = () => {
    const letter = user.name?.charAt(0) || user.email?.charAt(0) || "?";
    return letter.toUpperCase();
  };

  return (
    <div className={css.profileDropdown}>
      <div className={css.profileInfo}>
        <span className={css.username}>{user.name || user.email}</span>
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="User Avatar" className={css.avatar} />
        ) : (
          <div className={css.fallbackAvatar}>{getFallbackAvatar()}</div>
        )}
        <button className={css.arrowButton} onClick={toggleBackdrop}>
          {isBackdropOpen ? (
            <IoIosArrowUp className={css.arrow} />
          ) : (
            <IoIosArrowDown className={css.arrow} />
          )}
        </button>
      </div>

      {isBackdropOpen && (
        <UserLogoModal
          onSettingsClick={() => toggleModal("settings")}
          onLogoutClick={() => toggleModal("logout")}
          onClose={toggleBackdrop}
        />
      )}

      <ModalWrap
        isOpen={activeModal === "logout"}
        handleClose={() => toggleModal("logout")}
      >
        <UserLogoutModal onCancel={() => toggleModal("logout")} />
      </ModalWrap>

      <ModalWrap
        isOpen={activeModal === "settings"}
        handleClose={() => toggleModal("settings")}
      >
        <SettingUser onCancel={() => toggleModal("settings")} />
      </ModalWrap>
    </div>
  );
};

export default UserLogo;
