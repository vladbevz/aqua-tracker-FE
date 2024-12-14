import css from "./WaterEntry.module.css";
import Glass from "/images/home/glass.svg";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";

export const WaterEntry = ({ amount, time }) => {
    return (
        <li className={css.waterEntry}>
            <div className={css.amountBox}>
                <img src={Glass} alt="glass" className={css.img} />
                <p className={css.amount}>{amount} ml</p>
            </div>
            <p className={css.time}>{time}</p>
            <div className={css.btnBox}>
                <button className={css.editBtn}><HiOutlinePencilSquare /></button>
                <button className={css.deleteBtn}><HiOutlineTrash /></button>
            </div>
            
        </li>

    )
}
