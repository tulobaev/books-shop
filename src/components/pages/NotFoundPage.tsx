import { FC } from "react";
import scss from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <section className={scss.NotFound}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
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
