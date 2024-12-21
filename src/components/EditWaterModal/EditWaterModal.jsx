import { Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { IoCloseOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import css from "./EditWaterModal.module.css";

import { addTodayWater } from "../../redux/todayWaterList/operations";

export const EditWaterModal = ({ closeModal }) => {
  const [counter, setCounter] = useState(50);

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const water = counter;
    if (water < 50 || water > 5000) {
      toast.error("The water intake must be between 50 and 5000 milliliters.");
      return;
    }

    const formattedTime = values.time.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const payload = {
      amount: counter,
      time: formattedTime,
    };
    dispatch(addTodayWater(payload));
    closeModal();
  };

  const handleWoterChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setCounter("");
    } else {
      setCounter(Number(e.target.value));
    }
  };

  const increment = () =>
    setCounter((prev) => (prev < 5000 ? prev + 50 : prev));
  const decrement = () => setCounter((prev) => (prev > 50 ? prev - 50 : prev));

  return (
    <div className={css.container}>
      <div className={css.head}>
        <h1 className={css.title}>Edit the entered amount of water</h1>
        <button className={css.closeBtn} onClick={closeModal}>
          <IoCloseOutline className={css.closeBtnIcon} />
        </button>
      </div>
      <h2 className={css.subtitle}>Correct entered data:</h2>
      <p className={css.text}>Amount of water</p>
      <div className={css.counterContainer}>
        <button className={css.counterBtn} onClick={decrement}>
          <IoRemoveOutline className={css.counterBtnIcon} />
        </button>
        <p className={css.counterInput}>{counter}ml</p>
        <button className={css.counterBtn} onClick={increment}>
          <IoAddOutline className={css.counterBtnIcon} />
        </button>
      </div>
      <Formik
        initialValues={{
          time: new Date(),
          value: counter,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={css.form}>
            <label className={css.label}>
              Recording time:
              <DatePicker
                selected={values.time}
                onChange={(date) => setFieldValue("time", date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                dateFormat="HH:mm"
                timeCaption="Time"
                className={css.inputTime}
                name="time"
              />
            </label>
            <h2 className={css.subtitleSecond}>
              Enter the value of the water used:
            </h2>
            <label className={css.label}>
              <Field
                type="number"
                name="value"
                value={counter}
                onChange={handleWoterChange}
                className={css.inputValue}
              />
            </label>
            <div className={css.containerBottom}>
              <p className={css.counterText}>{counter}ml</p>
              <button type="submit" className={css.saveBtn}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
