import { Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { IoCloseOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

import "react-datepicker/dist/react-datepicker.css";
import css from "./EditWaterModal.module.css";

import { updateTodayWater } from "../../redux/todayWaterList/operations";
import Glass from "/images/home/glass.svg";
import { createDateAsUTC } from "../../Utilits/dateTime";

export const EditWaterModal = ({ closeModal, item }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(item.amount);
  const date = new Date(item.date);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  const dateForInput = new Date(date.setHours(hours, minutes));
  const [time, setTime] = useState(dateForInput);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const water = counter;
    if (water < 50 || water > 5000) {
      toast.error(t("error.waterRangeError"));
      return;
    }
    const payload = {
      waterId: item._id,
      amount: counter,
      date: createDateAsUTC(values.time),
    };
    try {
      await dispatch(updateTodayWater(payload)).unwrap();
      toast.success(t("notification.save"));
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
        <h1 className={css.title}>{t("modals.editHeader")}</h1>{" "}
        <button className={css.closeBtn} onClick={closeModal}>
          <IoCloseOutline className={css.closeBtnIcon} />
        </button>
      </div>
      <div className={css.flex}>
        <div className={css.amountBox}>
          <img src={Glass} alt="glass" className={css.img} />
          <p className={css.amount}>
            {item.amount} {t("stats.ml")}
          </p>
        </div>
        <p className={css.time}>{formattedTime}</p>
      </div>
      <h2 className={css.subtitle}>{t("modals.editText")}</h2>
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
          time: new Date(time),
          value: counter,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={css.form}>
            <label className={css.label}>
              {t("modals.recordingTime")}
              <DatePicker
                selected={values.time}
                onChange={(date) => setTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                timeCaption="Time"
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
              <p className={css.counterText}>{counter}ml</p>
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
