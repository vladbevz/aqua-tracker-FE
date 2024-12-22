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
  const changedProgress = progress > 100 ? 100 : progress;

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.box}>
      <div className={css.container}>
        <p className={css.textBar}>Today</p>
        <div className={css.progressBar}>
          <div className={css.progress} style={{ width: `${progress}%` }}></div>
          <div className={css.thumb} style={{ left: `${changedProgress}%` }}></div>
          
        </div>
        <div className={css.spanBox}>
            <span className={css.span}></span>
            <span className={css.span}></span>
            <span className={css.span}></span>
          </div>
        <div className={css.progressView}>
          <div className={css.holderBox}>
            <span className={`${css.holder} ${progress < 10 ? `${css.hidden}` : ``}`}>0%</span>
            <span className={`${css.holder} ${progress > 32 && progress < 60 ? `${css.hidden}` : ``}`}>50%</span>
            <span className={`${css.holder} ${progress > 84 ? `${css.hidden}` : ``}`}>100%</span>
          </div>
          <span className={css.number} style={{ left: `${changedProgress/1.16}%` }}>{progress}%</span>
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