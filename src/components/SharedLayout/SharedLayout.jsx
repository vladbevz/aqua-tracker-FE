import { Header } from "../Header/Header";

export const SharedLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
