import scss from "./BookList.module.scss";
import BookCards from "../../ui/cards/BookCards";
import { IBook } from "../../types";
import not from "../../assets/notFound.svg";

interface Props {
  books: IBook[];
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gridColumn: "1 / -1",
              width: "100%",
            }}
            className={scss.notFound}
          >
            <img
              style={{
                maxWidth: "390px",
                width: "100%",
                height: "350px",
              }}
              src={not}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
