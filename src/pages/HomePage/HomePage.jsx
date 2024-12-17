import { useEffect, useState } from "react";
import { DailyNorma } from "../../components/DailyNorma/DailyNorma.jsx";
import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList.jsx";
import { WaterRatioPanel } from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import { MonthStatsTable } from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import css from "./HomePage.module.css";
// import entries from "./entries.json";
import data from "./data.json";
import { fetchTodayWater } from "../../redux/todayWaterList/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectTodayWaterList } from "../../redux/todayWaterList/selectors.js";

export default function HomePage() {
  const [monthData, setMonthData] = useState(data);
  // const [dailyEntries, setDailyEntries] = useState(entries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodayWater());
  }, [dispatch]);

  const waterList = useSelector(selectTodayWaterList);

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
          <MonthStatsTable days={monthData} />
        </div>
      </div>
    </section>
  );
}
