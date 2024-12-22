
import { DailyNorma } from "../../components/DailyNorma/DailyNorma.jsx";
import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList.jsx";
import { WaterRatioPanel } from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import { MonthStatsTable } from "../../components/MonthStatsTable/MonthStatsTable.jsx";
import css from "./HomePage.module.css";


export default function HomePage() {

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
            <MonthStatsTable />
          </div>
        </div>
      </div>
    </section>
  );
}
