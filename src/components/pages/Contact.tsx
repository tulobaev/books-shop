import { FC } from "react";
import scss from "./Contact.module.scss";

const Contact: FC = () => {
  return (
    <section className={scss.Contact}>
      <div className="container">
        <div className={scss.content}>Contact</div>
      </div>
    </section>
  );
};

export default Contact;
