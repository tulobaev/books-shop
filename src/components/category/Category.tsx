import { useEffect, useState } from "react";
import scss from "./Category.module.scss";

interface CategoryType {
  id: number;
  category_name: string;
}

interface Props {
  categories: CategoryType[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const Category: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <div className={scss.content_category}>
      <h1>Категориялар</h1>
      <div className={scss.category}>
        {isLoading
          ? new Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={scss.skeleton_category_item}></div>
              ))
          : categories.map((category) => (
              <div
                key={category.id}
                onClick={() => onSelect(category.category_name)}
                className={
                  selectedCategory === category.category_name
                    ? `${scss.category_item} ${scss.active}`
                    : scss.category_item
                }
              >
                <p>{category.category_name}</p>
              </div>
            ))}

        <button
          onClick={() => onSelect("")}
          className={`${scss.poppular_button} ${
            selectedCategory === "" ? scss.active : ""
          }`}
        >
          <p>Популярдуу китептер</p>
          <img
            width="38"
            height="38"
            src="https://img.icons8.com/color/48/books.png"
            alt="books"
          />
        </button>
      </div>
    </div>
  );
};

export default Category;
