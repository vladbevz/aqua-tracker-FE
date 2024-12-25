import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
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
      <h2 className={css.title}>{t("notFoundPage.title")}</h2>
      <button className={css.btn}>
        <Link to="/">{t("notFoundPage.backToHome")}</Link>
      </button>
    </div>
  );
}
