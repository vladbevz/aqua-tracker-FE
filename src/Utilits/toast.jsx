import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "../components/Loader/Loader";

let id = null;
let loaderShowed = false;
let sucsessShowed = false;

const showLoader = () => {
  if (loaderShowed) return;
  toast(
    (to) => {
      id = to.id;
      return <Loader />;
    },
    { duration: "Infinity", type: "custom" }
  );
  loaderShowed = true;
};

const hideLoader = () => {
  if (!id) return;
  toast.dismiss(id);
  id = null;
  loaderShowed = false;
};

const showSuccess = (message) => {
  if (sucsessShowed) return;
  sucsessShowed = true;
  toast.success(message || "Successfuly!");
  setTimeout(
    () => {
      sucsessShowed = false;
    },3000
  )
};

// Create axios example
const axiosToast = axios.create({
  timeout: 10000,
});


// Показ повідомлення про помилку
const showErrorMessage = (error) => {
  toast.error(error || "Error");
};

// Додаємо перехоплювач запитів
axiosToast.interceptors.request.use(
  (config) => {
    showLoader(); // Показуємо лоадер перед запитом
    return config;
  },
  (error) => {
    hideLoader(); // Приховуємо лоадер у випадку помилки запиту
    const errorMessage = error.response?.data?.data?.message || error.message;
    showErrorMessage(errorMessage);
    return Promise.reject(error);
  }
);

// Додаємо перехоплювач відповідей
axiosToast.interceptors.response.use(
  (response) => {
    hideLoader(); // Приховуємо лоадер після відповіді
    showSuccess();
    return response;
  },
  (error) => {
    hideLoader(); // Приховуємо лоадер навіть при помилці
    const errorMessage = error.response?.data?.data?.message || error.message;
    showErrorMessage(errorMessage);
    return Promise.reject(error);
  }
);

export default axiosToast;
