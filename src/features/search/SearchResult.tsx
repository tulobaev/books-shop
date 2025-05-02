import { FC, useMemo, useState } from "react";
import scss from "./SearchResult.module.scss";
import { useGetProductQuery } from "../../store/api/book";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ScrollToTop from "../../components/avtoScroll/AvtoScroll";
import not from "../../assets/notFound.svg";

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

  const fixImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("http://80.242.57.16:8080")) return url;
    if (url.startsWith("http://80.242.57.16"))
      return url.replace("http://80.242.57.16", "http://80.242.57.16:8080");
    return url;
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
              <Skeleton variant="rectangular" width={250} height={320} />
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
            {currentBooks.length > 0 ? (
              <h1>Сиздин сурамыңыз боюнча табылган китептер</h1>
            ) : (
              <h1>Сурамыңыз боюнча эч кандай китептер табылган жок</h1>
            )}
          </div>

          <div className={scss.booksContainer}>
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <div
                  onClick={() => navigate(`/details/${book.id}`)}
                  key={book.id}
                  className={scss.cards}
                >
                  <img
                    src={
                      fixImageUrl(book.book_image) ||
                      "https://static.vecteezy.com/system/resources/previews/009/007/126/non_2x/document-file-not-found-search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                    }
                    alt={book.book_name}
                  />

                  <div className={scss.text}>
                    <h2>{highlightMatch(book.book_name, query)}</h2>
                    <p className={scss.description}>
                      {book.category?.category_name}
                    </p>
                    <span className={scss.year}>{book.publication_year}</span>
                  </div>
                </div>
              ))
            ) : (
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
                <img
                  style={{
                    maxWidth: "400px",
                    width: "100%",
                    height: "400px",
                  }}
                  src={not}
                  alt=""
                />
              </div>
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
