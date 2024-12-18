import css from "./WelcomePage.module.css";
import { Link } from "react-router-dom";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlinePresentationChartBar } from "react-icons/hi2";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { RxDotFilled } from "react-icons/rx";
export default function WelcomePage() {
  return (
    <div className={css["backround-image"]}>
      <div className={css["main-page"]}>
        <section className={css["main-paige-info"]}>
          <h1 className={css["main-paige-title"]}>Water consumption tracker</h1>
          <p className={css["main-paige-text"]}>
            Record daily water intake and track
          </p>
          <div className={css["main-paige-benefits"]}>
            <h2 className={css["main-benefits-title"]}>Tracker Benefits</h2>
            <ul className={css["main-benefits-list"]}>
              <li>
                <HiOutlineCalendarDays
                  size={32}
                  color="#407bff"
                  style={{ marginRight: "8px" }}
                />
                Habit drive
              </li>
              <li>
                <HiOutlinePresentationChartBar
                  size={32}
                  color="#407bff"
                  style={{ marginRight: "8px" }}
                />
                View statistics
              </li>
              <li>
                <HiOutlineWrenchScrewdriver
                  size={32}
                  color="#407bff"
                  style={{ marginRight: "8px" }}
                />
                Personal rate setting
              </li>
            </ul>
          </div>
          <Link to="/signin">
            <button className={css["try-main-button"]}>Try tracker</button>
          </Link>
        </section>
        <section className={css["why-drink-water"]}>
          <h2 className={css["why-drink-title"]}>Why drink water</h2>
          <ul className={css["why-drink-list"]}>
            <li>
              {" "}
              <RxDotFilled size={20} color="#407bff" />
              Supply of nutrients to all organs
            </li>
            <li>
              {" "}
              <RxDotFilled size={20} color="#407bff" />
              Providing oxygen to the lungs
            </li>
            <li>
              {" "}
              <RxDotFilled size={20} color="#407bff" />
              Maintaining the work of the heart
            </li>
            <li>
              {" "}
              <RxDotFilled size={20} color="#407bff" />
              Release of processed substances
            </li>
            <li>
              {" "}
              <RxDotFilled size={20} color="#407bff" />
              Ensuring the stability of the internal environment
            </li>
            <li>
              {" "}
              <RxDotFilled size={20} color="#407bff" />
              Maintaining within the normal temperature
            </li>
            <li>
              {" "}
              <RxDotFilled size={20} color="#407bff" />
              Maintaining an immune system capable of resisting disease
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
