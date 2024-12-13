import { Formik, Form, Field } from "formik";
import { useId } from "react";
import { IoCloseOutline } from "react-icons/io5";

const initialValues = {
  avatar: "",
  picked: "",
  username: "",
  email: "",
  outdatedPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

export const SettingUser = ({onCancel}) => {
  const usernameFieldId = useId();
  const emailFieldId = useId();
  const outdatedPasswordFielId = useId();
  const newPasswordFielId = useId();
  const repeatNewPasswordFielId = useId();

  const handleSubmit = (values, actions) => {
    actions.resetForm();
  };

  return (
    <div>
      <div>
        <h1>Setting</h1>
        <button type="button" onClick={onCancel}>
          <IoCloseOutline />
        </button>
      </div>

      <Formik initialValues={{ initialValues }} onSubmit={handleSubmit}>
        <Form>
          <div>
            <h2>Your photo</h2>
            <label htmlFor="avatar">
              Upload a photo
              <Field type="file" name="avatar" />
            </label>
          </div>

          <div>
            <h2>Your gender identity</h2>
            <label htmlFor="picked">
              <Field type="radio" name="picked" checked={true} value="Woman" />
              Woman
            </label>
            <label htmlFor="picked">
              <Field type="radio" name="picked" value="Man" />
              Man
            </label>
          </div>

          <div>
            <h2>Your name</h2>
            <label htmlFor={usernameFieldId}></label>
            <Field type="text" name="username" id={usernameFieldId} />

            <h2>E-mail</h2>
            <label htmlFor={emailFieldId}></label>
            <Field type="email" name="email" id={emailFieldId} />
          </div>

          <div>
            <h2>Password</h2>
            <label htmlFor={outdatedPasswordFielId}>Outdated password:</label>
            <Field
              type="password"
              name="outdatedPassword"
              placeholder="Password"
              id={outdatedPasswordFielId}
            />

            <label htmlFor={newPasswordFielId}>New password:</label>
            <Field
              type="password"
              name="newPassword"
              placeholder="Password"
              id={newPasswordFielId}
            />

            <label htmlFor={repeatNewPasswordFielId}>
              Repeat new password:
            </label>
            <Field
              type="password"
              name="repeatNewPassword"
              placeholder="Password"
              id={repeatNewPasswordFielId}
            />
          </div>

          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
};
