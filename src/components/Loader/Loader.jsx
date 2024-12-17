import { Audio } from "react-loader-spinner";
import css from "./Loader.module.css";
import { selectLoadStatus } from "../../redux/utils/selector";
import { useSelector } from "react-redux";


export const Loader = () => {

   const show = useSelector(selectLoadStatus);

   if (show) { return null }

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
