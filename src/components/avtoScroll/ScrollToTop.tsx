import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 10);
  }, [pathname]);

  return null;
};

export default ScrollTo;
