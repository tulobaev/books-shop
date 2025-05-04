import { FC, useCallback } from "react";
import scss from "./BookCards.module.scss";
import { useNavigate } from "react-router-dom";
import { IPopularBooks } from "../../types";

interface BookCardsProps {
  book: IPopularBooks;
  onClick?: (bookId: number) => void;
}

const PopularCards: FC<BookCardsProps> = ({ book, onClick }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(book.id);
    } else {
      navigate(`/details/${book.id}`);
    }
  }, [book.id, onClick, navigate]);

  const fixImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("http://")) return url;
    return `http://80.242.57.16:8080${url}`;
  };

  return (
    <article
      onClick={handleClick}
      className={scss.cards}
      aria-label={`Китеп: ${book.name}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <div className={scss.imageContainer}>
        <img
          src={
            fixImageUrl(book.book_image) ||
            "https://static.vecteezy.com/system/resources/previews/009/007/126/non_2x/document-file-not-found-search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          }
          alt={book.name}
        />
      </div>
      <div className={scss.text}>
        <h2 className={scss.title}>{book.name}</h2>
        <p className={scss.description}>{book.author}</p>
      </div>
    </article>
  );
};

export default PopularCards;
