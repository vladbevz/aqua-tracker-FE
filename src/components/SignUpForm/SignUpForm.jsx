import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import styles from "./SignUpForm.module.css";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleSubmit = (values, actions) => {
  //   dispatch(
  //     register({
  //       email: values.email,
  //       password: values.password,
  //     })
  //   );
  //   actions.resetForm();
  // };
  const handleSubmit = async (values, actions) => {
    try {
      actions.resetForm();
      const response = await dispatch(
        register({
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      toast.success(`Welcome, ${response.data.user.email}!`, {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  };

  const inputSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Sign Up</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={inputSchema}
      >
        {({ errors, touched }) => (
          <Form className={styles.form} autoComplete="off">
            <label className={styles.label}>
              Enter your email
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className={`${styles.field} ${
                  errors.email && touched.email ? styles.errorField : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.errorMessage}
              />
            </label>
            <label className={styles.label}>
              Enter your password
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`${styles.field} ${
                  errors.password && touched.password ? styles.errorField : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.eyeBtn}
              >
                {showPassword ? (
                  <HiOutlineEye className={styles.pwdIcons} />
                ) : (
                  <HiOutlineEyeOff className={styles.pwdIcons} />
                )}
              </button>
              <ErrorMessage
                name="password"
                component="span"
                className={styles.errorMessage}
              />
            </label>
            <label className={styles.label}>
              Repeat password
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repeat password"
                className={`${styles.field} ${
                  errors.confirmPassword && touched.confirmPassword
                    ? styles.errorField
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className={styles.eyeBtn}
              >
                {showConfirmPassword ? (
                  <HiOutlineEye className={styles.pwdIcons} />
                ) : (
                  <HiOutlineEyeOff className={styles.pwdIcons} />
                )}
              </button>
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className={styles.errorMessage}
              />
            </label>
            <button className={styles.btn} type="submit">
              Sign Up
            </button>
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
