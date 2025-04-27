import { FC, useEffect, useState } from "react";
import scss from "./HomePage.module.scss";
import HeroSlider from "../slider/HeroSlider";
import Popular from "../poppular/Popular";
import Category from "../category/Category";
import BookList from "../bookList/BookList";
import { useAppSelector } from "../../store/Store";
import axios from "axios";

interface ICategoryType {
  id: number;
  category_name: string;
}

const HomePage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [category, setCategory] = useState<ICategoryType[]>([]);
  const { data } = useAppSelector((s) => s.data);

  const filteredBooks = selectedCategory
    ? data?.filter(
        (book) => book.category?.category_name === selectedCategory
      ) || []
    : data || [];
  console.log(data);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryApi = await axios.get("/api/category/");
        setCategory(categoryApi.data);
      } catch (error) {
        console.log("Ошибка при получении данных:", error);
      }
    };

    fetchCategory();
  }, []);

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
              {!selectedCategory && <Popular />}
              <BookList
                books={filteredBooks}
                selectedCategory={selectedCategory}
              />
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
