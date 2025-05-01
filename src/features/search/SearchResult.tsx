import { FC, useMemo, useState } from "react";
import scss from "./SearchResult.module.scss";
import { useGetProductQuery } from "../../store/api/book";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ScrollToTop from "../../components/avtoScroll/AvtoScroll";

const SearchResult: FC = () => {
  const { data: books = [], isLoading } = useGetProductQuery();
  const navigate = useNavigate();
  const { query = "" } = useParams();

  const filteredBooks = useMemo(() => {
    return books.filter((item) =>
      item.book_name.trim().toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [books, query]);

  const [page, setPage] = useState(1);
  const itemsPerPages = 16;
  const count = Math.ceil(filteredBooks.length / itemsPerPages);

  const currentBooks = filteredBooks.slice(
    (page - 1) * itemsPerPages,
    page * itemsPerPages
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, idx) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <b key={idx} style={{ fontWeight: 800, color: "black" }}>
          {part}
        </b>
      ) : (
        part
      )
    );
  };

  if (isLoading)
    return (
      <div className="container">
        <div className={scss.booksSceleton}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div className={scss.cards} key={idx}>
              <Skeleton variant="rectangular" width={150} height={220} />
              <Skeleton variant="text" width="150px" />
              <Skeleton variant="text" width="150px" />
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <section className={scss.SearchResult}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <h1>Сиздин сурамыңыз боюнча табылган китептер</h1>
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
                    <h2>{highlightMatch(item.book_name, query)}</h2>
                    <p className={scss.description}>{item.description}</p>
                    <span className={scss.year}>{item.publication_year}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p className={scss.noResults}>
                  Китеп табылган жок 😕. Балким, башкача издеп көрөсүзбү?
                </p>
              </>
            )}
          </div>
        </div>

        {filteredBooks.length > itemsPerPages && (
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
