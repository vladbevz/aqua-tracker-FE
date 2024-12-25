// import { useLocation } from "react-router-dom";
// import { Header } from "../Header/Header";

// export const SharedLayout = ({ children }) => {
//   const location = useLocation();
//   const hideHeader = !["/", "/signup", "/signin", "/home"].includes(
//     location.pathname
//   );
//   return (
//     <>
//       {!hideHeader && <Header />}
//       {children}
//     </>
//   );
// };
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
