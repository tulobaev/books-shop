import { FC, useEffect, useState } from "react";
import scss from "./HomePage.module.scss";
import HeroSlider from "../slider/HeroSlider";
import Category from "../category/Category";
import BookList from "../bookList/BookList";
import { useAppSelector } from "../../store/Store";
import axios from "axios";
import AllBooks from "../allBooks/AllBooks";
import Popular from "../poppular/Popular";

interface ICategoryType {
  id: number;
  category_name: string;
}

// Временные популярные книги
interface Book {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
}

const popular: Book[] = new Array(20).fill(0).map((_, i) => ({
  id: i + 1,
  book_name: `Книга ${i + 1}`,
  book_image:
    "https://abali.ru/wp-content/uploads/2012/01/staraya_oblozhka_knigi.jpg",
  description: `Поэзия о жизни и любви. a a a a a a a a a a aa  aa a aa a a a ${
    i + 1
  }`,
  publication_year: 2025,
}));

const HomePage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [category, setCategory] = useState<ICategoryType[]>([]);
  const { data: allBooks } = useAppSelector((s) => s.data);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryApi = await axios.get("/api/category/");
        setCategory(categoryApi.data);
      } catch (error) {
        console.error("Ошибка при получении категорий:", error);
      }
    };
    fetchCategory();
    setPopularBooks(popular);
  }, []);

  const filteredBooks =
    selectedCategory === "all"
      ? allBooks || []
      : selectedCategory === "popular"
      ? popularBooks || []
      : allBooks?.filter(
          (book) => book.category?.category_name === selectedCategory
        ) || [];

  return (
    <section className={scss.HomePage}>
      <div className="container">
        <div className={scss.box}>
          <div className={scss.category_block}>
            <Category
              categories={category}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <div className={scss.content}>
            <HeroSlider />
            <div className={scss.category_block_mobile}>
              <Category
                categories={category}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            <>
              {selectedCategory === "all" ? (
                <AllBooks />
              ) : selectedCategory === "popular" ? (
                <Popular />
              ) : (
                <BookList
                  books={filteredBooks}
                  selectedCategory={selectedCategory}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
