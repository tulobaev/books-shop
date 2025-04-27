import { FC, useEffect, useState } from "react";
import scss from "./HomePage.module.scss";
import HeroSlider from "../slider/HeroSlider";
import Popular from "../poppular/Popular";
import Category from "../category/Category";
import BookList from "../bookList/BookList";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import axios from "axios";
import { setData } from "../../store/slice/DataSlice";

// Категории книг
const categories = [
  "Математика, Логика",
  "Физика, техника",
  "Кыргыз тили жана адабияты",
  "Орус тили жана адабияты",
  "сюда ещё добавим категори....",
];

const api = import.meta.env.VITE_BASE_URL;

const HomePage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data } = useAppSelector((s) => s.data);
  const dispatch = useAppDispatch();

  const filteredBooks = selectedCategory
    ? data?.filter(
        (book) => book.category?.category_name === selectedCategory
      ) || []
    : data || [];

  const fetchData = async () => {
    const { data } = await axios.get(api);
    dispatch(setData(data.data));
  };
  useEffect(() => {
    fetchData();
  }, []);

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
