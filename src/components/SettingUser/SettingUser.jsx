import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

import css from "./SettingUser.module.css";

const SettingSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
});

const initialValues = {
  avatar: "",
  picked: "Woman",
  username: "",
  email: "",
  outdatedPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

export const SettingUser = () => {
  const usernameFieldId = useId();
  const emailFieldId = useId();
  const outdatedPasswordFieldId = useId();
  const newPasswordFieldId = useId();
  const repeatNewPasswordFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.headerWrap}>
        <h1 className={css.header}>Setting</h1>
        <button className={css.closeBtn}>
          <IoCloseOutline className={css.closeIcon} />
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SettingSchema}
      >
        <Form>
          <div className={css.photoWrap}>
            <h2 className={css.title}>Your photo</h2>
            <div className={css.avatarWrap}>
              <img
                className={css.avatar}
                src="images/noAvatar/no-avatar.png"
                alt="avatar"
              />
              <HiOutlineArrowUpTray className={css.arrowUpIcon} />
              <label htmlFor="avatar">
                Upload a photo
                <Field type="file" name="avatar" />
              </label>
            </div>
          </div>

          <div className={css.genderWrap}>
            <h2 className={css.title}>Your gender identity</h2>
            <div className={css.genderRadioWrap}>
              <label className={css.genderLabelWrap} htmlFor="picked">
                <Field type="radio" name="picked" value="Woman" />
                <p className={css.genderText}>Woman</p>
              </label>
              <label className={css.genderLabelWrap} htmlFor="picked">
                <Field type="radio" name="picked" value="Man" />
                <p className={css.genderText}>Man</p>
              </label>
            </div>
          </div>

          <div className={css.credentialsWrap}>
            <label className={css.credentialsLabel} htmlFor={usernameFieldId}>
              Your name
            </label>
            <Field
              className={css.credentialsInput}
              type="text"
              name="username"
              id={usernameFieldId}
            />
            <ErrorMessage
              className={css.errorMessage}
              name="username"
              component="span"
            />

            <label className={css.credentialsLabel} htmlFor={emailFieldId}>
              E-mail
            </label>
            <Field
              className={css.credentialsInput}
              type="email"
              name="email"
              id={emailFieldId}
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </div>

          <div className={css.passwordWrap}>
            <h2 className={css.title}>Password</h2>
            <label
              className={css.passwordLabel}
              htmlFor={outdatedPasswordFieldId}
            >
              Outdated password:
            </label>
            <div className={css.passwordInputWrap}>
              <Field
                className={css.passwordInput}
                type="password"
                name="outdatedPassword"
                placeholder="Password"
                id={outdatedPasswordFieldId}
              />
              <HiOutlineEyeOff className={css.passwordIcon} />
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="outdatedPassword"
              component="span"
            />

            <label className={css.passwordLabel} htmlFor={newPasswordFieldId}>
              New password:
            </label>
            <div className={css.passwordInputWrap}>
              <Field
                className={css.passwordInput}
                type="password"
                name="newPassword"
                placeholder="Password"
                id={newPasswordFieldId}
              />
              <HiOutlineEyeOff className={css.passwordIcon} />
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="newPassword"
              component="span"
            />

            <label
              className={css.passwordLabel}
              htmlFor={repeatNewPasswordFieldId}
            >
              Repeat new password:
            </label>
            <div className={css.passwordInputWrap}>
              <Field
                className={css.passwordInput}
                type="password"
                name="repeatNewPassword"
                placeholder="Password"
                id={repeatNewPasswordFieldId}
              />
              <HiOutlineEyeOff className={css.passwordIcon} />
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="repeatNewPassword"
              component="span"
            />
          </div>

          <button className={css.saveBtn} type="submit">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};
