import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useId } from "react";

import { selectUser } from "../../redux/auth/selectors";

import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/auth/operations";

import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

import css from "./SettingUser.module.css";

const SettingSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  newPassword: Yup.string().min(8, "Password must be at least 8 characters!"),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match!"
  ),
});

export const SettingUser = ({ onCancel }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const initialValues = {
    avatar: user.avatarUrl || "",
    picked: "Woman",
    username: user.name || "",
    email: user.email || "",
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  //avatar
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatarUrl || "images/noAvatar/no-avatar.png"
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      const formData = new FormData();
      formData.append("avatarUrl", file);

      try {
        setIsUploading(true);
        await dispatch(updateUser(formData)).unwrap();
      } catch (error) {
        console.error("Error updating avatar: ", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleClick = () => {
    document.getElementById("avatarInput").click();
  };

  //user data
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

  const handleSubmit = async (values, actions) => {
    const { avatar, username, email, newPassword } = values;
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    if (avatar && typeof avatar !== "string") {
      formData.append("avatarUrl", avatar);
    }
    if (newPassword) {
      formData.append("password", newPassword);
    }

    try {
      await dispatch(updateUser(formData)).unwrap();
      actions.resetForm();
      onCancel();
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.headerWrap}>
        <h1 className={css.header}>Setting</h1>
        <button className={css.closeBtn} onClick={onCancel}>
          <IoCloseOutline className={css.closeIcon} />
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SettingSchema}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form>
            <div className={css.photoWrap}>
              <h2 className={css.title}>Your photo</h2>
              <div className={css.avatarWrap} onClick={handleClick}>
                <img
                  className={css.avatar}
                  src={avatarPreview}
                  alt="User avatar"
                  aria-busy={isUploading}
                />
                {isUploading ? (
                  <span>Uploading...</span>
                ) : (
                  <>
                    <HiOutlineArrowUpTray className={css.arrowUpIcon} />
                    <span className={css.avatarUploadText}>Upload a photo</span>
                  </>
                )}
                <input
                  type="file"
                  id="avatarInput"
                  className={css.avatarHiddenInput}
                  accept="image/*"
                  onChange={(e) => {
                    setFieldValue("avatar", e.target.files[0]);
                    handleFileChange(e);
                  }}
                />
              </div>
            </div>

            <div className={css.genderWrap}>
              <h2 className={css.title}>Your gender identity</h2>
              <div className={css.genderRadioWrap}>
                <label className={css.genderLabelWrap} htmlFor="pickedWoman">
                  <Field
                    type="radio"
                    name="picked"
                    value="Woman"
                    id="pickedWoman"
                  />
                  <p className={css.genderText}>Woman</p>
                </label>
                <label className={css.genderLabelWrap} htmlFor="pickedMan">
                  <Field
                    type="radio"
                    name="picked"
                    value="Man"
                    id="pickedMan"
                  />
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
                placeholder="User's email"
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
                    aria-label={
                      showPassword.outdatedPassword
                        ? "Hide outdated password"
                        : "Show outdated password"
                    }
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
                    aria-label={
                      showPassword.newPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
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
                    onClick={() =>
                      handleToggleShowPassword("repeatNewPassword")
                    }
                    aria-label={
                      showPassword.repeatNewPassword
                        ? "Hide repeat password"
                        : "Show repeat password"
                    }
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
        )}
      </Formik>
    </div>
  );
};
