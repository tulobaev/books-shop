import { FC, useCallback, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./BookCards.module.scss";
import { IBook } from "../../types";

interface BookCardsProps {
  book: IBook;
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
  }, [book.id, onClick, navigate]);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const imageUrl = book.book_image || "/images/default-book.jpg";

  return (
    <article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={scss.cards}
      role="button"
      tabIndex={0}
      aria-label={`Китеп: ${book.book_name}`}
    >
      <div className={scss.imageContainer}>
        <img
          src={imageUrl}
          alt={`"${book.book_name}" китебинин мукабасы`}
          className={scss.bookImage}
        />
      </div>
      <div className={scss.text}>
        <h2 className={scss.title}>{book.book_name}</h2>
        {book.category?.category_name && (
          <span className={scss.category}>{book.category.category_name}</span>
        )}
        <p className={scss.description}>{book.description}</p>
        <span className={scss.year}>{book.publication_year}</span>
      </div>
    </article>
  );
};

export default BookCards;
