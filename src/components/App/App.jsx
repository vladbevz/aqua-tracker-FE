import { Routes, Route } from "react-router-dom";
import { SignInPage } from "../../pages/SignInPage/SignInPage.jsx";
import { SignUpPage } from "../../pages/SignUpPage/SignUpPage.jsx";
import { WelcomePage } from "../../pages/WelcomePage/WelcomePage.jsx";
import { Header } from "../Header/Header.jsx";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage.jsx";
import { TestModal } from "../testModal.jsx";

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<TestModal />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
