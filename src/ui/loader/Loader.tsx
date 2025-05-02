import { FC } from "react";
import scss from "./Loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={scss.spinner_container}>
      <div className={scss.spinner}></div>
    </div>
  );
};

export default Loader;
