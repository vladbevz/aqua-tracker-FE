import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import css from "./SignInForm.module.css";
import { useState } from "react";
const initialValues = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={{}}
        validationSchema={inputSchema}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Enter your email
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className={css.field}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={css.errorMessage}
            />
          </label>
          <label className={css.label}>
            Enter your password
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={css.field}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.eyeBtn}
            >
              {showPassword ? (
                <HiOutlineEye className={css.pwdIcons} />
              ) : (
                <HiOutlineEyeOff className={css.pwdIcons} />
              )}
            </button>
            <ErrorMessage
              name="password"
              component="span"
              className={css.errorMessage}
            />
          </label>
          <button className={css.btn} type="submit">
            Sign In
          </button>
        </Form>
      </Formik>
      <a>Sign up</a>
    </div>
  );
};
