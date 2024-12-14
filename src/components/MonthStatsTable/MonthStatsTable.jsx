import css from "./MonthStatsTable.module.css";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";

export const MonthStatsTable = ({ days }) => {
    return (
        <div className={css.wrapper}>
            <div className={css.title}>
                <h2>Month</h2>
                <div className={css.pagination}>
                    <button id="prev-month"><HiOutlineChevronLeft /></button>
                    <p id="month-title">April, 2023</p>
                    <button id="next-month"><HiOutlineChevronRight /></button>
                </div>
            </div>
            <div className={css.month}>
                {days.map((day, index) => (
                    <div key={index} className={css.item}>
                        <div key={index} className={`${ css.day } ${day.completed ? `${ css.completed }` : `${ css.uncompleted }`}`}>
                            <p className={css.date}>{day.date}</p>
                        </div>
                        <p className={css.progress}>{day.progress}%</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
