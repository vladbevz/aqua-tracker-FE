import { useState } from "react";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import { WaterEntry } from "../WaterEntry/WaterEntry";
import css from "./TodayWaterList.module.css";
import { HiPlusSmall } from "react-icons/hi2";
import { AddWaterModal } from "../AddWaterModal/AddWaterModal.jsx";

export const TodayWaterList = ({list}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="today-section">
        <p className={css.text}>Today</p>
        <ul className={css.list}>
          {list.map((entry) => (
            <WaterEntry key={entry._id} {...entry} />
          ))}
        </ul>
        <button className={css.addBtn} onClick={openModal}>
          <HiPlusSmall className={css.plusIcon} />
          Add water
        </button>
      </div>
      {modalIsOpen && (
        <ModalWrap isOpen={modalIsOpen} handleClose={closeModal}>
          <AddWaterModal closeModal={closeModal} />
        </ModalWrap>
      )}
    </>
  );
};
