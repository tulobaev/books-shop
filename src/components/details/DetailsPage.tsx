import { FC, useEffect, useState } from "react";
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
import { useGetBookByIdQuery } from "../../store/api/book";
import SimilarBooks from "./similar/SimilarBooks";
import not from "../../assets/notFound.svg";
import Loader from "../../ui/loader/Loader";
import { userID, useViewLogic } from "../../hooks/use-user-id";
import { useLikeBook } from "../../hooks/like/Like";
import { handleDownload } from "./download/Download";

const DetailsPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, refetch } = useGetBookByIdQuery(Number(id));
  const UserId = userID(id);
  const [isDownloading, setIsDownloading] = useState(false);
  const userId = userID(id);
  useViewLogic(id, userId);

  const { isLiked, setIsLiked, handleLike } = useLikeBook(id, UserId, refetch);

  useEffect(() => {
    if (!id) return;

    let likedBooks: string[] = [];
    try {
      const stored = localStorage.getItem("Liked-Books");
      likedBooks = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(likedBooks)) likedBooks = [];
    } catch (error) {
      console.error("Error parsing Liked-Books:", error);
      likedBooks = [];
    }

    setIsLiked(likedBooks.includes(id) || (book?.is_liked ?? false));
  }, [id, book, setIsLiked]);

  if (isLoading) {
    return <Loader />;
  }

  if (!book) {
    return (
      <div className={scss.notFound}>
        <img src={not} alt="Not Found" />
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
                <button
                  disabled={isDownloading}
                  onClick={() =>
                    id &&
                    book &&
                    handleDownload(id, book.book_name, setIsDownloading)
                  }
                  className={scss.download}
                  style={{
                    cursor: isDownloading ? "not-allowed" : "pointer",
                    opacity: isDownloading ? 0.7 : 1,
                  }}
                >
                  <FaDownload style={{ marginRight: "8px" }} />
                  {isDownloading ? "Жүктөлүп жатат..." : "Жүктоо"}
                </button>

                <button onClick={handleLike} className={scss.like}>
                  <FaHeart style={{ color: isLiked ? "red" : "white" }} /> Жакты
                </button>

                <button onClick={() => navigate("/")} className={scss.back}>
                  ← Артка
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
          <SimilarBooks category={book.category} currentBookId={book.id} />
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
