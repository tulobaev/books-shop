import { FC } from "react";
import scss from "./DetailsPage.module.scss";
import {
  FaUser,
  FaCalendarAlt,
  FaRegClock,
  FaEye,
  FaHeart,
  FaDownload,
  FaBookOpen,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../store/api/book";
import SimilarBooks from "./similar/SimilarBooks";

const DetailsPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading } = useGetBookByIdQuery(Number(id));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

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
                <button className={scss.read}>
                  <FaBookOpen /> Онлайн окуу
                </button>
                <button className={scss.download}>
                  <FaDownload /> Жүктөө
                </button>
                <button className={scss.like}>
                  <FaHeart style={{ color: "white" }} /> Жакты
                </button>
                <button onClick={() => navigate("/")} className={scss.back}>
                  ←Артка
                </button>
              </div>
            </div>
            <div className={scss.image}>
              <img
                src={book.book_image || "/images/default-book.jpg"}
                alt={`Cover of ${book.book_name}`}
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
