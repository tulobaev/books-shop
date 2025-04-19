import { useState, useEffect, useRef } from "react";
import styles from "./HeroSlider.module.scss";

interface SlideItem {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderContainer = useRef<HTMLDivElement>(null);
  const sliderTimer = useRef<number | null>(null);

  // Данные для слайдов с URL изображений
  const sliderItems: SlideItem[] = [
    {
      id: 1,
      title: "Популярные книги",
      text: "Книги, которые понравились нашим читателям",
      imageUrl:
        "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
    },
    {
      id: 2,
      title: "Новые поступления",
      text: "Свежие издания этого месяца",
      imageUrl: "/images/new-arrivals.jpg",
    },
    {
      id: 3,
      title: "Скидки недели",
      text: "Специальные предложения и акции",
      imageUrl: "/images/weekly-discounts.jpg",
    },
  ];

  const mouseDownHandler = (e: React.MouseEvent) => {
    setDragging(true);
    setStartPosition(e.clientX);
    if (sliderContainer.current) {
      setScrollPosition(sliderContainer.current.scrollLeft);
      setAutoSlide(false);
    }
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!dragging) return;
    if (sliderContainer.current) {
      const moveDistance = e.clientX - startPosition;
      sliderContainer.current.scrollLeft = scrollPosition - moveDistance;
    }
  };

  const mouseUpHandler = () => {
    setDragging(false);
    if (sliderContainer.current) {
      const width = sliderContainer.current.clientWidth;
      const newSlide = Math.round(sliderContainer.current.scrollLeft / width);

      setCurrentSlide(newSlide);
      sliderContainer.current.scrollTo({
        left: newSlide * width,
        behavior: "smooth",
      });

      setTimeout(() => setAutoSlide(true), 3000);
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % sliderItems.length;
    setCurrentSlide(next);

    if (sliderContainer.current) {
      sliderContainer.current.scrollTo({
        left: next * sliderContainer.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (sliderContainer.current) {
      sliderContainer.current.scrollTo({
        left: index * sliderContainer.current.clientWidth,
        behavior: "smooth",
      });
    }
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 3000);
  };

  useEffect(() => {
    if (autoSlide) {
      sliderTimer.current = window.setInterval(nextSlide, 3000);
    }
    return () => {
      if (sliderTimer.current) {
        window.clearInterval(sliderTimer.current);
      }
    };
  }, [autoSlide, currentSlide]);

  useEffect(() => {
    const handleResize = () => {
      if (sliderContainer.current) {
        sliderContainer.current.scrollTo({
          left: currentSlide * sliderContainer.current.clientWidth,
          behavior: "auto",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  return (
    <div className={styles.slider}>
      <div
        ref={sliderContainer}
        className={styles.sliderContainer}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
        onMouseLeave={mouseUpHandler}
      >
        {sliderItems.map((slide) => (
          <div
            key={slide.id}
            className={styles.slide}
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className={styles.slideContent}>
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {sliderItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.dot} ${
              currentSlide === index ? styles.active : ""
            }`}
          />
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={() =>
          goToSlide(
            (currentSlide - 1 + sliderItems.length) % sliderItems.length
          )
        }
      >
        &#10094;
      </button>
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={() => goToSlide((currentSlide + 1) % sliderItems.length)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default HeroSlider;
