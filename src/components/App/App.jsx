import { Routes, Route } from "react-router";
import { HomePage } from "../../pages/HomePage/HomePage.jsx";
import { Suspense, useEffect } from "react";
import { SignInPage } from "../../pages/SignInPage/SignInPage.jsx";
import { SignUpPage } from "../../pages/SignUpPage/SignUpPage.jsx";
import { WelcomePage } from "../../pages/WelcomePage/WelcomePage.jsx";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage.jsx";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { SharedLayout } from "../SharedLayout/SharedLayout.jsx";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  //TODO: add some loader when refreshing process is
  return isRefreshing ? (
    <b>Please wait, updating user info...</b>
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
