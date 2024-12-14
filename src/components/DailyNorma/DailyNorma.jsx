import { useState } from "react";
import css from "./DailyNorma.module.css";

export const DailyNorma = () => {
    const [dailyGoal, setDailyGoal] = useState(1.5); // літри
    return (
            <div className={css.wrapper}>
                <div>
                    <p className={css.text}>My daily norma</p>
                </div>
                <div className={css.amount}>
                    <p className={css.number}>1.5 L</p>
                    <button type="submit" className={css.editBtn}
                    onClick={() => setDailyGoal(prompt("Set new goal (liters):") || dailyGoal)}>Edit</button>
                </div>
            </div>
    )
}
