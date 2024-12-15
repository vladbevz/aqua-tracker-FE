import { Routes, Route } from "react-router";
import { HomePage } from "../../pages/HomePage/HomePage.jsx";
import { Suspense } from "react";
import { SignInPage } from "../../pages/SignInPage/SignInPage.jsx";
import { SignUpPage } from "../../pages/SignUpPage/SignUpPage.jsx";
import { WelcomePage } from "../../pages/WelcomePage/WelcomePage.jsx";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage.jsx";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { SharedLayout } from "../SharedLayout/SharedLayout.jsx";
import { Toaster } from "react-hot-toast";
export const App = () => {
  return (
    <SharedLayout>
      <Suspense fallback={null}>
        <Toaster position="top-right" reverseOrder={false} />
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
