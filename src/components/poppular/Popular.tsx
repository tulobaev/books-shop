import { FC, useState } from "react";
import scss from "./Popular.module.scss";
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../avtoScroll/AvtoScroll";

// Временные данные
const books = new Array(40).fill(0).map((_, i) => ({
  id: i + 1,
  img: "https://static-cse.canva.com/blob/585523/.png",
  title: `Автор ${i + 1}`,
  desc: `Описание книги номер `,
  year: 2025,
}));

const Popular: FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemPerPages = 20;
  const count = Math.ceil(books.length / itemPerPages);

  function getCurrentPageBooks() {
    let start = (page - 1) * itemPerPages;
    let end = start + itemPerPages;
    return books.slice(start, end);
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <section id={scss.Popular}>
      <h1>Популярдуу китептер</h1>

      <div className={scss.content}>
        {getCurrentPageBooks().map((book) => (
          <div
            onClick={() => navigate("/details")}
            className={scss.cards}
            key={book.id}
          >
            <img src={book.img} alt={book.title} />
            <div className={scss.text}>
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.year}</span>
            </div>
          </div>
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
