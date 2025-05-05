import { FC, useState } from "react";
import scss from "./Popular.module.scss";
import { Pagination, Stack } from "@mui/material";
import ScrollToTop from "../avtoScroll/AvtoScroll";
import { IPopularBooks } from "../../types";
import PopularCards from "../../ui/cards/PopularCards";

interface PopularProps {
  books: IPopularBooks[];
}

const Popular: FC<PopularProps> = ({ books }) => {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id={scss.Popular}>
      <h1>Популярдуу китептер</h1>

      <div className={scss.content}>
        {currentBooks.map((book) => (
          <PopularCards key={book.id} book={book} />
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
