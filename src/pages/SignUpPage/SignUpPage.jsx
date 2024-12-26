import { SignUpForm } from "../../components/SignUpForm/SignUpForm.jsx";
import styles from "./SignUpPage.module.css";

export default function SignInPage() {

  return (
    <section className={styles.signUp}>
      <SignUpForm />
      <img
        className={styles.bottle}
        // src={"/images/SignUp/mob-bottle-1x.png"}
        alt="Bottle"
        style={{ width: "100%", height: "auto" }}
      />
    </section>
  );
}
