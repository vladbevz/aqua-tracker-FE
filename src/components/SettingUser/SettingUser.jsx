import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { selectUser } from "../../redux/auth/selectors";
import { updateUser } from "../../redux/auth/operations";
import css from "./SettingUser.module.css";
import toast from "react-hot-toast";

export const SettingUser = ({ onCancel }) => {
  const { t } = useTranslation();
  const SettingSchema = Yup.object()
    .shape({
      email: Yup.string()
        .email(t("validationMessages.email"))
        .required(t("validationMessages.required")),
      outdatedPassword: Yup.string(),
      newPassword: Yup.string()
        .min(8, t("validationMessages.newPassword"))
        .when("outdatedPassword", {
          is: (outdatedPassword) => !!outdatedPassword,
          then: (schema) =>
            schema.required(t("validationMessages.newPasswordRequired")),
        }),
      repeatNewPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword"), null],
          t("validationMessages.repeatNewPassword")
        )
        .when("newPassword", {
          is: (newPassword) => !!newPassword,
          then: (schema) =>
            schema.required(t("validationMessages.repeatNewPasswordRequired")),
        }),
    })
    .test(
      "passwords-set-without-outdated",
      t("validationMessages.outdatedPassword"),
      function (values) {
        const { outdatedPassword, newPassword, repeatNewPassword } = values;
        if ((newPassword || repeatNewPassword) && !outdatedPassword) {
          return this.createError({
            path: "outdatedPassword",
            message: t("validationMessages.outdatedPassword"),
          });
        }
        return true;
      }
    );

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
        toast.success(t("notification.avatar"));
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleClick = () => {
    document.getElementById("avatarInput").click();
  };

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
    const { gender, username, email, outdatedPassword, newPassword } = values;
    const formData = new FormData();
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
      toast.success(t("notification.update"));
      actions.resetForm();
      onCancel();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.headerWrap}>
        <h1 className={css.header}>{t("modals.setting")}</h1>
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
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <div className={css.photoWrap}>
              <h2 className={css.title}>{t("modals.uploadPhoto")}</h2>
              <div className={css.avatarWrap} onClick={handleClick}>
                <img
                  className={css.avatar}
                  src={avatarPreview}
                  alt="User avatar"
                />
                <HiOutlineArrowUpTray className={css.arrowUpIcon} />
                <span className={css.avatarUploadText}>
                  {t("modals.uploadPhoto")}
                </span>
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
                  <h2 className={css.title}>{t("modals.gender")}</h2>
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
                      <p className={css.genderText}>{t("modals.woman")}</p>
                    </label>
                    <label className={css.genderLabelWrap} htmlFor="pickedMan">
                      <Field
                        type="radio"
                        name="gender"
                        value="man"
                        id="pickedMan"
                      />
                      <p className={css.genderText}>{t("modals.man")}</p>
                    </label>
                  </div>
                </div>

                <div className={css.credentialsWrap}>
                  <label
                    className={css.credentialsLabel}
                    htmlFor={usernameFieldId}
                  >
                    {t("modals.name")}
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
                    {t("modals.email")}
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
                <h2 className={css.title}>{t("modals.pass")}</h2>

                <label
                  className={css.passwordLabel}
                  htmlFor={outdatedPasswordFieldId}
                >
                  {t("modals.outDatePass")}:
                </label>
                <div
                  className={`${css.passwordInputWrap} ${
                    errors.outdatedPassword && touched.outdatedPassword
                      ? css.errorBorder
                      : ""
                  }`}
                >
                  <Field
                    className={css.passwordInput}
                    type={showPassword.outdatedPassword ? "text" : "password"}
                    name="outdatedPassword"
                    placeholder={t("modals.outDatePass")}
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
                  {t("modals.newPass")}:
                </label>
                <div
                  className={`${css.passwordInputWrap} ${
                    errors.newPassword && touched.newPassword
                      ? css.errorBorder
                      : ""
                  }`}
                >
                  <Field
                    className={css.passwordInput}
                    type={showPassword.newPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder={t("modals.newPass")}
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
                  {t("modals.repNewPass")}:
                </label>
                <div
                  className={`${css.passwordInputWrap} ${
                    errors.repeatNewPassword && touched.repeatNewPassword
                      ? css.errorBorder
                      : ""
                  }`}
                >
                  <Field
                    className={css.passwordInput}
                    type={showPassword.repeatNewPassword ? "text" : "password"}
                    name="repeatNewPassword"
                    placeholder={t("modals.repNewPass")}
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
              {t("modals.save")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
