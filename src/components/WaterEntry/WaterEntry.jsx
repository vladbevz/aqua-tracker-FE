import { useState } from "react";
import { DeleteEntryModal } from "../DeleteEntryModal/DeleteEntryModal.jsx";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import css from "./WaterEntry.module.css";
import Glass from "/images/home/glass.svg";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";

export const WaterEntry = (item) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const date = new Date(item.date);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <li className={css.waterEntry}>
        <div className={css.amountBox}>
          <img src={Glass} alt="glass" className={css.img} />
          <p className={css.amount}>{item.amount} ml</p>
        </div>
        <p className={css.time}>{formattedTime}</p>
        <div className={css.btnBox}>
          <button className={css.editBtn}>
            <HiOutlinePencilSquare />
          </button>
          <button className={css.deleteBtn} onClick={openModal}>
            <HiOutlineTrash />
          </button>
        </div>
      </li>
      {modalIsOpen && (
        <ModalWrap isOpen={modalIsOpen} handleClose={closeModal}>
          <DeleteEntryModal closeModal={closeModal} id={item._id} />
        </ModalWrap>
      )}
    </>
  );
};
