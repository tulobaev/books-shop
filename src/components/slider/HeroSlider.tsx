import { useState, useEffect, useRef } from "react";
import styles from "./HeroSlider.module.scss";
import backgroundImage from "../../assets/photo_2025-04-19_17-37-19.jpg";
import backgroundImage2 from "../../assets/photo_2025-04-20_17-06-52.jpg";
import backgroundImage3 from "../../assets/photo_2025-04-22_17-05-50.jpg";

interface SlideItem {
  id: number;
  imageUrl: string;
  title: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderContainer = useRef<HTMLDivElement>(null);
  const sliderTimer = useRef<number | null>(null);

  const sliderItems: SlideItem[] = [
    {
      id: 2,
      imageUrl: `${backgroundImage2}`,
      title: "Китептер - акыл-эстин перзенти",
    },
    {
      id: 1,
      imageUrl: `${backgroundImage}`,
      title: "",
    },
    {
      id: 3,
      imageUrl: `${backgroundImage3}`,
      title: "Бул китептерди онлайн оку",
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

      setTimeout(() => setAutoSlide(true), 4000);
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
    setTimeout(() => setAutoSlide(true), 4000);
  };

  useEffect(() => {
    if (autoSlide) {
      sliderTimer.current = window.setInterval(nextSlide, 4000);
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
            className={`${styles.slide} ${
              slide.imageUrl === backgroundImage ? styles.narrowSlide : ""
            }`}
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundPosition: "center",
              backgroundSize:
                slide.imageUrl === backgroundImage ? "contain" : "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2>{slide.title}</h2>
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
