import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Этот компонент будет прокручивать страницу на верх каждый раз, когда изменяется маршрут.
const ScrollTo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // будет срабатывать при изменении пути

  return null; // не рендерит ничего
};

export default ScrollTo;
