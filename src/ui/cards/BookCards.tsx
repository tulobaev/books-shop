import { FC, useCallback } from "react";
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
  }, [book.id, navigate, onClick]);

  const fixImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("http://80.242.57.16:8080")) return url;
    if (url.startsWith("http://80.242.57.16"))
      return url.replace("http://80.242.57.16", "http://80.242.57.16:8080");
    return url;
  };

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
          src={fixImageUrl(book.book_image) || ""}
          alt={`Cover of ${book.book_name}`}
          className={scss.bookImage}
        />
      </div>
      <div className={scss.text}>
        <h2 className={scss.title}>{book.book_name}</h2>
        {book.category && (
          <p className={scss.category}>{book.category.category_name}</p>
        )}
        <span className={scss.year}>{book.publication_year}</span>
      </div>
    </article>
  );
};

export default BookCards;
