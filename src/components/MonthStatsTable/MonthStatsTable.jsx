import css from "./MonthStatsTable.module.css";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import { MonthOneDay } from "./MonthOneDay/MonthOneDay";
import { capitalizeFirstLetter } from "../../Utilits/capitalize";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

export const MonthStatsTable = ({
  monthData,
  month,
  year,
  setMonthNumber,
  monthNumber,
  setYear,
}) => {
  const user = useSelector(selectUser);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const disableNextMonthButton =
    currentMonth <= monthNumber && currentYear >= year;
  const [fullMonthData, setFullMonthData] = useState([]);

  const getDaysInMonth = (currentYear, currentMonth) => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
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

  useEffect(() => {
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
          daylyNorm: user.daylyNorm / 1000,
          percent: 0,
          servings: 0,
        };
      }

      for (const element of fetchData) {
        data[element.date.split("-")[2] - 1] = element;
      }
      return data;
    };
    setFullMonthData(createDataFullMonth(monthData));
  }, [monthData, year, monthNumber]);

  const capitalizeMonth = capitalizeFirstLetter(month);

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>Month</h2>
        <div className={css.pagination}>
          <button className={css.paginationBtn} onClick={setPrevMonth}>
            <HiOutlineChevronLeft />
          </button>
          <p className={css.paginationMonth}>
            {capitalizeMonth}, {year}
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
          <MonthOneDay
            day={day}
            monthData={monthData}
            month={month}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
