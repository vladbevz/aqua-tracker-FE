import { Routes, Route } from "react-router-dom";
import { SignInPage } from "../../pages/SignInPage/SignInPage.jsx";
import { WelcomePage } from "../../pages/WelcomePage/WelcomePage.jsx";
import { Header } from "../Header/Header.jsx";
import "..//..//index.css";
export const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<h2>SignUpPage</h2>} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<h2>HomePage</h2>} />
      </Routes>
    </div>
  );
};
