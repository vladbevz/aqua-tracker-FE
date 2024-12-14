import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
// import * as Yup from "yup";
import { useState, useId } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

import css from "./SettingUser.module.css";

// const SettingSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(2, "Too short!")
//     .max(50, "Too long!")
//     .required("Required"),
//   email: Yup.string().email("Must be a valid email!").required("Required"),
// });

const initialValues = {
  avatar: "",
  picked: "Woman",
  username: "",
  email: "",
  outdatedPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

const AvatarUpload = () => {
  const { setFieldValue } = useFormikContext();
  const [avatarPreview, setAvatarPreview] = useState(
    "images/noAvatar/no-avatar.png"
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setFieldValue("avatar", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById("avatarInput").click();
  };

  return (
    <div className={css.photoWrap}>
      <h2 className={css.title}>Your photo</h2>
      <div className={css.avatarWrap} onClick={handleClick}>
        <img className={css.avatar} src={avatarPreview} alt="User avatar" />
        <HiOutlineArrowUpTray className={css.arrowUpIcon} />
        <span className={css.avatarUploadText}>Upload a photo</span>
        <Field
          type="file"
          name="avatar"
          id="avatarInput"
          className={css.avatarHiddenInput}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export const SettingUser = () => {
  const [showPassword, setShowPassword] = useState({
    outdatedPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const [passwordValues, setPasswordValues] = useState({
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const handleToggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordValues((prevState) => ({ ...prevState, [field]: value }));
  };

  const usernameFieldId = useId();
  const emailFieldId = useId();
  const outdatedPasswordFieldId = useId();
  const newPasswordFieldId = useId();
  const repeatNewPasswordFieldId = useId();

  const handleClose = (evt) => {
    console.log(evt);
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    setPasswordValues({
      outdatedPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    });
  };

  return (
    <div className={css.container}>
      <div className={css.headerWrap}>
        <h1 className={css.header}>Setting</h1>
        <button className={css.closeBtn} onClick={handleClose}>
          <IoCloseOutline className={css.closeIcon} />
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={SettingSchema}
      >
        <Form>
          <AvatarUpload />

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

            <label className={css.credentialsLabel} htmlFor={emailFieldId}>
              E-mail
            </label>
            <Field
              className={css.credentialsInput}
              type="email"
              name="email"
              id={emailFieldId}
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
                type={showPassword.outdatedPassword ? "text" : "password"}
                name="outdatedPassword"
                placeholder="Password"
                id={outdatedPasswordFieldId}
                value={passwordValues.outdatedPassword}
                onChange={(evt) =>
                  handlePasswordChange("outdatedPassword", evt.target.value)
                }
              />
              {passwordValues.outdatedPassword && (
                <button
                  className={css.showPasswordEyeBtn}
                  type="button"
                  onClick={() => handleToggleShowPassword("outdatedPassword")}
                >
                  {showPassword.outdatedPassword ? (
                    <HiOutlineEye className={css.passwordIcon} />
                  ) : (
                    <HiOutlineEyeOff className={css.passwordIcon} />
                  )}
                </button>
              )}
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
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Password"
                id={newPasswordFieldId}
                value={passwordValues.newPassword}
                onChange={(evt) =>
                  handlePasswordChange("newPassword", evt.target.value)
                }
              />
              {passwordValues.newPassword && (
                <button
                  className={css.showPasswordEyeBtn}
                  type="button"
                  onClick={() => handleToggleShowPassword("newPassword")}
                >
                  {showPassword.newPassword ? (
                    <HiOutlineEye className={css.passwordIcon} />
                  ) : (
                    <HiOutlineEyeOff className={css.passwordIcon} />
                  )}
                </button>
              )}
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
                type={showPassword.repeatNewPassword ? "text" : "password"}
                name="repeatNewPassword"
                placeholder="Password"
                id={repeatNewPasswordFieldId}
                value={passwordValues.repeatNewPassword}
                onChange={(evt) =>
                  handlePasswordChange("repeatNewPassword", evt.target.value)
                }
              />
              {passwordValues.repeatNewPassword && (
                <button
                  className={css.showPasswordEyeBtn}
                  type="button"
                  onClick={() => handleToggleShowPassword("repeatNewPassword")}
                >
                  {showPassword.repeatNewPassword ? (
                    <HiOutlineEye className={css.passwordIcon} />
                  ) : (
                    <HiOutlineEyeOff className={css.passwordIcon} />
                  )}
                </button>
              )}
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
