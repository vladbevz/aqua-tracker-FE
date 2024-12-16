import { Link } from "react-router-dom";

import css from "./NotFoundPage.module.css";

export default function NotFoundPage () {
  return (
    <div className={css.container}>
      <h1 className={css.title}>The page you requested could not be found.</h1>
      <button className={css.btn}>
        <Link to="/">Back to home</Link>
      </button>
    </div>
  );
};
