import { FC, useEffect, useState } from "react";
import scss from "./Popular.module.scss";
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import ScrollToTop from "../avtoScroll/AvtoScroll";
import { setData } from "../../store/slice/DataSlice";
import axios from "axios";

interface Book {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
}

const Popular: FC = () => {
  const books = useAppSelector((state) => state.data.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const itemPerPages = 16;
  const count = Math.ceil(books.length / itemPerPages);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/books/");
        dispatch(setData(response.data));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log(books);

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
      behavior: "smooth",
    });
  };

  if (books.length === 0) {
    return <div>Книги не найдены.</div>;
  }

  return (
    <section id={scss.Popular}>
      <h1>Популярдуу китептер</h1>

      <div className={scss.content}>
        {getCurrentPageBooks().map((book: Book) => (
          <div
            onClick={() => navigate(`/details/${book.id}`)}
            className={scss.cards}
            key={book.id}
          >
            <img
              src={book.book_image || "/path/to/default-image.jpg"}
              alt={book.book_name}
            />
            <div className={scss.text}>
              <h2>{book.book_name}</h2>
              <p>{book.description}</p>
              <span>{book.publication_year}</span>
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
