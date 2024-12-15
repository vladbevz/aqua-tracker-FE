import { useState } from "react";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import { WaterEntry } from "../WaterEntry/WaterEntry";
import css from "./TodayWaterList.module.css";
import { HiPlusSmall } from "react-icons/hi2";
import { TodayListModal } from "../TodayListModal/TodayListModal.jsx";


export const TodayWaterList = ({ entries }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
        
        const openModal = () => {
            setIsOpen(true);
        };
        const closeModal = () => {
            setIsOpen(false);
        }
    
    return (
        <>
            <div className="today-section">
                <p className={css.text}>Today</p>
                <ul className={css.list}>
                    {entries.map((entry, index) => (
                        <WaterEntry key={index} {...entry} />
                    ))}
                </ul>
                <button className={css.addBtn} onClick={openModal}><HiPlusSmall className={css.plusIcon} />Add water</button>
            </div>
            {modalIsOpen && <ModalWrap isOpen={modalIsOpen} handleClose={closeModal} >
                                <TodayListModal closeModal={closeModal} />
                            </ModalWrap>}
        </>
        
    )
}
