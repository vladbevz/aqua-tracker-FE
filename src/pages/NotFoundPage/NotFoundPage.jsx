import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.errorCode}>
        404
        <span className={css.imageWrapper}>
          <img
            src="/images/NotFound/notfound-boutle.png"
            alt="bottle"
            className={css.bottle}
          />
        </span>
      </h1>
      <h2 className={css.title}>The page you requested could not be found.</h2>
      <button className={css.btn}>
        <Link to="/">Back to home</Link>
      </button>
    </div>
  );
}
