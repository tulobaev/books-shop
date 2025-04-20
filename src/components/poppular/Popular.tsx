import { FC } from "react";
import scss from "./Popular.module.scss";

const Popular: FC = () => {
  return (
    <section id={scss.Popular}>
      <div className="container">
        <h1>Популярные книги</h1>
        <div className={scss.content_box}>
          <div className={scss.scrollableContent}>
            <div className={scss.content_cards}>
              <img
                src="https://skazkiwsem.fun/wp-content/uploads/2017/11/1-1.jpg"
                alt=""
              />
              <div className={scss.text}>
                <h2>
                  <span>Avtor:</span> А.А. Беляев, И.Н. Цыбуля, Н.Н. Осипова, У.
                  Э. Мамбетакунов, Л.А. Самыкбаева
                </h2>
                <p>
                  Бурчтун трисектрисасын сызгыч жана циркульдун жардамы менен
                  түзүү. Циркуль жана сызгычтын жардамы менен кубду эки
                  эселентуу.
                </p>
                <span>«2025»</span>
              </div>
            </div>
            <div className={scss.content_cards}>
              <img
                src="https://skazkiwsem.fun/wp-content/uploads/2017/11/1-1.jpg"
                alt=""
              />
              <div className={scss.text}>
                <h2>
                  <span>Avtor:</span> А.А. Беляев, И.Н. Цыбуля, Н.Н. Осипова, У.
                  Э. Мамбетакунов, Л.А. Самыкбаева
                </h2>
                <p>
                  Бурчтун трисектрисасын сызгыч жана циркульдун жардамы менен
                  түзүү. Циркуль жана сызгычтын жардамы менен кубду эки
                  эселентуу.
                </p>
                <span>«2025»</span>
              </div>
            </div>
            <div className={scss.content_cards}>
              <img
                src="https://skazkiwsem.fun/wp-content/uploads/2017/11/1-1.jpg"
                alt=""
              />
              <div className={scss.text}>
                <h2>
                  <span>Avtor:</span> А.А. Беляев, И.Н. Цыбуля, Н.Н. Осипова, У.
                  Э. Мамбетакунов, Л.А. Самыкбаева
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
