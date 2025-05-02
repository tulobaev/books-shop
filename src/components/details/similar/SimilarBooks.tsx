import { FC, useEffect, useState } from "react";
import scss from "./SimilarBook.module.scss";
import BookCards from "../../../ui/cards/BookCards";
import { IBook } from "../../../types";
import { useGetProductQuery } from "../../../store/api/book";
import Loader from "../../../ui/loader/Loader";

interface SimilarBooksProps {
  category: { category_name: string };
}

const SimilarBooks: FC<SimilarBooksProps> = ({ category }) => {
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const { data: allBooks, isLoading } = useGetProductQuery();

  useEffect(() => {
    if (allBooks) {
      const filtered = allBooks.filter(
        (book) => book.category?.category_name === category.category_name
      );
      setFilteredBooks(filtered);
    }
  }, [allBooks, category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id={scss.similar}>
      <h1>Окшош китептер</h1>
      <div className={scss.content}>
        {filteredBooks.map((book) => (
          <BookCards key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default SimilarBooks;
