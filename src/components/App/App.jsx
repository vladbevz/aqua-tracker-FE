import { Routes, Route, useLocation } from "react-router";
import { Suspense, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Loader } from "../Loader/Loader.jsx";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { SharedLayout } from "../SharedLayout/SharedLayout.jsx";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage.jsx"));
const WelcomePage = lazy(() =>
  import("../../pages/WelcomePage/WelcomePage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <>
      <b>Please wait, updating user info...</b>
      <Loader />
    </>
  ) : (
    <SharedLayout>
      <Suspense fallback={null}>
        <Toaster reverseOrder={false} />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute component={<SignUpPage />} redirectTo="/home" />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute component={<SignInPage />} redirectTo="/home" />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/signin" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
};
