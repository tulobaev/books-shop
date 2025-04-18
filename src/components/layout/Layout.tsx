import { FC, ReactNode } from "react";
import scss from "./Layout.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ReduxProvider from "../../providers/ReduxProvider";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <div className={scss.layout}>
        <Header />
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </ReduxProvider>
  );
};

export default Layout;
