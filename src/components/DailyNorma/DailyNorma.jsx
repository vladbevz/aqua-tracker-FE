import { useState } from "react";
import css from "./DailyNorma.module.css";
import { DailyNormaModal } from "../DailyNormaModal/DailyNormaModal";
import { ModalWrap } from "../ModalWrap/ModalWrap.jsx";
import { useSelector } from "react-redux";
import { selectDailyNorm } from "../../redux/auth/selectors.js";

export const DailyNorma = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const dailyNorm = useSelector(selectDailyNorm) / 1000;
    
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
                    <p className={css.number}>{dailyNorm} L</p>
                    <button className={css.editBtn} onClick={openModal}>Edit</button>
                    
                </div>
            </div>
            {modalIsOpen && <ModalWrap isOpen={modalIsOpen} handleClose={closeModal} >
                                <DailyNormaModal closeModal={closeModal} />
                            </ModalWrap>}
        </>
    )
}