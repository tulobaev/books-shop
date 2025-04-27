import scss from "./BookList.module.scss";
import BookCards from "../../ui/cards/BookCards";

interface Book {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
}

interface Props {
  books: Book[];
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
          <p>Бул категорияда китептер табылган жок.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
