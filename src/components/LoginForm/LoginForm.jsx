import { Formik, Form, Field } from "formik";
import css from "./LoginForm.module.css";

export const LoginForm = () => {
  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={{}}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Email
            <Field type="email" name="email" />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" />
          </label>
          <button className={css.btn} type="submit">
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};
