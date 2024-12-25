// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { Link } from "react-router-dom";
// import * as Yup from "yup";
// import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// import { useDispatch } from "react-redux";
// import { logIn } from "../../redux/auth/operations";
// import css from "./SignInForm.module.css";

// const initialValues = {
//   email: "",
//   password: "",
// };

// export const SignInForm = () => {
//   const dispatch = useDispatch();
//   const handleSubmit = async (values, actions) => {
//     try {
//       const response = await dispatch(logIn(values)).unwrap();

//       toast.success(
//         `Welcome back, ${response.data.user.name || response.data.user.email}!`,
//         {
//           position: "top-center",
//         }
//       );

//       actions.resetForm();
//     } catch (error) {
//       if (error === "Bad Request") {
//         toast.error("Invalid email format. Please check your input.", {
//           position: "top-center",
//         });
//       } else {
//         toast.error(error, {
//           position: "top-center",
//         });
//       }
//     }
//   };
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const inputSchema = Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email format")
//       .matches(
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         "Invalid email format"
//       )
//       .required("Email is required"),

//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .max(20, "Password must be at most 20 characters")
//       .required("Password is required"),
//   });

//   return (
//     <div className={css.container}>
//       <h3 className={css.title}>Sign In</h3>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={inputSchema}
//       >
//         {({ errors, touched }) => (
//           <Form className={css.form} autoComplete="off">
//             <label className={css.label}>
//               Enter your email
//               <Field
//                 type="email"
//                 name="email"
//                 placeholder="E-mail"
//                 className={`${css.field} ${
//                   errors.email && touched.email ? css.errorField : ""
//                 }`}
//               />
//               <ErrorMessage
//                 name="email"
//                 component="span"
//                 className={css.errorMessage}
//               />
//             </label>
//             <label className={css.label}>
//               Enter your password
//               <Field
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 className={`${css.field} ${
//                   errors.password && touched.password ? css.errorField : ""
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className={css.eyeBtn}
//               >
//                 {showPassword ? (
//                   <HiOutlineEye className={css.pwdIcons} />
//                 ) : (
//                   <HiOutlineEyeOff className={css.pwdIcons} />
//                 )}
//               </button>
//               <ErrorMessage
//                 name="password"
//                 component="span"
//                 className={css.errorMessage}
//               />
//             </label>
//             <button className={css.btn} type="submit">
//               Sign In
//             </button>
//             <Link to="/signup" className={css.link}>
//               Sign Up
//             </Link>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./SignInForm.module.css";
import { useTranslation } from "react-i18next";

const initialValues = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSubmit = async (values, actions) => {
    try {
      const response = await dispatch(logIn(values)).unwrap();

      toast.success(
        `${t("signInForm.successMessage")} ${
          response.data.user.name || response.data.user.email
        }`,
        {
          position: "top-center",
        }
      );

      actions.resetForm();
    } catch (error) {
      console.log(error);
      if (error === "Email or password invalid") {
        toast.error(t("signInForm.invalidEmail"), {
          position: "top-center",
        });
      } else {
        toast.error(t("signInForm.serverError"), {
          position: "top-center",
        });
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("signInForm.emailError"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("signInForm.emailError")
      )
      .required(t("signInForm.emailError")),

    password: Yup.string()
      .min(8, t("signInForm.passwordError"))
      .max(20, t("signInForm.passwordError"))
      .required(t("signInForm.passwordError")),
  });

  return (
    <div className={css.container}>
      <h3 className={css.title}>{t("signInForm.title")}</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={inputSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              {t("signInForm.emailLabel")}
              <Field
                type="email"
                name="email"
                placeholder={t("signInForm.emailPlaceholder")}
                className={`${css.field} ${
                  errors.email && touched.email ? css.errorField : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.errorMessage}
              />
            </label>
            <label className={css.label}>
              {t("signInForm.passwordLabel")}
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("signInForm.passwordPlaceholder")}
                className={`${css.field} ${
                  errors.password && touched.password ? css.errorField : ""
                }`}
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
              {t("signInForm.signInButton")}
            </button>
            <Link to="/signup" className={css.link}>
              {t("signInForm.signUpLink")}
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
