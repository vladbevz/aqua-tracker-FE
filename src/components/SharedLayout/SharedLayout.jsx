import { useLocation } from "react-router-dom";
import { Header } from "../Header/Header";

export const SharedLayout = ({ children }) => {
  const location = useLocation();
  const hideHeader = !["/", "/signup", "/signin", "/home"].includes(
    location.pathname
  );
  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
};
