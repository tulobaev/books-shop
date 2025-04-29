import { FC, useState } from "react";
import scss from "./Popular.module.scss";
import { Pagination, Stack } from "@mui/material";
import ScrollToTop from "../avtoScroll/AvtoScroll";
import BookCards from "../../ui/cards/BookCards";
import { IBook } from "../../types";

// временные данные популярной книги
const books: IBook[] = new Array(20).fill(0).map((_, i) => ({
  id: i + 1,
  book_name: `Книга ${i + 1}`,
  book_image:
    "https://abali.ru/wp-content/uploads/2012/01/staraya_oblozhka_knigi.jpg",
  description: `Поэзия о жизни и любви. a a a a a a a a a a aa  aa a aa a a a ${
    i + 1
  }`,
  publication_year: 2025,
  category: { category_name: `Категория ${(i % 3) + 1}` },
}));

const Popular: FC = () => {
  const [page, setPage] = useState(1);
  const itemPerPages = 16;
  const count = Math.ceil(books.length / itemPerPages);
  const currentBooks = books.slice(
    (page - 1) * itemPerPages,
    page * itemPerPages
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section id={scss.Popular}>
      <h1>Популярдуу китептер</h1>

      <div className={scss.content}>
        {currentBooks.map((book: IBook) => (
          <BookCards key={book.id} book={book} />
        ))}
      </div>

      {books.length > itemPerPages && (
        <div className={scss.pagination}>
          <Stack spacing={2}>
            <Pagination
              onChange={handlePageChange}
              count={count}
              shape="rounded"
              color="primary"
              page={page}
            />
            <ScrollToTop key={page} />
          </Stack>
        </div>
      )}
    </section>
  );
};

export default Popular;
