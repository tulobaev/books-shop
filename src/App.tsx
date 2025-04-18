import { Route, Routes } from "react-router-dom";
import { links } from "./constants/Link";
import ReduxProvider from "./providers/ReduxProvider";

const App = () => {
  return (
    <ReduxProvider>
      <Routes>
        {links.map((item, index) => (
          <Route path={item.link} element={item.element} key={index} />
        ))}
      </Routes>
    </ReduxProvider>
  );
};

export default App;
