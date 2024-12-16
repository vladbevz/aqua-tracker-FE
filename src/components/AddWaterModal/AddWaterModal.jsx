import { Field, Form, Formik } from "formik";
import css from "./AddWaterModal.module.css";
import { IoCloseOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { number } from "yup";
export const AddWaterModal = ({ closeModal }) => {
  return (
    <div className={css.container}>
      <div className={css.head}>
        <h1 className={css.title}>Add water</h1>
        <button className={css.closeBtn} onClick={closeModal}>
          <IoCloseOutline className={css.closeBtnIcon} />
        </button>
      </div>
      <h2 className={css.subtitle}>Choose a value:</h2>
      <p className={css.text}>Amount of water</p>
      <div className={css.counterContainer}>
        <button className={css.counterBtn}>
          <IoRemoveOutline className={css.counterBtnIcon} />
        </button>
        <input type="number" className={css.counterInput} />
        <button className={css.counterBtn}>
          <IoAddOutline className={css.counterBtnIcon} />
        </button>
      </div>
      <Formik>
        <Form className={css.form}>
          <label className={css.label}>
            Recording time:
            <Field type="time" className={css.input} />
          </label>
          <h2 className={css.subtitle}>Enter the value of the water used:</h2>
          <label className={css.label}>
            <Field type="number" className={css.input} placeholder="50" />
          </label>
          <p className={css.counterText}>50ml</p>
          <button type="submit" className={css.saveBtn}>
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};
