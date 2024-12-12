import { SignUpForm } from "../../components/SignUpForm/SignUpForm.jsx";
import "../../index.css";
import styles from "./SignUpPage.module.css";
export const SignUpPage = () => {
  return (
    <section className={styles.signUp}>
      <div className="container">
              <h3>Sign Up</h3>
              <img className="bottle" src="/images/SignIn/SignUp/mob-signup-bottle-1x.png" alt="Bottle" />
        <SignUpForm/>
      </div>
    </section>
  );
};
