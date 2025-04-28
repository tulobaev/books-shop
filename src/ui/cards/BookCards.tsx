import { FC } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./BookCards.module.scss";

interface Book {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
}

interface IProps {
  book: Book;
}

const BookCards: FC<IProps> = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${book.id}`)}
      className={scss.cards}
      key={book.id}
    >
      <img src={book.book_image || "/path/to/default-image.jpg"} alt="image" />
      <div className={scss.text}>
        <h2>{book.book_name}</h2>
        <p>{book.description}</p>
        <span>{book.publication_year}</span>
      </div>
    </div>
  );
};

export default BookCards;
