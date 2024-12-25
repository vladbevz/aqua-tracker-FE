import css from "./Header.module.css";
import { Logo } from "../Logo/Logo.jsx";
import { UserAuth } from "../UserAuth/UserAuth.jsx";
import "../../index.css";

export default function Header() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <UserAuth />
      </header>
    </div>
  );
}
