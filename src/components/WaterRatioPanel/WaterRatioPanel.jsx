import { useState } from "react";
import css from "./WaterRatioPanel.module.css";
import { AddWaterModal } from "../AddWaterModal/AddWaterModal";
import { ModalWrap } from "../ModalWrap/ModalWrap";
import { useSelector } from "react-redux";
import { selectTodayWaterPercent } from "../../redux/todayWaterList/selectors";

export const WaterRatioPanel = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const progress = useSelector(selectTodayWaterPercent);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={css.progressWrapper}>
        <p className={css.textBar}>Today</p>
        <div className={css.progressBar}>
          <div className={css.progress} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div>
        <button type="button" className={css.addBtn} onClick={openModal}>
          + Add Water
        </button>
      </div>
      {modalIsOpen && (
        <ModalWrap isOpen={modalIsOpen} handleClose={closeModal}>
          <AddWaterModal closeModal={closeModal} />
        </ModalWrap>
      )}
    </div>
  );
};