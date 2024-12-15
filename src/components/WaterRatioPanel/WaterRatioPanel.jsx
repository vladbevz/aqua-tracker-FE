import { useState } from "react";
import css from "./WaterRatioPanel.module.css";
import { TodayListModal } from "../TodayListModal/TodayListModal.jsx";
import { ModalWrap } from "../ModalWrap/ModalWrap";

export const WaterRatioPanel = () => {
    const [progress, setProgress] = useState(80);
    const [modalIsOpen, setIsOpen] = useState(false);
    
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <div className={css.progressWrapper}>
                <p className={css.textBar}>Today</p>
                <div className={css.progressBar}>
                    <div className={css.progress} style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div>
                <button type="button" className={css.addBtn} onClick={openModal}>+ Add Water</button>
            </div>
            {modalIsOpen && <ModalWrap isOpen={modalIsOpen} handleClose={closeModal} >
                                <TodayListModal closeModal={closeModal} />
                            </ModalWrap>}
        </div>
    )
}


 // const addWater = () => {
    //     const newEntry = { id: Date.now(), amount: 200, time: new Date().toLocaleTimeString() };
    //     const newTotal = waterEntries.reduce((sum, entry) => sum + entry.amount, 0) + newEntry.amount;

    //     setWaterEntries([...waterEntries, newEntry]);
    //     setProgress(Math.min((newTotal / (dailyGoal * 1000)) * 100, 100));
    // };