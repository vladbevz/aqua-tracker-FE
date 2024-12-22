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
  outdatedPassword: Yup.string(),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .when("outdatedPassword", {
      is: (outdatedPassword) => !!outdatedPassword,
      then: (schema) =>
        schema.required(
          "New password is required if outdated password is provided!"
        ),
    }),
  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match!")
    .when("newPassword", {
      is: (newPassword) => !!newPassword,
      then: (schema) => schema.required("Please confirm your new password!"),
    }),
});

export const SettingUser = ({ onCancel }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const initialValues = {
    avatar: user.avatarUrl || "",
    gender: user.gender || "woman",
    username: user.name || "",
    email: user.email || "",
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  // Avatar
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatarUrl || "images/noAvatar/no-avatar.png"
  );

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      const formData = new FormData();
      formData.append("avatarUrl", file);

      try {
        await dispatch(updateUser(formData)).unwrap();
      } catch (error) {
        console.error("Error updating avatar: ", error);
      }
    }
  };

  const handleClick = () => {
    document.getElementById("avatarInput").click();
  };

  // Password management
  const [showPassword, setShowPassword] = useState({
    outdatedPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const handleToggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const usernameFieldId = useId();
  const emailFieldId = useId();
  // const outdatedPasswordFieldId = useId();
  // const newPasswordFieldId = useId();
  // const repeatNewPasswordFieldId = useId();

  const handleSubmit = async (values, actions) => {
    const { avatar, gender, username, email, outdatedPassword, newPassword } =
      values;

    const formData = new FormData();
    if (avatar && typeof avatar !== "string") {
      formData.append("avatarUrl", avatar);
    }
    if (gender !== initialValues.gender) {
      formData.append("gender", gender);
    }
    formData.append("name", username);
    formData.append("email", email);

    if (outdatedPassword && newPassword) {
      formData.append("outdatedPassword", outdatedPassword);
      formData.append("newPassword", newPassword);
    } else if (newPassword && !outdatedPassword) {
      console.error("Outdated password is required to set a new password.");
      return;
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
                />
                <HiOutlineArrowUpTray className={css.arrowUpIcon} />
                <span className={css.avatarUploadText}>Upload a photo</span>
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
                    name="gender"
                    value="female"
                    id="pickedWoman"
                  />
                  <p className={css.genderText}>Woman</p>
                </label>
                <label className={css.genderLabelWrap} htmlFor="pickedMan">
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
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
                id={emailFieldId}
              />
            </div>

            <div className={css.passwordWrap}>
              <h2 className={css.title}>Password</h2>

              {["outdatedPassword", "newPassword", "repeatNewPassword"].map(
                (field) => (
                  <div key={field}>
                    <label className={css.passwordLabel} htmlFor={field}>
                      {field === "outdatedPassword"
                        ? "Outdated password:"
                        : field === "newPassword"
                        ? "New password:"
                        : "Repeat new password:"}
                    </label>
                    <div className={css.passwordInputWrap}>
                      <Field
                        className={css.passwordInput}
                        type={showPassword[field] ? "text" : "password"}
                        name={field}
                        placeholder="Password"
                        id={field}
                      />
                      <button
                        className={css.showPasswordEyeBtn}
                        type="button"
                        onClick={() => handleToggleShowPassword(field)}
                      >
                        {showPassword[field] ? (
                          <HiOutlineEye className={css.passwordIcon} />
                        ) : (
                          <HiOutlineEyeOff className={css.passwordIcon} />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      className={css.errorMessage}
                      name={field}
                      component="span"
                    />
                  </div>
                )
              )}
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
