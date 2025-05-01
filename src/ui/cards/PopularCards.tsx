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
          src={"/images/default-book.jpg"}
          alt={`"${book.name}" китебинин мукабасы`}
          className={scss.bookImage}
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
