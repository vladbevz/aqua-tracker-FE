import { useDispatch } from "react-redux";
import css from "./UserLogoutModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { logOut } from "../../redux/auth/operations.js";
import { toast } from "react-hot-toast";

export const UserLogoutModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const logOutUser = async () => {
   try {
    await  dispatch(logOut());
    toast.success("Successfully Log Out!");
   } catch (error) {
    if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    }else {
      toast.error("An unexpected error occurred. Please try again.");
    }
   }
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
