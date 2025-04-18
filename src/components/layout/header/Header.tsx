import { FC } from "react";
import scss from "./Header.module.scss";

const Header: FC = () => {
  return (
    <section className={scss.Header}>
      <div className="container">
        <div className={scss.content}>Header</div>
      </div>
    </section>
  );
};

export default Header;
