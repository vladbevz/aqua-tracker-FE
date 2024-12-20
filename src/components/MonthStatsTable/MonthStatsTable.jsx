import css from "./MonthStatsTable.module.css";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";

export const MonthStatsTable = ({
  monthData,
  month,
  year,
  setMonthNumber,
  monthNumber,
  setYear,
}) => {

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const disableNextMonthButton = currentMonth <= monthNumber && currentYear >= year;
  let fullMonthData = [];


  const getDaysInMonth = (currentYear, currentMonth) => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }

  const createDataFullMonth = (fetchData) => {
    const daysCount = getDaysInMonth(year, monthNumber);
    const data = [];
    for (let i = 0; i < daysCount; i++) {
      data[i] = {
        amountWaterPerDay: 200,
        date: `2024-12-${i + 1}`,
        dayWaterList: [
          {
            amount: 50,
            createdAt: "2024-12-18T20:27:07.543Z",
            curDaylyNorm: 1500,
            date: "2024-12-18T20:27:07.541Z",
            updatedAt: "2024-12-18T20:27:07.543Z",
            userId: "675d373b5b0fbabf3c4db90a",
            _id: "6763301b6a099355cf1c7e87",
          },
        ],
        daylyNorm: 8000,
        percent: 0,
        servings: 11,
      };
    }

    for (const element of fetchData) {
      data[element.date.split("-")[2] - 1] = element;
    }
    return data;
  };

  const setPrevMonth = () => {
    if (monthNumber - 1 < 0) {
      setMonthNumber(11);
      setYear(year - 1);
      return;
    }
    setMonthNumber(monthNumber - 1);
  };

  const setNextMonth = () => {
    if (monthNumber + 1 > 11) {
      setMonthNumber(0);
      setYear(year + 1);
      return;
    }
    setMonthNumber(monthNumber + 1);
  };

  fullMonthData = (createDataFullMonth(monthData));

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>Month</h2>
        <div className={css.pagination}>
          <button className={css.paginationBtn} onClick={setPrevMonth}>
            <HiOutlineChevronLeft />
          </button>
          <p className={css.paginationMonth}>
            {month}, {year}
          </p>
          <button
            className={css.paginationBtn}
            onClick={setNextMonth}
            disabled={disableNextMonthButton}
          >
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
      <div className={css.calendar}>
        {fullMonthData.map((day, index) => (
          <div key={index} className={css.item}>
            <div
              key={index}
              className={`${css.day} ${
                day.amountWaterPerDay < day.daylyNorm
                  ? `${css.completed}`
                  : `${css.uncompleted}`
              }`}
            >
              <p className={css.date}>{day.date.split("-")[2]}</p>
            </div>
            <p className={css.progress}>{day.percent}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};
