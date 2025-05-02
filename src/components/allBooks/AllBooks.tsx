import { FC, useState } from "react";
import scss from "./AllBooks.module.scss";
import BookCards from "../../ui/cards/BookCards";
import { Pagination, Stack } from "@mui/material";
import ScrollToTop from "../avtoScroll/AvtoScroll";
import { IBook } from "../../types";
import not from "../../assets/notFound.svg";

interface AllBooksProps {
  books: IBook[];
}

const AllBooks: FC<AllBooksProps> = ({ books = [] }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  const pageCount = Math.ceil(books.length / itemsPerPage);
  const currentBooks = books.slice(
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
          {currentBooks.length === 0 ? (
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className="text"
              >
                <h2>Азырынча китептер жок</h2>
                <img
                  style={{
                    maxWidth: "300px",
                    width: "100%",
                    height: "300px",
                  }}
                  src={not}
                  alt=""
                />
              </div>
            </div>
          ) : (
            currentBooks.map((item) => <BookCards key={item.id} book={item} />)
          )}
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
