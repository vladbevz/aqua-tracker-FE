// import { useState } from "react";
// import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
// import { WaterEntry } from "../WaterEntry/WaterEntry";
// import css from "./TodayWaterList.module.css";
// import { HiPlusSmall } from "react-icons/hi2";
// import { AddWaterModal } from "../AddWaterModal/AddWaterModal.jsx";
// import { useSelector } from "react-redux";
// import { selectTodayWaterList } from "../../redux/todayWaterList/selectors.js";
// import { useTranslation } from "react-i18next";

// export const TodayWaterList = () => {
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const { t } = useTranslation();

//   const waterList = useSelector(selectTodayWaterList);
//   const isLoading = useSelector((state) => state.todayWater.isLoading);
//   const openModal = () => {
//     setIsOpen(true);
//   };
//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <div className="today-section">
//         <p className={css.text}>{t("homePage.today")}</p>
//         <ul className={css.list}>
//           {waterList.map((item) => (
//             <WaterEntry key={item._id} {...item} />
//           ))}
//         </ul>
//         <button className={css.addBtn} onClick={openModal}>
//           <HiPlusSmall className={css.plusIcon} />
//           {t("homePage.addWater")}
//         </button>
//       </div>
//       {modalIsOpen && (
//         <ModalWrap isOpen={modalIsOpen} handleClose={closeModal}>
//           <AddWaterModal closeModal={closeModal} />
//         </ModalWrap>
//       )}
//     </>
//   );
// };
import { useState } from "react";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import { WaterEntry } from "../WaterEntry/WaterEntry";
import css from "./TodayWaterList.module.css";
import { HiPlusSmall } from "react-icons/hi2";
import { AddWaterModal } from "../AddWaterModal/AddWaterModal.jsx";
import { useSelector } from "react-redux";
import { selectTodayWaterList } from "../../redux/todayWaterList/selectors.js";
import { useTranslation } from "react-i18next";
import { Puff } from "react-loader-spinner"; // Импортируем лоадер

export const TodayWaterList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const waterList = useSelector(selectTodayWaterList);
  const isLoading = useSelector((state) => state.todayWater.isLoading);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="today-section">
        <p className={css.text}>{t("homePage.today")}</p>
        {isLoading ? (
          <div className={css.loader}>
            <Puff
              visible={true}
              height="50"
              width="50"
              color="#407bff"
              ariaLabel="puff-loading"
            />
          </div>
        ) : (
          <ul className={css.list}>
            {waterList.map((item) => (
              <WaterEntry key={item._id} {...item} />
            ))}
          </ul>
        )}

        <button className={css.addBtn} onClick={openModal}>
          <HiPlusSmall className={css.plusIcon} />
          {t("homePage.addWater")}
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
