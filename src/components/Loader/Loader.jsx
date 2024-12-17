import { Audio } from "react-loader-spinner";
import css from "./Loader.module.css";


export const Loader = () => {

  return (
    <div className={css.loaderContainer}>
      <Audio
        height="100"
        width="100"
        color="#407BFF"
        ariaLabel="audio-loading"
      />
    </div>
  );
};
