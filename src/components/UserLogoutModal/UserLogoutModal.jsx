import { useDispatch } from "react-redux";
import css from "./UserLogoutModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { logOut } from "../../redux/auth/operations.js";

export const UserLogoutModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(logOut());
    onCancel();
  };

  return (
    <div className={css.logOutContainer}>
      <button className={css.closeBtn} onClick={onCancel}>
        <IoCloseOutline />
      </button>
      <h2 className={css.logOutTitle}>Log Out</h2>
      <p className={css.logOutText}>Do you really want to leave?</p>
      <div className={css.btnContainer}>
        <button className={css.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button className={css.logoutBtn} onClick={logOutUser}>
          LogOut
        </button>
      </div>
    </div>
  );
};
