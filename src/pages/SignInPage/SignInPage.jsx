import { SignInForm } from "../../components/SignInForm/SignInForm.jsx";
import css from "./SignInPage.module.css";
export const SignInPage = () => {
  return (
    <section className={css.signIn}>
      <SignInForm />
    </section>
  );
};
