import { LoginForm } from "../../components/LoginForm/LoginForm.jsx";
import "../../index.css";
import css from "./LoginPage.module.css";
export const LoginPage = () => {
  return (
    <section className={css.signUp}>
      <div className="container">
        <h3>Sign In</h3>
        <LoginForm />
      </div>
    </section>
  );
};
