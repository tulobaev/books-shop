import { FC, useState } from "react";
import scss from "./AllBooks.module.scss";
import BookCards from "../../ui/cards/BookCards";
import { Pagination, Stack } from "@mui/material";
import ScrollToTop from "../avtoScroll/AvtoScroll";
import { Book } from "../../store/api/book";

interface AllBooksProps {
  book: Book[];
}

const AllBooks: FC<AllBooksProps> = ({ book = [] }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  console.log(books);

  useEffect(() => {
    if (books.length === 0) {
      fetchData();
    }
  }, [books.length, dispatch]);

  const pageCount = Math.ceil(book.length / itemsPerPage);
  const currentBooks = book.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={scss.AllBooks}>
      <h1>Баардык китептер</h1>

      <>
        <div className={scss.content}>
          {currentBooks.map((item) => (
            <BookCards key={item.id} book={item} />
          ))}
        </div>

        {pageCount > 1 && (
          <div className={scss.pagination}>
            <Stack spacing={2}>
              <Pagination
                onChange={handlePageChange}
                count={pageCount}
                shape="rounded"
                color="primary"
                page={page}
              />
              <ScrollToTop key={page} />
            </Stack>
          </div>
        )}
      </>
    </section>
  );
};

export default AllBooks;
