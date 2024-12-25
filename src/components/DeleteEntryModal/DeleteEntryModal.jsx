import css from "./DeleteEntryModal.module.css";
import { useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { deleteTodayWater } from "../../redux/todayWaterList/operations";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const DeleteEntryModal = ({ closeModal, id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = async () => {
    try {
      await dispatch(deleteTodayWater(id)).unwrap();
      toast.success(t("notification.delete"));
      closeModal();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={css.deleteEntryContainer}>
      <div className={css.deleteEntryHead}>
        <h2 className={css.deleteEntryTitle}>{t("modals.deleteEntry")}</h2>
        <button className={css.closeBtn} onClick={closeModal}>
          <IoCloseOutline className={css.closeBtnIcon} />
        </button>
      </div>
      <p className={css.deleteEntryText}>{t("modals.sureDelete")}</p>
      <div className={css.btnContainer}>
        <button className={css.deleteEntryBtn} onClick={handleClick}>
          {t("modals.delete")}
        </button>
        <button className={css.cancelBtn} onClick={closeModal}>
          {t("modals.cancel")}
        </button>
      </div>
    </div>
  );
};
