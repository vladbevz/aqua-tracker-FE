import css from "./UserAuth.module.css";
import UserLogo from "../UserLogo/UserLogo";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useTranslation } from "react-i18next";

export const UserAuth = () => {
  const { t } = useTranslation();
  const logedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.container}>
      {logedIn ? (
        <>
          <UserLogo />
        </>
      ) : (
        <>
          <NavLink to="/signin" className={css.link}>
            {t("pages.signin")}
          </NavLink>
          <RxAvatar className={css.avatar} />
        </>
      )}
    </div>
  );
};
