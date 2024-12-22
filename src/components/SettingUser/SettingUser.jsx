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
import toast from "react-hot-toast";

const SettingSchema = Yup.object()
  .shape({
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
  })
  .test(
    "passwords-set-without-outdated",
    "Outdated password is required to set a new password.",
    function (values) {
      const { outdatedPassword, newPassword, repeatNewPassword } = values;
      if ((newPassword || repeatNewPassword) && !outdatedPassword) {
        return this.createError({
          path: "outdatedPassword",
          message: "Outdated password is required to set a new password.",
        });
      }
      return true;
    }
  );

export const SettingUser = ({ onCancel }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const initialValues = {
    avatar: user.avatarUrl || "",
    gender: user.gender,
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
        toast.success("Avatar successfully changed!");
      } catch (error) {
        toast.error(error);
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
  const outdatedPasswordFieldId = useId();
  const newPasswordFieldId = useId();
  const repeatNewPasswordFieldId = useId();

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
      return;
    }

    try {
      await dispatch(updateUser(formData)).unwrap();
      toast.success("Your data has been successfully changed");
      actions.resetForm();
      onCancel();
    } catch (error) {
      toast.error(error);
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
            <div className={css.flexContainer1}>
              <div>
                <div className={css.genderWrap}>
                  <h2 className={css.title}>Your gender identity</h2>
                  <div className={css.genderRadioWrap}>
                    <label
                      className={css.genderLabelWrap}
                      htmlFor="pickedWoman"
                    >
                      <Field
                        type="radio"
                        name="gender"
                        value="woman"
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
                  <label
                    className={css.credentialsLabel}
                    htmlFor={usernameFieldId}
                  >
                    Your name
                  </label>
                  <Field
                    className={css.credentialsInput}
                    type="text"
                    name="username"
                    id={usernameFieldId}
                  />

                  <label
                    className={css.credentialsLabel}
                    htmlFor={emailFieldId}
                  >
                    E-mail
                  </label>
                  <Field
                    className={css.credentialsInput}
                    type="email"
                    name="email"
                    id={emailFieldId}
                  />
                </div>
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
                  />
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
                </div>
                <ErrorMessage
                  className={css.errorMessage}
                  name="outdatedPassword"
                  component="span"
                />

                <label
                  className={css.passwordLabel}
                  htmlFor={newPasswordFieldId}
                >
                  New password:
                </label>
                <div className={css.passwordInputWrap}>
                  <Field
                    className={css.passwordInput}
                    type={showPassword.newPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Password"
                    id={newPasswordFieldId}
                  />
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
                  />
                  <button
                    className={css.showPasswordEyeBtn}
                    type="button"
                    onClick={() =>
                      handleToggleShowPassword("repeatNewPassword")
                    }
                  >
                    {showPassword.repeatNewPassword ? (
                      <HiOutlineEye className={css.passwordIcon} />
                    ) : (
                      <HiOutlineEyeOff className={css.passwordIcon} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className={css.errorMessage}
                  name="repeatNewPassword"
                  component="span"
                />
              </div>
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
