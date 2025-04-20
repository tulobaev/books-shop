import { FC } from "react";
import scss from "./Category.module.scss";

const categories = [
  "Боевики, остросюжетная литература",
  "Детские книги",
  "Зарубежная литература",
];

const Category: FC = () => {
  return (
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
  );
};

export default Category;
