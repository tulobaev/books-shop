import { FC, useEffect, useState } from "react";
import scss from "./SimilarBook.module.scss";
import BookCards from "../../../ui/cards/BookCards";
import { IBook } from "../../../types";
import { useGetProductQuery } from "../../../store/api/book";
import Loader from "../../../ui/loader/Loader";
import not from "../../../assets/notFound.svg";

interface SimilarBooksProps {
  category: { category_name: string };
  currentBookId: number;
}

const SimilarBooks: FC<SimilarBooksProps> = ({ category, currentBookId }) => {
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const { data: allBooks, isLoading } = useGetProductQuery();

  useEffect(() => {
    if (allBooks) {
      const filtered = allBooks.filter(
        (book) =>
          book.category?.category_name === category.category_name &&
          book.id !== currentBookId
      );
      setFilteredBooks(filtered);
    }
  }, [allBooks, category, currentBookId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id={scss.similar}>
      <h1>
        {filteredBooks.length > 0
          ? "Окшош китептер"
          : "Тилекке каршы, окшош китептер табылган жок"}
      </h1>
      <div className={scss.content}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCards key={book.id} book={book} />)
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
    </section>
  );
};

export default SimilarBooks;
