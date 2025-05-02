import { FC } from "react";
import scss from "./DetailsPage.module.scss";
import {
  FaUser,
  FaCalendarAlt,
  FaRegClock,
  FaEye,
  FaHeart,
  FaBookOpen,
  FaDownload,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookByIdQuery, useLikeBookMutation } from "../../store/api/book";
import SimilarBooks from "./similar/SimilarBooks";
import not from "../../assets/notFound.svg";
import Loader from "../../ui/loader/Loader";
// import DownloadButton from "./Dowload/Dowloader";

const DetailsPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, refetch } = useGetBookByIdQuery(Number(id));
  const [likeBook] = useLikeBookMutation();

  const handleLike = async () => {
    if (id) {
      try {
        console.log("Sending like request for book ID:", id);
        await likeBook(Number(id));
        refetch();
      } catch (error) {
        console.error("Failed to like the book:", error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!book) {
    return (
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
    );
  }

  const fixImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("http://80.242.57.16:8080")) return url;
    if (url.startsWith("http://80.242.57.16"))
      return url.replace("http://80.242.57.16", "http://80.242.57.16:8080");
    return url;
  };

  return (
    <section className={scss.DetailsPage}>
      <div className="container">
        <div className={scss.block}>
          <div className={scss.card}>
            <div className={scss.info}>
              <h1>{book.book_name}</h1>
              <p className={scss.aftor}>
                <FaUser /> <strong>Автор:</strong> {book.book_author}
              </p>
              <p>
                <FaCalendarAlt /> <strong>Басылган жылы:</strong>{" "}
                {book.publication_year}
              </p>
              <p>
                <FaRegClock /> <strong>Жүктөлгөн убакыт:</strong>{" "}
                {book.loading_time}
              </p>
              <div className={scss.top}>
                <p className={scss.rating}>
                  <FaEye /> <strong>Көрүүлөр:</strong>{" "}
                  <span>{book.viewing_count}</span>
                </p>
                <p className={scss.rating}>
                  <FaHeart /> <strong>Жакты:</strong>{" "}
                  <span>{book.like_count}</span>
                </p>
              </div>

              <p className={scss.description}>{book.description}</p>

              <div className={scss.buttons}>
   
                {fixImageUrl(book.book_pdf) ? (
                  <a
                    href={fixImageUrl(book.book_pdf) as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={scss.read}
                  >
                    <FaBookOpen /> Онлайн окуу
                  </a>
                ) : (
                  <button
                    className={scss.read}
                    disabled
                    title="PDF табылган жок"
                  >
                    <FaBookOpen /> Онлайн окуу
                  </button>
                )}
                             {/* <DownloadButton
                  pdfUrl={`http://80.242.57.16:8080/pdf/${book.id}/`}
                  filename={`${book.book_name}.pdf`}
                /> */}

                <button className={scss.like} onClick={handleLike}>
                  <FaHeart
                    style={{ color: book.like_count ? "red" : "white" }}
                  />{" "}
                  Жакты
                </button>
                <button onClick={() => navigate("/")} className={scss.back}>
                  ←Артка
                </button>
              </div>
            </div>
            <div className={scss.image}>
              <img
                src={
                  fixImageUrl(book.book_image) ||
                  "https://static.vecteezy.com/system/resources/previews/009/007/126/non_2x/document-file-not-found-search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                }
                alt={book.book_name}
              />
            </div>
          </div>
          <SimilarBooks category={book.category} />
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
