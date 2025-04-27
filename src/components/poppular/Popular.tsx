import { FC, useEffect, useState } from "react";
import scss from "./Popular.module.scss";
import { Pagination, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import ScrollToTop from "../avtoScroll/AvtoScroll";
import { setData } from "../../store/slice/DataSlice";
import axios from "axios";
import BookCards from "../../ui/cards/BookCards";

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

  const [page, setPage] = useState(1);
  const itemPerPages = 16;
  const count = Math.ceil(books.length / itemPerPages);

  const fetchData = async () => {
    try {
      const response = await axios.get("api/books/");
      dispatch(setData(response.data));
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

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
