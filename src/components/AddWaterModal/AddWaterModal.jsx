import { Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { IoCloseOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

import "react-datepicker/dist/react-datepicker.css";
import css from "./AddWaterModal.module.css";

import { addTodayWater } from "../../redux/todayWaterList/operations";

export const AddWaterModal = ({ closeModal }) => {
  const [counter, setCounter] = useState(50);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    const water = counter;
    if (water < 50 || water > 5000) {
      toast.error(t("error.waterRangeError"));
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

    try {
      await dispatch(addTodayWater(payload)).unwrap();
      toast.success(t("notification.addwater"));
      closeModal();
    } catch (error) {
      toast.error(error);
    }
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
        <h1 className={css.title}>{t("modals.addHeader")}</h1>
        <button className={css.closeBtn} onClick={closeModal}>
          <IoCloseOutline className={css.closeBtnIcon} />
        </button>
      </div>
      <h2 className={css.subtitle}>{t("modals.addText")}</h2>
      <p className={css.text}>{t("modals.amount")}</p>
      <div className={css.counterContainer}>
        <button className={css.counterBtn} onClick={decrement}>
          <IoRemoveOutline className={css.counterBtnIcon} />
        </button>
        <p className={css.counterInput}>
          {counter}
          {t("stats.ml")}
        </p>
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
              {t("modals.recordingTime")}:
              <DatePicker
                selected={values.time}
                onChange={(date) => setFieldValue("time", date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                timeCaption={t("modals.timeCaption")}
                className={css.inputTime}
                name="time"
              />
            </label>
            <h2 className={css.subtitleSecond}>{t("modals.enterValue")}</h2>
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
              <p className={css.counterText}>
                {counter}
                {t("stats.ml")}
              </p>
              <button type="submit" className={css.saveBtn}>
                {t("modals.save")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
