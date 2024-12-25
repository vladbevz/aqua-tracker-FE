import { useState } from "react";
import { DeleteEntryModal } from "../DeleteEntryModal/DeleteEntryModal.jsx";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import css from "./WaterEntry.module.css";
import Glass from "/images/home/glass.svg";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { EditWaterModal } from "../EditWaterModal/EditWaterModal.jsx";
import { useTranslation } from "react-i18next";

export const WaterEntry = (item) => {
  const [activeModal, setActiveModal] = useState(null);
  const { t } = useTranslation();

  const date = new Date(item.date);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  return (
    <>
      <li className={css.waterEntry}>
        <div className={css.flex}>
          <div className={css.amountBox}>
            <img src={Glass} alt="glass" className={css.img} />
            <p className={css.amount}>
              {item.amount} {t("stats.ml")}
            </p>
          </div>
          <p className={css.time}>{formattedTime}</p>
        </div>
        <div className={css.flex}>
          <button
            className={css.editBtn}
            onClick={() => openModal("editWater")}
          >
            <HiOutlinePencilSquare className={css.editImg} />
          </button>
          <button
            className={css.deleteBtn}
            onClick={() => openModal("deleteWater")}
          >
            <HiOutlineTrash className={css.deleteImg} />
          </button>
        </div>
      </li>
      <ModalWrap
        isOpen={activeModal === "deleteWater"}
        handleClose={closeModal}
      >
        <DeleteEntryModal closeModal={closeModal} id={item._id} />
      </ModalWrap>

      <ModalWrap isOpen={activeModal === "editWater"} handleClose={closeModal}>
        <EditWaterModal closeModal={closeModal} item={item} />
      </ModalWrap>
    </>
  );
};
