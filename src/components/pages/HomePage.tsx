import { FC, useState, useEffect } from "react";
import scss from "./HomePage.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HeroSlider from "../slider/HeroSlider";

const categories = [
  "Бизнес-книги",
  "Боевики, остросюжетная литература",
  "Детективы",
  "Детские книги",
  "Зарубежная литература",
];

const exampleBooks = [
  {
    img: "",
    title: "А. А. Беляев, И. Н.",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Бизнес-книги", "Зарубежная литература"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Боевики, остросюжетная литература"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Боевики, остросюжетная литература"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Боевики, остросюжетная литература"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Боевики, остросюжетная литература"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Боевики, остросюжетная литература"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги`,
    year: 2023,
    categories: ["Боевики, остросюжетная литература"],
  },
  {
    img: "",
    title: "Ахметов Сапарбай",
    desc: `Описание книги ываы ываыва`,
    year: 2023,
    categories: ["Детективы"],
  },
  // другие книги...
];

const HomePage: FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleButtons, setVisibleButtons] = useState<{
    [key: string]: { left: boolean; right: boolean };
  }>({});

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
            {categories.map((category, index) => {
              const categoryId = `scroll-${index}`;
              return (
                <div key={index} className={scss.category_block}>
                  <div className={scss.h1}>
                    <h2 className={scss.category_title}>{category}</h2>
                    <a href="aaa">''Баардык китептер''</a>
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
                          <div className={scss.cards} key={idx}>
                            <img
                              src={item.img}
                              alt="image"
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

          <div className={scss.content_category}>
            <h1>Категории</h1>
            <div className={scss.category}>
              {categories.map((category, index) => (
                <div key={index}>
                  <p>{category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
