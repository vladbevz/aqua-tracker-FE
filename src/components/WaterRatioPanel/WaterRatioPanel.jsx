import { useState } from "react";
import css from "./WaterRatioPanel.module.css";
import { AddWaterModal } from "../AddWaterModal/AddWaterModal";
import { ModalWrap } from "../ModalWrap/ModalWrap";
import { useSelector } from "react-redux";
import { selectTodayWaterPercent } from "../../redux/todayWaterList/selectors";
import { PiPlusCircleBold } from "react-icons/pi";

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
    <div className={css.box}>
      <div className={css.progressWrapper}>
        <p className={css.textBar}>Today</p>
        <div className={css.number} style={{ marginLeft: `${progress/1.16}%` }}>{progress}%</div>
        <div className={css.progressBar}>
          <div className={css.progress} style={{ width: `${progress}%` }}></div>
        </div>
        <div className={css.progressHolder}>
          <div className={css.spanBox}>
            <span className={css.span}></span>
            <p className={css.holder}>0%</p>
          </div>
          <div className={css.spanBox}>
            <span className={css.span}></span>
            <p className={css.holder}>100%</p>
          </div>
        </div>
      </div>
      <div className={css.btnBox}>
        <button type="button" className={css.addBtn} onClick={openModal}>
          <PiPlusCircleBold className={css.imgBtn} />
          Add Water
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