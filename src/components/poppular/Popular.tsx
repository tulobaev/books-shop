import { FC } from "react";
import scss from "./Popular.module.scss";

const Popular: FC = () => {
  return (
    <section id={scss.Popular}>
      <div className="container">
        <h1>Популярдуу китептер</h1>
        <div className={scss.content_box}>
          <div className={scss.scrollableContent}>
            <div className={scss.content_cards}>
              <img src="" alt="iamge" />
              <div className={scss.text}>
                <h2>
                  А.А. Беляев, И.Н. Цыбуля, Н.Н. Осипова, У. Э. Мамбетакунов,
                  Л.А. Самыкбаева
                </h2>
                <p>
                  Бурчтун трисектрисасын сызгыч жана циркульдун жардамы менен
                  түзүү. Циркуль жана сызгычтын жардамы менен кубду эки
                  эселентуу.
                </p>
                <span>«2025»</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
