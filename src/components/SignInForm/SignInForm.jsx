// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { Link } from "react-router-dom";

// import * as Yup from "yup";
// import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logIn } from "../../redux/auth/operations";
// import css from "./SignInForm.module.css";

// const initialValues = {
//   email: "",
//   password: "",
// };

// export const SignInForm = () => {
//   const dispatch = useDispatch();
//   const handleSubmit = (values, actions) => {
//     actions.resetForm();
//     dispatch(logIn(values));
//   };
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const inputSchema = Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email format")
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
//         <Form className={css.form} autoComplete="off">
//           <label className={css.label}>
//             Enter your email
//             <Field
//               type="email"
//               name="email"
//               placeholder="E-mail"
//               className={css.field}
//             />
//             <ErrorMessage
//               name="email"
//               component="span"
//               className={css.errorMessage}
//             />
//           </label>
//           <label className={css.label}>
//             Enter your password
//             <Field
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               className={css.field}
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className={css.eyeBtn}
//             >
//               {showPassword ? (
//                 <HiOutlineEye className={css.pwdIcons} />
//               ) : (
//                 <HiOutlineEyeOff className={css.pwdIcons} />
//               )}
//             </button>
//             <ErrorMessage
//               name="password"
//               component="span"
//               className={css.errorMessage}
//             />
//           </label>
//           <button className={css.btn} type="submit">
//             Sign In
//           </button>
//           <Link to="/signup" className={css.link}>
//             Sign Up
//           </Link>
//         </Form>
//       </Formik>
//     </div>
//   );
// };
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./SignInForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    actions.resetForm();
    dispatch(logIn(values));
  };
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
    <div className={css.container}>
      <h3 className={css.title}>Sign In</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={inputSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              Enter your email
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
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
              Enter your password
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
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
              Sign In
            </button>
            <Link to="/signup" className={css.link}>
              Sign Up
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
