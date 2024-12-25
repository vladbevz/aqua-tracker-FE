import css from "./DaysGeneralStats.module.css";
import { useTranslation } from "react-i18next";

export const DaysGeneralStats = ({
  month,
  currentDay,
  percent,
  daylyNorm,
  servings,
  showedLeft,
}) => {
  const { t } = useTranslation();
  const translatedMonth = t(`months.${month}`);

  return (
    <div
      className={`${css.container} ${
        showedLeft ? `${css.showedLeft}` : `${css.showedRight}`
      }`}
    >
      <p className={css.currentDate}>{`${currentDay}, ${translatedMonth} `}</p>
      <p className={css.descriptionText}>
        {t("stats.dailyNorma")}:
        <span className={css.stateText}>
          {daylyNorm}
          {t("stats.l")}
        </span>
      </p>
      <p className={css.descriptionText}>
        {t("stats.fulfillmentDailyNorma")}:
        <span className={css.stateText}>{percent}%</span>
      </p>
      <p className={css.descriptionText}>
        {t("stats.servingsWater")}:
        <span className={css.stateText}>{servings}</span>
      </p>
    </div>
  );
};
