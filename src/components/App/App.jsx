import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage/LoginPage.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>} />
      <Route path="/register" element={<h2>RegisterPage</h2>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<h2>UserPage</h2>} />
    </Routes>
  );
};
