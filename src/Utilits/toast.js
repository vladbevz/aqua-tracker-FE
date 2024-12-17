import axios from "axios";
import { toast } from "react-hot-toast";
// import { store } from './../redux/store';
// import { changeLoadStatus } from "../redux/utils/slice";

// Create axios example
const axiosToast = axios.create({
  timeout: 10000,
});

const setLoading = (type) => {
  // store.dispatch(changeLoadStatus(type));
  return type;
};

const showLoader = () => {
  setLoading(true);
};

const hideLoader = () => {
  setLoading(false);
};

// Показ повідомлення про успіх
const showSuccessMessage = (message) => {
  toast.success(message || "Success!");
};

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
    showErrorMessage(error.message);
    return Promise.reject(error);
  }
);

// Додаємо перехоплювач відповідей
axiosToast.interceptors.response.use(
  (response) => {
    hideLoader(); // Приховуємо лоадер після відповіді
    showSuccessMessage(response?.data?.message);
    return response;
  },
  (error) => {
    hideLoader(); // Приховуємо лоадер навіть при помилці
    const errorMessage = error.response?.data?.message || error.message;
    showErrorMessage(errorMessage);
    return Promise.reject(error);
  }
);

export default axiosToast;
