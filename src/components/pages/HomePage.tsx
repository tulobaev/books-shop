import { FC } from "react";
import scss from "./HomePage.module.scss";

const categories = [
  "Бизнес-книги",
  "Боевики, остросюжетная литература",
  "Детективы",
  "Детские книги",
  "Зарубежная литература",
  "aaaaa",
];

const exampleBooks = [
  {
    img: "https://cdn.litres.ru/pub/c/cover_415/71299771.webp",
    title: "Ахметов Сапарбай",
    desc: `Агартуу Ааламы " илимий-усулдук электрондук журнал`,
    year: 2023,
    categories: ["Бизнес-книги", "Зарубежная литература"],
  },
  {
    img: "https://cdn.litres.ru/pub/c/cover_415/71299771.webp",
    title: "Ахметов Сапарбай",
    desc: `Агартуу Ааламы " илимий-усулдукффффффффффффффффф электрондук журнал`,
    year: 2023,
    categories: ["Боевики, остросюжетная литература"],
  },
  {
    img: "https://cdn.litres.ru/pub/c/cover_415/71299771.webp",
    title: "Ахметов Сапарбай",
    desc: `Агартуу Ааламы " илимий-усулдук эыыыыыыыыыыыыыыыыыыыыыыыыыыылектрондук журнал`,
    year: 2023,
    categories: ["Детективы"],
  },
  {
    img: "https://cdn.litres.ru/pub/c/cover_415/71299771.webp",
    title: "Ахметов Сапарбай",
    desc: `Агартуу Ааламы " илимий-усулдук эыыыыыыыыыыыыыыыыыыыыыыыыыыылектрондук журнал`,
    year: 2023,
    categories: ["aaaaa"],
  },
  {
    img: "https://cdn.litres.ru/pub/c/cover_415/71299771.webp",
    title: "Ахметов Сапарбай",
    desc: `Агартуу Ааламы " илимий-усулдук эыыыыыыыыыыыыыыыыыыыыыыыыыыылектрондук журнал`,
    year: 2023,
    categories: ["Детективы"],
  },
  {
    img: "https://cdn.litres.ru/pub/c/cover_415/71299771.webp",
    title: "Ахметов Сапарбай",
    desc: `Агартуу Ааламы " илимий-усййййййййййййййййййййййййййййййййулдук электрондук журнал`,
    year: 2023,
    categories: ["Детские книги"],
  },
];

const HomePage: FC = () => {
  return (
    <section className={scss.HomePage}>
      <div className="container">
        <div className={scss.box}>
          <div className={scss.content}>
            {categories.map((category, index) => (
              <div key={index} className={scss.category_block}>
                <h2 className={scss.category_title}>{category}</h2>
                <div className={scss.content_cards}>
                  {exampleBooks
                    .filter((item) => item.categories.includes(category))
                    .map((item, index) => (
                      <div className={scss.cards} key={index}>
                        <img
                          src={item.img}
                          alt="image"
                          className={scss.card_image}
                        />
                        <div className={scss.text}>
                          <h2>{item.title}</h2>
                          <p>
                            {item.desc} - <span>{item.year}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className={scss.content_category}>
            <h1>Категории</h1>
            <div className={scss.category}>
              {categories.map((category, index) => (
                <div key={index}>
                  <p>{category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
