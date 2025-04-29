import { FC, useState } from "react";
import scss from "./HomePage.module.scss";
import HeroSlider from "../slider/HeroSlider";
import Category from "../category/Category";
import BookList from "../bookList/BookList";
import AllBooks from "../allBooks/AllBooks";
import Popular from "../poppular/Popular";
import {
  useGetCategoriesQuery,
  useGetProductQuery,
} from "../../store/api/book";
import { IBook } from "../../types";

interface Category {
  id: number;
  category_name: string;
}

const popular: IBook[] = new Array(20).fill(0).map((_, i) => ({
  id: i + 1,
  book_name: `Книга ${i + 1}`,
  book_image:
    "https://abali.ru/wp-content/uploads/2012/01/staraya_oblozhka_knigi.jpg",
  description: `Поэзия о жизни и любви ${i + 1}`,
  publication_year: 2025,
}));

const HomePage: FC = () => {
  const { data: allBooks = [], isLoading: booksLoading } = useGetProductQuery();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredBooks =
    selectedCategory === "all"
      ? allBooks
      : selectedCategory === "popular"
      ? popular
      : allBooks.filter(
          (book: IBook) => book.category?.category_name === selectedCategory
        );

  return (
    <section className={scss.HomePage}>
      <div className="container">
        <div className={scss.box}>
          <div className={scss.category_block}>
            <Category
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <div className={scss.content}>
            <HeroSlider />

            <div className={scss.category_block_mobile}>
              <Category
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {booksLoading || categoriesLoading ? (
              <p>Жүктөлүүдө...</p>
            ) : selectedCategory === "all" ? (
              <AllBooks book={allBooks} />
            ) : selectedCategory === "popular" ? (
              <Popular />
            ) : (
              <BookList
                books={filteredBooks}
                selectedCategory={selectedCategory}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
