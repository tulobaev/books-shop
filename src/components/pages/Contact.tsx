import { FC } from "react";
import scss from "./Contact.module.scss";
import MapComponent from "../../GooogleMap/MapComponent";
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
                <FaMapMarkerAlt /> Дарек: ул. Токтогула 25, Бишкек, Кыргызстан
              </p>
              <p>
                <FaPhoneAlt /> Телефон: +996 555 555 555
              </p>
              <p>Иш убактысы: дүйшөмбү-жума саат 9:00дөн 18:00гө чейин</p>
              <div className={scss.btn}>
                <a
                  href="https://wa.me/996555555555"
                  target="_blank"
                  className={scss.cardButton}
                >
                  <FaWhatsapp /> Ватсапка жаз
                </a>
                <a
                  href="https://www.instagram.com/your_profile"
                  target="_blank"
                  className={scss.cardButton}
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
