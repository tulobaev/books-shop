import { Route, Routes } from "react-router-dom";
import { links } from "./constants/Link";
import ScrollToTop from "./components/avtoScroll/AvtoScroll";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {links.map((item, index) => (
          <Route path={item.link} element={item.element} key={index} />
        ))}
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
