import scss from "./BookList.module.scss";
import BookCards from "../../ui/cards/BookCards";

interface Props {
  books: any[];
  selectedCategory: string;
}

const BookList: React.FC<Props> = ({ books, selectedCategory }) => {
  if (!selectedCategory) return null;

  return (
    <div className={scss.box}>
      <h1>{selectedCategory}</h1>
      <div className={scss.content}>
        {books.length > 0 ? (
          books.map((book) => <BookCards key={book.id} book={book} />)
        ) : (
          <p>Книги не найдены для категории: {selectedCategory}</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
