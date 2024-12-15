import { useState } from "react";
import css from "./DailyNorma.module.css";
import { DailyNormaModal } from "../DailyNormaModal/DailyNormaModal";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";

export const DailyNorma = () => {
    // const [dailyGoal, setDailyGoal] = useState(1.5);
    // const [showModal, setShowModal] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className={css.wrapper}>
                <div>
                    <p className={css.text}>My daily norma</p>
                </div>
                <div className={css.amount}>
                    <p className={css.number}>1.5 L</p>
                <button className={css.editBtn} onClick={openModal}>Edit</button>
                </div>
            </div>
            {modalIsOpen && <ModalWrap isOpen={modalIsOpen} handleClose={closeModal} >
                                <DailyNormaModal closeModal={closeModal} />
                            </ModalWrap>}
        </>
    )
}