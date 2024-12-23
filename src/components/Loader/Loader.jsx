import { Puff } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <Puff
        visible={true}
        height="100"
        width="100"
        color="#407bff"
        ariaLabel="puff-loading"
      />
    </div>
  );
};
