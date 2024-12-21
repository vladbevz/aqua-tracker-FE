import { useEffect, useState } from "react";
import { DailyNorma } from "../../components/DailyNorma/DailyNorma.jsx";
import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList.jsx";
import { WaterRatioPanel } from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import { MonthStatsTable } from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import css from "./HomePage.module.css";
import { fetchTodayWater } from "../../redux/todayWaterList/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthWater } from "../../redux/monthWaterList/operations.js";
import { getMonthName } from "../../Utilits/getMonth.js";
import { selectMonthWaterList } from "../../redux/monthWaterList/selector.js";

export default function HomePage() {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2024);
  const [monthNumber, setMonthNumber] = useState(11);
  
  const month = getMonthName(monthNumber);
  const monthData = useSelector(selectMonthWaterList);

  useEffect(() => {
    dispatch(fetchTodayWater());
  }, [dispatch]);

  const getMonthData = (year, month) => {
    dispatch(
      fetchMonthWater({
        year,
        month,
      })
    );
  };

  useEffect(() => {
    getMonthData(year, month);
  }, [monthNumber]);

  return (
    <section className={css.home}>
      <div >
        <div className={css.container}>
          <div className={css.box}>
            <div className={css.relative}>
              <DailyNorma />
              <img
                className={css.bottle}
                src="/images/home/mob-home-bottle-1x.png"
                alt="Bottle"
              />
            </div>
            <WaterRatioPanel />
          </div>
          <div className={css.wrapper}>
            <TodayWaterList />
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
      </div>
    </section>
  );
}
