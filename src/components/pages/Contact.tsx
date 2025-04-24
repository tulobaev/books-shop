import { FC } from "react";
import scss from "./Contact.module.scss";
import MapComponent from "../../2gis/MapComponent";
import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa"; // Иконки

const Contact: FC = () => {
  return (
    <section className={scss.Contact}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.mapWrapper}>
            <MapComponent />
          </div>
          <div className={scss.infoWrapper}>
            <div className={scss.card}>
              <h1>Биз жайгашканбыз</h1>
              <p>
                <FaMapMarkerAlt /> Дарек: ул Насирдина Исанова, 73a/1, г. Ош
              </p>
              <p>
                <FaPhoneAlt /> Телефон: +996 777 727 932
              </p>
              <p>Иш убактысы: дүйшөмбү-жума саат 9:00дөн 18:00гө чейин</p>
              <div className={scss.btn}>
                <a
                  href="https://wa.me/996777727932"
                  target="_blank"
                  className={scss.cardButton1}
                >
                  <FaWhatsapp /> Ватсапка жаз
                </a>
                <a
                  href="https://www.instagram.com/oshmpu_official?igsh=MXRrNmI3YjJkb2J0eg=="
                  target="_blank"
                  className={scss.cardButton2}
                >
                  <FaInstagram /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={scss.content}>Contact</div>
      </div>
    </section>
  );
};

export default Contact;
