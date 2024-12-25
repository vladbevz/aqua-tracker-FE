import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import styles from "./SignUpForm.module.css";
import { useTranslation } from "react-i18next";
const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await dispatch(
        register({
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      toast.success(
        `${t("signUpForm.welcomeMessage")}, ${response.data.user.email}`,
        {
          position: "top-center",
        }
      );

      actions.resetForm();
    } catch (error) {
      if (error.includes("Bad Request")) {
        toast.error(t("signUpForm.invalidEmail"), {
          position: "top-center",
        });
      } else if (error.includes("Email")) {
        toast.error(t("signUpForm.emailExists"), {
          position: "top-center",
        });
      } else {
        toast.error(error, {
          position: "top-center",
        });
      }
    }
  };

  const inputSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("signUpForm.invalidEmail"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("signUpForm.invalidEmail")
      )
      .required(t("signUpForm.emailRequired")),

    password: Yup.string()
      .min(8, t("signUpForm.passwordLength"))
      .max(20, t("signUpForm.passwordLength"))
      .required(t("signUpForm.passwordRequired")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("signUpForm.confirmPasswordError"))
      .required(t("signUpForm.confirmPasswordRequired")),
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t("signUpForm.title")}</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={inputSchema}
      >
        {({ errors, touched }) => (
          <Form className={styles.form} autoComplete="off">
            <label className={styles.label}>
              {t("signUpForm.emailLabel")}
              <Field
                type="email"
                name="email"
                placeholder={t("signUpForm.emailPlaceholder")}
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
              {t("signUpForm.passwordLabel")}
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("signUpForm.passwordPlaceholder")}
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
              {t("signUpForm.confirmPasswordLabel")}
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder={t("signUpForm.confirmPasswordPlaceholder")}
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
              {t("signUpForm.signUpButton")}
            </button>
            <Link to="/signin" className={styles.link}>
              {t("signUpForm.signInLink")}
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
