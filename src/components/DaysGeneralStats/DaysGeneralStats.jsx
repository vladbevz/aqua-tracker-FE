import css from "./DaysGeneralStats.module.css";
import { useState } from "react";

export const DaysGeneralStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className={css.container}>
      <p className={css.currentDate}>17,December</p>
      <p className={css.descriptionText}>
        Daily norma:
        <span className={css.stateText}>1.8L</span>
      </p>
      <p className={css.descriptionText}>
        Fulfillment of the daily norm:
        <span className={css.stateText}>60%</span>
      </p>
      <p className={css.descriptionText}>
        How many servings of water:
        <span className={css.stateText}>6</span>
      </p>
    </div>
  );
};
