import scss from "./Category.module.scss";
import { ICategory } from "../../types";

interface Props {
  categories: ICategory[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const Category: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const showAllBooksButton =
    selectedCategory !== "" && selectedCategory !== "all";

  return (
    <div className={scss.content_category}>
      <h1>Категориялар</h1>
      <div className={scss.category}>
        {categories.length === 0
          ? new Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={scss.skeleton_category_item}></div>
              ))
          : categories.map((category, index) => (
              <div
                key={index}
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
          onClick={() => onSelect("popular")}
          className={`${scss.poppular_button} ${
            selectedCategory === "popular" ? scss.active : ""
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

        {showAllBooksButton && (
          <p
            onClick={() => onSelect("all")}
            className={`${scss.category_item}`}
          >
            <p>Бпрдык китептер</p>
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
