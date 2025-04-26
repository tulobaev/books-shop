import scss from "./BookCard.module.scss";

interface Props {
  book: {
    book_image: string;
    book_author: string;
    description: string;
    loading_time: number;
  };
  onClick: () => void;
}

const BookCard: React.FC<Props> = ({ book, onClick }) => (
  <div className={scss.cards} onClick={onClick}>
    <img
      src="https://static-cse.canva.com/blob/585523/.png"
      alt={book.book_author}
      className={scss.card_image}
    />
    <div className={scss.text}>
      <h2>{book.book_author}</h2>
      <p>{book.description}</p>
      <span>{book.loading_time}</span>
    </div>
  </div>
);

export default BookCard;
