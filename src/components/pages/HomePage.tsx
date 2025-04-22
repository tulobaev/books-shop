import { FC, useState } from "react";
import scss from "./HomePage.module.scss";
import HeroSlider from "../slider/HeroSlider";
import Popular from "../poppular/Popular";
import { useNavigate } from "react-router-dom";

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

const categories = [
  "Математика, Логика",
  "Физика, техника",
  "Кыргыз тили жана адабияты",
  "Орус тили жана адабияты",
  "сюда ещё добавим категори....",
];

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredBooks = exampleBooks.filter(
    (book) => book.categories.category_name === selectedCategory
  );

  return (
    <section className={scss.HomePage}>
      <div className="container">
        <div className={scss.box}>
          <div className={scss.content_category}>
            <h1>Категориялар</h1>
            <div className={scss.category}>
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
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

          <div className={scss.content}>
            <HeroSlider />

            <div className={scss.books}>
              {!selectedCategory && <Popular />}
              <h1>{selectedCategory}</h1>
              {selectedCategory && (
                <div className={scss.content_cards}>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((item, idx) => (
                      <div
                        onClick={() => navigate("/details")}
                        className={scss.cards}
                        key={idx}
                      >
                        <img
                          src={item.book_image}
                          alt={item.book_author}
                          className={scss.card_image}
                        />
                        <div className={scss.text}>
                          <h2>{item.book_author}</h2>
                          <p>
                            {item.description} -{" "}
                            <span>{item.loading_time}</span>
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Книги не найдены для категории: {selectedCategory}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
