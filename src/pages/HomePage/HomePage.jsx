import { useState } from "react";
import { DailyNorma } from "../../components/DailyNorma/DailyNorma.jsx";
import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList.jsx";
import { WaterRatioPanel } from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import { MonthStatsTable } from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import css from "./HomePage.module.css";
import entries from "./entries.json";
import data from "./data.json";

export const HomePage = () => {
  const [monthData, setMonthData] = useState(data);
  const [dailyEntries, setDailyEntries] = useState(entries);
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
          <TodayWaterList entries={dailyEntries} />
          <MonthStatsTable days={monthData} />
        </div>
      </div>
    </section>
  );
};

// const addEntry = () => {
//         setDailyEntry([...entries, { amount: 200, time: "15:00 PM" }]);
// };

// const deleteEntry = (id) => {
//    const updatedEntries = dailyEntries.filter((entry) => entry.id !== id);
// const newTotal = updatedEntries.reduce((sum, entry) => sum + entry.amount, 0);
// setWaterEntries(updatedEntries);
// setProgress((newTotal / (dailyGoal * 1000)) * 100);
// };
