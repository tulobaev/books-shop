import { FC } from "react";
import scss from "./SimilarBook.module.scss";
import { useNavigate } from "react-router-dom";
import BookCards from "../../../ui/cards/BookCards";

interface Book {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
}

const SimilarBooks: FC = () => {
  const books: Book[] = new Array(20).fill(0).map((_, i) => ({
    id: i + 1,
    book_name: `Книга ${i + 1}`,
    book_image:
      "https://abali.ru/wp-content/uploads/2012/01/staraya_oblozhka_knigi.jpg",
    description: `Поэзия о жизни и любви. a a a a a a a a a a aa  aa a aa a a a ${
      i + 1
    }`,
    publication_year: 2025,
  }));

  return (
    <section id={scss.similar}>
      <h1>Окшош китептер</h1>
      <div className={scss.content}>
        {books.map((book) => (
          <BookCards key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default SimilarBooks;
