import { WaterEntry } from "../WaterEntry/WaterEntry";
import css from "./TodayWaterList.module.css";
import { HiPlusSmall } from "react-icons/hi2";


export const TodayWaterList = ({ entries }) => {
    return (
        <div className="today-section">
            <h2 className={css.text}>Today</h2>
            <ul className={css.list}>
                {entries.map((entry, index) => (
                    <WaterEntry key={index} {...entry} />
                ))}
            </ul>
            <button className={css.addBtn}><HiPlusSmall className={css.plusIcon} />Add water</button>
        </div>
    )
}
