import css from "./WelcomePage.module.css";
import { Link } from "react-router-dom";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { LiaToolsSolid } from "react-icons/lia";
import { TestModal } from "../../components/testModal";

export const WelcomePage = () => {
  return (
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
              <HiOutlineCalendarDays
                size={32}
                color="#407bff"
                style={{ marginRight: "8px" }}
              />
              View statistics
            </li>
            <li>
              <LiaToolsSolid
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
          <li>Supply of nutrients to all organs</li>
          <li>Providing oxygen to the lungs</li>
          <li>Maintaining the work of the heart</li>
          <li>Release of processed substances</li>
          <li>Ensuring the stability of the internal environment</li>
          <li>Maintaining within the normal temperature</li>
          <li>Maintaining an immune system capable of resisting disease</li>
        </ul>
      </section>
      <div className={css["main-paige-illustration"]}>
        <img src="" alt="" />
      </div>
      <TestModal />
    </div>
  );
};
