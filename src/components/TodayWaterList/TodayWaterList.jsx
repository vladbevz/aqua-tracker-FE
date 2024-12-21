import { useState } from "react";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import { WaterEntry } from "../WaterEntry/WaterEntry";
import css from "./TodayWaterList.module.css";
import { HiPlusSmall } from "react-icons/hi2";
import { AddWaterModal } from "../AddWaterModal/AddWaterModal.jsx";
import { useSelector } from "react-redux";
import { selectTodayWaterList } from "../../redux/todayWaterList/selectors.js";

export const TodayWaterList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const waterList = useSelector(selectTodayWaterList);

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
          {waterList.map((item) => (
            <WaterEntry key={item._id} {...item} />
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
