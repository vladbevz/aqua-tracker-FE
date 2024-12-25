import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { Suspense } from "react";

export default function SharedLayout({ children }) {
  const location = useLocation();
  const hideHeader = !["/", "/signup", "/signin", "/home"].includes(
    location.pathname
  );
  return (
    <Suspense>
      {!hideHeader && <Header />}
      {children}
    </Suspense>
  );
}
