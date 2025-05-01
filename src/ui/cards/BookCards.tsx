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
      onKeyDown={handleKeyDown}
      className={scss.cards}
      role="button"
      tabIndex={0}
      aria-label={`Китеп: ${book.book_name}`}
    >
      <div className={scss.imageContainer}>
        <img
          src={
            fixImageUrl(book.book_image) ||
            "https://static.vecteezy.com/system/resources/previews/009/007/126/non_2x/document-file-not-found-search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          }
          alt={book.book_name}
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
