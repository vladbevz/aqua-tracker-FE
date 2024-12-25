import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { selectUser } from "../../redux/auth/selectors";
import css from "./DailyNormaModal.module.css";
import "../../index.css";
import { updateUser } from "../../redux/auth/operations";

export const DailyNormaModal = ({ closeModal }) => {
  const { daylyNorm } = useSelector(selectUser);

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
      toast.error("Weight and activity time must be non-negative numbers.");
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
      toast.error("The water intake must be between 0.5 and 15 liters.");
      return;
    }
    try {
      await dispatch(updateUser({ daylyNorm: waterAmount })).unwrap();
      toast.success("Successfully daily intake saved!");
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
        <h1 className={css.title}>My daily norma</h1>
        <button onClick={closeModal} className={css.closeButton}>
          <IoCloseOutline className={css.closeButton} />
        </button>
      </div>

      <ul className={css.normaList}>
        <li className={css.normaItem}>
          For girl:
          <span className={css.normaSpan}> V=(M*0.03) + (T*0.4)</span>
        </li>
        <li className={css.normaItem}>
          For man:
          <span className={css.normaSpan}> V=(M*0.04) + (T*0.6)</span>
        </li>
      </ul>

      <p className={css.explanation}>
        <span className={css.explanation1}>*</span>
        <strong>V</strong> is the volume of the water norm in liters per day,{" "}
        <strong>M</strong> is your body weight, <strong>T</strong> is the time
        of active sports, or another type of activity commensurate in terms of
        loads (in the absence of these, you must set 0).
      </p>

      <h2 className={css.subheading}>Calculate your rate:</h2>
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
            For women
          </label>
          <label className={css.labelRadio}>
            <input
              type="radio"
              name="gender"
              value="man"
              onChange={() => setGender("man")}
            />{" "}
            For men
          </label>
        </fieldset>
        <label className={css.label}>
          Your weight in kilograms:
          <input
            type="number"
            placeholder="Enter your weight"
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
          The time of active participation in sports or other activities with a
          high physical. load in hours:
          <input
            type="number"
            placeholder="Enter activity time"
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
          <p className={css.result}>
            The required amount of water in liters per day:
          </p>
          <span className={css.waterAmount}>
            {toLiters(woterAmountForCalculet)} L
          </span>
        </div>
        <h2 className={css.subheading1}>
          Write down how much water you will drink:
        </h2>
        <label className={css.label}>
          <input
            type="number"
            name="dailyIntake"
            placeholder="Enter amount in liters"
            className={css.input}
            defaultValue={toLiters(waterAmount)}
            onChange={handleWaterChange}
            min={0.5}
            step={0.01}
          />
        </label>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
      </form>
    </div>
  );
};
