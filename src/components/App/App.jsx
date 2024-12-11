import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage/LoginPage.jsx";
import { SignUpPage } from "../../pages/SignUpPage/SignUpPage.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<h2>UserPage</h2>} />
    </Routes>
  );
};
