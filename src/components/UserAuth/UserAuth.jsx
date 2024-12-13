import css from "./UserAuth.module.css";
import UserLogo from "../UserLogo/UserLogo";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

const logedIn = true;

export const UserAuth = () => {
  // const logedIn = useSelector(selectIsLoggedIn)
  return (
    <div className={css.container}>
      {logedIn ? (
        <>
          {/* <p>User</p>
          <img src="" alt="avatar" /> */}
        <UserLogo/>
        </>
      ) : (
        <a href="">Sign In</a>
      )}
    </div>
  );
};
