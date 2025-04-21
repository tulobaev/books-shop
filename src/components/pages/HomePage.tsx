import { FC, useState, useEffect } from "react";
import scss from "./HomePage.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HeroSlider from "../slider/HeroSlider";
import Category, { categories } from "../category/Category";
import Popular from "../poppular/Popular";
import { useNavigate } from "react-router-dom";

const exampleBooks = [
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги adadas a aa aa daad  aad a  a ad dsadad aa `,
    year: 2023,
    categories: ["Математика, Логика"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги a dad asd  dda asda  asdasd aa  a adddaadada asdasad`,
    year: 2023,
    categories: ["Физика, техника"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Кыргыз тили жана адабияты"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Орус тили жана адабияты"],
  },
];

const HomePage: FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleButtons, setVisibleButtons] = useState<{
    [key: string]: { left: boolean; right: boolean };
  }>({});
  const navigate = useNavigate();

  const handleMouseDown = (e: React.MouseEvent, categoryId: string) => {
    setIsDragging(true);
    setStartX(e.clientX);
    const container = document.getElementById(categoryId);
    if (container) setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent, categoryId: string) => {
    if (!isDragging) return;
    const container = document.getElementById(categoryId);
    if (container) {
      const moveDistance = e.clientX - startX;
      container.scrollLeft = scrollLeft - moveDistance;
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const checkScrollButtons = (categoryId: string) => {
    const container = document.getElementById(categoryId);
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setVisibleButtons((prev) => ({
        ...prev,
        [categoryId]: {
          left: scrollLeft > 0,
          right: scrollLeft + clientWidth < scrollWidth - 1,
        },
      }));
    }
  };

  useEffect(() => {
    categories.forEach((index) => {
      const scroll = `scroll-${index}`;
      checkScrollButtons(scroll);
    });
  }, []);

  return (
    <section className={scss.HomePage}>
      <div className="container">
        <div className={scss.box}>
          <div className={scss.content}>
            <HeroSlider />
            <Popular />
            {categories.map((category, index) => {
              const categoryId = `scroll-${index}`;
              return (
                <div key={index} className={scss.category_block}>
                  <div className={scss.h1}>
                    <h2 className={scss.category_title}>{category}</h2>
                    <a href="/">''Баардык китептер''</a>
                  </div>
                  <div className={scss.scroll_wrapper}>
                    {visibleButtons[categoryId]?.left && (
                      <button
                        className={`${scss.scroll_button} ${scss.left}`}
                        onClick={() => {
                          const container = document.getElementById(categoryId);
                          if (container) {
                            container.scrollBy({
                              left: -300,
                              behavior: "smooth",
                            });
                            setTimeout(
                              () => checkScrollButtons(categoryId),
                              300
                            );
                          }
                        }}
                      >
                        <IoIosArrowBack />
                      </button>
                    )}

                    <div
                      id={categoryId}
                      className={scss.content_cards}
                      onMouseDown={(e) => handleMouseDown(e, categoryId)}
                      onMouseMove={(e) => handleMouseMove(e, categoryId)}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onScroll={() => checkScrollButtons(categoryId)}
                    >
                      {exampleBooks
                        .filter((item) => item.categories.includes(category))
                        .map((item, idx) => (
                          <div
                            onClick={() => navigate("/details")}
                            className={scss.cards}
                            key={idx}
                          >
                            <img
                              src={item.img}
                              alt={item.title}
                              className={scss.card_image}
                            />
                            <div className={scss.text}>
                              <h2>{item.title}</h2>
                              <p>
                                {item.desc} - <span>{item.year}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>

                    {visibleButtons[categoryId]?.right && (
                      <button
                        className={`${scss.scroll_button} ${scss.right}`}
                        onClick={() => {
                          const container = document.getElementById(categoryId);
                          if (container) {
                            container.scrollBy({
                              left: 300,
                              behavior: "smooth",
                            });
                            setTimeout(
                              () => checkScrollButtons(categoryId),
                              300
                            );
                          }
                        }}
                      >
                        <IoIosArrowForward />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Category />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
