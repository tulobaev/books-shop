import HomePage from "../components/pages/HomePage";
import DetailsPage from "../components/details/DetailsPage";
import Contact from "../components/pages/Contact";

export const links = [
  {
    link: "/",
    element: <HomePage />,
    title: "Башкы бет",
  },
  {
    link: "/contacts",
    element: <Contact />,
    title: "Байланыш",
  },
  {
    link: "/details",
    element: <DetailsPage />,
    title: "",
  },
];
