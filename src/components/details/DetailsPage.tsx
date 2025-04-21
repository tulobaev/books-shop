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

const DetailsPage: FC = () => {
  return (
    <section className={scss.DetailsPage}>
      <div className="container">
        <div className={scss.card}>
          <div className={scss.info}>
            <h1>Математикалык кереметтер</h1>

            <p className={scss.aftor}>
              <FaUser /> <strong>Автор:</strong> А.А. Беляев, И.Н. Цыбуля, Н.Н.
              asda asdasd asdad adasda asda s Осипова
            </p>
            <p>
              <FaCalendarAlt /> <strong>Басылган жылы:</strong> 2025 жыл
            </p>
            <p>
              <FaRegClock /> <strong>Жүктөлгөн убакыт:</strong> 20 Апреля 2025
            </p>
            <div className={scss.top}>
              <p className={scss.rating}>
                <FaEye /> <strong>Көрүүлөр:</strong> <span>1,234</span>
              </p>
              <p className={scss.rating}>
                <FaHeart /> <strong>Жакmы:</strong> <span>527</span>
              </p>
            </div>

            <p className={scss.description}>
              Бул китеп сызгыч жана циркуль аркылуу бурчту үчкө бөлүү жана кубду
              эки эселөө маселелерин чечүүнү камтыйт. Теория менен практиканын
              айкалышы аркылуу математика дүйнөсүнө кызыктуу саякат тартуулайт.
            </p>

            <div className={scss.buttons}>
              <button className={scss.read}>
                <FaBookOpen /> Онлайн окуу
              </button>
              <button className={scss.download}>
                <FaDownload /> Жүктөө
              </button>
              <button className={scss.back}>←Артка</button>
            </div>
          </div>

          <div className={scss.image}>
            <img
              src="https://skazkiwsem.fun/wp-content/uploads/2017/11/1-1.jpg"
              alt="Обложка книги"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
