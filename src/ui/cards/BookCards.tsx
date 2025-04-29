import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./BookCards.module.scss";

interface Book {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
  category?: {
    category_name: string;
  }; // Added optional category
}

interface BookCardsProps {
  book: Book;
  onClick?: (bookId: number) => void;
}

const BookCards: FC<BookCardsProps> = ({ book, onClick }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(book.id);
    } else {
      navigate(`/details/${book.id}`);
    }
  }, [book.id, navigate, onClick]);

  const imageUrl = book.book_image || "/images/default-book.jpg";
  return (
    <article
      onClick={handleClick}
      className={scss.cards}
      aria-label={`Book: ${book.book_name}`}
      role="button"
      tabIndex={0}
    >
      <div className={scss.imageContainer}>
        <img
          src={imageUrl}
          alt={`Cover of ${book.book_name}`}
          className={scss.bookImage}
        />
      </div>
      <div className={scss.text}>
        <h2 className={scss.title}>{book.book_name}</h2>
        {book.category && (
          <span className={scss.category}>{book.category.category_name}</span>
        )}
        <p className={scss.description}>{book.description}</p>
        <span className={scss.year}>{book.publication_year}</span>
      </div>
    </article>
  );
};

export default BookCards;
