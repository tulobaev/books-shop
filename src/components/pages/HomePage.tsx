import { FC, useState } from "react";
import scss from "./HomePage.module.scss";
import HeroSlider from "../slider/HeroSlider";
import Popular from "../poppular/Popular";
import Category from "../category/Category";
import BookList from "../bookList/BookList";

// Пример данных из API
const exampleBooks = [
  {
    book_image:
      "https://media.istockphoto.com/id/1180410208/vector/landscape-image-gallery-with-the-photos-stack-up.jpg",
    book_author: "Ахметов Сапарбай",
    description: "Описание книги adadas a aa aa daad  aad a  a ad dsadad aa",
    loading_time: 2023,
    categories: {
      id: 1,
      category_name: "Математика, Логика",
    },
  },
  {
    book_image:
      "https://media.istockphoto.com/id/1180410208/vector/landscape-image-gallery-with-the-photos-stack-up.jpg",
    book_author: "Ахметов Сапарбай",
    description:
      "Описание книги a dad asd  dda asda  asdasd aa  a adddaadada asdasad",
    loading_time: 2023,
    categories: {
      id: 2,
      category_name: "Физика, техника",
    },
  },
  {
    book_image:
      "https://media.istockphoto.com/id/1180410208/vector/landscape-image-gallery-with-the-photos-stack-up.jpg",
    book_author: "Ахметов Сапарбай",
    description: "Описание книги",
    loading_time: 2023,
    categories: {
      id: 3,
      category_name: "Кыргыз тили жана адабияты",
    },
  },
  {
    book_image:
      "https://media.istockphoto.com/id/1180410208/vector/landscape-image-gallery-with-the-photos-stack-up.jpg",
    book_author: "Ахметов Сапарбай",
    description: "Описание книги",
    loading_time: 2023,
    categories: {
      id: 4,
      category: "Орус тили жана адабияты",
    },
  },
];

// Пример категории из API
const categories = [
  "Математика, Логика",
  "Физика, техника",
  "Кыргыз тили жана адабияты",
  "Орус тили жана адабияты",
  "сюда ещё добавим категори....",
];

const HomePage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredBooks = exampleBooks.filter(
    (book) => book.categories.category_name === selectedCategory
  );

  return (
    <section className={scss.HomePage}>
      <div className="container">
        <div className={scss.box}>
          <Category
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className={scss.content}>
            <HeroSlider />
            {!selectedCategory && <Popular />}
            <BookList
              books={filteredBooks}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
