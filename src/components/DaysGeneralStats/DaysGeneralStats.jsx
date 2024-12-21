import css from "./DaysGeneralStats.module.css";

export const DaysGeneralStats = ({
  month,
  currentDay,
  percent,
  daylyNorm,
  servings,
  showedLeft,
}) => {
  return (
    <div
      className={`${css.container} ${
        showedLeft ? `${css.showedLeft}` : `${css.showedRight}`
      }`}
    >
      <p className={css.currentDate}>{`${currentDay}, ${month} `}</p>
      <p className={css.descriptionText}>
        Daily norma:
        <span className={css.stateText}>{daylyNorm}L</span>
      </p>
      <p className={css.descriptionText}>
        Fulfillment of the daily norm:
        <span className={css.stateText}>{percent}%</span>
      </p>
      <p className={css.descriptionText}>
        How many servings of water:
        <span className={css.stateText}>{servings}</span>
      </p>
    </div>
  );
};
