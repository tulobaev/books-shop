import scss from "./BookList.module.scss";
import { useNavigate } from "react-router-dom";
import BookCard from "../bookCard/BookCard";

interface Props {
  books: any[];
  selectedCategory: string;
}

const BookList: React.FC<Props> = ({ books, selectedCategory }) => {
  const navigate = useNavigate();

  if (!selectedCategory) return null;

  return (
    <div className={scss.box}>
      <h1>{selectedCategory}</h1>
      <div className={scss.content}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              onClick={() => navigate(`/details/${book.id}`)}
            />
          ))
        ) : (
          <p>Книги не найдены для категории: {selectedCategory}</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
