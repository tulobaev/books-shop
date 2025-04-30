import { FC, useState } from "react";
import scss from "./HomePage.module.scss";
import HeroSlider from "../slider/HeroSlider";
import Category from "../category/Category";
import BookList from "../bookList/BookList";
import AllBooks from "../allBooks/AllBooks";
import Popular from "../poppular/Popular";
import {
  useGetCategoriesQuery,
  useGetPopularBooksQuery,
  useGetProductQuery,
} from "../../store/api/book";
import { IBook } from "../../types";

const HomePage: FC = () => {
  const { data: allBooks = [], isLoading: booksLoading } = useGetProductQuery();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: popularBooks = [], isLoading: popularLoading } =
    useGetPopularBooksQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredBooks =
    selectedCategory === "all"
      ? allBooks
      : selectedCategory === "popular"
      ? popularBooks
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

            {booksLoading || categoriesLoading || popularLoading ? (
              <p>Жүктөлүүдө...</p>
            ) : selectedCategory === "all" ? (
              <AllBooks books={allBooks} />
            ) : selectedCategory === "popular" ? (
              <Popular books={popularBooks} />
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
