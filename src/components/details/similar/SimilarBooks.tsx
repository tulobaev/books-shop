import { FC } from "react";
import scss from "./SimilarBook.module.scss";
import { useNavigate } from "react-router-dom";

const SimilarBooks: FC = () => {
  const navigate = useNavigate();
  const books = new Array(18).fill(0).map((_, i) => ({
    id: i + 1,
    img: "https://blog.mann-ivanov-ferber.ru/wp-content/uploads/2023/06/image7-6.jpg",
    author: `Алыкул Осмонов  фвф вфыфв фвыфвф вфвфыв фвыфыв${i + 1}`,
    description: `Поэзия о жизни и любви. фвыф ыффвы  фвфы фывфы в ${i + 1}`,
    year: 2025,
  }));

  return (
    <section id={scss.similar}>
      <h1>Окшош китептер</h1>
      <div className={scss.content}>
        {books.map((book, idx) => (
          <div
            onClick={() => navigate("/details")}
            className={scss.cards}
            key={idx}
          >
            <img src={book.img} alt={book.author} />
            <div className={scss.text}>
              <h2>{book.author}</h2>
              <p>{book.description}</p>
              <span>{book.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarBooks;
