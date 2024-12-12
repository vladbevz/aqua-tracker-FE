import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SignUpForm.module.css";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const inputSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={{}}
        validationSchema={inputSchema}
      >
        <Form className={styles.form} autoComplete="off">
          <label className={styles.label}>
            Enter your email
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.errorMessage}
            />
          </label>
          <label className={styles.label}>
            Enter your password
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.errorMessage}
            />
          </label>
          <label className={styles.label}>
            Confirm Password
            <Field type="password" name="confirmPassword" />
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className={styles.errorMessage}
            />
          </label>
          <button className={styles.btn} type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
      <a>Sign In</a>
    </div>
  );
};