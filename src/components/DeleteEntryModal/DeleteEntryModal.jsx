import css from "./DeleteEntryModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

export const DeleteEntryModal = ({ closeModal }) => {
  const handleClick = () => {
    closeModal();
  };

  return (
    <div className={css.deleteEntryContainer}>
      <div className={css.deleteEntryHead}>
        <h2 className={css.deleteEntryTitle}>Delete entry</h2>
        <button className={css.closeBtn} onClick={closeModal}>
          <IoCloseOutline className={css.closeBtnIcon} />
        </button>
      </div>
      <p className={css.deleteEntryText}>
        Are you sure you want to delete the netry
      </p>
      <div className={css.btnContainer}>
        <button className={css.deleteEntryBtn} onClick={handleClick}>
          Delete
        </button>
        <button className={css.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
