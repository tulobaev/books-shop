import { FC } from "react";
import scss from "./Category.module.scss";

export const categories = [
  "Математика, Логика",
  "Физика, техника",
  "Кыргыз тили жана адабияты",
  "Орус тили жана адабияты",
];

const Category: FC = () => {
  return (
    <div className={scss.content_category}>
      <h1>Категориялар</h1>
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
