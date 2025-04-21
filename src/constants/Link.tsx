import HomePage from "../components/pages/HomePage";
import DetailsPage from "../components/details/DetailsPage";

export const links = [
  {
    link: "/",
    element: <HomePage />,
    title: "Башкы бет",
  },
  {
    link: "/menu",
    element: "",
    title: "Сайттын максаты",
  },
  {
    link: "/contacts",
    element: "",
    title: "Байланыш",
  },
  {
    link: "/details",
    element: <DetailsPage />,
    title: "",
  },
];
