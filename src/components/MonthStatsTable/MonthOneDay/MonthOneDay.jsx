import { useState } from "react";
import { DaysGeneralStats } from "../../DaysGeneralStats/DaysGeneralStats";
import css from "./MonthOneDay.module.css";

export const MonthOneDay = ({ day, month }) => {
  const { date, servings, amountWaterPerDay, daylyNorm, percent } = { ...day };
  const dailyNormInMl = daylyNorm * 1000;

  const [dayInfoShowed, setDayInfoShowed] = useState({
    status: false,
    left: true,
  });

  const hideDayInfo = () => {
    setDayInfoShowed({ status: false, left: true });
  };

  const showDayInfo = (e) => {
    const elementCoordinate = e.currentTarget.getBoundingClientRect();
    const parentCoordinate =
      e.currentTarget.parentElement.getBoundingClientRect();

    const positionLeft =
      elementCoordinate.left <
      parentCoordinate.left + parentCoordinate.width / 2;
    setDayInfoShowed({ status: true, left: positionLeft });
  };

  const currentDay = date.split("-")[2];

  return (
    <div
      className={css.item}
      onMouseLeave={hideDayInfo}
      onMouseEnter={showDayInfo}
    >
      {dayInfoShowed.status ? (
        <DaysGeneralStats
          servings={servings}
          daylyNorm={daylyNorm}
          percent={percent}
          showedLeft={dayInfoShowed.left}
          currentDay={currentDay}
          month={month}
        />
      ) : (
        <></>
      )}
      <div
        className={`${css.day} ${
          amountWaterPerDay > dailyNormInMl
            ? `${css.completed}`
            : `${css.uncompleted}`
        }`}
      >
        <p className={css.date}>{currentDay}</p>
      </div>
      <p className={css.progress}>{percent}%</p>
    </div>
  );
};
