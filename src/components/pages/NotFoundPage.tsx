import { FC } from "react";
import scss from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom";
import not from "../../assets/notFound.svg";

const NotFoundPage: FC = () => {
  return (
    <section className={scss.NotFound}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.icon}>
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
                  maxWidth: "390px",
                  width: "100%",
                  height: "350px",
                }}
                src={not}
                alt=""
              />
            </div>
          </div>
          <h1>404 - Баракча табылган жок</h1>
          <p>
            Тилекке каршы, бул баракча табылган жок. Балким, ал өчүрүлгөн же
            дарек туура эмес жазылган.
          </p>
          <Link to="/" className={scss.button}>
            Башкы бетке кайтуу
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
