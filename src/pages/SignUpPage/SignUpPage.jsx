import { SignUpForm } from "../../components/SignUpForm/SignUpForm.jsx";
import "../../index.css";
import css from "./SignUpPage.module.css";
export const SignUpPage = () => {
  return (
    <section className={css.signUp}>
      <div className="container">
        <h3>Sign Up</h3>
        <SignUpForm/>
      </div>
    </section>
  );
};
