import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { selectUser } from "../../redux/auth/selectors";
import css from "./DailyNormaModal.module.css";
import "../../index.css";
import { updateUser } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
export const DailyNormaModal = ({ closeModal }) => {
  const { daylyNorm } = useSelector(selectUser);
  const { t } = useTranslation();

  const [gender, setGender] = useState("girl");
  const [weight, setWeight] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [waterAmount, setWaterAmount] = useState(daylyNorm);
  const [woterAmountForCalculet, setWoterAmountForCalculet] = useState(0);

  const toMilliliters = (liters) => liters * 1000;

  const toLiters = (milliliters) => milliliters / 1000;

  const calculateWaterRate = () => {
    const weightNumber = parseFloat(weight) || 0;
    const activitiTimeNumber = parseFloat(activityTime) || 0;

    if (weightNumber < 0 || activitiTimeNumber < 0) {
      toast.error(t("error.daylyNorm"));
      return;
    }

    let water = 0;
    if (gender === "girl") {
      water = weightNumber * 0.03 + activitiTimeNumber * 0.4;
    } else if (gender === "man") {
      water = weightNumber * 0.04 + activitiTimeNumber * 0.6;
    }

    setWaterAmount(toMilliliters(parseFloat(water.toFixed(2))));
    setWoterAmountForCalculet(toMilliliters(parseFloat(water.toFixed(2))));
  };

  useEffect(() => {
    calculateWaterRate();
  }, [gender, weight, activityTime]);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const water = parseFloat(waterAmount);
    if (water < toMilliliters(0.5) || water > toMilliliters(15)) {
      toast.error(t("error.daylyNormEdit"));
      return;
    }
    try {
      await dispatch(updateUser({ daylyNorm: waterAmount })).unwrap();
      toast.success(t("notification.intake"));
      closeModal();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleWaterChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setWaterAmount(toMilliliters(value));
    } else {
      setWaterAmount("");
    }
  };
  return (
    <div className={css.modal}>
      <div className={css.head}>
        <h1 className={css.title}>{t("modals.myDailyNorma")}</h1>
        <button onClick={closeModal} className={css.closeButton}>
          <IoCloseOutline className={css.closeButton} />
        </button>
      </div>

      <ul className={css.normaList}>
        <li className={css.normaItem}>
          {t("modals.forGirl")}
          <span className={css.normaSpan}> V=(M*0.03) + (T*0.4)</span>
        </li>
        <li className={css.normaItem}>
          {t("modals.forMan")}
          <span className={css.normaSpan}> V=(M*0.04) + (T*0.6)</span>
        </li>
      </ul>

      {/* <p className={css.explanation}>
        <span className={css.explanation1}>*</span>
        <strong>V</strong> is the volume of the water norm in liters per day,{" "}
        <strong>M</strong> is your body weight, <strong>T</strong> is the time
        of active sports, or another type of activity commensurate in terms of
        loads (in the absence of these, you must set 0).
      </p> */}
      <p className={css.explanation}>
        <span className={css.explanation1}>*</span>
        {t("modals.countVolume")}
      </p>

      <h2 className={css.subheading}>{t("modals.calculate")}</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <fieldset className={css.fieldset}>
          <label className={css.labelRadio}>
            <input
              type="radio"
              name="gender"
              value="girl"
              onChange={() => setGender("girl")}
              defaultChecked
            />{" "}
            {t("modals.forWoman")}
          </label>
          <label className={css.labelRadio}>
            <input
              type="radio"
              name="gender"
              value="man"
              onChange={() => setGender("man")}
            />{" "}
            {t("modals.forMan")}
          </label>
        </fieldset>
        <label className={css.label}>
          {t("modals.yourWeight")}:
          <input
            type="number"
            placeholder={t("modals.weight")}
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
              calculateWaterRate();
            }}
            className={css.input}
            min={0}
          />
        </label>

        <label className={css.label}>
          {t("modals.yourActivities")}:
          <input
            type="number"
            placeholder={t("modals.activity")}
            value={activityTime}
            onChange={(e) => {
              setActivityTime(e.target.value);
              calculateWaterRate();
            }}
            className={css.input}
            min={0}
            max={24}
          />
        </label>
        <div className={css.resultContainer}>
          <p className={css.result}>{t("modals.require")}:</p>
          <span className={css.waterAmount}>
            {toLiters(woterAmountForCalculet)} {t("stats.l")}
          </span>
        </div>
        <h2 className={css.subheading1}>{t("modals.writeDown")}</h2>
        <label className={css.label}>
          <input
            type="number"
            name="dailyIntake"
            placeholder={t("modals.waterIn")}
            className={css.input}
            defaultValue={toLiters(waterAmount)}
            onChange={handleWaterChange}
            min={0.5}
            step={0.01}
          />
        </label>
        <button type="submit" className={css.saveButton}>
          {t("modals.save")}
        </button>
      </form>
    </div>
  );
};
