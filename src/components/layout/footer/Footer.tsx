import { FC } from "react";
import scss from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <section id={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <h1>
            Биз билимди жеткиликтүү кылуу менен, ар бир адамдын окуу, изилдөө
            жана өсүү укугун колдойбуз!
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Footer;
