import { FC, useMemo, useState } from "react";
import scss from "./SearchResult.module.scss";
import { useGetProductQuery } from "../../store/api/book";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import ScrollToTop from "../../components/avtoScroll/AvtoScroll";

const SearchResult: FC = () => {
  const { data: books = [], isLoading } = useGetProductQuery();
  const navigate = useNavigate();
  const { query = "" } = useParams();

  const filteredBooks = useMemo(() => {
    return books.filter((item) =>
      item.book_name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [books, query]);

  const [page, setPage] = useState(1);
  const itemPerPages = 16;
  const count = Math.ceil(filteredBooks.length / itemPerPages);

  const currentBooks = filteredBooks.slice(
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

  if (isLoading) return <div className={scss.loading}>Загрузка...</div>;

  return (
    <section className={scss.SearchResult}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.btn}>
            <button onClick={() => navigate("/")} className={scss.back}>
              ← Артка
            </button>
          </div>
          <div className={scss.title}>
            <h1>Сиз издеген китептер</h1>
          </div>

          <div className={scss.booksContainer}>
            {currentBooks.length > 0 ? (
              currentBooks.map((item) => (
                <div
                  onClick={() => navigate(`/details/${item.id}`)}
                  key={item.id}
                  className={scss.cards}
                >
                  <img
                    src={item.book_image || "/images/default-book.jpg"}
                    alt={`Cover of ${item.book_name}`}
                    className={scss.bookImage}
                  />

                  <div className={scss.text}>
                    <h2>{item.book_name}</h2>
                    <p className={scss.description}>{item.description}</p>
                    <span className={scss.year}>{item.publication_year}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className={scss.noResults}>Сиз издеген китеп табылган жок</p>
            )}
          </div>
        </div>

        {filteredBooks.length > itemPerPages && (
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
      </div>
    </section>
  );
};

export default SearchResult;
