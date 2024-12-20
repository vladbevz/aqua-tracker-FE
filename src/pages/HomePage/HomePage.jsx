import { useEffect, useState } from "react";
import { DailyNorma } from "../../components/DailyNorma/DailyNorma.jsx";
import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList.jsx";
import { WaterRatioPanel } from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import { MonthStatsTable } from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import css from "./HomePage.module.css";
// import entries from "./entries.json";
import { fetchTodayWater } from "../../redux/todayWaterList/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectTodayWaterList } from "../../redux/todayWaterList/selectors.js";
import { fetchMonthWater } from "../../redux/monthWaterList/operations.js";
import { getMonthName } from "../../Utilits/getMonth.js";
import { selectMonthWaterList } from "../../redux/monthWaterList/selector.js";

export default function HomePage() {
  const [year, setYear] = useState(2024);
  const [monthNumber, setMonthNumber] = useState(11);
  const month = getMonthName(monthNumber);
  const monthData = useSelector(selectMonthWaterList);

  // const [dailyEntries, setDailyEntries] = useState(entries);

  const dispatch = useDispatch();

  const getMonthData = (year, month) => {
    dispatch(
      fetchMonthWater({
        year,
        month,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchTodayWater());
  }, [dispatch]);

  const waterList = useSelector(selectTodayWaterList);

  useEffect(() => {
    getMonthData(year, month);
  }, [monthNumber, waterList]);


  return (
    <section className={css.home}>
      <div className="container">
        <DailyNorma />
        <img
          className="bottle"
          src="/images/home/mob-home-bottle-1x.png"
          alt="Bottle"
        />
        <WaterRatioPanel />
        <div className={css.wrapper}>
          <TodayWaterList list={waterList} />
          <MonthStatsTable
            monthData={monthData}
            month={month}
            year={year}
            setYear={setYear}
            setMonthNumber={setMonthNumber}
            monthNumber={monthNumber}
          />
        </div>
      </div>
    </section>
  );
}
