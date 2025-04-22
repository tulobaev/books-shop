import scss from "./Category.module.scss";

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const Category: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => (
  <div className={scss.content_category}>
    <h1>Категориялар</h1>
    <div className={scss.category}>
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => onSelect(category)}
          className={
            selectedCategory === category
              ? `${scss.category_item} ${scss.active}`
              : scss.category_item
          }
        >
          <p>{category}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Category;
