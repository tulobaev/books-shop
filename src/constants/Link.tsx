import HomePage from "../components/pages/HomePage";
import MenuPage from "../components/pages/MenuPage";

export const links = [
  {
    link: "/",
    element: <HomePage />,
    title: "Башкы бет",
  },
  {
    link: "/menu",
    element: <MenuPage />,
    title: "Сайттын максаты",
  },
  {
    link: "/",
    element: "",
    title: "Байланыш",
  },
];
