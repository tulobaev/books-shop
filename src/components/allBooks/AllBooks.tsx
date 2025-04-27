import { FC, useEffect, useState } from "react";
import scss from "./AllBooks.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import axios from "axios";
import { setData } from "../../store/slice/DataSlice";
import BookCards from "../../ui/cards/BookCards";
import { Pagination, Stack } from "@mui/material";
import ScrollToTop from "../avtoScroll/AvtoScroll";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const AllBooks: FC = () => {
  const books = useAppSelector((state) => state.data.data);
  const [page, setPage] = useState(1);
  const itemPerPages = 16;
  const count = Math.ceil(books.length / itemPerPages);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/books/`);
      dispatch(setData(response.data));
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    if (books.length === 0) {
      fetchData();
    }
  }, [books.length, dispatch]);

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
    <section className={scss.AllBooks}>
      <h1>Баардык китептер</h1>

      <div className={scss.content}>
        {currentBooks.map((item) => (
          <BookCards key={item.id} book={item} />
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

export default AllBooks;
