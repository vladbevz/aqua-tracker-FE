import { Field, Form, Formik } from "formik";
import css from "./AddWaterModal.module.css";
import { IoCloseOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
export const AddWaterModal = ({ closeModal }) => {
  return (
    <div className={css.container}>
      <div className={css.head}>
        <h1 className={css.title}>Add water</h1>
        <button className={css.closeBtn} onClick={closeModal}>
          <IoCloseOutline lassName={css.closeBtnIcon} />
        </button>
      </div>
      <p>Amount of water</p>
      <div>
        <button>
          <IoRemoveOutline />
        </button>
        <p>50ml</p>
        <button>
          <IoAddOutline />
        </button>
      </div>
      <Formik>
        <Form>
          <label>
            Recording time:
            <Field type="time" />
          </label>
          <h2>Enter the value of the water used:</h2>
          <label>
            <Field type="number" />
          </label>
          <p>50ml</p>
          <button>Save</button>
        </Form>
      </Formik>
    </div>
  );
};
